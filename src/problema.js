// Entradas no Banco
const fs = require('fs');

class EntradasNoBranco {
    LOG_FOLDER = `${__dirname}/log/`;
    LOG_FILE_PATH = `${this.LOG_FOLDER}log.txt`;

    constructor() {}

    logFileExist() {
        return new Promise((resolve, reject) => {
            fs.access(this.LOG_FILE_PATH, fs.F_OK, (error) => {
                if(error) {
                    console.error('Erro ao acessar arquivo: ', error);
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

module.exports = { EntradasNoBranco };