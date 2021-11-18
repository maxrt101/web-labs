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
  int id;
  std::string model;
  std::string manufacturer;
  std::string plate;
  unsigned int kilometrage;
  unsigned int price;

  Car() = default;
  Car(const std::string& model, const std::string& manufacturer,
      const std::string& plate, unsigned kilometrage, unsigned price);
  nlohmann::json to_json() const;
  ~Car() = default;

  std::string getFieldAsString(const std::string& field) const;

  static Car from_json(const nlohmann::json& json);
};

#endif

