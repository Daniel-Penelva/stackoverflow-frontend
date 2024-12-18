import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserGuard } from '../auth-guards/user-guard/user.guard';
import { PostQuestionComponent } from './components/post-question/post-question.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserGuard] }, // http://localhost:4200/user/dashboard
  { path: 'question', component: PostQuestionComponent, canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }


/** OBS.
 *    ROTA            GUARD         FINALIDADE
 * /user/dashboard   UserGuard   Permite o acesso apenas para usuários autenticados. Redireciona usuários não autenticados para a página de login com uma mensagem de aviso.
*/