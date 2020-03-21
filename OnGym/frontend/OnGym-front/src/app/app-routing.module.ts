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

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ejercicio',
    component: EjercicioComponent
  },
  {
    path: 'perfil-atleta',
    component: PerfilAtletaComponent
  },
  {
    path: 'perfil-entrenador',
    component: PerfilEntrenadorComponent
  },
  {
    path: 'mirar-atletas',
    component: MirarAtletasComponent
  },
  {
    path: 'registro-atleta',
    component: RegistroAtletaComponent
  },
  {
    path: 'registro-entrenador',
    component: RegistroEntrenadorComponent
  },
  {
    path: 'rutina',
    component: RutinaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
