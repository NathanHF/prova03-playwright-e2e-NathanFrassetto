import { Page, expect } from '@playwright/test';
import WikipediaElements from '../elements/WikipediaElements';

export default class WikipediaPage {
    readonly page: Page;
    readonly elements: WikipediaElements;

    constructor(page: Page) {
        this.page = page;
        this.elements = new WikipediaElements();
    }

    async acessarWikipedia(): Promise<void> {
        // Aguarda a estrutura básica do site carregar
        await this.page.goto('https://pt.wikipedia.org/', { waitUntil: 'domcontentloaded' });
        console.log('✅ Setup: Acesso à página inicial estabilizado.');
    }

    async pesquisarArtigo(termo: string): Promise<void> {
        const inputBusca = this.page.locator(this.elements.campoBusca);
        // Usa o .first() para garantir o clique no botão principal visível
        const botaoBusca = this.page.locator(this.elements.botaoBusca).first(); 
        
        // Aguarda o campo ficar interativo e preenche o texto
        await inputBusca.waitFor({ state: 'visible' });
        await inputBusca.fill(termo);
        
        // CLIQUE FÍSICO: Substitui o 'Enter' e a submissão JavaScript.
        // O Playwright vai mover o rato virtual e clicar na lupa,
        // garantindo a navegação imediata.
        await botaoBusca.click();
        
        console.log(`✅ Ação: Pesquisa pelo termo "${termo}" disparada via clique no botão.`);
    }

    async validarTituloArtigo(tituloEsperado: string): Promise<void> {
        const tituloLocator = this.page.locator(this.elements.tituloArtigo);
        
        try {
            await expect(tituloLocator).toHaveText(tituloEsperado, { timeout: 10000 });
            console.log(`✅ Sucesso: O artigo "${tituloEsperado}" foi validado no ecrã.`);
        } catch (error) {
            console.error(`❌ Falha: O script esperava o H1 "${tituloEsperado}", mas a validação falhou.`);
            throw error;
        }
    }
}