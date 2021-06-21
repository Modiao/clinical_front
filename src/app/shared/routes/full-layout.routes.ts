import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'tickets',
    loadChildren: () => import('../../tickets/tickets.module').then(m => m.TicketsModule)
  }
];
