import { Component, OnInit, inject, signal, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { WhatsappButtonComponent } from '../shared/whatsapp-button/whatsapp-button.component';
import { ExperienceCentersComponent } from '../shared/experience-centers/experience-centers.component';
import { NextStepComponent } from '../shared/next-step/next-step.component';
import { HomeService, Branch } from '../../services/home.service';


import { PartnerSliderComponent } from '../shared/partner-slider/partner-slider.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FooterComponent, WhatsappButtonComponent, ExperienceCentersComponent, NextStepComponent, NgOptimizedImage, PartnerSliderComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  private seoService = inject(SeoService);
  private homeService = inject(HomeService);

  branches = signal<Branch[]>([]);

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  isMuted = signal(false);
  playCount = 0;

  @ViewChild('processSection') processSection!: ElementRef;
  @ViewChild('philosophySection') philosophySection!: ElementRef; // New Section
  @ViewChildren('stepCard') stepCards!: QueryList<ElementRef>;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  processVisible = signal(false);
  philosophyVisible = signal(false); // New Signal
  progressWidth = signal(0);
  activeStepIndex = signal(-1);

  processSteps: ProcessStep[] = [
    { icon: 'computer', title: 'Design Input', description: 'CAD & 3D Modeling', image: '/content/images/Our%20Services/Design-Input-manufacturingProcess01.webp' },
    { icon: 'layers', title: 'Material Prep', description: 'Plywood & Mica Selection', image: '/content/images/Our%20Services/Material-Prep-manufacturingProcess02.webp' },
    { icon: 'grid_on', title: 'Precision Cutting', description: 'CNC & Beam Saw Cutting', image: '/content/images/Our%20Services/Precision-Cutting03.webp' },
    { icon: 'build', title: 'Detailing', description: 'Multi-Boring & Grooving', image: '/content/images/Our%20Services/Detailing04.webp' },
    { icon: 'auto_awesome', title: 'Finishing', description: 'Edge Banding & Glass Works', image: '/content/images/Our%20Services/Finishing05.webp' },
    { icon: 'home', title: 'Execution', description: 'On-Site Installation', image: '/content/images/Our%20Services/Execution06.webp' }
  ];

  ngOnInit(): void {
    this.seoService.updateSeoData(
      'Integrated Interior Services | Manufacturing & Execution - Vettro Traders',
      'Factory-direct interior solutions in Kerala. Specializing in CNC Cutting, Edge Banding, Glass Processing, and End-to-End Fit-outs.',
      'CNC Cutting Kerala, Edge Banding Service, Multiwood Grooving, Interior Fit-out Company'
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

  ngAfterViewInit() {
    const video = this.heroVideo.nativeElement;
    video.muted = false; // Ensure it starts unmuted
    this.isMuted.set(false);

    // Modern browsers block unmuted autoplay. We try, but catch error.
    video.play().catch(() => {
      // If blocked, we must mute to play
      console.log('Autoplay blocked, muting');
      video.muted = true;
      this.isMuted.set(true);
      video.play();
    });

    // Observer for Process Section (Mobile Trigger Only)
    // On Desktop, we wait for Hover to start the animation.
    const isMobile = window.innerWidth < 768;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Always show the section (opacity/transform if needed), but only animate line on Mobile
          this.processVisible.set(true);

          if (isMobile) {
            this.startProcessAnimation();
            observer.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.2 });

    if (this.processSection) {
      observer.observe(this.processSection.nativeElement);
    }

    // Observer for Philosophy Section (Card Throw Animation)
    const philosophyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.philosophyVisible.set(true);
          philosophyObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (this.philosophySection) {
      philosophyObserver.observe(this.philosophySection.nativeElement);
    }
  }

  hasAnimationStarted = false;

  onSectionHover() {
    // Desktop Trigger: Start on Hover if not already started
    if (window.innerWidth >= 768 && !this.hasAnimationStarted) {
      this.startProcessAnimation();
    }
  }

  startProcessAnimation() {
    if (this.hasAnimationStarted) return;
    this.hasAnimationStarted = true;

    // Ensure visible
    this.processVisible.set(true);

    // Start the line animation (Line 0 -> 100%)
    setTimeout(() => {
      this.progressWidth.set(100);
    }, 100);

    // Calculate timing per step (Total 12s = 12000ms)
    const totalDuration = 12000;
    const stepInterval = totalDuration / this.processSteps.length;

    this.processSteps.forEach((_, index) => {
      setTimeout(() => {
        this.activeStepIndex.set(index);
        this.scrollToActiveStep();
      }, (index + 0.5) * stepInterval); // +0.5 to activate when line is halfway to next step or passing it
    });
  }

  scrollToActiveStep() {
    const activeIndex = this.activeStepIndex();
    if (activeIndex >= 0 && this.stepCards && this.scrollContainer) {
      const stepCard = this.stepCards.toArray()[activeIndex].nativeElement;
      const container = this.scrollContainer.nativeElement;

      const cardLeft = stepCard.offsetLeft;
      const cardWidth = stepCard.offsetWidth;
      const containerWidth = container.offsetWidth;

      const scrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }

  scrollLeft() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({ left: -350, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({ left: 350, behavior: 'smooth' });
    }
  }

  onVideoEnded() {
    this.playCount++;
    const video = this.heroVideo.nativeElement;

    // Auto-Mute after 2 full plays
    if (this.playCount >= 2) {
      video.muted = true;
      this.isMuted.set(true);
    }

    // Manual Loop
    video.play().catch(err => console.error('Loop playback failed:', err));
  }

  toggleMute() {
    if (this.heroVideo) {
      const video = this.heroVideo.nativeElement;
      video.muted = !video.muted;
      this.isMuted.set(video.muted);


    }
  }
  coreServices = [
    {
      title: 'Mica Pressing',
      description: 'Professional laminate pressing service with precision bonding for furniture and paneling.',
      icon: 'compress',
      bgImage: '/content/images/gallery/MICA-PRESSING-service01.webp'
    },
    {
      title: 'Board Cutting',
      description: 'Accurate CNC and beam saw panel cutting to your exact specifications.',
      icon: 'content_cut',
      bgImage: '/content/images/gallery/CUTTING-BOARD-service02.webp'
    },
    {
      title: 'Edge Banding',
      description: 'Automated edge banding service for seamless, factory-finish edges on all boards.',
      icon: 'border_style',
      bgImage: '/content/images/gallery/EDGE-BANDING-service03.webp'
    },
    {
      title: 'Multi Boring',
      description: 'CNC multi-boring for precise hinge, handle, and fitting installation points.',
      icon: 'album',
      bgImage: '/content/images/gallery/MULTI-BOARING-service04.webp'
    },
    {
      title: 'Grooving',
      description: 'Precision grooving and design patterns on MDF and Multiwood panels.',
      icon: 'straighten',
      bgImage: '/content/images/gallery/GROOVING-service05.webp'
    },
    {
      title: 'Glass Polishing',
      description: 'In-house glass edge polishing and beveling for premium finish.',
      icon: 'auto_fix_high',
      bgImage: '/content/images/gallery/GLASS-POLISHING-service06.webp'
    },
    {
      title: 'Glass Etching',
      description: 'Custom frosted designs and etching on glass surfaces for aesthetic applications.',
      icon: 'brush',
      bgImage: '/content/images/gallery/GLASS-ETCHING-service07.webp'
    }
  ];

  readyToInstallUnits = [
    'Modular Kitchens & Storage Solutions',
    'Custom Wardrobes & Bedroom Interiors',
    'TV Units & Living Room Furniture',
    'Prayer Units & Custom Wooden Panels'
  ];

  footerDescription = 'Interior manufacturing services in Kerala including CNC cutting, edge banding, multi boring, MDF grooving, and in-house glass processing for architects and builders.';

}

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
  image?: string;
}
