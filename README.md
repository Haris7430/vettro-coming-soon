# Vettro Traders - The Integrated Interior Ecosystem

**Vettro Traders** is a premium interior solutions provider in Kerala, offering a complete ecosystem of manufacturing execution, material supply, and turnkey interior services. This repository contains the source code for the Vettro Traders web application, built with modern web technologies to deliver a high-end, cinematic user experience.

## 🚀 Key Features

*   **Integrated Ecosystem**: Showcases 5 specialized sub-brands (Vettro Traders, Venice Furnishings, Venice Metals, Real Glass, V-Decor) under one unified platform.
*   **Dynamic Visuals**: Features a cinematic "Vision" section, parallax scrolling, and high-quality video showcases.
*   **Product Gallery**: A comprehensive, filterable gallery displaying hundreds of products across Plywood, Glass, Hardware, and Decor categories.
*   **Location-Based SEO**: Automatic `LocalBusiness` Schema markup and dynamic meta tags for enhanced visibility in "near me" searches (Alappuzha, Chandiroor, etc.).
*   **Smart Contact Form**: Integrated with Google App Scripts for seamless lead generation, featuring file uploads and auto-validation.
*   **Performance Optimized**: Fully optimized assets (WebP images), lazy loading, and minimal bundle size for fast load times.

## 🛠️ Tech Stack

*   **Framework**: [Angular 17+](https://angular.io/) (Standalone Components, Signals)
*   **Styling**: Vanilla CSS (Variables, Glassmorphism, Animations)
*   **State Management**: Angular Signals & RxJS
*   **Analytics**: Vercel Analytics
*   **Deployment**: Ready for Vercel / Netlify (Static/SPA)

## 📂 Project Structure

```
src/
├── app/
│   ├── components/      # UI Components (Home, Gallery, Contact, etc.)
│   ├── data/            # Static Data (site-data.ts - Single Source of Truth)
│   ├── services/        # Business Logic (HomeService, SeoService)
│   └── shared/          # Reusable Widgets (Footer, Navbar, WhatsApp Button)
├── content/             # Public Assets (Images, Videos, Logos)
└── index.html           # Entry Point (SEO Meta Tags, Fonts)
```

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/vettro-traders.git
    cd vettro-traders
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

4.  **Build for Production:**
    ```bash
    ng build
    ```
    The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is proprietary software belonging to **Vettro Traders**. All rights reserved.

---

**Contact**: [Vettro Traders](https://vettrotraders.com) | Alappuzha, Kerala
