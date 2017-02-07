"use strict";
function binarySearch(indexCUI, searchElement) {
    var max, min, x, middle;
    max = indexCUI.length;
    min = 0;
    while (min < max) {
        middle = Math.round((max + min) / 2);
        if (searchElement < indexCUI[middle].CUI) {
            max = middle + 1;
        }
        else if (searchElement > indexCUI[middle].CUI) {
            min = middle - 1;
        }
        else {
            return x = indexCUI[middle].index;
        }
    }
}
exports.binarySearch = binarySearch;
//# sourceMappingURL=binarySearch.js.map