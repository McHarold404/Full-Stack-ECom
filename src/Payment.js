import { ElevenMp, InsertEmoticon } from "@mui/icons-material";
import { useElements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { async } from "@firebase/util";
import axios from "./axios";
import { useNavigate } from "react-router-dom";


function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
    const elements = useElements();
  const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  

    useEffect(() => {
        const getClientSecret = async () => {
          const response = await axios({
            method: 'post',
            url: `/payments/create?total=${getBasketTotal(basket)* 100}`
          });
          setClientSecret(response.data.clientSecret)
       }
        getClientSecret();
  },[basket])

  const handleSubmit = async (event) => {
      // handle the stripe payment here.
      event.preventDefault();
      setProcessing(true);
      
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
        }
    }).then(({ paymentIntent }) => {
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      navigate('/orders', { replace: true });

      })

    }
    const handleChange = event => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "");

    }
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3> Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>
              {" "}
              {user?.email} <br />{" "}
            </p>
            <p> 123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* payment section - Review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3> Review Items and Delivery </h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3> Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                                      <h3> Order Total : {value}</h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                              />
                              <button disabled={processing || disabled || succeeded}>
                                  <span>{processing ? <p>Processing</p> :"Buy Now"}</span>
                            </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
