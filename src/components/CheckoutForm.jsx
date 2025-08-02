"use client";

import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx"; 
import { format } from "date-fns";

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
  
      try {
        const API_BASE_URL = "https://tmt-rental-backend.onrender.com";
        
        // Create the reservation
        const reservationData = {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          home: formData.home,
          cell: formData.cell,
          car_id: formData.carId,
          start_date: formData.startDate,
          end_date: formData.endDate,
          total_price: formData.totalPrice,
        };

        console.log("Submitting reservation:", reservationData);

        const response = await fetch(`${API_BASE_URL}/reservations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservationData),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error || "Reservation failed");
          } catch (parseError) {
            throw new Error(errorText || "Reservation failed");
          }
        }
  
        const result = await response.json();
        console.log("Reservation successful:", result);
        onSuccess();
        
      } catch (err) {
        console.error("Payment/Reservation error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="checkout container">
        <h2 className="car-cards-title">Checkout</h2>
        
        {/* Booking Summary */}
        <div className="booking-summary" style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "5px" }}>
          <h3>Booking Summary</h3>
          <p><strong>Name:</strong> {formData.firstname} {formData.lastname}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Vehicle:</strong> {formData.carName} ({formData.vehicleclass})</p>
          <p><strong>Rental Period:</strong> {format(new Date(formData.startDate), "MMM dd, yyyy")} to {format(new Date(formData.endDate), "MMM dd, yyyy")}</p>
          <p><strong>Duration:</strong> {formData.rentalDays} days</p>
          <p><strong>Rate:</strong> ${formData.pricePerDay}/day</p>
          <p><strong>Total Price:</strong> ${formData.totalPrice}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Card Number</label>
            <Input 
              value={cardNumber} 
              onChange={(e) => setCardNumber(e.target.value)} 
              placeholder="1234 5678 9012 3456" 
              required 
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Expiry (MM/YY)</label>
            <Input 
              value={expiry} 
              onChange={(e) => setExpiry(e.target.value)} 
              placeholder="MM/YY" 
              required 
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>CVC</label>
            <Input 
              value={cvc} 
              onChange={(e) => setCvc(e.target.value)} 
              placeholder="123" 
              required 
            />
          </div>
          
          {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
          
          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : `Complete Payment ($${formData.totalPrice})`}
            </Button>
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  };

export default CheckoutForm