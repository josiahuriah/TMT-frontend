"use client";

import { Checkout } from "./Checkout";
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

  // Fetch vehicle categories from the backend
  useEffect(() => {
    fetch("http://localhost:8080/cars")  // Update to your hosted URL in production
      .then((res) => res.json())
      .then((data) => {
        const categories = [...new Set(data.map((car) => car.category))];
        setVehicleOptions(categories);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  async function onSubmit(values) {
    console.log("Form Submitted:", values);
    const { rentalperiod, vehicleclass } = values;

    if (rentalperiod.from && rentalperiod.to) {
      const days = differenceInDays(rentalperiod.to, rentalperiod.from);
      console.log(`Rental Duration: ${days} days`);
    }

    // Reserve the car via the API
    const car = await fetch("http://localhost:8080/cars")  // Update to hosted URL
      .then((res) => res.json())
      .then((cars) => cars.find((c) => c.category === vehicleclass && c.available));

    if (car) {
      const reserveResponse = await fetch("http://localhost:8080/cars/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ car_id: car.id }),
      });
      if (reserveResponse.ok) {
        setSubmittedData({ ...values, carId: car.id });
        setShowCheckout(true);
      } else {
        alert("Failed to reserve the car. Please try again.");
      }
    } else {
      alert("No available cars in this category.");
    }
  }

  return (
    <Form {...form}>
      {!showCheckout ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 small-container rental-form">
          {!showAdditionalForm ? (
            <>
              <FormLabel className="small-car-cards-title">Contact Information</FormLabel>
              {/* Existing contact fields remain unchanged */}
              <div className="name-field">
                <FormField control={form.control} name="firstname" render={({ field }) => (
                  <FormItem className="firstname">
                    <FormLabel>First Name</FormLabel>
                    <FormControl><Input placeholder="John" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="lastname" render={({ field }) => (
                  <FormItem className="lastname">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="contact-field">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem className="email">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input placeholder="example@email.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="home" render={({ field }) => (
                  <FormItem className="home">
                    <FormLabel>Home #</FormLabel>
                    <FormControl><Input placeholder="242-555-1234" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="cell" render={({ field }) => (
                  <FormItem className="cell">
                    <FormLabel>Cell #</FormLabel>
                    <FormControl><Input placeholder="242-555-1234" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="vehicleclass" render={({ field }) => (
                <FormItem className="rental-form">
                  <FormLabel>Vehicle Class</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a vehicle type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                <FormItem className="rental-form">
                  <FormLabel>Will there be additional drivers?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Yes (FREE Additional Driver)</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              {form.watch("additionaldriverbool") === "true" && (
                <FormField control={form.control} name="additionaldriver" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Driver Name and Age</FormLabel>
                    <FormControl><Input placeholder="John Doe, 30" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}
              <FormField control={form.control} name="rentalperiod" render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental Period</FormLabel>
                  <FormControl><DatePickerWithRange value={field.value} onChange={field.onChange} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex justify-end">
                <Button type="button" variant="outline" onClick={() => setShowAdditionalForm(true)}>
                  Next Step
                </Button>
              </div>
            </>
          ) : (
            <div className="p-4 border rounded-lg">
              <h2 className="text-lg font-bold user-terms">Important Things To Note</h2>
              <p className="user-terms-text">
                <br />
                10.1 The Renter hereby agrees to return the above-described vehicle to the Owner at the physical address no later than the agreed upon end date & time.
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
                <Button type="button" variant="outline" onClick={() => setShowAdditionalForm(false)}>
                  Go Back
                </Button>
                <Button type="submit">Proceed to Checkout</Button>
              </div>
            </div>
          )}
        </form>
      ) : (
        <Checkout formData={submittedData} />
      )}
    </Form>
  );
}