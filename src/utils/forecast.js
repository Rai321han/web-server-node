const request = require("request");

const forecast = function ({ latitude, longitude }, callback) {
  const url = `http://api.weatherstack.com/current?access_key=7e135841ec65d03ce3bf8deb9daeabda&query=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) callback("Unable to connect to the internet", undefined);
    else if (response.body.error)
      callback("Cannot find the locaiton", undefined);
    else {
      const current = response.body.current;
      const dataString = `${current.weather_descriptions[0]}. It is currently ${current.temperature} degree out. It feels like ${current.feelslike} degree out`;
      callback(undefined, dataString);
    }
  });
};

module.exports = forecast;
