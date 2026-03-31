import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
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
      const emailIngresado=this.formularioLogin.value.email;

      this.auth.login(emailIngresado);

      this.router.navigate(['/home']);
    } else {
      this.formularioLogin.markAllAsTouched();
    }
  }
}