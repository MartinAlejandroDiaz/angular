import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoginForm } from '../interfaces/login.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit()
  }

  async googleInit() {
  // googleInit() {
    return new Promise( resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '819922765890-v60751fuorjtg9lv7rjju6b70vckqop7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
      });
    });
  }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${ base_url }/usuarios`, formData)
      .pipe( tap((resp: any)=> {
            localStorage.setItem('token', resp.token);
      }));
  }

  login( loginData: LoginForm ) {
    return this.http.post(`${ base_url }/login`, loginData)
      .pipe( tap((resp: any)=> {
            localStorage.setItem('token', resp.token);
      }));
  }

  loginGoogle( token ) {
    return this.http.post(`${ base_url }/login/google`, { token })
      .pipe( tap((resp: any)=> {
            localStorage.setItem('token', resp.token);
      }));
  }

  validartoken() {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, { 
      headers: { 'x-token': token }})
        .pipe(
          tap( (resp: any) => { 
            localStorage.setItem('to ken', resp.token);
          }),
          map(resp=>true),
          catchError( error => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( () => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
      console.log('User signed out.');
    });
  }
  
}
