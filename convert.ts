//const fs = require('fs');
import * as fs from 'fs-extra';
export class Converter {
    csv2json(csvFilePath, properties, lineSeparator, valueSeparator, filtru: (item) => boolean, callback: (x) => void) {

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
                for (let i = 1; i < lines.length; i++) {
                    var jsonVal = {};
                    var line = lines[i];
                    if (line) {
                        var values = line.split(valueSeparator);
                        for (let j = 0; j < properties.length; j++) {
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

    }

    csv2jsonPromise(csvFilePath, properties, lineSeparator, valueSeparator, callback: (x) => boolean = null) {
        lineSeparator = lineSeparator ? lineSeparator : /\r|\n/;
        valueSeparator = valueSeparator ? valueSeparator : ';';
        return this.readFilePromise(csvFilePath, 'utf-8').then((csv: any) => {
            var json = [];
            if (csv) {
                var lines = csv.split(lineSeparator);
                for (let i = 0; i < lines.length; i++) {
                    var jsonVal = {};
                    var line = lines[i];
                    if (line) {
                        var values = line.split(valueSeparator);
                        if (values.length > properties.length) {
                            values[0] = values[0].concat(values[1]);
                        for(var index=1;index<values.length-1;index++){
                            values[index]=values[index+1];
                        }
                        values.length=values.length-1;
                        }

                        for (let j = 0; j < properties.length; j++) {
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

        }, (err) => {
            throw err;
        });
    }
    readFilePromise(filename, encoding) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, encoding, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    };
    writeFilePromise(filename, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filename, data, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            })
        })

    }
}

