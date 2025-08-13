document.addEventListener("DOMContentLoaded", function () {
  /**
   * Mobile Menu Toggle
   */
  const navMenu = document.getElementById('navMenu');
  const menuIcon = document.querySelector('.menu-icon');

  if (menuIcon) {
    menuIcon.addEventListener('click', function () {
      navMenu.classList.toggle('show');
      this.textContent = navMenu.classList.contains('show') ? '✖' : '☰';
    });
  }

  /**
   * Hide Header on Scroll Down
   */
  const headerWrapper = document.getElementById('headerWrapper');
  if (headerWrapper) {
    let lastScrollTop = 0;
    window.addEventListener('scroll', function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > headerWrapper.offsetHeight) {
        // Scrolling down
        headerWrapper.classList.add('hide-header');
      } else {
        // Scrolling up
        headerWrapper.classList.remove('hide-header');
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  /**
   * Animated Counter with Intersection Observer
   */
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const animateCounters = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.counter');
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
              const increment = target / 100; // Animation speed
              count += increment;
              if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
          });
          observer.unobserve(entry.target); // Animate only once
        }
      });
    };

    const counterObserver = new IntersectionObserver(animateCounters, {
      threshold: 0.5
    });
    counterObserver.observe(statsSection);
  }

  /**
   * Enhanced Hero Slider with Navigation Controls
   */
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.hero-slider .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const slideInterval = 6000; // 6 seconds per slide
    let slideTimer;
    let isHovering = false;

    function showSlide(index, direction = 'next') {
      // Wrap around if at ends
      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }
      
      // Remove active classes
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'slide-left', 'slide-right', 'fade-in', 'zoom-in', 'flip-in', 'float-up');
        if (dots[i]) dots[i].classList.remove('active');
      });
      
      // Add appropriate animation class based on direction
      const animationClass = slides[currentSlide].dataset.anim || 'fade-in';
      slides[currentSlide].classList.add('active', animationClass);
      
      // Update active dot
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
      
      // Reset timer when manually navigating
      if (!isHovering) resetTimer();
    }

    function nextSlide() {
      showSlide(currentSlide + 1, 'next');
    }

    function prevSlide() {
      showSlide(currentSlide - 1, 'prev');
    }

    function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetIndex = parseInt(dot.dataset.index);
        const direction = targetIndex > currentSlide ? 'next' : 'prev';
        showSlide(targetIndex, direction);
      });
    });

    // Button navigation
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', () => {
      isHovering = true;
      clearInterval(slideTimer);
    });

    heroSlider.addEventListener('mouseleave', () => {
      isHovering = false;
      resetTimer();
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    heroSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    heroSlider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});

    function handleSwipe() {
      const threshold = 50; // Minimum swipe distance
      if (touchEndX < touchStartX - threshold) {
        nextSlide(); // Swipe left
      } else if (touchEndX > touchStartX + threshold) {
        prevSlide(); // Swipe right
      }
    }

    // Initialize
    showSlide(0);
    resetTimer();
  }

  /**
   * Services Carousel (Improved Version)
   */
  const servicesData = [
    {
      img: 'Our service images/Our product Img/Aluminium.webp',
      title: 'Aluminium & GlassWorks',
      desc: 'Custom-designed aluminum and glass solutions for façades, partitions, and windows with modern aesthetics and lasting durability...',
      link: 'services.html#aluminium-and-glass'
    },
    {
      img: 'Our service images/Our product Img/Construction & Demolition.webp',
      title: 'Construction & Demolition',
      desc: 'Safe and efficient construction and demolition services for residential, commercial, and industrial projects with strict adherence to quality...',
      link: 'services.html#doors-and-windows'
    },
    {
      img: 'Our service images/Our product Img/Building Maintenance.webp',
      title: 'Building Maintenance',
      desc: 'Comprehensive maintenance solutions for buildings, ensuring functionality, safety, and extended structural life through regular inspections...',
      link: 'services.html#cladding-solution'
    },
    {
      img: 'Our service images/Our product Img/Swimming pool Maintenance.webp',
      title: 'Swimming Pool Maintenance',
      desc: 'Professional cleaning, treatment, and up keep of swimming pools to maintain hygiene, water quality, and equipment efficiency for year-round use...',
      link: 'services.html#frameless-structure'
    },
    {
      img: 'Our service images/Our product Img/Civil Works.webp',
      title: 'Civil Works',
      desc: 'We handle all types of civil works, including foundation construction, earthworks, and infrastructure development...',
      link: 'services.html#handrails-and-balustrades'
    },
    {
      img: 'Our service images/Our product Img/Interior & fit-Out Works.webp',
      title: 'Interior & fit-Out Works',
      desc: 'Transform your spaces with our custom interior and fit-out services. We design and execute tailored solutions for offices...',
      link: 'services.html#architectural-features'
    },
    {
      img: 'Our service images/Our product Img/MEP Works.webp',
      title: 'MEP Works',
      desc: 'Our Mechanical, Electrical, and Plumbing (MEP) services are designed to ensure seamless building operations...',
      link: 'services.html#architectural-features'
    },
    {
      img: 'Our service images/Our product Img/Steel Fabrication.webp',
      title: 'Steel Fabrication',
      desc: 'Our Steel Fabrication services are designed to meet the highest standards of quality and precision...',
      link: 'services.html#architectural-features'
    }

  ];

  const carouselTrack = document.querySelector('.carousel-track');
  const dotsContainer = document.querySelector('.carousel-dots');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');

  if (carouselTrack && dotsContainer) {
    // Populate service cards
    servicesData.forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div class="image" style="background-image: url('${service.img}');"></div>
        <div class="content">
          <h4>${service.title}</h4>
          <p>${service.desc}</p>
          <a href="${service.link}" class="btn-small">Read More</a>
        </div>
      `;
      carouselTrack.appendChild(card);
    });

    const originalCards = Array.from(carouselTrack.children);
    const totalOriginalCards = originalCards.length;
    let currentIndex = 0;
    let autoPlayInterval;

    // Clone cards for infinite loop
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      carouselTrack.appendChild(clone);
    });

    // Create dots
    for (let i = 0; i < totalOriginalCards; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }
    const carouselDots = dotsContainer.querySelectorAll('.dot');

    const updateCarousel = (animate = true) => {
      const cardWidth = carouselTrack.querySelector('.service-card').offsetWidth;
      const cardMargin = parseInt(window.getComputedStyle(carouselTrack.querySelector('.service-card')).marginRight) + 
                        parseInt(window.getComputedStyle(carouselTrack.querySelector('.service-card')).marginLeft);
      const totalWidth = cardWidth + cardMargin;

      carouselTrack.style.transition = animate ? 'transform 0.7s ease-in-out' : 'none';
      carouselTrack.style.transform = `translateX(-${currentIndex * totalWidth}px)`;

      // Update active dot
      carouselDots.forEach(d => d.classList.remove('active'));
      if (carouselDots[currentIndex % totalOriginalCards]) {
        carouselDots[currentIndex % totalOriginalCards].classList.add('active');
      }
    };

    const handleNext = () => {
      currentIndex++;
      updateCarousel();

      if (currentIndex >= totalOriginalCards) {
        setTimeout(() => {
          carouselTrack.style.transition = 'none';
          currentIndex = 0;
          updateCarousel(false);
        }, 700);
      }
    };

    const handlePrev = () => {
      if (currentIndex === 0) {
        carouselTrack.style.transition = 'none';
        currentIndex = totalOriginalCards;
        updateCarousel(false);
      }
      setTimeout(() => {
        currentIndex--;
        updateCarousel(true);
      }, 50); // Small delay to ensure transition applies
    };

    const startAutoplay = () => {
      stopAutoplay(); // Clear existing interval
      autoPlayInterval = setInterval(handleNext, 3000);
    };

    const stopAutoplay = () => {
      clearInterval(autoPlayInterval);
    };

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
      handleNext();
      startAutoplay(); // Reset autoplay timer on manual navigation
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      handlePrev();
      startAutoplay(); // Reset autoplay timer
    });

    carouselTrack.addEventListener('mouseenter', stopAutoplay);
    carouselTrack.addEventListener('mouseleave', startAutoplay);

    dotsContainer.addEventListener('click', e => {
      if (e.target.classList.contains('dot')) {
        currentIndex = parseInt(e.target.dataset.index);
        updateCarousel();
        startAutoplay(); // Reset autoplay timer
      }
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoplay();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 50; // Minimum swipe distance
      if (touchEndX < touchStartX - threshold) {
        handleNext(); // Swipe left
      } else if (touchEndX > touchStartX + threshold) {
        handlePrev(); // Swipe right
      }
    }

    // Initialize
    updateCarousel(false);
    startAutoplay();

    window.addEventListener('resize', () => updateCarousel(false));
  }
});
// script.js

document.addEventListener('DOMContentLoaded', () => {
    // GSAP animation for the section title
    gsap.from(".section-title-unique", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out"
    });

    // GSAP animation for testimonial cards on load
    gsap.from(".testimonial-card-unique", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2, // Stagger the animation for each card
        delay: 0.5 // Delay the start of card animations slightly
    });

    // Example of a hover effect using GSAP (optional, as CSS handles basic hover)
    // You could use this for more complex interactive hover animations
    document.querySelectorAll('.testimonial-card-unique').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.02, duration: 0.2, ease: "power1.out" });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.2, ease: "power1.out" });
        });
    });

    // Add more JavaScript interactivity here as needed
    // For example, if you wanted to implement a carousel or a "read more" feature.
});
