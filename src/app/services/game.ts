import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrlReviews = 'http://localhost:8084/api/reviews';

  private apiUrl = 'http://localhost:8084/api/games';

  // Signal vacio al inicio
  private _games = signal<Game[]>([]);
  public games = this._games.asReadonly();

  constructor() {
    this.cargarJuegos();
  }

  // Petición GET al backend
  cargarJuegos(): void {
    this.http.get<Game[]>(this.apiUrl).subscribe({
      next: (juegosDeMongo) => {
        this._games.set(juegosDeMongo);
      },
      error: (err) => console.error('Error conectando al backend', err)
    });
  }

  getGameById(id: string): Game | undefined {
    return this._games().find(juego => juego.id_nombre === id);
  }

  // para guardar un juego nuevo en Mongo (Petición POST)
  agregarJuego(nuevoJuego: Game) {
    const token = localStorage.getItem('Token') || ''; 
    const headers = new HttpHeaders().set('x-token', token);
    return this.http.post<{msg: string, juego: Game}>(this.apiUrl, nuevoJuego, { headers });
  }
  obtenerTodasLasResenas() {
    const token = localStorage.getItem('Token') || ''; 
    const headers = new HttpHeaders().set('x-token', token);
    return this.http.get(`${this.apiUrlReviews}/all`, { headers });
  }
  eliminarResena(id: string) {
    const token = localStorage.getItem('Token') || ''; 
    const headers = new HttpHeaders().set('x-token', token);
    return this.http.delete(`${this.apiUrlReviews}/${id}`, { headers });
  }
  eliminarJuego(id: string) {
    const token = localStorage.getItem('Token') || ''; 
    const headers = new HttpHeaders().set('x-token', token);
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
  actualizarJuego(id: string, juegoActualizado: Game) {
    const token = localStorage.getItem('Token') || ''; 
    const headers = new HttpHeaders().set('x-token', token);
    return this.http.put(`${this.apiUrl}/${id}`, juegoActualizado, { headers });
  }
}