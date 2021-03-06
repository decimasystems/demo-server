"use strict";
var accentsTidy_1 = require("./accentsTidy");
function generateS(denumire) {
    var sinonime = [];
    if (denumire) {
        denumire = denumire.toLowerCase();
        sinonime.push(accentsTidy_1.accentsTidy(denumire));
        if (/ă|â|â|â|î|î|-|ă|ț|ţ|ț|ş|ş|ș|ş/g.test(denumire)) {
            sinonime.push(denumire.replace(/[ăâââîî]/g, "a"));
            sinonime.push(denumire.replace(/[âââîî]/g, "i"));
            sinonime.push((denumire.replace(/[âââîî]/, "a")).replace(/[âââîî]/, "i"));
            sinonime.push(denumire.replace(/[âââ]/, "u"));
            sinonime.push(denumire.replace(/[-]/, ''));
            sinonime.push(denumire.replace(/[-]/, ' '));
            sinonime.push(denumire.replace(/[ă]/g, "a"));
            sinonime.push((((denumire.replace(/[ă]/, "a")).replace(/[ă]/, "a")).replace(/[ă]/, "a")).replace(/[e]/, "a").replace(/[şşșş]/, "s"));
            sinonime.push(denumire.replace(/[\s]/, ""));
            sinonime.push(denumire.replace(/[țţț]/, "s"));
            sinonime.push(denumire.replace(/[şşșş]/, "t"));
            sinonime.push(denumire.replace(/(ăltă)/, "ata").replace(/[şşșş]/, "s"));
            sinonime.push(denumire.replace("a", "e").replace(/[ă]/g, "a"));
            sinonime.push(denumire.replace(/[ăâââîî]/g, "a").replace(/[țţț]/, "t"));
            sinonime.push(denumire.replace(/[ăâââîî]/g, "a").replace(/[şşșş]/, "s"));
            sinonime.push(accentsTidy_1.accentsTidy(denumire).replace(/[âââîî]/g, "i"));
            sinonime.push(accentsTidy_1.accentsTidy(denumire).replace(/[âââîî]/g, "a"));
            sinonime.push(accentsTidy_1.accentsTidy(denumire).replace(/n/, "r"));
            sinonime.push(denumire.replace(/ăa/g, "a"));
            if (accentsTidy_1.accentsTidy(denumire).endsWith("s")) {
                sinonime.push(accentsTidy_1.accentsTidy(denumire).concat("u"));
                sinonime.push(accentsTidy_1.accentsTidy(denumire).concat("u de beliu"));
            }
            sinonime.push(denumire.replace(/[şşșş]/, "ss"));
            sinonime.push(accentsTidy_1.accentsTidy(denumire).replace("o", "a"));
        }
        if (/oraș/.test(denumire)) {
            sinonime.push(denumire.substr(4, denumire.length));
        }
        if (/che/.test(denumire)) {
            sinonime.push(accentsTidy_1.accentsTidy(denumire).replace(/(che)/, "ghe"));
        }
        if (/(aldei)/.test(denumire)) {
            sinonime.push(denumire.replace(/(aldei)/, "alzii"));
            sinonime.push(denumire.replace(/(aldei)/, "ălzii"));
        }
        if (/(din)/.test(denumire)) {
            sinonime.push(accentsTidy_1.accentsTidy(denumire).replace(/(din)/, "de"));
        }
        if (/blej/.test(denumire)) {
            sinonime.push(accentsTidy_1.accentsTidy(denumire).replace(/blej/, "bej"));
        }
        if (accentsTidy_1.accentsTidy(denumire).endsWith("esti")) {
            sinonime.push(accentsTidy_1.accentsTidy(denumire).replace(/esti/, "eti"));
        }
        return sinonime;
    }
    return 0;
}
exports.generateS = generateS;
//# sourceMappingURL=generateS.js.map