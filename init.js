"use strict";
var convert_1 = require("./convert");
var databag_1 = require("./databag");
var _ = require("lodash");
var InitStore = (function () {
    function InitStore() {
    }
    InitStore.load = function () {
        if (databag_1.DataBag.CuiIndex) {
            return Promise.resolve(databag_1.DataBag.CuiIndex.length); //already loaded data
        }
        return new Promise(function (resolve, reject) {
            var convert = new convert_1.Converter();
            Promise.all([convert.readFilePromise('./indexCui.json', 'utf-8'),
                convert.readFilePromise('./indexDenumire.json', 'utf-8'),
                convert.readFilePromise('./firme1.json', 'utf-8'),
                convert.readFilePromise('./firme2.json', 'utf-8')])
                .then(function (json) {
                databag_1.DataBag.CuiIndex = JSON.parse(json[0]);
                databag_1.DataBag.NameIndex = JSON.parse(json[1]);
                databag_1.DataBag.Companies = _.union(JSON.parse(json[2]), JSON.parse(json[3]));
                resolve(databag_1.DataBag.CuiIndex.length);
            });
        });
    };
    return InitStore;
}());
exports.InitStore = InitStore;
//# sourceMappingURL=init.js.map