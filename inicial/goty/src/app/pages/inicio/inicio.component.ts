import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor( private db: AngularFirestore ) { }

  ngOnInit() {
    this.db.collection('goty').valueChanges()
      .subscribe( resp => {
        console.log(resp);
      });
  }

}
