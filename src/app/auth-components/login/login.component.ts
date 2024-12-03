import { Component } from '@angular/core';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private service: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(3)]]
    });
  }

  login() {
    // console.log(this.loginForm.value);   // testando se captura os valores das propriedades email e password

    this.service.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
    }, error => {
      console.error('Erro ao logar usuário', error);
    });
  }

}
