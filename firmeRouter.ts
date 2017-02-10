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
            for (let s of siruta) {
                s.denumireLoc = accentsTidy(s.denumireLoc);
                s.denumireLoc = shortName(s.denumireLoc, s.TIP);
                if (s.TIP == '40')
                    judete.push(s);
            }
            var localitate=[];
            for (let j of judete) {
                for (let s of siruta){
                    if (j.judet == s.judet && s.TIP != '40')
                        localitate.push(s);
                }
                j.localitati = _.sortBy(localitate, ["denumireLoc"]);
                localitate=[];
            }
            var sirute = _.sortBy(judete, ["denumireLoc"])
            for (let company of x) {
                var judet = binarySearchString(sirute, accentsTidy(company.JUDET), 'denumireLoc');
                var localitati = judet.localitati;
                var loc = binarySearchString(localitati, accentsTidy(company.LOCALITATE), 'denumireLoc')
                company.sirutaJudet = judet.siruta;
                company.sirutaLocalitate = loc.siruta;
            }
            convert.writeFilePromise('./firme.json', JSON.stringify(x));
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