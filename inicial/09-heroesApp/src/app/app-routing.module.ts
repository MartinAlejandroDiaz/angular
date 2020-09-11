import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; 
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'heroes/:id', component: HeroeComponent},
  {path: 'heroe/nuevo', component: HeroeComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
