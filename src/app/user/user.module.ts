import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../angular-material/app-material.module';
import { PostQuestionComponent } from './components/post-question/post-question.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PostQuestionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AppMaterialModule, 
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
