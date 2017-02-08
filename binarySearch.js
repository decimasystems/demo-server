"use strict";
function binarySearch(indexCUI, searchElement) {
    var max, min, x, middle;
    //if (indexCUI[0]["CUI"] > searchElement && searchElement < indexCUI[indexCUI.length]["CUI"]) {
    max = indexCUI.length;
    min = 0;
    // }
    //TODO: verify that the value really exists in the array !!
    while (min < max) {
        middle = Math.round((max + min) / 2);
        if (searchElement < indexCUI[middle]["CUI"]) {
            max = middle + 1;
        }
        else if (searchElement > indexCUI[middle]["CUI"]) {
            min = middle - 1;
        }
        else {
            return indexCUI[middle].index;
        }
    }
}
exports.binarySearch = binarySearch;
//# sourceMappingURL=binarySearch.js.map