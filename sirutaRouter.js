"use strict";
var express_1 = require("express");
var _ = require("lodash");
var titlecase_1 = require("./titlecase");
var config_1 = require("./config");
var convert_1 = require("./convert");
var sirutaRouter = express_1.Router();
exports.sirutaRouter = sirutaRouter;
sirutaRouter.all('*', function (request, response, next) {
    next();
});
sirutaRouter.get('/file', function (request, response, next) {
    var properties = new config_1.Properties();
    var vect = new convert_1.Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';', function (item) {
        return true;
    }, function (x) { return JSON.stringify(x); });
});
sirutaRouter.get('/counties', function (request, response, next) {
    var properties = new config_1.Properties();
    var vect = new convert_1.Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';', function (item) {
        return item.TIP == '40';
    }, function (x) {
        var rez = [];
        for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
            var c = x_1[_i];
            c.denumireLoc = c.denumireLoc.split(' ');
            if (c.denumireLoc.length == 3) {
                c.denumireLoc = "" + c.denumireLoc[1] + " " + c.denumireLoc[2];
            }
            else {
                c.denumireLoc = "" + c.denumireLoc[1];
            }
            c.denumireLoc = titlecase_1.titleCase(c.denumireLoc);
            rez.push(c);
        }
        return response.json(rez);
    });
});
sirutaRouter.get("/county/:id", function (request, response, next) {
    var properties = new config_1.Properties();
    var vect = new convert_1.Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';', function (item) {
        return item.TIP == '40' && item.judet == request.params.id;
    }, function (x) {
        for (var _i = 0, x_2 = x; _i < x_2.length; _i++) {
            var c = x_2[_i];
            c.denumireLoc = c.denumireLoc.split(' ');
            if (c.denumireLoc.length == 3) {
                c.denumireLoc = "" + c.denumireLoc[1] + " " + c.denumireLoc[2];
            }
            else {
                c.denumireLoc = "" + c.denumireLoc[1];
            }
            c.denumireLoc = titlecase_1.titleCase(c.denumireLoc);
        }
        return response.json(x[0]);
    });
});
sirutaRouter.get("/:id", function (request, response, next) {
    var properties = new config_1.Properties();
    var vect = new convert_1.Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';', function (item) {
        return item.siruta == request.params.id;
    }, function (x) {
        for (var _i = 0, x_3 = x; _i < x_3.length; _i++) {
            var c = x_3[_i];
            if (c.TIP == '40') {
                c.denumireLoc = c.denumireLoc.split(' ');
                if (c.denumireLoc.length == 3) {
                    c.denumireLoc = "" + c.denumireLoc[1] + " " + c.denumireLoc[2];
                }
                else {
                    c.denumireLoc = "" + c.denumireLoc[1];
                }
                c.denumireLoc = titlecase_1.titleCase(c.denumireLoc);
            }
            else
                c.denumireLoc = titlecase_1.titleCase(c.denumireLoc);
        }
        return response.json(x[0]);
    });
});
sirutaRouter.get("/uats/:id", function (request, response, next) {
    var properties = new config_1.Properties();
    var vect = new convert_1.Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';', function (item) {
        return item.judet == request.params.id && item.NIV == '3';
    }, function (x) {
        for (var _i = 0, x_4 = x; _i < x_4.length; _i++) {
            var uat = x_4[_i];
            uat.denumireLoc = titlecase_1.titleCase(uat.denumireLoc);
        }
        return response.json(x);
    });
});
sirutaRouter.get('/counties/:id', function (request, response, next) {
    var properties = new config_1.Properties();
    var vect = new convert_1.Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';', function (item) {
        return (item.NIV == '3' || item.NIV == '2') && item.judet == request.params.id;
    }, function (x) {
        var rezultat = [];
        for (var _i = 0, x_5 = x; _i < x_5.length; _i++) {
            var l = x_5[_i];
            if (l.NIV == "3") {
                var locSup = _.find(x, { 'siruta': l.SIRSUP });
                l.denSup = titlecase_1.titleCase(locSup.denumireLoc);
                if (l.TIP == '9' || l.TIP == '17') {
                    l.denumireLoc = l.denSup;
                }
                else if (l.TIP == "23" || l.TIP == "22") {
                    l.denumireLoc = "Sat " + titlecase_1.titleCase(l.denumireLoc) + " (Comuna " + l.denSup + ")";
                }
                else if (l.TIP == '6') {
                    var denumire = l.denumireLoc.split(" ");
                    l.denumireLoc = denumire[1] + " " + denumire[2];
                    l.denumireLoc = titlecase_1.titleCase(l.denumireLoc) + " (" + l.denSup + ")";
                }
                else if (l.TIP == '10') {
                    l.denumireLoc = titlecase_1.titleCase(l.denumireLoc) + " (" + l.denSup + ")";
                }
                else {
                    l.denumireLoc = "Sat " + titlecase_1.titleCase(l.denumireLoc) + " (" + l.denSup + ")";
                }
                rezultat.push(l);
            }
        }
        rezultat = _.sortBy(rezultat, ['denSup', 'denumireLoc']);
        return response.json(rezultat);
    });
});
sirutaRouter.get('/cities/:id', function (request, response, next) {
    var properties = new config_1.Properties();
    var vect = new convert_1.Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';', function (item) {
        return (item.NIV == '2' && item.judet == request.params.id);
    }, function (x) {
        for (var _i = 0, x_6 = x; _i < x_6.length; _i++) {
            var uat = x_6[_i];
            uat.denumireLoc = titlecase_1.titleCase(uat.denumireLoc);
        }
        return response.json(x);
    });
});
sirutaRouter.get('/villages/:id', function (request, response, next) {
    var properties = new config_1.Properties();
    var vect = new convert_1.Converter();
    vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';', function (item) {
        return item.NIV == "3" && item.SIRSUP == request.params.id;
    }, function (x) {
        for (var _i = 0, x_7 = x; _i < x_7.length; _i++) {
            var uat = x_7[_i];
            uat.denumireLoc = titlecase_1.titleCase(uat.denumireLoc);
        }
        return response.json(x);
    });
});
//# sourceMappingURL=sirutaRouter.js.map