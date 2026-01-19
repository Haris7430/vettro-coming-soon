import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.html',
  styleUrls: ['./coming-soon.css']
})
export class ComingSoonComponent implements AfterViewInit, OnDestroy {

  @ViewChild('starCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('titleRef') titleRef!: ElementRef<HTMLElement>;

  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;
  private particles: Particle[] = [];
  private width: number = 0;
  private height: number = 0;

  
  private particleCount = 100; 
  private connectionDistance = 100; 

  ngAfterViewInit(): void {
    this.initCanvas();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.initCanvas();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Set Full Screen
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;

    // Reset Particles
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle(true)); // true = randomize X position initially
    }
  }

  private createParticle(randomX: boolean = false): Particle {
    return {
      x: randomX ? Math.random() * this.width : 0, // Start at left edge if not randomX
      y: Math.random() * this.height,
      size: Math.random() * 2 + 0.5, // Random size
      speedX: Math.random() * 2 + 0.5, // Move Right
      speedY: (Math.random() - 0.5) * 0.5, // Slight drift up/down
      opacity: Math.random() * 0.5 + 0.1
    };
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Get Text Position for Interaction
    const titleRect = this.titleRef.nativeElement.getBoundingClientRect();
    const titleCenterX = titleRect.left + titleRect.width / 2;
    const titleCenterY = titleRect.top + titleRect.height / 2;
    let particlesNearText = 0;

    this.particles.forEach((p, index) => {
      // 1. Update Position
      p.x += p.speedX;
      p.y += p.speedY;

      // 2. Reset if out of bounds (Right side)
      if (p.x > this.width) {
        this.particles[index] = this.createParticle(false); // Respawn at left
      }

      // 3. Draw Particle (Star)
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`; // Gold Color
      this.ctx.fill();

      // 4. INTERACTION: Check distance to Text Center
      const dx = p.x - titleCenterX;
      const dy = p.y - titleCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        // Draw line connecting star to text (Effect)
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 - distance/1000})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.moveTo(p.x, p.y);
        // Random point within text area to make it look like it's charging the text
        this.ctx.lineTo(titleCenterX + (Math.random()-0.5)*50, titleCenterY); 
        this.ctx.stroke();
        
        particlesNearText++;
      }
    });

    // 5. Dynamic Text Glow Effect based on particles nearby
    if (particlesNearText > 3) {
      // Add Glow
      this.titleRef.nativeElement.style.textShadow = `0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.3)`;
    } else {
      // Remove Glow
      this.titleRef.nativeElement.style.textShadow = 'none';
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}