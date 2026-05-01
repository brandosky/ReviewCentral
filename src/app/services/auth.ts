import { Injectable,inject,signal } from '@angular/core';
import { Usuario } from '../models/user.model';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http=inject(HttpClient);
  private apiUrl='https://localhost:8084/api/users';

  currentUser = signal<any>(this.ObtenerUsuarioGuarado());
//al iniciar la aplicaicon ver si ya habia un usuario guardado 
ObtenerUsuarioGuarado(){
  const userStr=localStorage.getItem('User');
  return userStr ? JSON.parse(userStr) : null;
}
//modifica login y guarda token ,datos
  login(credenciales:any){
    return this.http.post(`${this.apiUrl}/login`,credenciales).pipe(
      tap((respuesta:any)=>{
        localStorage.setItem('User',JSON.stringify(respuesta.user));
        localStorage.setItem('Token',respuesta.token);
          this.currentUser.set(respuesta.user);
   
    
  
  this.currentUser.set(respuesta.user);
      })
    );
  }
 

logout():void{
localStorage.removeItem('User');
localStorage.removeItem('Token');
  this.currentUser.set(null);
}
registro(usuario: any) {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }
}
