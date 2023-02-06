const request = require("request");

const geoCode = function (address, callback) {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=46b5373312a9f9b5d721e0432b433a37&query=" +
    encodeURIComponent(address) +
    "&limit=2";

  request({ url: url, json: true }, (error, response) => {
    console.log(response.body.data);
    if (error) callback("Unable to connect to the internet", undefined);
    else if (
      response.body.data === undefined ||
      response.body.data.length === 0
    )
      callback(
        "Cannot find the locaiton. Please try another search",
        undefined
      );
    else {
      const data = response.body.data[0];
      const dataObject = {
        name: data.label,
        latitude: data.latitude,
        longitude: data.longitude,
      };
      callback(undefined, dataObject);
    }
  });
};

module.exports = geoCode;
