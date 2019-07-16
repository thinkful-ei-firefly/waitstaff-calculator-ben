/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

const STORE = {
  mealCount: 0,
  tipTotal: 0,
  tips: [],
  charges: { subtotal: 0, tip: 0, total: 0 },
  earnings: { total: 0, count: 0, avgTip: 0 },
};

function getDecimalFromPercent(num) {
  return num / 100;
}

function handleCharges(meal) {
  const {price, tax, tip} = meal;
  const subtotal = (price * tax) + price;
  const tipAmount = tip * price;
  const total = subtotal + tipAmount;
  STORE.tipTotal += tipAmount;
  renderCharges(subtotal, tipAmount, total);
}

function handleEarnings(price, tip) {
  STORE.tips.push(price * tip);
  const sumTip = STORE.tips.reduce((acc, cur) => acc + cur, 0);
  const avgTip = sumTip / STORE.tips.length;
  renderEarnings(avgTip);
}

function handleFormSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    STORE.mealCount++;
    let price = $(event.currentTarget).find('[name="price"]').val();
    let tax = $(event.currentTarget).find('[name="tax"]').val();
    let tip = $(event.currentTarget).find('[name="tip"]').val();
    price = parseFloat(price);
    tax = parseFloat(tax);
    tip = parseFloat(tip);
    tax = getDecimalFromPercent(tax);
    tip = getDecimalFromPercent(tip);
    handleCharges({price, tax, tip});
    handleEarnings(price, tip);
  });
}

function renderCharges(subtotal, tip, total) {
  $('.subtotal').text(subtotal);
  $('.tip').text(tip);
  $('.total').text(total);
}

function renderEarnings(avgTip) {  
  $('.tip-total').text(STORE.tipTotal);
  $('.meal-count').text(STORE.mealCount);
  $('.avg-tip').text(avgTip);
}

function waitstaffCalculator() {
  handleFormSubmit();
  renderEarnings(0);
}

$(waitstaffCalculator);