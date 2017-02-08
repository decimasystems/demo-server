import * as express from 'express';
import * as _ from 'lodash';
import { titleCase } from './titlecase';
import { Properties } from './config';
import { Converter } from './convert';
module.exports = (router: express.Router) => {
    var vect = new Converter();
    var properties = new Properties();
    router.get('/counties', (req, res) => {
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

                return res.json(rez);
            })
    });
    router.get('/counties/:id', (req, res) => {
        vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';',
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
}