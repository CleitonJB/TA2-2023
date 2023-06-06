// Entradas no Banco
const fs = require('fs');

class EntradasNoBranco {
    LOG_FOLDER = `${__dirname}/log/`;
    LOG_FILE_PATH = `${this.LOG_FOLDER}log.txt`;


    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    formatDate(date) {
        return (
            [
                date.getFullYear(),
                this.padTo2Digits(date.getMonth() + 1),
                this.padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                this.padTo2Digits(date.getHours()),
                this.padTo2Digits(date.getMinutes()),
                this.padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }

    constructor() {}

    logFileExist() {
        return new Promise((resolve, reject) => {
            fs.access(this.LOG_FILE_PATH, fs.F_OK, (error) => {
                if (error) {
                    console.error('Erro ao acessar arquivo: ', error);
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    insertRegisterAtLog(datetime) {
        this.checkDatetimeFormat(datetime);
        this.checkDatetimeRange(datetime);
        this.writeAtLogFile(`${datetime} - Abertura da porta OK`);
    }

    checkDatetimeFormat(datetime) {
        if(!datetime) throw new Error('O parâmetro (data/hora) deve ser informado para a validação do formato!');

        const formated = datetime.toString().split(" ");
        const date = formated[0];
        const time = formated[1];

        if(!date.match(/^([0-9]{4}-[0-9]{2}-[0-9]{2})$/)) throw new Error('A data é inválida!')

        if(!time.match(/^([0-9]{2}:[0-9]{2}:[0-9]{2})$/)) throw new Error('A hora é inválida!');
    }

    checkDatetimeRange(datetime) {
        if(!datetime) throw new Error('O parâmetro (data/hora) deve ser informado para a validação do horário de funcionamento!');

        const date = datetime.toString().split(" ")[0];

        const currentDate = new Date(datetime).getTime();
        const firstDate = new Date(`${date} 10:00:00`).getTime();
        const lastDate  = new Date(`${date} 16:00:00`).getTime();

        if(!(currentDate >= firstDate && currentDate <= lastDate)) {
            throw new Error('A hora de entrada está fora do expediente!');
        }
    }

    writeAtLogFile(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.LOG_FILE_PATH, data, (error) => {
                if(error) {
                    console.error('Erro ao escrever no arquivo: ', error);
                    resolve(false);
                }

                resolve(true);
            });
        });
    }

    getRecordsNumber() {
        return new Promise(async (resolve, reject) => {
            try {
                const records = await this.readAtLogFile();
                let peoplesCounter = 0;

                await records.forEach(datetime => {
                    const currentRecord = new Date(datetime).getTime();
                    
                    const date = datetime.toString().split(" ")[0];
                    const firstDate = new Date(`${date} 10:00:00`).getTime();
                    const lastDate  = new Date(`${date} 16:00:00`).getTime();

                    if(currentRecord >= firstDate && currentRecord <= lastDate) peoplesCounter++;
                });

                resolve(peoplesCounter);
            } catch (error) {
                throw new Error(`Erro ao contar quantidade de registros no período do expediente: ${error}`);
            }
        });
    }

    readAtLogFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.LOG_FILE_PATH, 'utf8', (error, data) => {
                if(error) {
                    throw new Error('Erro ao ler o arquivo: ', error);
                }

                resolve(data.split('\n'));
            });
        });
    }
}

module.exports = { EntradasNoBranco };