import { Injectable, signal } from '@angular/core';

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    image?: string;
    availableAt: string[]; // Branch IDs
    brands?: string[];
    specifications?: Record<string, string>;
}

export interface ProductHub {
    id: string;
    name: string;
    description: string;
    icon: string;
    heroImage?: string;
    products: Product[];
    relatedServices?: Service[];
}

export interface Service {
    id: string;
    name: string;
    description: string;
    icon: string;
    image?: string;
    category: string;
}

export interface ManufacturingItem {
    id: string;
    name: string;
    description: string;
    image?: string;
}

@Injectable({
    providedIn: 'root'
})
export class GalleryService {
    // Base URL for images served from backend -> Now local assets (served from root)
    private readonly IMAGE_BASE_URL = '/content/images/gallery/';

    // Branch IDs
    readonly branches = {
        vettroTraders: 'vettro-traders',
        veniceFurnishings: 'venice-furnishings',
        veniceMetals: 'venice-metals',
        realGlass: 'real-glass',
        vDecor: 'v-decor'
    };

    // Get all branches array
    getAllBranches(): string[] {
        return Object.values(this.branches);
    }

    // THE CORE YARD - Structural Materials
    getCoreYardProducts(): Product[] {
        const allBranches = this.getAllBranches();
        return [
            {
                id: 'marine-plywood',
                name: 'Marine Plywood (BWP)',
                description: 'Premium waterproof plywood for exterior and high-moisture applications',
                category: 'Plywood',
                image: this.IMAGE_BASE_URL + 'MARINE PLYWOOD-gallery01.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                specifications: { thickness: '4mm - 25mm', grade: 'IS 710' }
            },
            {
                id: 'commercial-plywood',
                name: 'Commercial Plywood (BWR)',
                description: 'Boiling Water Resistant plywood for dryinterior use',
                category: 'Plywood',
                image: this.IMAGE_BASE_URL + 'COMMERCIAL PLYWOOD-gallery03.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            },
            {
                id: 'hdhmr',
                name: 'HDHMR Board',
                description: 'High Density High Moisture Resistant engineered wood board',
                category: 'Engineered Wood',
                image: this.IMAGE_BASE_URL + 'HDHMR-gallery04.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                specifications: { thickness: '6mm - 25mm', density: '750+ kg/m³' }
            },
            {
                id: 'mdf',
                name: 'MDF Board',
                description: 'Medium Density Fiberboard for furniture and interiors',
                category: 'Engineered Wood',
                image: this.IMAGE_BASE_URL + 'MDF-gallery05.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                specifications: { thickness: '3mm - 30mm' }
            },
            {
                id: 'century-hdf',
                name: 'Century HDF',
                description: 'High Density Fiberboard with superior strength',
                category: 'Engineered Wood',
                image: this.IMAGE_BASE_URL + 'CENTURY HDF-gallery25.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                brands: ['Century']
            },
            {
                id: 'multi-wood',
                name: 'Multi Wood',
                description: 'Engineered blockboard for door frames and partitions',
                category: 'Blockboard',
                image: this.IMAGE_BASE_URL + 'MULTI WOOD-gallery08.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            },
            {
                id: 'wpc',
                name: 'WPC Board',
                description: 'Wood Plastic Composite - waterproof and termite resistant',
                category: 'Composite',
                image: this.IMAGE_BASE_URL + 'WPC-gallery09.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            },
            {
                id: 'particle-board',
                name: 'Particle Board',
                description: 'Cost-effective engineered wood for furniture backing',
                category: 'Engineered Wood',
                image: this.IMAGE_BASE_URL + 'PARTICLE BOARD-gallery10.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            },
            {
                id: 'gypsum-board',
                name: 'Gypsum Board',
                description: 'Drywall board for false ceiling and partition walls',
                category: 'Gypsum',
                image: this.IMAGE_BASE_URL + 'GYPSUM BOARD-gallery11.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                specifications: { thickness: '9mm, 12mm' }
            }
        ];
    }

    // THE SURFACE STUDIO - Aesthetics
    getSurfaceStudioProducts(): Product[] {
        const allBranches = this.getAllBranches();
        return [
            {
                id: 'mica',
                name: 'Decorative Mica',
                description: 'High-pressure laminate sheets for surface finishing',
                category: 'Laminates',
                image: this.IMAGE_BASE_URL + 'MICA-gallery06.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                brands: ['Merino', 'Greenlam', 'Century']
            },
            {
                id: 'merino-mica',
                name: 'Merino Mica',
                description: 'Premium decorative laminates with extensive design range',
                category: 'Laminates',
                image: this.IMAGE_BASE_URL + 'MERRINO MICA-gallery26.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                brands: ['Merino']
            },
            {
                id: 'greenlam-mica',
                name: 'Greenlam Mica',
                description: 'Eco-friendly decorative laminates',
                category: 'Laminates',
                image: this.IMAGE_BASE_URL + 'GREEN LAM MICA-gallery27.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                brands: ['Greenlam']
            },
            {
                id: 'laminates',
                name: 'Laminates (General)',
                description: 'Standard decorative laminates for furniture',
                category: 'Laminates',
                image: this.IMAGE_BASE_URL + 'LAMINATES-gallery07.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            },
            {
                id: 'acrylic-sheet',
                name: 'Acrylic Sheets',
                description: 'High-gloss acrylic panels for modern kitchen shutters',
                category: 'Acrylic',
                image: this.IMAGE_BASE_URL + 'ACRYLIC SHEET-gallery23.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                specifications: { thickness: '1mm - 3mm', finish: 'Glossy, Matte' }
            },
            {
                id: 'edge-band',
                name: 'Edge Band (PVC)',
                description: 'PVC edge banding for plywood and board finishing',
                category: 'Edge Banding',
                image: this.IMAGE_BASE_URL + 'EDGE BAND-gallery28.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            },
            {
                id: 'acrylic-edge-band',
                name: 'Acrylic Edge Band',
                description: 'Premium acrylic edge banding for seamless finish',
                category: 'Edge Banding',
                image: this.IMAGE_BASE_URL + 'ACRYLIC EDGE BAND-gallery29.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            }
        ];
    }

    // REAL GLASS GALLERY
    getRealGlassProducts(): Product[] {
        return [
            {
                id: 'glass',
                name: 'Float Glass',
                description: 'Standard clear glass for windows and partitions',
                category: 'Glass',
                image: this.IMAGE_BASE_URL + 'GLASS-gallery17.webp',
                availableAt: [this.branches.realGlass, this.branches.vettroTraders],
                specifications: { thickness: '3mm - 12mm' }
            },
            {
                id: 'toughened-glass',
                name: 'Toughened Glass',
                description: 'Heat-treated safety glass for doors and partitions',
                category: 'Glass',
                image: this.IMAGE_BASE_URL + 'TOUGHNED GLASS-gallery18.webp',
                availableAt: [this.branches.realGlass, this.branches.vettroTraders],
                specifications: { thickness: '5mm - 12mm' }
            },
            {
                id: 'coloured-glass',
                name: 'Coloured Glass',
                description: 'Tinted glass in various colors for aesthetic applications',
                category: 'Glass',
                image: this.IMAGE_BASE_URL + 'COLOURED GLASS-gallery19.webp',
                availableAt: [this.branches.realGlass, this.branches.vettroTraders]
            },
            {
                id: 'lacquer-glass',
                name: 'Lacquered Glass',
                description: 'Back-painted glass for kitchen backsplash and wall cladding',
                category: 'Glass',
                image: this.IMAGE_BASE_URL + 'LAQUAR GLASS-gallery24.webp',
                availableAt: [this.branches.realGlass, this.branches.vettroTraders],
                specifications: { thickness: '4mm - 6mm', customColors: 'Available' }
            },
            {
                id: 'design-glass',
                name: 'Designer Etched Glass',
                description: 'Frosted and etched glass with custom patterns',
                category: 'Glass',
                image: this.IMAGE_BASE_URL + 'DESIGN GLASS-gallery20.webp',
                availableAt: [this.branches.realGlass, this.branches.vettroTraders]
            },
            {
                id: 'clear-glass',
                name: 'Clear Glass',
                description: 'Crystal clear glass for maximum transparency',
                category: 'Glass',
                image: this.IMAGE_BASE_URL + 'CLEAR GLASS-gallery21.webp',
                availableAt: [this.branches.realGlass, this.branches.vettroTraders]
            }
        ];
    }

    // HARDWARE VAULT
    getHardwareProducts(): Product[] {
        const allBranches = this.getAllBranches();
        return [
            {
                id: 'kitchen-accessories',
                name: 'Kitchen Accessories',
                description: 'Modular kitchen fittings and storage solutions',
                category: 'Kitchen Hardware',
                image: this.IMAGE_BASE_URL + 'KITCHEN ACCESSORIES-gallery12.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            },
            {
                id: 'ebco-accessories',
                name: 'Ebco Kitchen Accessories',
                description: 'Premium Ebco brand modular kitchen fittings',
                category: 'Kitchen Hardware',
                image: this.IMAGE_BASE_URL + 'EBCO KITCHEN ACCESSORIES-gallery13.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                brands: ['Ebco']
            },
            {
                id: 'handles',
                name: 'Cabinet Handles',
                description: 'Decorative handles for furniture and cabinets',
                category: 'Hardware',
                image: this.IMAGE_BASE_URL + 'DOOR LOCK-gallery14.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            },
            {
                id: 'door-lock',
                name: 'Door Locks (Mechanical)',
                description: 'Standard mechanical door locks',
                category: 'Locks',
                image: this.IMAGE_BASE_URL + 'DOOR LOCK-gallery15.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            },
            {
                id: 'digital-lock',
                name: 'Digital Door Lock',
                description: 'Smart digital locks with keypad/biometric access',
                category: 'Locks',
                image: this.IMAGE_BASE_URL + 'DIGITAL DOOR LOCK-gallery16.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                specifications: { features: 'Keypad, Fingerprint, RFID' }
            }
        ];
    }

    // METAL WORKS
    getMetalWorksProducts(): Product[] {
        const allBranches = this.getAllBranches();
        return [
            {
                id: 'aluminium-profile',
                name: 'Aluminium Profiles',
                description: 'Extruded aluminium sections for windows and partitions',
                category: 'Aluminium',
                image: this.IMAGE_BASE_URL + 'ALUMINIUM PROFILE-gallery30.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass],
                specifications: { finish: 'Anodized, Powder Coated' }
            },
            {
                id: 'aluminium-fabrication',
                name: 'Aluminium Fabrication',
                description: 'Custom aluminium fabrication materials',
                category: 'Aluminium',
                image: this.IMAGE_BASE_URL + 'Aluminium fabrication materials_Venice Metals01.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'aluminium-extrusions',
                name: 'Aluminium Extrusions',
                description: 'High-quality aluminium extrusions for industrial use',
                category: 'Aluminium',
                image: this.IMAGE_BASE_URL + 'Aluminium extrusions_Venice Metals02.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'pvc-ceiling',
                name: 'PVC Ceiling Panels',
                description: 'Decorative PVC panels for false ceilings',
                category: 'Ceiling',
                image: this.IMAGE_BASE_URL + 'pvc ceiling panels_Venice Metals03.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'wpc-panels',
                name: 'WPC Wall Panels',
                description: 'Waterproof WPC panels for wall cladding',
                category: 'Wall Paneling',
                image: this.IMAGE_BASE_URL + 'WPC panels_Venice Metals04.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'wpc-louvers',
                name: 'WPC Louvers',
                description: 'Architectural WPC louvers for exterior and interior use',
                category: 'Cladding',
                image: this.IMAGE_BASE_URL + 'WPC louvers_Venice Metals05.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'acp-sheet',
                name: 'ACP Sheets',
                description: 'Aluminium Composite Panels for modern facades',
                category: 'Cladding',
                image: this.IMAGE_BASE_URL + 'Aluminium Composite Panel (ACP)_Venice Metals06.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'floor-spring',
                name: 'Floor Springs',
                description: 'Heavy-duty floor springs for glass doors',
                category: 'Hardware',
                image: this.IMAGE_BASE_URL + 'Floor spring_Venice Metals07.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'door-closer',
                name: 'Door Closers',
                description: 'Hydraulic door closers for controlled closing',
                category: 'Hardware',
                image: this.IMAGE_BASE_URL + 'Door Closer_Venice Metals08.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'patch-fittings',
                name: 'Glass Patch Fittings',
                description: 'Stainless steel patch fittings for glass doors',
                category: 'Hardware',
                image: this.IMAGE_BASE_URL + 'Glass Door Patch Fittings_Venice Metals09.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'metal-doors',
                name: 'Metal Doors',
                description: 'Durable metal doors for industrial and commercial use',
                category: 'Doors',
                image: this.IMAGE_BASE_URL + 'Doors_Venice Metals10.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'step-ladder',
                name: 'Aluminium Ladders',
                description: 'Foldable aluminium step ladders',
                category: 'Tools',
                image: this.IMAGE_BASE_URL + 'Aluminium Step Ladder_Venice Metals11.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'pvc-profiles',
                name: 'PVC Profiles',
                description: 'Extruded PVC profiles for multiple applications',
                category: 'PVC',
                image: this.IMAGE_BASE_URL + 'Pvc profiles_Venice Metals12.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'gypsum-accessories',
                name: 'Gypsum Accessories',
                description: 'Jointing compound, tape, and screws for gypsum work',
                category: 'Gypsum',
                image: this.IMAGE_BASE_URL + 'Gypsum_Venice Metals13.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'structural-glass',
                name: 'Structural Glass',
                description: 'Heavy gauge glass for structural applications',
                category: 'Glass',
                image: this.IMAGE_BASE_URL + 'Glass_Venice Metals14.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'calcium-silicate',
                name: 'Calcium Silicate Boards',
                description: 'Fire-resistant boards for partitions and ceilings',
                category: 'Board',
                image: this.IMAGE_BASE_URL + 'Calcium silicate_Venice Metals15.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'general-hardware',
                name: 'General Hardware',
                description: 'Nuts, bolts, screws, and fasteners',
                category: 'Hardware',
                image: this.IMAGE_BASE_URL + 'hardwares_Venice Metals16.webp',
                availableAt: [this.branches.veniceMetals]
            },
            {
                id: 'gypsum-channels',
                name: 'Gypsum Channels',
                description: 'Metal channels for gypsum ceiling framework',
                category: 'Gypsum Hardware',
                image: this.IMAGE_BASE_URL + 'GYPSUM CHANNELS-gallery22.webp',
                availableAt: [this.branches.vettroTraders, this.branches.realGlass]
            }
        ];
    }

    // DECOR & FURNISHINGS
    getDecorProducts(): Product[] {
        return [
            {
                id: 'fabric-curtains',
                name: 'Designer Curtains',
                description: 'Custom-made curtains with premium fabrics',
                category: 'Window Treatment',
                image: this.IMAGE_BASE_URL + 'Fabric curtains-Venice Furnishings & V - Decor 01.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'zebra-blinds',
                name: 'Zebra Blinds',
                description: 'Dual-layer blinds for light control',
                category: 'Window Treatment',
                image: this.IMAGE_BASE_URL + 'Zebra Blinds-Venice Furnishings & V - Decor 02.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'roman-blinds',
                name: 'Roman Blinds',
                description: 'Classic folding blinds for elegant interiors',
                category: 'Window Treatment',
                image: this.IMAGE_BASE_URL + 'Roman Blinds-Venice Furnishings & V - Decor 03.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'ripple-blinds',
                name: 'Ripple Blinds',
                description: 'Modern wave-fold blinds',
                category: 'Window Treatment',
                image: this.IMAGE_BASE_URL + 'Ripple Blinds-Venice Furnishings & V - Decor 04.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'furnishing-fabrics',
                name: 'Furnishing Fabrics',
                description: 'Wide range of upholstery and curtain fabrics',
                category: 'Fabrics',
                image: this.IMAGE_BASE_URL + 'Furnishing Fabrics-Venice Furnishings & V - Decor 05.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'pu-foam',
                name: 'PU Foam',
                description: 'High-density foam for sofas and mattresses',
                category: 'Upholstery',
                image: this.IMAGE_BASE_URL + 'PU Form-Venice Furnishings & V - Decor 06.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'rexine',
                name: 'Rexine Leather',
                description: 'Synthetic leather for furniture upholstery',
                category: 'Upholstery',
                image: this.IMAGE_BASE_URL + 'Rexin-Venice Furnishings & V - Decor 07.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'upholstery-materials',
                name: 'Upholstery Materials',
                description: 'Tools and materials for upholstery work',
                category: 'Upholstery',
                image: this.IMAGE_BASE_URL + 'Upholstery materials-Venice Furnishings & V - Decor 08.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'mattresses',
                name: 'Mattresses',
                description: 'Comfortable mattresses for a good night\'s sleep',
                category: 'Bedding',
                image: this.IMAGE_BASE_URL + 'Mattresses-Venice Furnishings & V - Decor 09.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'wallpapers',
                name: 'Designer Wallpapers',
                description: 'Imported wallpapers in various textures and patterns',
                category: 'Wall Decor',
                image: this.IMAGE_BASE_URL + 'Wallpapers-Venice Furnishings & V - Decor 10.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'bed-bath',
                name: 'Bed & Bath Linen',
                description: 'Premium bedsheets, pillows, and towels',
                category: 'Bedding',
                image: this.IMAGE_BASE_URL + 'Bed & bath-Venice Furnishings & V - Decor 11.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'luxury-mattresses',
                name: 'Luxury Mattresses',
                description: 'Premium orthopedic and memory foam mattresses',
                category: 'Bedding',
                image: this.IMAGE_BASE_URL + 'Laxuary Mattresses-Venice Furnishings & V - Decor 12.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'custom-sofas',
                name: 'Custom Sofas',
                description: 'Made-to-order sofas and couches',
                category: 'Furniture',
                image: this.IMAGE_BASE_URL + 'Sofas-Venice Furnishings & V - Decor 13.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            },
            {
                id: 'upholstery-works',
                name: 'Upholstery Services',
                description: 'Professional sofa repair and reupholstery',
                category: 'Services',
                image: this.IMAGE_BASE_URL + 'Upholestry-Venice Furnishings & V - Decor 14.webp',
                availableAt: [this.branches.veniceFurnishings, this.branches.vDecor]
            }
        ];
    }

    // ALL SERVICES
    getServices(): Service[] {
        return [
            {
                id: 'mica-pressing',
                name: 'Mica Pressing',
                description: 'Professional laminate pressing service with precision bonding',
                icon: 'compress',
                image: this.IMAGE_BASE_URL + 'MICA-PRESSING-service01.webp',
                category: 'surface-studio'
            },
            {
                id: 'cutting',
                name: 'Board Cutting',
                description: 'Accurate panel cutting to your specifications',
                icon: 'content_cut',
                image: this.IMAGE_BASE_URL + 'CUTTING-BOARD-service02.webp',
                category: 'core-yard'
            },
            {
                id: 'edge-banding',
                name: 'Edge Banding',
                description: 'Automated edge banding for seamless finish',
                icon: 'border_style',
                image: this.IMAGE_BASE_URL + 'EDGE-BANDING-service03.webp',
                category: 'surface-studio'
            },
            {
                id: 'multi-boring',
                name: 'Multi Boring',
                description: 'CNC multi-boring for hinge and fitting installation',
                icon: 'circle',
                image: this.IMAGE_BASE_URL + 'MULTI-BOARING-service04.webp',
                category: 'core-yard'
            },
            {
                id: 'grooving',
                name: 'Grooving',
                description: 'Precision grooving for panel inlays',
                icon: 'straighten',
                image: this.IMAGE_BASE_URL + 'GROOVING-service05.webp',
                category: 'core-yard'
            },
            {
                id: 'glass-polishing',
                name: 'Glass Polishing',
                description: 'Professional glass edge polishing and beveling',
                icon: 'auto_fix_high',
                image: this.IMAGE_BASE_URL + 'GLASS-POLISHING-service06.webp',
                category: 'real-glass'
            },
            {
                id: 'glass-etching',
                name: 'Glass Etching',
                description: 'Custom frosted designs on glass surfaces',
                icon: 'brush',
                image: this.IMAGE_BASE_URL + 'GLASS-ETCHING-service07.webp',
                category: 'real-glass'
            }
        ];
    }

    // MANUFACTURING ITEMS
    getManufacturingItems(): ManufacturingItem[] {
        return [
            {
                id: 'modular-kitchen',
                name: 'Modular Kitchen',
                description: 'Custom-designed modular kitchen with premium fittings and materials',
                image: this.IMAGE_BASE_URL + 'Modular-kitchen-Manufacturing01.webp'
            },
            {
                id: 'wardrobe',
                name: 'Wardrobe',
                description: 'Built-in and freestanding wardrobes with optimized storage',
                image: this.IMAGE_BASE_URL + 'Wardrobe-Manufacturing02.webp'
            },
            {
                id: 'tv-unit',
                name: 'TV Unit',
                description: 'Contemporary entertainment units with integrated storage',
                image: this.IMAGE_BASE_URL + 'Tv-unit-Manufacturing03.webp'
            },
            {
                id: 'prayer-unit',
                name: 'Prayer Unit',
                description: 'Traditional and modern prayer unit designs',
                image: this.IMAGE_BASE_URL + 'Prayer-unit-Manufacturing04.webp'
            }
        ];
    }

    // Get all product hubs with their products
    getProductHubs(): ProductHub[] {
        const services = this.getServices();

        return [
            {
                id: 'core-yard',
                name: 'The Core Yard',
                description: 'Structural materials for your interior foundation',
                icon: 'inventory_2',
                products: this.getCoreYardProducts(),
                relatedServices: services.filter(s => s.category === 'core-yard')
            },
            {
                id: 'surface-studio',
                name: 'The Surface Studio',
                description: 'Aesthetic finishes and decorative elements',
                icon: 'palette',
                products: this.getSurfaceStudioProducts(),
                relatedServices: services.filter(s => s.category === 'surface-studio')
            },
            {
                id: 'real-glass',
                name: 'Real Glass Gallery',
                description: 'Architectural glass solutions and mirrors',
                icon: 'diamond',
                products: this.getRealGlassProducts(),
                relatedServices: services.filter(s => s.category === 'real-glass')
            },
            {
                id: 'hardware-vault',
                name: 'Hardware Vault',
                description: 'Functional fittings and accessories',
                icon: 'settings',
                products: this.getHardwareProducts(),
                relatedServices: []
            },
            {
                id: 'metal-works',
                name: 'Metal Works',
                description: 'Aluminium profiles and metal systems',
                icon: 'construction',
                products: this.getMetalWorksProducts(),
                relatedServices: []
            },
            {
                id: 'decor-furnishings',
                name: 'Decor & Furnishings',
                description: 'Curtains, blinds, and interior styling',
                icon: 'chair',
                products: this.getDecorProducts(),
                relatedServices: []
            }
        ];
    }

    // Filter products by branch
    filterProductsByBranch(products: Product[], branchId: string): Product[] {
        if (branchId === 'all') {
            return products;
        }
        return products.filter(p => p.availableAt.includes(branchId));
    }
}
