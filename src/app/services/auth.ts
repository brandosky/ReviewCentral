import { Injectable,inject,signal } from '@angular/core';
import { Usuario } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http=inject(HttpClient);
  private apiUrl='https://localhost:8080/api/users';

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


  registrar(datos:any){
    return this.http.post(`${this.apiUrl}/registro`,datos);

  }

  log(credenciales:any){
    return this.http.post<{msg:string,user:Usuario}>(`${this.apiUrl}/login`,credenciales)
    .pipe(
      tap(respuesta=>{
        this.currentUser.set(respuesta.user);
      })
    );
  }

logout():void{
  this.currentUser.set(null);
}
}
