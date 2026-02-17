import { Component, OnInit, computed, inject, signal, PLATFORM_ID, TransferState, makeStateKey, OnDestroy, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformServer, isPlatformBrowser } from '@angular/common';
import { HomeService, Brand, HomeData, Branch, GalleryItem } from '../../services/home.service';
import { SeoService } from '../../services/seo.service';
import { SafePipe } from '../../pipes/safe.pipe';
import { ExperienceCentersComponent } from '../shared/experience-centers/experience-centers.component';
import { NextStepComponent } from '../shared/next-step/next-step.component';
import { ScrollToTopComponent } from '../shared/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { PartnerSliderComponent } from '../shared/partner-slider/partner-slider.component';

const HOME_DATA_KEY = makeStateKey<HomeData>('HOME_DATA');

import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule, NgOptimizedImage, ExperienceCentersComponent, NextStepComponent, FooterComponent, PartnerSliderComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
    private homeService = inject(HomeService);
    private transferState = inject(TransferState);
    private seoService = inject(SeoService);
    private platformId = inject(PLATFORM_ID);
    private ngZone = inject(NgZone);


    // Data Signals
    brands = signal<Brand[]>([]);
    subBrands = signal<SubBrand[]>([]);
    heroVideos = signal<string[]>([]);
    showcaseVideos = signal<string[]>([]); // Will be populated in init
    branches = signal<Branch[]>([]);
    gallery = signal<GalleryItem[]>([]);

    // UI State Signals
    currentShowcaseIndex = signal<number>(0);
    currentHeroVideoIndex = signal<number>(0);
    showcasePlaying = signal<boolean>(false);
    isMuted = signal<boolean>(true); // Default Muted
    showQTuffBanner = signal<boolean>(true);

    // Stats Logic
    @ViewChild('statsSection') statsSection!: ElementRef;
    statsVisible = signal<boolean>(false);

    // Gallery Navigation & Animation
    @ViewChild('row1Mover') row1Mover!: ElementRef<HTMLElement>;
    @ViewChild('row2Mover') row2Mover!: ElementRef<HTMLElement>;

    // Animation State
    private animFrameId: number | null = null;
    private row1X = 0;
    private row2X = 0;
    private row1Width = 0;
    private row2Width = 0;
    private speed = 0.5; // Base speed: pixels per frame (approx 30px/sec at 60fps)

    // Drag State
    private isDragging: { [key: string]: boolean } = { row1: false, row2: false };
    private lastDragX: { [key: string]: number } = { row1: 0, row2: 0 };
    private dragVelocity: { [key: string]: number } = { row1: 0, row2: 0 };

    // ... stats definition ...
    impactStats = signal<StatItem[]>([
        { label: 'Years of Trust', value: 22, suffix: '+', current: 0, description: 'Since 2002' },
        { label: 'Happy Customers', value: 20000, suffix: '+', current: 0, description: 'Material Supply & Interiors' },
        { label: 'In-House Mfg', value: 100, suffix: '%', current: 0, description: 'Quality Control' },
        { label: 'Sub-Brands', value: 4, suffix: '+', current: 0, description: 'Specialized divisions' },
    ]);

    private videoInterval: any;
    private scrollObserver: IntersectionObserver | null = null;
    // Switched to local assets (served from root 'content/')
    private readonly contentBase = 'content';

    // Computed
    // Marquee Rows
    galleryRow1 = computed(() => {
        const total = this.gallery().length;
        const mid = Math.ceil(total / 2);
        return this.gallery().slice(0, mid);
    });

    galleryRow2 = computed(() => {
        const total = this.gallery().length;
        const mid = Math.ceil(total / 2);
        return this.gallery().slice(mid);
    });

    currentShowcaseVideo = computed(() => {
        const videos = this.showcaseVideos();
        if (videos.length === 0) return null;
        return videos[this.currentShowcaseIndex()];
    });

    currentHeroVideo = computed(() => {
        const videos = this.heroVideos();
        if (videos.length === 0) return null;
        return videos[this.currentHeroVideoIndex()];
    });

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.videoInterval = setInterval(() => {
                this.nextHeroVideo();
            }, 8000);
        }
    }

    toggleShowcasePlay(video: HTMLVideoElement) {
        if (video.paused) {
            video.play();
            this.showcasePlaying.set(true);
        } else {
            video.pause();
            this.showcasePlaying.set(false);
        }
    }

    toggleMute(video: HTMLVideoElement) {
        video.muted = !video.muted;
        this.isMuted.set(video.muted);
    }

    // ... closeQTuff ...

    closeQTuff() {
        this.showQTuffBanner.set(false);
    }

    ngOnInit(): void {
        this.seoService.updateSeoData(
            'Vettro Traders | The Integrated Interior Ecosystem Kerala',
            'The complete interior ecosystem. Manufacturers & Dealers of Plywood, Toughened Glass, Aluminium Profiles, and Turnkey Interiors.',
            'Plywood Alappuzha, Toughened Glass Kerala, Interior Hardware, Vettro Traders'
        );

        this.initializeCustomData();

        if (this.transferState.hasKey(HOME_DATA_KEY)) {
            const storedData = this.transferState.get(HOME_DATA_KEY, null);
            if (storedData) this.mergeSignals(storedData);
            this.transferState.remove(HOME_DATA_KEY);
        } else {
            this.homeService.getHomeData().subscribe({
                next: (data) => {
                    this.mergeSignals(data);
                    if (isPlatformServer(this.platformId)) this.transferState.set(HOME_DATA_KEY, data);
                },
                error: (err) => console.error('Failed to fetch home data', err)
            });
        }
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.setupStatsObserver();

            // Start Animation Loop outside Angular to prevent Change Detection thrashing
            this.ngZone.runOutsideAngular(() => {
                this.startAnimationLoop();
            });

            // Recalculate widths on resize
            window.addEventListener('resize', () => {
                this.calculateWidths();
            });
        }
    }

    ngOnDestroy(): void {
        if (this.videoInterval) {
            clearInterval(this.videoInterval);
        }
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
        }
    }

    private calculateWidths() {
        if (this.row1Mover?.nativeElement) {
            // Content is duplicated twice (2 loops), so single width is total / 2
            this.row1Width = this.row1Mover.nativeElement.scrollWidth / 2;
        }
        if (this.row2Mover?.nativeElement) {
            this.row2Width = this.row2Mover.nativeElement.scrollWidth / 2;
            // Initialize Row 2 to start offset so we can move Right without showing empty space
            // We start at -width (showing the second copy), and move towards 0
            if (this.row2X === 0) this.row2X = -this.row2Width;
        }
    }

    private startAnimationLoop() {
        const loop = () => {
            // Update positions based on speed and drag
            if (!this.isDragging['row1']) {
                this.row1X -= this.speed; // Move left
            }
            if (!this.isDragging['row2']) {
                this.row2X += this.speed; // Move right
            }

            // Wrap logic for Row 1 (moving left)
            if (this.row1Mover?.nativeElement) {
                if (this.row1X <= -this.row1Width) {
                    this.row1X += this.row1Width; // Reset to create seamless loop
                }
                // If dragged too far right, reset to start of loop
                if (this.row1X > 0) {
                    this.row1X -= this.row1Width;
                }
                this.row1Mover.nativeElement.style.transform = `translate3d(${this.row1X}px, 0, 0)`;
            }

            // Wrap logic for Row 2 (moving right)
            if (this.row2Mover?.nativeElement) {
                // Moving Right: we go from -Width -> 0.
                if (this.row2X >= 0) {
                    this.row2X -= this.row2Width; // Reset to -Width
                }
                if (this.row2X < -this.row2Width) {
                    this.row2X += this.row2Width;
                }
                this.row2Mover.nativeElement.style.transform = `translate3d(${this.row2X}px, 0, 0)`;
            }

            this.animFrameId = requestAnimationFrame(loop);
        };

        // Initial width calculation before starting the loop
        this.calculateWidths();
        this.animFrameId = requestAnimationFrame(loop);
    }

    private initializeCustomData() {
        // ... Hero Videos ...
        const videos = [
            `${this.contentBase}/videos/hero_interior%20design_60fps.mp4`,
            `${this.contentBase}/videos/hero_interior%20design_30fps.mp4`,
            `${this.contentBase}/videos/hero_interior%20design_30fps%20(2).mp4`,
            `${this.contentBase}/videos/hero_interior%20design_1080_60fps.mp4`,
            `${this.contentBase}/videos/hero_interior%20design-25fps.mp4`,
            `${this.contentBase}/videos/hero_interior%20design-2160_30fps.mp4`
        ];
        this.heroVideos.set(videos);

        // Partners removed

        // Showcase Videos (Updated to 10)
        const showcase = [];
        for (let i = 1; i <= 10; i++) {
            const num = i.toString().padStart(2, '0');
            showcase.push(`${this.contentBase}/videos/vettro-VedioShowcase-${num}.mp4`);
        }
        this.showcaseVideos.set(showcase);


        // Sub-Brands
        const subBrandsList: SubBrand[] = [
            {
                name: 'Vettro Traders',
                logo: `${this.contentBase}/Logos/vettroTradersAndIntegratedServices_BrandLogo-1.svg`,
                mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vettro+Traders+Alappuzha'
            },
            {
                name: 'Venice Furnishings',
                logo: `${this.contentBase}/Logos/veniceFurnishings_BrandLogo-2.svg`,
                mapUrl: 'https://www.google.com/maps/search/?api=1&query=Venice+Furnishings+Alappuzha'
            },
            {
                name: 'Venice Metals',
                logo: `${this.contentBase}/Logos/veniceMetals_BrandLogo-3.svg`,
                mapUrl: 'https://www.google.com/maps/search/?api=1&query=Venice+Metals+Alappuzha'
            },
            {
                name: 'V-Decor',
                logo: `${this.contentBase}/Logos/v-decor_BrandLogo-4.svg`,
                mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vettro+Traders+Alappuzha'
            },
            {
                name: 'Real Glass & Paints',
                logo: `${this.contentBase}/Logos/realGlassAndPaints_BrandLogo-5.svg`,
                mapUrl: 'https://www.google.com/maps/search/?api=1&query=Real+Glass+%26+Paints+Alappuzha'
            }
        ];
        this.subBrands.set(subBrandsList);






    }

    private mergeSignals(data: HomeData) {
        if (data.brands && data.brands.length > 0) this.brands.set(data.brands);


        if (data.gallery && data.gallery.length > 0) {
            this.gallery.set(data.gallery);
        }

        if (data.branches && data.branches.length > 0) {
            this.branches.set(data.branches);
            this.updateLocationSeo();
        }
    }

    // Showcase Actions

    nextShowcase() {
        this.currentShowcaseIndex.update(i => (i + 1) % this.showcaseVideos().length);
        this.showcasePlaying.set(false);
    }

    prevShowcase() {
        this.currentShowcaseIndex.update(i => i === 0 ? this.showcaseVideos().length - 1 : i - 1);
        this.showcasePlaying.set(false);
    }

    // Hero Actions
    nextHeroVideo() {
        const videos = this.heroVideos();
        if (videos.length > 0) {
            this.currentHeroVideoIndex.update(i => (i + 1) % videos.length);
        }
    }

    // Stats Animation Logic
    private setupStatsObserver() {
        if (!this.statsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.statsVisible()) {
                    this.statsVisible.set(true);
                    this.animateStats();
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% visible

        observer.observe(this.statsSection.nativeElement);
        this.scrollObserver = observer; // Keep reference to cleanup if needed (though existing cleanup handles it)
    }

    private animateStats() {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepTime = duration / steps;

        const interval = setInterval(() => {
            this.impactStats.update(stats => {
                let allDone = true;
                const newStats = stats.map(stat => {
                    const increment = stat.value / steps;
                    if (stat.current < stat.value) {
                        allDone = false;
                        return { ...stat, current: Math.min(stat.value, Math.ceil(stat.current + increment)) };
                    }
                    return stat;
                });

                if (allDone) clearInterval(interval);
                return newStats;
            });
        }, stepTime);
    }

    // Drag Handlers
    onDragStart(event: MouseEvent, row: 'row1' | 'row2') {
        this.isDragging[row] = true;
        this.lastDragX[row] = event.pageX;
        // Cursor
        const el = row === 'row1' ? this.row1Mover?.nativeElement?.parentElement : this.row2Mover?.nativeElement?.parentElement;
        if (el) el.style.cursor = 'grabbing';
    }

    onDragMove(event: MouseEvent, row: 'row1' | 'row2') {
        if (!this.isDragging[row]) return;
        event.preventDefault(); // Prevent text selection

        const delta = event.pageX - this.lastDragX[row];
        this.lastDragX[row] = event.pageX;

        if (row === 'row1') this.row1X += delta;
        else this.row2X += delta;
    }

    onDragEnd(row: 'row1' | 'row2') {
        this.isDragging[row] = false;
        const el = row === 'row1' ? this.row1Mover?.nativeElement?.parentElement : this.row2Mover?.nativeElement?.parentElement;
        if (el) el.style.cursor = 'grab';
    }


    // SEO Helper
    private updateLocationSeo() {
        const branches = this.branches();
        if (branches.length > 0) {
            this.seoService.generateLocalBusinessSchema(branches);

            // Extract unique cities (simple heuristic: look for Alappuzha, Ernakulam, etc. or just use 'Kerala')
            // For now, valid locations from data are Alappuzha.
            // Let's explicitly mention Alappuzha and surrounding areas.
            this.seoService.updateSeoData(
                'Vettro Traders | The Integrated Interior Ecosystem Kerala',
                'The complete interior ecosystem serving Alappuzha and Kerala. Manufacturers & Dealers of Plywood, Toughened Glass, Aluminium Profiles, and Turnkey Interiors.',
                'Plywood Alappuzha, Toughened Glass Kerala, Interior Hardware, Vettro Traders, Alappuzha, Chandiroor'
            );
        }
    }

    // Touch Handlers
    onTouchStartDrag(event: TouchEvent, row: 'row1' | 'row2') {
        this.isDragging[row] = true;
        this.lastDragX[row] = event.touches[0].pageX;
    }

    onTouchMoveDrag(event: TouchEvent, row: 'row1' | 'row2') {
        if (!this.isDragging[row]) return;

        const delta = event.touches[0].pageX - this.lastDragX[row];
        this.lastDragX[row] = event.touches[0].pageX;

        if (row === 'row1') this.row1X += delta;
        else this.row2X += delta;
    }

    onTouchEndDrag(row: 'row1' | 'row2') {
        this.isDragging[row] = false;
    }
}

// Interfaces helper
interface SubBrand {
    name: string;
    logo: string;
    mapUrl: string;
}

interface StatItem {
    label: string;
    value: number;
    suffix: string;
    current: number;
    description: string;
}
