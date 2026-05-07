import { Component, inject } from '@angular/core';
import { RouterLink,Router } from '@angular/router'; 
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authService = inject(Auth);
  router = inject(Router);

  cerrarSesion(event?: Event) {
    if (event) {
      event.preventDefault(); // Evita que la página intente recargarse u oculte la ruta
    }
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }
}