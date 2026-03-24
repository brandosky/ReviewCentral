import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro implements OnInit {
formularioRegistro!: FormGroup;
//el constructor inyecta FormBuilder que es un servicio de angular para armar formularios
constructor(private fb: FormBuilder) {}

ngOnInit(): void {
    // se crean las reglas del formulario
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  enviarRegistro(): void {
    if (this.formularioRegistro.valid) {
      // se extrae el JSON con los datos listos para enviarlos a node.js
      const datosUsuario = this.formularioRegistro.value;
      console.log('JSON listo para enviar:', datosUsuario);
      alert('Mira la consola.');
    } else {
      this.formularioRegistro.markAllAsTouched();
      alert('Faltan datos por llenar.');
    }
  }

}
