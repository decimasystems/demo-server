"use strict";
var db = require("./db");
var express_1 = require("express");
var cardRouter = express_1.Router();
exports.cardRouter = cardRouter;
cardRouter.all('*', function (request, response, next) {
    next();
});
cardRouter.get("/card", function (request, response, next) {
    db.getCards(function (vector) {
        response.json(vector);
    });
});
cardRouter.get('/card/:cnp', function (request, response, next) {
    db.getCard(request.params.cnp, function (card) {
        response.json(card);
    });
});
cardRouter.post('/card', function (request, response, next) {
    db.addCard(request.body, function (card) {
        response.json(card);
    });
});
cardRouter.delete('/card/:cnp', function (request, response, next) {
    db.deleteCard(request.params.cnp, function (cnp) {
        response.json(cnp);
    });
});
cardRouter.put('/card/:cnp', function (request, response, next) {
    db.updateCard(request.params.cnp, request.body, function (card) {
        response.json(card);
    });
});
//# sourceMappingURL=cardRouter.js.map