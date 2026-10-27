import { test } from '@playwright/test';
import WikipediaPage from '../support/pages/WikipediaPage';

test.describe('Fluxo de Pesquisas sobre Cultura Japonesa - Wikipedia', () => {
    let wikipediaPage: WikipediaPage;

    // O hook beforeEach corre automaticamente antes de CADA teste.
    // Garante que todos os cenários começam a partir de um estado limpo (página inicial),
    // aumentando a manutenibilidade e a pontuação no SonarCloud.
    test.beforeEach(async ({ page }) => {
        wikipediaPage = new WikipediaPage(page);
        await wikipediaPage.acessarWikipedia();
    });

    test('CT01: Deve pesquisar e validar o artigo principal sobre o Japão', async () => {
        await wikipediaPage.pesquisarArtigo('Japão');
        await wikipediaPage.validarTituloArtigo('Japão');
    });

    test('CT02: Deve pesquisar e validar o artigo sobre a lenda Yamata no Orochi', async () => {
        await wikipediaPage.pesquisarArtigo('Yamata no Orochi');
        await wikipediaPage.validarTituloArtigo('Yamata no Orochi');
    });

    test('CT03: Deve pesquisar e validar o artigo sobre a obra A Grande Onda de Kanagawa', async () => {
        await wikipediaPage.pesquisarArtigo('A Grande Onda de Kanagawa');
        await wikipediaPage.validarTituloArtigo('A Grande Onda de Kanagawa');
    });
});