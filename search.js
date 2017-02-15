"use strict";
function search(vector, searchElement, indexedPropertyName) {
    for (var i = 0; i < vector.length; i++) {
        if (vector[i][indexedPropertyName].replace(/[âââîî]/g, "a") == searchElement.replace(/[âââîî]/g, "a")
            || vector[i][indexedPropertyName].replace(/[âââîî]/g, "i") == searchElement.replace(/[âââîî]/g, "i")
            || (vector[i][indexedPropertyName].length - searchElement.length == 1 && vector[i][indexedPropertyName].search(searchElement) >= 0)
            || (searchElement.length - vector[i][indexedPropertyName].length == 1 && searchElement.search(vector[i][indexedPropertyName]) >= 0))
            return vector[i];
    }
}
exports.search = search;
//# sourceMappingURL=search.js.map