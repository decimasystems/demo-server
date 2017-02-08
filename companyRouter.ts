import { Router, Request, Response, NextFunction } from 'express';
import { accentsTidy } from './convert';
import { importCompanies } from './data';
import { binarySearch } from './binarySearch';
import { Converter } from './convert';

import { DataBag } from './databag'

const companyRouter: Router = Router();

companyRouter.all('*', (request: Request, response: Response, next: NextFunction) => {
    console.log('companyRouter');
    next();
})

//if this is the method for generating the indexes , why do you load data here ??
companyRouter.get('/data', function (request: Request, response: Response, next: NextFunction){
    var vect = new Converter();
    console.log("companyrouter/data");
    importCompanies((y) => {
        DataBag.Companies = y;
        return y;
    }, (x) => {
        DataBag.Siruta = x;
        response.sendStatus(200);
    });
});

//this is where you load all the necessary data 
companyRouter.get('/load', (request: Request, response: Response, next: NextFunction) => {
    console.log('companyRouter/load'); 
    var vect = new Converter();
    vect.readFilePromise('./indexCui.json', 'utf-8')
        .then((idxCui:any) => {
            DataBag.CuiIndex = JSON.parse(idxCui);
            response.sendStatus(200);
        });
});

companyRouter.get('/companies/:id', (request: Request, response: Response, next: NextFunction) => {
    console.log('companyRouter/companies/' + request.params.id); 
    var vect = new Converter();
    var indexCUI, indexDenumire;
    //TODO: make sure we have CuiIndex loaded and if not return a correct error message
    var x = binarySearch(DataBag.CuiIndex, request.params.id);
    var company = DataBag.Companies[x];
    var uats = [];

    //TODO: remove iterations over Siruta?
    // it takes around 80 ms for this, so we need to optimize this one also
    for (let s of DataBag.Siruta) {
        if ((accentsTidy(s.denumireLoc).match(accentsTidy(company.JUDET)) && s.NIV == "1")
            || (accentsTidy(s.denumireLoc).match(accentsTidy(company.LOCALITATE)))) {
            uats.push(s);
        }
    }

    //TOOD: optimize this so that we can get bellow 20ms
    for (let uat of uats) {
        if (accentsTidy(uat.denumireLoc).match(accentsTidy(company.JUDET)) && uat.TIP == "40") {
            company.sirutaJudet = uat.siruta;
        }
        else if (accentsTidy(uat.denumireLoc).match(accentsTidy(company.LOCALITATE))) {
            company.sirutaLocalitate = uat.siruta;
        }
    }
    response.json(company);

});

export {companyRouter};