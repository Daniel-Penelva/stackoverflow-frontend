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

  // verifica se existe token no localStorage.
  public hasToken(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
  }

  // recupera o usuário no localStorage sob a chave USER e converte de JSON para objeto JS.
  public getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  // obtém o objeto usuário usando o getUser.
  public getUserId(): string {
    const user = this.getUser();
    if (user === null) {
      return '';
    }
    return user.userId;
  }

  // obtém o objeto usuário usando o getUser e retorna o papel role.
  public getUserRole(): string {
    const user = this.getUser();
    if (user === null) {
      return '';
    }
    return user.role;
  }

  // verifica se existe token e recupera o papel (role) do usuário, no caso, 1 que representa administrador
  public isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == '1';
  }

  // remove o token e desloga o usuário
  public signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
