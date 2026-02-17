import { Component, OnInit, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService, ProductHub, Product, Service, ManufacturingItem } from '../../services/gallery.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { ExperienceCentersComponent } from '../shared/experience-centers/experience-centers.component';
import { NextStepComponent } from '../shared/next-step/next-step.component';
import { RouterModule } from '@angular/router';
import { HomeService, Branch } from '../../services/home.service';
import { ScrollToTopComponent } from '../shared/scroll-to-top/scroll-to-top.component';

import { PartnerSliderComponent } from '../shared/partner-slider/partner-slider.component';

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, FooterComponent, ExperienceCentersComponent, NgOptimizedImage, PartnerSliderComponent],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
    // Data signals
    productHubs = signal<ProductHub[]>([]);
    services = signal<Service[]>([]);
    manufacturing = signal<ManufacturingItem[]>([]);
    branches = signal<Branch[]>([]);

    @ViewChild('navContainer') navContainer!: ElementRef<HTMLElement>;

    // Filter state
    selectedLocation = signal<string>('All');
    selectedHub = signal<string | null>(null);
    activeHub = signal<string | null>(null);

    // Computed filtered products
    filteredHubs = computed(() => {
        const hubs = this.productHubs();
        const location = this.selectedLocation();

        if (location === 'All') return hubs;

        return hubs.map(hub => ({
            ...hub,
            products: hub.products.filter(p =>
                p.availableAt.includes(location)
            )
        })).filter(hub => hub.products.length > 0);
    });

    constructor(
        private galleryService: GalleryService,
        private homeService: HomeService
    ) { }

    ngOnInit() {
        // Load gallery data
        this.productHubs.set(this.galleryService.getProductHubs());
        this.services.set(this.galleryService.getServices());
        this.manufacturing.set(this.galleryService.getManufacturingItems());

        // Fetch branches for Experience Centers
        this.homeService.getHomeData().subscribe({
            next: (data: any) => {
                if (data.branches) {
                    this.branches.set(data.branches);
                }
            },
            error: (err: any) => console.error('Failed to load branches', err)
        });
    }


    selectHub(hubId: string | null) {
        this.selectedHub.set(hubId);
    }

    scrollToHub(hubId: string) {
        this.activeHub.set(hubId);
        const element = document.getElementById(hubId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    getBranchBadgeColor(branchId: string): string {
        const colors: Record<string, string> = {
            'vettro-traders': 'bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800',
            'venice-furnishings': 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800',
            'venice-metals': 'bg-gradient-to-r from-gray-100 to-slate-200 text-gray-800',
            'real-glass': 'bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-800',
            'v-decor': 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800'
        };
        return colors[branchId] || 'bg-gray-100 text-gray-700';
    }

    getBranchesTooltip(branchIds: string[]): string {
        return branchIds.map(id => this.formatBranchName(id)).join(', ');
    }

    formatBranchName(branchId: string): string {
        const names: Record<string, string> = {
            'vettro-traders': 'Vettro Traders',
            'venice-furnishings': 'Venice Furnishings',
            'real-glass': 'Real Glass',
            'venice-metals': 'Venice Metals',
            'v-decor': 'V-Decor'
        };
        return names[branchId] || branchId;
    }

    getLogicalBranchId(branchName: string): string {
        if (!branchName) return '';

        // Normalize: lowercase, remove special chars, trim
        const normalized = branchName.toLowerCase().trim();

        // Direct mappings for known backend names to frontend service IDs
        const mapping: Record<string, string> = {
            'vettro traders (head office)': 'vettro-traders',
            'vettro traders': 'vettro-traders',
            'venice furnishings': 'venice-furnishings',
            'venice metals': 'venice-metals',
            'real glass': 'real-glass',
            'real glass & paints': 'real-glass',
            'v-decor': 'v-decor',
            'v - decor': 'v-decor'
        };

        if (mapping[normalized]) {
            return mapping[normalized];
        }

        // Fallback: replace spaces with hyphens for unknown branches
        return normalized.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    scrollNav(direction: 'left' | 'right') {
        if (!this.navContainer) return;

        const container = this.navContainer.nativeElement;
        const scrollAmount = 300; // Pixels to scroll

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    footerDescription = 'Browse our complete product catalog including plywood, glass, aluminum, upholstery, and modular interior solutions. Available across our Kerala branches with factory-direct pricing.';
}
