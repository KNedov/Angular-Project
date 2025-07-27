import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full',
    },
    {
        path: 'home',
        loadComponent:()=>
            import('./features/home/home-board/home-board').then((c)=>c.HomeBoard)
    },
    {
        path:'**',
        loadComponent:()=>
            import('./shared/components/not-found/not-found').then((c)=>c.NotFound)
    }
   
];
