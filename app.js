const express = require("express");
const cors = require("cors");
let csvToJson = require('convert-csv-to-json');
var cohorts = csvToJson.fieldDelimiter(',').getJsonFromCsv("cohorts.csv");
console.log(cohorts);
function findById(data, id){
    for (let i = 0; i < data.length; i++){
        if (data[i].id === id){
            return data[i];
        }
    }
    return null;
}

const app = express();
app.use(cors());

app.get("/", function (request, response) {
    response.json({cohorts});
});

app.get("/:id", function (request, response) {
    var record = findById(cohorts, request.params.ID);
    console.log("COHORTS: " + cohorts, "request.params.ID " + request.params.ID);
    
    if (!record){
        response.status = 404;
        response.json({
            error: {
                message: "No record found!"
            }
        });
    }

    response.json({cohorts: record});
});

app.listen(9000);