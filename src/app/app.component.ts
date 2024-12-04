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
}
