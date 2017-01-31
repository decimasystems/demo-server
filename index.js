"use strict";
var http = require('http');
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./db");
var _ = require("lodash");
var convert_1 = require("./convert");
var cors = require('cors');
var app = express();
var server = http.createServer(app);
app.set('json spaces', 4);
app.use(bodyParser.json());
app.use(cors());
function TitleCase(str) {
    var transformed;
    transformed = str.toLowerCase().split(' ');
    for (var i = 0; i < transformed.length; i++) {
        transformed[i] = transformed[i].charAt(0).toUpperCase() + transformed[i].slice(1);
    }
    return transformed.join(' ').toString();
}
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
    vect.csv2json('C:/GitHub/decimasystems/demo-server/siruta.csv', ['siruta', 'denumireLoc', 'codPostal', 'judet', 'SIRSUP', 'TIP', 'NIV', 'MED', 'REGIUNE', 'FSJ', 'FS2', 'FS3', 'FSL', 'Rang', 'fictiv'], '\n', ';', function (item) {
        return item.TIP == '40';
    }, function (x) {
        return res.json(x);
    });
});
app.get('/siruta/counties/:id', function (req, res) {
    var vect = new convert_1.Converter();
    vect.csv2json('C:/GitHub/decimasystems/demo-server/siruta.csv', ['siruta', 'denumireLoc', 'codPostal', 'judet', 'SIRSUP', 'TIP', 'NIV', 'MED', 'REGIUNE', 'FSJ', 'FS2', 'FS3', 'FSL', 'Rang', 'fictiv'], '\n', ';', function (item) {
        return item.judet == req.params.id && item.TIP != '40' && item.NIV == '2';
    }, function (x) {
        return res.json(x);
    });
});
app.get('/siruta/counties/:id/loc', function (req, res) {
    var vect = new convert_1.Converter();
    vect.csv2json('C:/GitHub/decimasystems/demo-server/siruta.csv', ['siruta', 'denumireLoc', 'codPostal', 'judet', 'SIRSUP', 'TIP', 'NIV', 'MED', 'REGIUNE', 'FSJ', 'FS2', 'FS3', 'FSL', 'Rang', 'fictiv'], '\n', ';', function (item) {
        return (item.NIV == '3' || item.NIV == '2') && item.judet == req.params.id;
    }, function (x) {
        var rezultat = [];
        for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
            var l = x_1[_i];
            if (l.NIV == "3") {
                var locSup = _.find(x, { 'siruta': l.SIRSUP });
                l.denSup = TitleCase(locSup.denumireLoc);
                l.denumireLoc = l.denumireLoc + " (" + l.denSup + ")";
                rezultat.push(l);
            }
        }
        rezultat = _.sortBy(rezultat, ['denSup', 'denumireLoc']);
        return res.json(rezultat);
    });
});
server.listen(4000, function () {
    console.log('rest service running on port 4000');
});
//# sourceMappingURL=index.js.map