const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan');
// let csvToJson = require('convert-csv-to-json');
const bodyParser = require('body-parser');
// var cohorts = csvToJson.fieldDelimiter(',').getJsonFromCsv("cohorts.csv");


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

var cohorts = [{
    id: 1,
    cohortName: "17-01-WD-DP",
    cohortCode: "g100",
    numberOfStudents: 28
},{
    id: 2,
    cohortName: "17-01-DS-GT",
    cohortCode: "g105",
    numberOfStudents: 24
},{
    id: 3,
    cohortName: "17-02-WD-PX",
    cohortCode: "g109",
    numberOfStudents: 30
},{
    id: 4,
    cohortName: "17-03-WD-BD",
    cohortCode: "g110",
    numberOfStudents: 29
}];

function findById(data, id){
    for (let i = 0; i < data.length; i++){
        if (data[i].id === id){
            return data[i];
        }
    }
    return null;
}
app.get("/home",(request, response) => {
    // console.log("REQUEST: " + request);
    // console.log("RESPONSE: " + response);
    
    response.json(cohorts)
    .then(data => {
        console.log("DATA: " + data);
        
    })
})


app.get("/:id", function (request, response) {
    // console.log("REQUEST: " + request.params);
    
    var record = findById(cohorts, request.params.id);
    // console.log("RECORD: " + record);
    
    // console.log("COHORTS: " + cohorts, "request.params.ID " + request.params.ID);
    
    if (!record){
        response.status = 404;
        response.json({
            error: {
                message: "No record found!"
            }
        });
    }

    //response.json({cohorts: record});
});

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//     const err = new Error("Not Found");
//     err.status = 404;
//     next(err);
// });

// // error handler
// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.json({
//     message: err.message,
//     error: req.app.get("env") === "development" ? err.stack : {}
//     });
// });

app.listen(9000);