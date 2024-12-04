import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'autenticacao', loadComponent: () => import('./autenticacao/autenticacao.page').then(m => m.AutenticacaoPage) },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./pet-detail/pet-detail.page').then(m => m.PetDetailPage),
    canActivate: [AuthGuard],
  },
  
  
  {
    path: 'divulgar',
    loadComponent: () => import('./divulgar-pet/divulgar-pet.page').then(m => m.DivulgarPetPage),
    canActivate: [AuthGuard]
  },

  {
    path: 'minhas-divulgacoes',
    loadComponent: () => import('./minhas-divulgacoes/minhas-divulgacoes.page').then(m => m.MinhasDivulgacoesPage),  // Alterado de loadChildren para loadComponent
  },
  { 
    path: 'editar-divulgacao/:id', 
    loadComponent: () => import('./editar-divulgacao/editar-divulgacao.page').then(m => m.EditarDivulgacaoPage),
  },
  {
    path: 'divulgar-pet',
    loadComponent: () => import('./divulgar-pet/divulgar-pet.page').then( m => m.DivulgarPetPage),
  }

];
