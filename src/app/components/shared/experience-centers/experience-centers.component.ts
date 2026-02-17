import { Component, Input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Branch } from '../../../services/home.service';
import { SafePipe } from '../../../pipes/safe.pipe';

@Component({
    selector: 'app-experience-centers',
    imports: [CommonModule, NgOptimizedImage, SafePipe],
    templateUrl: './experience-centers.component.html',
    styleUrl: './experience-centers.component.css'
})
export class ExperienceCentersComponent {
    @Input() set branches(value: Branch[]) {
        this._branches.set(value || []);
    }

    _branches = signal<Branch[]>([]);
}
