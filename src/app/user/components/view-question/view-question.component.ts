import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleQuestionRequest } from '../../../model/SingleQuestionRequest';
import { QuestionService } from '../../user-services/question-service/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../user-services/answer-services/answer.service';
import { StorageService } from '../../../auth-services/storage-service/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss',
})
export class ViewQuestionComponent {
  
  questionId!: number;
  question!: SingleQuestionRequest | null;

  validateForm!: FormGroup;

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  formData: FormData = new FormData();   // Para manipular arquivo de imagem

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private answerService: AnswerService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private router: Router
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

    this.formData.append("multipartFile", this.selectedFile as any);

    this.answerService.postAnswer(data).subscribe({
      next: (response: any) => {
        this.answerService.postAnswerImage(this.formData, response.id).subscribe((res) => {
          console.log('Resposta da requisição da imagem', res);
        });
        console.log('Resposta da requisição:', response);
        
        if(response.id != null) {
          this.snackBar.open('Resposta enviada com sucesso!', 'Fechar', { duration: 5000 });
          this.router.navigate(['/user/dashboard']);
        } else {
          this.snackBar.open('Erro ao enviar resposta!', 'Fechar', { duration: 5000 });
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Requisição finalizada.');
      },
    })
  }

  // Captura a imagem selecionada pelo usuário e chama previewImage() para exibir uma prévia.
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  // Visualizar a imagem selecionada no template
  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }
}
