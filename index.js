const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rate = document.getElementById('rate');

//Calculate exchange rate
const calculate = () => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const amount_one = amountEl_one.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const priceRate = data.rates[currencyEl_two.value].toFixed(2);
      amountEl_two.value = (priceRate * amount_one).toFixed(2);
      rate.innerText = `1 ${currency_one} = ${priceRate} ${currency_two}`;
    });
};

// Swap country
const swapCountry = () => {
  let temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
};

// Event listeners
currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', swapCountry);

calculate();
