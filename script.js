// MObile NavBar Functionality 
function toggleMobileNav() {
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileContainer = document.querySelector(".mobile-nav-items");

  // Toggle the active class
  mobileNav.classList.toggle("active");

  // Update visibility based on the active class
  if (mobileNav.classList.contains("active")) {
    mobileContainer.style.visibility = "visible";
  } else {
    mobileContainer.style.visibility = "hidden";
  }
}

// Add event listener to buttons to toggle visibility
let buttons = document.querySelectorAll(".mobile-nav-items ul li");
buttons.forEach((button) => {
  button.onclick = toggleMobileNav;
});


// Banner Logo Slider
let copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);

/* 
===========================================================
? => Accordion Functionality and Load more Functionaliy
===========================================================
 */

const accordionItems = document.querySelectorAll(".accordion-item");
const loadMoreBtn = document.getElementById("load_more");
const accordion = document.getElementById("faqAccordion");
const container = document.querySelector(".accordion-container");
let openItem = 0;
let isExpanded = false;

// ------------- first accordionItem will be open initially
const firstItem = accordionItems[0];
const firstContent = firstItem.querySelector(".accordion-content");
const firstAnswer = firstItem.querySelector(".accordion-answer");
const firstIcon = firstItem.querySelector(".accordion-icon");

firstContent.style.height = firstAnswer.scrollHeight + "px";
firstAnswer.classList.add("show");
firstIcon.classList.add("rotate");

// ---Handle accordion clicks
accordionItems.forEach((item, index) => {
  const AccordianBtn = item.querySelector(".accordion-button");
  const content = item.querySelector(".accordion-content");
  const answer = item.querySelector(".accordion-answer");
  const icon = item.querySelector(".accordion-icon");

  AccordianBtn.addEventListener("click", () => {
    const isOpen = openItem === index;

    if (openItem !== null && openItem !== index) {
      const prevItem = accordionItems[openItem];
      prevItem.querySelector(".accordion-content").style.height = "0";
      prevItem.querySelector(".accordion-answer").classList.remove("show");
      prevItem.querySelector(".accordion-icon").classList.remove("rotate");
    }

    if (isOpen) {
      content.style.height = "0";
      answer.classList.toggle("show");
      icon.classList.toggle("rotate");
      openItem = null;
    } else {
      content.style.height = answer.scrollHeight + "px";
      answer.classList.toggle("show");
      icon.classList.toggle("rotate");
      openItem = index;
    }
  });
});

// ---Handle Load More
loadMoreBtn.addEventListener("click", () => {
  if (isExpanded) return;

  // Set initial height
  container.style.height = container.offsetHeight + "px";

  // Add more FAQs
  accordionItems.forEach((item, index) => {
    if (item.classList.contains("hidden_accordion")) {
      item.classList.remove("hidden_accordion");
    }
  });

  // Force reflow
  void container.offsetHeight;

  // Animate to new height
  container.style.height = accordion.offsetHeight + "px";

  // Fade in new items
  setTimeout(() => {
    document.querySelectorAll(".new-item").forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });
    // loadMoreBtn.style.visibility = "hidden";
  }, 50);

  // Cleanup;
  setTimeout(() => {
    container.style.height = "auto";
    document.querySelectorAll(".new-item").forEach((item) => {
      item.classList.remove("new-item");
    });
    loadMoreBtn.style.display = "none";
  }, 500);

  isExpanded = true;
});

/* 
==========================================================
? => Modal Functionality 
========================================================== 

 */

//open modal
function openModal(modalId) {
  // document.body.style.overflow = "hidden";
  const backdrop = document.getElementById(`${modalId}-backdrop`);
  const container = document.getElementById(`${modalId}-container`);
  const modalWrapper = container.querySelector(".modal-wrapper");

  // Remove hiding class if present
  backdrop.classList.remove("hiding");
  container.classList.remove("hiding");

  // Show modal
  backdrop.classList.add("show");
  container.classList.add("show");

  // Add click event listener to the modal wrapper
  modalWrapper.addEventListener("click", (event) => {
    // If clicked element is the modal wrapper (the outer area)
    if (event.target === modalWrapper) {
      closeModal(modalId);
    }
  });
}

//close modal
function closeModal(modalId) {
  const backdrop = document.getElementById(`${modalId}-backdrop`);
  const container = document.getElementById(`${modalId}-container`);

  // Add hiding class for close animation
  backdrop.classList.add("hiding");
  container.classList.add("hiding");

  // Remove show class after animation
  setTimeout(() => {
    backdrop.classList.remove("show");
    container.classList.remove("show");
    backdrop.classList.remove("hiding");
    container.classList.remove("hiding");
    // document.body.style.overflow = "unset";
  }, 300);
}
