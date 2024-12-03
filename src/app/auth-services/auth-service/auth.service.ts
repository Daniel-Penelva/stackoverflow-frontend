import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SignupRequest } from '../../model/SignupRequest';
import { LoginRequest } from '../../model/LoginRequest';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Método responsável por enviar os dados de registro do usuário para o endpoint sign-up.
  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(BASIC_URL + "sign-up", signupRequest).pipe(catchError(this.handleError));
  }

  // 
  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(BASIC_URL + "authentication", loginRequest).pipe(catchError(this.handleError));
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
