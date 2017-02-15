import { accentsTidy } from './accentsTidy';
import { binarySearchString } from './binarySearchString';
import { binarySearch } from './binarySearch';
import { whiteSpaceSeparator } from './whiteSpaceSep';
import { search } from './search';
export function update(vector,vectorCui,vectorDenumire,sirute,negasit){
    var p=vectorCui.length;
    var q=vectorDenumire.length;
    for (let i = 0; i < vector.length; i++) {
                vectorCui.push({ c: vector[i].CUI, i: i+p });
               vectorDenumire.push({ d: vector[i].DENUMIRE, i: i+q });
                if (vector[i].JUDET && vector[i].LOCALITATE) {
                    var j = accentsTidy(vector[i].JUDET)
                    var judet = binarySearchString(sirute, whiteSpaceSeparator(j), 'denumireLoc');
                    var localitati = judet.localitati;
                    var l = accentsTidy(vector[i].LOCALITATE);
                    var loc = search(localitati, whiteSpaceSeparator(l), 'denumireLoc')
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