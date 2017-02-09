import { Router, Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { DataBag } from './databag'
import { Converter } from './convert';
import { Properties } from './config';
import { accentsTidy, shortName } from './convert';
import { binarySearchString } from './binarySearchString';
import { binarySearch } from './binarySearch';
const firmeRouter: Router = Router();
firmeRouter.all('*', (request: Request, response: Response, next: NextFunction) => {
    console.log('firmeRouter');
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
            var x = json[0].concat(json[1]);
            convert.writeFilePromise('./firme.json', JSON.stringify(x))

            var siruta = json[2];
           // var judete = [];
            for (let s of siruta) {
                s.denumireLoc = accentsTidy(s.denumireLoc);
                s.denumireLoc = shortName(s.denumireLoc, s.TIP);
               // if (s.TIP == '40')
                  //  judete.push(s);
            }
          /*  var localitate = [];
            for (let j of judete) {
                for (let s of siruta) {
                    if (j.judet == s.judet)
                        localitate.push(s);
                }
                j.localitati=localitate;

            }*/

            var sirute = _.sortBy(siruta, ["denumireLoc"])
            convert.writeFilePromise('./siruta.json', JSON.stringify(sirute));
            return x;
            // response.json(judete)
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
            response.sendStatus(200);
        })

})

firmeRouter.get('/store', (request: Request, response: Response, next: NextFunction) => {
    var convert = new Converter();
    Promise.all([convert.readFilePromise('./indexCui.json', 'utf-8'),
    convert.readFilePromise('./indexDenumire.json', 'utf-8'),
    convert.readFilePromise('./firme.json', 'utf-8'),
    convert.readFilePromise('./siruta.json', 'utf-8')])
        .then((json: any) => {

            DataBag.CuiIndex = JSON.parse(json[0]);
            DataBag.NameIndex = JSON.parse(json[1]);
            DataBag.Companies = JSON.parse(json[2]);
            DataBag.Siruta = JSON.parse(json[3]);
            //console.log(DataBag.CuiIndex)
        })

    response.sendStatus(200);
})
firmeRouter.get('/company/:id', (request: Request, response: Response, next: NextFunction) => {
    var x = binarySearch(DataBag.CuiIndex, request.params.id, "c");
    var company = DataBag.Companies[x.i];
    var judet = binarySearchString(DataBag.Siruta, accentsTidy(company.JUDET), 'denumireLoc');
    var localitati;
    var localitate = binarySearchString(DataBag.Siruta, accentsTidy(company.LOCALITATE), 'denumireLoc')
    company.sirutaJudet = judet.siruta;
    company.sirutaLocalitate = localitate.siruta;
    response.json(company);
})
export { firmeRouter };