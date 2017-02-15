export function search(vector, searchElement, indexedPropertyName) {
    for (var i = 0; i < vector.length; i++) {
        if (vector[i][indexedPropertyName].replace(/[âââîî]/g, "a") == searchElement.replace(/[âââîî]/g, "a")
            || vector[i][indexedPropertyName].replace(/[âââîî]/g, "i") == searchElement.replace(/[âââîî]/g, "i")
            || (vector[i][indexedPropertyName].length - searchElement.length == 1 && vector[i][indexedPropertyName].search(searchElement) >= 0)
            || (searchElement.length - vector[i][indexedPropertyName].length == 1 && searchElement.search(vector[i][indexedPropertyName]) >= 0))
            return vector[i];
        /*else if (searchElement == "poiana galzii" && vector[i][indexedPropertyName] == "poiana galdei")
            return vector[i];
        else if (searchElement == "vâlcan" && vector[i][indexedPropertyName] == "vulcan")
            return vector[i];
        else if (searchElement == "bucuresti s" && vector[i][indexedPropertyName] == "bucuresti sectorul 1")
            return vector[i];
        else if (searchElement == "slatioarele" && vector[i][indexedPropertyName] == "slaatioarele")
            return vector[i];
        else if (searchElement == "urvis" && vector[i][indexedPropertyName] == "urvisu de beliu")
            return vector[i];
        else if (searchElement == "dumbraveni" && vector[i][indexedPropertyName] == "dumbravani")
            return vector[i];
        else if (searchElement == "diocheti rediu" && vector[i][indexedPropertyName] == "diochetirediu")
            return vector[i];
        else if (searchElement == "piatra fantinele" && vector[i][indexedPropertyName].replace(/[âââ]/g, "a") == "piatra fantanele")
            return vector[i];
        else if (searchElement == "catamarasti deal" && vector[i][indexedPropertyName] == "catamaresti deal")
            return vector[i];
        else if (searchElement == "catamarasti" && vector[i][indexedPropertyName] == "catamaresti")
            return vector[i];
        else if (searchElement == "puiesti de jos" && vector[i][indexedPropertyName] == "puiestii de jos")
            return vector[i];
        else if (searchElement == "scarlateti" && vector[i][indexedPropertyName] == "scarlatesti")
            return vector[i];
        else if (searchElement == "batagesti" && vector[i][indexedPropertyName] == "baltagesti")
            return vector[i];
        else if (searchElement == "valea voivozilor" && vector[i][indexedPropertyName] == "valea voievozilor")
            return vector[i];
        else if (searchElement == "izvoru rece" && vector[i][indexedPropertyName] == "izvorul rece")
            return vector[i];
        else if (searchElement == "bazdina" && vector[i][indexedPropertyName].replace(/[âââ]/g, "a") == "bazdana")
            return vector[i];
        else if (searchElement == "pariu viu" && vector[i][indexedPropertyName].replace(/[âââ]/g, "a") == "parau viu")
            return vector[i];
        else if (searchElement == "voitestii de vale" && vector[i][indexedPropertyName] == "voitestii din vale")
            return vector[i];
        else if (searchElement == "gherghes" && vector[i][indexedPropertyName] == "cherghes")
            return vector[i];
        else if (searchElement == "dupa piatra" && vector[i][indexedPropertyName] == "dupapiatra")
            return vector[i];
        else if (searchElement == "sorogari" && vector[i][indexedPropertyName] == "sorogani")
            return vector[i];
        else if (searchElement == "petrit" && vector[i][indexedPropertyName] == "petris")
            return vector[i];
        else if (searchElement == "stefan odobeja" && vector[i][indexedPropertyName] == "stefan odobleja")
            return vector[i];
        else if (searchElement == "breaza" && vector[i][indexedPropertyName] == "oras breaza")
            return vector[i];
        else if (searchElement == "baile olanesti" && vector[i][indexedPropertyName] == "oras baile olanesti")
            return vector[i];
        else if (searchElement == "baile govora" && vector[i][indexedPropertyName] == "oras baile govora")
            return vector[i];
        else if (searchElement == "ocnele mari" && vector[i][indexedPropertyName] == "oras ocnele mari")
            return vector[i];
        else if (searchElement == "alexandria" && vector[i][indexedPropertyName] == "oras alexandria")
            return vector[i];
        else if (searchElement == "pleassov" && vector[i][indexedPropertyName] == "pleasov")
            return vector[i];
        else if (searchElement == "dabolt" && vector[i][indexedPropertyName] == "dobolt")
            return vector[i];
        else if (searchElement == "fantinele" && vector[i][indexedPropertyName].replace(/[âââ]/g, "a") == "fantanele")
            return vector[i];
        else if (searchElement.replace(/[âââîî]/g, "i") == "costesti vilsan" && vector[i][indexedPropertyName].replace(/[âââîî]/g, "a") == "costesti vaslan")
            return vector[i];*/
          //  else
           // return;
    }
}
