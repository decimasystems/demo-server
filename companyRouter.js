"use strict";
var convert_1 = require("./convert");
var data_1 = require("./data");
var binarySearch_1 = require("./binarySearch");
var convert_2 = require("./convert");
function index(router) {
    var vect = new convert_2.Converter();
    var file1, firme, siruta;
    router.get('/data', function (req, res) {
        console.log("companyrouter");
        data_1.importCompanies(function (y) {
            firme = y;
            return y;
        }, function (x) {
            siruta = x;
            res.sendStatus(200);
        });
    });
    router.get('/load', function (req, res) {
        vect.readFilePromise('./indexCui.json', 'utf-8')
            .then(function (json) {
            file1 = json;
            res.sendStatus(200);
        });
    });
    router.get('/companies/:id', function (req, res) {
        var vect = new convert_2.Converter();
        var company;
        var indexCUI, indexDenumire;
        var f = JSON.parse(file1);
        var x = binarySearch_1.binarySearch(file1, req.params.id);
        company = firme[x];
        var uats = [];
        for (var _i = 0, siruta_1 = siruta; _i < siruta_1.length; _i++) {
            var s = siruta_1[_i];
            if ((convert_1.accentsTidy(s.denumireLoc).match(convert_1.accentsTidy(company.JUDET)) && s.NIV == "1")
                || (convert_1.accentsTidy(s.denumireLoc).match(convert_1.accentsTidy(company.LOCALITATE)))) {
                uats.push(s);
            }
        }
        for (var _a = 0, uats_1 = uats; _a < uats_1.length; _a++) {
            var uat = uats_1[_a];
            if (convert_1.accentsTidy(uat.denumireLoc).match(convert_1.accentsTidy(company.JUDET)) && uat.TIP == "40") {
                company.sirutaJudet = uat.siruta;
            }
            else if (convert_1.accentsTidy(uat.denumireLoc).match(convert_1.accentsTidy(company.LOCALITATE))) {
                company.sirutaLocalitate = uat.siruta;
            }
        }
        res.json(company);
    });
}
exports.index = index;
//# sourceMappingURL=companyRouter.js.map