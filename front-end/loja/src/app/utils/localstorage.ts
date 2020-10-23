import { Usuario } from '../conta/models/usuario';

export class LocalStorageUtils {

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('loja.user'))
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('loja.token');
        localStorage.removeItem('loja.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('loja.token');
    }

    public salvarTokenUsuario(accessToken: string) {
        localStorage.setItem('loja.token', accessToken);
    }

    public salvarUsuario(userToken: string) {
        localStorage.setItem('loja.user', JSON.stringify(userToken));
    }
}