import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((c) => c.Home),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products').then((c) => c.Products),
    children: [
      {
        path: '',
        redirectTo: 'phones',
        pathMatch: 'full',
      },
      {
        path: 'phones',
        loadComponent: () =>
          import('./features/products/phones/phone-board/phone-board').then(
            (c) => c.PhoneBoard
          ),
      },
      {
        path: 'tablets',
        loadComponent: () =>
          import('./features/products/tablets/tablet-board/tablet-board').then(
            (c) => c.TabletBoard
          ),
      },
    ],
  },

  {
    path: 'phones/:id',
    children: [
      {
        path: 'details',
        loadComponent: () =>
          import('./features/details/details').then((c) => c.Details),
      },
    ],
  },
  {path:'register',
    loadComponent:()=>
      import ('./features/auth/register/register').then((c)=>c.Register)
  },
  {
    path: '**',
    component: NotFound,
  },
];
