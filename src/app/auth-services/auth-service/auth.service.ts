import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SignupRequest } from '../../model/SignupRequest';
import { StorageService } from '../storage-service/storage.service';
import { environment } from '../../../environments/environment';

// const BASIC_URL = "http://localhost:8080/";
const BASIC_URL = environment.apiUrl;

export const AUTH_HEADER = "authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  // Método responsável por enviar os dados de registro do usuário para o endpoint sign-up.
  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(BASIC_URL + "sign-up", signupRequest).pipe(catchError(this.handleError));
  }

  // Método responsável por enviar os dados do login (email e password) para o endpoint authentication
  login(email: string, password: string): Observable<any> {
    return this.http.post(BASIC_URL + "authentication", { email, password }, { observe: 'response' }).pipe(
      tap(__ => this.log("User Authentication")), 
      map((res: HttpResponse<any>) => {
        this.storage.saveUser(res.body);
  
        // Verifica se o cabeçalho está presente antes de usar
        const authHeader = res.headers.get(AUTH_HEADER);
        if (authHeader) {
          const tokenLength = authHeader.length;
          const bearerToken = authHeader.substring(7, tokenLength);
          this.storage.saveToken(bearerToken);
        } else {
          console.error(`Cabeçalho ${AUTH_HEADER} não encontrado na resposta HTTP.`);
        }
  
        return res;
      }),
      catchError(this.handleError)
    );
  }

  log(message: string): void {
    console.log("User Auth Service: " + message);
  }

  // Método de tratamento de erros que captura falhas na comunicação com o servidor.
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`; // Erro no lado do cliente
    } else {
      errorMessage = `Código: ${error.status}, Mensagem: ${error.message}`; // Erro no lado do servidor
    }
    return throwError(errorMessage);
  }

}
