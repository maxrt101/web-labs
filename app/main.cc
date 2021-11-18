/**
 * Lab 3
 *
 * @brief  Server + CRUD App
 * @file   main.cc
 * @author maxrt101
 */

#include <stdexcept>
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <atomic>
#include <array>
// #include <map>

#include "mrt/args/args.h"
#include "mrt/container_utils.h"
#include "mrt/server/server.h"
#include "mrt/server/debug/log.h"
#include "nlohmann/json.hpp"

#include "car.h"

struct Config : public config::HttpServerConfig {
  std::string log_file = "server.log";

  Config() {
    // root_folder = "htdocs";
  };
};

static const std::array<std::string, 6> k_fields {"id", "model", "manufacturer", "plate", "kilometrage", "price"};

static std::atomic<int> g_id;
static std::vector<Car> g_cars;

static int addCar(Car car) {
  car.id = g_id++;
  g_cars.push_back(car);
  return g_id.load()-1;
}

int main(int argc, const char ** argv) {
  auto args = mrt::args::Parser("Lab9 Server", {
    {"version", 'F', {"-v", "--version"}, "Shows version"},
    {"port", 'V', {"-p", "--port"}, "Server Port"},
    {"root", 'V', {"-r", "--root"}, "Root Folder"},
    {"cars", 'V', {"-c", "--cars"}, "Json file with props"},
  }).parse(argc, argv);

  if (args.exists("version")) {
    std::cout << "Lab 9 Server" << std::endl;
    return 0;
  }

  Config conf;

  args.ifExists("port", [&conf](const auto& opts) {
    try {
      conf.port = std::stoi(opts[0]);
    } catch (std::exception& e) {
      std::cout << "Invalid port: " << opts[0] << std::endl;
      exit(1);
    }
  });

  args.ifExists("root", [&conf](const auto& opts) {
    conf.root_folder = opts[0];
  });

  log::startLog(conf.log_file);

  mrt::Server server(conf);

  // GET /api/car Returns either all objects or a particular one, if id was sent
  server.addEndpoint({"/api/car", http::Method::GET, [](auto request) {
    http::ResponseCode code = http::OK;
    nlohmann::json response = nlohmann::json::array();

    int id = -1;

    // Try to get id from url params
    try {
      id = std::stoi(request.header.params.at("id"));
    } catch (std::exception& e) {
      // If id is not present - return all objects
      for (auto& car : g_cars) {
        try {
          response.push_back(car.to_json());
        } catch (std::exception& e) {
          log::error("Json Parse Error: %s", e.what());
          code = http::INTERNAL_SERVER_ERROR;
          response = nlohmann::json();
          response["error"] = "Json Parse Error";
          break;
        }
      }
    }

    // If id is valid - get corresponding object and jsonify it
    if (id != -1) {
      try {
        Car car = g_cars.at(id);
        response = car.to_json();
        response["id"] = id;
      } catch (std::out_of_range& e) {
        log::error("Invalid ID: %s", e.what());
        code = http::BAD_REQUEST;
        response["error"] = "Invalid ID";
      } catch (std::exception& e) {
        log::error("Json Parse Error: %s", e.what());
        code = http::INTERNAL_SERVER_ERROR;
        response["error"] = "Json Parse Error";
      }
    }

    return http::Response(code)
      .addHeader("Access-Control-Allow-Origin", "*")
      .setContent("text/json", response.dump());
  }});

  // GET /api/filter Returns filtered cars
  server.addEndpoint({"/api/filter", http::Method::GET, [](auto request) {
    http::ResponseCode code = http::OK;
    nlohmann::json response = nlohmann::json::array();

    auto cars = g_cars;

    #define SORT(x) \
      std::sort(cars.begin(), cars.end(), [&](const auto& lhs, const auto& rhs) -> bool { \
        return lhs.x < rhs.x; \
      })

    if (request.header.params.find("by") == request.header.params.end()) {
      code = http::BAD_REQUEST;
    } else {
      std::string filterBy = request.header.params["by"];
      if (filterBy == "id") SORT(id);
      else if (filterBy == "kilometrage") SORT(kilometrage);
      else if (filterBy == "price") SORT(price);
      else if (filterBy == "model") SORT(getFieldAsString("model"));
      else if (filterBy == "manufacturer") SORT(getFieldAsString("manufacturer"));
      else if (filterBy == "plate") SORT(getFieldAsString("plate"));
    }

    #undef SORT

    for (const auto& param : request.header.params) {
      if (std::find(k_fields.begin(), k_fields.end(), param.first) != k_fields.end()) {
        cars = mrt::filter(cars, [&](auto& car) -> bool {
          return car.getFieldAsString(param.first).find(param.second) != std::string::npos;
        });
      }
    }

    for (auto& car : cars) {
      try {
        response.push_back(car.to_json());
      } catch (std::exception& e) {
        log::error("Json Parse Error: %s", e.what());
        code = http::INTERNAL_SERVER_ERROR;
        response = nlohmann::json();
        response["error"] = "Json Parse Error";
        break;
      }
    }

    return http::Response(code)
      .addHeader("Access-Control-Allow-Origin", "*")
      .setContent("text/json", response.dump());
  }});

  // GET /api/serch Returns filtered cars
  server.addEndpoint({"/api/search", http::Method::GET, [](auto request) {
    http::ResponseCode code = http::OK;
    nlohmann::json response = nlohmann::json::array();

    auto cars = g_cars;

    for (const auto& param : request.header.params) {
      if (std::find(k_fields.begin(), k_fields.end(), param.first) != k_fields.end()) {
        cars = mrt::filter(cars, [&](const auto& car) -> bool {
          return car.getFieldAsString(param.first).find(param.second) != std::string::npos;
        });
      }
    }

    for (auto& car : cars) {
      try {
        response.push_back(car.to_json());
      } catch (std::exception& e) {
        log::error("Json Parse Error: %s", e.what());
        code = http::INTERNAL_SERVER_ERROR;
        response = nlohmann::json();
        response["error"] = "Json Parse Error";
        break;
      }
    }

    return http::Response(code)
      .addHeader("Access-Control-Allow-Origin", "*")
      .setContent("text/json", response.dump());
  }});

  // POST /api/car Creates new object from json in request body
  server.addEndpoint({"/api/car", http::Method::POST, [](auto request) {
    http::ResponseCode code = http::OK;
    nlohmann::json response;
    Car new_car;

    try {
      new_car = Car::from_json(nlohmann::json::parse(request.body));
      response["id"] = addCar(new_car);
    } catch (std::exception& e) {
      log::error("Json Parse Error: %s", e.what());
      code = http::INTERNAL_SERVER_ERROR;
      response = nlohmann::json();
      response["error"] = "Json Parse Error";
    }

    return http::Response(code)
      .addHeader("Access-Control-Allow-Origin", "*")
      .setContent("text/json", response.dump());
  }});

  // PUT /api/car?id=X Updates an object
  server.addEndpoint({"/api/car", http::Method::PUT, [](auto request) {
    http::ResponseCode code = http::OK;
    nlohmann::json response;
    Car car;

    int id = -1;

    try {
      id = std::stoi(request.header.params.at("id"));
      car = Car::from_json(nlohmann::json::parse(request.body));
      g_cars.at(id) = car;
      response = car.to_json();
      response["id"] = id;
    } catch (std::out_of_range& e) {
      log::error("Invalid ID: %s", e.what());
      code = http::BAD_REQUEST;
      response = nlohmann::json();
      response["error"] = "Invalid ID";
    } catch (std::exception& e) {
      log::error("Json Parse Error: %s", e.what());
      code = http::BAD_REQUEST;
      response = nlohmann::json();
      response["error"] = "Json Parse Error";
    }

    return http::Response(code)
      .addHeader("Access-Control-Allow-Origin", "*")
      .setContent("text/json", response.dump());
  }});

  // DELETE /api/car?id=X Deletes an object and returns it
  server.addEndpoint({"/api/car", http::Method::DELETE, [](auto request) {
    http::ResponseCode code = http::OK;
    nlohmann::json response;

    int id = -1;
    Car car;

    try {
      id = std::stoi(request.header.params.at("id"));
      car = g_cars.at(id);
      g_cars.erase(g_cars.begin() + id);
    } catch (std::exception& e) {
      log::error("Invalid ID: %s", e.what());
      code = http::BAD_REQUEST;
      response["error"] = "Invalid ID";
      id = -1;
    }

    if (id != -1) {
      try {
        response = car.to_json();
      } catch (std::exception& e) {
        log::error("Invalid Object: %s", e.what());
        code = http::INTERNAL_SERVER_ERROR;
        response["error"] = "Invalid Object";
      }
    }

    return http::Response(code)
      .addHeader("Access-Control-Allow-Origin", "*")
      .setContent("text/json", response.dump());
  }});

  args.ifExists("cars", [&conf](const auto& opts) {
    std::ifstream file(opts[0]);
    std::stringstream buffer;
    buffer << file.rdbuf();
    auto json = nlohmann::json::parse(buffer.str());

    for (const auto& car : json) {
      addCar(Car::from_json(car));
    }
  });

  server.run();

  return 0;
}

