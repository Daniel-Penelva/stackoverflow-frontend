import { Component } from '@angular/core';
import { StorageService } from './auth-services/storage-service/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'stackoverflow-frontend';

  isUserLoggedIn!: boolean;

  showWelcomeImage: boolean = true;   // Variável para controlar a exibição da imagem

  constructor(
    private router: Router, 
    private storage: StorageService,
    private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.updateUserLoggedInStatus();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateUserLoggedInStatus();
      }
      if(event instanceof NavigationEnd) {
        this.showWelcomeImage = event.url === '/';
      }
    });
  }

  updateUserLoggedInStatus(): void {
    this.isUserLoggedIn = this.storage.isUserLoggedIn();
  }

  logout() {
    this.storage.logout();
    this.snackbar.open('Você foi deslogado com sucesso.', 'Fechar', { duration: 3000 });
    this.router.navigateByUrl("/login");
  }

  // Força a recarga da rota /user/dashboard
  refreshDashboard() {
    
    if (this.router.url === '/user/dashboard') {  // Verifica se já está na rota desejada
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {  // Navega para uma rota "temporária", sem alterar o histórico do navegador
        this.router.navigate(['/user/dashboard']);  // Depois volta para a rota original (/user/dashboard), forçando a recarga do componente
      });
    }
  }
}
