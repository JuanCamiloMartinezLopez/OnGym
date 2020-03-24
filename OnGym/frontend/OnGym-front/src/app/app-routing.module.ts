import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes
import {EjercicioComponent} from "./components/ejercicio/ejercicio.component"
import {LoginComponent} from "./components/login/login.component"
import {RegistroAtletaComponent} from "./components/registro-atleta/registro-atleta.component"
import {RegistroEntrenadorComponent} from "./components/registro-entrenador/registro-entrenador.component"
import {MirarAtletasComponent} from "./components/mirar-atletas/mirar-atletas.component"
import {PerfilAtletaComponent} from "./components/perfil-atleta/perfil-atleta.component"
import {PerfilEntrenadorComponent} from "./components/perfil-entrenador/perfil-entrenador.component"
import {RutinaComponent} from "./components/rutina/rutina.component"
import { HomeComponent } from "./components/home/home.component"
import {AuthGuard} from './services/auth.guard';
import { FormRutineComponent } from './components/form-rutine/form-rutine.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'login/:type',
    component: LoginComponent
  },
  {
    path: 'perfil/entrenador/ejercicios',
    component: EjercicioComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'perfil/deportista',
    component: PerfilAtletaComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'perfil/entrenador',
    component: PerfilEntrenadorComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'perfil/entrenador/deportistas',
    component: MirarAtletasComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'perfil/entrenador/rutinas',
    component: RutinaComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'registro/deportista',
    component: RegistroAtletaComponent
  },
  {
    path: 'registro/entrenador',
    component: RegistroEntrenadorComponent
  },
  {
    path:'perfil/entrenador/crearRutina',
    component:FormRutineComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
