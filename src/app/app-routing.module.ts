import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { NoAuthGuard } from './auth-guards/noAuth-guard/no-auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard]},
  {path: 'user', loadChildren: () => import("./user/user.module").then(m => m.UserModule)}, // http://localhost:4200/user/dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/** OBS.
 *  ROTA       GUARD         FINALIDADE
 * /login   NoAuthGuard   Permite acesso apenas para usuários não autenticados. Redireciona usuários logados para o dashboard.
 * /signup  NoAuthGuard   Permite o acesso apenas para usuários não autenticados. Redireciona usuários logados para o dashboard.
*/