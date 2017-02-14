"use strict";
var express_1 = require("express");
var _ = require("lodash");
var databag_1 = require("./databag");
var convert_1 = require("./convert");
var config_1 = require("./config");
var accentsTidy_1 = require("./accentsTidy");
var shortName_1 = require("./shortName");
var binarySearchString_1 = require("./binarySearchString");
var binarySearch_1 = require("./binarySearch");
var whiteSpaceSep_1 = require("./whiteSpaceSep");
var search_1 = require("./search");
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
    var file1 = convert.csv2jsonPromise(properties.companiesPath, properties.companiesProperties, null, '|', filter);
    var file2 = convert.csv2jsonPromise(properties.companiesPath2, properties.companiesProperties, null, '|', filter);
    var sirute = convert.csv2jsonPromise(properties.sirutaPath, properties.sirutaProperties, null, null, filter);
    Promise.all([file1, file2, sirute])
        .then(function (json) {
        var x = json[0].concat(json[1]);
        var siruta = json[2];
        var judete = [];
        for (var i = 0; i < siruta.length; i++) {
            //siruta[i].denumireLoc = accentsTidy(siruta[i].denumireLoc);
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
                    s.denumireLoc = accentsTidy_1.accentsTidy(s.denumireLoc);
                    /*if (s.denumireLoc.charAt(0) == 'î') {
                        s.denumireI = s.denumireLoc.charAt(0).replace(/[î]/, 'i');
                        s.denumireA = s.denumireLoc;
                    }
                    else {
                        s.denumireA = s.denumireLoc.replace(/[âââîî]/g, 'a');
                        s.denumireI = s.denumireLoc.replace(/[âââîî]/g, 'i');
                    }*/
                    localitate.push(s);
                }
            }
            judete[i].localitati = _.sortBy(localitate, ["denumireLoc"]);
            localitate = [];
        }
        var sirute = _.sortBy(judete, ["denumireLoc"]);
        for (var i = 0; i < x.length; i++) {
            if (x[i].JUDET && x[i].LOCALITATE) {
                var j = accentsTidy_1.accentsTidy(x[i].JUDET);
                var judet = binarySearchString_1.binarySearchString(sirute, whiteSpaceSep_1.whiteSpaceSeparator(j), 'denumireLoc');
                var localitati = judet.localitati;
                var l = accentsTidy_1.accentsTidy(x[i].LOCALITATE);
                var loc = search_1.search(localitati, whiteSpaceSep_1.whiteSpaceSeparator(l), 'denumireLoc');
                x[i].sirutaJudet = judet.siruta;
                x[i].sirutaLocalitate = loc.siruta;
            }
            console.log((i + 1) + "/" + x.length);
        }
        convert.writeFilePromise('./firme.json', JSON.stringify(x));
        //response.json(x);
        return x;
    }).then(function (x) {
        var indexCui = [], indexDenumire = [];
        for (var i = 0; i < x.length; i++) {
            indexCui.push({ c: x[i].CUI, i: i });
            indexDenumire.push({ d: x[i].DENUMIRE, i: i });
        }
        var idx = _.sortBy(indexCui, ['c']);
        var namex = _.sortBy(indexDenumire, ['d']);
        convert.writeFilePromise('./indexCui.json', JSON.stringify(idx));
        convert.writeFilePromise('./indexDenumire.json', JSON.stringify(namex));
        console.log("indexCui, nameIndex done");
        response.sendStatus(200);
    });
});
firmeRouter.get('/store', function (request, response, next) {
    var convert = new convert_1.Converter();
    Promise.all([convert.readFilePromise('./indexCui.json', 'utf-8'),
        convert.readFilePromise('./indexDenumire.json', 'utf-8'),
        convert.readFilePromise('./firme.json', 'utf-8')])
        .then(function (json) {
        databag_1.DataBag.CuiIndex = JSON.parse(json[0]);
        databag_1.DataBag.NameIndex = JSON.parse(json[1]);
        databag_1.DataBag.Companies = JSON.parse(json[2]);
    });
    response.sendStatus(200);
});
firmeRouter.get('/company/:id', function (request, response, next) {
    var x = binarySearch_1.binarySearch(databag_1.DataBag.CuiIndex, request.params.id, "c");
    var company = databag_1.DataBag.Companies[x.i];
    response.json(company);
});
//# sourceMappingURL=firmeRouter.js.map