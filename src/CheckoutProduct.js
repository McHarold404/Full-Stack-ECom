/*import React from 'react'
import "./CheckoutProduct.css"

function CheckoutProduct({ id, image, title, price, rating }) {
    
  return (
      <div className='checkoutProduct'>
          <img className='checkoutProduct__image' src={image} />

          <div className='checkoutProduct__info'>
              <p className='checkoutProduct__title'> {title}</p>

              <p className='checkoutProduct__price'>
                  <small>$</small>
                  <strong>{price}</strong>
              </p>
              <div className='checkoutProduct__rating'>
                  {Array(rating)
                      .fill()
                      .map((_, i) => (<p>⭐️</p>
                      ))}
              </div>
              <button>Remove from Basket</button>
            </div>
      </div>
  )
}

export default CheckoutProduct;
*/

import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, image, title, price, rating }) {

    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
       })
        //remove the item from the basket
        }
    
  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct__image-wrapper">
        <img className="checkoutProduct__image" src={image} alt={title} />
      </div>

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐️</p>
            ))}
        </div>

        <button onClick={removeFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
