import React from 'react';
import car from '../../assets/tesla.png';
import './CarTemplate.css';

export default class CarTemplate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="car">
        <img className="car-img" src={car} alt="Car" />
        <h4>{this.props.car.manufacturer} {this.props.car.model}</h4>
        <p>Plate: {this.props.car.plate}</p>
        <p>Kilometrage: {this.props.car.kilometrage}</p>
        <p>Price: {this.props.car.price}</p>
      </div>
    );
  }
}