const Addressform = document.querySelector("form");
const formInput = document.querySelector("input");
const addressShow = document.querySelector("#address");
const foreCast = document.querySelector("#forecast");
var lat, lng;

//ON LOAD
const getLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    return;
  }
};
const getPosition = function (position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  getDefaultWeather(); //Initial (my place) weather information on load
};

const getDefaultWeather = function () {
  const url = `http://localhost:3000/default?lat=${lat}&lng=${lng}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        addressShow.textContent = data.error;
        foreCast.textContent = "";
      } else {
        addressShow.textContent = "Here";
        foreCast.textContent = data.forecast;
      }
    });
  });
};

window.onload = getLocation;

Addressform.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = "http://localhost:3000/weather?address=" + formInput.value;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        addressShow.textContent = data.error;
        foreCast.textContent = "";
      } else {
        addressShow.textContent = data.Location;
        foreCast.textContent = data.forecast;
      }
    });
  });
});
