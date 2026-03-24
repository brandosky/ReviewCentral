import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game'; 

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
//con esto se inyecta el servicio jeje
  private gameService = inject(GameService);
  
  // se lee el signal 
  juegos = this.gameService.games;
}