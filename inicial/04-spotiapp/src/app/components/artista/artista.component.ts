import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  loadingArtista: boolean;
  loadingTopTracks: boolean;
  artista:any = {};
  topTracks:any[] = [];


  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService) { 
    this.router.params.subscribe( params => {
      this.getArtista(params['id']);
      this.getTopTracks( params['id']);
    });
  }

  ngOnInit() {
  }
  getArtista( id:string){
    this.loadingArtista = true;
    this.spotify.getArtista(id)
      .subscribe(artista => {
        this.artista = artista;
      })
      this.loadingArtista = false;
  }

  getTopTracks( id:string){
    this.loadingTopTracks = true;
    this.spotify.getTopTracks(id)
      .subscribe( (topTracks: any[]) => {
        console.log(topTracks);
        this.topTracks = topTracks;
      })
      this.loadingTopTracks = false;
  }
  

}
