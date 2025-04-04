import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { QuestionRequest } from '../../../model/QuestionRequest';

@Component({
  selector: 'app-search-question',
  templateUrl: './search-question.component.html',
  styleUrl: './search-question.component.scss'
})
export class SearchQuestionComponent {

  titleForm!: FormGroup;
  pageNumber: number = 0;
  questions: QuestionRequest[]=[];
  total!: number;
  hasValidationError: boolean = false;

  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.titleForm = this.fb.group({
      title: [
        null, 
        [
          Validators.required, 
          Validators.pattern(/^[a-zA-Z0-9\s]+$/) // Permite apenas letras, números e espaços
        ]
      ]
    });

    // Atualiza a validação somente quando o valor realmente mudar e após um pequeno atraso
    this.titleForm.get('title')?.valueChanges
      .pipe(
        debounceTime(300), // Aguarda 300ms para evitar múltiplas chamadas rápidas
        distinctUntilChanged() // Só dispara se o valor realmente mudar
      )
      .subscribe(() => {
        this.titleForm.get('title')?.updateValueAndValidity({ emitEvent: false });
      });
  }

  searchQuestionByTitle(): void {
    
    if (this.titleForm.invalid) {
      this.hasValidationError = true;
      return;
    }

    this.hasValidationError = false;

    this.questionService.searchQuestionByTitle(this.titleForm.controls['title']!.value, this.pageNumber).subscribe({
      next: (response) => {
        console.log('Resposta da pesquisa:', response);
        this.questions = response.questionsDtoList;
        this.total = response.totalPages * 5;
      },
      error: (error) => {
        console.error('Erro ao pesquisar perguntas:', error);
      },
      complete: () => {
        console.log('Pesquisa concluída');
      }
    });
  }

  pageIndexChange(event: any): void {
    this.pageNumber = event.pageIndex;
    this.searchQuestionByTitle(); // Chama a função de pesquisa ao mudar de página
  }

}
