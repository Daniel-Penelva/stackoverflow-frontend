import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleQuestionRequest } from '../../../model/SingleQuestionRequest';
import { QuestionService } from '../../user-services/question-service/question.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss',
})
export class ViewQuestionComponent {
  
  questionId!: number;
  question!: SingleQuestionRequest | null;

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
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
}
