function carTemplate(car) {
  return "<div>" + "<p>" + JSON.stringify(car) + "</p>" + "</div>";
}

function updateCars() {
  httpAsyncRequest("GET", "/api/car", (responseText) => {
    document.getElementsByClassName("content-section")[0].innerHTML = "";
    var cars = JSON.parse(responseText);
    for (var i = 0; i < cars.length; i++) {
      var html = carTemplate(cars[i]);
      console.log(html);
      document.getElementsByClassName("content-section")[0].innerHTML += html;
    }
  });
}

document.addEventListener('DOMContentLoaded', updateCars);