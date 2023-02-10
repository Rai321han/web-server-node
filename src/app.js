const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000;
//
//
//defining path for location
const publicDirectory = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../templates/partials");
const viewsPath = path.join(__dirname, "../templates/views");

//Setting handlebar engine, views, partials locaiton
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Raihan",
    location: "Maijdee, Noakhali",
  });
  // if (!req.query.lat) return res.send("Check your internet");
  // else return res.send(req.query.lat);

  // const data = {
  //   latitude: req.query.lat,
  //   longitude: req.query.lng,
  // };
  // forecast(data, (error, foreCastdata) => {
  //   if (error) return res.send({ error: error });
  //   res.send({ Location: data.name, forecast: foreCastdata });
  // });
});

app.get("/default", (req, res) => {
  console.log(req.query);
  if (!req.query.lat & !req.query.lng)
    return res.send({ error: "Check your internet" });

  const data = {
    latitude: req.query.lat,
    longitude: req.query.lng,
  };

  forecast(data, (error, foreCastdata) => {
    if (error) return res.send({ error: error });
    res.send({ Location: data.name, forecast: foreCastdata });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Raihan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "You must provide an address.",
    });

  const address = req.query.address;
  geoCode(address, (error, data) => {
    console.log(data);
    if (error) return res.send({ error: error });
    forecast(data, (error, foreCastdata) => {
      if (error) return res.send({ error: error });
      res.send({ Location: data.name, forecast: foreCastdata });
    });
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helperName: "Farid",
    phone: "01768196420",
    name: "Raihan",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Help article is not found",
    name: "Raihan",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Page not found",
    name: "Raihan",
  });
});

app.listen(port, () => {
  console.log("Server is up!");
});
