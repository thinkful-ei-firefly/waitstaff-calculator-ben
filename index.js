/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

const STORE = {
  meal: { price: 0, tax: 0, tip: 0 },
  charges: { subtotal: 0, tip: 0, total: 0 },
  earnings: { total: 0, count: 0, avgTip: 0 },
};


function renderCharges() {
  $('.subtotal').text('0');
  $('.tip').text('0');
  $('.total').text('0');
}

function renderEarnings() {
  $('.tip-total').text('0');
  $('.meal-count').text('0');
  $('.avg-tip').text('0');
}

function waitstaffCalculator() {
  renderCharges();
  renderEarnings();
}

$(waitstaffCalculator);