import { Injectable, inject, Renderer2, RendererFactory2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Branch } from './home.service';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private titleService = inject(Title);
    private metaService = inject(Meta);
    private rendererFactory = inject(RendererFactory2);
    private renderer: Renderer2;
    private document = inject(DOCUMENT) as Document;

    constructor() {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    /**
     * Updates the title and meta tags for the current page
     * @param title Page Title
     * @param description Meta Description
     * @param keywords Meta Keywords
     */
    updateSeoData(title: string, description: string, keywords: string) {
        this.titleService.setTitle(title);
        this.metaService.updateTag({ name: 'description', content: description });
        this.metaService.updateTag({ name: 'keywords', content: keywords });
    }

    /**
     * Injects JSON-LD structured data into the head
     * @param data The structured data object
     */
    setJsonLd(data: any) {
        const script = this.renderer.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);

        // Remove existing JSON-LD scripts to avoid duplicates/conflicts
        const existingScripts = this.document.head.querySelectorAll('script[type="application/ld+json"]');
        existingScripts.forEach(s => this.renderer.removeChild(this.document.head, s));

        this.renderer.appendChild(this.document.head, script);
    }

    /**
     * Generates LocalBusiness Schema for branches
     * @param branches List of branches
     */
    generateLocalBusinessSchema(branches: Branch[]) {
        if (!branches || branches.length === 0) return;

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Vettro Traders',
            'url': 'https://vettrotraders.com', // Replace with actual URL
            'logo': 'https://vettrotraders.com/assets/images/logo.png', // Replace with actual logo URL
            'contactPoint': {
                '@type': 'ContactPoint',
                'telephone': '+91 944 777 2931',
                'contactType': 'customer service'
            },
            'subOrganization': branches.map(branch => ({
                '@type': 'HomeGoodsStore', // Or 'Store', 'LocalBusiness'
                'name': branch.name,
                'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': branch.location,
                    'addressCountry': 'IN'
                },
                'telephone': branch.managerPhone,
                'priceRange': '₹₹'
            }))
        };

        this.setJsonLd(schema);
    }
}
