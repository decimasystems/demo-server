"use strict";
var http = require('http');
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./db");
var _ = require("lodash");
var fs = require('fs');
var convert_1 = require("./convert");
var titlecase_1 = require("./titlecase");
var config_1 = require("./config");
var binarySearch_1 = require("./binarySearch");
var data_1 = require("./data");
var cors = require('cors');
var app = express();
var server = http.createServer(app);
var firme1, firme2, siruta, firme, indexCUI, indexDenumire, file1, file2;
var vect = new convert_1.Converter();
app.use(bodyParser.json());
app.use(cors());
app.get('/cards', function (req, res) {
    db.getCards(function (vector) {
        res.json(vector);
    });
});
app.get('/cards/:cnp', function (req, res) {
    db.getCard(req.params.cnp, function (card) {
        res.json(card);
    });
});
app.post('/cards', function (req, res) {
    db.addCard(req.body, function (card) {
        res.json(card);
    });
});
app.delete('/cards/:cnp', function (req, res) {
    db.deleteCard(req.params.cnp, function (cnp) {
        res.json(cnp);
    });
});
app.put('/cards/:cnp', function (req, res) {
    db.updateCard(req.params.cnp, req.body, function (card) {
        res.json(card);
    });
});
app.get('/siruta/counties', function (req, res) {
    var vect = new convert_1.Converter();
    vect.csv2json(config_1.sirutaPath, config_1.sirutaProperties, '\n', ';', function (item) {
        return item.TIP == '40';
    }, function (x) {
        var rez = [];
        for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
            var c = x_1[_i];
            c.denumireLoc = c.denumireLoc.split(' ');
            if (c.denumireLoc.length == 3) {
                c.denumireLoc = "" + c.denumireLoc[1] + " " + c.denumireLoc[2];
            }
            else {
                c.denumireLoc = "" + c.denumireLoc[1];
            }
            c.denumireLoc = titlecase_1.titleCase(c.denumireLoc);
            rez.push(c);
        }
        return res.json(rez);
    });
});
app.get('/siruta/counties/:id', function (req, res) {
    var vect = new convert_1.Converter();
    vect.csv2json(config_1.sirutaPath, config_1.sirutaProperties, '\n', ';', function (item) {
        return (item.NIV == '3' || item.NIV == '2') && item.judet == req.params.id;
    }, function (x) {
        var rezultat = [];
        for (var _i = 0, x_2 = x; _i < x_2.length; _i++) {
            var l = x_2[_i];
            if (l.NIV == "3") {
                var locSup = _.find(x, { 'siruta': l.SIRSUP });
                l.denSup = titlecase_1.titleCase(locSup.denumireLoc);
                if (l.TIP == '9' || l.TIP == '17') {
                    l.denumireLoc = l.denSup;
                }
                else if (l.TIP == "23" || l.TIP == "22") {
                    l.denumireLoc = "Sat " + titlecase_1.titleCase(l.denumireLoc) + " (Comuna " + l.denSup + ")";
                }
                else if (l.TIP == '6') {
                    var denumire = l.denumireLoc.split(" ");
                    l.denumireLoc = denumire[1] + " " + denumire[2];
                    l.denumireLoc = titlecase_1.titleCase(l.denumireLoc) + " (" + l.denSup + ")";
                }
                else if (l.TIP == '10') {
                    l.denumireLoc = titlecase_1.titleCase(l.denumireLoc) + " (" + l.denSup + ")";
                }
                else {
                    l.denumireLoc = "Sat " + titlecase_1.titleCase(l.denumireLoc) + " (" + l.denSup + ")";
                }
                rezultat.push(l);
            }
        }
        rezultat = _.sortBy(rezultat, ['denSup', 'denumireLoc']);
        return res.json(rezultat);
    });
});
app.get('/data', function (req, res) {
    data_1.importCompanies(function (y) {
        firme = y;
    }, function (x) {
        file1 = JSON.parse(x);
    });
});
app.get('/companies/:id', function (req, res) {
    var vect = new convert_1.Converter();
    var company;
    var indexCUI, indexDenumire;
    var x = binarySearch_1.binarySearch(file1, req.params.id);
    company = firme[x];
    var uats = [];
    for (var _i = 0, siruta_1 = siruta; _i < siruta_1.length; _i++) {
        var s = siruta_1[_i];
        if ((convert_1.accentsTidy(s.denumireLoc).match(convert_1.accentsTidy(company.JUDET)) && s.NIV == "1")
            || (convert_1.accentsTidy(s.denumireLoc).match(convert_1.accentsTidy(company.LOCALITATE)))) {
            uats.push(s);
        }
    }
    for (var _a = 0, uats_1 = uats; _a < uats_1.length; _a++) {
        var uat = uats_1[_a];
        if (convert_1.accentsTidy(uat.denumireLoc).match(convert_1.accentsTidy(company.JUDET)) && uat.TIP == "40") {
            company.sirutaJudet = uat.siruta;
        }
        else if (convert_1.accentsTidy(uat.denumireLoc).match(convert_1.accentsTidy(company.LOCALITATE))) {
            company.sirutaLocalitate = uat.siruta;
        }
    }
    res.json(company);
});
app.get('/firme/:name', function (req, res) {
    var vect = new convert_1.Converter();
    Promise.all([vect.csv2jsonPromise(config_1.companiesPath, config_1.companiesProperties, null, '|', function (item) {
            return item.DENUMIRE.match(req.params.name) ? true : false;
        }), vect.csv2jsonPromise(config_1.companiesPath2, config_1.companiesProperties, null, '|', function (item) {
            return item.DENUMIRE.match(req.params.name) ? true : false;
        })
    ])
        .then(function (json) {
        res.json(json);
    }, function (err) {
        res.json(err);
    });
});
app.get('/comp/:oras', function (req, res) {
    var vect = new convert_1.Converter();
    Promise.all([vect.csv2jsonPromise(config_1.companiesPath, config_1.companiesProperties, null, '|', function (item) {
            return item.JUDET.match(req.params.oras) ? true : false;
        }), vect.csv2jsonPromise(config_1.companiesPath2, config_1.companiesProperties, null, '|', function (item) {
            return item.JUDET.match(req.params.oras) ? true : false;
        })
    ])
        .then(function (json) {
        res.json(json);
    }, function (err) {
        res.json(err);
    });
});
server.listen(4000, function () {
    console.log('rest service running on port 4000');
    var filter = function (item) {
        return true;
    };
    siruta = vect.csv2jsonPromise(config_1.sirutaPath, config_1.sirutaProperties, null, null, filter).then(function (json) {
        return json;
    });
});
//# sourceMappingURL=index.js.map