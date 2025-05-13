async function fetchProducts() {
  try {
    const response = await fetch('products.json');
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные');
    }

    const products = await response.json();

    if (products.length === 0) {
      throw new Error('Данные о товарах отсутствуют');
    }

    renderProducts(products);
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
    alert('Произошла ошибка при загрузке товаров');
  }
}

function renderProducts(products) {
  const productsContainer = document.querySelector('.section__products');
  productsContainer.innerHTML = '';

  const createTextElement = (tag, text, classNames = []) => {
    const element = document.createElement(tag);
    element.textContent = text;
    element.classList.add(...classNames);
    return element;
  };

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImageBlock = document.createElement('div');
    productImageBlock.classList.add('product-card--with-background');
    productImageBlock.style.backgroundImage = `url(${product.image})`;

    if (product.special) {
      const promotionText = createTextElement('span', 'Акция', [
        'product-card__promotion',
      ]);
      productImageBlock.appendChild(promotionText);
    }

    const moreInfoBtn = createTextElement('button', 'Подробнее', [
      'btn',
      'product-card__button',
    ]);
    productImageBlock.appendChild(moreInfoBtn);
    productCard.appendChild(productImageBlock);

    const productTitle = createTextElement('h2', product.productName, [
      'product-card__title',
    ]);
    productCard.appendChild(productTitle);

    // Цены
    const productPricing = document.createElement('div');
    productPricing.classList.add('product-card__pricing');

    if (product.price) {
      const productPrice = createTextElement('span', product.price, [
        'product-card__price',
      ]);
      productPricing.appendChild(productPrice);
    }

    if (product.initPrice) {
      const productOldPrice = createTextElement('span', product.initPrice, [
        'product-card__price--old',
      ]);
      productPricing.appendChild(productOldPrice);
    }

    if (product.finalPrice) {
      const productDiscountedPrice = createTextElement(
        'span',
        product.finalPrice,
        ['product-card__price--discounted']
      );
      productPricing.appendChild(productDiscountedPrice);
    }

    productCard.appendChild(productPricing);
    productsContainer.appendChild(productCard);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
  const scrollBtn = document.querySelector('.button--scroll');
  const langToggleBtn = document.querySelector('.header__btn--lang-toggle');

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const currentLang = langToggleBtn.textContent.trim().toUpperCase();
      langToggleBtn.textContent = currentLang === 'EN' ? 'RU' : 'EN';
    });
  }
});
