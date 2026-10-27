export default class WikipediaElements {

    // Mapeamento do campo de entrada de texto da barra de pesquisa.
 
    get campoBusca(): string {
        return '#searchInput';
    }

    
    // Mapeamento do botão de pesquisa (lupa).
    //Localiza o botão dentro do formulário para forçar o clique.
     

    get botaoBusca(): string {
        return '#searchform button';
    }

    
     //Mapeamento do título principal da página de destino (H1).
    

    get tituloArtigo(): string {
        return '#firstHeading';
    }
}