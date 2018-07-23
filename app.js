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
        let holder = data[i].id.toString();
        if (holder === id){
            return data[i];
        }
    }
    return null;
}
app.get("/",(request, response) => {
    response.json(cohorts)
})


app.get("/:id", function (request, response) {
    var record = findById(cohorts, request.params.id);
    if (!record){
        response.status = 404;
        response.json({
            error: {
                message: "No record found!"
            }
        });
    } else {
        response.json({cohorts: record});
    }
});

app.listen(9000);