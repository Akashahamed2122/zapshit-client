import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(`pk_test_51NXXXXXaJ2VmYcItcUvb9qXXXXXXX6YX1PbMb`)

const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentForm></PaymentForm>
            </Elements>
            
        </div>
    );
};

export default Payment;