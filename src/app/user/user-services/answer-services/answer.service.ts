import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth-services/storage-service/storage.service';
import { catchError, Observable, throwError } from 'rxjs';
import { AnswersRequest } from '../../../model/AnswersRequest';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  postAnswer(answerDto: AnswersRequest): Observable<AnswersRequest> {
    return this.http.post<AnswersRequest>(BASIC_URL + "api/answer", answerDto, { headers: this.createAutorizationHeader() }).pipe(catchError(this.handleError));
  }

  postAnswerImage(fileData: FormData, answerId: number): Observable<any> {
    const url = `${BASIC_URL}api/image/${answerId}`;
    return this.http.post<[]>(url, fileData, { headers: this.createAutorizationHeader() }).pipe(catchError(this.handleError));
  }


  createAutorizationHeader(): HttpHeaders {
      let authHeaders: HttpHeaders = new HttpHeaders();
      return authHeaders.set("Authorization", "Bearer " + this.storageService.getToken());
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
