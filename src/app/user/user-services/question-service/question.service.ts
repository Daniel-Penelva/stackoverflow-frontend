import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from '../../../auth-services/storage-service/storage.service';
import { QuestionRequest } from '../../../model/QuestionRequest';
import { AllQuestionRequest } from '../../../model/AllQuestionRequest';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  postQuestion(questionDto: QuestionRequest): Observable<QuestionRequest> {
    
    questionDto.userId = this.storageService.getUserId();
    console.log("Dados enviados:", questionDto);
    console.log("Headers enviados:", this.createAutorizationHeader());

    return this.http.post<QuestionRequest>(BASIC_URL + "api/question", questionDto, { headers: this.createAutorizationHeader() }).pipe(catchError(this.handleError));
  }

  createAutorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set("Authorization", "Bearer " + this.storageService.getToken());
  }

  getAllQuestion(pageNumber: number): Observable<AllQuestionRequest> {
    return this.http.get<AllQuestionRequest>(BASIC_URL + `api/questions/${pageNumber}`, { headers: this.createAutorizationHeader() }).pipe(catchError(this.handleError));
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
