document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".card-price__toggle-button");
  const content = document.querySelector(".card-price-travel__price-content");
  const priceContainer = document.querySelector(".card-price-travel__price");
  const chevronIcon = document.querySelector(
    ".card-price__toggle-button--arrow"
  );
  const toggleText = toggleButton.querySelector("span");

  content.style.height = "0";
  content.style.overflow = "hidden";
  toggleText.textContent = "Mostrar precio";
  chevronIcon.classList.add("rotate");
  priceContainer.style.gap = "0";
  let isExpanded = false;

  toggleButton.addEventListener("click", function () {
    if (isExpanded) {
      content.style.height = "0";
      content.style.transition = "height 0.3s ease-out";
      content.style.overflow = "hidden";
      priceContainer.style.gap = "0";
      chevronIcon.classList.add("rotate");
      toggleText.textContent = "Mostrar precio";
    } else {
      content.style.height = content.scrollHeight + "px";
      content.style.overflow = "visible";
      content.style.transition = "height 0.3s ease-in";
      priceContainer.style.gap = "16px";
      chevronIcon.classList.remove("rotate");
      toggleText.textContent = "Ocultar precio";
    }

    isExpanded = !isExpanded;
  });
});
