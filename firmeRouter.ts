import { Router, Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { DataBag } from './databag'
import { Converter } from './convert';
import { Properties } from './config';
import { accentsTidy} from './accentsTidy';
import {shortName} from './shortName';
import { binarySearchString } from './binarySearchString';
import { binarySearch } from './binarySearch';
import {whiteSpaceSeparator} from './whiteSpaceSep';
const firmeRouter: Router = Router();
firmeRouter.all('*', (request: Request, response: Response, next: NextFunction) => {

    next();
})

firmeRouter.get('/index', (request: Request, response: Response, next: NextFunction) => {
    const convert = new Converter();
    const properties = new Properties();

    var filter = (item) => {
        return true;
    }
    var file1 = convert.csv2jsonPromise(properties.companiesPath, properties.companiesProperties, null, '|', filter);
    var file2 = convert.csv2jsonPromise(properties.companiesPath2, properties.companiesProperties, null, '|', filter);
    var sirute = convert.csv2jsonPromise(properties.sirutaPath, properties.sirutaProperties, null, null, filter);
    Promise.all([file1, file2, sirute])
        .then((json) => {
            var x = json[0].concat(json[1])
            var siruta = json[2];
            var judete = [];
            for ( var i=0;i<siruta.length;i++) {
              siruta[i].denumireLoc = accentsTidy(siruta[i].denumireLoc);
                siruta[i].denumireLoc = shortName(siruta[i].denumireLoc, siruta[i].TIP);
                siruta[i].denumireLoc=whiteSpaceSeparator(siruta[i].denumireLoc);
                if (siruta[i].TIP == '40'){
                   // siruta[i].denumireLoc=accentsTidy(siruta[i].denumireLoc);
                    judete.push(siruta[i]);
                }
                    
            }
            var localitate = [];
            for (var i=0;i<judete.length;i++) {
                for (let s of siruta) {
                    if (judete[i].judet == s.judet && s.TIP != '40'){
                        localitate.push(s);
                    }
                        
                }
                judete[i].localitati = _.sortBy(localitate, ["denumireLoc"]);
                localitate = [];
                
            }
           
            
            var sirute = _.sortBy(judete, ["denumireLoc"])
            for (var i=0;i<x.length;i++) {
                if(x[i].JUDET && x[i].LOCALITATE){
                var j=accentsTidy(x[i].JUDET)
                var judet = binarySearchString(sirute, whiteSpaceSeparator(j), 'denumireLoc');
                var localitati = judet.localitati;
                var l=accentsTidy(x[i].LOCALITATE)
                var loc = binarySearchString(localitati, whiteSpaceSeparator(l), 'denumireLoc')
                x[i].sirutaJudet = judet.siruta;
                x[i].sirutaLocalitate = loc.siruta;
                }
                console.log((i+1)+"/"+x.length);
            }
            convert.writeFilePromise('./firme.json', JSON.stringify(x));
           //response.json(x);
          return x
        }).then((x) => {
            var indexCui = [], indexDenumire = [];
            for (let i = 0; i < x.length; i++) {
                indexCui.push({ c: x[i].CUI, i: i });
                indexDenumire.push({ d: x[i].DENUMIRE, i: i });
            }
            var idx = _.sortBy(indexCui, ['c']);
            var namex = _.sortBy(indexDenumire, ['d']);
            convert.writeFilePromise('./indexCui.json', JSON.stringify(idx));
            convert.writeFilePromise('./indexDenumire.json', JSON.stringify(namex));
            console.log("indexCui, nameIndex done");
            response.sendStatus(200);
        })
})

firmeRouter.get('/store', (request: Request, response: Response, next: NextFunction) => {
    var convert = new Converter();
    Promise.all([convert.readFilePromise('./indexCui.json', 'utf-8'),
    convert.readFilePromise('./indexDenumire.json', 'utf-8'),
    convert.readFilePromise('./firme.json', 'utf-8')])
        .then((json: any) => {

            DataBag.CuiIndex = JSON.parse(json[0]);
            DataBag.NameIndex = JSON.parse(json[1]);
            DataBag.Companies = JSON.parse(json[2]);

        })

    response.sendStatus(200);
})
firmeRouter.get('/company/:id', (request: Request, response: Response, next: NextFunction) => {
    var x = binarySearch(DataBag.CuiIndex, request.params.id, "c");
    var company = DataBag.Companies[x.i];

    response.json(company);
})
export { firmeRouter };