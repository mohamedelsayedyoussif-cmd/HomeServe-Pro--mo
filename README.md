
# HomeServe Pro Landing Page

A high-converting, production-ready landing page for home services in Egypt. Built with React, Tailwind CSS, Framer Motion, and Three.js.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Customizing the Google Maps Embed

The `MapEmbed.tsx` component uses a Google Maps iframe. To update it with your specific office location:

1. Go to [Google Maps](https://www.google.com/maps).
2. Search for your business or exact location.
3. Click the **Share** button.
4. Select the **Embed a map** tab.
5. Copy the HTML provided (e.g., `<iframe src="..." ...></iframe>`).
6. **Extract the `src` attribute value** (the URL inside the quotes).
7. Locate the `embedUrl` variable in `components/MapEmbed.tsx` and paste the full URL there.

## Features

- **Bilingual Support:** Full Arabic (Egyptian-friendly) and English support with RTL/LTR switching.
- **3D Graphics:** Lightweight isometric house and floating tools using React Three Fiber.
- **Lazy Loading:** 3D scenes and Maps are only loaded when they enter the viewport using IntersectionObserver.
- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Conversions:** Multiple CTAs leading to a booking modal and WhatsApp integration.
- **Emergency Support:** Dedicated orange toggle for urgent maintenance requests.

## Deployment

This project is ready to be deployed to **Vercel** or **GitHub Pages**. Simply connect your repository to Vercel for automatic deployments.
