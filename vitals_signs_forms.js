var fSpo2 = "akuttmottak_med_kodeverk/vital_signs/pulsoksymetri/uspesifisert_hendelse/spo₂";
var fPulse = "akuttmottak_med_kodeverk/vital_signs/puls_hjertefrekvens/uspesifisert_hendelse/frekvens@Pulsfrekvens";
var fTemp = "akuttmottak_med_kodeverk/vital_signs/kroppstemperatur/uspesifisert_hendelse/temperatur";
var fResp = "akuttmottak_med_kodeverk/vital_signs/åndedrett/uspesifisert_hendelse/frekvens";
var fSystolic = "akuttmottak_med_kodeverk/vital_signs/blodtrykk/uspesifisert_hendelse/systolisk";
var fDiastolic = "akuttmottak_med_kodeverk/vital_signs/blodtrykk/uspesifisert_hendelse/diastolisk";
var fContextStartTime = "akuttmottak_med_kodeverk/start_time";


var restapi = "http://vp-ala04:3000/api/";

loadAllData();

function loadAllData() {
    console.log("Reload data from server");
    loadBloodPressureFromServer(restapi + "blood_pressure");
    loadSpo2FromServer(restapi + "spo2");
    loadPulseFromServer(restapi + "pulse");
    loadTemperatureFromServer(restapi + "body_temperature");
    loadRespirationFromServer(restapi + "respiration")
    updateContextStartTime();
}

function updateContextStartTime() {
    var d = new Date();
    var ctxS = new DvDateTime(d);
    api.setFieldValue(fContextStartTime, ctxS);

}

function loadPulseFromServer(url) {
    http.get(url, function (result) {
        if (result.isSuccessStatusCode) {
            var json = JSON.parse(result.data);
            console.log(json);
            var val = new DvQuantity();
            val.magnitude = json.magnitude;
            val.units = "/min";
            api.setFieldValue(fPulse, val);

        } else {
            console.log("StatusCode: " + result.statusCode);
            console.log(result.data);
        }
    });
}

function loadSpo2FromServer(url) {
    http.get(url, function (result) {
        if (result.isSuccessStatusCode) {
            var json = JSON.parse(result.data);

            var val = new DvProportion();
            val.numerator = json.magnitude;
            val.denominator = 100;

            api.setFieldValue(fSpo2, val);
        } else {
            console.log("StatusCode: " + result.statusCode);
            console.log(result.data);
        }
    });
}

function loadRespirationFromServer(url) {
    http.get(url, function (result) {
        if (result.isSuccessStatusCode) {
            var json = JSON.parse(result.data);

            var val = new DvQuantity();
            val.magnitude = json.magnitude;
            val.units = "/min";
            api.setFieldValue(fResp, val);
        } else {
            console.log("StatusCode: " + result.statusCode);
            console.log(result.data);
        }
    });
}

function loadTemperatureFromServer(url) {
    http.get(url, function (result) {
        if (result.isSuccessStatusCode) {
            var json = JSON.parse(result.data);

            var val = new DvQuantity();
            val.magnitude = json.magnitude;
            val.units = "Cel";
            api.setFieldValue(fTemp, val);
        } else {
            console.log("StatusCode: " + result.statusCode);
            console.log(result.data);
        }
    });
}

function loadBloodPressureFromServer(url) {
    http.get(url, function (result) {
        if (result.isSuccessStatusCode) {
            var json = JSON.parse(result.data);

            var val = new DvQuantity();
            val.magnitude = json.systolic;
            val.units = "mm[Hg]";
            api.setFieldValue(fSystolic, val);

            var val = new DvQuantity();
            val.magnitude = json.diastolic;
            val.units = "mm[Hg]";

            api.setFieldValue(fDiastolic, val);
        } else {
            console.log("StatusCode: " + result.statusCode);
            console.log(result.data);
        }
    });
}