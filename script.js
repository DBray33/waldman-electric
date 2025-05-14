/**
 * =====================================================
 * WaldmanElectric - Site JavaScript
 * =====================================================
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all modules
  App.init();
});

// Main application namespace
const App = {
  // Initialize all modules
  init: function () {
    // Register all modules here
    this.registerModules([
      MobileNavigation,
      MediaElements,
      HeaderBehavior,
      BusinessHours,
      ScrollBehavior,
      ParallaxEffect,
      ServicesAnimation,
      TestimonialAnimations,
      ReasonCardAnimations,
      BackToTopButton,
      PageHeaderPositioning,
      ServiceCardsAnimation,
      ChartAnimation,
      FeatureCardAnimations,
      LightboxModule,
      ReviewsPageHeaderFix,
      NavigationActiveLink,
      GalleryModule,
      ReviewsFilter,
    ]);
  },

  // Register and initialize an array of modules
  registerModules: function (moduleArray) {
    moduleArray.forEach((module) => {
      if (module && typeof module.init === 'function') {
        module.init();
      }
    });
  },
};

/**
 * =====================================================
 * NAVIGATION ACTIVE LINK MODULE
 * =====================================================
 */
const NavigationActiveLink = {
  init: function () {
    this.setActiveNavLink();
  },

  setActiveNavLink: function () {
    const currentPath = window.location.pathname;

    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-links a');

    // Remove active class from all links
    navLinks.forEach((link) => {
      link.classList.remove('active');
    });

    // Add active class to matching links
    navLinks.forEach((link) => {
      const linkPath = link.getAttribute('href');

      // Check if the current path matches the link path
      // or if the current path contains the link path (for subdirectories)
      // but don't match homepage link (/) with other pages
      if (
        linkPath === currentPath ||
        (currentPath.includes(linkPath) && linkPath !== '/' && linkPath !== '#')
      ) {
        link.classList.add('active');

        // If this is a dropdown link, also mark the parent dropdown as active
        const parentLi = link.closest('li.dropdown');
        if (parentLi) {
          const dropdownToggle = parentLi.querySelector('a:first-child');
          if (dropdownToggle) {
            dropdownToggle.classList.add('active');
          }
        }
      }
    });
  },
};

/**
 * =====================================================
 * MOBILE NAVIGATION MODULE
 * =====================================================
 */
const MobileNavigation = {
  init: function () {
    // Mobile Navigation Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileLinks = document.querySelector('.mobile-links');
    const mobileDropdowns = document.querySelectorAll(
      '.mobile-links .dropdown'
    );
    const body = document.body;

    // Only initialize if required elements exist
    if (!menuToggle || !mobileLinks) return;

    // Close mobile menu
    function closeMobileMenu() {
      mobileLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      body.classList.remove('menu-open');
      menuToggle.classList.remove('fixed-position');

      // Close all mobile dropdowns
      mobileDropdowns.forEach((dropdown) =>
        dropdown.classList.remove('active')
      );
    }

    // Toggle mobile menu
    function toggleMobileMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      mobileLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      body.classList.toggle('menu-open');
      menuToggle.classList.toggle('fixed-position');

      // Close all dropdowns when menu is toggled
      mobileDropdowns.forEach((dropdown) =>
        dropdown.classList.remove('active')
      );
    }

    // Handle mobile dropdown clicks
    function handleMobileDropdownClick(e) {
      e.preventDefault();
      e.stopPropagation();

      const dropdown = this.closest('.dropdown');

      if (dropdown) {
        // Check if this dropdown is already active
        const isActive = dropdown.classList.contains('active');

        // Close all mobile dropdowns first
        mobileDropdowns.forEach((d) => d.classList.remove('active'));

        // If this one wasn't already active, open it
        if (!isActive) {
          dropdown.classList.add('active');
        }
      }
    }

    // Setup mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);

    // Setup mobile dropdown toggles
    mobileDropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector('a');
      if (link) {
        link.addEventListener('click', handleMobileDropdownClick);
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      // Only process for mobile view
      if (window.innerWidth <= 768) {
        // Don't close if clicking inside dropdown or toggle
        if (
          !e.target.closest('.mobile-links .dropdown') &&
          !e.target.closest('.menu-toggle')
        ) {
          // If clicking outside nav entirely, close mobile menu
          if (!e.target.closest('.mobile-links')) {
            closeMobileMenu();
          } else {
            // If clicking elsewhere in mobile nav, just close dropdowns
            mobileDropdowns.forEach((dropdown) =>
              dropdown.classList.remove('active')
            );
          }
        }
      }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  },
};

