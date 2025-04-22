import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const CheckOut = ({ singleEmployee }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();
    const [transactionId, setTransactionId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useAuth();
    const salary = parseInt(singleEmployee?.salary);

    useEffect(() => {
        const salary = singleEmployee?.salary;
        axiosSecure.post('/create-payment-intent', { salary })
            .then(res => {
                setClientSecret(res?.data?.client_secret);
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

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                }
            }
        });

        if (confirmError) {
            console.log(confirmError);
        }
        else {
            console.log('payment intent ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log(paymentIntent.id);
                const paymentDetails = {
                    hrEmail: user?.email,
                    hrName: user?.displayName,
                    employeeName: singleEmployee?.name,
                    employeeEmail: singleEmployee?.email,
                    employeeSalary: salary,
                    monthYear: new Date().toLocaleString('default', {
                        month: 'long',
                        year: 'numeric'
                    }),
                    transactionId: transactionId,
                };

                const res = await axiosSecure.post('/employee-payment', paymentDetails);
                if (res?.data?.result?.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: `${singleEmployee?.name} salary has been payed.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
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

                <p className="text-red-500">{error?.message}</p>
                {transactionId && <p className="text-green-500">Your transaction id : {transactionId}</p>}

            </form>
        </>
    );
};

export default CheckOut;