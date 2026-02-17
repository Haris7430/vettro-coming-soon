import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-next-step',
    imports: [CommonModule, RouterLink],
    templateUrl: './next-step.component.html',
    styleUrl: './next-step.component.css'
})
export class NextStepComponent {
    @Input() title: string = '"You have seen our vision.';
    @Input() subtitle: string = 'Now, explore how we execute it."';
    @Input() buttonLink: string = '/services';
    @Input() label: string = 'Next Step';
}
