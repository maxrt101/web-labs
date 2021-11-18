var carsCache = {};
var currentCarId = 0;

function carTemplate(car) {
  return "<div class=\"car bg-light\"><h5>" + car["manufacturer"] + " " + car["model"] + "</h5>" + "<p>Price: " + car["price"] + "</p><p>Plate: " + car["plate"] + "</p><p>Kilometrage: " + car["kilometrage"] + "</p><button class=\"car-btn-delete btn btn-danger\" onclick=\"deleteCar(" + car["id"] + ")\">Delete</button><button class=\"car-btn-change btn btn-secondary\" data-bs-toggle=\"modal\" data-bs-target=\"#changeCarModal\" onclick=\"updateModal(" + car["id"] + ")\">Change</button></div>";
}

/* Allows user to search by terms. Like or exact matches are supported */
function displaySearchedCars(query) {
  displayCars((car) => {
    if (!query.length) {
      return true;
    }
    const terms = query.split(' ');
    const comparisonMethods = {
      'or':  (a, b) => { return a || b; },
      'and': (a, b) => { return a && b; }
    };
    var found = false;
    var nextCompare = 'or';
    for (var i = 0; i < terms.length; i++) {
      if (!terms[i].localeCompare('or') || !terms[i].localeCompare('and')) {
        nextCompare = terms[i];
        continue;
      }
      var term = terms[i];
      var props = ["manufacturer", "model"];
      var match = true;
      if (terms[i].match(/.*(:|~).*/)) {
        const tokens = terms[i].includes(':') ? terms[i].split(':') : terms[i].split('~');
        if (terms[i].includes(':')) {
          match = false;
        }
        if (tokens[0].includes(',')) {
          props = tokens[0].split(',');
        } else {
          props = [tokens[0]];
        }
        term = tokens[1].toLowerCase();
      }
      for (var j = 0; j < props.length; j++) {
        try {
          if (match) {
            const foundCar = car[props[j]].toString().match(new RegExp(term, "i"));
            found = comparisonMethods[nextCompare](found, foundCar == null ? false : foundCar);
          } else {
            found = comparisonMethods[nextCompare](found, !car[props[j]].toString().toLowerCase().localeCompare(term));
          }
        } catch (e) {
          alert("Invalid search query");
          return null;
        }
      }
    }
    return found;
  });
}

function sortCars(sortBy) {
  carsCache.sort((a, b) => {
    if (typeof a[sortBy] == "string") {
      return a[sortBy].localeCompare(b[sortBy]);
    } else {
      return a[sortBy] - b[sortBy];
    }
  });
  displayCars();
}

function displayCars(carFilter = car => true) {
  document.getElementsByClassName("content-section")[0].innerHTML = "";
  var totalPrice = 0;
  for (var i = 0; i < carsCache.length; i++) {
    const html = carTemplate(carsCache[i]);
    const filtered = carFilter(carsCache[i]);
    if (filtered == null) {
      return;
    }
    if (filtered) {
      totalPrice += carsCache[i].price;
      document.getElementsByClassName("content-section")[0].innerHTML += html;
    }
  }
  document.getElementById("text-total-price").innerHTML = "Total Price: " + totalPrice;
}

function updateCars() {
  httpAsyncRequest("GET", "/api/car", null, (responseText) => {
    carsCache = JSON.parse(responseText);
    displayCars();
  });
}

