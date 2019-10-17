// HTTP SERVER
const express = require('express');
const bodyParser = require('body-parser');
const eventEmitter = require('events');
const path = require('path');

const CarRepository = require('./car-repository');
const CarService = require('./car-service');

var carService = new CarService();
		
let startId = 1

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.route('/cars')
	.get(
		function(request, response){
			console.log("GET /cars");
			
			carService.getAll();
			
			carService.on('getAllEnd',function(rows){	
				response.status(200);
				response.setHeader('Content-Type', 'application/json');
				response.send(JSON.stringify(rows));
				response.end();				
			});
			
			carService.on('error',function(err){	
				response.status(500);
				response.setHeader('Content-Type', 'application/json');
				response.send(err);
				response.end();				
			});
		}
	)
	.post(
		function(request, response){
			console.log("POST /cars");
			
			var car = request.body;
			
			carService.create(car);
			
			carService.on('createEnd',function(car){	
				response.status(200);
				response.setHeader('Content-Type', 'application/json');
				response.send(JSON.stringify(car));
				response.end();				
			});
			
			carService.on('error',function(err){	
				response.status(500);
				response.setHeader('Content-Type', 'application/json');
				response.send(err);
				response.end();				
			});			
		}
	);

app.route('/cars/:plate').get(
	function(request, response){
		console.log("GET /cars/plate");
		var plate = request.params.plate;
					
		carService.getByPlate(plate);
		
		carService.on('getByPlateEnd',function(row){	
			response.status(200);
			response.setHeader('Content-Type', 'application/json');
			response.send(JSON.stringify(row));
			response.end();				
		});
		
		carService.on('getByPlateNotFound',function(str){	
			response.status(404);
			response.setHeader('Content-Type', 'application/json');
			response.send(str);
			response.end();				
		});		
					
		carService.on('error',function(err){	
			response.status(500);
			response.setHeader('Content-Type', 'application/json');
			response.send(err);
			response.end();				
		});
	}
);

// PAGE
app.route('/index').get(
	function(request, response){
		console.log("GET /my-page");
		response.sendFile(path.join(__dirname + "/index.html"));
	}
);

app.listen(9090);

console.log("listineing on 9090...");