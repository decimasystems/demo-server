"use strict";
var mongodb = require("mongodb");
var server = new mongodb.Server('localhost', 27017);
var db = new mongodb.Db('mydb', server, { w: 1 });
db.open(function () { });
function getCard(cnp, callback) {
    db.collection('cards', function (error, cards) {
        if (error) {
            console.error(error);
            return;
        }
        cards.findOne({ cnp: cnp }, function (error, card) {
            if (error) {
                console.error(error);
                return;
            }
            callback(card);
        });
    });
}
exports.getCard = getCard;
function getCards(callback) {
    db.collection('cards', function (error, cards_collection) {
        if (error) {
            console.error(error);
            return;
        }
        cards_collection.find().toArray(function (error, cardObjects) {
            if (error) {
                console.error(error);
                return;
            }
            callback(cardObjects);
        });
    });
}
exports.getCards = getCards;
function addCard(card, callback) {
    db.collection('cards', function (error, cards_collection) {
        if (error) {
            console.error(error);
            return;
        }
        cards_collection.insertOne(card, function (err, cardObject) {
            if (err) {
                console.error(err);
                return;
            }
            callback(card);
        });
    });
}
exports.addCard = addCard;
function updateCard(cnp, card, callback) {
    db.collection('cards', function (error, cards_collection) {
        if (error) {
            console.error(error);
            return;
        }
        cards_collection.findOneAndUpdate({ cnp: cnp }, card, { returnOriginal: false }, function (error, result) {
            if (error) {
                console.error(error);
                return;
            }
            callback(card);
        });
    });
}
exports.updateCard = updateCard;
function deleteCard(cnp, callback) {
    db.collection('cards', function (error, cards_collection) {
        if (error) {
            console.error(error);
            return;
        }
        cards_collection.deleteOne({ cnp: cnp }, function (error, cardsObject) {
            if (error) {
                console.error(error);
                return;
            }
            callback(cnp);
        });
    });
}
exports.deleteCard = deleteCard;
function addCompany(company, callback) {
    db.collection('companies', function (error, company_collection) {
        if (error) {
            console.error(error);
            return;
        }
        company_collection.insertOne(company, function (err, companyObject) {
            if (err) {
                console.error(err);
                return;
            }
            callback(company);
        });
    });
}
exports.addCompany = addCompany;
function getCompany(cui, callback) {
    db.collection('companies', function (error, company_collection) {
        if (error) {
            console.error(error);
            return;
        }
        company_collection.findOne({ CUI: cui }, function (error, company) {
            if (error) {
                console.error(error);
                return;
            }
            callback(company);
        });
    });
}
exports.getCompany = getCompany;
//# sourceMappingURL=db.js.map