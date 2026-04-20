import { Component ,OnInit,inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { Router,RouterLink } from '@angular/router';
@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro implements OnInit {
formularioRegistro!: FormGroup;
private fb=inject(FormBuilder);
private auth=inject(Auth);
private router=inject(Router);


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
      this.auth.registrar(this.formularioRegistro.value).subscribe({
        next:(res)=>{
          alert('Su cuenta se ha creado con exito.Ahora puedes iniciar sesion.');
         this.router.navigate(['/login']);
        },
        error:(err)=>{
          alert(err.error.msg||'Hubo un error al registrarse');
        }
      });
    }else{
      this.formularioRegistro.markAllAsTouched();
    }
      // se extrae el JSON con los datos listos para enviarlos a node.js
  
  }

}
