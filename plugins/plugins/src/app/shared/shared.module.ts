import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeButtonComponent } from './subscribe-button/subscribe-button.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    SubscribeButtonComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    SubscribeButtonComponent
  ]
})
export class SharedModule { }
