"use strict";
var express_1 = require("express");
var _ = require("lodash");
var databag_1 = require("./databag");
var convert_1 = require("./convert");
var config_1 = require("./config");
var convert_2 = require("./convert");
var binarySearchString_1 = require("./binarySearchString");
var binarySearch_1 = require("./binarySearch");
var firmeRouter = express_1.Router();
exports.firmeRouter = firmeRouter;
firmeRouter.all('*', function (request, response, next) {
    console.log('firmeRouter');
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
        convert.writeFilePromise('./firme.json', JSON.stringify(x));
        var siruta = json[2];
        // var judete = [];
        for (var _i = 0, siruta_1 = siruta; _i < siruta_1.length; _i++) {
            var s = siruta_1[_i];
            s.denumireLoc = convert_2.accentsTidy(s.denumireLoc);
            s.denumireLoc = convert_2.shortName(s.denumireLoc, s.TIP);
        }
        /*  var localitate = [];
          for (let j of judete) {
              for (let s of siruta) {
                  if (j.judet == s.judet)
                      localitate.push(s);
              }
              j.localitati=localitate;

          }*/
        var sirute = _.sortBy(siruta, ["denumireLoc"]);
        convert.writeFilePromise('./siruta.json', JSON.stringify(sirute));
        return x;
        // response.json(judete)
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
        response.sendStatus(200);
    });
});
firmeRouter.get('/store', function (request, response, next) {
    var convert = new convert_1.Converter();
    Promise.all([convert.readFilePromise('./indexCui.json', 'utf-8'),
        convert.readFilePromise('./indexDenumire.json', 'utf-8'),
        convert.readFilePromise('./firme.json', 'utf-8'),
        convert.readFilePromise('./siruta.json', 'utf-8')])
        .then(function (json) {
        databag_1.DataBag.CuiIndex = JSON.parse(json[0]);
        databag_1.DataBag.NameIndex = JSON.parse(json[1]);
        databag_1.DataBag.Companies = JSON.parse(json[2]);
        databag_1.DataBag.Siruta = JSON.parse(json[3]);
        //console.log(DataBag.CuiIndex)
    });
    response.sendStatus(200);
});
firmeRouter.get('/company/:id', function (request, response, next) {
    var x = binarySearch_1.binarySearch(databag_1.DataBag.CuiIndex, request.params.id, "c");
    var company = databag_1.DataBag.Companies[x.i];
    var judet = binarySearchString_1.binarySearchString(databag_1.DataBag.Siruta, convert_2.accentsTidy(company.JUDET), 'denumireLoc');
    var localitati;
    var localitate = binarySearchString_1.binarySearchString(databag_1.DataBag.Siruta, convert_2.accentsTidy(company.LOCALITATE), 'denumireLoc');
    company.sirutaJudet = judet.siruta;
    company.sirutaLocalitate = localitate.siruta;
    response.json(company);
});
//# sourceMappingURL=firmeRouter.js.map