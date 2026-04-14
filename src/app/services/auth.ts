import { Injectable,signal } from '@angular/core';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  currentUser = signal<Usuario | null>(null);

  login(email:string):void{
    const esAdmin=email==='admin@admin.com';
      const usuarioSimulado:Usuario={
    nombre:esAdmin?'Admin':'Brandon',
    apellido:esAdmin?'Admin':'Rodriguez',
    email:email,
    rol:esAdmin?'administrador':'registrado'
  };
  this.currentUser.set(usuarioSimulado);
  }


logout():void{
  this.currentUser.set(null);
}
}
