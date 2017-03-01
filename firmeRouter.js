"use strict";
var express_1 = require("express");
var _ = require("lodash");
var db = require("./db");
var databag_1 = require("./databag");
var convert_1 = require("./convert");
var config_1 = require("./config");
var accentsTidy_1 = require("./accentsTidy");
var shortName_1 = require("./shortName");
var binarySearch_1 = require("./binarySearch");
var whiteSpaceSep_1 = require("./whiteSpaceSep");
var generateS_1 = require("./generateS");
var update_1 = require("./update");
var firmeRouter = express_1.Router();
exports.firmeRouter = firmeRouter;
firmeRouter.all('*', function (request, response, next) {
    next();
});
firmeRouter.get('/index', function (request, response, next) {
    var convert = new convert_1.Converter();
    var properties = new config_1.Properties();
    var filter = function (item) {
        return true;
    };
    Promise.all([convert.csv2jsonPromise(properties.companiesPath, properties.companiesProperties, null, '|', filter),
        convert.csv2jsonPromise(properties.companiesPath2, properties.companiesProperties, null, '|', filter),
        convert.csv2jsonPromise(properties.sirutaPath, properties.sirutaProperties, null, null, filter)])
        .then(function (json) {
        var x = json[0];
        var y = json[1];
        var siruta = json[2];
        var judete = [];
        var indexCui = [], indexDenumire = [];
        var localitatiN = [];
        for (var i = 0; i < siruta.length; i++) {
            siruta[i].denumireLoc = shortName_1.shortName(siruta[i].denumireLoc, siruta[i].TIP);
            siruta[i].denumireLoc = whiteSpaceSep_1.whiteSpaceSeparator(siruta[i].denumireLoc);
            if (siruta[i].TIP == '40') {
                siruta[i].denumireLoc = accentsTidy_1.accentsTidy(siruta[i].denumireLoc);
                judete.push(siruta[i]);
            }
        }
        var localitate = [];
        for (var i = 0; i < judete.length; i++) {
            for (var _i = 0, siruta_1 = siruta; _i < siruta_1.length; _i++) {
                var s = siruta_1[_i];
                if (judete[i].judet == s.judet && s.TIP != '40') {
                    s.sinonime = generateS_1.generateS(s.denumireLoc);
                    // s.denumireLoc = accentsTidy(s.denumireLoc);
                    s.denumireLoc = s.denumireLoc.toLowerCase();
                    localitate.push(s);
                }
            }
            judete[i].localitati = _.sortBy(localitate, ["denumireLoc"]);
            localitate = [];
        }
        var sirute = _.sortBy(judete, ["denumireLoc"]);
        update_1.update(x, indexCui, indexDenumire, sirute, localitatiN);
        update_1.update(y, indexCui, indexDenumire, sirute, localitatiN);
        convert.writeFilePromise('./firme1.json', JSON.stringify(x));
        convert.writeFilePromise('./firme2.json', JSON.stringify(y));
        var idx = _.sortBy(indexCui, ['c']);
        var namex = _.sortBy(indexDenumire, ['d']);
        convert.writeFilePromise('./indexCui.json', JSON.stringify(idx));
        convert.writeFilePromise('./indexDenumire.json', JSON.stringify(namex));
        convert.writeFilePromise("./localitatiNegasite.json", JSON.stringify(localitatiN));
        console.log("indexCui, nameIndex done");
        response.sendStatus(200);
    });
});
firmeRouter.get('/store', function (request, response, next) {
    var convert = new convert_1.Converter();
    Promise.all([convert.readFilePromise('./indexCui.json', 'utf-8'),
        convert.readFilePromise('./indexDenumire.json', 'utf-8'),
        convert.readFilePromise('./firme1.json', 'utf-8'),
        convert.readFilePromise('./firme2.json', 'utf-8')])
        .then(function (json) {
        databag_1.DataBag.CuiIndex = JSON.parse(json[0]);
        databag_1.DataBag.NameIndex = JSON.parse(json[1]);
        databag_1.DataBag.Companies = _.union(JSON.parse(json[2]), JSON.parse(json[3]));
        response.sendStatus(200);
    });
});
firmeRouter.get('/company/:id', function (request, response, next) {
    var x = binarySearch_1.binarySearch(databag_1.DataBag.CuiIndex, request.params.id, "c");
    if (x) {
        var company = databag_1.DataBag.Companies[x.i];
        return response.json(company);
    }
    else
        response.sendStatus(404);
});
firmeRouter.post("/companyUpdated", function (request, response, next) {
    db.addCompany(request.body, function (company) {
        response.json(company);
    });
});
firmeRouter.get('/companyDb/:id', function (request, response, next) {
    db.getCompany(request.params.id, function (company) {
        return response.json(company);
    });
});
//# sourceMappingURL=firmeRouter.js.map