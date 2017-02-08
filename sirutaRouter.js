"use strict";
var _ = require("lodash");
var titlecase_1 = require("./titlecase");
var config_1 = require("./config");
var convert_1 = require("./convert");
module.exports = function (router) {
    var vect = new convert_1.Converter();
    var properties = new config_1.Properties();
    router.get('/counties', function (req, res) {
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
            return res.json(rez);
        });
    });
    router.get('/counties/:id', function (req, res) {
        vect.csv2json(properties.sirutaPath, properties.sirutaProperties, '\n', ';', function (item) {
            return (item.NIV == '3' || item.NIV == '2') && item.judet == req.params.id;
        }, function (x) {
            var rezultat = [];
            for (var _i = 0, x_2 = x; _i < x_2.length; _i++) {
                var l = x_2[_i];
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
            return res.json(rezultat);
        });
    });
};
//# sourceMappingURL=sirutaRouter.js.map