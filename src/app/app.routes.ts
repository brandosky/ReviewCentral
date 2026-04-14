import { Routes } from '@angular/router';
import {Inicio} from './components/inicio/inicio';
import {Login} from './components/login/login';
import {Registro} from './components/registro/registro';
import {PanelAdmin} from './components/panel-admin/panel-admin';
import { Catalogo } from './components/catalogo/catalogo';

export const routes: Routes = [
    // Ruta base: Cuando entras a localhost:4200, te redirige a 'inicio'
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: Inicio },
    { path: 'catalogo', component: Catalogo },
    { path: 'login', component: Login },
    { path: 'registro', component: Registro },
    //{ path: 'juego/:id', component: DetalleJuego },
    { path: 'panel-admin', component: PanelAdmin },
    // Si alguien escribe una ruta que no existe, lo mandamos al inicio
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' } 
];