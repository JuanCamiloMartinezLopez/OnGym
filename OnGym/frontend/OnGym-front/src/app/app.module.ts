import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroEntrenadorComponent } from './components/registro-entrenador/registro-entrenador.component';
import { RegistroAtletaComponent } from './components/registro-atleta/registro-atleta.component';
import { PorfileComponent } from './components/porfile/porfile.component';
import { RutinaComponent } from './components/rutina/rutina.component';
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroEntrenadorComponent,
    RegistroAtletaComponent,
    PorfileComponent,
    RutinaComponent,
    EjercicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
