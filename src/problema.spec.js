const { EntradasNoBranco } = require('./problema');

describe('Verificar existência do arquivo de log', () => {
    it('O arquivo deve existir', async () => {
        const entradasNoBranco = new EntradasNoBranco();

        expect(await entradasNoBranco.logFileExist()).toEqual(true);
    });
});