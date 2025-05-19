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
            employeeEmail: singleEmployee?.email,
            employeeId: singleEmployee?._id,
            amount: singleEmployee?.salary,
            month: new Date().toLocaleString("default", { month: "long" }),
            year: new Date().getFullYear(),
        };
        axiosSecure.post('/create-payment-intent', pay)
            .then(res => {
                setClientSecret(res?.data?.client_secret);
                if (res.data?.error) {
                    // console.log(res.data?.error);
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
            // console.log('payment method error', error);
            setError(error);
        }
        else {
            // console.log('success', paymentMethod);
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
            // console.log('payment intent ', paymentIntent);
            toast.warn('Your Payment is Processing');
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
            <div className="bg-white rounded-lg shadow p-6 my-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <p className="text-gray-700">
                        <span className="font-medium">Employee Name:</span> {singleEmployee.name}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Salary:</span>{" "}
                        <span className="text-green-600 font-semibold">${singleEmployee.salary}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border p-4 rounded-md shadow-sm bg-gray-50">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": {
                                            color: "#aab7c4",
                                        },
                                    },
                                    invalid: {
                                        color: "#9e2146",
                                    },
                                },
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret}
                        className={`w-full py-2 px-4 text-white rounded-md transition 
        ${!stripe || !clientSecret ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
      `}
      >
                        Pay Now
                    </button>

                    {error && (
                        <p className="text-sm text-red-500 mt-1">{error.message || error}</p>
                    )}
                    {transactionId && (
                        <p className="text-sm text-green-600 mt-2">
                            ✅ Payment successful. Transaction ID:{" "}
                            <span className="font-medium">{transactionId}</span>
                        </p>
                    )}
                </form>
            </div>

        </>
    );
};

export default CheckOut;