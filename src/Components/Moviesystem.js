import React, { useState } from "react";
import "./Moviesystem.css";

function MovieSeatBooking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [soldSeats, setSoldSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(80);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [movieType, setMovieType] = useState("standard");
  const [rows] = useState(12);
  const [columns] = useState(15);

  const handleSeatClick = (e, row, col) => {
    if (!e.target.classList.contains("sold")) {
      const selectedSeatsCopy = [...selectedSeats];
      const seat = { row, col };

      if (
        (movieType === "standard" && col >= 2 && col <= 12) ||
        (movieType === "premium" && (col === 0 || col === 1 || col === 13 || col === 14))
      ) {
        if (selectedSeatsCopy.length < maxQuantity) {
          const seatIndexInSelectedSeats = selectedSeatsCopy.findIndex(
            (selectedSeat) => selectedSeat.row === seat.row && selectedSeat.col === seat.col
          );

          if (seatIndexInSelectedSeats !== -1) {
            selectedSeatsCopy.splice(seatIndexInSelectedSeats, 1);
          } else {
            if (soldSeats.find((soldSeat) => soldSeat.row === seat.row && soldSeat.col === seat.col)) {
              alert("This seat is already sold!");
            } else {
              selectedSeatsCopy.push(seat);
            }
          }
        }
      }

      setSelectedSeats(selectedSeatsCopy);
    } else {
      alert("This seat is already Booked!");
    }
  };

  const handleMovieTypeChange = (e) => {
    const selectedMovieType = e.target.value;
    if (selectedMovieType === "standard") {
      setTicketPrice(80);
    } else{
      setTicketPrice(150);
    }
    setMovieType(selectedMovieType);
    handleResetSeats();
  };

  const handleSellSeats = () => {
    setSoldSeats((prevSoldSeats) => {
      const newSoldSeats = [...prevSoldSeats];
      newSoldSeats.push(...selectedSeats);
      return newSoldSeats;
    });
    setSelectedSeats([]);
    setMaxQuantity(1);
    setMovieType("standard"); 
  };
  
  
  const handleQuantityChange = (e) => {
    setMaxQuantity(parseInt(e.target.value, 10));
  };

  const handleResetSeats = () => {
    setSelectedSeats([]);
  };

  const totalCost = selectedSeats.length * ticketPrice;

  return (
    <div>
      <h1>Movie Seat Booking</h1>

      <div className="select-container">
        <div className="movie-type-container">
          <label>Select Movie Type:</label>
          <select
            id="movieType"
            onChange={handleMovieTypeChange}
            value={movieType}
          >

            <option value="standard">Standard (80RS)</option>
            <option value="premium">Premium (150RS)</option>
          </select>
        </div>
        <div className="quantity-container">
          <label>Select Quantity:</label>
          <select
            id="quantity"
            onChange={handleQuantityChange}
            value={maxQuantity}
          >
            {Array.from({ length: 15 }).map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="showcase">
        <li>
          <div className="seat available"></div>
          <span className="available-count">
            {rows * columns - soldSeats.length - selectedSeats.length} Seats Available
          </span>
        </li>
        <li>
          <div className="seat selected"></div>
          <span className="selected-count">{selectedSeats.length} Seats Selected</span>
        </li>
        <li>
          <div className="seat sold"></div>
          <span className="sold-count">{soldSeats.length} Seats Sold</span>
        </li>
      </ul>

      <div className="container">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: columns }).map((_, colIndex) => {
              const seatNumber = rowIndex * columns + colIndex + 1;
              const seatClass = soldSeats.find(
                (seat) => seat.row === rowIndex && seat.col === colIndex
              )
                ? "sold"
                : selectedSeats.find(
                    (seat) => seat.row === rowIndex && seat.col === colIndex
                  )
                ? "selected"
                : "available";

              return (
                <div
                  key={colIndex}
                  className={`seat ${seatClass}`}
                  onClick={(e) => handleSeatClick(e, rowIndex, colIndex)}
                >
                  p{seatNumber}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="pricing">
        <p>
          {selectedSeats.length > 0
            ? `Total Cost for ${
                selectedSeats.length === 1 ? "Seat" : "Seats"
              }: ${totalCost} RS`
            : ""
          }
        </p>
        <p>{`Selected Movie Type: ${movieType} : ${ticketPrice} RS`}</p>
      </div>

      <button className="proceed-button" onClick={handleSellSeats}>Proceed</button>
    </div>
  );
}

export default MovieSeatBooking;