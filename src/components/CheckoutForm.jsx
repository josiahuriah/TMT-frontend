"use client";

import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx"; 

const CheckoutForm = ({ formData, onClose, onSuccess }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      const paymentData = {
        car_id: formData.carId,
        category: formData.vehicleclass,
        start_date: formData.rentalperiod.from.toISOString().split("T")[0],
        end_date: formData.rentalperiod.to.toISOString().split("T")[0],
        card_number: cardNumber,
        expiry: expiry,
        cvc: cvc,
        total_price: formData.totalPrice,
      };
  
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const response = await fetch(`${API_BASE_URL}/process-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        });
  
        if (!response.ok) {
          throw new Error("Payment failed");
        }
  
        const result = await response.json();
        if (result.success) {
          onSuccess();
        } else {
          setError(result.error || "Payment processing error");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="checkout container">
        <h2 className="car-cards-title">Checkout</h2>
        <p>Vehicle Class: {formData.vehicleclass}</p>
        <p>Rental Period: {formData.rentalperiod.from.toDateString()} to {formData.rentalperiod.to.toDateString()}</p>
        <p>Total Price: ${formData.totalPrice}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Card Number</label>
            <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" required />
          </div>
          <div>
            <label>Expiry (MM/YY)</label>
            <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" required />
          </div>
          <div>
            <label>CVC</label>
            <Input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" required />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </Button>
          <Button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</Button>
        </form>
      </div>
    );
  };

export default CheckoutForm