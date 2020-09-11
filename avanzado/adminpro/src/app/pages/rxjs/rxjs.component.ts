import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { retry, observeOn, map , filter } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;


  constructor() {
    this.subscription = this.regresaObservable()
      // .pipe(retry(2))
      .subscribe(
        numero => console.log('Subs', numero),
        error => console.error('Error en el obs',error),
        () => console.log('El observador termino!')
      );
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    console.log('La página se a cerrado!');
    this.subscription.unsubscribe();
  }
  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 1;
      const intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next(salida);
        // if ( contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if ( contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error( "Auxilio!" );
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter( (valor , index) => {
        // console.log('Filter', valor, index);
        if ( ( valor % 2 ) === 1 ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
