import {accentsTidy} from './accentsTidy';
export function binarySearchString(vector, searchElement, indexedPropertyName) {
    var max, min, middle;
    max = vector.length - 1;
    min = 0;
    while (min <= max) {
        middle = Math.ceil((max + min) / 2)
        //vector[min][indexedPropertyName]=accentsTidy(vector[min][indexedPropertyName]);
       // searchElement=accentsTidy(searchElement);
       // vector[max][indexedPropertyName]=accentsTidy(vector[max][indexedPropertyName])
        if (vector[min][indexedPropertyName].replace(/[âââîî]/g, "a") == searchElement.replace(/[âââîî]/g, "a")
            || vector[min][indexedPropertyName].replace(/[âââîî]/g, "i") == searchElement.replace(/[âââîî]/g, "i")) {
            return vector[min];
        }
        else if (vector[max][indexedPropertyName].replace(/[âââîî]/g, "a") == searchElement.replace(/[âââîî]/g, "a")
            || vector[max][indexedPropertyName].replace(/[âââîî]/g, "i") == searchElement.replace(/[âââîî]/g, "i")) {
            return vector[max];
        }
        else {
            if (searchElement.localeCompare(vector[middle][indexedPropertyName]) == -1) {
                if (middle - min == 1 || middle-min==2)
                    max = middle;
                else
                    max = middle + 1;
            }
            else if (searchElement.localeCompare(vector[middle][indexedPropertyName]) == 1) {
                if ( max -middle== 1 || max-middle==2)
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