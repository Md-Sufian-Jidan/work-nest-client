import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckOut = ({ singleEmployee }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();
    const [transactionId, setTransactionId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const pay = {
            employeeId: singleEmployee?._id,
            amount: singleEmployee?.salary,
            month: new Date().toLocaleString("default", { month: "long" }),
            year: new Date().getFullYear(),
        };
        axiosSecure.post('/create-payment-intent', pay)
            .then(res => {
                setClientSecret(res?.data?.client_secret);
                if (res.data?.error) {
                    console.log(res.data?.error);
                    setError(res.data?.error);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.warn('Please Wait for the payment');
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment method error', error);
            setError(error);
        }
        else {
            console.log('success', paymentMethod);
            setError('');
        };
        const address = {
            line1: "510 Townsend St",
            postal_code: 98140,
            city: "San Francisco",
            state: 'CA',
            country: 'US',
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                    address: address
                }
            }
        });

        if (confirmError) {
            console.log(confirmError);
        }
        else {
            console.log('payment intent ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent?.id);
                const paymentDetails = {
                    hrEmail: user?.email,
                    hrName: user?.displayName,
                    employeeId: singleEmployee?._id,
                    employeeName: singleEmployee?.name,
                    employeeEmail: singleEmployee?.email,
                    employeeSalary: singleEmployee?.salary,
                    month: new Date().toLocaleString('default', {
                        month: 'long',
                    }),
                    year: new Date().toLocaleString('default', {
                        year: 'numeric'
                    }),
                    transactionId: paymentIntent?.id,
                    paidAt: new Date(),
                };

                await axiosSecure.post('/employee-payment', paymentDetails)
                    .then(res => {
                        Swal.fire({
                            icon: "success",
                            title: `${singleEmployee?.name} salary has been payed.`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/employee-list')
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    };

    return (
        <>
            <div className="flex m-5 justify-between items-center gap-5">
                <p>Employee Name: {singleEmployee.name}</p>
                <p>Employee salary: ${singleEmployee.salary}</p>
            </div>
            <form onSubmit={handleSubmit}>
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
                <button className="btn bg-blue-500 hover:bg-blue-700 m-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>

                {error && <p className="text-red-500">{error}</p>}
                <p className="text-red-500">{error?.message}</p>
                {transactionId && <p className="text-green-500">Your transaction id : {transactionId}</p>}

            </form>
        </>
    );
};

export default CheckOut;