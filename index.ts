import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as db from "./db";
import * as _ from 'lodash';
import {companyRouter} from './companyRouter';
import {firmeRouter} from './firmeRouter';
import {sirutaRouter} from './sirutaRouter';
import {cardRouter} from './cardRouter';
import { importCompanies } from './data';
import { binarySearch } from './binarySearch';
import { accentsTidy } from './convert';
import * as cors from 'cors';
import { Converter } from './convert';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.all('*',(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    console.log("All express");
    next();
})

//app.use("/company", companyRouter);
app.use("/firme",firmeRouter)
app.use("/siruta", sirutaRouter);
app.use("/cards", cardRouter);

const server = app.listen(4000, () => {
    console.log('rest service running on port 4000')
})

