import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { EcosystemComponent } from './components/ecosystem/ecosystem.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'ecosystem',
    component: EcosystemComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    title: 'Product Gallery | Vettro Traders'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact & Quote | Vettro Traders'
  },


  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];