import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-entrenador',
  templateUrl: './perfil-entrenador.component.html',
  styleUrls: ['./perfil-entrenador.component.css']
})
export class PerfilEntrenadorComponent implements OnInit {
  names:string;
  constructor() { }

  ngOnInit(): void {
    this.names=localStorage.getItem('names');
  }

}
