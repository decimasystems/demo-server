"use strict";
//TODO: export only one class with all the sirutaProperties
var Properties = (function () {
    function Properties() {
        this.sirutaPath = "./sirutaTest.csv";
        this.sirutaProperties = ['siruta', 'denumireLoc', 'codPostal', 'judet', 'SIRSUP', 'TIP', 'NIV', 'MED', 'REGIUNE', 'FSJ', 'FS2', 'FS3', 'FSL', 'Rang', 'fictiv'];
        this.companiesPath = "./firmeTest1.csv";
        this.companiesPath2 = './firmeTest2.csv';
        this.companiesProperties = ['DENUMIRE', 'CUI', 'COD_INMATRICULARE', 'STARE_FIRMA', 'JUDET', 'LOCALITATE'];
    }
    return Properties;
}());
exports.Properties = Properties;
//# sourceMappingURL=config.js.map