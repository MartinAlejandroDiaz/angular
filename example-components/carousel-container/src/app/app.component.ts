import { Component } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from './components/constants/carousel.const';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = CAROUSEL_DATA_ITEMS;
  title = 'carousel-container';
}
