import mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);
var db = new mongodb.Db('mydb', server, { w: 1 });
db.open(function () { });

export interface IdentityCard {
    series: string;
    number: number;
    firstName: string;
    lastName: string;
    cnp: string;
    nationality: string;
    birth: string;
    county: string;
    city: string;
    street?: string;
    streetNr: number;
    block?: number;
    entrance?: string;
    floor?: number;
    apartament?: number;
    issued: string;
    valid1: Date;
    valid2: Date;
}
export function getCard(cnp: string, callback: (card: IdentityCard) => void) {
    db.collection('cards', (error, cards) => {
        if (error) {
            console.error(error);
            return;
        }
        cards.findOne({ cnp: cnp }, (error, card) => {
            if (error) {
                console.error(error);
                return;
            }
            callback(card);
        });
    });
}
export function getCards(callback: (cards: IdentityCard[]) => void) {
    db.collection('cards', (error, cards_collection) => {
        if (error) {
            console.error(error);
            return;
        }
        cards_collection.find().toArray((error, cardObjects) => {
            if (error) {
                console.error(error);
                return;
            }
            callback(cardObjects);
        })
    })
}

export function addCard(card: IdentityCard, callback: (card: IdentityCard) => void) {
    db.collection('cards', (error, cards_collection) => {
        if (error) {
            console.error(error);
            return;
        }
        cards_collection.insertOne(card, (err, cardObject) => {
            if (err) {
                console.error(err);
                return;
            }
            callback(card);
        });
    });
}
export function updateCard(cnp: string, card: IdentityCard, callback: (card1: IdentityCard) => void) {
    db.collection('cards', (error, cards_collection) => {
        if (error) {
            console.error(error);
            return;
        }
        cards_collection.findOneAndUpdate({ cnp: cnp }, card, { returnOriginal: false }, (error, result) => {
            if (error) {
                console.error(error);
                return;
            }
            callback(card);
        })
    })
}
export function deleteCard(cnp: string, callback: (cnp: string) => void) {
    db.collection('cards', (error, cards_collection) => {
        if (error) {
            console.error(error);
            return;
        }
        cards_collection.deleteOne({ cnp: cnp }, (error, cardsObject) => {
            if (error) {
                console.error(error);
                return;
            }
            callback(cnp);
        });
    });
}


