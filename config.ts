//TODO: export only one class with all the sirutaProperties
//TODO: load this data from a file env.json that will contain the environment data 
/* 

{
  "development": {
      "companiesPath": "./firmeTest1.csv",
      "companiesPath2": "./firmeTest2.csv",
      .......
  }, 
  "production": {
     "companiesPath": "./firmeTest1.csv",
      "companiesPath2": "./firmeTest2.csv",
      .......
  }
}


use it with var env = require('env.json');

exports.config = function() {
  var node_env = process.env.NODE_ENV || 'development';
  return env[node_env];
};


*/
export class Properties {

    sirutaPath: any = "./sirutaTest.csv";
    sirutaProperties: any = ['siruta', 'denumireLoc', 'codPostal', 'judet', 'SIRSUP', 'TIP', 'NIV', 'MED', 'REGIUNE', 'FSJ', 'FS2', 'FS3', 'FSL', 'Rang', 'fictiv'];
    companiesPath: any = "./firme1.csv";
    companiesPath2: any = './firme2.csv';
    companiesProperties: any = ['DENUMIRE', 'CUI', 'COD_INMATRICULARE', 'STARE_FIRMA', 'JUDET', 'LOCALITATE'];
}
