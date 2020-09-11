import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token:string = 'BQDuG3KswG2ZvzYfHoiQ_41JFXsGrephCH5NUK2Kw0i257t1sky_gc1JCkR7oXNp9_2I7S42MhB87xOzW38';

  constructor( private http: HttpClient) {
    console.log('Spotify service on.')
  }

  getQuery( query:string ){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(url, { headers });
  }

  getNewRealeases(){
    return this.getQuery('browse/new-releases?limit=20')
                  .pipe( map( data =>{
                        return data['albums'].items;
                      }));
    // this.http.get('https://api.spotify.com/v1/browse/new-releases',{ headers})
    //                 .pipe( map( data =>{
    //                   return data['albums'].items;
    //                 }))
  }
  getArtistas( termino: string){
      //    const headers = new HttpHeaders({
      //      'Authorization': `Bearer ${ this.token }`
      //    })
  return this.getQuery(`search?q=${ termino }&type=artist`)
                  .pipe( map( data => data['artists'].items ))
  }
  getArtista( id: string){
    return this.getQuery(`artists/${ id }`);
  }
  getTopTracks( id: string){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
       .pipe( map( data => data['tracks'] ))
  }
}
