export function binarySearchString(vector, searchElement,indexedPropertyName) {
    var max, min, middle;
    max = vector.length - 1;
    min = 0;

            if (vector[min][indexedPropertyName] == searchElement)
            return vector[min];
        else if (vector[max][indexedPropertyName] == searchElement)
            return vector[max];
        else{
            while (min < max) {
                middle = Math.ceil((max + min) / 2)
                if (searchElement.localeCompare(vector[middle][indexedPropertyName])==-1) {
                    max = middle + 1;
                }
                else if (searchElement .localeCompare( vector[middle][indexedPropertyName])==1) {
                    min = middle - 1;
                }
                else {
                    return vector[middle];

                }
            }
        }
}