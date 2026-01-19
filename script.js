'use strict';

/**
 *  ────── Add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 *  ────── Navbar toggle
 */

const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const navbar = document.querySelector('[data-navbar]');
const navbarLinks = document.querySelectorAll('[data-nav-link]');
const overlay = document.querySelector('[data-overlay]');

const toggleNavbar = function () {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
};

addEventOnElem(navTogglers, 'click', toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove('active');
  overlay.classList.remove('active');
};

addEventOnElem(navbarLinks, 'click', closeNavbar);

/**
 *  ────── Scroll reveal effect
 */

const sections = document.querySelectorAll('[data-section]');

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add('active');
    }
  }
};

scrollReveal();

addEventOnElem(window, 'scroll', scrollReveal);

/**
 *  ────── Load all website content from JSON file
 */
fetch('./assets/data/content.json')
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Content file not found');
    }
    return response.json();
  })
  .then(function (data) {
    renderHero(data.hero);
    renderCollections(data.collections);
    renderProducts(data.products, 'shop-products');
    renderProducts(data.under25Products, 'shop-under-25');
    renderFeatures(data.features);
    renderBlogs(data.blogs);
    renderFooterTop(data.footer);
  })
  .catch(function (error) {
    alert('Website content failed to load. Please check content.json file.');
    console.error(error);
  });

/**
 *  ────── Render hero slider content
 */
function renderHero(heroItems) {
  if (!heroItems || heroItems.length === 0) return;

  const heroContainer = document.getElementById('hero-scroll');
  let heroHTML = '';

  for (let i = 0; i < heroItems.length; i++) {
    heroHTML += `
      <li class="scrollbar-item">
        <div class="hero-card has-bg-image" style="background-image: url('${heroItems[i].image}')">
          <div class="card-content">
            <h1 class="h1 hero-title">${heroItems[i].title}</h1>
            <p class="hero-text">${heroItems[i].text}</p>
            <p class="price">${heroItems[i].price}</p>
            <a href="#" class="btn btn-primary">${heroItems[i].buttonText}</a>
          </div>
        </div>
      </li>
    `;
  }

  heroContainer.innerHTML = heroHTML;
}

/**
 *  ────── Render collection cards
 */
function renderCollections(collections) {
  if (!collections || collections.length === 0) return;

  const collectionList = document.getElementById('collection-list');
  let collectionHTML = '';

  for (let i = 0; i < collections.length; i++) {
    collectionHTML += `
      <li>
        <div class="collection-card has-before hover:shine">
          <h2 class="h2 card-title">${collections[i].title}</h2>
          <p class="card-text">${collections[i].text}</p>

          <a href="#" class="btn-link">
            <span class="span">${collections[i].buttonText}</span>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </a>

          <div class="has-bg-image" style="background-image: url('${collections[i].image}')"></div>
        </div>
      </li>
    `;
  }

  collectionList.innerHTML = collectionHTML;
}

/**
 *  ────── Render product cards (reusable for multiple sections)
 */
function renderProducts(products, containerId, filterFn) {
  if (!products || products.length === 0) return;

  const productList = document.getElementById(containerId);
  let productHTML = '';

  for (let i = 0; i < products.length; i++) {
    if (filterFn && !filterFn(products[i])) continue;

    productHTML += `
      <li class="scrollbar-item">
        <div class="shop-card">

          <div class="card-banner img-holder" style="--width: 540; --height: 720">
            <img
              src="${products[i].image}"
              width="540"
              height="720"
              loading="lazy"
              alt="${products[i].title}"
              class="img-cover"
            />

            ${products[i].badge ? `<span class="badge">${products[i].badge}</span>` : ''}

            <div class="card-actions">
              <button class="action-btn" aria-label="add to cart">
                <ion-icon name="bag-handle-outline"></ion-icon>
              </button>
              <button class="action-btn" aria-label="add to wishlist">
                <ion-icon name="star-outline"></ion-icon>
              </button>
              <button class="action-btn" aria-label="compare">
                <ion-icon name="repeat-outline"></ion-icon>
              </button>
            </div>
          </div>

          <div class="card-content">
            <div class="price">
              ${products[i].oldPrice ? `<del class="del">$${products[i].oldPrice}.00</del>` : ''}
              <span class="span">$${products[i].price}.00</span>
            </div>

            <h3>
              <a href="#" class="card-title">${products[i].title}</a>
            </h3>

            <div class="card-rating">
              <div class="rating-wrapper">
                ${'<ion-icon name="star"></ion-icon>'.repeat(products[i].rating)}
              </div>
              <p class="rating-text">${products[i].reviews} reviews</p>
            </div>
          </div>

        </div>
      </li>
    `;
  }

  productList.innerHTML = productHTML;
}

/**
 *  ────── Render feature highlights
 */
function renderFeatures(features) {
  if (!features || features.length === 0) return;

  const featureList = document.getElementById('feature-list');
  let html = '';

  for (let i = 0; i < features.length; i++) {
    html += `
      <li class="flex-item">
        <div class="feature-card">
          <img
            src="${features[i].image}"
            width="204"
            height="236"
            loading="lazy"
            alt="${features[i].alt}"
            class="card-icon"
          />
          <h3 class="h3 card-title">${features[i].title}</h3>
          <p class="card-text">${features[i].text}</p>
        </div>
      </li>
    `;
  }

  featureList.innerHTML = html;
}

/**
 *  ────── Render blog cards
 */
function renderBlogs(blogs) {
  if (!blogs || blogs.length === 0) return;

  const blogList = document.getElementById('blog-list');
  let html = '';

  for (let i = 0; i < blogs.length; i++) {
    html += `
      <li class="flex-item">
        <div class="blog-card">
          <figure class="card-banner img-holder has-before hover:shine" style="--width: 700; --height: 450">
            <img
              src="${blogs[i].image}"
              width="700"
              height="450"
              loading="lazy"
              alt="${blogs[i].alt}"
              class="img-cover"
            />
          </figure>

          <h3 class="h3">
            <a href="#" class="card-title">${blogs[i].title}</a>
          </h3>

          <a href="#" class="btn-link">
            <span class="span">${blogs[i].linkText}</span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </a>
        </div>
      </li>
    `;
  }

  blogList.innerHTML = html;
}

/**
 *  ────── Render footer top content
 */

function renderFooterTop(footer) {
  if (!footer) return;

  const footerTop = document.getElementById('footer-top');

  footerTop.innerHTML = `
    <ul class="footer-list">
      <li><p class="footer-list-title">${footer.company.title}</p></li>
      <li><p class="footer-list-text">${footer.company.location}</p></li>
      <li><p class="footer-list-text bold">${footer.company.phone}</p></li>
      <li><p class="footer-list-text">${footer.company.email}</p></li>
    </ul>

    <ul class="footer-list">
      <li><p class="footer-list-title">Useful links</p></li>
      ${footer.usefulLinks.map((link) => `<li><a href="#" class="footer-link">${link}</a></li>`).join('')}
    </ul>

    <ul class="footer-list">
      <li><p class="footer-list-title">Information</p></li>
      ${footer.informationLinks.map((link) => `<li><a href="#" class="footer-link">${link}</a></li>`).join('')}
    </ul>

    <div class="footer-list">
      <p class="newsletter-title">Good emails.</p>
      <p class="newsletter-text">
        Enter your email below to be the first to know about new collections and product launches.
      </p>
      <form class="newsletter-form">
        <input type="email" placeholder="Enter your email address" required class="email-field" />
        <button type="submit" class="btn btn-primary">Subscribe</button>
      </form>
    </div>
  `;
}
