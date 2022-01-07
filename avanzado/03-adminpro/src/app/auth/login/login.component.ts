import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [ Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  })

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioServicie: UsuarioService,
               private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }
  
  login() {
    this.usuarioServicie.login( this.loginForm.value )
      .subscribe( resp => {
        console.log(resp);
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/dashboard');
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  // onSuccess(googleUser) {
  //   // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //   console.log(id_token);
  // }
  // onFailure(error) {
  //   console.log(error);
  // }
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // 'onsuccess': this.onSuccess,
      // 'onfailure': this.onFailure
    });
    this.startApp();    
  }
  async startApp() {

    await this.usuarioServicie.googleInit();
    this.auth2 = this.usuarioServicie.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
    // gapi.load('auth2', () => {
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '819922765890-v60751fuorjtg9lv7rjju6b70vckqop7.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //     // Request scopes in addition to 'profile' and 'email'
    //     //scope: 'additional_scope'
    //   });
    // });
  };
  attachSignin(element) {
    // console.log(element.id);
    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse();
          this.usuarioServicie.loginGoogle(id_token)
            .subscribe(resp=> {
              this.ngZone.run( () => {
                this.router.navigateByUrl('/dashboard');
              })
            });
          // console.log(id_token);
          // document.getElementById('name').innerText = "Signed in: " +
          //     googleUser.getBasicProfile().getName();
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
