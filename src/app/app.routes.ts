import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent,
        title: 'Página Inicial' 
    },
    {
        path: '**', 
        component: NotFoundComponent,
        title: 'Página Não Encontrada' 
    }
];