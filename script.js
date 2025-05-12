// Функция для получения данных из файла products.json
async function fetchProducts() {
  try {
    const response = await fetch('products.json'); // Загружаем файл JSON
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные');
    }
    const products = await response.json(); // Парсим JSON в объект
    renderProducts(products); // Отображаем товары
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
}

// Функция для создания карточек товаров
function renderProducts(products) {
  const productsContainer = document.querySelector('.section__products'); // Находим контейнер для карточек товаров

  // Очищаем контейнер перед добавлением новых товаров
  productsContainer.innerHTML = '';

  // Проходим по всем товарам в массиве
  products.forEach((product) => {
    // Создаем карточку товара
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Добавляем блок с фоновым изображением и кнопкой
    const productImageBlock = document.createElement('div');
    productImageBlock.classList.add('product-card--with-background');
    productImageBlock.style.backgroundImage = `url(${product.image})`;
    productImageBlock.style.backgroundSize = 'cover';
    productImageBlock.style.backgroundPosition = 'center';

    // Добавляем текст "Акция" (если есть)
    if (product.special) {
      const promotionText = document.createElement('span');
      promotionText.textContent = 'Акция';
      productImageBlock.appendChild(promotionText);
    }

    // Добавляем кнопку "Подробнее"
    const moreInfoBtn = document.createElement('button');
    moreInfoBtn.classList.add('btn', 'product-card__button');
    moreInfoBtn.textContent = 'Подробнее';
    productImageBlock.appendChild(moreInfoBtn);

    // Добавляем название товара
    const productTitle = document.createElement('h2');
    productTitle.classList.add('product-card__title');
    productTitle.textContent = product.productName;
    productCard.appendChild(productTitle);

    // Создаем блок с ценами
    const productPricing = document.createElement('div');
    productPricing.classList.add('product-card__pricing');

    // Цена
    if (product.price) {
      const productPrice = document.createElement('span');
      productPrice.classList.add('product-card__price');
      productPrice.textContent = product.price;
      productPricing.appendChild(productPrice);
    }

    // Старая цена
    if (product.initPrice) {
      const productOldPrice = document.createElement('span');
      productOldPrice.classList.add('product-card__price--old');
      productOldPrice.textContent = product.initPrice;
      productPricing.appendChild(productOldPrice);
    }

    // Скидка
    if (product.finalPrice) {
      const productDiscountedPrice = document.createElement('span');
      productDiscountedPrice.classList.add('product-card__price--discounted');
      productDiscountedPrice.textContent = product.finalPrice;
      productPricing.appendChild(productDiscountedPrice);
    }

    // Добавляем блок с ценой и скидками в карточку
    productCard.appendChild(productPricing);

    // Добавляем блок с фоновым изображением в карточку
    productCard.insertBefore(productImageBlock, productTitle);

    // Добавляем карточку в контейнер с продуктами
    productsContainer.appendChild(productCard);
  });
}

// Загружаем карточки при загрузке страницы
window.onload = fetchProducts;
