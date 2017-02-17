"use strict";
function searchSirutaCode(vector, searchElement, indexedPropertyName) {
    var x = searchElement.split(" ");
    if (x.length == 2)
        var rez = x[0].concat(x[1]);
    for (var i = 0; i < vector.length; i++) {
        if (indexedPropertyName != 'sinonime') {
            if (searchElement == vector[i][indexedPropertyName] || (vector[i][indexedPropertyName].length - searchElement.length == 1 && vector[i][indexedPropertyName].search(searchElement) >= 0)
                || (searchElement.length - vector[i][indexedPropertyName].length == 1 && searchElement.search(vector[i][indexedPropertyName]) >= 0) ||
                rez == vector[i][indexedPropertyName])
                return vector[i];
        }
        else
            for (var _i = 0, _a = vector[i][indexedPropertyName]; _i < _a.length; _i++) {
                var index = _a[_i];
                if (searchElement.replace(/[âââîî]/g, "i") == index || searchElement.replace(/[âââîî]/g, "a") == index || searchElement.search(index) >= 0 ||
                    index.search(searchElement) >= 0 || searchElement == index || rez == index)
                    return vector[i];
            }
    }
}
exports.searchSirutaCode = searchSirutaCode;
//# sourceMappingURL=search.js.map