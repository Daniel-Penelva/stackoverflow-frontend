import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleQuestionRequest } from '../../../model/SingleQuestionRequest';
import { QuestionService } from '../../user-services/question-service/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../user-services/answer-services/answer.service';
import { StorageService } from '../../../auth-services/storage-service/storage.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss',
})
export class ViewQuestionComponent {
  
  questionId!: number;
  question!: SingleQuestionRequest | null;

  validateForm!: FormGroup;

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private answerService: AnswerService,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}


  ngOnInit(): void {

    this.validateForm = this.fb.group({
      body: ['', Validators.required]
    });


    this.activatedRoute.params.subscribe((params) => {
      console.log('Parâmetros de rota:', params);
      this.questionId = +params['questionId'];  // Converte o parâmetro para número
      if (this.questionId) {
        this.getQuestionById();
      } else {
        console.log('ID da pergunta não encontrado.');
      }
    });
  }

  getQuestionById(): void {

    if (!this.questionId) {
      console.log('ID da pergunta não encontrado.');
      return;
    }

    this.questionService.getQuestionById(this.questionId).subscribe({
      next: (response) => {
        console.log('Resposta da requisição recebida:', response);
        this.question = response || null;
        console.log('Pergunta após a tarefa:', this.question);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Requisição finalizada.');
      },
    });
  }

  addAnswer() {
    // console.log('Formulário de resposta:', this.validateForm.value); // testando a captura do formulário

    const data = this.validateForm.value;
    data.questionId = this.questionId;
    data.userId = this.storageService.getUserId();

    console.log('Dados da resposta:', data);

    this.answerService.postAnswer(data).subscribe({
      next(response) {
        console.log('Resposta da requisição:', response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Requisição finalizada.');
      },
    })
  }
}
