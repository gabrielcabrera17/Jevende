// CheckoutForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './ChekOutForm.css'; // Asegúrate de crear y enlazar este archivo CSS

const ChekOutForm = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error(error);
        } else {
            console.log(paymentMethod);
            // Aquí puedes enviar el paymentMethod.id y el totalAmount a tu backend para procesar el pago
        }
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h4>Datos de la Tarjeta</h4>
            <div className="card-element-wrapper">
                <CardElement className="card-element" />
            </div>
            <button type="submit" disabled={!stripe} className="pay-button">
                Pagar {totalAmount} Gs
            </button>
        </form>
    );
};

export default ChekOutForm;
