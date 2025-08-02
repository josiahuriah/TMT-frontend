"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { format, differenceInDays } from "date-fns";

export function Checkout({ formData }) {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardholderName: ""
  });

  // Calculate rental duration and total cost
  const rentalDays = formData.rentalperiod.from && formData.rentalperiod.to
    ? differenceInDays(formData.rentalperiod.to, formData.rentalperiod.from)
    : 0;
  const ratePerDay = 95;
  const totalCost = rentalDays * ratePerDay;

  // Handle card input changes
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkout submission
  const handleCheckout = () => {
    const checkoutData = {
      ...formData,
      rentalDays,
      totalCost,
      paymentInfo: cardInfo
    };
    console.log("Checkout Submitted:", checkoutData);
    // Code to later send to payment processor
  };

  return (
    <div className="checkout-container p-6 border rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Rental Checkout</h2>
      
      {/* Rental Summary */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold">Rental Summary</h3>
        <div className="grid grid-cols-2 gap-2">
          <p>Name:</p>
          <p>{formData.firstname} {formData.lastname}</p>
          
          <p>Email:</p>
          <p>{formData.email}</p>
          
          <p>Home Phone:</p>
          <p>{formData.home}</p>
          
          <p>Cell Phone:</p>
          <p>{formData.cell}</p>
          
          <p>Vehicle Class:</p>
          <p>{formData.vehicleclass}</p>
          
          {formData.additionaldriverbool === "true" && (
            <>
              <p>Additional Driver:</p>
              <p>{formData.additionaldriver}</p>
            </>
          )}
          
          <p>Rental Period:</p>
          <p>
            {format(formData.rentalperiod.from, "PPP")} -{" "}
            {formData.rentalperiod.to ? format(formData.rentalperiod.to, "PPP") : "Not set"}
          </p>
          
          <p>Rental Duration:</p>
          <p>{rentalDays} days</p>
          
          <p>Rate:</p>
          <p>${ratePerDay}/day</p>
          
          <p className="font-semibold">Total Cost:</p>
          <p className="font-semibold">${totalCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold">Payment Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Card Number</label>
            <Input
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardInfo.cardNumber}
              onChange={handleCardInputChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Expiry Date</label>
              <Input
                name="expiry"
                placeholder="MM/YY"
                value={cardInfo.expiry}
                onChange={handleCardInputChange}
              />
            </div>
            <div>
              <label className="block mb-1">CVV</label>
              <Input
                name="cvv"
                placeholder="123"
                value={cardInfo.cvv}
                onChange={handleCardInputChange}
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-1">Cardholder Name</label>
            <Input
              name="cardholderName"
              placeholder="John Doe"
              value={cardInfo.cardholderName}
              onChange={handleCardInputChange}
            />
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="flex justify-end">
        <Button onClick={handleCheckout}>
          Complete Payment (${totalCost.toFixed(2)})
        </Button>
      </div>
    </div>
  );
}