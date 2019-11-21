import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChamadosListPageModule } from './chamados/chamados-list/chamados-list.module';
import { ChamadosDetailPageModule } from './chamados/chamados-detail/chamados-detail.module';
import { ChamadosListPage } from './chamados/chamados-list/chamados-list.page';
import { ChamadosDetailPage } from './chamados/chamados-detail/chamados-detail.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'trocar-senha', loadChildren: './trocar-senha/trocar-senha.module#TrocarSenhaPageModule' },
  { path: 'chamados-list', loadChildren: './chamados/chamados-list/chamados-list.module#ChamadosListPageModule' },
  { path: 'chamados-detail/:idChamado', loadChildren: './chamados/chamados-detail/chamados-detail.module#ChamadosDetailPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
