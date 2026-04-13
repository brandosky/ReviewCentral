import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game'; 

@Component({
  selector: 'app-panel-admin',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})
export class PanelAdmin implements OnInit {
  formularioJuego!: FormGroup;
  
  private fb = inject(FormBuilder);
  private gameService = inject(GameService);

  ngOnInit(): void {
    this.formularioJuego = this.fb.group({
      id_nombre: ['', Validators.required],
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      plataforma: ['', Validators.required],
      portada: ['assets/placeholder.jpg', Validators.required], // Valor por defecto
      descripcion: ['', Validators.required]
    });
  }

  guardarJuego(): void {
    if (this.formularioJuego.valid) {
      // Llamamos al servicio para enviar el POST a Node.js
      this.gameService.agregarJuego(this.formularioJuego.value).subscribe({
        next: (respuesta: any) => {
          alert(respuesta.msg); // Mostramos el mensaje de éxito del Backend
          this.formularioJuego.reset(); // Vaciamos el formulario
          this.gameService.cargarJuegos(); // Recargamos los juegos para ver el nuevo en el catálogo
        },
        error: (err: any) => {
          alert('Error al guardar: Revisa que el ID (URL) no esté repetido en la base de datos.');
        }
      });
    } else {
      this.formularioJuego.markAllAsTouched();
    }
  }
}