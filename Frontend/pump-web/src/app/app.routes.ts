import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'materials',
    pathMatch: 'full'
  },
  {
    path: 'materials',
    loadComponent: () =>
      import('./pages/materials/materials.component').then(
        m => m.MaterialsComponent
      )
  },
  {
    path: 'motors',
    loadComponent: () =>
      import('./pages/motors/motors.component').then(
        m => m.MotorsComponent
      )
  },
  {
    path: 'pumps',
    loadComponent: () =>
      import('./pages/pumps/pumps.component').then(
        m => m.PumpsComponent
      )
  }
  
];


