import { Converter } from './convert';
import { DataBag } from './databag';
import * as _ from 'lodash';
import * as fs from 'fs';

export class InitStore {
    public static load() {
        if (fs.existsSync('./firme1.json') &&
            fs.existsSync('./firme2.json') &&
            fs.existsSync('./indexCui.json') &&
            fs.existsSync('./indexDenumire.json')) {
            if (DataBag.CuiIndex) {
                return Promise.resolve(DataBag.CuiIndex.length); //already loaded data
            }
            return new Promise((resolve, reject) => {
                var convert = new Converter();
                Promise.all([convert.readFilePromise('./indexCui.json', 'utf-8'),
                convert.readFilePromise('./indexDenumire.json', 'utf-8'),
                convert.readFilePromise('./firme1.json', 'utf-8'),
                convert.readFilePromise('./firme2.json', 'utf-8')])
                    .then((json: any) => {
                        DataBag.CuiIndex = JSON.parse(json[0]);
                        DataBag.NameIndex = JSON.parse(json[1]);
                        DataBag.Companies = _.union(JSON.parse(json[2]), JSON.parse(json[3]));
                        resolve(DataBag.CuiIndex.length);
                    })
            })
        }
        else {
            return Promise.resolve();

        }
    }
}