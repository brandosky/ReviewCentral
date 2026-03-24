import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink], 
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  // Mas adelante esto va estar en mongo jeje 
  juegos = [
    {
        id: "cyberpunk-2077", 
        nombre: "Cyberpunk 2077",
        genero: "RPG de Acción",
        plataforma: "PC, PS5, Xbox Series X",
        portada: "assets/cyberpunk.jpg",
        descripcion: "Un RPG de acción y aventura de mundo abierto" ,
    },
    {
        id: "elden-ring",
        nombre: "Elden Ring",
        genero: "Action RPG",
        plataforma: "PC, PS5, Xbox Series X",
        portada: "assets/Eldenring.jpg",
        descripcion: "Un vasto mundo de fantasía oscura"
    },
    {
        id: "zelda-botw",
        nombre: "The Legend of Zelda: BOTW",
        genero: "Aventura",
        plataforma: "Nintendo Switch",
        portada: "assets/botw.jpg",
        descripcion: "Explora el vasto reino de Hyrule en esta aventura épica"
    },
    {
        id: "rdr2",
        nombre: "Red Dead Redemption 2",
        genero: "Acción-Aventura",
        plataforma: "PC, PS4, Xbox One",
        portada: "assets/rdr2.png",
        descripcion: "América, 1899. El fin de la era del salvaje oeste..."
    }
  ];
}