import { Component } from "@angular/core";

interface Nav {
    link: string,
    nome: string,
    admin: boolean
}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent{

    public isCollapsed: boolean;

    constructor(){
        this.isCollapsed = true;
    }

    navs: Nav[] = [
        {
          link: '/home',
          nome: 'Home',
          admin: false
        },
        {
          link: '/produtos',
          nome: 'Produtos',
          admin: false
        },
        {
          link: '/fornecedores/listar-todos',
          nome: 'Fornecedores',
          admin: false
        },
      ]

}