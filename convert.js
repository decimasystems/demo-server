"use strict";
//const fs = require('fs');
var fs = require("fs-extra");
var Converter = (function () {
    function Converter() {
    }
    Converter.prototype.csv2json = function (csvFilePath, properties, lineSeparator, valueSeparator, filtru, callback) {
        lineSeparator = lineSeparator ? lineSeparator : /\r|\n/;
        valueSeparator = valueSeparator ? valueSeparator : ',';
        fs.readFile(csvFilePath, 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                return err;
            }
            var csv = data;
            var json = [];
            if (csv) {
                var lines = csv.split(lineSeparator);
                for (var i = 1; i < lines.length; i++) {
                    var jsonVal = {};
                    var line = lines[i];
                    if (line) {
                        var values = line.split(valueSeparator);
                        for (var j = 0; j < properties.length; j++) {
                            var valKey = properties[j];
                            values[j] = values[j].replace(/["]/g, '');
                            var val = values[j] ? values[j] : '';
                            jsonVal[valKey] = values[j];
                        }
                        if (filtru(jsonVal)) {
                            json.push(jsonVal);
                        }
                    }
                }
            }
            callback(json);
        });
    };
    Converter.prototype.csv2jsonPromise = function (csvFilePath, properties, lineSeparator, valueSeparator, callback) {
        if (callback === void 0) { callback = null; }
        lineSeparator = lineSeparator ? lineSeparator : /\r|\n/;
        valueSeparator = valueSeparator ? valueSeparator : ';';
        return this.readFilePromise(csvFilePath, 'utf-8').then(function (csv) {
            var json = [];
            if (csv) {
                var lines = csv.split(lineSeparator);
                for (var i = 0; i < lines.length; i++) {
                    var jsonVal = {};
                    var line = lines[i];
                    if (line) {
                        var values = line.split(valueSeparator);
                        for (var j = 0; j < properties.length; j++) {
                            var valKey = properties[j];
                            if ((/["]/g).test(values[j])) {
                                values[j] = values[j].replace(/["]/g, '');
                            }
                            var val = values[j] ? values[j] : '';
                            jsonVal[valKey] = values[j];
                        }
                        if (callback && callback(jsonVal)) {
                            json.push(jsonVal);
                        }
                    }
                }
            }
            return json;
        }, function (err) {
            throw err;
        });
    };
    Converter.prototype.readFilePromise = function (filename, encoding) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filename, encoding, function (err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    };
    ;
    Converter.prototype.writeFilePromise = function (filename, data) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(filename, data, function (err) {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    };
    return Converter;
}());
exports.Converter = Converter;
function accentsTidy(s) {
    if (s) {
        var r = s.toLowerCase();
        r = r.replace(new RegExp(/[âăî]/g), "a");
        r = r.replace(new RegExp(/[şşș]/g), "s");
        r = r.replace(new RegExp(/[ț]/g), "t");
        return r;
    }
    return s;
}
exports.accentsTidy = accentsTidy;
;
function shortName(denumireLoc, tip) {
    if (tip == '40') {
        denumireLoc = denumireLoc.split(' ');
        if (denumireLoc.length == 3) {
            denumireLoc = "" + denumireLoc[1] + " " + denumireLoc[2];
        }
        else {
            denumireLoc = "" + denumireLoc[1];
        }
    }
    return denumireLoc;
}
exports.shortName = shortName;
//# sourceMappingURL=convert.js.map