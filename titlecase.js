"use strict";
function titleCase(str) {
    var transformed;
    var sep = (/\s/).test(str);
    var separator = sep ? " " : "-";
    transformed = str.toLowerCase().split(separator);
    for (var i = 0; i < transformed.length; i++) {
        if (transformed[i].length != 2) {
            transformed[i] = transformed[i].charAt(0).toUpperCase() + transformed[i].slice(1);
        }
    }
    return transformed.join(separator).toString();
}
exports.titleCase = titleCase;
//# sourceMappingURL=titlecase.js.map