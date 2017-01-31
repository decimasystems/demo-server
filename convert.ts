var fs = require('fs');
export class Converter {
    csv2json(csvFilePath, properties, lineSeparator, valueSeparator, filtru: (item) => boolean, callback: (x) => void) {
        var ret;
        lineSeparator = lineSeparator ? lineSeparator : /\r|\n/;
        valueSeparator = valueSeparator ? valueSeparator : ',';

        fs.readFile(csvFilePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                return err;
            }

            var csv = data;
            var json = [];
            if (csv) {
                var lines = csv.split(lineSeparator);
                for (let i = 0; i < lines.length; i++) {
                    var jsonVal = {};
                    var line = lines[i];
                    if (line) {
                        var values = line.split(valueSeparator);
                        for (let j = 0; j < properties.length; j++) {
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


    }
    suma(a, b) {
        return a + b;
    }


}


