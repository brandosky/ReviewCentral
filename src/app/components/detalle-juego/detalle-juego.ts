import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/game';
import { ReviewService } from '../../services/review.service'; 
import { Game } from '../../models/game.model';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-detalle-juego',
  imports: [CommonModule, RouterLink, ReactiveFormsModule], 
  templateUrl: './detalle-juego.html',
  styleUrl: './detalle-juego.css',
})
export class DetalleJuego implements OnInit {
  juegoSeleccionado: Game | undefined;
  juegoId: string = '';

  formularioReview!: FormGroup;
  listaResenas: any[] = [];
  promedioGlobal: number = 0;
  private route=inject(ActivatedRoute);
  private gameService=inject(GameService);
  private reviewService=inject(ReviewService);
  private fb=inject(FormBuilder);
  private authService=inject(Auth);
  esFavorito: boolean = false;

  ngOnInit(): void {
    this.juegoId = this.route.snapshot.paramMap.get('id') || '';
    
    if (this.juegoId) {
      this.juegoSeleccionado = this.gameService.getGameById(this.juegoId);
    }

    this.formularioReview = this.fb.group({
      comentario: ['', Validators.required],
      calificacion: [10, [Validators.required, Validators.min(0), Validators.max(10)]]
    });

    this.cargarResenas();
  }

  cargarResenas() {
    this.reviewService.getReviewsPorJuego(this.juegoId).subscribe({
      next: (res: any) => {
        this.listaResenas = res;
      },
      error: (err) => console.log('Error al cargar reseñas:', err)
    });
  }

  enviarReview() {
    if (this.formularioReview.invalid) return;

    // 1. Obtenemos al usuario que tiene la sesión iniciada
    const usuarioLogueado = this.authService.currentUser();
    
    if (!usuarioLogueado) {
      alert("¡Debes iniciar sesión para publicar una reseña!");
      return;
    }

    if (this.juegoSeleccionado) {
      // 
      const reviewData = {
        juegoId: this.juegoSeleccionado.id_nombre, // O como llames a tu ID
        comentario: this.formularioReview.value.comentario,
        calificacion: this.formularioReview.value.calificacion,
        usuarioNombre: usuarioLogueado.nombre 
      };

      // lo manda al backend
      this.reviewService.agregarReview(reviewData.juegoId, reviewData.comentario, reviewData.calificacion, reviewData.usuarioNombre).subscribe({
        next: (respuesta: any) => {
          alert('¡Reseña publicada con éxito!');
          this.formularioReview.reset();
          // Volvemos a cargar las reseñas para que aparezca inmediatamente
          this.cargarResenas(); 
        },
        error: (err: any) => console.error('Error al enviar reseña', err)
      });
    }
  }

  calcularPromedio() {
    if (this.listaResenas.length === 0) {
      this.promedioGlobal = 0;
      return;
    }
    let suma = 0;
    for (let resena of this.listaResenas) {
      suma += resena.calificacion; 
    }
    this.promedioGlobal = suma / this.listaResenas.length;
  }
cambiarFavorito() {
    const usuarioLogueado = this.authService.currentUser();
    
    if (!usuarioLogueado) {
      alert("¡Debes iniciar sesión para guardar en favoritos!");
      return;
    }

    if (this.juegoSeleccionado) {
      // ccambia el color del boton 
      this.esFavorito = !this.esFavorito; 
      
      // le avisa a Node.js
      this.authService.toogleFavorito(usuarioLogueado._id, this.juegoSeleccionado.id_nombre).subscribe({
        error: (err: any) => {
          console.error('Error al guardar favorito', err);
          this.esFavorito = !this.esFavorito; // Si falla, regresamos el botón a la normalidad
        }
      });
    }
  }
  
}