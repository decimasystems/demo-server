"use strict";
var fs = require('fs');
var Converter = (function () {
    function Converter() {
    }
    Converter.prototype.csv2json = function (csvFilePath, properties, lineSeparator, valueSeparator, filtru, callback) {
        var ret;
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
                for (var i = 0; i < lines.length; i++) {
                    var jsonVal = {};
                    var line = lines[i];
                    if (line) {
                        var values = line.split(valueSeparator);
                        for (var j = 0; j < properties.length; j++) {
                            var valKey = properties[j];
                            var val = values[j] ? values[j] : '';
                            jsonVal[valKey] = values[j];
                        }
                        if (filtru(jsonVal)) {
                            json.push(jsonVal);
                        }
                    }
                }
            }
            //            console.log("JSON: \n" + JSON.stringify(json));
            callback(json);
        });
    };
    Converter.prototype.suma = function (a, b) {
        return a + b;
    };
    return Converter;
}());
exports.Converter = Converter;
//# sourceMappingURL=convert.js.map