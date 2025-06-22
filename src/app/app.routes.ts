import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { canActivateAdmin } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'spaces',
        loadComponent: () =>
          import('./pages/spaces/spaces.component').then(m => m.SpacesComponent)
      },
      {
        path: 'spaces/:id',
        loadComponent: () =>
          import('./pages/spaces/space-detail.component').then(m => m.SpaceDetailComponent)
      },
      {
        path: 'admin/spaces',
        loadComponent: () =>
          import('./pages/admin/space-admin-list.component').then((m) => m.SpaceAdminListComponent),
        canActivate: [canActivateAdmin]
      },
      {
        path: 'admin/spaces/create',
        loadComponent: () =>
          import('./pages/admin/space-create-page.component').then((m) => m.SpaceCreatePageComponent),
        canActivate: [canActivateAdmin]
      },
      {
        path: 'admin/spaces/edit/:id',
        loadComponent: () =>
          import('./pages/admin/space-edit-page.component').then((m) => m.SpaceEditPageComponent),
        canActivate: [canActivateAdmin]
      },
      {
        path: 'my-reservations',
        loadComponent: () =>
          import('./pages/reservation/my-reservations-page.component').then(m => m.MyReservationsPageComponent)
      },
      {
        path: 'reservations/edit/:id',
        loadComponent: () =>
          import('./pages/reservation/reservation-edit-page.component').then(m => m.ReservationEditPageComponent)
      }
    ]
  }
];
