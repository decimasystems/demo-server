import { accentsTidy } from './accentsTidy';
export function generateS(denumire: string) {
    var sinonime = [];
    if (denumire) {
        denumire = denumire.toLowerCase();
        sinonime.push(accentsTidy(denumire));
        if (/ă|â|â|â|î|î|-|ă|ț|ţ|ț|ş|ş|ș|ş/g.test(denumire)) {
            sinonime.push(denumire.replace(/[ăâââîî]/g, "a"));
            sinonime.push(denumire.replace(/[âââîî]/g, "i"));
            sinonime.push((denumire.replace(/[âââîî]/, "a")).replace(/[âââîî]/, "i"))
            sinonime.push(denumire.replace(/[âââ]/, "u"));
            sinonime.push(denumire.replace(/[-]/, ''));
            sinonime.push(denumire.replace(/[-]/, ' '));
            sinonime.push(denumire.replace(/[ă]/g, "a"));
            sinonime.push((((denumire.replace(/[ă]/, "a")).replace(/[ă]/, "a")).replace(/[ă]/, "a")).replace(/[e]/, "a").replace(/[şşșş]/, "s"));
            sinonime.push(denumire.replace(/[\s]/, ""));
            sinonime.push(denumire.replace(/[țţț]/, "s"));
            sinonime.push(denumire.replace(/[şşșş]/, "t"));
            sinonime.push(denumire.replace(/(ăltă)/, "ata").replace(/[şşșş]/, "s"))
            sinonime.push(denumire.replace("a", "e").replace(/[ă]/g, "a"))
            sinonime.push(denumire.replace(/[ăâââîî]/g, "a").replace(/[țţț]/, "t"));
            sinonime.push(denumire.replace(/[ăâââîî]/g, "a").replace(/[şşșş]/, "s"));
            sinonime.push(accentsTidy(denumire).replace(/[âââîî]/g, "i"));
            sinonime.push(accentsTidy(denumire).replace(/[âââîî]/g, "a"));
            sinonime.push(accentsTidy(denumire).replace(/n/, "r"));
            sinonime.push(denumire.replace(/ăa/g, "a"));
            if (accentsTidy(denumire).endsWith("s")) {
                sinonime.push(accentsTidy(denumire).concat("u"));
                sinonime.push(accentsTidy(denumire).concat("u de beliu"));
            }
            sinonime.push(denumire.replace(/[şşșş]/, "ss"));
            sinonime.push(accentsTidy(denumire).replace("a", "o"));

        }
        if (/oraș/.test(denumire)) {
            sinonime.push(denumire.substr(4, denumire.length));
        }
        if (/che/.test(denumire)) {
            sinonime.push(accentsTidy(denumire).replace(/(che)/, "ghe"));
        }
        if (/(aldei)/.test(denumire)) {
            sinonime.push(denumire.replace(/(aldei)/, "alzii"));
            sinonime.push(denumire.replace(/(aldei)/, "ălzii"));
        }
        if(/(din)/.test(denumire)){
            sinonime.push(accentsTidy(denumire).replace(/(din)/,"de"));
        }
        if(/blej/.test(denumire)){
            sinonime.push(accentsTidy(denumire).replace(/blej/,"bej"));
        }
        if(denumire.endsWith("ti")){
            sinonime.push(accentsTidy(denumire).replace(/e[şşșş]ti/g,"eti"));
        }
        return sinonime;
    }
    return 0;

}