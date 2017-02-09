"use strict";
function binarySearch(vector, searchElement, indexedPropertyName) {
    var max, min, middle;
    max = vector.length - 1;
    min = 0;
    if (vector[min][indexedPropertyName] <= searchElement && vector[max][indexedPropertyName] >= searchElement) {
        if (vector[min][indexedPropertyName] == searchElement)
            return vector[min];
        else if (vector[max][indexedPropertyName] == searchElement)
            return vector[max];
        else {
            while (min < max) {
                middle = Math.ceil((max + min) / 2);
                if (searchElement < vector[middle][indexedPropertyName]) {
                    max = middle + 1;
                }
                else if (searchElement > vector[middle][indexedPropertyName]) {
                    min = middle - 1;
                }
                else {
                    return vector[middle];
                }
            }
        }
    }
}
exports.binarySearch = binarySearch;
//# sourceMappingURL=binarySearch.js.map