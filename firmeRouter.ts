import { Router, Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import * as db from './db';
import { DataBag } from './databag'
import { Converter } from './convert';
import { Properties } from './config';
import { accentsTidy } from './accentsTidy';
import { shortName } from './shortName';
import { binarySearchString } from './binarySearchString';
import { binarySearch } from './binarySearch';
import { whiteSpaceSeparator } from './whiteSpaceSep';
import { generateS } from './generateS';
import { update } from './update';
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
    Promise.all([convert.csv2jsonPromise(properties.companiesPath, properties.companiesProperties, null, '|', filter),
    convert.csv2jsonPromise(properties.companiesPath2, properties.companiesProperties, null, '|', filter),
    convert.csv2jsonPromise(properties.sirutaPath, properties.sirutaProperties, null, null, filter)])
        .then((json) => {
            var x = json[0];
            var y = json[1];
            var siruta = json[2];
            var judete = [];
            var indexCui = [], indexDenumire = [];
            var localitatiN = [];

            for (let i = 0; i < siruta.length; i++) {
                siruta[i].denumireLoc = shortName(siruta[i].denumireLoc, siruta[i].TIP);
                siruta[i].denumireLoc = whiteSpaceSeparator(siruta[i].denumireLoc);
                if (siruta[i].TIP == '40') {
                    siruta[i].denumireLoc = accentsTidy(siruta[i].denumireLoc);
                    judete.push(siruta[i]);
                }
            }
            var localitate = [];
            for (let i = 0; i < judete.length; i++) {
                for (let s of siruta) {
                    if (judete[i].judet == s.judet && s.TIP != '40') {
                        s.sinonime = generateS(s.denumireLoc);
                        // s.denumireLoc = accentsTidy(s.denumireLoc);
                        s.denumireLoc = s.denumireLoc.toLowerCase();
                        localitate.push(s);
                    }
                }
                judete[i].localitati = _.sortBy(localitate, ["denumireLoc"]);
                localitate = [];
            }
            var sirute = _.sortBy(judete, ["denumireLoc"])
            update(x, indexCui, indexDenumire, sirute, localitatiN);
            update(y, indexCui, indexDenumire, sirute, localitatiN);
            convert.writeFilePromise('./firme1.json', JSON.stringify(x));
            convert.writeFilePromise('./firme2.json', JSON.stringify(y));
            var idx = _.sortBy(indexCui, ['c']);
            var namex = _.sortBy(indexDenumire, ['d']);
            convert.writeFilePromise('./indexCui.json', JSON.stringify(idx));
            convert.writeFilePromise('./indexDenumire.json', JSON.stringify(namex));
            //convert.writeFilePromise("./localitatiNegasite.json", JSON.stringify(localitatiN));
            console.log("indexCui, nameIndex done");
            response.sendStatus(200);
        })
})

firmeRouter.get('/store', (request: Request, response: Response, next: NextFunction) => {
    var convert = new Converter();
    Promise.all([convert.readFilePromise('./indexCui.json', 'utf-8'),
    convert.readFilePromise('./indexDenumire.json', 'utf-8'),
    convert.readFilePromise('./firme1.json', 'utf-8'),
    convert.readFilePromise('./firme2.json', 'utf-8')])
        .then((json: any) => {
            DataBag.CuiIndex = JSON.parse(json[0]);
            DataBag.NameIndex = JSON.parse(json[1]);
            DataBag.Companies = _.union(JSON.parse(json[2]), JSON.parse(json[3]));
            response.sendStatus(200);
        })

})
firmeRouter.get('/company/:id', (request: Request, response: Response, next: NextFunction) => {
    var x = binarySearch(DataBag.CuiIndex, request.params.id, "c");
    if (x) {
        var company = DataBag.Companies[x.i];
        return response.json(company);
    }
    else
         response.sendStatus(404);

})

firmeRouter.post("/companyUpdated",(request:Request,response:Response,next:NextFunction)=>{
    db.addCompany(request.body,(company)=>{
        response.json(company);
    })
})
firmeRouter.get('/companyDb/:id',(request:Request,response:Response,next:NextFunction)=>{
    db.getCompany(request.params.id,(company)=>{
        return response.json(company);
    })
})
export { firmeRouter };