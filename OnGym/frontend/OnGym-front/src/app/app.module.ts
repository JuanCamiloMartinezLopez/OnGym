import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroEntrenadorComponent } from './components/registro-entrenador/registro-entrenador.component';
import { RegistroAtletaComponent } from './components/registro-atleta/registro-atleta.component';
import { RutinaComponent } from './components/rutina/rutina.component';
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import {MatButtonModule} from '@angular/material/button';
import { PerfilAtletaComponent } from './components/perfil-atleta/perfil-atleta.component';
import { PerfilEntrenadorComponent } from './components/perfil-entrenador/perfil-entrenador.component';
import { MirarAtletasComponent } from './components/mirar-atletas/mirar-atletas.component';
import {MatSelectModule} from '@angular/material/select';
import {AuthGuard} from './services/auth.guard';
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { FormRutineComponent } from './components/form-rutine/form-rutine.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroEntrenadorComponent,
    RegistroAtletaComponent,
    RutinaComponent,
    EjercicioComponent,
    HomeComponent,
    PerfilAtletaComponent,
    PerfilEntrenadorComponent,
    MirarAtletasComponent,
    FormRutineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
