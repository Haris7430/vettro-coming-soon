import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SITE_DATA } from '../data/site-data';

export interface Brand {
    _id: string;
    name: string;
    icon?: string;
    description?: string;
    route?: string;
    color?: string;
}

export interface Partner {
    _id: string;
    name: string;
    logoUrl: string;
    altText: string;
}

export interface Branch {
    _id: string;
    name: string;
    location: string;
    managerName?: string;
    managerPhoto?: string;
    managerPhone?: string;
    managerRole?: string;
    mapUrl?: string;
    iframeUrl?: string;
    socialLinks?: {
        whatsapp?: string;
        instagram?: string;
    };
}

export interface GalleryItem {
    _id: string;
    category: string;
    imageUrl: string;
    altText?: string;
}

export interface HomeData {
    brands: Brand[];
    partners: Partner[];
    heroVideos: string[];
    branches: Branch[];
    gallery: GalleryItem[];
}

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    getHomeData(): Observable<HomeData> {
        return of(SITE_DATA);
    }
}
