import { accentsTidy } from './accentsTidy';
import { binarySearchString } from './binarySearchString';
import { binarySearch } from './binarySearch';
import { whiteSpaceSeparator } from './whiteSpaceSep';
import { searchSirutaCode } from './search';
export function update(vector, vectorCui, vectorDenumire, sirute, negasit) {
    var p = vectorCui.length;
    var q = vectorDenumire.length;
    for (let i = 0; i < vector.length; i++) {
        vectorCui.push({ c: vector[i].CUI, i: i + p });
        vectorDenumire.push({ d: vector[i].DENUMIRE, i: i + q });
        if (vector[i].JUDET && vector[i].LOCALITATE) {
            var j = accentsTidy(vector[i].JUDET)
            var judet = binarySearchString(sirute, whiteSpaceSeparator(j), 'denumireLoc');
            var localitati = judet.localitati;
            var l = accentsTidy(vector[i].LOCALITATE);
            var loc;
            if (searchSirutaCode(localitati, whiteSpaceSeparator(l), 'denumireLoc'))
                loc = searchSirutaCode(localitati, whiteSpaceSeparator(l), 'denumireLoc')
            else
                loc = searchSirutaCode(localitati, whiteSpaceSeparator(l), 'sinonime');
            vector[i].sirutaJudet = judet.siruta;
            
            if (!loc) {
                negasit.push(vector[i]);
            }
            else
                vector[i].sirutaLocalitate = loc.siruta;
                vector[i].codJudet=loc.judet;
        }
        console.log(i + "/" + vector.length);
    }
}