import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as db from "./db";
import * as _ from 'lodash';
import { firmeRouter } from './firmeRouter'
import { sirutaRouter } from './sirutaRouter';
import { cardRouter } from './cardRouter'
import { binarySearch } from './binarySearch';
import { accentsTidy } from './accentsTidy';
import * as cors from 'cors';
import { Converter } from './convert';
import { InitStore } from './init';
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.all('*', (request: express.Request, response: express.Response, next: express.NextFunction) => {

    next();
})

app.use("/firme", firmeRouter);
app.use("/siruta", sirutaRouter);
app.use("/cards", cardRouter);
InitStore.load().then((_) => {
    const server = app.listen(4000, () => {
        console.log('rest service running on port 4000');
    })
})
