import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

//add publishable key!
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
    return (
        <div>
            <SectionTitle heading='Payment' subTitle='Please pay to eat'></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;