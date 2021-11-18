function httpAsyncRequest(method, url, body, successCb, failCb = (status, responseText) => {}) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) { // readyState == 4 -> DONE
      successCb(xmlHttp.responseText);
    } else if (xmlHttp.readyState == 4) {
      failCb(xmlHttp.status, xmlHttp.responseText);
    }
  };
  xmlHttp.open(method, url, true); // true for async request
  xmlHttp.send(body);
}