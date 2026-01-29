// Extreme Section Carousel Pagination
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".extreme-section__grid");
  const dots = document.querySelectorAll(".extreme-section__dot");

  if (!grid || !dots.length) return;

  const updateActiveDot = () => {
    const scrollLeft = grid.scrollLeft;
    const itemWidth = grid.offsetWidth;
    const currentIndex = Math.round(scrollLeft / itemWidth);

    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("extreme-section__dot--active");
      } else {
        dot.classList.remove("extreme-section__dot--active");
      }
    });
  };

  grid.addEventListener("scroll", updateActiveDot);

  // Click dots to navigate
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const itemWidth = grid.offsetWidth;
      grid.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
    });
  });
});