/**
 * =====================================================
 * MEDIA ELEMENTS MODULE
 * =====================================================
 */
const MediaElements = {
  init: function () {
    // Video and sound toggle controls
    const soundToggle = document.getElementById('sound-toggle');
    const video = document.getElementById('background-video');

    if (soundToggle && video) {
      soundToggle.addEventListener('click', function () {
        if (video.muted) {
          video.muted = false;
          soundToggle.innerHTML = '<i class="fas fa-volume-up"></i> Mute';
        } else {
          video.muted = true;
          soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i> Unmute';
        }
      });
    }
  },
};

/**
 * =====================================================
 * HEADER BEHAVIOR MODULE
 * =====================================================
 */
const HeaderBehavior = {
  init: function () {
    // Simplified header - always stays present
    const header = document.querySelector('header');

    if (header) {
      // Make header fixed from the start without animation
      header.classList.add('fixed');
    }
  },
};

/**
 * =====================================================
 * BUSINESS HOURS MODULE
 * =====================================================
 */
const BusinessHours = {
  init: function () {
    // Initialize business hours
    this.updateHours();

    // Update every minute
    setInterval(() => this.updateHours(), 60000);
  },

  updateHours: function () {
    // Select all open-status elements (both in hero and mobile nav)
    const hoursDisplays = document.querySelectorAll('.open-status');
    if (hoursDisplays.length === 0) return;

    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;

    const weekdayOpen = 8;
    const weekdayClose = 16;

    let statusHTML = '';
    let isOpen = false;

    if (day >= 1 && day <= 5) {
      if (currentTime >= weekdayOpen && currentTime < weekdayClose) {
        statusHTML = '<span class="status open">OPEN</span> Closes @ 4:00 pm';
        isOpen = true;
      } else {
        if (day === 5 && currentTime >= weekdayClose) {
          statusHTML = '<span class="status closed">CLOSED</span> Until Monday';
        } else {
          statusHTML =
            '<span class="status closed">CLOSED</span> Opens @ 8:00 am';
        }
      }
    } else {
      statusHTML = '<span class="status closed">CLOSED</span> Until Monday';
    }

    // Update all open-status elements with the same content
    hoursDisplays.forEach((display) => {
      display.innerHTML = statusHTML;

      if (isOpen) {
        display.classList.add('is-open');
        display.classList.remove('is-closed');
      } else {
        display.classList.add('is-closed');
        display.classList.remove('is-open');
      }
    });
  },
};

/**
 * =====================================================
 * SCROLL BEHAVIOR MODULE
 * =====================================================
 */
const ScrollBehavior = {
  init: function () {
    // Set up initial state
    this.handleScroll();

    // Set up scroll event listener
    window.addEventListener('scroll', () => this.handleScroll());

    // Handle window resize
    window.addEventListener('resize', () => this.handleScroll());
  },

  handleScroll: function () {
    // Only apply to screens wider than 768px
    if (window.innerWidth > 768) {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const hoursElement = document.querySelector('.hero-content .hours');

      if (hoursElement) {
        if (scrollPosition > 500) {
          hoursElement.classList.add('hours-hidden');
        } else {
          hoursElement.classList.remove('hours-hidden');
        }
      }
    }
  },
};

/**
 * =====================================================
 * PARALLAX EFFECT MODULE
 * =====================================================
 */
const ParallaxEffect = {
  init: function () {
    const parallax = document.querySelector('.parallax-bg');

    if (parallax) {
      // Parallax Scroll Effect for hero background
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallax.style.transform = `translateY(${scrolled * -0.2}px)`;
      });
    }
  },
};

/**
 * =====================================================
 * SERVICES ANIMATION MODULE
 * =====================================================
 */
const ServicesAnimation = {
  init: function () {
    const serviceCards = document.querySelectorAll('.service-card');

    if (serviceCards.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Trigger only once
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      serviceCards.forEach((card) => observer.observe(card));
    }
  },
};

/**
 * =====================================================
 * TESTIMONIAL ANIMATIONS MODULE
 * =====================================================
 */
