import { Routes } from '@angular/router';
import {Inicio} from './components/inicio/inicio';
import {Login} from './components/login/login';
import {Registro} from './components/registro/registro';
import {PanelAdmin} from './components/panel-admin/panel-admin';
import { Catalogo } from './components/catalogo/catalogo';
export const routes: Routes = [
{path: '', component: Inicio, pathMatch: 'full'},
{path: 'login', component: Login},
{path: 'registro', component: Registro},
{path: 'panel-admin', component: PanelAdmin},
{path: 'catalogo', component: Catalogo},
{path: '**', redirectTo: ''}
];
