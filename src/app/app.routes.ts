import { Routes } from '@angular/router';
import {Inicio} from './components/inicio/inicio';
import {Login} from './components/login/login';
import {Registro} from './components/registro/registro';
import {PanelAdmin} from './components/panel-admin/panel-admin';
import { Catalogo } from './components/catalogo/catalogo';
import { DetalleJuego } from './components/detalle-juego/detalle-juego';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: Inicio },
    { path: 'catalogo', component: Catalogo },
    { path: 'login', component: Login },
    { path: 'registro', component: Registro },
    { path: 'juego/:id', component: DetalleJuego },
    { path: 'panel-admin', component: PanelAdmin,canActivate:[adminGuard] },
    // alguien escribe una ruta que no existe, lo manda al inicio
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' } 
];