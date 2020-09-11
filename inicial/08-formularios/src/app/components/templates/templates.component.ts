import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red; 
    }
  `]
})
export class TemplatesComponent implements OnInit {

  usuario:Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: "",
    sexo: null,
    acepta: false
  }

  paises= [{
    codigo: "AR",
    nombre: "Argentina"
  },
  {
    codigo: "ESP",
    nombre: "España"
  }]

  sexos:String[] = ["Hombre", "Mujer", "Sin definir"]
  constructor() { }

  ngOnInit() {
  }

  guardar(forma:NgForm){
    console.log("Formulario Posteado");
    console.log("ngForm: ",forma);
    console.log("valor forma:",forma.value);
    console.log("Usuario:", this.usuario);
  }
}
