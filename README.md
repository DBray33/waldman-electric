# Waldman Electrical Contractors Website

## Overview

This repository contains the website for Waldman Electrical Contractors, a family-owned electrical services business established in 1918 and serving Berks County, PA, and surrounding areas. The website showcases their residential and commercial electrical services, generator installation and maintenance, and lightning protection systems.

## Site Structure

The website consists of the following pages:

- **Home** (`index.html`) - Main landing page with services overview
- **Electric Services**
  - Residential Electric (`residential-electric.html`)
  - Commercial Electric (`commercial-electric.html`)
- **Generators**
  - Automatic Generators (`automatic.html`)
  - Manual Generators (`manual.html`)
- **Lightning Protection** (`lightning-protection.html`)
- **Reviews & Testimonials**
  - Reviews (`reviews.html`)
  - Testimonials (`testimonials.html`)
- **About**
  - About Us (`about.html`)
  - Waldman History (`waldman-history.html`)
- **Gallery** (`gallery.html`)
- **Contact**
  - Contact Us (`contact.html`)
  - Request a Service (`request-a-service.html`)

## Technical Details

### HTML Structure

The site uses a modern HTML5 structure with semantic elements to improve accessibility and SEO. All pages follow a consistent template with shared header and footer sections.

### CSS Organization

- `styles.css` - Main stylesheet containing global styles
- `navbar.css` - Dedicated styles for the navigation components

### JavaScript Architecture

The JavaScript (`script.js`) follows a modular design pattern with separate concerns:

- **App** - Main namespace and initialization controller
- **MobileNavigation** - Handles mobile menu behavior
- **MediaElements** - Controls video and audio elements
- **HeaderBehavior** - Manages header appearance during scroll
- **BusinessHours** - Updates opening hours in real-time
- **ScrollBehavior** - Handles scroll-based animations and effects
- **ParallaxEffect** - Creates parallax scrolling effect on the hero section
- **ServicesAnimation** - Handles animations for service cards
- **TestimonialAnimations** - Controls testimonial section animations
- **ReasonCardAnimations** - Manages animations for "Why Choose Us" cards
- **BackToTopButton** - Implements back-to-top functionality

The codebase uses the IntersectionObserver API for scroll-based animations, providing better performance than scroll event listeners.

### Features

1. **Responsive Design** - Fully responsive layout that adapts to all screen sizes
2. **Mobile Navigation** - Touch-friendly mobile menu with dropdown support
3. **Real-time Business Hours** - Dynamic display of current open/closed status
4. **Parallax Effects** - Subtle parallax scrolling on the hero section
5. **Scroll Animations** - Elements animate into view as users scroll down the page
6. **Background Video** - Homepage features a background video with mute/unmute controls
7. **Testimonial Display** - Customer testimonials with star ratings
8. **Contact Options** - Multiple ways for customers to get in touch (phone, email, form)
9. **Back to Top Button** - Easy navigation back to the top of long pages

### Dependencies

- Font Awesome 6.4.0 - For icons
- Google Fonts - Nunito Sans and Poppins fonts

## SEO Optimization

The site includes a `sitemap.xml` file that helps search engines index all pages. The sitemap was last updated on April 29, 2025, and includes priority settings and change frequency for each page.

## Business Information

- **Phone**: (610) 372-0151
- **Toll Free**: (800) 672-0151
- **Email**: service@waldmanelectric.com
- **Business Hours**: Monday - Friday, 8:00 am - 4:00 pm
- **Special Services**: 24/7 Emergency Service, Same-Day Service

## Development Guidelines

### Adding New Pages

1. Create a new HTML file based on the existing template structure
2. Update the navigation links in all pages
3. Add the new page to `sitemap.xml` with appropriate priority and change frequency

### Adding New Features

To add a new JavaScript module:

1. Create a new module object following the pattern in `script.js`
2. Implement the `init()` method with your functionality
3. Add the module to the `registerModules` array in `App.init()`

### CSS Guidelines

- Use the existing CSS variables for consistent colors and spacing
- Follow the established naming conventions
- Add page-specific styles at the bottom of the stylesheet

## Deployment

The site is designed to be deployed to any standard web hosting service. All paths are relative, allowing for deployment in any directory.

## Maintenance

Regular updates should include:

- Checking and updating business hours if changed
- Adding new testimonials to the reviews section
- Updating the `sitemap.xml` file when adding or modifying pages
- Validating contact information is current

---

© 2025 Waldman Electrical Contractors - All Rights Reserved
