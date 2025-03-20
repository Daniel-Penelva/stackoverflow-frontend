import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../auth-services/storage-service/storage.service';
import { QuestionVoteRequest } from '../../../model/QuestionVoteRequest';
import { SingleQuestionRequest } from '../../../model/SingleQuestionRequest';
import { VoteTypeRequest } from '../../../model/VoteTypeRequest.enum';
import { AnswerService } from '../../user-services/answer-services/answer.service';
import { QuestionService } from '../../user-services/question-service/question.service';

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
  answers: any[] = [];

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

        // Limpa o array antes de adicionar novas respostas (evita duplicação)
        this.answers = [];

        response.answersDTOList.forEach(element => {
          if(element.file != null) {
            element.convertedImg = `data:${element.file.type};base64,${element.file.data}`; // Define dinamicamente o tipo da imagem (jpeg, png) para suportar diferentes formatos
          }
          this.answers.push(element);
        });
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

    // Garante que há um arquivo antes de adicioná-lo ao FormData
    if (this.selectedFile) {
      this.formData.append("multipartFile", this.selectedFile as any);
    }

    this.answerService.postAnswer(data).subscribe({
      next: (response: any) => {
        if (response.id != null) {
          console.log('Resposta enviada com sucesso:', response);
  
          if (this.selectedFile) { // Apenas envia imagem se houver um arquivo
            this.answerService.postAnswerImage(this.formData, response.id).subscribe((res) => {
              console.log('Resposta da requisição da imagem:', res);
              this.snackBar.open('Imagem enviada com sucesso!', 'Fechar', { duration: 5000 });
            });
          }
          
          this.snackBar.open('Resposta enviada com sucesso!', 'Fechar', { duration: 5000 });
          this.router.navigate(['/user/dashboard']);
        } else {
          this.snackBar.open('Erro ao enviar resposta!', 'Fechar', { duration: 5000 });
        }
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open('Erro ao processar requisição!', 'Fechar', { duration: 5000 });
      },
      complete: () => {
        console.log('Requisição finalizada.');
        this.formData = new FormData(); // Resetando FormData após envio
        this.selectedFile = null; // Resetando arquivo selecionado
        this.imagePreview = null; // Resetando preview da imagem
      },
    });
  }

  // Captura a imagem selecionada pelo usuário e chama previewImage() para exibir uma prévia.
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  // Visualizar a imagem selecionada no template
  previewImage(): void {
    if(this.selectedFile) {              // Verifica se um arquivo foi selecionado
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile as Blob);
    }
  }

  addVote(voteType: String) {
    console.log('Tipo de voto:', voteType);

    const mappedVoteType = VoteTypeRequest[voteType as keyof typeof VoteTypeRequest];

    if (mappedVoteType === undefined) {
        console.error("Tipo de voto inválido:", voteType);
        return;
    }

    const data: QuestionVoteRequest = {
        voteType: mappedVoteType,
        userId: this.storageService.getUserId(),
        questionId: this.questionId
    };

    this.questionService.addVoteToQuestion(data).subscribe({
        next: (response) => {
            console.log('Resposta da requisição:', response);
            if (response && response.id) {
                this.snackBar.open('Voto computado com sucesso!', 'Fechar', { duration: 5000 });
            } else {
                this.snackBar.open('Erro ao computar voto!', 'Fechar', { duration: 5000 });
            }
        },
        error: (error) => {
            console.error('Erro na requisição:', error);
            this.snackBar.open('Erro ao computar voto!', 'Fechar', { duration: 5000 });
        },
        complete: () => {
            console.log('Requisição finalizada.');
        }
    });
}
}
