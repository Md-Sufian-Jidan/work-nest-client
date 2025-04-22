import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

// TODO: loadStripe api key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const { email } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: singleEmployee = {} } = useQuery({
        queryKey: ['single-employee'],
        enabled: !!user?.email || !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/single-employee/${email}`);
            return res.data;
        }
    });

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckOut singleEmployee={singleEmployee} />
            </Elements>
        </div>
    );
};

export default Payment;