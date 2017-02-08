"use strict";
var db = require("./db");
module.exports = function (router) {
    router.get("/card", function (req, res) {
        db.getCards(function (vector) {
            res.json(vector);
        });
    });
    router.get('/card/:cnp', function (req, res) {
        db.getCard(req.params.cnp, function (card) {
            res.json(card);
        });
    });
    router.post('/card', function (req, res) {
        db.addCard(req.body, function (card) {
            res.json(card);
        });
    });
    router.delete('/card/:cnp', function (req, res) {
        db.deleteCard(req.params.cnp, function (cnp) {
            res.json(cnp);
        });
    });
    router.put('/card/:cnp', function (req, res) {
        db.updateCard(req.params.cnp, req.body, function (card) {
            res.json(card);
        });
    });
};
//# sourceMappingURL=cardRouter.js.map