/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

const STORE = {
  mealCount: 0,
  tipTotal: 0,
  tips: [],
  avgTip: 0,
  charges: { subtotal: 0, tip: 0, total: 0 },
  earnings: { total: 0, count: 0, avgTip: 0 },
};

function getDecimalFromPercent(num) {
  return num / 100;
}

function renderCharges() {
  $('.subtotal').text(STORE.charges.subtotal);
  $('.tip').text(STORE.charges.tip);
  $('.total').text(STORE.charges.total);
}

function renderEarnings() {  
  $('.tip-total').text(STORE.tipTotal);
  $('.meal-count').text(STORE.mealCount);
  $('.avg-tip').text(STORE.avgTip);
}

function handleCharges(meal) {
  const {price, tax, tip} = meal;
  const subtotal = (price * tax) + price;
  const tipAmount = tip * price;
  const total = subtotal + tipAmount;
  STORE.tipTotal += tipAmount;
  STORE.charges.subtotal = subtotal;
  STORE.charges.tip = tipAmount;
  STORE.charges.total = total;
  renderCharges(subtotal, tipAmount, total);
}

function handleEarnings(price, tip) {
  STORE.tips.push(price * tip);
  const sumTip = STORE.tips.reduce((acc, cur) => acc + cur, 0);
  STORE.avgTip = sumTip / STORE.tips.length;
  renderEarnings();
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

// handleCancelSubmit() {

// }

function handleReset() {
  $('.reset').click(() => {
    $('input').val('');
    STORE.mealCount = 0;
    STORE.tipTotal = 0;
    STORE.tips.length = 0;
    STORE.charges = { subtotal: 0, tip: 0, total: 0 };
    STORE.earnings = { total: 0, count: 0, avgTip: 0 };
    STORE.avgTip = 0;
    renderCharges();
    renderEarnings();
  });
}

function waitstaffCalculator() {
  handleFormSubmit();
  handleReset();
  renderEarnings();
  renderCharges();
}

$(waitstaffCalculator);