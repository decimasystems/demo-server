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
            var loc;
            if (search_1.searchSirutaCode(localitati, whiteSpaceSep_1.whiteSpaceSeparator(l), 'denumireLoc'))
                loc = search_1.searchSirutaCode(localitati, whiteSpaceSep_1.whiteSpaceSeparator(l), 'denumireLoc');
            else
                loc = search_1.searchSirutaCode(localitati, whiteSpaceSep_1.whiteSpaceSeparator(l), 'sinonime');
            vector[i].sirutaJudet = judet.siruta;
            if (!loc) {
                negasit.push(vector[i]);
            }
            else
                vector[i].sirutaLocalitate = loc.siruta;
            vector[i].codJudet = loc.judet;
        }
        console.log(i + "/" + vector.length);
    }
}
exports.update = update;
//# sourceMappingURL=update.js.map