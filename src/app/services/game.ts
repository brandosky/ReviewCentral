import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);
  
  private apiUrl = 'http://localhost:8084/api/games';

  // Signal vacío al inicio
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

  // Nueva función para guardar un juego nuevo en Mongo (Petición POST)
  agregarJuego(nuevoJuego: Game) {
    return this.http.post<{msg: string, juego: Game}>(this.apiUrl, nuevoJuego);
  }
}