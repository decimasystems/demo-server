"use strict";
var accentsTidy_1 = require("./accentsTidy");
var binarySearchString_1 = require("./binarySearchString");
var whiteSpaceSep_1 = require("./whiteSpaceSep");
var search_1 = require("./search");
function update(vector, vectorCui, vectorDenumire, sirute, negasit) {
    var p = vectorCui.length;
    var q = vectorDenumire.length;
    for (var i = 0; i < vector.length; i++) {
        vectorCui.push({ c: vector[i].CUI, i: i + p });
        vectorDenumire.push({ d: vector[i].DENUMIRE, i: i + q });
        if (vector[i].JUDET && vector[i].LOCALITATE) {
            var j = accentsTidy_1.accentsTidy(vector[i].JUDET);
            var judet = binarySearchString_1.binarySearchString(sirute, whiteSpaceSep_1.whiteSpaceSeparator(j), 'denumireLoc');
            var localitati = judet.localitati;
            var l = accentsTidy_1.accentsTidy(vector[i].LOCALITATE);
            var loc = search_1.search(localitati, whiteSpaceSep_1.whiteSpaceSeparator(l), 'denumireLoc');
            vector[i].sirutaJudet = judet.siruta;
            if (loc) {
                vector[i].sirutaLocalitate = loc.siruta;
            }
            else {
                negasit.push(vector[i]);
                continue;
            }
        }
    }
}
exports.update = update;
//# sourceMappingURL=update.js.map