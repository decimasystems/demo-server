"use strict";
function shortName(denumireLoc, tip) {
    if (tip == '40') {
        denumireLoc = denumireLoc.split(' ');
        if (denumireLoc.length == 3) {
            denumireLoc = "" + denumireLoc[1] + " " + denumireLoc[2];
        }
        else {
            denumireLoc = "" + denumireLoc[1];
        }
    }
    return denumireLoc;
}
exports.shortName = shortName;
//# sourceMappingURL=shortName.js.map