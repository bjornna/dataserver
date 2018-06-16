function loadPulse(callback) {
loadDataFromApi("pulse", callback);
   
}
function loadBloodPressure(callback) {
    loadDataFromApi("blood_pressure", callback);
}

function loadTemp(callback) {
    loadDataFromApi("body_temperature", callback);
}

function loadSpO2(callback) {
loadDataFromApi("spo2", callback);
}
function loadDataFromApi(path, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/" + path, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            callback(response);
            
        }
    };
    xhttp.send();
}