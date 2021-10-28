import React from 'react';
import car from '../../../assets/honda.jpg';
import './Hero.css';

export default function Hero() {
  return (
    <div className="hero">
      <img className="hero-img" src={car} alt="Car"></img>
      <div>
        <h1>Car Shop</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </div>
  );
}