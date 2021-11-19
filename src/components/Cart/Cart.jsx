import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem, deleteFromCart } from '../redux/actions';
import CartTemplate from '../templates/CartTemplate';
import './Cart.css';

export default function Cart(props) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const addToCartHandler = (id) => dispatch(updateCartItem({id, units: 1}));
  const removeCartItemHandler = (id) => dispatch(updateCartItem({id, units: -1}));
  const deleteFromCartHandler = (id) => dispatch(deleteFromCart({id}));

  const Container = (props) => {
    if (props.cars.length == 0) {
      return (
        <h1>Cart is empty</h1>
      );
    } else {
      return (
        <ul className="item-list">
          {
            props.cars.map((car, key) => (
              <li key={key}>
                <CartTemplate
                  car={car}
                  onAdd={addToCartHandler.bind(car.id)}
                  onRemove={removeCartItemHandler.bind(car.id)}
                  onDelete={deleteFromCartHandler.bind(car.id)}
                />
              </li>)
            )
          }
        </ul>
      );
    }
  };
  
  return (
    <div className="cart">
      <Container cars={cart} />
      <h4>Total Price: ${cart.reduce((total, car) => total + car.price * car.units, 0)}</h4>
    </div>
  );
}