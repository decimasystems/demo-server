export function searchSirutaCode(vector, searchElement, indexedPropertyName) {
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
            for (let index of vector[i][indexedPropertyName]) {
                if (searchElement.replace(/[âââîî]/g, "i") == index || searchElement.replace(/[âââîî]/g, "a") == index || searchElement.search(index) >= 0 ||
                    index.search(searchElement) >= 0 || searchElement == index)
                    return vector[i]
            }
    }
}
