/**
 * Lab 3
 *
 * @brief  Server + CRUD App
 * @file   main.cc
 * @author maxrt101
 */

#include <stdexcept>
#include <iostream>
#include <string>
#include <atomic>
#include <map>

#include "mrt/args/args.h"
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

static std::atomic<int> g_id;
static std::map<int, Car> g_cars;

static int addCar(const Car& car) {
  g_cars[g_id++] = car;
  return g_id.load()-1;
}

int main(int argc, const char ** argv) {
  auto args = mrt::args::Parser("Lab3 Server", {
    {"version", 'F', {"-v", "--version"}, "Shows version"},
    {"port", 'V', {"-p", "--port"}, "Server Port"},
    {"root", 'V', {"-r", "--root"}, "Root Folder"},
  }).parse(argc, argv);

  if (args.exists("version")) {
    std::cout << "Lab 3 Server" << std::endl;
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

  // GET /api/car Returns ither all objects or a particular one, if id was sent
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
          response.push_back(car.second.to_json());
          response[response.size()-1]["id"] = car.first;
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
      g_cars.erase(id);
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

  addCar(Car("Supra", "Toyota", "AB1234AA", 10000, 10000));

  server.run();

  return 0;
}

