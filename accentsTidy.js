"use strict";
function accentsTidy(s) {
    if (s) {
        var r = s.toLowerCase();
        r = r.replace(new RegExp(/[ă]/g), "a");
        //  r = r.replace(new RegExp(/[î]/g), "i");â
        r = r.replace(new RegExp(/[şşșş]/g), "s");
        r = r.replace(new RegExp(/[țţ]/g), "t");
        return r;
    }
    return s;
}
exports.accentsTidy = accentsTidy;
;
//# sourceMappingURL=accentsTidy.js.map