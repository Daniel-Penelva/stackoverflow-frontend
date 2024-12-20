import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes'; // import foi colocado manualmente
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { QuestionService } from '../../user-services/question-service/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrl: './post-question.component.scss',
})
export class PostQuestionComponent {

  tags: { name: string }[] = [];  // Como estou trabalhando com objetos que possuem uma propriedade "name" do tipo "string", então eu precisei tipar explicitamente tags como Array<{ name: string }> 
  isSubmitting!: boolean;
  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);

  validateForm!: FormGroup;

  constructor(
    private questionService: QuestionService, 
    private fb: FormBuilder, 
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: [[], Validators.required]
    })
  }

  postQuestion() {
    console.log("Buscando dados:", this.validateForm.value); // Testando a captura dos valores
  
    this.questionService.postQuestion(this.validateForm.value).subscribe({
      next: (response) => {
        console.log("Pergunta criada com sucesso:", response);
        if(response.id != null) {
          this.snackBar.open('Pergunta criada com sucesso', 'Fechar', { duration: 5000 });
        } else {
          this.snackBar.open('Algo deu errado!', 'Fechar', { duration: 5000 });
        }
      },
      error: (error) => {
        console.error("Erro ao criar a pergunta:", error);
      },
      complete: () => {
        console.log("Requisição finalizada.");
      }
    });
  }
  

  /* Documentação da utilização "Chips with input" - Link: https://material.angular.io/components/chips/overview */ 
  // Este método adiciona uma nova tag ao array tags.
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();   // captura o valor inserido no input, removendo espaços em branco.
    // add as novas tags ao array se o valor não for vazio
    if (value) {
      this.tags.push({ name: value });  // aqui a tags vai ser inferido como string a propriedade name
    }

    // limpar o valor de entrada (input)
    event.chipInput!.clear();
  }

  // Este método remove uma tag existente do array tags.
  remove(tag: any): void {
    const index = this.tags.indexOf(tag);                   // encontra o índice da tag no array.
    if (index >= 0) {
      this.tags.splice(index, 1);                           // remove a tag se o índice for válido.
      this.announcer.announce(`Removido ${tag}`);           // usa o LiveAnnouncer para anunciar a remoção da tag, tornando a aplicação mais acessível.
    }
  }

  // Este método permite editar o valor de uma tag.
  edit(tag: any, event: MatChipEditedEvent) {
    const value = event.value.trim();                        // captura o novo valor e remove espaços em branco.
    // Remova a tag se ela não tiver mais um nome
    if(!value) {
      this.remove(tag);                                      // remove a tag se o novo valor estiver vazio.
      return;
    }

    // Edita a tag existente
    const index = this.tags.indexOf(tag);                     // atualiza o valor da tag no array se o índice for válido.
    if(index >= 0) {
      this.tags[index].name = value;
    }
  }

}


/** Afins de explicação:
 * Sobre: tags: { name: string }[] = [];
 * A variável "tags" que é um array possui uma propriedade "name" do tipo "string".
 * Ou seja, a variável tags é um array de objetos, e cada objeto no array tem uma propriedade chamada name, que é do tipo string.
 * Por exemplo, 
 * 
 * tags = [{ name: 'Angular' }, { name: 'TypeScript' }, { name: 'Java' }];
 * 
 * Neste caso:
 * A variavel tags é um array de objetos com o tipo { name: string }[].
 * Cada objeto no array tem apenas uma propriedade name, que armazena uma string (como 'Angular' ou 'TypeScript').
*/