"use strict";
function binarySearchString(vector, searchElement, indexedPropertyName) {
    var max, min, middle;
    max = vector.length - 1;
    min = 0;
    while (min <= max) {
        middle = Math.ceil((max + min) / 2);
        if (vector[min][indexedPropertyName] == searchElement)
            return vector[min];
        else if (vector[max][indexedPropertyName] == searchElement)
            return vector[max];
        else {
            if (searchElement.localeCompare(vector[middle][indexedPropertyName]) == -1) {
                if ((middle + min) / 2 == 1)
                    max = middle;
                else
                    max = middle + 1;
            }
            else if (searchElement.localeCompare(vector[middle][indexedPropertyName]) == 1) {
                if ((middle + max) / 2 == 1)
                    min = middle;
                else
                    min = middle - 1;
            }
            else {
                return vector[middle];
            }
        }
    }
}
exports.binarySearchString = binarySearchString;
//# sourceMappingURL=binarySearchString.js.map