import React from 'react';
import car from '../../assets/tesla.png';
import './CarTemplate.css';

const CarTemplate = props => {
  return (
    <div className="car">
      <img className="car-img" src={car} alt="Car" />
      <h4>{props.car.manufacturer} {props.car.model}</h4>
      <p>Plate: {props.car.plate}</p>
      <p>Kilometrage: {props.car.kilometrage}</p>
      <p>Price: {props.car.price}</p>
    </div>
  );
}

export default CarTemplate;