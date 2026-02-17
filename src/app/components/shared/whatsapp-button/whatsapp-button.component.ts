import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-whatsapp-button',
    standalone: true,
    imports: [],
    templateUrl: './whatsapp-button.component.html'
})
export class WhatsappButtonComponent {
    @Input() message: string = 'Hello%2C%20I%20visited%20vettrotraders.com%20and%20I%20am%20interested%20in%20your%20Interior%20Ecosystem%20products.%20Please%20guide%20me.';

    get whatsappUrl(): string {
        return `https://wa.me/919447772931?text=${this.message}`;
    }
}
