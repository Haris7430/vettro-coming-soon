import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

interface Partner {
    _id: string;
    name: string;
    logoUrl: string;
    altText: string;
}

@Component({
    selector: 'app-partner-slider',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: './partner-slider.component.html',
    styleUrls: ['./partner-slider.component.css']
})
export class PartnerSliderComponent {
    partners = signal<Partner[]>([]);
    // Switched to local assets
    private readonly contentBase = 'assets/content';

    constructor() {
        this.initializePartners();
    }

    private initializePartners() {
        // Use local paths directly
        const p = [
            { _id: '1', name: 'Dr Back', logoUrl: `content/Logos/Dr Back_logo-01.svg` },
            { _id: '2', name: 'Cirrus', logoUrl: `content/Logos/cirrus-logo-02.svg` },
            { _id: '3', name: 'Kurlon', logoUrl: `content/Logos/kurlon_logo-03.webp` },
            { _id: '4', name: 'Fam Foam', logoUrl: `content/Logos/Fam Foam_logo-04.png` },
            { _id: '5', name: 'D-Decor', logoUrl: `content/Logos/D-decor_Logo-05.svg` },
            { _id: '6', name: 'GM Fabrics', logoUrl: `content/Logos/gm-fabric_logo-06.svg` },
            { _id: '7', name: 'Nilkamal Sleep', logoUrl: `content/Logos/NILKAMAL_SLEEP-07.svg` },
            { _id: '8', name: 'Peps', logoUrl: `content/Logos/Peps_Logo-08.webp` },
            // 09 missing?
            { _id: '10', name: 'Sarom', logoUrl: `content/Logos/SaromLogoBlack-10.svg` },
            { _id: '11', name: 'Sleepy Head', logoUrl: `content/Logos/Sleepy Head_logo-11.webp` },
            { _id: '12', name: 'Springfit', logoUrl: `content/Logos/springfit_logo-12.avif` },
            { _id: '13', name: 'Sunidra', logoUrl: `content/Logos/sunidra_logo-13.png` },
            { _id: '14', name: 'Greenply', logoUrl: `content/Logos/greenply-14.svg` },
            { _id: '15', name: 'Century Ply', logoUrl: `content/Logos/centuryply-15.png` },
            { _id: '16', name: 'Prestige Ply', logoUrl: `content/Logos/prestigeply-16.gif` },
            { _id: '17', name: 'Western India', logoUrl: `content/Logos/WESTERN INDIA-17.png` },
            { _id: '18', name: 'Bestwood', logoUrl: `content/Logos/bestwood_logo-18.svg` },
            { _id: '19', name: 'Power Wood', logoUrl: `content/Logos/PowerWood_logo-19.webp` },
            { _id: '20', name: 'Thomson Multiwood', logoUrl: `content/Logos/Thomsonmultiwood-logo-20.png` },
            { _id: '21', name: 'Greenlam', logoUrl: `content/Logos/greenlam-logo-21.png` },
            { _id: '22', name: 'Merino Laminates', logoUrl: `content/Logos/MERRINO LAMINATES-22.jpg` },
            { _id: '23', name: 'Stylam', logoUrl: `content/Logos/Stylam-LOGO-23.png` },
            { _id: '24', name: 'Virgo Group', logoUrl: `content/Logos/virgo_group_logo-24.png` },
            { _id: '25', name: 'Knauf', logoUrl: `content/Logos/KNAUFLogo-25.png` },
            { _id: '26', name: 'Saint Gobain', logoUrl: `content/Logos/Sainy-Gobain_glass-26.svg` },
            { _id: '27', name: 'Asashi India Glass', logoUrl: `content/Logos/Asashi_India_Glass-27.png` },
            { _id: '28', name: 'Gold Plus', logoUrl: `content/Logos/GOLD-PLUS_logo-28.png` },
            { _id: '29', name: 'Hindalco', logoUrl: `content/Logos/hindalco-branding-29.svg` },
            { _id: '30', name: 'Jindal Aluminium', logoUrl: `content/Logos/Jindal-Aluminium-30.png` },
            { _id: '31', name: 'Rehau', logoUrl: `content/Logos/rehau-logo-31.svg` },
            { _id: '32', name: 'E3 Edge Bands', logoUrl: `content/Logos/E3-Edge_bands-Logo-32.webp` },
            { _id: '33', name: '3M', logoUrl: `content/Logos/3M_Logo-33.svg` },
            { _id: '34', name: 'Fevicol', logoUrl: `content/Logos/Fevicol-34.svg` },
            { _id: '35', name: 'Wacker', logoUrl: `content/Logos/wacker-35.svg` },
            { _id: '36', name: 'Bestply', logoUrl: `content/Logos/Bestply-logo-36.webp` },
            // New Items
            { _id: '37', name: 'Tek Bond', logoUrl: `content/Logos/Tek-Bond-37.webp` },
            { _id: '38', name: 'Asashi India', logoUrl: `content/Logos/ASAHI-38.png` },
            { _id: '39', name: 'Gold Plus', logoUrl: `content/Logos/GOLD PLUS-39.png` },
            { _id: '40', name: 'Hettich', logoUrl: `content/Logos/HETTICH-40.webp` },
            { _id: '41', name: 'Ebco', logoUrl: `content/Logos/EBCO-41.webp` },
            { _id: '42', name: 'Sleek', logoUrl: `content/Logos/SLEEK-42.png` },
            { _id: '43', name: 'Haefele', logoUrl: `content/Logos/haefele_logo-43.png` }
        ];

        // Map to interface
        this.partners.set(p.map(item => ({
            _id: item._id,
            name: item.name,
            logoUrl: item.logoUrl,
            altText: item.name
        })));
    }
}
