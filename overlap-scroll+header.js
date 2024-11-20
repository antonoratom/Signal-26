// Function to check the aspect ratio of the screen
function checkAspectRatio() {
  const width = window.innerWidth; // Get the width of the window
  const height = window.innerHeight; // Get the height of the window

  const aspectRatio = width / height; // Calculate aspect ratio

  // Check if the aspect ratio is greater than 1.75
  if (aspectRatio > 1.72) {
    // Function to calculate viewport height percentage
    const vh = (coef) => window.innerHeight * (coef / 100);

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

// Run the check when the window loads
window.onload = checkAspectRatio;

// Optionally, check on window resize
window.onresize = checkAspectRatio;

// Function to handle scroll event
const headerBgWrap = document.querySelector(".nav-bg_wrap");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    headerBgWrap.style.opacity = "1"; // 100% opacity
  } else {
    headerBgWrap.style.opacity = "0"; // or set to your desired opacity
  }
});
