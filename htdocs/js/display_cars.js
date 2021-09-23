var carsCache = {};

function carTemplate(car) {
  return "<div class=\"car bg-light\"><h5>" + car["manufacturer"] + " " + car["model"] + "</h5>" + "<p>Price: " + car["price"] + "</p><p>Plate: " + car["plate"] + "</p><p>Kilometrage: " + car["kilometrage"] + "</p><button class=\"car-btn-delete btn btn-danger\" onclick=\"deleteCar(" + car["id"] + ")\">Delete</button><button class=\"car-btn-change btn btn-secondary\" onclick=\"changeCar(" + car["id"] + ")\">Change</button></div>";
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
            found = comparisonMethods[nextCompare](found, car[props[j]].toString().match(new RegExp(term, "i")));
          } else {
            found = comparisonMethods[nextCompare](found, !car[props[j]].toString().toLowerCase().localeCompare(term));
          }
        } catch (e) {}
      }
    }
    return found;
  });
}

function sortCars(sortBy) {
  // if (document.querySelector('#sort-checkox').checked) {
    carsCache.sort((a, b) => {
      return a[sortBy] - b[sortBy];
    });
    displayCars();
  // }
}

function displayCars(carFilter = car => true) {
  document.getElementsByClassName("content-section")[0].innerHTML = "";
  for (var i = 0; i < carsCache.length; i++) {
    var html = carTemplate(carsCache[i]);
    if (carFilter(carsCache[i])) {
      document.getElementsByClassName("content-section")[0].innerHTML += html;
    }
  }
}

function updateCars() {
  httpAsyncRequest("GET", "/api/car", null, (responseText) => {
    carsCache = JSON.parse(responseText);
    displayCars();
  });
}

