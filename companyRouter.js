"use strict";
var express_1 = require("express");
var convert_1 = require("./convert");
var data_1 = require("./data");
var binarySearch_1 = require("./binarySearch");
var convert_2 = require("./convert");
var databag_1 = require("./databag");
var companyRouter = express_1.Router();
exports.companyRouter = companyRouter;
companyRouter.all('*', function (request, response, next) {
    console.log('companyRouter');
    next();
});
//if this is the method for generating the indexes , why do you load data here ??
companyRouter.get('/data', function (request, response, next) {
    var vect = new convert_2.Converter();
    console.log("companyrouter/data");
    data_1.importCompanies(function (y) {
        databag_1.DataBag.Companies = y;
        return y;
    }, function (x) {
        databag_1.DataBag.Siruta = x;
        response.sendStatus(200);
    });
});
//this is where you load all the necessary data 
companyRouter.get('/load', function (request, response, next) {
    console.log('companyRouter/load');
    var vect = new convert_2.Converter();
    vect.readFilePromise('./indexCui.json', 'utf-8')
        .then(function (idxCui) {
        databag_1.DataBag.CuiIndex = JSON.parse(idxCui);
        response.sendStatus(200);
    });
});
companyRouter.get('/companies/:id', function (request, response, next) {
    console.log('companyRouter/companies/' + request.params.id);
    var vect = new convert_2.Converter();
    var indexCUI, indexDenumire;
    //TODO: make sure we have CuiIndex loaded and if not return a correct error message
    var x = binarySearch_1.binarySearch(databag_1.DataBag.CuiIndex, request.params.id);
    var company = databag_1.DataBag.Companies[x];
    var uats = [];
    //TODO: remove iterations over Siruta?
    // it takes around 80 ms for this, so we need to optimize this one also
    for (var _i = 0, _a = databag_1.DataBag.Siruta; _i < _a.length; _i++) {
        var s = _a[_i];
        if ((convert_1.accentsTidy(s.denumireLoc).match(convert_1.accentsTidy(company.JUDET)) && s.NIV == "1")
            || (convert_1.accentsTidy(s.denumireLoc).match(convert_1.accentsTidy(company.LOCALITATE)))) {
            uats.push(s);
        }
    }
    //TOOD: optimize this so that we can get bellow 20ms
    for (var _b = 0, uats_1 = uats; _b < uats_1.length; _b++) {
        var uat = uats_1[_b];
        if (convert_1.accentsTidy(uat.denumireLoc).match(convert_1.accentsTidy(company.JUDET)) && uat.TIP == "40") {
            company.sirutaJudet = uat.siruta;
        }
        else if (convert_1.accentsTidy(uat.denumireLoc).match(convert_1.accentsTidy(company.LOCALITATE))) {
            company.sirutaLocalitate = uat.siruta;
        }
    }
    response.json(company);
});
//# sourceMappingURL=companyRouter.js.map