const http = require('http');
import * as  express from 'express';
import * as bodyParser from 'body-parser';
import * as db from "./db";
import * as _ from 'lodash';
import { IdentityCard } from './db'
import { Converter } from './convert';
import { titleCase } from './titlecase';
import { path, properties } from './config';
const cors = require('cors')
const app = express();
const server = http.createServer(app);
app.set('json spaces', 4);
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
    vect.csv2json(path, properties, '\n', ';',
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
    vect.csv2json(path, properties, '\n', ';',
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
server.listen(4000, () => {
    console.log('rest service running on port 4000');
})

