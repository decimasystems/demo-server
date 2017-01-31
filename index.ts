const http = require('http');
import * as  express from 'express';
import * as bodyParser from 'body-parser';
import * as db from "./db";
import * as _ from 'lodash';
import { IdentityCard } from './db'
import { Converter } from './convert';
const cors = require('cors')
const app = express();
const server = http.createServer(app);
app.set('json spaces', 4);
app.use(bodyParser.json());
app.use(cors());
function TitleCase(str: string): string {
    var transformed: string[];
    transformed = str.toLowerCase().split(' ');
    for (var i = 0; i < transformed.length; i++) {
        transformed[i] = transformed[i].charAt(0).toUpperCase() + transformed[i].slice(1);
    }
    return transformed.join(' ').toString();
}
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
app.get('/siruta/counties', (req, res) => {
    var vect = new Converter();
    vect.csv2json('C:/GitHub/decimasystems/demo-server/siruta.csv',
        ['siruta', 'denumireLoc', 'codPostal', 'judet', 'SIRSUP', 'TIP', 'NIV', 'MED', 'REGIUNE', 'FSJ', 'FS2', 'FS3', 'FSL', 'Rang', 'fictiv'], '\n', ';',
        (item) => {
            return item.TIP == '40';
        },
        (x) => {

            return res.json(x);
        })
});
app.get('/siruta/counties/:id', (req, res) => {
    var vect = new Converter();
    vect.csv2json('C:/GitHub/decimasystems/demo-server/siruta.csv',
        ['siruta', 'denumireLoc', 'codPostal', 'judet', 'SIRSUP', 'TIP', 'NIV', 'MED', 'REGIUNE', 'FSJ', 'FS2', 'FS3', 'FSL', 'Rang', 'fictiv'], '\n', ';',
        (item) => {
            return item.judet == req.params.id && item.TIP != '40' && item.NIV == '2';
        },
        (x) => {

            return res.json(x);
        })
})
app.get('/siruta/counties/:id/loc', (req, res) => {
    var vect = new Converter();
    vect.csv2json('C:/GitHub/decimasystems/demo-server/siruta.csv',
        ['siruta', 'denumireLoc', 'codPostal', 'judet', 'SIRSUP', 'TIP', 'NIV', 'MED', 'REGIUNE', 'FSJ', 'FS2', 'FS3', 'FSL', 'Rang', 'fictiv'], '\n', ';',
        (item) => {
            return (item.NIV == '3' || item.NIV == '2') && item.judet == req.params.id;
        },
        (x) => {
            var rezultat = [];
            for (let l of x) {
                if (l.NIV == "3") {
                    var locSup: any = _.find(x, { 'siruta': l.SIRSUP })
                    l.denSup = TitleCase(locSup.denumireLoc);
                    l.denumireLoc = l.denumireLoc + " (" + l.denSup + ")";
                    rezultat.push(l);
                }
            }
            rezultat = _.sortBy(rezultat, ['denSup', 'denumireLoc'])
            return res.json(rezultat);
        })
})
server.listen(4000, () => {
    console.log('rest service running on port 4000');
})

