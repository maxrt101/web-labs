/**
 * Car
 *
 * @brief  Car Structure definition for CRUD operations
 * @file   car.h
 * @author maxrt101
 */
#ifndef _CAR_H
#define _CAR_H

#include <string>

#include "nlohmann/json.hpp"

struct Car {
  std::string model;
  std::string manufacturer;
  std::string plate;
  unsigned int kilometrage;

  Car(std::string model, std::string manufacturer, std::string plate, int kilometrge);
  nlohmann::json to_json() const;
};

#endif

