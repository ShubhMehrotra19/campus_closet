// Product data
const products = [
  {
    id: 1,
    name: "Royal Maroon Lehenga",
    category: "Lehenga Sets",
    price: "200",
    description: "Beautiful embroidered maroon lehenga perfect for festivals",
    image: "lehnga-choli.jpg",
  },
  {
    id: 2,
    name: "Golden Sequin Blouse",
    category: "Blouses",
    price: "200",
    description:
      "Stunning golden blouse with intricate embroidery and shell details",
    image: "blouse.jpg",
  },
  {
    id: 3,
    name: "Bandhani Print Skirt",
    category: "Skirts",
    price: "200",
    description: "Traditional bandhani printed flowing skirt in dark tones",
    image: "long-skirt.jpg",
  },
  {
    id: 4,
    name: "Purple Festive Saree",
    category: "Sarees",
    price: "200",
    description:
      "Elegant purple saree with colorful border perfect for celebrations",
    image: "complete-set.jpg",
  },
  {
    id: 5,
    name: "Black Maxi Dress",
    category: "Dresses",
    price: "200",
    description: "Flowy black maxi dress for elegant evening occasions",
    image: "long-skirt2.jpg",
  },
];

// Features data
const features = [
  {
    title: "Affordable Pricing",
    description: "All outfits at just Rs. 200/- rental",
    icon: "💰",
  },
  {
    title: "Quality Assured",
    description: "Well-maintained, cleaned garments",
    icon: "✨",
  },
  {
    title: "Wide Variety",
    description: "From traditional to indo-western styles",
    icon: "👗",
  },
];

// Rental process data
const rentalProcess = [
  {
    step: 1,
    title: "Browse & Select",
    description: "Choose your favorite outfit from our collection",
  },
  {
    step: 2,
    title: "Book & Confirm",
    description: "Contact us to confirm availability and booking",
  },
  {
    step: 3,
    title: "Pickup & Return",
    description: "Collect your outfit and return after use",
  },
];

// Contact information
const contact = {
  phone: "+91 9876543210",
  email: "campuscloset@gmail.com",
  address: "Banasthali University Campus",
  instagram: "@campuscloset_banasthali",
};

// DOM Elements
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const productsGrid = document.getElementById("products-grid");
const filterButtons = document.querySelectorAll(".filter__btn");
const productModal = document.getElementById("product-modal");
const modalClose = document.getElementById("modal-close");
const modalOverlay = document.querySelector(".modal__overlay");
const contactForm = document.getElementById("contact-form");
const heroCtaButton = document.querySelector(".hero__cta");

// State
let currentFilter = "all";
let wishlist = [];
let cart = [];

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  loadProducts();
  initializeFilters();
  initializeModal();
  initializeContactForm();
  initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    // Animate hamburger menu
    const spans = navToggle.querySelectorAll("span");
    spans.forEach((span, index) => {
      if (navMenu.classList.contains("active")) {
        if (index === 0)
          span.style.transform = "rotate(45deg) translate(5px, 5px)";
        if (index === 1) span.style.opacity = "0";
        if (index === 2)
          span.style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        span.style.transform = "none";
        span.style.opacity = "1";
      }
    });
  });

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      const spans = navToggle.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.transform = "none";
        span.style.opacity = "1";
      });
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      const spans = navToggle.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.transform = "none";
        span.style.opacity = "1";
      });
    }
  });
}

// Load and display products
function loadProducts(filter = "all") {
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  productsGrid.innerHTML = "";

  filteredProducts.forEach((product) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });

  // Add fade-in animation
  const productCards = productsGrid.querySelectorAll(".product__card");
  productCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Create product card element
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product__card";
  card.dataset.productId = product.id;

  card.innerHTML = `
        <div class="product__image">
            <div class="product__placeholder">
              <img src="${product.image}" alt="${product.name}" loading="lazy" class="product__img" onerror="this.onerror=null;this.src='./public/placeholder.jpg';" />
            </div>
        </div>
        <div class="product__info">
            <h4 class="product__name">${product.name}</h4>
            <div class="product__category">${product.category}</div>
            <div class="product__price">Rs. ${product.price}/-</div>
            <p class="product__description">${product.description}</p>
            <div class="product__actions">
                <button class="btn btn--primary product__rent-btn" data-product-id="${product.id}">
                    Rent Now
                </button>
                <button class="btn btn--outline product__wishlist-btn" data-product-id="${product.id}">
                    ♡ Wishlist
                </button>
            </div>
        </div>
    `;

  // Add click event to open modal
  card.addEventListener("click", function (e) {
    if (!e.target.classList.contains("btn")) {
      openProductModal(product);
    }
  });

  // Add event listeners for buttons
  const rentBtn = card.querySelector(".product__rent-btn");
  const wishlistBtn = card.querySelector(".product__wishlist-btn");

  rentBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    rentProduct(product.id);
  });

  wishlistBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleWishlist(product.id, wishlistBtn);
  });

  return card;
}

// Filter functionality
function initializeFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active state
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter products
      const filter = button.dataset.filter;
      currentFilter = filter;
      loadProducts(filter);
    });
  });
}

// Modal functionality
function initializeModal() {
  modalClose.addEventListener("click", closeProductModal);
  modalOverlay.addEventListener("click", closeProductModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !productModal.classList.contains("hidden")) {
      closeProductModal();
    }
  });
}

