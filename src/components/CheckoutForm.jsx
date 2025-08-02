"use client";

import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx"; 
import { format } from "date-fns";
import { getApiUrl } from '../config/api.js';

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
        // Prepare reservation data for the backend
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

        console.log("Creating reservation:", reservationData);

        // Create the reservation
        const response = await fetch(getApiUrl('/reservations'), {
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
        
        // In a real app, you'd process the payment here
        // For now, we'll just simulate payment success
        setTimeout(() => {
          onSuccess();
        }, 1000);
        
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
        <div className="booking-summary" style={{ 
          marginBottom: "30px", 
          padding: "20px", 
          border: "1px solid #ddd", 
          borderRadius: "8px",
          backgroundColor: "#f9f9f9"
        }}>
          <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", fontWeight: "600" }}>Booking Summary</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", fontSize: "0.9rem" }}>
            <strong>Name:</strong>
            <span>{formData.firstname} {formData.lastname}</span>
            
            <strong>Email:</strong>
            <span>{formData.email}</span>
            
            <strong>Vehicle:</strong>
            <span>{formData.carName} ({formData.vehicleclass})</span>
            
            <strong>Rental Period:</strong>
            <span>{format(new Date(formData.startDate), "MMM dd, yyyy")} to {format(new Date(formData.endDate), "MMM dd, yyyy")}</span>
            
            <strong>Duration:</strong>
            <span>{formData.rentalDays} days</span>
            
            <strong>Rate:</strong>
            <span>${formData.pricePerDay}/day</span>
            
            {formData.additionalDriver && (
              <>
                <strong>Additional Driver:</strong>
                <span>{formData.additionalDriver}</span>
              </>
            )}
            
            <strong style={{ fontSize: "1.1rem", paddingTop: "10px", borderTop: "1px solid #ccc" }}>Total Price:</strong>
            <span style={{ fontSize: "1.1rem", fontWeight: "600", paddingTop: "10px", borderTop: "1px solid #ccc" }}>${formData.totalPrice}</span>
          </div>
        </div>

        {/* Payment Form */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "15px", fontSize: "1.1rem" }}>Payment Information</h3>
          <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "15px" }}>
            Please enter your payment details below. Your card will be charged ${formData.totalPrice} for this reservation.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", fontWeight: "500" }}>Card Number</label>
            <Input 
              value={cardNumber} 
              onChange={(e) => setCardNumber(e.target.value)} 
              placeholder="1234 5678 9012 3456" 
              required 
            />
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", fontWeight: "500" }}>Expiry (MM/YY)</label>
              <Input 
                value={expiry} 
                onChange={(e) => setExpiry(e.target.value)} 
                placeholder="MM/YY" 
                required 
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", fontWeight: "500" }}>CVC</label>
              <Input 
                value={cvc} 
                onChange={(e) => setCvc(e.target.value)} 
                placeholder="123" 
                required 
              />
            </div>
          </div>
          
          {error && (
            <div style={{ 
              color: "red", 
              marginBottom: "15px", 
              padding: "10px", 
              backgroundColor: "#fee", 
              border: "1px solid #fcc",
              borderRadius: "4px",
              fontSize: "0.9rem"
            }}>
              {error}
            </div>
          )}
          
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <Button type="button" onClick={onClose} variant="outline" disabled={loading}>
              Go Back
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : `Complete Payment ($${formData.totalPrice})`}
            </Button>
          </div>
        </form>
      </div>
    );
  };

export default CheckoutForm