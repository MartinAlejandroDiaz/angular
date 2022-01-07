import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['tino', [ Validators.required, Validators.minLength(2)]],
    email: ['tino@gmail.com', [ Validators.required, Validators.minLength(2), Validators.email]],
    password: ['123456', [ Validators.required, Validators.minLength(2)]],
    password2: ['123456', [ Validators.required, Validators.minLength(2)]],
    terminos: [false, [ Validators.required ]],
  },{
    validators: this.passwordsIguales('password','password2')
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService ) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe( resp => {
          console.log('usuario creado');
          console.log(resp);
          this.router.navigateByUrl('/dashboard');
        }, ( err )=> {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  campoNoValido( campo: string ): boolean {
    return this.registerForm.get(campo).invalid && this.formSubmitted;
  }

  aceptaTerminos():boolean {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contraseniasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    return pass1 !== pass2 && this.formSubmitted;
  }

  passwordsIguales(pass: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass);
      const pass2Control = formGroup.get(pass2);
      if ( pass1Control.value === pass2Control.value ) {
        pass1Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true})
      }
    }
  }
}
