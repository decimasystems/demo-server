"use strict";
var http = require('http');
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./db");
var app = express();
var server = http.createServer(app);
app.use(bodyParser.json());
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
server.listen(4000, function () {
    console.log('rest service running on port 4000');
});
//# sourceMappingURL=index.js.map