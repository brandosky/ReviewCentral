import { Injectable, signal } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  private _games = signal<Game[]>([
    { id_nombre: "cyberpunk-2077", nombre: "Cyberpunk 2077", genero: "RPG de Acción", plataforma: "PC, PS5, Xbox Series X", portada: "assets/cyberpunk.jpg", descripcion: "Un RPG de acción y aventura de mundo abierto." },
    { id_nombre: "elden-ring", nombre: "Elden Ring", genero: "Action RPG", plataforma: "PC, PS5, Xbox Series X", portada: "assets/Eldenring.jpg", descripcion: "Un vasto mundo de fantasía oscura." },
    { id_nombre: "zelda-botw", nombre: "The Legend of Zelda: BOTW", genero: "Aventura", plataforma: "Nintendo Switch", portada: "assets/botw.jpg", descripcion: "Explora el vasto reino de Hyrule en esta aventura épica." },
    { id_nombre: "rdr2", nombre: "Red Dead Redemption 2", genero: "Acción-Aventura", plataforma: "PC, PS4, Xbox One", portada: "assets/rdr2.png", descripcion: "América, 1899. El fin de la era del salvaje oeste..." }
  ]);

  public games = this._games.asReadonly();

  getGameById(id: string): Game | undefined {
    return this._games().find(juego => juego.id_nombre === id);
  }
}