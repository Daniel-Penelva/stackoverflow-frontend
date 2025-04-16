import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth-services/storage-service/storage.service';
import { catchError, Observable, throwError } from 'rxjs';
import { AnswersRequest } from '../../../model/AnswersRequest';
import { AnswerVoteRequest } from '../../../model/AnswerVoteRequest';
import { CommentRequest } from '../../../model/CommentRequest';
import { environment } from '../../../../environments/environment';

//const BASIC_URL = "http://localhost:8080/";
const BASIC_URL = environment.apiUrl;

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

  approveAnswer(answerId: number): Observable<any> {
    const url = `${BASIC_URL}api/answer/${answerId}`;
    return this.http.get<[]>(url, { headers: this.createAutorizationHeader() }).pipe(catchError(this.handleError));
  }

  addVoteToAnswer(answerVoteDto: AnswerVoteRequest): Observable<AnswerVoteRequest> {
    const url = `${BASIC_URL}api/answer-vote`;
    return this.http.post<AnswerVoteRequest>(url, answerVoteDto, { headers: this.createAutorizationHeader() }).pipe(catchError(this.handleError));
  }

  postCommentToAnswer(commentDto: CommentRequest): Observable<CommentRequest> {
    const url = `${BASIC_URL}api/answer/comment`;
    return this.http.post<CommentRequest>(url, commentDto, { headers: this.createAutorizationHeader() }).pipe(catchError(this.handleError));
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
