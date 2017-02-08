"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var companyRouter_1 = require("./companyRouter");
var cors = require("cors");
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.all('*', function (request, response, next) {
    console.log("All express");
    next();
});
app.use("/company", companyRouter_1.companyRouter);
/*app.use("/cards", cardRouter);
app.use("/siruta", sirutaRouter);
app.use('/company',companyRouter );*/
/*app.get('/data', (req, res) => {
    importCompanies((y) => {
        firme=y;
        return y;
    }, (x) => {
       // return x;
       siruta=x;
        res.sendStatus(200);
    });

})
app.get('/load', (req, res) => {
    vect.readFilePromise('./indexCui.json', 'utf-8')
        .then((json) => {
            file1=json;
            res.sendStatus(200);
        })
})
app.get('/companies/:id', (req, res) => {
        var vect = new Converter();
        var company;
        var indexCUI, indexDenumire;
     var  file=JSON.parse(file1);
        var x = binarySearch(file, req.params.id);
        company = firme[x];
        var uats = [];
        for (let s of siruta) {
            if ((accentsTidy(s.denumireLoc).match(accentsTidy(company.JUDET)) && s.NIV == "1")
                || (accentsTidy(s.denumireLoc).match(accentsTidy(company.LOCALITATE)))) {
                uats.push(s);
            }
        }
        for (let uat of uats) {
            if (accentsTidy(uat.denumireLoc).match(accentsTidy(company.JUDET)) && uat.TIP == "40") {
                company.sirutaJudet = uat.siruta;
            }
            else if (accentsTidy(uat.denumireLoc).match(accentsTidy(company.LOCALITATE))) {
                company.sirutaLocalitate = uat.siruta;
            }
        }
        res.json(company)
    })*/
var server = app.listen(4000, function () {
    console.log('rest service running on port 4000');
});
//# sourceMappingURL=index.js.map