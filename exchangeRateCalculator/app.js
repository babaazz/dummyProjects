const currencyElement1 = document.getElementById("currency-one");
const amountElement1 = document.getElementById("amount-one");
const currencyElement2 = document.getElementById("currency-two");
const amountElement2 = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

const checkStatusAndParse = response => {
    if(! response.ok){
        throw new Error(`Error status code ${response.status}`);
    } else {
        return response.json();
    }
};

function fetchExchangeRates() {
    let currency1 = currencyElement1.value;
    let currency2 = currencyElement2.value;
    let url = 'https://v6.exchangerate-api.com/v6/63b1705a81ead81577275e4c/latest/' + currency1;
    fetch(url)
    .then(checkStatusAndParse)
    .then(({conversion_rates}) => {
        let rate = conversion_rates[currency2];
        rateElement.innerText = ` 1 ${currency1} = ${rate} ${currency2}`;
        amountElement2.value = (amountElement1.value * rate).toFixed(2);
    }).catch((err) => {
        console.log(err);
    } )
}




currencyElement1.addEventListener('change', fetchExchangeRates);
currencyElement2.addEventListener('change', fetchExchangeRates);
amountElement1.addEventListener('input', fetchExchangeRates);
amountElement2.addEventListener('input', fetchExchangeRates);
swap.addEventListener('click', () => {
    const temp = currencyElement1.value;
    currencyElement1.value = currencyElement2.value;
    currencyElement2.value = temp;
    fetchExchangeRates();
})

fetchExchangeRates();
// fetchExchangeRates('USD', 'INR','https://v6.exchangerate-api.com/v6/63b1705a81ead81577275e4c/latest/')
// .catch((err) => {
//     console.log(err);
// });