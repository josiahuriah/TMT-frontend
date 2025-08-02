"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { DatePickerWithRange } from "./DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDays, differenceInDays } from "date-fns";
import CheckoutForm from "./CheckoutForm";
import SmallCarCards from "./SmallCarCards"
import { getApiUrl } from '../config/api.js';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const formSchema = z.object({
  firstname: z.string().min(2).max(25),
  lastname: z.string().min(2).max(25),
  email: z.string().email(),
  home: z.string().regex(phoneRegex, "Invalid Number!"),
  cell: z.string().regex(phoneRegex, "Invalid Number!"),
  vehicleclass: z.string().min(1, "Please select a vehicle class"),
  additionaldriverbool: z.string(),
  additionaldriver: z.string().optional(),
  rentalperiod: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  termsAccepted: z.boolean().optional(),
});

export function RentalForm() {
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      home: "",
      cell: "",
      vehicleclass: "",
      additionaldriverbool: "false",
      additionaldriver: "",
      rentalperiod: { from: new Date(), to: addDays(new Date(), 10) },
      termsAccepted: false,
    },
  });


  useEffect(() => {
    fetch(getApiUrl('/cars'))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const categories = [...new Set(data.map((car) => car.category))];
        setVehicleOptions(categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  async function onSubmit(values) {
    const { 
      rentalperiod, 
      vehicleclass, 
      firstname, 
      lastname, 
      email, 
      home, 
      cell,
      termsAccepted
    } = values;
  
    // Check terms acceptance
    if (!termsAccepted) {
      alert("Please accept the terms to proceed.");
      return;
    }
  
    // Calculate rental days
    const days = rentalperiod.to 
      ? differenceInDays(rentalperiod.to, rentalperiod.from) 
      : 1;
  
    console.log("Form values:", values);
  
    try {
      // Fetch available cars
      console.log("Fetching cars from:", getApiUrl('/cars'));
      const carsResponse = await fetch(getApiUrl('/cars'));
      
      console.log("Cars response status:", carsResponse.status);
      
      if (!carsResponse.ok) {
        const errorText = await carsResponse.text();
        console.error("Cars fetch error:", errorText);
        throw new Error(`Cars fetch failed: ${carsResponse.status}`);
      }
      
      const cars = await carsResponse.json();
      console.log("Available cars:", cars);
      
      const car = cars.find(
        (c) => c.category === vehicleclass && c.quantity > 0
      );
  
      if (!car) {
        alert("No available cars in this category.");
        return;
      }
  
      console.log("Selected car:", car);
  
      // Prepare reservation data
      const reservationData = {
        firstname,
        lastname,
        email,
        home,
        cell,
        car_id: car.id,
        start_date: rentalperiod.from.toISOString().split('T')[0],
        end_date: rentalperiod.to.toISOString().split('T')[0],
        total_price: days * car.price_per_day,
      };
  
      console.log("Sending reservation data:", reservationData);
  
      // Make reservation (POST request)
      const reserveResponse = await fetch(getApiUrl('/reservations'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });
  
      console.log("Reservation response status:", reserveResponse.status);
  
      if (reserveResponse.ok) {
        const result = await reserveResponse.json();
        console.log("Reservation success:", result);
        alert("Reservation successful!");
        // Optionally reset form or navigate to a confirmation page
        form.reset();
      } else {
        const errorText = await reserveResponse.text();
        console.error("Reservation error response:", errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          alert(`Reservation failed: ${errorData.error}`);
        } catch (parseError) {
          console.error("Could not parse error response as JSON:", parseError);
          alert(`Reservation failed: ${errorText}`);
        }
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("An error occurred. Please try again later.");
    }
  }


  const handleCheckoutSuccess = () => {
    setShowCheckout(false);
    alert("Booking successful! Car reserved.");
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
  };

  if (loading) return <p>Loading vehicle options...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Form {...form}>
      {!showCheckout ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 small-container rental-form">
          {!showAdditionalForm ? (
            <>
              <FormLabel className="small-car-cards-title contact-info">Contact Information</FormLabel>
              <div className="name-field">
                <FormField control={form.control} name="firstname" render={({ field }) => (
                  <FormItem className="firstname">
                    <FormLabel className="rental-form-label">First Name</FormLabel>
                    <FormControl className="input-form-field"><Input className=""placeholder="John" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="lastname" render={({ field }) => (
                  <FormItem className="lastname">
                    <FormLabel className="rental-form-label">Last Name</FormLabel>
                    <FormControl className="input-form-field"><Input placeholder="Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="contact-field">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem className="email">
                    <FormLabel className="rental-form-label">Email Address</FormLabel>
                    <FormControl className="input-form-field"><Input placeholder="example@email.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="home" render={({ field }) => (
                  <FormItem className="home">
                    <FormLabel className="rental-form-label">Home #</FormLabel>
                    <FormControl className="input-form-field"><Input placeholder="242-555-1234" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="cell" render={({ field }) => (
                  <FormItem className="cell">
                    <FormLabel className="rental-form-label">Cell #</FormLabel>
                    <FormControl className="input-form-field"><Input placeholder="242-555-1234" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormLabel className="vehicle-info">Vehicle Selection</FormLabel>
              <SmallCarCards />
              <FormField control={form.control} name="vehicleclass" render={({ field }) => (
                <FormItem >
                  <FormLabel className="rental-form-label">Vehicle Class</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} className="input-form-field">
                    <FormControl className="input-form-field">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a vehicle type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rental-form-label">
                      {vehicleOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              {/* Additional driver and rental period fields remain largely unchanged */}
              <FormField control={form.control} name="additionaldriverbool" render={({ field }) => (
                <FormItem >
                  <FormLabel className="rental-form-label">Will there be additional drivers?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="input-form-field">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="input-form-field" value="true">Yes (FREE Additional Driver)</SelectItem>
                      <SelectItem className="input-form-field" value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              {form.watch("additionaldriverbool") === "true" && (
                <FormField control={form.control} name="additionaldriver" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="rental-form-label">Additional Driver Name and Age</FormLabel>
                    <FormControl className="input-form-field"><Input placeholder="John Doe, 30" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}
              <FormField control={form.control} name="rentalperiod" render={({ field }) => (
                <FormItem>
                  <FormLabel className="rental-form-label">Rental Period</FormLabel>
                  <FormControl className="input-form-field relative"><DatePickerWithRange value={field.value} onChange={field.onChange} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex justify-end">
                <Button className="next-button" type="button" variant="outline" onClick={() => setShowAdditionalForm(true)}>
                  Next Step
                </Button>
              </div>
            </>
          ) : (
            <div className="p-4 border rounded-lg">
              <h2 className="text-lg font-bold user-terms">Important Things To Note</h2>
              <p className="user-terms-text">
              <br /><br />• A valid driver’s license is required at the time of pickup for verification.
              <br />
• $10 fee for pick-up and drop-off beyond Deadmans cay
<br /><br /><br />
Exclusions<br /><br />
7.1 The rented vehicle shall not be used to carry passengers or property for hire.
<br />
7.2 The rented vehicle shall not be used for any illegal purpose.
<br />
7.3 The rented vehicle shall not be operated by any other person other than the

 
<br /><br /><br />
Insurance<br /><br />
8.1 The Renter hereby agrees that he/she shall be held fully responsible for any and
<br />
all loss of or damage to the vehicle or equipment during the term of this Car Rental
<br />
Agreement whether caused by collision, fire, flood, vandalism, theft or any other
<br />
cause, except that which shall be determined to be caused by a fault or defect of the
<br />
vehicle or equipment.
<br />
8.2 In the absence of damage or loss, said deposit shall be credited toward payment
<br />
of the Rental Rate and any excess shall be returned to the Renter.
<br /><br /><br />
Deposit<br /><br />
9.1 The Renter further agrees to make a deposit of $100.00 with the Owner, said
<br />
deposit to be used, in the event of loss of or damage to the vehicle or equipment
<br />
during the term of this Car Rental Agreement, to defray fully or partially the cost
<br />
of necessary repairs or replacement.
<br />
9.2 In the absence of damage or loss, said deposit shall be credited toward payment
<br />
of the Rental Rate and any excess shall be returned to the Renter.
<br />
<br />
<br />
Vehicle Return
<br /><br />
                10. The Renter hereby agrees to return the above-described vehicle<br /> to the Owner at the physical address no later than the agreed upon end date & time.<br /><br />
              </p>
              <FormField control={form.control} name="termsAccepted" render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>I Understand and Accept these terms.</FormLabel>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex justify-end mt-4 space-x-2">
                <Button type="button" className="next-button" variant="outline" onClick={() => setShowAdditionalForm(false)}>
                  Go Back
                </Button>
                <Button type="submit" className="next-button">Proceed to Checkout</Button>
              </div>
            </div>
          )}
        </form>
      ) : (
        <CheckoutForm formData={submittedData} onClose={handleCheckoutClose} onSuccess={handleCheckoutSuccess}/>
      )}
    </Form>
  );
}
