import * as db from "./db";
import { IdentityCard } from './db';
import { Router, Request, Response, NextFunction } from 'express';
const cardRouter: Router = Router();
cardRouter.all('*', (request: Request, response: Response, next: NextFunction) => {
    next();
})

cardRouter.get("/card",  (request: Request, response: Response, next: NextFunction) => {
    db.getCards((vector: IdentityCard[]) => {
        response.json(vector);
    });
})
cardRouter.get('/card/:cnp',  (request: Request, response: Response, next: NextFunction) => {
    db.getCard(request.params.cnp, (card: IdentityCard) => {
        response.json(card);
    });
})
cardRouter.post('/card',  (request: Request, response: Response, next: NextFunction) => {
    db.addCard(request.body, (card: IdentityCard) => {
        response.json(card);
    });
});
cardRouter.delete('/card/:cnp',  (request: Request, response: Response, next: NextFunction) => {
    db.deleteCard(request.params.cnp, (cnp) => {
        response.json(cnp);
    });
});
cardRouter.put('/card/:cnp',  (request: Request, response: Response, next: NextFunction) => {
    db.updateCard(request.params.cnp, request.body, (card: IdentityCard) => {
        response.json(card);
    });
})

export { cardRouter }