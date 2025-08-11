import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home-board/home-board').then((c) => c.HomeBoard),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/product-navigation/product-navigation').then(
        (c) => c.ProductNavigation
      ),
    children: [
      {
        path: '',
        redirectTo: 'phones',
        pathMatch: 'full',
      },
      {
        path: 'phones',
        loadComponent: () =>
          import('./features/products/phones/phones').then((c) => c.Phones),
      },
      {
        path: 'tablets',
        loadComponent: () =>
          import('./features/products/tablets/tablets').then((c) => c.Tablets),
      },
    ],
  },
  {
    path: 'myProducts',
    loadComponent: () =>
      import('./features/my-phones/my-phones-board/my-phones-board').then(
        (c) => c.MyPhonesBoard
      ),
    canActivate: [authGuard],
  },
  {
    path: 'phones/:id',
    children: [
      {
        path: 'details',
        loadComponent: () =>
          import('./features/details/details-board/details-board').then(
            (c) => c.DetailsBoard
          ),
      },
    ],
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./features/create/create-phones/create-phones').then(
        (c) => c.CreatePhones
      ),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((c) => c.Register),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((c) => c.Login),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found').then((c) => c.NotFound),
  },
];
