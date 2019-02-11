import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private htt: HttpClient ) { 
    console.log("Spotify service listo");
    
  }

  getQuery( query: string ){

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders ({
                                //este token se reinicia cada hora si desea probar esta app genere uno nuevo.
      'Authorization': 'Bearer BQBDzPF4C2YSHpLouwkhP2QVHEnpJwyqAfkOcjjBhWzW5qZVxOoi0aPuZZ1Vt_3ldS8lR8XU070qDjTabR8'
    });

    return this.htt.get(url, { headers });

  }

  getNewRelease(){

    return this.getQuery('browse/new-releases?limit=20')
             .pipe( map( data => data['albums'].items ));

  }

  getArtistas( termino:string ){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
             .pipe( map( data => data['artists'].items ));
  }

  getArtista( id:string ){

    return this.getQuery(`artists/${ id }`);
            // .pipe( map( data => data['artists'].items ));
  }

  getTopTracks( id:string ){

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
             .pipe( map( data => data['tracks'] ));
  }
}
