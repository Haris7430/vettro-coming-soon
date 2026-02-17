import { Component, OnInit, OnDestroy, AfterViewInit, inject, PLATFORM_ID, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { WhatsappButtonComponent } from '../shared/whatsapp-button/whatsapp-button.component';
import { ExperienceCentersComponent } from '../shared/experience-centers/experience-centers.component';
import { NextStepComponent } from '../shared/next-step/next-step.component';
import { HomeService, Branch } from '../../services/home.service';


import { PartnerSliderComponent } from '../shared/partner-slider/partner-slider.component';

@Component({
  selector: 'app-ecosystem',
  standalone: true,
  imports: [CommonModule, FooterComponent, WhatsappButtonComponent, ExperienceCentersComponent, NextStepComponent, NgOptimizedImage, PartnerSliderComponent],
  templateUrl: './ecosystem.component.html',
  styleUrl: './ecosystem.component.css'
})
export class EcosystemComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);
  private homeService = inject(HomeService);

  branches = signal<Branch[]>([]);

  @ViewChild('timelineSection', { read: ElementRef }) timelineSection!: ElementRef;

  timelineActive = signal<boolean>(false);
  event2002Active = signal<boolean>(false);
  event2011Active = signal<boolean>(false);
  event2019Active = signal<boolean>(false);
  heroTitle = 'Engineering the Future of Interiors';
  heroSubtitle = 'Where precision meets artistry in every detail';
  heroImage = '/content/images/ecosystem/hero-ecosystem.webp'; // Updated to .webp

  philosophyTitle = 'Our Philosophy';
  philosophyDescription = 'At Vettro Traders, we believe that every space tells a story. Our mission is to provide the finest materials and craftsmanship to help you write yours.';
  philosophyImage = '/content/images/engineering_philosophy_Vettro.webp'; // Updated to .webp

  timelineItems = [
    { year: '2010', title: 'Inception', description: 'Started with a vision to revolutionize interior materials market.' },
    { year: '2015', title: 'Expansion', description: 'Launched multiple branches across the state.' },
    { year: '2020', title: 'Innovation', description: 'Introduced eco-friendly and sustainable product lines.' },
    { year: '2024', title: 'Global Reach', description: 'Now serving clients internationally with premium exports.' }
  ];

  features = [
    { title: 'Premium Quality', icon: 'diamond', description: 'Sourced from the best global manufacturers.' },
    { title: 'Sustainable', icon: 'eco', description: 'Eco-friendly materials for a greener future.' },
    { title: 'Custom Solutions', icon: 'design_services', description: 'Tailored to your specific design needs.' }
  ];

  private scrollObserver: IntersectionObserver | null = null;
  private timelineObserver: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.seoService.updateSeoData(
      'The Vettro Group Ecosystem | One Integrated Interior Platform',
      'Discover the Vettro ecosystem — a vertically integrated network of specialized brands delivering materials, manufacturing, and turnkey execution under one unified system.',
      'Vettro Group ecosystem, Venice Furnishings, Real Glass & Paints, Venice Metals, V-Decor, Q-Tuff, integrated interior solutions'
    );

    // Fetch branches data
    this.homeService.getHomeData().subscribe({
      next: (data) => {
        if (data.branches) {
          this.branches.set(data.branches);
        }
      },
      error: (err) => console.error('Failed to load branches', err)
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupTimelineAnimation();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
    if (this.timelineObserver) {
      this.timelineObserver.disconnect();
    }
  }

  private setupTimelineAnimation(): void {
    if (!this.timelineSection) return;

    // Main timeline activation
    this.timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.timelineActive.set(true);
            this.activateTimelineEvents();
          }
        });
      },
      { threshold: 0.2 }
    );

    this.timelineObserver.observe(this.timelineSection.nativeElement);
  }

  private activateTimelineEvents(): void {
    // Sequentially activate timeline events with delays
    setTimeout(() => this.event2002Active.set(true), 300);
    setTimeout(() => this.event2011Active.set(true), 800);
    setTimeout(() => this.event2019Active.set(true), 1300);
  }

  footerDescription = 'Integrated interior brands in Kerala, serving architects, builders, and interior designers with material supply, fabrication, and execution services.';
}
