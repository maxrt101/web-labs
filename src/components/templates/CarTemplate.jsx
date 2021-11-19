import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import tesla from '../../assets/tesla.png';
import './CarTemplate.css';
import { addToCart } from '../redux/actions';

const AddToCart = props => {
  const dispatch = useDispatch();
  return (
    <button className="btn btn-outline-dark" onClick={() => dispatch(addToCart(props.car))}>Add To Cart</button>
  );
}

const CarTemplate = props => {
  return (
    <div className="car">
      <img className="left car-img" src={tesla} alt="Car" />
      <div className="right">
        <h4>{props.car.manufacturer} {props.car.model}</h4>
        <p>Plate: {props.car.plate}</p>
        <p>Kilometrage: {props.car.kilometrage}</p>
        <p>Price: {props.car.price}</p>
        <div className="buttons">
          <button className="btn btn-outline-dark view-button">
            <Link to={"/car/"+props.car.id}>View</Link>
          </button>
          <AddToCart car={props.car}/>
        </div>
      </div>
    </div>
  );
}

export default CarTemplate;