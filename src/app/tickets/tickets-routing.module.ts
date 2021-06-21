import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth-gard.service';
import { TicketsComponent } from './tickets.component';

const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tickets',
      // roles: MenuRoles.MWalletAdmin
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
