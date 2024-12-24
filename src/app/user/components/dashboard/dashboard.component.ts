import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  questions: any[] = [];          // Armazena a lista de perguntas da página atual.
  pageNum: number = 0;            // Página inicial.
  total!: number;                 // Total de registros, calculado como total de páginas * registros por página.


  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getAllQuestion(this.pageNum).subscribe({
      next: (response) => {
        console.log(response);
        this.questions = response.questionsDtoList;
        this.total = response.totalPages * 5;
      },
      error: (error) => {
        console.error('Erro ao listar as perguntas:', error);
      },
      complete: () => {
        console.log('Requisição finalizada.');
      },
    });
  }

  pageIndexChange(event: any) {
    this.pageNum = event.pageIndex;
    this.getAllQuestions();
  }

}
