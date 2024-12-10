import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../../auth-services/storage-service/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// O decorator @Injectable com providedIn: 'root' faz com que este serviço seja um singleton e esteja disponível em toda a aplicação.
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService, private snackBar: MatSnackBar) {}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.storageService.hasToken()) {
      this.storageService.signOut();
      this.router.navigateByUrl("/login");
      this.snackBar.open('Você não está logado, faça login primeiro', 'Fechar', { duration: 5000 });
      return false;
    }
    return true;
  }

}


/**
 * Vale ressaltar que guards (ou guardiões) são interfaces que permitem proteger ou restringir o acesso a rotas específicas da aplicação. Eles 
 * são usados no contexto do Router para determinar se uma determinada rota pode ou não ser ativada, desativada, carregada ou acessada em 
 * determinadas condições. 
 * O angular fornece quatro tipos de Guards, no caso, eu optei pelo "CanActivate" que verifica se uma rota pode ser ativada. Útil para verificar 
 * autenticação ou autorização antes de carregar um componente.
*/

/**
 * Principais Diferenças:
 *    GUARD         VERIFICAÇÃO                                AÇÃO NO CASO POSITIVO                AÇÃO NO CASO NEGATIVO
 * NoAuthGuard    Usuário tem token (hasToken()).          Redireciona para /user/dashboard.         Permite acesso à rota.
 * UserGuard      Usuário não tem token (!hasToken()).     Redireciona para /login e exibe msg.      Permite acesso à rota.
 *  
*/