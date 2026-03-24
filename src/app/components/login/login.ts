import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule], 
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  formularioLogin!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    if (this.formularioLogin.valid) {
      const credenciales = this.formularioLogin.value;
      console.log('Credenciales listas para enviar:', credenciales);
      alert('¡datos validos!');
    } else {
      this.formularioLogin.markAllAsTouched();
    }
  }
}