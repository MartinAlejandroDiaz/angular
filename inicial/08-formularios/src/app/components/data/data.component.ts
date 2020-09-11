import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent{

  forma:FormGroup;
  usuario:Object = {
    nombrecompleto: {
      nombre: "Martín",
      apellido: "Díaz"
    },
    email: "diazmartin_95@yahoo.com.ar",
    pasaTiempos: ["Correr","Dormir","Comer"]
  }

  constructor() {
    console.log(this.usuario);
    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('',   [Validators.required,
          Validators.minLength(3)]    ),
        'apellido': new FormControl('', [ 
                                          Validators.required,
                                          this.noHerrera
                                        ])
      }),
      'email': new FormControl('',    [Validators.required,
                                      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9._+-]+\.[a-z]{2,3}$")
                                     ]),
      'pasatiempos': new FormArray([
              new FormControl('Correr', Validators.required)
      ]),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    })
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ])
    //    this.forma.setValue( this.usuario );
   }

   guardarCambios(){
     console.log(this.forma.value);
     console.log(this.forma);
    //  this.forma.reset( {
    //       nombrecompleto:{
    //         nomre: "",
    //         apellido: ""
    //       },
    //       correo:""
    //     });



//      this.forma.controls['email'].setValue('Nuevocorreo@asdasd.com')
    }


    noHerrera( control: FormControl ): {[s:string]:boolean}{
      if (control.value === "herrera"){
        return {
          noherrera: true
        }
        return null;
      }

    }

    noIgual( control: FormControl ): {[s:string]:boolean}{
      let forma:any = this;
      if (control.value !== forma.controls['password1'].value){
        return {
          noherrera: true
        }
        return null;
      }

    }
    agregarPasatiempo(){
      (<FormArray>this.forma.controls['pasatiempos']).push(
        new FormControl('Dormir', Validators.required)
      )
    }

}
