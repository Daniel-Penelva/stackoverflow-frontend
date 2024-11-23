import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], exports: [
    CommonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class AppMaterialModule { }
