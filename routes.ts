import * as  express from 'express';
import * as companyRouter from './companyRouter';
let router:express.Router =express.Router();
router.use('/company',companyRouter);