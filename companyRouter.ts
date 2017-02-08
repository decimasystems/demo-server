import * as express from 'express';
import { accentsTidy } from './convert';
import { importCompanies } from './data';
import { binarySearch } from './binarySearch';
import { Converter } from './convert';
export function index(router: express.Router) {
    var vect = new Converter();
    var file1, firme, siruta;

    router.get('/data', (req, res) => {
        console.log("companyrouter");
        importCompanies((y) => {
            firme = y;
            return y;
        }, (x) => {
            siruta = x;
            res.sendStatus(200);
        });
    })
    router.get('/load', (req, res) => {
        vect.readFilePromise('./indexCui.json', 'utf-8')
            .then((json) => {
                file1 = json;
                res.sendStatus(200);
            });
    })
    router.get('/companies/:id', (req, res) => {
        var vect = new Converter();
        var company;
        var indexCUI, indexDenumire;
        var f = JSON.parse(file1);
        var x = binarySearch(file1, req.params.id);
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
        res.json(company);

    });
}