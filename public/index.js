(function () {
    // self executing function here
    loadVitalSigns();
    console.log("Initialized - starting the loop");
    loopInterval = 2000;
    loop(loopInterval);

    var spo2Data = [];
    var spo2Chart = new Chartist.Line('#spo2-chart', {
        labels: [],
        series: [
            pulseData
        ]
    },
    getOptions([60, 70, 80, 90, 95, 100])
);


    var pulseData = [];

    var pulseChart = new Chartist.Line('#pulse-chart', {
        labels: [],
        series: [
            pulseData
        ]
    }, getOptions([60, 70, 80, 90, 100,110]));

function getOptions(yTicks){
    
// We are setting a few options for our chart and override the defaults
var options = {
    // Don't draw the line chart points
    showPoint: false,
    // Disable line smoothing
    lineSmooth: true,
    // X-Axis specific configuration
    axisX: {
      // We can disable the grid for this axis
      showGrid: true,
      // and also don't show the label
      showLabel: false
    },
    // Y-Axis specific configuration
    axisY: {
        type: Chartist.FixedScaleAxis,
        ticks: yTicks,
        low: yTicks[0]
    }
  };
  return options;
}

    function loop(ms) {
        setTimeout(function () {
            loadVitalSigns();
            loop(ms);
        }, ms);
    }

    function loadVitalSigns() {
        loadPulse(function (data) {
            var d = data.magnitude;

            pulseData.push(d);
            if (pulseData.length > 20) {
                pulseData.shift();
            }

            var labels = [];
            for (let index = 0; index < pulseData.length; index++) {
                labels.push(index);
            }
            var data = {
                labels: labels,
                series: [pulseData]
            }
            document.getElementById("pulse").textContent = d;
            pulseChart.update(data);
            
        });
        loadTemp(function (data) {
            document.getElementById("temp").textContent = data.magnitude;
        });
        loadSpO2(function (data) {
            document.getElementById("spo2").textContent = data.magnitude;
            spo2Data.push(data.magnitude);
            if (spo2Data.length > 30) {
                spo2Data.shift();
            }
            var labels = [];
            for (let index = 0; index < spo2Data.length; index++) {
                labels.push(index);
            }
            var data = {
                labels: labels,
                series: [spo2Data]
            }
            spo2Chart.update(data);
        });

        loadBloodPressure(function (data) {
            let s = data.systolic;
            let d = data.diastolic;
            document.getElementById("bp").textContent = s + "/" + d;
        });
    }
})();