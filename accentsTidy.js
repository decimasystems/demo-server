"use strict";
function accentsTidy(s) {
    if (s) {
        var r = s.toLowerCase();
        r = r.replace(new RegExp(/[ă]/g), "a");
        // r = r.replace(new RegExp(/[îî]/g), "i");
        r = r.replace(new RegExp(/[şşșş]/g), "s");
        r = r.replace(new RegExp(/[țţț]/g), "t");
        return r;
    }
    return s;
}
exports.accentsTidy = accentsTidy;
;
//# sourceMappingURL=accentsTidy.js.map