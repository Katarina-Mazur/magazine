  // Cсылки на элементы DOM
  const minToggle = document.querySelector('.min-toggle');
  const maxToggle = document.querySelector('.max-toggle');
  const minPriceInput = document.querySelector('.min-price');
  const maxPriceInput = document.querySelector('.max-price');
  const priceScale = document.querySelector('.scale');
  const priceBar = document.querySelector('.bar');

  // Парсим значения для минимального и максимального ползунков
  let minPrice = parseInt(minPriceInput.value);
  let maxPrice = parseInt(maxPriceInput.value);

  // Переменная для отслеживания активного ползунка
  let activeSlider = null;

  // Обработчик события изменения значений в инпутах
  function handleInputChange() {
    const newMinPrice = parseInt(minPriceInput.value);
    const newMaxPrice = parseInt(maxPriceInput.value);

  // новое минимальное значение не больше нового максимального значения и не меньше нуля
  if (newMinPrice <= newMaxPrice) {
    minPrice = newMinPrice;
    maxPrice = newMaxPrice;
  } else if (newMinPrice < 0) {
    // Если новое минимальное значение меньше нуля, делим его на ноль
    minPrice = 0;
    minPriceInput.value = minPrice;
  }
}

  // Обработчик события перемещения ползунков
  function handleSliderMove(event) {
    if (!activeSlider) return; // Если нет активного ползунка, выходим

    const mouseX = event.clientX;
    const barLeft = priceBar.getBoundingClientRect().left;
    const barWidth = priceBar.clientWidth;

    let newPosition = (mouseX - barLeft) - 20; // 20 - половина ширины ползунка
    if (newPosition < 20) {
      newPosition = 20;
    } else if (newPosition > barWidth) {
      newPosition = barWidth + 20;
    }
    
    console.log('Позицияя ползунка: ' + newPosition)
    real_price = Math.round((maxPrice/barWidth) * (newPosition - 20) * 1000)
    console.log('цена-ползунка: ' + real_price)
    console.log('цена-min: ' + minPriceInput.value)
    console.log('цена-max: ' + maxPriceInput.value)
    if (activeSlider === minToggle) {      
      minPriceInput.value = real_price;
      minToggle.style.left = newPosition + 'px';
    } else if (activeSlider === maxToggle) {
      maxPriceInput.value = real_price;
      maxToggle.style.left = newPosition + 'px';
    }
  }
  // обработчики событий для отслеживания активного ползунка
  minToggle.addEventListener('mousedown', () => {
    activeSlider = minToggle;
    window.addEventListener('mousemove', handleSliderMove);
    window.addEventListener('mouseup', () => {
      activeSlider = null;
      window.removeEventListener('mousemove', handleSliderMove);
    });
  });
  maxToggle.addEventListener('mousedown', () => {
    activeSlider = maxToggle;
    window.addEventListener('mousemove', handleSliderMove);
    window.addEventListener('mouseup', () => {
      activeSlider = null;
      window.removeEventListener('mousemove', handleSliderMove);
    });
  });
  //добавляем товар в корзину
  function handleQuantityControls() {
    const quantityButtons = document.querySelectorAll(".quantity-btn");
    const quantityInputs = document.querySelectorAll(".quantity-input");

    quantityButtons.forEach(button => {
        button.addEventListener("click", function() {
            const input = this.parentElement.querySelector(".quantity-input");
            const currentValue = parseInt(input.value);

            if (this.classList.contains("plus")) {
                input.value = currentValue + 1;
            } else if (this.classList.contains("minus") && currentValue > 0) {
                input.value = currentValue - 1;
            }
        });
    });
}

// Function to add a product to the cart
function addToCart(productName, productPrice, quantity) {
    // You can implement your cart logic here, e.g., add the product to an array or update a cart object.
    // For simplicity, we'll just print the information to the console.
    console.log(`Added ${quantity} ${productName}(s) to the cart at $${productPrice * quantity} each.`);
}
document.addEventListener("DOMContentLoaded", function() {
    handleQuantityControls();
    handleAddToCart();
});
//swiper
