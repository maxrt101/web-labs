/**
 * Lab 3
 *
 * @brief  CRUD app
 * @file   main.cc
 * @author maxrt101
 */

#include "mrt/args/args.h"
#include "server/server.h"
#include "server/debug/log.h"
#include "nlohmann/json.hpp"

#include <iostream>
#include <string>
#include <map>

#include "car.h"

static std::map<int, Car> g_cars {
  {0, {"5008", "pegeout", "BO1234AI", 1000}}
};

int main(int argc, const char ** argv) {
  log::startLog("server.log");

  mrt::Server server;

  server.addEndpoint({"/api/car", http::Method::GET, [](auto request) {
    nlohmann::json response = nlohmann::json::array();

    for (auto& car : g_cars) {
      response.push_back(car.second.to_json());
    }

    return http::Response(http::OK).setContent("text/json", response.dump());
  }});

  server.addEndpoint({"/api/car", http::Method::POST, [](auto request) {
    std::string body;
    for (auto& p : request.header.params) {
      body += p.first + " = " + p.second + "\n";
    }
    return http::Response(http::OK).setContent("text/plain", body);
  }});

  server.run();

  return 0;
}

