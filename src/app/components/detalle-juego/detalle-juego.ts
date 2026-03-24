import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-detalle-juego',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-juego.html',
  styleUrl: './detalle-juego.css',
})
export class DetalleJuego implements OnInit {
  juegoSeleccionado: Game | undefined;
  
  // Reseñas 
  resenas = [
    { usuario: 'Carlos M.', fecha: '23 Mar, 2026', texto: 'Increíble historia, gráficos de otra generación.' },
    { usuario: 'Ana G.', fecha: '20 Mar, 2026', texto: 'Tiene algunos bugs, pero es muy divertido.' }
  ];

  // aqui se inyecta las gerramientas
  private route = inject(ActivatedRoute);
  private gameService = inject(GameService);

  ngOnInit(): void {
    const idUrl = this.route.snapshot.paramMap.get('id');
    
    // Si hay un id en la url el servicio dara el juego
    if (idUrl) {
      this.juegoSeleccionado = this.gameService.getGameById(idUrl);
    }
  }
}