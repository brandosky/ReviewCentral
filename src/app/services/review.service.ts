import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  // Asegúrate de que el puerto sea el de tu backend (8084)
  private apiUrl = 'http://localhost:8084/api/reviews'; 

  //trae reseñas de un juego
  getReviewsPorJuego(juegoId: string) {
    return this.http.get(`${this.apiUrl}/${juegoId}`);
  }

  // maanda una reseña nueva
  agregarReview(juegoId: string, comentario: string, calificacion: number, usuarioNombre?: string) {
    // saca el token de la memoria
    const token = localStorage.getItem('token') || ''; 
    const headers = new HttpHeaders().set('x-token', token);

    const body = { juegoId, comentario, calificacion, usuarioNombre };

    return this.http.post(this.apiUrl, body, { headers });
  }

  // obtiene todas las reseñas de la base de datos
  obtenerTodasLasResenas() {
    // saca el token de la memoria
    const token = localStorage.getItem('Token') || localStorage.getItem('token') || ''; 
    const headers = new HttpHeaders().set('x-token', token);
    return this.http.get(`${this.apiUrl}/all`, { headers });
  }

  // elimina una reseña por su id
  eliminarResena(id: string) {
    // saca el token de la memoria
    const token = localStorage.getItem('Token') || localStorage.getItem('token') || ''; 
    const headers = new HttpHeaders().set('x-token', token);

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}