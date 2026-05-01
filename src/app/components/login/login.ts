import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule], 
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  formularioLogin!: FormGroup;
  private router=inject(Router);
  private auth=inject(Auth);
  private fb=inject(FormBuilder);


  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    if (this.formularioLogin.valid) {
      this.auth.login(this.formularioLogin.value).subscribe({
        next:(res:any)=>{
          this.router.navigate(['/']);
        },
        error:(err:any)=>{
          alert(err.error.msg||'Hubo un error al iniciar sesion');
        }
      });
    } else {
      this.formularioLogin.markAllAsTouched();
    }
  }

  }
