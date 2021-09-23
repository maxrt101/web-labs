var debug = false;

function debugAlert(text) {
  if (debug) {
    alert(text);
  }
}

function setDebug(value) {
  debug = value;
}

function triggerDebug() {
  debug = !debug;
}