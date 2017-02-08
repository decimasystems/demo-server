"use strict";
var _ = require("lodash");
var convert_1 = require("./convert");
var config_1 = require("./config");
function importCompanies(companies, callback) {
    var firme, file1;
    var vect = new convert_1.Converter();
    var properties = new config_1.Properties();
    var filter = function (item) {
        return true;
    };
    var indexCUI = [];
    var indexDenumire = [];
    var firme1 = vect.csv2jsonPromise(properties.companiesPath, properties.companiesProperties, null, '|', filter);
    var firme2 = vect.csv2jsonPromise(properties.companiesPath2, properties.companiesProperties, null, '|', filter);
    Promise.all([firme1, firme2])
        .then(function (json) {
        firme = json[0].concat(json[1]);
        companies(firme);
        for (var i = 0; i < firme.length; i++) {
            indexCUI.push({ index: i, CUI: firme[i].CUI });
            indexDenumire.push({ index: i, denumire: firme[i].DENUMIRE });
        }
        indexCUI = _.sortBy(indexCUI, ['CUI']);
        indexDenumire = _.sortBy(indexDenumire, ['denumire']);
        return indexCUI;
    }).then(function (indexCUI) {
        vect.writeFilePromise('./indexCui.json', JSON.stringify(indexCUI));
        vect.writeFilePromise('./indexDenumire.json', JSON.stringify(indexDenumire));
    });
    vect.csv2jsonPromise(properties.sirutaPath, properties.sirutaProperties, null, null, filter)
        .then(function (json) {
        callback(json);
    });
}
exports.importCompanies = importCompanies;
//# sourceMappingURL=data.js.map