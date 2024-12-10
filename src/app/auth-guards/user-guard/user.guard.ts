import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

// O decorator @Injectable com providedIn: 'root' faz com que este serviço seja um singleton e esteja disponível em toda a aplicação.
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }

}


/**
 * Vale ressaltar que guards (ou guardiões) são interfaces que permitem proteger ou restringir o acesso a rotas específicas da aplicação. Eles 
 * são usados no contexto do Router para determinar se uma determinada rota pode ou não ser ativada, desativada, carregada ou acessada em 
 * determinadas condições. 
 * O angular fornece quatro tipos de Guards, no caso, eu optei pelo "CanActivate" que verifica se uma rota pode ser ativada. Útil para verificar 
 * autenticação ou autorização antes de carregar um componente.
*/