import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scroll-to-top',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scroll-to-top.component.html',
    styleUrl: './scroll-to-top.component.css'
})
export class ScrollToTopComponent {
    isVisible = signal(false);

    @HostListener('window:scroll', [])
    onWindowScroll() {
        // Show button when user scrolls down 300px
        this.isVisible.set(window.pageYOffset > 300);
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}
