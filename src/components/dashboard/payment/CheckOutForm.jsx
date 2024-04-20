import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useCart from "../../../utils/useCart";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import { AuthContext } from "../../authentication/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate('')
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useContext(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure()
    const totalPrice = cart.reduce((total, item) => Number(total) + Number(item.price), 0)
    console.log(totalPrice)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error?.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })


        if (confirmError) {
            console.log('[confirm error]', confirmError);

        } else {
            console.log('[payment Intent]', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent?.id);
                console.log('transaction ID: ', paymentIntent?.id)

                const payment = {
                    email: user?.email,
                    transactionId: paymentIntent?.id,
                    price: totalPrice,
                    date: new Date(),
                    cartIds: cart.map(c => c?._id),
                    menuItemIds: cart.map(c => c?.cartId),
                    status: 'pending'

                }
                const res = await axiosSecure.post('/payment', payment);
                console.log('payment saved', res?.data);
                refetch();
                if (res?.data?.result?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you! Payment has completed successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/booking');
                }


            }
        }


    }
    return (
        <form className="w-1/2 mx-auto border-2 p-10" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary mt-2" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600 font-bold">Your transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;