#include "car.h"
#include "nlohmann/json.hpp"

Car::Car(const std::string& model, const std::string& manufacturer,
         const std::string& plate, unsigned kilometrage, unsigned price)
  : model(model), manufacturer(manufacturer), plate(plate), kilometrage(kilometrage), price(price) {}

nlohmann::json Car::to_json() const {
  nlohmann::json result {
    {"id", id},
    {"model", model},
    {"manufacturer", manufacturer},
    {"plate", plate},
    {"kilometrage", kilometrage},
    {"price", price}
  };
  return result;
}

std::string Car::getFieldAsString(const std::string& field) const {
  if (field == "id") {
    return std::to_string(id);
  } else if (field == "model") {
    return model;
  } else if (field == "manufacturer") {
    return manufacturer;
  } else if (field == "plate") {
    return plate;
  } else if (field == "kilometrage") {
    return std::to_string(kilometrage);
  } else if (field == "price") {
    return std::to_string(price);
  }

  return "";
}

Car Car::from_json(const nlohmann::json& json) {
  Car car;
  json.at("model").get_to(car.model);
  json.at("manufacturer").get_to(car.manufacturer);
  json.at("plate").get_to(car.plate);
  json.at("kilometrage").get_to(car.kilometrage);
  json.at("price").get_to(car.price);
  return car;
}

