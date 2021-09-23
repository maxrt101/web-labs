function createCar() {
  var car = {
    "model": document.getElementById('create-model').value,
    "manufacturer": document.getElementById('create-manufacturer').value,
    "plate": document.getElementById('create-plate').value,
    "kilometrage": parseInt(document.getElementById('create-kilometrage').value, 10),
    "price": parseInt(document.getElementById('create-price').value, 10)
  };
  httpAsyncRequest("POST", "/api/car", JSON.stringify(car), (responseText) => {
    console.log(responseText);
    updateCars();
  });
}

function updateCar(id, car) {
  httpAsyncRequest("PUT", "/api/car?id=" + id, JSON.stringify(car), (responseText) => {
    console.log(responseText);
    updateCars();
  });
}

function deleteCar(id) {
  httpAsyncRequest("DELETE", "/api/car?id=" + id, null, (responseText) => {
    console.log(responseText);
    updateCars();
  });
}