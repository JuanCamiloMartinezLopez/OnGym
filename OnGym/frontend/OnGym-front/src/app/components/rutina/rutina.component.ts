import { Component, OnInit } from '@angular/core';

interface Ejercicio {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.css']
})
export class RutinaComponent implements OnInit {
  selectedValue: string;
  constructor() { }

  ngOnInit(): void {
  }
  
  ejercicios: Ejercicio[] = [
    {value:"hola-1", viewValue:'Aqui ponga los hptas Ejercicios :v'}
  ];
}
