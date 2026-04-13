import { Injectable,signal } from '@angular/core';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  currentUser = signal<Usuario | null>(null);

  login(email:string):void{
    // TODO: Escribir la lógica de inicio de sesión real aquí.
  }

logout():void{
  this.currentUser.set(null);
}
}
