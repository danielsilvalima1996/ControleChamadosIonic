import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrocarSenhaPage } from './trocar-senha.page';

const routes: Routes = [
  {
    path: '',
    component: TrocarSenhaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrocarSenhaPage]
})
export class TrocarSenhaPageModule {}
