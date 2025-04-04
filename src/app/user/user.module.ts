import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../angular-material/app-material.module';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';
import { ViewQuestionComponent } from './components/view-question/view-question.component';
import { GetQuestionsByUseridComponent } from './components/get-questions-by-userid/get-questions-by-userid.component';
import { SearchQuestionComponent } from './components/search-question/search-question.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PostQuestionComponent,
    LoadingDialogComponent,
    ViewQuestionComponent,
    GetQuestionsByUseridComponent,
    SearchQuestionComponent
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
