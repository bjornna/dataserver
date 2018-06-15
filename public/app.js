(function () {
    // self executing function here
    loadVitalSigns();
    console.log("Initialized - starting the loop");
    loopInterval = 2000;
    loop(loopInterval);

})();

function loop(ms) {
    setTimeout(function () {
        loadVitalSigns();
        loop(ms);
    }, ms);
}

function loadVitalSigns() {
    loadPulse();
    loadTemp();
    loadSpO2();
    loadBloodPressure();
}

function loadPulse() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/pulse", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById("pulse").textContent = response.magnitude;
        }
    };
    xhttp.send();
}

function loadBloodPressure() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/blood_pressure", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            let s = response.systolic;
            let d = response.diastolic;
            document.getElementById("bp").textContent = s + "/" + d;
        }
    };
    xhttp.send();
}

function loadTemp() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/body_temperature", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById("temp").textContent = response.magnitude;
        }
    };
    xhttp.send();
}

function loadSpO2() {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/spo2", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById("spo2").textContent = response.magnitude;
        }
    };
    xhttp.send();
}