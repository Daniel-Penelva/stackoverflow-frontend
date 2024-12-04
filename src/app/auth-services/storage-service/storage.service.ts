import { Injectable } from '@angular/core';

const TOKEN = 'c_token';
const USER = 'c_user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // remove qualquer valor previamente armazenado no localStorage sob a chave c_user e salva um novo objeto de usuário, convertido para string JSON.
  public saveUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  // remove qualquer valor previamente armazenado na chave c_token e salva o novo token JWT diretamente como string.
  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  // recupera o token do armazenamento local.
  getToken(): any {
    return localStorage.getItem(TOKEN);
  }

  // verifica se o token está presente no armazenamento local e retorna false se o token não existir.
  isUserLoggedIn(): boolean {
    return !!this.getToken();         // Usa !! para converter o valor em um booleano.
  }

  // remove o token e os dados do usuário do armazenamento local, efetivamente deslogando o usuário.
  logout() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
