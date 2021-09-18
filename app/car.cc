#include "car.h"
#include "nlohmann/json.hpp"

Car::Car(std::string model, std::string manufacturer, std::string plate, int kilometrage)
  : model(model), manufacturer(manufacturer), plate(plate), kilometrage(kilometrage) {}

nlohmann::json Car::to_json() const {
  nlohmann::json result {
    {"model", model},
    {"manufacturer", manufacturer},
    {"plate", plate},
    {"kilometrage", kilometrage}
  };
  return result;
}

