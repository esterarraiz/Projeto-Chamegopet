import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // Aguarda a inicialização do serviço de autenticação
    await this.authService.initPromise;

    // Verifica se o usuário está autenticado
    const isAuthenticated = await this.authService.isLoggedIn();  // Agora, aguarda a promessa da verificação

    console.log('Verificação no AuthGuard, autenticado:', isAuthenticated);

    if (isAuthenticated) {
      return true;
    } else {
      console.log('Usuário não autenticado, redirecionando para login.');
      this.router.navigate(['/autenticacao']);
      return false;
    }
  }
}
