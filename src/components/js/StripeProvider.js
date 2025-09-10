import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY")
export default function StripeProvider({ children }) {
    return(
        <>
        <Elements stripe={stripePromise}>{children}</Elements>
        </>
    )
}