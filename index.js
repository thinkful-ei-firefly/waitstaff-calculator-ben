/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

const STORE = {
  mealCount: 0,
  tipTotal: 0,
  tips: [],
  avgTip: 0,
  charges: { subtotal: 0, tip: 0, total: 0 },
};

function getDecimalFromPercent(num) {
  return parseFloat(num) / 100;
}

// const getDecimalFromPercent = (num) => {
//   return num / 100;
// };

function renderCharges() {
  const {subtotal, tip, total} = STORE.charges;
  $('.subtotal').text(subtotal.toFixed(2));
  $('.tip').text(tip.toFixed(2));
  $('.total').text(total.toFixed(2));
}

function renderEarnings() {  
  $('.tip-total').text(STORE.tipTotal.toFixed(2));
  $('.meal-count').text(STORE.mealCount);
  $('.avg-tip').text(STORE.avgTip.toFixed(2));
}

function handleCharges(meal) {
  const {priceVal, taxVal, tipVal} = meal;
  const subtotal = (priceVal * taxVal) + priceVal;
  const tipAmount = tipVal * subtotal;
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
    const {price, tax, tip} = event.currentTarget;
    const priceVal = parseFloat(price.value);
    const taxVal = getDecimalFromPercent(tax.value);
    const tipVal = getDecimalFromPercent(tip.value);
    handleCharges({priceVal, taxVal, tipVal});
    handleEarnings(priceVal, tipVal);
    $('input').val('');
  });
}

function handleCancelSubmit() {
  $('.cancel').click(() => {
    $('input').val('');
  });
}


function handleReset() {
  $('.reset').click(() => {
    STORE.mealCount = 0;
    STORE.tipTotal = 0;
    STORE.tips.length = 0;
    STORE.avgTip = 0;
    STORE.charges = { subtotal: 0, tip: 0, total: 0 };
    renderCharges();
    renderEarnings();
  });
}

function waitstaffCalculator() {
  handleFormSubmit();
  handleReset();
  handleCancelSubmit();
  renderEarnings();
  renderCharges();
}

$(waitstaffCalculator);