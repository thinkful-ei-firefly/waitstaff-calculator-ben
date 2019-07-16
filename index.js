/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

const STORE = {
  meal: { price: 0, tax: 0, tip: 0 },
  charges: { subtotal: 0, tip: 0, total: 0 },
  earnings: { total: 0, count: 0, avgTip: 0 },
};

function handleCharges(meal) {
  const {price, tax, tip} = meal;
  const taxDecimal = tax / 100;
  const subtotal = (price * taxDecimal) + price;
  const tipAmount = (tip / 100) * price;
  const total = subtotal + tipAmount;
  renderCharges(subtotal, tipAmount, total);
}

function handleFormSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    let price = $(event.currentTarget).find('[name="price"]').val();
    let tax = $(event.currentTarget).find('[name="tax"]').val();
    let tip = $(event.currentTarget).find('[name="tip"]').val();
    price = parseFloat(price);
    tax = parseFloat(tax);
    tip = parseFloat(tip);
    handleCharges({price, tax, tip});
  });
}

function renderCharges(subtotal, tip, total) {
  $('.subtotal').text(subtotal);
  $('.tip').text(tip);
  $('.total').text(total);
}

function renderEarnings() {
  $('.tip-total').text('0');
  $('.meal-count').text('0');
  $('.avg-tip').text('0');
}

function waitstaffCalculator() {
  handleFormSubmit();
  renderCharges();
  renderEarnings();
}

$(waitstaffCalculator);