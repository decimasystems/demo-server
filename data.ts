import * as _ from 'lodash'
import { Converter } from './convert'
import { Properties } from './config'
export function importCompanies(companies: (y: any) => any, callback: (x: any) => any) {
    var firme, file1;
    var vect = new Converter();
    var properties = new Properties();
    var filter = (item) => {
        return true;
    }
    var indexCUI = [];
    var indexDenumire = [];
    var firme1 = vect.csv2jsonPromise(properties.companiesPath, properties.companiesProperties, null, '|', filter);
    var firme2 = vect.csv2jsonPromise(properties.companiesPath2, properties.companiesProperties, null, '|', filter);
    Promise.all([firme1, firme2])
        .then((json) => {
            firme = json[0].concat(json[1]);
            companies(firme);
            for (var i = 0; i < firme.length; i++) {
                indexCUI.push({ index: i, CUI: firme[i].CUI });
                indexDenumire.push({ index: i, denumire: firme[i].DENUMIRE });
            }
            indexCUI = _.sortBy(indexCUI, ['CUI']);
            indexDenumire = _.sortBy(indexDenumire, ['denumire']);
            return indexCUI;
        }).then((indexCUI) => {
            vect.writeFilePromise('./indexCui.json', JSON.stringify(indexCUI));
            vect.writeFilePromise('./indexDenumire.json', JSON.stringify(indexDenumire))
        })


    vect.csv2jsonPromise(properties.sirutaPath, properties.sirutaProperties, null, null, filter)
        .then((json) => {
            callback(json);
        })
}