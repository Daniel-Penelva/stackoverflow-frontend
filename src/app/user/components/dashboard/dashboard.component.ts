import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionService } from '../../user-services/question-service/question.service';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  questions: any[] = [];          // Armazena a lista de perguntas da página atual.
  pageNum: number = 0;            // Página inicial.
  total!: number;                 // Total de registros, calculado como total de páginas * registros por página.


  constructor(private questionService: QuestionService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {

    /**
     * OBS. 
     * disableClose: Impede que o overlay seja fechado manualmente
     * panelClass: Estilo opcional para sobreposição transparente
    */
    const dialogRef = this.dialog.open(LoadingDialogComponent, { disableClose: true, panelClass: 'transparent-dialog'});

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
        dialogRef.close(); // Fecha o dialog ao terminar
        console.log('Requisição finalizada.');
      },
    });
  }

  getLatestQuestions() {
    
    this.questionService.getLatestQuestion(this.pageNum).subscribe({
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
