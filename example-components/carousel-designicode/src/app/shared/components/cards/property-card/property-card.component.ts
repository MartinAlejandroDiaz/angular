import { Component, OnInit, Input } from '@angular/core';
import { ICardUser } from '../card-user/icard-user.metadata';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() data: ICardUser;
  constructor() { }

  ngOnInit() {
  }

}
