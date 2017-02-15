"use strict";
function binarySearch(vector, searchElement, indexedPropertyName) {
    var max, min, middle;
    max = vector.length - 1;
    min = 0;
    if (vector[min][indexedPropertyName] <= searchElement && vector[max][indexedPropertyName] >= searchElement) {
        while (min < max) {
            middle = Math.ceil((max + min) / 2);
            if (middle > min && middle < max) {
                if (vector[min][indexedPropertyName] == searchElement)
                    return vector[min];
                else if (vector[max][indexedPropertyName] == searchElement)
                    return vector[max];
                else {
                    if (searchElement < vector[middle][indexedPropertyName]) {
                        if (middle - min == 1 || middle - min == 2)
                            max = middle;
                        else
                            max = middle + 1;
                    }
                    else if (searchElement > vector[middle][indexedPropertyName]) {
                        if (max - middle == 1 || max - middle == 2)
                            min = middle;
                        else
                            min = middle - 1;
                    }
                    else if (searchElement == vector[middle][indexedPropertyName])
                        return vector[middle];
                    else
                        return 0;
                }
            }
            else
                return 0;
        }
        if (min > max)
            return 0;
    }
    else
        return 0;
}
exports.binarySearch = binarySearch;
//# sourceMappingURL=binarySearch.js.map