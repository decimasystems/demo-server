import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as db from "./db";
import * as _ from 'lodash';

import * as cardRouter from './cardRouter';
import * as sirutaRouter from './sirutaRouter';
import {companyRouter} from './companyRouter';

import { importCompanies } from './data';
import { binarySearch } from './binarySearch';
import { accentsTidy } from './convert';
import * as cors from 'cors';
import { Converter } from './convert';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.all('*',(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    console.log("All express");
    next();
})

app.use("/company", companyRouter);

/*app.use("/cards", cardRouter);
app.use("/siruta", sirutaRouter);
app.use('/company',companyRouter );*/
/*app.get('/data', (req, res) => {
    importCompanies((y) => {
        firme=y;
        return y;
    }, (x) => {
       // return x;
       siruta=x;
        res.sendStatus(200);
    });

})
app.get('/load', (req, res) => {
    vect.readFilePromise('./indexCui.json', 'utf-8')
        .then((json) => {
            file1=json;
            res.sendStatus(200);
        })
})
app.get('/companies/:id', (req, res) => {
        var vect = new Converter();
        var company;
        var indexCUI, indexDenumire;
     var  file=JSON.parse(file1);
        var x = binarySearch(file, req.params.id);
        company = firme[x];
        var uats = [];
        for (let s of siruta) {
            if ((accentsTidy(s.denumireLoc).match(accentsTidy(company.JUDET)) && s.NIV == "1")
                || (accentsTidy(s.denumireLoc).match(accentsTidy(company.LOCALITATE)))) {
                uats.push(s);
            }
        }
        for (let uat of uats) {
            if (accentsTidy(uat.denumireLoc).match(accentsTidy(company.JUDET)) && uat.TIP == "40") {
                company.sirutaJudet = uat.siruta;
            }
            else if (accentsTidy(uat.denumireLoc).match(accentsTidy(company.LOCALITATE))) {
                company.sirutaLocalitate = uat.siruta;
            }
        }
        res.json(company)
    })*/

const server = app.listen(4000, () => {
    console.log('rest service running on port 4000')
})

