const util = require("util");
const eventEmitter = require("events");

const AppDAO = require("./dao");
const CarRepository = require("./car-repository");

const dao = new AppDAO("./database.sqlite3");
const repo = new CarRepository(dao);

function CarService() {
    eventEmitter.call(this);
}
util.inherits(CarService, eventEmitter);

CarService.prototype.create = function(body) {
    var car = body;
    repo.createTable()
        .then(() => repo.create(car.brand, car.model, car.plate, car.owner))
        .then(() => repo.getByPlate(car.plate))
        .then(row => {
            this.emit("createEnd", row);
        })
        .catch(err => {
            this.emit("createError", err);
        });
};

CarService.prototype.getAll = function() {
    repo.getAll()
        .then(rows => {
            this.emit("getAllEnd", rows);
        })
        .catch(err => {
            this.emit("getAllError", err);
        });
};

CarService.prototype.getByPlate = function(plate) {
    repo.getByPlate(plate)
        .then(row => {
            if (row) {
                this.emit("getByPlateEnd", row);
            } else {
                this.emit(
                    "getByPlateNotFound",
                    'car not found for plate: "' + plate + '"'
                );
            }
        })
        .catch(err => {
            this.emit("getByPlateError", err);
        });
};

module.exports = CarService;
