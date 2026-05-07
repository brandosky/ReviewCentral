import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
    //se lee el usuario que esta activdado
  const usuario = authService.currentUser();

  // permite solo al admin
  if (usuario && usuario.rol === 'administrador') {
    return true; 
  } 
  else {
    router.navigate(['/inicio']); 
    return false;
  }
};