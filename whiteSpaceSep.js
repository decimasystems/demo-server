"use strict";
function whiteSpaceSeparator(s) {
    if (s) {
        if (/[-]/g.test(s)) {
            var rez = s.replace(/[-]/g, " ");
            return rez;
        }
    }
    return s;
}
exports.whiteSpaceSeparator = whiteSpaceSeparator;
//# sourceMappingURL=whiteSpaceSep.js.map