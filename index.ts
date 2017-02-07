const http = require('http');
import * as  express from 'express';
import * as bodyParser from 'body-parser';
import * as db from "./db";
import * as _ from 'lodash';
const fs = require('fs');
import { IdentityCard } from './db'
import { Converter, accentsTidy } from './convert';
import { titleCase } from './titlecase';
import { sirutaPath, sirutaProperties, companiesPath, companiesPath2, companiesProperties } from './config';
import { binarySearch } from './binarySearch';
import { importCompanies } from './data';
const cors = require('cors')
const app = express();
const server = http.createServer(app);
var firme1, firme2, siruta, firme, indexCUI, indexDenumire, file1, file2;
var vect = new Converter();

app.use(bodyParser.json());
app.use(cors());
app.get('/cards', (req, res) => {
    db.getCards((vector: IdentityCard[]) => {
        res.json(vector);
    });
})
app.get('/cards/:cnp', (req, res) => {
    db.getCard(req.params.cnp, (card: IdentityCard) => {
        res.json(card);
    });
})
app.post('/cards', (req, res) => {
    db.addCard(req.body, (card: IdentityCard) => {
        res.json(card);
    });
});
app.delete('/cards/:cnp', (req, res) => {
    db.deleteCard(req.params.cnp, (cnp) => {
        res.json(cnp);
    });
});
app.put('/cards/:cnp', (req, res) => {
    db.updateCard(req.params.cnp, req.body, (card: IdentityCard) => {
        res.json(card);
    });
})
app.get('/siruta/counties', (req, res) => {
    var vect = new Converter();
    vect.csv2json(sirutaPath, sirutaProperties, '\n', ';',
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

            return res.json(rez);
        })
});
app.get('/siruta/counties/:id', (req, res) => {
    var vect = new Converter();
    vect.csv2json(sirutaPath, sirutaProperties, '\n', ';',
        (item) => {
            return (item.NIV == '3' || item.NIV == '2') && item.judet == req.params.id;
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
            return res.json(rezultat);
        })
})
app.get('/data', (req, res) => {
    importCompanies((y) => {
        firme = y;
    }, (x) => {
        file1 = JSON.parse(x);
    });
})
app.get('/companies/:id', (req, res) => {
    var vect = new Converter();
    var company;
    var indexCUI, indexDenumire;
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
app.get('/firme/:name', (req, res) => {
    var vect = new Converter();
    Promise.all([vect.csv2jsonPromise(companiesPath, companiesProperties, null, '|', (item) => {
        return item.DENUMIRE.match(req.params.name) ? true : false;
    }), vect.csv2jsonPromise(companiesPath2, companiesProperties, null, '|', (item) => {
        return item.DENUMIRE.match(req.params.name) ? true : false;
    })
    ])
        .then((json) => {
            res.json(json);
        },
        (err) => {
            res.json(err);
        });

})
app.get('/comp/:oras', (req, res) => {
    var vect = new Converter();
    Promise.all([vect.csv2jsonPromise(companiesPath, companiesProperties, null, '|', (item) => {
        return item.JUDET.match(req.params.oras) ? true : false;
    }), vect.csv2jsonPromise(companiesPath2, companiesProperties, null, '|', (item) => {
        return item.JUDET.match(req.params.oras) ? true : false;
    })
    ])
        .then((json) => {
            res.json(json);
        },
        (err) => {
            res.json(err);
        });
})
server.listen(4000, () => {
    console.log('rest service running on port 4000');

    var filter = (item) => {
        return true;
    }
    siruta = vect.csv2jsonPromise(sirutaPath, sirutaProperties, null, null, filter).then((json) => {
        return json;
    });
})

