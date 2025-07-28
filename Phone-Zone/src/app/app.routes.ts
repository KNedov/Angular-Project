import { Routes } from '@angular/router';

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
      import('./features/products/products-board/products-board').then(
        (c) => c.ProductsBoard
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
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found').then((c) => c.NotFound),
  },
];
