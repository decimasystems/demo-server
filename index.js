"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var firmeRouter_1 = require("./firmeRouter");
var sirutaRouter_1 = require("./sirutaRouter");
var cardRouter_1 = require("./cardRouter");
var cors = require("cors");
var init_1 = require("./init");
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.all('*', function (request, response, next) {
    next();
});
app.use("/firme", firmeRouter_1.firmeRouter);
app.use("/siruta", sirutaRouter_1.sirutaRouter);
app.use("/cards", cardRouter_1.cardRouter);
init_1.InitStore.load().then(function (_) {
    var server = app.listen(4000, function () {
        console.log('rest service running on port 4000');
    });
});
//# sourceMappingURL=index.js.map