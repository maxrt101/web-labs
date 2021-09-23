if (!("updateCars" in window)) {
  updateCars = () => {};
}

function createCar() {
  var car = {
    "model": document.getElementById('create-model').value,
    "manufacturer": document.getElementById('create-manufacturer').value,
    "plate": document.getElementById('create-plate').value,
    "kilometrage": parseInt(document.getElementById('create-kilometrage').value, 10),
    "price": parseInt(document.getElementById('create-price').value, 10)
  };
  httpAsyncRequest("POST", "/api/car", JSON.stringify(car), (responseText) => {
    alert("Successfully created a new car with id=" + JSON.parse(responseText).id);
    updateCars();
  }, (status, responseText) => {
    alert("An error ocured while creating the car (" + responseText + ")")
  });
}

function updateCar(id, car) {
  httpAsyncRequest("PUT", "/api/car?id=" + id, JSON.stringify(car), (responseText) => {
    debugAlert("Successfully updated the car with id=" + JSON.parse(responseText).id);
    updateCars();
  }, (status, responseText) => {
    alert("An error ocured while updating the car (" + responseText + ")")
  });
}

function deleteCar(id) {
  httpAsyncRequest("DELETE", "/api/car?id=" + id, null, (responseText) => {
    debugAlert("Successfully deleted a car with id=" + id);
    updateCars();
  }, (status, responseText) => {
    alert("An error ocured while deleting the car (" + responseText + ")")
  });
}

function updateModal(id) {
  currentCarId = id;
  var car = (() => {
    for (var i = 0; i < carsCache.length; i++) {
      if (carsCache[i].id == id) {
        return carsCache[i];
      }
    }
    return null;
  })();
  document.getElementById('update-model').value = car["model"];
  document.getElementById('update-manufacturer').value = car["manufacturer"];
  document.getElementById('update-plate').value = car["plate"];
  document.getElementById('update-kilometrage').value = car["kilometrage"];
  document.getElementById('update-price').value = car["price"];
}

function updateCarFromModal() {
  var car = {
    "model": document.getElementById('update-model').value,
    "manufacturer": document.getElementById('update-manufacturer').value,
    "plate": document.getElementById('update-plate').value,
    "kilometrage": parseInt(document.getElementById('update-kilometrage').value, 10),
    "price": parseInt(document.getElementById('update-price').value, 10)
  };
  updateCar(currentCarId, car);
  document.getElementById("modal-close").click();
}
