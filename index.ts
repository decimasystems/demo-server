const http = require('http');
import * as  express from 'express';
import * as bodyParser from 'body-parser';
import * as db from "./db";
import { IdentityCard } from './db'
const cors = require('cors')
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(cors());

app.get('/cards', (req, res) => {
    db.getCards((vector: IdentityCard[]) => {
        res.json(vector);
    });
})
app.get('/cards/:cnp', (req, res) => {
    db.getCard(req.params.cnp, (card: IdentityCard) => {
        res.json(card);
    })
})
app.post('/cards', (req, res) => {
    db.addCard(req.body, (card: IdentityCard) => {
        res.json(card);
    });
});
app.delete('/cards/:cnp', (req, res) => {
    db.deleteCard(req.params.cnp, (cnp) => {
        res.json(cnp);
    });
});
app.put('/cards/:cnp', (req, res) => {
    db.updateCard(req.params.cnp, req.body, (card: IdentityCard) => {
        res.json(card);
    })

})
server.listen(4000, () => {
    console.log('rest service running on port 4000');
})