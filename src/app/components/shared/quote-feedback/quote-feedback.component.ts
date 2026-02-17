import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-quote-feedback',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './quote-feedback.component.html',
    styleUrl: './quote-feedback.component.css' // Note: Fixed filename typo
})
export class QuoteFeedbackComponent {
    @Input() state: 'idle' | 'loading' | 'success' | 'error' = 'idle';
    @Input() message: string = '';
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
}
