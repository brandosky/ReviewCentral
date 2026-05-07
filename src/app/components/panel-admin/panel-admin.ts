import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game'; 
import { Auth } from '../../services/auth';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-panel-admin',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})
export class PanelAdmin implements OnInit {
  formularioJuego!: FormGroup;
  seccionActiva: string = 'juegos';
  listaUsuarios: any[] = [];
  listaResenasGlobales: any[] = [];
  modoEdicion: boolean = false;
  idJuegoEditando: string = '';
  private fb = inject(FormBuilder);
  public gameService = inject(GameService);
  private authService = inject(Auth);
  private reviewService = inject(ReviewService);


  ngOnInit(): void {
    this.formularioJuego = this.fb.group({
      id_nombre: [{value:'',disabled:true}],
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      plataforma: ['', Validators.required],
      portada: [], // Valor por defecto
      descripcion: ['', Validators.required]
    });
    this.cargarResenas();
    this.cargarUsuarios();
    this.formularioJuego.get('nombre')?.valueChanges.subscribe(nombreEscrito => {
      if (nombreEscrito) {
        const idGenerado = nombreEscrito
          .toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "") //quita acentos
          .replace(/\s+/g, '-') //cambia espacios por guiones
          .replace(/[^\w\-]+/g, ''); // quita simbolos raros

        this.formularioJuego.get('id_nombre')?.setValue(idGenerado, { emitEvent: false });
      } else {
        // si el usuario borra el nombre, también limpiamos el ID
        this.formularioJuego.get('id_nombre')?.setValue('', { emitEvent: false });
      }
    });
  }


subirImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // guarda la imagen convertida a texto
        this.formularioJuego.patchValue({ portada: reader.result });
      };
      reader.readAsDataURL(file); // Activa la conversión
    }
  }

  cargarUsuarios() {
      this.authService.obtenerTodosUsuarios().subscribe({
      next: (respuesta: any) => {
       this.listaUsuarios = respuesta.usuarios || respuesta; 
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }
  

  borrarUsuario(id: string, nombre: string) {
    // Preguntamos para no borrar por accidente
    if(confirm(`¿Estás súper seguro de que quieres eliminar al usuario ${nombre}?`)) {
      this.authService.eliminarUsuario(id).subscribe({
        next: () => {
          alert(`¡El usuario ${nombre} ha sido eliminado del sistema!`);
          this.cargarUsuarios(); // Recargamos la tabla para que desaparezca
        },
        error: (err) => {
          console.error(err);
          alert('Hubo un error al intentar eliminar al usuario.');
        }
      });
    }
  }
 guardarJuego(): void {
    if (this.formularioJuego.valid) {
      const datosJuego=this.formularioJuego.getRawValue(); 
      datosJuego.id_nombre = datosJuego.nombre.toLowerCase().replace(/\s+/g, '-');

      if (this.modoEdicion) {
        this.gameService.actualizarJuego(this.idJuegoEditando, this.formularioJuego.getRawValue()).subscribe({
          next: (respuesta: any) => {
            alert('¡Juego actualizado correctamente!');
            this.cancelarEdicion(); 
            this.gameService.cargarJuegos(); 
          },
          error: (err: any) => {
            console.error(err);
            alert('Error al actualizar el juego.');
          }
        });
      } 
      else {
        this.gameService.agregarJuego(this.formularioJuego.getRawValue()).subscribe({
          next: (respuesta: any) => {
            alert(respuesta.msg); 
            this.formularioJuego.reset({ portada: 'assets/placeholder.jpg' }); 
            this.gameService.cargarJuegos(); 
          },
          error: (err: any) => {
            alert('Error al guardar: Revisa que el ID (URL) no esté repetido en la base de datos.');
          }
        });
      }

    } else {
      this.formularioJuego.markAllAsTouched();
    }
  }

borrarJuego(id: string, nombre: string) {
    if(confirm(`¿Estás seguro de que quieres eliminar ${nombre} para siempre?`)) {
      this.gameService.eliminarJuego(id).subscribe({
        next: () => {
          alert('Juego eliminado');
          this.gameService.cargarJuegos(); 
        },
        error: (err) => console.error('Error al borrar', err)
      });
    }
  }


cargarResenas() {
    this.reviewService.obtenerTodasLasResenas().subscribe({
      next: (resenasMongo: any) => {
        this.listaResenasGlobales = resenasMongo;
      },
      error: (err: any) => console.error('Error al cargar todas las reseñas', err)
    });
  }

  borrarResena(id: string) {
    if(confirm('¿Estás seguro de que quieres eliminar este comentario para siempre?')) {
      this.reviewService.eliminarResena(id).subscribe({
        next: () => {
          alert('¡Comentario eliminado por spam/toxicidad!');
          this.cargarResenas(); 
        },
        error: (err: any) => {
          console.error(err);
          alert('Error al intentar borrar la reseña.');
        }
      });
    }
  }
  cargarJuegoParaEditar(juego: any) {
    this.modoEdicion = true;
    this.idJuegoEditando = juego._id; // usamos el _id de Mongo
    
    // rellena el formulario con los datos del juego
    this.formularioJuego.patchValue({
      id_nombre: juego.id_nombre,
      nombre: juego.nombre,
      genero: juego.genero,
      plataforma: juego.plataforma,
      portada: juego.portada,
      descripcion: juego.descripcion
    });
    
    // muestra la pantalla para el formulario
    window.scrollTo(0, 0); 
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.idJuegoEditando = '';
    this.formularioJuego.reset({ portada: 'assets/placeholder.jpg' });
  }
}