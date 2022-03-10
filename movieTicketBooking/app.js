const theater = document.querySelector('.theater');
const unoccupiedSeats = [...document.querySelectorAll('.row .seat:not(.occupied)')];
const movieSelect = document.getElementById('movie');
let totalSpan = document.getElementById('total');
let countSpan = document.getElementById('count');
let moviePrice =  +movieSelect.value;


// Set Movie data in local storage

function setMovieDataInLocalStorage(selectedMovieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex', selectedMovieIndex);
    localStorage.setItem('moviePrice', moviePrice);
}

// Click event for movie seat 
theater.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateCountAndTotal();
    }
})

//Movie select event 
movieSelect.addEventListener('change', e => {
    moviePrice = +e.target.value;
    setMovieDataInLocalStorage(e.target.selectedIndex, moviePrice);
    updateCountAndTotal();
})

// Update Count and total
function updateCountAndTotal(){
    const selectedSeats = [...document.querySelectorAll('.theater .selected')];
    let selectedSeatsIndex = selectedSeats.map((seat) => unoccupiedSeats.indexOf(seat));
    localStorage.setItem('selectedSeatIndex', JSON.stringify(selectedSeatsIndex));
    countSpan.innerText = `${selectedSeats.length}`;
    totalSpan.innerText = `$${moviePrice*selectedSeats.length}`;
}

//Populate UI with local storage data
function populateUI(){
    const selectedSeatsIndex = JSON.parse(localStorage.getItem('selectedSeatIndex'));
    if(selectedSeatsIndex !== null && selectedSeatsIndex.length > 0){
        selectedSeatsIndex.forEach((index) => {
            unoccupiedSeats[index].classList.add('selected');
        })
    }
    let selectedMovieIndex = +localStorage.getItem('selectedMovieIndex');
    movieSelect.selectedIndex = selectedMovieIndex;
    moviePrice = +movieSelect.value;
}

populateUI();

updateCountAndTotal();
