const theater = document.querySelector('.theater');
const unoccupiedSeats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('movie');
let total = document.getElementById('total');
let count = document.getElementById('count');
let moviePrice =  +movieSelect.value;

console.log(theater);
console.log(unoccupiedSeats);
console.log(movieSelect);
console.log(total);
console.log(count);
console.log(typeof moviePrice);