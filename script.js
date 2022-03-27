const basket = document.querySelector('.basket');
const secHeader = document.querySelector('.header');
const secCatalog = document.getElementById('catalog');
const secSell = document.querySelector('.section__sell');
const back = document.querySelector('.sell__picture');
const basketCounter = document.querySelector('.basket__counter');
const cartWrapper = document.querySelector('.item__wrapper');

basket.addEventListener('click', () => {
  secHeader.classList.add('hide');
  secCatalog.classList.add('hide');
  secSell.classList.remove('hide');
})
back.addEventListener('click', () => {
  secHeader.classList.remove('hide');
  secCatalog.classList.remove('hide');
  secSell.classList.add('hide');
});

// клік по кнопці "Додати в корзину"
window.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-cart')){
      const card = event.target.closest('.card');
      
      const productInfo = {
          id: card.dataset.id,
          imgSrc: card.querySelector('.product__img').getAttribute('src'),
          name: card.querySelector('.product__name').innerText,
          weight: card.querySelector('.price__weight').innerText,
          price: card.querySelector('.price__currenty').innerText
      };

      const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

      if(itemInCart){
        const counterEl = itemInCart.querySelector('[data-counter]');
        counterEl.innerText = parseInt(counterEl.innerText) + 1;
      }
      else{
      const cartItemHtml = `<div class="cart__item card d-flex flex-md-row justify-content-between align-items-center" data-id="${productInfo.id}">
      <img src="${productInfo.imgSrc}" alt="" class="cart__item-img">
      <h4 class="cart__item-name">${productInfo.name}</h4>
      <div class="items items--small counter-wrapper d-flex">
        <button class="items__control up__border" data-action="minus">-</button>
        <div class="items__current" data-counter="">1</div>
        <button class="items__control down__border" data-action="plus">+</button>
      </div>
      <div class="cart__items-currency">${productInfo.price}</div>
    </div>`;

    cartWrapper.insertAdjacentHTML("afterbegin", cartItemHtml);

    basketCounter.innerText = parseInt(basketCounter.innerText) + 1;

    toggleCartStatus();

    calcCartPrice()

    alert(`Ви додали в корзику ${productInfo.name}.`);
    }
  }
});

// клік по лічильнику
window.addEventListener('click', (event) => {
  let counter;
  if(event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus'){
    const counterWrapper = event.target.closest('.counter-wrapper');
    counter = counterWrapper.querySelector('[data-counter]');
  }
  if(event.target.dataset.action === 'plus'){
    counter.innerText = ++counter.innerText;
    calcCartPrice();
  }
  if(event.target.dataset.action === 'minus'){
    if(parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;

      calcCartPrice();
    }else if(event.target.closest('.item__wrapper') && parseInt(counter.innerText) === 1) {
      event.target.closest('.cart__item').remove();

      toggleCartStatus();

      basketCounter.innerText = parseInt(basketCounter.innerText) - 1;
    }
  }
  if(event.target.hasAttribute('[data-action]') && event.target.closest('.cart-wrapper')) {
    calcCartPrice();
  }
});

function toggleCartStatus(){
  const cartEmptyBadge = document.querySelector('.basket__none');
  const orderForm = document.querySelector('.order__container')

  if (cartWrapper.children.length > 1) { 
    cartEmptyBadge.classList.add('hide');
    orderForm.classList.remove('hide');
  } else {
    cartEmptyBadge.classList.remove('hide');
    orderForm.classList.add('hide');
  }
};
function calcCartPrice(){
  const cartItems = document.querySelectorAll('.cart__item');
  const totalPriceEl = document.querySelector('.total-price');

  let totalPrice = 0;

  cartItems.forEach(function (item) {
    const amountEl = item.querySelector('[data-counter]');
    const pricetEl = item.querySelector('.cart__items-currency');

    const currentPrice  = parseInt(amountEl.innerText) * parseInt(pricetEl.innerText);

    totalPrice += currentPrice;
  });

  totalPriceEl.innerText = totalPrice;
}




