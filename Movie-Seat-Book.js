const moviesList = [
    { movieName: "Flash", price: 7, seats: 20 },
    { movieName: "Spiderman", price: 5, seats: 25 },
    { movieName: "Batman", price: 4, seats: 30 },
];

let totalSelectedSeat = 0;
let moviePrice = 0;
let totalPrice = 0;

function countTotalPrice() {
    totalSelectedSeat = document.querySelectorAll('#seatCont .selected').length;
    totalPrice = moviePrice * totalSelectedSeat;
    document.querySelector('#numberOfSeat').textContent = totalSelectedSeat;
    document.querySelector('#totalPrice').textContent = `$${totalPrice}`;
}

function removeSelectedSeatsHolder() {
    document.querySelector("#selectedSeatsHolder").innerHTML = `<span class="noSelected">No Seat Selected</span>`;
}

function updateSelectedSeatsHolder() {
    let selectedSeatsHolder = document.querySelector("#selectedSeatsHolder");
    selectedSeatsHolder.innerHTML = ``;
    let selectedSeats = document.querySelectorAll('#seatCont .selected');
    selectedSeats.forEach((seat) => {
        const seatHolder = document.createElement("div");
        seatHolder.classList.add("selectedSeat");
        selectedSeatsHolder.appendChild(seatHolder);
        seatHolder.innerHTML = seat.getAttribute("data-seatId");
    });
}

// Populate movie selection dropdown
let selectMovieID = document.querySelector('#selectMovie');

moviesList.forEach((movie, index) => {
    let option = document.createElement('option');
    option.textContent = `${movie.movieName} $${movie.price}`;
    selectMovieID.appendChild(option);
    
    // Generate seats for the first movie by default
    if (index === 0) {
        generateSeats(movie.seats);
        document.querySelector("#movieName").textContent = movie.movieName;
        document.querySelector("#moviePrice").textContent = `$${movie.price}`;
        moviePrice = movie.price;
    }
});

// Generate seats based on the selected movie
function generateSeats(numSeats) {
    const seatCont = document.getElementById('seatCont');
    seatCont.innerHTML = ''; // Clear previous seats
    for (let i = 1; i <= numSeats; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.setAttribute("data-seatId", i);
        seat.innerHTML = `<i class="fas fa-chair"></i>`; // Add Font Awesome icon for the seat
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('occupied')) {
                seat.classList.toggle('selected');
                countTotalPrice();
                updateSelectedSeatsHolder();
            }
        });
        seatCont.appendChild(seat);
    }
}

selectMovieID.addEventListener("input", (event) => {
    const selectedMovieIndex = event.target.selectedIndex;
    const selectedMovie = moviesList[selectedMovieIndex];
    document.querySelector("#movieName").textContent = selectedMovie.movieName;
    document.querySelector("#moviePrice").textContent = `$${selectedMovie.price}`;
    moviePrice = selectedMovie.price;
    generateSeats(selectedMovie.seats); // Generate seats for the selected movie
    countTotalPrice(); // Update price count after changing movie
});

// Cancel button functionality
document.querySelector('#cancelBtn').addEventListener('click', () => {
    let selectedSeats = document.querySelectorAll('#seatCont .selected');
    selectedSeats.forEach(seat => {
        seat.classList.remove("selected");
    });
    countTotalPrice();
    removeSelectedSeatsHolder();
});

// Proceed button functionality
document.querySelector('#proceedBtn').addEventListener('click', () => {
    if (!totalSelectedSeat) {
        alert("Oops no seat Selected");
    } else {
        alert("Yayy! Your Seats have been booked");
    }

    let selectedSeats = document.querySelectorAll('#seatCont .selected');
    selectedSeats.forEach(seat => {
        seat.classList.replace("selected", "occupied");
        seat.innerHTML = `<i class="fas fa-times"></i>`; // Change the icon for occupied seats
    });

    countTotalPrice();
    removeSelectedSeatsHolder();
});
