const width = window.innerWidth; // Get the width of the window
const height = window.innerHeight; // Get the height of the window
if (width > 991) {
  let resizeTimeout; // Variable to hold the timeout ID

  function checkAspectRatio() {
    // Check if the screen width is greater than 991px

    const aspectRatio = width / height; // Calculate aspect ratio

    // Check if the aspect ratio is greater than 1.72
    if (aspectRatio > 1.72) {
      // Function to calculate viewport height percentage
      const vh = (coef) => window.innerHeight * (coef / 100);

      // Initialize GSAP animations with ScrollTrigger
      $("[hero-section-overlap-trigger]").each(function () {
        let heroStickyBl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: () => "top+=" + vh(100) + " bottom",
            end: () => "top+=" + vh(200) + " bottom",
            scrub: true,
            // markers: true,
          },
        });

        heroStickyBl.to($(this).find("[hero-section-overlap-target]"), {
          y: "100vh",
          ease: "linear",
        });
      });

      // Initialize GSAP animations with ScrollTrigger
      $("[section-overlap-trigger]").each(function () {
        let stickyBl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: "bottom bottom",
            end: () => "bottom+=" + vh(100) + " bottom",
            scrub: true,
            // markers: true,
          },
        });

        stickyBl.to($(this).find("[section-overlap-target]"), {
          y: "100vh",
          ease: "linear",
        });
      });

      // Function to observe height changes and refresh ScrollTrigger
      function observeHeightChangesAndRefresh() {
        const elements = document.querySelectorAll("[section-overlap-trigger]");
        const resizeObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            console.log(
              `Element with [section-overlap-trigger] has new height: ${entry.contentRect.height}px`
            );
            // Refresh ScrollTrigger when height changes
            ScrollTrigger.refresh();
            ScrollTrigger.normalizeScroll(true);
            console.log("ScrollTrigger refreshed due to height change");
          });
        });

        elements.forEach((element) => {
          resizeObserver.observe(element);
        });
      }

      // Initialize the height observation and refresh functionality
      observeHeightChangesAndRefresh();

      console.log("The aspect ratio is greater than 1.75:1");

      // Add your specific functionality here
    } else {
      console.log("The aspect ratio is less than or equal to 1.75:1");
    }
  }

  // Run the checkAspectRatio function on page load
  checkAspectRatio();

  // Add an event listener to check the aspect ratio on window resize
  window.addEventListener("resize", () => {
    // Clear the previous timeout if it exists
    clearTimeout(resizeTimeout);

    // Set a new timeout to reload the page after 1.5 seconds
    resizeTimeout = setTimeout(() => {
      console.log("Reloading the page due to resize...");
      location.reload(); // Reload the page
    }, 1500);

    // Call the checkAspectRatio function to re-evaluate the aspect ratio
    checkAspectRatio();
  });
} else {
  console.log(
    "Screen width is less than or equal to 991px. Skipping initialization."
  );
}

// Function to handle scroll event
const headerBgWrap = document.querySelector(".nav-bg_wrap");
const headerLinks = document.querySelector(".row.for-nav");
const headerBurgerLines = document.querySelectorAll(".burger-line");

headerLinks.classList.add("inherit");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    headerBgWrap.style.opacity = "1"; // 100% opacity
    headerLinks.classList.remove("inherit");
    headerLinks.classList.add("light-links");
    headerBurgerLines.forEach((line) => {
      line.classList.add("u-bg-light");
    });
  } else {
    headerBgWrap.style.opacity = "0"; // or set to your desired opacity
    headerLinks.classList.remove("light-links");
    headerLinks.classList.add("inherit");
    headerBurgerLines.forEach((line) => {
      line.classList.remove("u-bg-light");
    });
  }
});
