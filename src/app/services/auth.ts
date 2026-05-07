import { Injectable,inject,signal } from '@angular/core';
import { Usuario } from '../models/user.model';
import { tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http=inject(HttpClient);
  private router=inject(Router);
  private apiUrl='http://localhost:8084/api/users';

  currentUser = signal<any>(this.ObtenerUsuarioGuarado());
//al iniciar la aplicaicon ver si ya habia un usuario guardado 
ObtenerUsuarioGuarado(){
  const userStr=localStorage.getItem('User');

  if(!userStr||userStr==='undefined'){
    return null;
  }

  try{
    return JSON.parse(userStr);
  }catch(error){
    console.error('Error al parsear el usuario guardado:', error);
    localStorage.removeItem('User');
    return null;
  }
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
  this.router.navigate(['/inicio']);
}
registro(usuario: any) {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  obtenerTodosUsuarios() {
    const token = localStorage.getItem('Token') || '';
    const headers = new HttpHeaders().set('x-token', token);
    return this.http.get(`${this.apiUrl}/usuarios`, { headers });  
}

  eliminarUsuario(id: string) {
    const token = localStorage.getItem('Token') || '';
    const headers = new HttpHeaders().set('x-token', token);
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`, { headers });
  }

  toogleFavorito(idUsuario: string, idJuego: string) {
    return this.http.post(`${this.apiUrl}/favoritos`, { idUsuario, idJuego });
  }
}