const TestimonialAnimations = {
  init: function () {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');

    if (testimonialSlides.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Trigger only once
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -50px 0px', // Triggers a bit before the element is fully visible
        }
      );

      // Add a slight delay between each slide animation
      testimonialSlides.forEach((slide, index) => {
        // Add base class for initial styling
        slide.classList.add('fade-in-slide');

        // Set a sequential delay for each slide
        slide.style.transitionDelay = `${index * 150}ms`;

        // Observe each slide
        observer.observe(slide);
      });
    }
  },
};

/**
 * =====================================================
 * REASON CARD ANIMATIONS MODULE
 * =====================================================
 */
const ReasonCardAnimations = {
  init: function () {
    const reasonCards = document.querySelectorAll('.reason-card');

    if (reasonCards.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Trigger only once
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -30px 0px',
        }
      );

      // Add a staggered animation for the cards
      reasonCards.forEach((card, index) => {
        // Add base class for initial styling
        card.classList.add('fade-in-card');

        // Set a sequential delay for each card
        card.style.transitionDelay = `${index * 100}ms`;

        // Observe each card
        observer.observe(card);
      });
    }
  },
};

/**
 * =====================================================
 * BACK TO TOP BUTTON MODULE
 * =====================================================
 */
const BackToTopButton = {
  init: function () {
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
      // Show/hide button on scroll
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopBtn.style.display = 'flex';
        } else {
          backToTopBtn.style.display = 'none';
        }
      });

      // Smooth scroll to top
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }
  },
};

/**
 * =====================================================
 * PAGE HEADER POSITIONING MODULE
 * =====================================================
 */
const PageHeaderPositioning = {
  init: function () {
    // Get the header and any page header containers
    const header = document.querySelector('header');
    const pageHeaderContainers = document.querySelectorAll(
      '.page-header-intro-container, .wh-history-hero, .reviews-header, .contact-page-hero, .service-request-header, .lp-lightning-hero, .re-residential-hero, .ce-commercial-hero, .ag-generator-hero, .mg-manual-hero, .rv-reviews-hero, .ab-about-hero, .gl-gallery-hero, .privacy-content'
    );

    if (header && pageHeaderContainers.length > 0) {
      // Initial positioning - run immediately
      this.adjustPageHeaderPosition();

      // Run again after a short delay to ensure all elements are fully rendered
      setTimeout(() => this.adjustPageHeaderPosition(), 100);

      // And once more after page is fully loaded
      window.addEventListener('load', () => {
        this.adjustPageHeaderPosition();
        // Run one more time after a slight delay to handle any post-load rendering
        setTimeout(() => this.adjustPageHeaderPosition(), 200);
      });

      // Update on window resize
      window.addEventListener('resize', () => this.adjustPageHeaderPosition());

      // Also update when mobile menu toggles (which can change header height)
      const menuToggle = document.querySelector('.menu-toggle');
      if (menuToggle) {
        menuToggle.addEventListener('click', () => {
          // Use setTimeout to allow DOM to update after menu toggle
          setTimeout(() => this.adjustPageHeaderPosition(), 10);
        });
      }

      // Add a mutation observer to detect changes to the header's height
      const observer = new MutationObserver(() => {
        this.adjustPageHeaderPosition();
      });

      observer.observe(header, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      // Handle page visibility changes (when returning to the tab)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          setTimeout(() => this.adjustPageHeaderPosition(), 100);
        }
      });
    }
  },

  adjustPageHeaderPosition: function () {
    const header = document.querySelector('header');
    const pageHeaderContainers = document.querySelectorAll(
      '.page-header-intro-container, .wh-history-hero, .reviews-header, .contact-page-hero, .service-request-header, .lp-lightning-hero, .re-residential-hero, .ce-commercial-hero, .ag-generator-hero, .mg-manual-hero, .rv-reviews-hero, .ab-about-hero, .gl-gallery-hero, .privacy-content'
    );

    if (header && pageHeaderContainers.length > 0) {
      const headerHeight = header.offsetHeight;

      console.log('Adjusting header positioning. Header height:', headerHeight); // Add logging

      // Apply the header's height as margin-top to all page header containers
      pageHeaderContainers.forEach((container) => {
        container.style.marginTop = headerHeight + 'px';

        // Remove any fixed margin-top that might be in the CSS
        container.classList.add('js-positioned');

        // Ensure there's no gap - apply negative margin if needed
        const computedStyle = window.getComputedStyle(container);
        const paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;

        if (paddingTop > 0) {
          container.style.paddingTop = '0px';
        }

        console.log('Container adjusted:', container.className); // Add logging
      });
    }
  },
};
/**
 * =====================================================
 * SERVICE CARDS ANIMATION MODULE
 * =====================================================
 */
