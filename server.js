// our dependencies
const express = require('express');
const app = express();
const router = express.Router();

// from top level path e.g. localhost:3000, this response will be sent


app.use('/api', router);
router.get('/', (request, response) => {
    response.json({
        message: "Hello and welcome to my serer"
    });
});

const url = require('url');


router.get("/pulse", (request, response)=>{
    response.json(
        {
            magnitude: number(60,120), 
            units:"/min"

        }
    );
});
router.get("/respiration", (request, response)=>{
    response.json(
        {
            magnitude: number(20,70), 
            units:"/min"

        }
    );
});

router.get("/spo2", (request, response)=>{
    response.json(
        {
            magnitude: number(96,100), 
            units:"%"

        }
    );
});

router.get('/body_temperature', (request, response) => {
    response.json({
        magnitude: number(36, 42), 
        units: "Cel"
    });
});

router.get('/body_weight', (request, response) => {
    var weight = number(40, 140);
    response.json({
        magnitude: weight, 
        units:"kg"
    });
});

router.get('/body_height', (request, response) => {
    response.json({
        magnitude: number(140, 200),
        units: "cm"
    });
});

router.get('/blood_pressure', (request, response) => {
    var systolic = number(110, 160);
    var diastolic = number(systolic - 30, systolic - 10);
    var result = {
        systolic: systolic,
        diastolic: diastolic,
        units: "mm[Hg]"
    };
    response.json(result);
});
//https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// set the server to listen on port 3000
app.listen(3000, () => console.log('Listening on port 3000'));


function number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
