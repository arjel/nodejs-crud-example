var xhr = new XMLHttpRequest();

// var baseUrl = 'http://localhost:9090/cars';
var baseUrl = "https://car-server-app.herokuapp.com";

function getCars() {
    xhr.open("GET", `${baseUrl}/cars`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var cars = JSON.parse(xhr.response);
            var table = document.getElementById("cars");
            var tBody = table.getElementsByTagName("tbody")[0];
            while (tBody.hasChildNodes()) {
                tBody.removeChild(tBody.firstChild);
            }

            cars.forEach(function(currentCar) {
                var newRow = tBody.insertRow(tBody.rows.length);
                var newCell0 = newRow.insertCell(0);
                var newCell1 = newRow.insertCell(1);
                var newCell2 = newRow.insertCell(2);
                var newText0 = document.createTextNode(currentCar.brand);
                var newText1 = document.createTextNode(currentCar.model);
                var newText2 = document.createTextNode(currentCar.plate);
                newCell0.append(newText0);
                newCell1.append(newText1);
                newCell2.append(newText2);
            });
        }
    };
    xhr.send();
}

function addCar() {
    var body = "brand=";
    body += document.getElementById("brand").value;
    body += "&model=";
    body += document.getElementById("model").value;
    body += "&plate=";
    body += document.getElementById("plate").value;
    body += "&owner=";
    body += document.getElementById("owner").value;

    console.log(body);

    xhr.open("POST", `${baseUrl}/cars`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert("Auto inserita: " + xhr.response);
            getCars();
        }
    };
    xhr.send(body);
}

function searchCar() {
    xhr.open(
        "GET",
        `${baseUrl}/cars/${document.getElementById("searchPlate").value}`
    );
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert(xhr.response);
        }
    };
    xhr.send();
}

getCars();