function openProductModal(product) {
  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-category").textContent = product.category;
  document.getElementById("modal-price").textContent = product.price;
  document.getElementById("modal-description").textContent =
    product.description;

  // Set the modal image properly
  const modalImageContainer = document.getElementById("modal-image");
  modalImageContainer.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-base);" onerror="this.onerror=null;this.src='./public/placeholder.jpg';" />`;

  productModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Add event listeners to modal buttons
  const modalRentBtn = productModal.querySelector(".btn--primary");
  const modalWishlistBtn = productModal.querySelector(".btn--outline");

  modalRentBtn.onclick = () => rentProduct(product.id);
  modalWishlistBtn.onclick = () => toggleWishlist(product.id, modalWishlistBtn);
}

function closeProductModal() {
  productModal.classList.add("hidden");
  document.body.style.overflow = "";
}

// Contact form functionality
function initializeContactForm() {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      showNotification(
        `Thank you ${name}! Your message has been sent. We'll get back to you soon.`,
        "success"
      );
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Hero CTA button scroll to collections
  heroCtaButton.addEventListener("click", function () {
    const collectionsSection = document.getElementById("collections");
    const headerHeight = document.querySelector(".header").offsetHeight;
    const targetPosition = collectionsSection.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
}

// Product interaction functions
function rentProduct(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    // Show immediate confirmation without requiring user interaction
    showNotification(
      `Booking initiated for ${product.name}! Contact us at ${contact.phone} to complete your rental.`,
      "success"
    );

    // Close modal if open
    if (!productModal.classList.contains("hidden")) {
      closeProductModal();
    }

    // Scroll to contact section after a brief delay
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = contactSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }, 2000);
  }
}

function toggleWishlist(productId, buttonElement) {
  const product = products.find((p) => p.id === productId);
  const isInWishlist = wishlist.includes(productId);

  if (isInWishlist) {
    wishlist = wishlist.filter((id) => id !== productId);
    buttonElement.innerHTML = "♡ Wishlist";
    buttonElement.classList.remove("btn--primary");
    buttonElement.classList.add("btn--outline");
    showNotification(`${product.name} removed from wishlist`, "info");
  } else {
    wishlist.push(productId);
    buttonElement.innerHTML = "♥ Wishlisted";
    buttonElement.classList.remove("btn--outline");
    buttonElement.classList.add("btn--primary");
    showNotification(`${product.name} added to wishlist`, "success");
  }
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");

  // Set background based on type
  let background;
  switch (type) {
    case "success":
      background = "linear-gradient(45deg, #48CFCB, #A0303E)";
      break;
    case "info":
      background = "linear-gradient(45deg, #E1A95F, #FFCBA4)";
      break;
    case "error":
      background = "linear-gradient(45deg, #A0303E, #E1A95F)";
      break;
    default:
      background = "linear-gradient(45deg, #A0303E, #48CFCB)";
  }

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${background};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 3000;
        font-weight: 500;
        font-size: 14px;
        max-width: 300px;
        line-height: 1.4;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        border: 1px solid rgba(255,255,255,0.2);
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Show notification with animation
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Hide and remove notification
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    notification.style.opacity = "0";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 400);
  }, 4000);

  // Allow manual close on click
  notification.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    notification.style.opacity = "0";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 400);
  });
}

// Scroll effects
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const scrolled = window.pageYOffset;

  if (scrolled > 100) {
    header.style.background =
      "linear-gradient(135deg, #FFCBA4 0%, #E1A95F 100%)";
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.background =
      "linear-gradient(135deg, #FFCBA4 0%, #E1A95F 100%)";
    header.style.boxShadow =
      "0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)";
  }
});

// Add loading animation to page
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animateElements = document.querySelectorAll(
    ".feature__card, .step__card, .testimonial__card"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Performance optimization - lazy load images when needed
function lazyLoadImages() {
  const imageContainers = document.querySelectorAll(".product__placeholder");

  imageContainers.forEach((container) => {
    // Create colorful gradient backgrounds based on product name
    const productName = container.textContent;
    const colors = ["#FFCBA4", "#E1A95F", "#A0303E", "#48CFCB"];
    const randomColors = colors.sort(() => Math.random() - 0.5).slice(0, 2);

    container.style.background = `linear-gradient(135deg, ${randomColors[0]}, ${randomColors[1]})`;
  });
}

// Call lazy load when products are loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(lazyLoadImages, 500);
});

// Add search functionality (bonus feature)
function initializeSearch() {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search products...";
  searchInput.className = "form-control";
  searchInput.style.maxWidth = "300px";
  searchInput.style.margin = "0 auto 20px";

  const filterButtons = document.querySelector(".filter__buttons");
  filterButtons.parentNode.insertBefore(searchInput, filterButtons);

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const productCards = document.querySelectorAll(".product__card");

    productCards.forEach((card) => {
      const productName = card
        .querySelector(".product__name")
        .textContent.toLowerCase();
      const productDescription = card
        .querySelector(".product__description")
        .textContent.toLowerCase();

      if (
        productName.includes(searchTerm) ||
        productDescription.includes(searchTerm)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// Initialize search after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initializeSearch, 1000);
});
