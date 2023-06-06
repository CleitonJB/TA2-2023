const { EntradasNoBranco } = require('./problema');

describe('Verificar existência do arquivo de log', () => {
    it('O arquivo deve existir', async () => {
        const entradasNoBranco = new EntradasNoBranco();

        expect(await entradasNoBranco.logFileExist()).toEqual(true);
    });
});

//* Pessoa passou pela porta (Inserir no registro)

//* Verificar quantas pessoas entraram no bando no período fornecido
describe('Verificar quantas pessoas entraram no bando', () => {
    it('O arquivo deve existir', async () => {
        const entradasNoBranco = new EntradasNoBranco();

        expect(await entradasNoBranco.logFileExist()).toEqual(true);
    });

    it('Obter registros do arquivo de log com sucesso', async () => {
        const entradasNoBranco = new EntradasNoBranco();

        expect(await entradasNoBranco.getRecordsNumber()).not.toBeNaN();
    });
});

//* Inserir registro no arquivo de log
describe('Inserir registro no arquivo de log', () => {
    it('O registro de entrada deve ser válido', () => {
        const entradasNoBranco = new EntradasNoBranco();

        expect(entradasNoBranco.checkDatetimeFormat('2023-06-05 16:00:00')).toEqual();
    });

    it('A hora deve estar entre o horário de funcionamento', () => {
        const entradasNoBranco = new EntradasNoBranco();

        expect(entradasNoBranco.checkDatetimeRange('2023-06-05 16:00:00')).toEqual();
    });

    it('Deve incluir um registro no arquivo de log com sucesso', () => {
        const entradasNoBranco = new EntradasNoBranco();

        expect(entradasNoBranco.insertRegisterAtLog('2023-06-05 10:00:00')).toEqual();
    });
});