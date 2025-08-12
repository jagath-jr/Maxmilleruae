document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const siteFooter = document.querySelector('.site-footer');
  const backgroundText = document.querySelector('.footer-background-text');
  const footerColumns = gsap.utils.toArray('.footer-column');
  const footerLogo = document.querySelector('.footer-logo');
  const socialIcons = document.querySelectorAll('.social-icons a');

  // --- 1. Fade In Background Text ---
  gsap.fromTo(backgroundText,
    { opacity: 0, y: 50 },
    {
      opacity: 0.2,
      y: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: siteFooter,
        start: "top 80%", // Start animation when the top of the footer is 80% in view
        end: "bottom +=200", // End 200px after the bottom of the footer
        scrub: 0.5, // Smoothly link animation to scroll
      },
    }
  );

  // --- 2. Slide In Footer Columns ---
  footerColumns.forEach((column, index) => {
    const direction = index % 2 === 0 ? -50 : 50; // Alternate slide direction
    gsap.fromTo(column,
      { x: direction, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: column,
          start: "top 90%",
          end: "bottom +=100",
          toggleActions: "play none none reverse", // Animate in on enter, out on leave
        },
      }
    );
  });

  // --- 3. Scale Up Footer Logo ---
  if (footerLogo) {
    gsap.fromTo(footerLogo,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
          trigger: footerLogo,
          start: "top 90%",
          end: "bottom +=50",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // --- 4. Staggered Fade In for Social Icons ---
  gsap.fromTo(socialIcons,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: document.querySelector('.social-icons'), // Trigger on the parent container
        start: "top 90%",
        end: "bottom +=50",
        toggleActions: "play none none reverse",
      },
    }
  );
});