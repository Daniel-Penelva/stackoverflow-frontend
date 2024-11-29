import { Component, signal } from '@angular/core';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm!: FormGroup;
  isSubmitting: boolean = false;  // Flag para desabilitar o botão enquanto a requisição está em andamento.

  showPassword = signal(true);    // Estado reativo para controlar a visibilidade da senha

  constructor(
    private service: AuthService, 
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private router: Router ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    }, {validators: this.matchPasswordsValidator('password', 'confirmPassword') });
  }

/** 
  private confirmationValidator(fg: FormGroup) {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;

    if(password !== confirmPassword) {
      fg.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      fg.get('confirmPassword')?.setErrors(null);
    }
  }
*/

  // Refatorando: Validador reutilizável para confirmação de senha
  private matchPasswordsValidator(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.get(passwordKey);
      const confirmPassword = formGroup.get(confirmPasswordKey);

      if (confirmPassword?.errors && !confirmPassword.errors['passwordMismatch']) { 
        return; // Retorna se houver outros erros em confirmPassword
      }

      if (password?.value !== confirmPassword?.value) {
        confirmPassword?.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword?.setErrors(null);
      }
    };
  }


  signup() {
    // console.log(this.signupForm.value);  // testando a busca das propriedades nome, email, password e confirmPassword

    if (this.signupForm.invalid) {
      this.snackBar.open('Por favor, corrija os erros antes de continuar.', 'Fechar', { duration: 5000 });
      return;
    }

    this.isSubmitting = true; // Desabilita o botão durante o envio

    this.service.signup(this.signupForm.value).subscribe({
      next: (response) => {
        if (response.id != null) {
          this.snackBar.open('Cadastrado com sucesso!', 'Fechar', { duration: 5000 });
          this.signupForm.reset(); // Limpa o formulário após o sucesso
          this.router.navigateByUrl('/login');
        } else {
          this.snackBar.open(response.message || 'Erro inesperado!', 'Fechar', { duration: 5000 });
        }
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);
        this.snackBar.open('Erro ao cadastrar usuário, por favor tente mais tarde!', 'Fechar', { duration: 5000 });
      },
      complete: () => {
        this.isSubmitting = false; // Reabilita o botão ao finalizar a requisição.
      }
    });
  }

  togglePasswordVisibility(mouseEvent: MouseEvent) {
    this.showPassword.set(!this.showPassword());      // Alterna o estado
    mouseEvent.stopPropagation();                     // Impede a propagação do evento
  }

}

// OBS. O operador ?. verifica se field é null ou undefined antes de tentar acessar o método hasError().