import { Injectable,signal } from '@angular/core';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  currentUser = signal<Usuario | null>(null);

  login(email:string):void{

  };

  this.currentUser.set();

logout():void{
  this.currentUser.set(null);
}
}


