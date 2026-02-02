document.addEventListener("DOMContentLoaded", () => {
  const ITEMS_PER_PAGE = 8;
  const productCards = document.querySelectorAll(
    ".shop-grid__container .product-card",
  ); // Adjust selector as needed
  const totalItems = productCards.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginationContainer = document.querySelector(".pagination");

  let currentPage = 1;

  // Function to show/hide products based on page
  function showPage(page) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    productCards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.style.display = "block"; // Or 'flex' depending on original display, usually block/flex for card
      } else {
        card.style.display = "none";
      }
    });

    updatePaginationUI(page);
  }

  // Function to render/update pagination controls
  function updatePaginationUI(page) {
    if (!paginationContainer) return;

    paginationContainer.innerHTML = "";

    // Prev Arrow
    const prevLink = document.createElement("a");
    prevLink.href = "#";
    prevLink.className = `pagination__arrow ${page === 1 ? "pagination__arrow--disabled" : ""}`;
    prevLink.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    prevLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (page > 1) {
        currentPage = page - 1;
        showPage(currentPage);
      }
    });
    paginationContainer.appendChild(prevLink);

    // Number Links
    // Simple logic: Show all pages for now as we have small number.
    // If many pages, logic for dots (...) would be needed.
    // Given 16 items / 8 per page = 2 pages.
    // Let's implement dynamic generation.

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.className = `pagination__link ${i === page ? "pagination__link--active" : ""}`;
      pageLink.textContent = i.toString().padStart(2, "0");

      pageLink.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        showPage(currentPage);
      });

      paginationContainer.appendChild(pageLink);
    }

    // Next Arrow
    const nextLink = document.createElement("a");
    nextLink.href = "#";
    nextLink.className = `pagination__arrow ${page === totalPages ? "pagination__arrow--disabled" : ""}`;
    nextLink.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    nextLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (page < totalPages) {
        currentPage = page + 1;
        showPage(currentPage);
      }
    });
    paginationContainer.appendChild(nextLink);
  }

  // Initial Render
  showPage(currentPage);
});
