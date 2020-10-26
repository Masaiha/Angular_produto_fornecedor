import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Fornecedor } from '../models/fornecedor';
import { BaseService } from 'src/app/services/base.service';
import { CepConsulta } from '../models/endereco';
import { StringUtils } from 'src/app/utils/stringUtils';

@Injectable()
export class FornecedorService extends BaseService {

    fornecedor: Fornecedor = new Fornecedor();

    constructor(private http: HttpClient) { super() 
    
        this.fornecedor.nome = "Teste Fake"
        this.fornecedor.documento = "32165498754"
        this.fornecedor.ativo = true
        this.fornecedor.tipoFornecedor = 1
    }

    obterTodos(): Observable<Fornecedor[]> {
        return this.http
            .get<Fornecedor[]>(this.UrlServiceV1 + "fornecedores")
            .pipe(catchError(super.ErrorService));
    }

    obterPorId(id: string): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }

    novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }

    atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }

    excluirFornecedor(id: string): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }    

    consultarCep(cep: string): Observable<CepConsulta> {
        cep = StringUtils.somenteNumero(cep);

        if(cep.length < 8) return;

        return this.http.get<CepConsulta>(`http://viacep.com.br/ws/${cep}/json`)
        .pipe(catchError(super.ErrorService))
    }
}
