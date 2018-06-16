(function () {
    // self executing function here
    loadVitalSigns();
    console.log("Initialized - starting the loop");
    loopInterval = 2000;
    var chartSeriesLength = 40;
    loop(loopInterval);
    var bpDataSystolic = [];
    var bpDataDiastolic = [];

    var bpChart = new Chartist.Line('#bp-chart', {
        labels: [],
        series: [
            bpDataSystolic, bpDataDiastolic
        ]
    }, getOptions([50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 150]));

    var spo2Data = [];
    var spo2Chart = new Chartist.Line('#spo2-chart', {
            labels: [],
            series: [
                pulseData
            ]
        },
        getOptions([60, 70, 80, 90, 100])
    );

    var tempData = [];
    var tempChart = new Chartist.Line('#temp-chart', {
        labels: [],
        series: [
            tempData
        ]
    }, getOptions([35, 36, 37, 38, 39, 40, 41, 42, 43]));

    var pulseData = [];
    var pulseChart = new Chartist.Line('#pulse-chart', {
        labels: [],
        series: [
            pulseData
        ]
    }, getOptions([60, 70, 80, 90, 100, 110]));



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
            if (pulseData.length > chartSeriesLength) {
                pulseData.shift();
            }

            var labels = [];
            for (let index = 0; index < pulseData.length; index++) {
                labels.push(index);
            }
            var chartData = {
                labels: labels,
                series: [pulseData]
            }
            document.getElementById("pulse").textContent = d;
            pulseChart.update(chartData);

        });
        loadTemp(function (data) {
            var temp = data.magnitude;
            document.getElementById("temp").textContent = temp;

            tempData.push(temp);
            if (tempData.length > chartSeriesLength) {
                tempData.splice();
            }
            var labels = [];
            for (let index = 0; index < tempData.length; index++) {
                labels.push(index);
            }
            var chartData = {
                labels: labels,
                series: [tempData]
            }
            tempChart.update(chartData);
        });
        loadSpO2(function (data) {
            var d = data.magnitude;
            document.getElementById("spo2").textContent = d;
            spo2Data.push(d);
            if (spo2Data.length > chartSeriesLength) {
                spo2Data.shift();
            }
            var labels = [];
            for (let index = 0; index < spo2Data.length; index++) {
                labels.push(index);
            }
            var chartData = {
                labels: labels,
                series: [spo2Data]
            }
            spo2Chart.update(chartData);
        });

        loadBloodPressure(function (data) {
            let s = data.systolic;
            let d = data.diastolic;
            bpDataDiastolic.push(d);
            bpDataSystolic.push(s);
            if (bpDataSystolic.length > chartSeriesLength) {
                bpDataDiastolic.splice();
                bpDataSystolic.splice();

            }
            var labels = [];
            for (let index = 0; index < bpDataDiastolic.length; index++) {
                labels.push(index);

            }
            var chartData = {
                labels: labels,
                series: [bpDataSystolic, bpDataDiastolic]
            }

            document.getElementById("bp").textContent = s + "/" + d;
            bpChart.update(chartData);
        });
    }

    function getOptions(yTicks) {

        // Shared options for all the charts 
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

})();