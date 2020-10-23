import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Injectable()
export class ContaGuard implements CanDeactivate<CadastroComponent>, CanActivate{
    
    localStorage = new LocalStorageUtils();

    constructor(private router: Router){

    }

    canActivate() {
        if(this.localStorage.obterTokenUsuario()){
            this.router.navigate(['/home'])
        }

        return true;
    }
    
    canDeactivate(cadastroComponent: CadastroComponent) {
        if(cadastroComponent.mudancasNaoSalvas) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?')
        }

        return true;
    }

}