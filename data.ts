import * as _ from 'lodash'
import { Converter } from './convert'
import {companiesPath,companiesProperties,companiesPath2,sirutaPath,sirutaProperties} from './config'
export function importCompanies(companies:(y:any)=>any,callback:(x:any)=>any){ 
    var firme,file1,siruta;
    var vect = new Converter();
    var filter = (item) => {
        return true;
    }
    var indexCUI = [];
    var indexDenumire = [];
    var firme1 = vect.csv2jsonPromise(companiesPath, companiesProperties, null, '|', filter);
    var firme2 = vect.csv2jsonPromise(companiesPath2, companiesProperties, null, '|', filter);
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
        }).then(() => {
           return vect.readFilePromise('./indexCui.json', 'utf-8')
        }).then((json) => {
            file1 = json;
             callback(file1);
        });

    /*Promise.all([vect.writeFilePromise('./indexCui.json', JSON.stringify(indexCUI)),
             vect.writeFilePromise('./indexDenumire.json', JSON.stringify(indexDenumire))])
        .then(() => {
            file1 = vect.readFilePromise('./indexCui.json', 'utf-8')
        })*/
    
}