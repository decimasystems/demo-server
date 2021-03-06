import { Router, Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { titleCase } from './titlecase';
import { Properties } from './config';
import { Converter } from './convert';
const sirutaRouter: Router = Router();
sirutaRouter.all('*', (request: Request, response: Response, next: NextFunction) => {
    next();
})

sirutaRouter.get('/file', (request: Request, response: Response, next: NextFunction) => {
    var properties = new Properties();
    var vect = new Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';', (item) => {
        return true;
    }, (x) => { return JSON.stringify(x); })
})
sirutaRouter.get('/counties', (request: Request, response: Response, next: NextFunction) => {
    var properties = new Properties();
    var vect = new Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';',
        (item) => {
            return item.TIP == '40';
        },
        (x) => {
            var rez: any = [];
            for (let c of x) {
                c.denumireLoc = c.denumireLoc.split(' ');
                if (c.denumireLoc.length == 3) {
                    c.denumireLoc = "" + c.denumireLoc[1] + " " + c.denumireLoc[2];
                }
                else {
                    c.denumireLoc = "" + c.denumireLoc[1];
                }
                c.denumireLoc = titleCase(c.denumireLoc);
                rez.push(c);
            }

            return response.json(rez);
        })
});
sirutaRouter.get("/county/:id", (request: Request, response: Response, next: NextFunction) => {
    var properties = new Properties();
    var vect = new Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';',
        (item) => {
            return item.TIP == '40' && item.judet == request.params.id;
        },
        (x) => {
            for (let c of x) {
                c.denumireLoc = c.denumireLoc.split(' ');
                if (c.denumireLoc.length == 3) {
                    c.denumireLoc = "" + c.denumireLoc[1] + " " + c.denumireLoc[2];
                }
                else {
                    c.denumireLoc = "" + c.denumireLoc[1];
                }
                c.denumireLoc = titleCase(c.denumireLoc);
            }
            return response.json(x[0]);
        })
})
sirutaRouter.get("/:id", (request: Request, response: Response, next: NextFunction) => {
    var properties = new Properties();
    var vect = new Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';',
        (item) => {
            return item.siruta == request.params.id;
        },
        (x) => {
            for (let c of x) {
                if (c.TIP == '40') {
                    c.denumireLoc = c.denumireLoc.split(' ');
                    if (c.denumireLoc.length == 3) {
                        c.denumireLoc = "" + c.denumireLoc[1] + " " + c.denumireLoc[2];
                    }
                    else {
                        c.denumireLoc = "" + c.denumireLoc[1];
                    }
                    c.denumireLoc = titleCase(c.denumireLoc);
                }
                else
                    c.denumireLoc = titleCase(c.denumireLoc);
            }
            return response.json(x[0]);
        })
})
sirutaRouter.get("/uats/:id", (request: Request, response: Response, next: NextFunction) => {
    var properties = new Properties();
    var vect = new Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';',
        (item) => {
            return item.judet == request.params.id && item.NIV == '3';
        },
        (x) => {
            for (let uat of x) {
                uat.denumireLoc = titleCase(uat.denumireLoc);
            }
            return response.json(x);
        })
})
sirutaRouter.get('/counties/:id', (request: Request, response: Response, next: NextFunction) => {
    var properties = new Properties();
    var vect = new Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';',
        (item) => {
            return (item.NIV == '3' || item.NIV == '2') && item.judet == request.params.id;
        },
        (x) => {
            var rezultat = [];
            for (let l of x) {
                if (l.NIV == "3") {
                    var locSup: any = _.find(x, { 'siruta': l.SIRSUP })
                    l.denSup = titleCase(locSup.denumireLoc);
                    if (l.TIP == '9' || l.TIP == '17') {
                        l.denumireLoc = l.denSup;
                    }
                    else if (l.TIP == "23" || l.TIP == "22") {
                        l.denumireLoc = "Sat " + titleCase(l.denumireLoc) + " (Comuna " + l.denSup + ")";
                    }
                    else if (l.TIP == '6') {
                        var denumire = l.denumireLoc.split(" ");
                        l.denumireLoc = denumire[1] + " " + denumire[2];
                        l.denumireLoc = titleCase(l.denumireLoc) + " (" + l.denSup + ")";
                    } else if (l.TIP == '10') {
                        l.denumireLoc = titleCase(l.denumireLoc) + " (" + l.denSup + ")";
                    }
                    else {
                        l.denumireLoc = "Sat " + titleCase(l.denumireLoc) + " (" + l.denSup + ")";
                    }

                    rezultat.push(l);
                }
            }
            rezultat = _.sortBy(rezultat, ['denSup', 'denumireLoc'])
            return response.json(rezultat);
        })
})
sirutaRouter.get('/cities/:id', (request: Request, response: Response, next: NextFunction) => {
    var properties = new Properties();
    var vect = new Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';',
        (item) => {
            return (item.NIV == '2' && item.judet == request.params.id);
        },
        (x) => {
            for (let uat of x) {
                uat.denumireLoc = titleCase(uat.denumireLoc);
            }
            return response.json(x);
        });
})
sirutaRouter.get('/villages/:id', (request: Request, response: Response, next: NextFunction) => {
    var properties = new Properties();
    var vect = new Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';',
        (item) => {
            return item.NIV == "3" && item.SIRSUP == request.params.id;
        },
        (x) => {
            for (let uat of x) {
                uat.denumireLoc = titleCase(uat.denumireLoc);
            }
            return response.json(x);
        })
})
export { sirutaRouter };