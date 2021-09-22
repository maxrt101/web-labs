var carsCache = {};

function carTemplate(car) {
  return "<div>" + "<p>" + JSON.stringify(car) + "</p>" + "</div>";
}

// function sortCars() {
//   // document.getElementById("sort-checkox").
  
// }

function displayCars(cars = carsCache) {
  if (document.querySelector('#sort-checkox').checked) {
    cars.sort((a, b) => {
      return a.price - b.price;
    });
  }
  document.getElementsByClassName("content-section")[0].innerHTML = "";
  for (var i = 0; i < cars.length; i++) {
    var html = carTemplate(cars[i]);
    console.log(html);
    document.getElementsByClassName("content-section")[0].innerHTML += html;
  }
}

function updateCars() {
  httpAsyncRequest("GET", "/api/car", (responseText) => {
    carsCache = JSON.parse(responseText);
    displayCars(carsCache);
  });
}

document.addEventListener('DOMContentLoaded', updateCars);