import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';


@NgModule({
  declarations: [
    TicketsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