const ServiceCardsAnimation = {
  init: function () {
    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems.length === 0) return;

    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    // Function to handle scroll events
    function handleScroll() {
      serviceItems.forEach((item, index) => {
        if (isInViewport(item) && !item.classList.contains('card-visible')) {
          setTimeout(() => {
            item.classList.add('card-visible');
          }, index * 20);
        }
      });
    }

    // Run once on page load
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  },
};

/**
 * =====================================================
 * CHART ANIMATION MODULE - DIRECT APPROACH
 * =====================================================
 */
const ChartAnimation = {
  init: function () {
    // Set CSS variables for bar percentages
    const bars = document.querySelectorAll('.risk-comparison .bar');

    if (bars.length === 0) return;

    bars.forEach(function (bar) {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.setProperty('--percentage', percentage + '%');
    });

    // Simple counter animation for percentages
    const barGroups = document.querySelectorAll('.risk-comparison .bar-group');
    const valueDisplays = document.querySelectorAll(
      '.risk-comparison .bar-value'
    );

    function animateCounters() {
      valueDisplays.forEach(function (display, index) {
        const bar = barGroups[index].querySelector('.bar');
        const targetValue = parseInt(bar.getAttribute('data-percentage'));
        let currentValue = 0;

        const interval = setInterval(function () {
          currentValue += 1;
          if (currentValue > targetValue) {
            currentValue = targetValue;
            clearInterval(interval);
          }
          display.textContent = currentValue + '%';
        }, 25);
      });
    }

    // Trigger counters when the section is visible
    function isVisible(elem) {
      const rect = elem.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    }

    // Check if chart is visible and animate counters
    function checkVisibility() {
      const chart = document.querySelector('.risk-comparison');
      if (chart && isVisible(chart)) {
        setTimeout(animateCounters, 1000); // Start counters 1 second after chart is visible
        window.removeEventListener('scroll', checkVisibility);
      }
    }

    // Check on load and scroll
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
  },
};

/**
 * =====================================================
 * FEATURE CARD ANIMATIONS MODULE
 * =====================================================
 */
const FeatureCardAnimations = {
  init: function () {
    const featureCards = document.querySelectorAll('.feature-card');

    if (featureCards.length > 0) {
      // Create intersection observer for cards
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add a slight delay for better visual effect
              setTimeout(() => {
                entry.target.classList.add('visible');
              }, 100);
              observer.unobserve(entry.target); // Trigger only once
            }
          });
        },
        {
          threshold: 0.1, // Lower threshold to trigger earlier
          rootMargin: '0px 0px -10px 0px',
        }
      );

      // Add a slight delay before starting any animations to ensure page is fully loaded
      setTimeout(() => {
        // Process each feature card with staggered start
        featureCards.forEach((card, index) => {
          setTimeout(() => {
            observer.observe(card);
          }, index * 50); // Small staggered delay for observer initialization
        });
      }, 100);
    }
  },
};

/**
 * =====================================================
 * REVIEWS PAGE HEADER FIX MODULE
 * =====================================================
 */
const ReviewsPageHeaderFix = {
  init: function () {
    // Check if we're on the reviews page by looking for the reviews-header element
    const reviewsHeader = document.querySelector('.reviews-header');
    if (!reviewsHeader) return;

    // Get the header element (navbar)
    const header = document.querySelector('header');
    if (!header) return;

    // Function to adjust the reviews header position
    const adjustReviewsHeaderPosition = () => {
      const headerHeight = header.offsetHeight;
      reviewsHeader.style.marginTop = headerHeight + 'px';
    };

    // Initial adjustment
    adjustReviewsHeaderPosition();

    // Adjust on window resize
    window.addEventListener('resize', adjustReviewsHeaderPosition);

    // Adjust when mobile menu toggles (which can change header height)
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        // Use setTimeout to allow DOM to update after menu toggle
        setTimeout(adjustReviewsHeaderPosition, 10);
      });
    }
  },
};

/**
 * =====================================================
 * REVIEWS/TESTIMONIALS SORTER
 * =====================================================
 */
/**
 * Reviews Filter Module
 * Handles the sorting/filtering of reviews between Google and Testimonial types
 */
