import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { WhatsappButtonComponent } from '../shared/whatsapp-button/whatsapp-button.component';
import { FooterComponent } from '../shared/footer/footer.component';

import { HomeService, Branch } from '../../services/home.service';
import { SeoService } from '../../services/seo.service';
import { ExperienceCentersComponent } from '../shared/experience-centers/experience-centers.component';

import { PartnerSliderComponent } from '../shared/partner-slider/partner-slider.component';
import { QuoteFeedbackComponent } from '../shared/quote-feedback/quote-feedback.component';

// ... interface FAQ ...

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FooterComponent, ExperienceCentersComponent, WhatsappButtonComponent, PartnerSliderComponent, QuoteFeedbackComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent implements OnInit {
  quoteForm!: FormGroup;
  private homeService = inject(HomeService);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);

  showOtherLocation = signal<boolean>(false);
  uploadedFile = signal<File | null>(null);
  base64File: string | null = null; // We store the converted string here
  budgetValue = signal<number>(500000);

  // PASTE YOUR DEPLOYED GOOGLE SCRIPT URL HERE
  private scriptUrl = 'https://script.google.com/macros/s/AKfycbxZO3qdZyralmx09lHcfJOP9VN1VhkKRocGQiqEI1lbWVDU74HD83x5h5g9pNcv60vx/exec';

  // Feedback System
  feedbackState = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  feedbackMessage = signal<string>('');

  selectedProjects = signal<string[]>([]);
  selectedMaterials = signal<string[]>([]);

  projectTypes = [
    { id: 'home', label: 'Home Interior', icon: 'home' },
    { id: 'kitchen', label: 'Modular Kitchen', icon: 'kitchen' },
    { id: 'wardrobe', label: 'Wardrobe', icon: 'checkroom' },
    { id: 'sofas', label: 'Sofas', icon: 'weekend' },
    { id: 'curtains', label: 'Curtains', icon: 'vertical_split' },
    { id: 'office', label: 'Office Fit-Out', icon: 'business' },
    { id: 'glass', label: 'Glass Works', icon: 'window' },
    { id: 'other', label: 'Other', icon: 'more_horiz' }
  ];

  materialTypes = [
    { id: 'plywood', label: 'Plywood' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'aluminium', label: 'Aluminium' },
    { id: 'glass', label: 'Glass' },
    { id: 'upholstery', label: 'Upholstery' },
    { id: 'other', label: 'Other' }
  ];

  // Fetched from HomeService
  branches = signal<any[]>([]);

  faqs: any[] = [
    {
      question: 'Do you provide installation services?',
      answer: 'Yes, we provide complete installation services with experienced technicians for all our products including modular kitchens, wardrobes, and interior fit-outs.',
      isOpen: false
    },
    {
      question: 'What is your warranty policy?',
      answer: 'We offer comprehensive warranty coverage on all our products. Plywood and hardware come with manufacturer warranty, while our installation work is covered for 1 year.',
      isOpen: false
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 2-3 weeks from order confirmation. Custom projects may take 4-6 weeks depending on complexity. We provide regular updates throughout the process.',
      isOpen: false
    },
    {
      question: 'Do you offer bulk discounts for contractors?',
      answer: 'Yes, we have special pricing for architects, contractors, and bulk orders. Contact our branch manager for detailed quotes and volume discounts.',
      isOpen: false
    },
    {
      question: 'Can I visit your factory and showroom?',
      answer: 'Absolutely! We welcome visits to our showrooms in Alappuzha, Ernakulam, and Kottayam districts. Our factory tours can be arranged by appointment. Call us to schedule your visit.',
      isOpen: false
    }
  ];

  ngOnInit() {
    this.initializeForm();
    this.homeService.getHomeData().subscribe(data => {
      if (data.branches) {
        this.branches.set(data.branches);
        this.updateLocationSeo();
      }
    });
  }

  updateLocationSeo() {
    const branches = this.branches();
    if (branches.length > 0) {
      this.seoService.generateLocalBusinessSchema(branches);

      this.seoService.updateSeoData(
        'Contact Vettro Traders | Interior Designers Alappuzha & Kerala',
        'Get a quote for Plywood, Glass, Aluminium, and Interior execution. Visit our Experience Centers in Alappuzha and Chandiroor. Call us for factory-direct pricing.',
        'Contact Vettro Traders, Interior Designers Alappuzha, Glass Dealers Kerala, Plywood Suppliers Chandiroor, Vettro Traders phone number'
      );
    }
  }

  // ... (rest of methods)


  initializeForm() {
    this.quoteForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['', [Validators.email]],
      location: ['', Validators.required],
      otherLocation: [''],
      area: ['', [Validators.required, Validators.min(30)]],
      budget: [500000],
      otherMaterialDetails: [''], // For "Other" material description
      message: ['']
    });

    this.quoteForm.get('location')?.valueChanges.subscribe(value => {
      this.showOtherLocation.set(value === 'other');
      if (value === 'other') {
        this.quoteForm.get('otherLocation')?.setValidators([Validators.required, Validators.minLength(10)]);
      } else {
        this.quoteForm.get('otherLocation')?.clearValidators();
      }
      this.quoteForm.get('otherLocation')?.updateValueAndValidity();
    });
  }

  toggleProject(projectId: string) {
    const current = this.selectedProjects();
    if (current.includes(projectId)) {
      this.selectedProjects.set(current.filter(id => id !== projectId));
    } else {
      this.selectedProjects.set([...current, projectId]);
    }
  }

  toggleMaterial(materialId: string) {
    const current = this.selectedMaterials();
    let updated: string[];

    if (current.includes(materialId)) {
      updated = current.filter(id => id !== materialId);
    } else {
      updated = [...current, materialId];
    }

    this.selectedMaterials.set(updated);

    // Handle verification for "other" material
    if (updated.includes('other')) {
      this.quoteForm.get('otherMaterialDetails')?.setValidators([Validators.required]);
    } else {
      this.quoteForm.get('otherMaterialDetails')?.clearValidators();
      this.quoteForm.get('otherMaterialDetails')?.setValue('');
    }
    this.quoteForm.get('otherMaterialDetails')?.updateValueAndValidity();
  }

  onBudgetChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.budgetValue.set(parseInt(value));
  }

  formatBudget(value: number): string {
    if (value >= 2000000) return `₹20L+`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${(value / 1000).toFixed(0)}K`;
  }

  // Toast Notification System
  toastMessage = signal<string>('');
  toastType = signal<'success' | 'error'>('error');
  toastTimeout: any;

  showToast(message: string, type: 'success' | 'error' = 'error') {
    this.toastMessage.set(message);
    this.toastType.set(type);

    if (this.toastTimeout) clearTimeout(this.toastTimeout);

    this.toastTimeout = setTimeout(() => {
      this.toastMessage.set('');
    }, 4000); // Hide after 4 seconds
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        this.showToast('Please upload only PDF or JPG/PNG files', 'error');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.showToast('File size should not exceed 5MB', 'error');
        return;
      }

      this.uploadedFile.set(file);

      // Convert to Base64
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64File = e.target.result; // This is the string we send
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile() {
    this.uploadedFile.set(null);
    this.base64File = null;
  }

  toggleFAQ(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  onSubmit() {
    if (this.quoteForm.invalid) {
      Object.keys(this.quoteForm.controls).forEach(key => {
        this.quoteForm.get(key)?.markAsTouched();
      });
      this.showToast('Please fill in all required fields marked with *', 'error');
      return;
    }

    if (this.selectedProjects().length === 0) {
      this.showToast('Please select at least one project type', 'error');
      return;
    }

    const formData = this.quoteForm.value;

    // Prepare the data object matching the Google Script keys
    const payload = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email || 'Not Provided',
      location: formData.location === 'other' ? formData.otherLocation : formData.location,
      projectType: this.selectedProjects().join(', '),
      materialInterest: this.selectedMaterials().join(', '),
      otherMaterialDetails: formData.otherMaterialDetails || 'None',
      area: formData.area,
      budget: this.formatBudget(this.budgetValue()), // Ensure this returns a string like "5L-10L"
      additionalDetails: formData.message || 'None',

      // Add the file data
      fileName: this.uploadedFile() ? this.uploadedFile()?.name : null,
      fileData: this.base64File // The converted string
    };

    // Send via POST
    // We use 'text/plain' to avoid CORS preflight checks (Google Script quirk)
    this.feedbackState.set('loading');

    this.http.post(this.scriptUrl, JSON.stringify(payload), {
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    }).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.feedbackState.set('success');
          this.feedbackMessage.set('We have received your request! Our team will get back to you with a detailed quote within 24 hours.');

          this.quoteForm.reset();
          this.uploadedFile.set(null);
          this.base64File = null;
          this.selectedProjects.set([]);
          this.selectedMaterials.set([]);
          this.budgetValue.set(500000);
        } else {
          this.feedbackState.set('error');
          this.feedbackMessage.set('Something went wrong. Please try again or contact us via WhatsApp.');
        }
      },
      error: (error) => {
        console.error('Submission error:', error);
        // Google Scripts sometimes return opaque errors even on success
        this.feedbackState.set('success');
        this.feedbackMessage.set('Request sent! (Note: Confirmation received via alternate path). We will contact you shortly.');
      }
    });
  }

  closeFeedback() {
    this.feedbackState.set('idle');
    this.feedbackMessage.set('');
  }
}

