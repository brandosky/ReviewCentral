import { Component, OnInit } from '@angular/core';
// ActivatedRoute permite leer variables de la url como el id del juego
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-juego',
  imports: [CommonModule, RouterLink], // CommonModule es para poder usar *ngIf y *ngFor
  templateUrl: './detalle-juego.html',
  styleUrl: './detalle-juego.css',
})
export class DetalleJuego implements OnInit {
  juegoSeleccionado: any;

  //estos datos son simulados
  juegos = [
    { id: "cyberpunk-2077", nombre: "Cyberpunk 2077", genero: "RPG de Acción", plataforma: "PC, PS5, Xbox Series X", portada: "assets/cyberpunk.jpg", descripcion: "Un RPG de acción y aventura de mundo abierto." },
    { id: "elden-ring", nombre: "Elden Ring", genero: "Action RPG", plataforma: "PC, PS5, Xbox Series X", portada: "assets/Eldenring.jpg", descripcion: "Un vasto mundo de fantasía oscura." },
    { id: "zelda-botw", nombre: "The Legend of Zelda: BOTW", genero: "Aventura", plataforma: "Nintendo Switch", portada: "assets/botw.jpg", descripcion: "Explora el vasto reino de Hyrule en esta aventura épica." },
    { id: "rdr2", nombre: "Red Dead Redemption 2", genero: "Acción-Aventura", plataforma: "PC, PS4, Xbox One", portada: "assets/rdr2.png", descripcion: "América, 1899. El fin de la era del salvaje oeste..." }
  ];

  // reseñas simuladas
  resenas = [
    { usuario: 'Carlos M.', fecha: '23 Mar, 2026', texto: 'Increíble historia, gráficos de otra generación.' },
    { usuario: 'Ana G.', fecha: '20 Mar, 2026', texto: 'Tiene algunos bugs, pero es muy divertido.' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // cuando se carga la pantalla se lee el id de la url
    const idJuegoUrl = this.route.snapshot.paramMap.get('id');
    
    // se busca en el arreglo el juego que coincida con ese id
    this.juegoSeleccionado = this.juegos.find(j => j.id === idJuegoUrl);
  }
}