
import { HomeData } from '../services/home.service';

export const SITE_DATA: HomeData = {
    brands: [
        { _id: '1', name: 'Vettro Traders', description: 'Plywood', icon: 'layers', route: '/products/plywood', color: '#8B4513' },
        { _id: '2', name: 'Real Glass', description: 'Glass', icon: 'window', route: '/products/glass', color: '#87CEEB' },
        { _id: '3', name: 'Venice Metals', description: 'Aluminium', icon: 'grid_on', route: '/products/aluminium', color: '#C0C0C0' },
        { _id: '4', name: 'Venice Furnishings', description: 'Decor', icon: 'deck', route: '/products/decor', color: '#FFD700' },
        { _id: '5', name: 'V-Decor', description: 'Execution', icon: 'handyman', route: '/services/execution', color: '#FF6347' }
    ],
    branches: [
        {
            _id: '1',
            name: 'Vettro Traders (Head Office)',
            location: 'D No:184-D,I,G North of GHS SCHOOL East of NH-66 Chandiroor P.O, Alappuzha, Kerala 688537',
            managerName: 'Abdul Salim',
            managerRole: 'Managing Director',
            managerPhone: '+91 944 777 2931 / +91 944 616 6775',
            managerPhoto: 'content/images/Abdul%20Salim%20sir.webp',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vettro+Traders+Alappuzha',
            iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.702109623134!2d76.3073818!3d9.853207099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0871e7873f87b3%3A0x9031f42ecd2ee004!2sVettro%20Traders!5e1!3m2!1sen!2sin!4v1770789342070!5m2!1sen!2sin',
            socialLinks: { whatsapp: 'https://wa.me/919447772931', instagram: 'https://instagram.com/vettro' }
        },
        {
            _id: '2',
            name: 'Real Glass & Paints',
            location: 'South of Thiruvambadi junction, Alappuzha City, Kerala 688002',
            managerName: 'Branch Manager',
            managerRole: 'Branch Manager',
            managerPhone: '+91 808 923 9331',
            managerPhoto: 'content/images/Abdul%20Salim%20sir.webp',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=Real+Glass+%26+Paints+Alappuzha',
            iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31430.3804812345!2d76.328!3d9.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjknMjQuMCJOIDc2wrAxOSc0OC4wIkU!5e0!3m2!1sen!2sin',
            socialLinks: { whatsapp: 'https://wa.me/918089239331', instagram: 'https://instagram.com/realglass' }
        },
        {
            _id: '3',
            name: 'Venice Metals',
            location: 'South of Thiruvambadi junction, Alappuzha City, Kerala 688002',
            managerName: 'Branch Manager',
            managerRole: 'Branch Manager',
            managerPhone: '+91 949 525 4555',
            managerPhoto: 'content/images/Abdul%20Salim%20sir.webp',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=Venice+Metals+Alappuzha',
            iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31430.3804812345!2d76.328!3d9.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjknMjQuMCJOIDc2wrAxOSc0OC4wIkU!5e0!3m2!1sen!2sin',
            socialLinks: { whatsapp: 'https://wa.me/919495254555', instagram: 'https://instagram.com/venicemetals' }
        },
        {
            _id: '4',
            name: 'Venice Furnishings',
            location: 'South of Thiruvambadi junction, Alappuzha City, Kerala 688002',
            managerName: 'Shanavas',
            managerRole: 'Partner',
            managerPhone: '+91 949 597 2931',
            managerPhoto: 'content/images/Shanavas_veniceFurnishing.webp',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=Venice+Furnishings+Alappuzha',
            iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31430.3804812345!2d76.328!3d9.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjknMjQuMCJOIDc2wrAxOSc0OC4wIkU!5e0!3m2!1sen!2sin',
            socialLinks: { whatsapp: 'https://wa.me/919495972931', instagram: 'https://instagram.com/venicefurnishings' }
        },
        {
            _id: '5',
            name: 'V-Decor',
            location: 'North of GHS SCHOOL East of NH-66 Chandiroor P.O, Alappuzha, Kerala 688537',
            managerName: 'Branch Manager',
            managerRole: 'Branch Manager',
            managerPhone: '+91 944 777 2931',
            managerPhoto: 'content/images/Abdul%20Salim%20sir.webp',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vettro+Traders+Alappuzha',
            iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000.0!2d76.30!3d9.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTEnMTEuNSJOIDc2wrAxOCcyNi42IkU!5e0!3m2!1sen!2sin',
            socialLinks: { whatsapp: 'https://wa.me/919447772931', instagram: 'https://instagram.com/vdecor' }
        }
    ],
    partners: [
        { _id: '1', name: 'Sarom', logoUrl: 'content/Logos/SaromLogoBlack.svg', altText: 'Sarom Fabrics' },
        { _id: '2', name: 'D-Decor', logoUrl: 'content/Logos/D-decor_Logo.svg', altText: 'D-Decor Upholstery' },
        { _id: '3', name: 'GM', logoUrl: 'content/Logos/gm-fabric_logo.svg', altText: 'GM Fabrics' },
        { _id: '4', name: 'Kurlon', logoUrl: 'content/Logos/kurlon_logo.webp', altText: 'Kurlon Mattress' },
        { _id: '5', name: 'Sunidra', logoUrl: 'content/Logos/sunidra_logo.webp', altText: 'Sunidra Mattress' },
        { _id: '6', name: 'Peps', logoUrl: 'content/Logos/Peps_Logo.webp', altText: 'Peps Mattress' },
        { _id: '7', name: 'Spring-fit', logoUrl: 'content/Logos/springfit_logo.avif', altText: 'Spring Fit' },
        { _id: '8', name: 'Sleepy Head', logoUrl: 'content/Logos/Sleepy Head_logo.webp', altText: 'Sleepy Head' },
        { _id: '9', name: 'Cirrus', logoUrl: 'content/Logos/cirrus-logo.svg', altText: 'Cirrus' },
        { _id: '10', name: 'Nilkamal', logoUrl: 'content/Logos/NILKAMAL_SLEEP_CTC_Horizontal_logo.svg', altText: 'Nilkamal' },
        { _id: '11', name: 'Fam Foam', logoUrl: 'content/Logos/Fam Foam_logo.webp', altText: 'Fam Foam' },
        { _id: '12', name: 'Dr. Back', logoUrl: 'content/Logos/Dr Back_logo.webp', altText: 'Dr. Back' }
    ],
    heroVideos: [
        'content/videos/hero_interior design_1080_60fps.mp4',
        'content/videos/hero_interior design_60fps.mp4'
    ],
    gallery: Array.from({ length: 52 }, (_, i) => {
        const id = i + 1;
        // All images converted to webp
        return {
            _id: `g${id}`,
            category: 'Exclusive Interiors',
            imageUrl: `/content/images/imgShowcase-${id}.webp`,
            altText: `Project Showcase ${id}`
        };
    })
};