const ReviewsFilter = {
  init: function () {
    // Check if we're on the reviews page (has filter buttons)
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;

    // Get all review elements
    const googleReviews = document.querySelectorAll('.google-review');
    const testimonialReviews = document.querySelectorAll('.testimonial-review');

    // Initialize event listeners for filter buttons
    this.initFilterButtons(filterBtns, googleReviews, testimonialReviews);
  },

  /**
   * Initialize filter button click handlers
   * @param {NodeList} filterBtns - Filter button elements
   * @param {NodeList} googleReviews - Google review elements
   * @param {NodeList} testimonialReviews - Testimonial review elements
   */
  initFilterButtons: function (filterBtns, googleReviews, testimonialReviews) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Get the filter type from data attribute
        const filter = btn.getAttribute('data-filter');

        // Apply filtering based on selection
        this.filterReviews(filter, googleReviews, testimonialReviews);
      });
    });
  },

  /**
   * Show/hide reviews based on selected filter
   * @param {string} filter - Filter type: 'all', 'google', or 'testimonial'
   * @param {NodeList} googleReviews - Google review elements
   * @param {NodeList} testimonialReviews - Testimonial review elements
   */
  filterReviews: function (filter, googleReviews, testimonialReviews) {
    switch (filter) {
      case 'all':
        // Show all reviews
        this.showElements(googleReviews);
        this.showElements(testimonialReviews);
        break;

      case 'google':
        // Show Google reviews, hide testimonials
        this.showElements(googleReviews);
        this.hideElements(testimonialReviews);
        break;

      case 'testimonial':
        // Show testimonials, hide Google reviews
        this.hideElements(googleReviews);
        this.showElements(testimonialReviews);
        break;

      default:
        // Default to showing all
        this.showElements(googleReviews);
        this.showElements(testimonialReviews);
    }
  },

  /**
   * Show a collection of elements
   * @param {NodeList} elements - Elements to show
   */
  showElements: function (elements) {
    elements.forEach((el) => {
      el.classList.remove('hidden-review');
    });
  },

  /**
   * Hide a collection of elements
   * @param {NodeList} elements - Elements to hide
   */
  hideElements: function (elements) {
    elements.forEach((el) => {
      el.classList.add('hidden-review');
    });
  },
};

// Don't forget to register the module in your App.init function
// Add this to your modules array:
// ReviewsFilter,

/**
 * =====================================================
 * LIGHTBOX MODULE
 * =====================================================
 */
const LightboxModule = {
  init: function () {
    // Get all "See Images" buttons
    const seeImagesButtons = document.querySelectorAll('.see-images-btn');

    // Get all lightboxes
    const lightboxes = document.querySelectorAll('.lightbox');

    // Get all close buttons - updated class name to match your HTML
    const closeButtons = document.querySelectorAll('.close-lightbox-lightning');

    if (!seeImagesButtons.length && !lightboxes.length) return;

    // Add click event to each "See Images" button
    seeImagesButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const lightboxType = this.getAttribute('data-lightbox');
        const lightbox = document.getElementById(`${lightboxType}-lightbox`);
        if (lightbox) {
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent scrolling while lightbox is open

          // Ensure close button is visible - updated class name
          const closeBtn = lightbox.querySelector('.close-lightbox-lightning');
          if (closeBtn) {
            closeBtn.style.display = 'flex';

            // Add a small animation to draw attention to the close button
            setTimeout(() => {
              closeBtn.style.transform = 'scale(1.2)';
              setTimeout(() => {
                closeBtn.style.transform = 'scale(1)';
              }, 200);
            }, 300);
          }
        }
      });
    });

    // Add click event to each close button
    closeButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const lightbox = this.closest('.lightbox');
        if (lightbox) {
          lightbox.classList.remove('active');
          document.body.style.overflow = ''; // Restore scrolling
        }
      });
    });

    // Close lightbox when clicking outside the content
    lightboxes.forEach((lightbox) => {
      lightbox.addEventListener('click', function (e) {
        if (e.target === this) {
          this.classList.remove('active');
          document.body.style.overflow = ''; // Restore scrolling
        }
      });
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const activeLightbox = document.querySelector('.lightbox.active');
        if (activeLightbox) {
          activeLightbox.classList.remove('active');
          document.body.style.overflow = ''; // Restore scrolling
        }
      }
    });

    // Fix for horizontal scrollbar - reset content width when opening lightbox
    seeImagesButtons.forEach((button) => {
      button.addEventListener('click', function () {
        setTimeout(() => {
          const activeLightbox = document.querySelector('.lightbox.active');
          if (activeLightbox) {
            const content = activeLightbox.querySelector('.lightbox-content');
            const images = activeLightbox.querySelectorAll(
              '.lightbox-image img'
            );

            // Ensure content doesn't overflow horizontally
            if (content) {
              content.style.overflowX = 'hidden';

              // Check if content is wider than viewport
              if (content.scrollWidth > window.innerWidth * 0.9) {
                content.style.width = '90vw';
                content.style.maxWidth = '90vw';
              }
            }

            // Ensure images are properly constrained
            if (images.length) {
              images.forEach((img) => {
                img.style.maxWidth = '100%';
              });
            }
          }
        }, 100);
      });
    });
  },
};

