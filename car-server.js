// HTTP SERVER
const PORT = process.env.PORT || 9090;
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const CarService = require("./car-service");

let carService = new CarService();
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.route("/cars")
    .get(function(request, response) {
		console.log("GET /cars");
		console.log(request);

        carService.getAll();

        carService.once("getAllEnd", rows => twohundred(rows, response));
        carService.once("getAllError", err => fivehundred(err, response));
    })
    .post(function(request, response) {
		console.log("POST /cars");
		console.log(request);

        let car = request.body;
        carService.create(car);

        carService.once("createEnd", row => twohundred(row, response));
        carService.once("createError", err => fivehundred(err, response));
    });

app.route("/cars/:plate")
	.get(function(request, response) {
		console.log("GET /cars/plate");
		console.log(request);

		let plate = request.params.plate;

		carService.getByPlate(plate);

		carService.once("getByPlateEnd", row => twohundred(row, response));
		carService.once("getByPlateNotFound", message => fourhundredfour(message, response));
		carService.once("getByPlateError", err => fivehundred(err, response));
	});

// PAGE
app.route("/").get(function(request, response) {
    console.log("GET /index");
	console.log(request);

    response.sendFile(path.join(__dirname + "/public/index.html"));
});
app.listen(PORT);

// Code handlers
let twohundred = (jsonData, response) => {
	response.setHeader("Content-Type", "application/json");
	response.status(200);
	response.send(JSON.stringify(jsonData));
}

let fourhundredfour = (stringData, response) => {
	response.setHeader("Content-Type", "application/json");
	response.status(404);
	response.send(stringData);
}

let fivehundred = (stringData, response) => {
	response.setHeader("Content-Type", "application/json");
	response.status(500);
	response.send(stringData);
}

console.log(`listineing on ${PORT}...`);
