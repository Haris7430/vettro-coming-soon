import { Routes } from '@angular/router';
import { ComingSoonComponent } from './coming-soon/coming-soon';


export const routes: Routes = [
 
  { 
    path: '', 
    component: ComingSoonComponent 
  },

  
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];