/**
 * =====================================================
 * GALLERY MODULE
 * =====================================================
 */
const GalleryModule = {
  init: function () {
    // Check if we're on the gallery page
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;

    // Initialize gallery functionality
    this.initThumbnailHover();
    this.initLightbox();
  },

  // Handle thumbnail hover to change main image
  initThumbnailHover: function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const residentialMainImage = document.getElementById(
      'residential-main-image'
    );
    const commercialMainImage = document.getElementById(
      'commercial-main-image'
    );

    if (!thumbnails.length) return;

    thumbnails.forEach((thumbnail) => {
      // Change from mouseenter to click event
      thumbnail.addEventListener('click', function (e) {
        // Prevent opening lightbox when clicking thumbnails
        e.stopPropagation();

        const imageSrc = this.getAttribute('data-image');
        const imageIndex = this.getAttribute('data-index');
        const sectionId = this.closest('.gallery-section').id;

        // Determine which main image to update based on section
        const mainImage =
          sectionId === 'residential-gallery'
            ? residentialMainImage
            : commercialMainImage;

        if (mainImage) {
          mainImage.src = imageSrc;
          mainImage.setAttribute('data-index', imageIndex);

          // Update active class on thumbnails within the same section
          const section = this.closest('.gallery-section');
          if (section) {
            section.querySelectorAll('.thumbnail').forEach((thumb) => {
              thumb.classList.remove('active');
            });
            this.classList.add('active');
          }
        }
      });
    });
  },

  // Initialize lightbox functionality
  initLightbox: function () {
    const mainImages = document.querySelectorAll('.main-image-container');
    const lightbox = document.getElementById('gallery-lightbox');
    if (!mainImages.length || !lightbox) return;

    const lightboxContent = lightbox.querySelector('.lightbox-content');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const closeButton = lightbox.querySelector('.close-lightbox');

    // Function to adjust lightbox image size
    const adjustLightboxImageSize = function () {
      // Get viewport dimensions with some padding
      const maxWidth = window.innerWidth * 0.85; // 85% of viewport width
      const maxHeight = window.innerHeight * 0.8; // 80% of viewport height

      // Reset any previous inline styles
      lightboxImage.style.maxWidth = maxWidth + 'px';
      lightboxImage.style.maxHeight = maxHeight + 'px';
      lightboxImage.style.width = 'auto';
      lightboxImage.style.height = 'auto';

      // Make sure lightbox content doesn't overflow
      lightboxContent.style.maxWidth = 'unset';
      lightboxContent.style.maxHeight = 'unset';
      lightboxContent.style.overflow = 'visible';
    };

    // Open lightbox when clicking a main image
    mainImages.forEach((imageContainer) => {
      imageContainer.addEventListener('click', function () {
        const mainImage = this.querySelector('.main-image');
        const imageSrc = mainImage.src;
        const imageIndex = mainImage.getAttribute('data-index');
        const totalImages = 31; // Total number of images in the gallery

        // Set lightbox image and counter
        lightboxImage.src = imageSrc;
        lightboxCounter.textContent = `Image ${imageIndex} of ${totalImages}`;

        // Show lightbox
        lightbox.classList.add('active');

        // Adjust image size
        adjustLightboxImageSize();

        // Add animation classes for fade-in and enlarge effect
        lightboxContent.style.opacity = 0;
        lightboxContent.style.transform = 'scale(0.8)';

        // Trigger animation after a small delay (to ensure CSS transition works)
        setTimeout(() => {
          lightboxContent.style.transition =
            'opacity 0.3s ease, transform 0.3s ease';
          lightboxContent.style.opacity = 1;
          lightboxContent.style.transform = 'scale(1)';
        }, 50);

        document.body.style.overflow = 'hidden'; // Prevent scrolling while lightbox is open
      });
    });

    // Adjust size when window resizes while lightbox is open
    window.addEventListener('resize', function () {
      if (lightbox.classList.contains('active')) {
        adjustLightboxImageSize();
      }
    });

    // Close lightbox when clicking close button
    if (closeButton) {
      closeButton.addEventListener('click', function () {
        // Animate out
        lightboxContent.style.opacity = 0;
        lightboxContent.style.transform = 'scale(0.8)';

        // Remove lightbox after animation completes
        setTimeout(() => {
          lightbox.classList.remove('active');
          document.body.style.overflow = ''; // Restore scrolling
          // Reset transition for next opening
          setTimeout(() => {
            lightboxContent.style.transition = '';
          }, 300);
        }, 300);
      });
    }

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        // Animate out
        lightboxContent.style.opacity = 0;
        lightboxContent.style.transform = 'scale(0.8)';

        // Remove lightbox after animation completes
        setTimeout(() => {
          lightbox.classList.remove('active');
          document.body.style.overflow = ''; // Restore scrolling
          // Reset transition for next opening
          setTimeout(() => {
            lightboxContent.style.transition = '';
          }, 300);
        }, 300);
      }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') {
        // Close lightbox with Escape key - with animation
        lightboxContent.style.opacity = 0;
        lightboxContent.style.transform = 'scale(0.8)';

        setTimeout(() => {
          lightbox.classList.remove('active');
          document.body.style.overflow = ''; // Restore scrolling
          // Reset transition for next opening
          setTimeout(() => {
            lightboxContent.style.transition = '';
          }, 300);
        }, 300);
      } else if (e.key === 'ArrowRight') {
        // Next image with right arrow
        const currentIndex = parseInt(
          lightboxImage.src.match(/gallery(\d+)\.webp/)[1]
        );
        const nextIndex = currentIndex < 31 ? currentIndex + 1 : 1;

        // Animate transition between images
        lightboxContent.style.opacity = 0;
        setTimeout(() => {
          lightboxImage.src = `https://storage.googleapis.com/kws-clientele/Waldman%20Electrical%20Contractors/Gallery/gallery${nextIndex}.webp`;
          lightboxCounter.textContent = `Image ${nextIndex} of 31`;

          // Apply size adjustments to the new image
          const maxWidth = window.innerWidth * 0.85;
          const maxHeight = window.innerHeight * 0.8;
          lightboxImage.style.maxWidth = maxWidth + 'px';
          lightboxImage.style.maxHeight = maxHeight + 'px';

          setTimeout(() => {
            lightboxContent.style.opacity = 1;
          }, 50);
        }, 150);
      } else if (e.key === 'ArrowLeft') {
        // Previous image with left arrow
        const currentIndex = parseInt(
          lightboxImage.src.match(/gallery(\d+)\.webp/)[1]
        );
        const prevIndex = currentIndex > 1 ? currentIndex - 1 : 31;

        // Animate transition between images
        lightboxContent.style.opacity = 0;
        setTimeout(() => {
          lightboxImage.src = `https://storage.googleapis.com/kws-clientele/Waldman%20Electrical%20Contractors/Gallery/gallery${prevIndex}.webp`;
          lightboxCounter.textContent = `Image ${prevIndex} of 31`;

          // Apply size adjustments to the new image
          const maxWidth = window.innerWidth * 0.85;
          const maxHeight = window.innerHeight * 0.8;
          lightboxImage.style.maxWidth = maxWidth + 'px';
          lightboxImage.style.maxHeight = maxHeight + 'px';

          setTimeout(() => {
            lightboxContent.style.opacity = 1;
          }, 50);
        }, 150);
      }
    });
  },
};
/**
 * =====================================================
 * HISTORY HERO POSITIONING MODULE - Kept for reference but not included
 * =====================================================
 */
const HistoryHeroPositioning = {
  init: function () {
    // This module has been removed from the registered modules
    // to prevent conflicts with PageHeaderPositioning
  },
};

/**
 * =====================================================
 * TEMPLATE FOR NEW MODULES
 * =====================================================
 * To add a new module, copy this template, rename it,
 * implement your functionality in the init method,
 * and add it to the App.init moduleArray.
 *
 * const NewFeatureModule = {
 *   init: function() {
 *     // Your initialization code here
 *   }
 * };
 */
