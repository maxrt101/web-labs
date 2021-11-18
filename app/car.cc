#include "car.h"
#include "nlohmann/json.hpp"

Car::Car(const std::string& model, const std::string& manufacturer,
         const std::string& plate, unsigned kilometrage, unsigned price)
  : model(model), manufacturer(manufacturer), plate(plate), kilometrage(kilometrage), price(price) {}

nlohmann::json Car::to_json() const {
  nlohmann::json result {
    {"model", model},
    {"manufacturer", manufacturer},
    {"plate", plate},
    {"kilometrage", kilometrage},
    {"price", price}
  };
  return result;
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

