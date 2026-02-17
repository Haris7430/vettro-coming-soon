import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeService, Branch, HomeData } from '../../../services/home.service';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule, NgOptimizedImage],
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
    @Input() description: string = 'Interior manufacturing services in Kerala including CNC cutting, edge banding, multi boring, MDF grooving, and in-house glass processing for architects and builders.';

    private homeService = inject(HomeService);
    branches = signal<Branch[]>([]);

    ngOnInit() {
        // Use the synchronous getter if data is likely already loaded by Home/APP
        // OR better, subscribe to ensure we get it even if loaded later
        this.homeService.getHomeData().subscribe((data: HomeData) => {
            if (data.branches) {
                this.branches.set(data.branches);
            }
        });
    }
}
