import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, reset, payment } from '../Slice/CounterSlice';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';


function Counter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {count,isPaid} = useSelector((state) => state.counter.value)

  const [orderID, setOrderID] = useState(null);
  const [paid, setPaid] = useState(isPaid);
  const [error, setError] = useState(null);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "test desc",
          amount: {
            value: count.toFixed(2), // Use the count value as the amount
          },
        },
      ],
    });
  };
  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture(); // Captures the payment
      console.log("Payment successful:", order);
      setPaid(true);
      dispatch(payment());
      navigate('/task'); 
    } catch (err) {
      console.error("Payment capture error:", err);
      setError(err);
    }
  };

  // if the payment process is cancelled by the buyer
  const onCancel = (data) => {
    console.log("Payment cancelled:", data);
    alert("Payment was cancelled.");
  };

  // if an error occurs during the payment process
  const onError = (err) => {
    console.error("PayPal Checkout onError:", err);
    setError(err);
    alert("An error occurred during payment. Please try again.");
  };
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen z-[5] relative'>
        <span className='text-white'>{count}</span>
        <div className='flex gap-5'>

          <button className='bg-green-500 p-2 m-2' onClick={() => dispatch(increment(5))}>Increment</button>
          <button className='bg-zinc-500 p-2 m-2' onClick={() => dispatch(reset())}>Reset</button>
          <button className='bg-red-500 p-2 m-2' onClick={() => dispatch(decrement())}>Decrement</button>
        </div>

         <div className=" m-5">
          {count >= 1 && <PayPalScriptProvider
            options={{
              clientId: "AYDml8Z0gD9qFoA0coHm-jq5dgXXM_C9ZyKGmDMfmdzht_E4wP0g3icLbqPwbjeJixmGBX4hMjgUbfYQ",
            }} >
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onCancel={onCancel}
              onError={onError}
            />
          </PayPalScriptProvider>}
        </div>
      </div>
    </>
  )
}

export default Counter
