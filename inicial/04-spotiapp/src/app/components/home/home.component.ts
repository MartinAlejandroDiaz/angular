import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error:boolean = false;
  mensajeError:String;

  constructor( private spotify: SpotifyService ) {
    this.loading = true;
    this.error = false;
    this.spotify.getNewRealeases()
      .subscribe( (data: any) => {
        this.nuevasCanciones =  data;
        this.loading = false;
      }, (errorServicio)=>{
        this.error = true;
        this.loading = false;
        console.log(errorServicio);
        this.mensajeError = errorServicio.error.error.message;
      } );
  }


  ngOnInit() {
  }

}
