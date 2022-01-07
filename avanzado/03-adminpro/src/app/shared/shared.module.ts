// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceModule } from '../services/service.module';
// Components
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    imports: [
        ServiceModule,
        RouterModule,
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
    ]
})

export class SharedModule { }