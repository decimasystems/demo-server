import * as express from 'express';
import * as db from "./db";
import { IdentityCard } from './db'
module.exports =  (router: express.Router)=> {
    router.get("/card", (req, res) => {
        db.getCards((vector: IdentityCard[]) => {
            res.json(vector);
        });
    })
    router.get('/card/:cnp', (req, res) => {
        db.getCard(req.params.cnp, (card: IdentityCard) => {
            res.json(card);
        });
    })
    router.post('/card', (req, res) => {
        db.addCard(req.body, (card: IdentityCard) => {
            res.json(card);
        });
    });
    router.delete('/card/:cnp', (req, res) => {
        db.deleteCard(req.params.cnp, (cnp) => {
            res.json(cnp);
        });
    });
    router.put('/card/:cnp', (req, res) => {
        db.updateCard(req.params.cnp, req.body, (card: IdentityCard) => {
            res.json(card);
        });
    })
    
}