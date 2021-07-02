import { Component, OnInit, Input } from '@angular/core';
import { USERS_DATA } from '@data/constants/users.const';
import { ICardUser } from '../cards/card-user/icard-user.metadata';
import { ICarouselItem } from './Icarousel-item.metadata';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  /**
   * Custom Properties
   */
  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() items: ICardUser[] = USERS_DATA;
  total_slides = 0;
  slide = 0;
  /**
   * Final Properties
   */
  public finalHeight: string | number = 0;
  public currentPosition = 0;

  constructor() {
    this.finalHeight = this.isFullScreen ? '400vh' : `${this.height}px`;
   }

  ngOnInit() {
    this.total_slides = this.items.length % 3;
    if (this.items.length / 3 > 0) {
      this.total_slides = this.total_slides + 1;
    }
    this.items.map( ( i, index ) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  setCurrentPosition(position: number) {
    this.currentPosition = position;
    this.items.find(i => i.id === 0).marginLeft = -100 * position;
  }

  setNext() {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length - 1) {
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    this.items.find(i => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
    this.slide = (this.slide + 1 > this.items.length - 3) ? 0 : this.slide + 3;
  }

  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition  - 1;
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = -100 * backPosition;
    }
    this.items.find(i => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = backPosition;
    this.slide = (this.slide - 1 < this.items.length - 3) ? this.total_slides : this.slide - 3;
  }

}
