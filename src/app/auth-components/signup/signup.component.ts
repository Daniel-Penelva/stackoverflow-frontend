import { Component } from '@angular/core';
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
    }, {validator: this.confirmationValidator })
  }

  private confirmationValidator(fg: FormGroup) {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;

    if(password !== confirmPassword) {
      fg.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      fg.get('confirmPassword')?.setErrors(null);
    }
  }

  signup() {
    // console.log(this.signupForm.value);  // testando a busca das propriedades nome, email, password e confirmPassword

    this.service.signup(this.signupForm.value).subscribe((response) => {
      console.log(response);
      if (response.id != null) {
        this.snackBar.open('Cadastrado com sucesso!', 'Fechar', { duration: 5000 });
        this.router.navigateByUrl('/login');
      } else {
        this.snackBar.open(response.message, 'Fechar', { duration: 5000 });
      }
    }, (error) => {
      console.error('Erro ao cadastrar usuário:', error);
      this.snackBar.open('Erro ao cadastrar usuário, por favor tente mais tarde!', 'Fechar', { duration: 5000 });
    })
  }

}
