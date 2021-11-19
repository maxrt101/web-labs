import React from 'react';
import {Link} from "react-router-dom";
import tesla from '../../assets/tesla.png';
import './CarTemplate.css';

const CartTemplate = props => {
  return (
    <div className="car">
      <img className="left car-img" src={tesla} alt="Car" />
      <div className="right">
        <h4>{props.car.manufacturer} {props.car.model}</h4>
        <p>Plate: {props.car.plate}</p>
        <p>Kilometrage: {props.car.kilometrage}</p>
        <p>Price: {props.car.price}</p>
        <div className="cart-buttons">
          <div>
            <button className="btn btn-outline-dark view-button">
              <Link to={"/car/" + props.car.id}>View</Link>
            </button>
          </div>
          <div>
            <label>${props.car.units*props.car.price}</label>
          </div>
          <div>
            <button className="btn btn-outline-dark view-button" onClick={() => props.onRemove(props.car.id)}>-</button>
            <label>{props.car.units}</label>
            <button className="btn btn-outline-dark view-button" onClick={() => props.onAdd(props.car.id)}>+</button>
            <button className="btn btn-outline-dark view-button" onClick={() => props.onDelete(props.car.id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTemplate;