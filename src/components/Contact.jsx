"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button.jsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form.jsx";
import { Input } from "./ui/input.jsx";
import { Textarea } from "@/components/ui/textarea" 
import TMTLogo from "/assets/logo3.png"; 

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "Please enter a valid phone number"
    )
    .optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(500),
});

const Contact = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5001";
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        form.reset(); // Clear form on success
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="contact">
      <header className="contact-header">
        <img src={TMTLogo} alt="TMT Coconut Cruisers Logo" className="contact-logo" />
        <h1 className="contact-title">Contact Us</h1>
      </header>

      <section className="contact-info">
        <h2 className="info-title">Get in Touch</h2>
        <p className="info-text">
          Have questions or need assistance? Reach out to us—we’re here to help!
        </p>
        <ul className="info-list">
          <li>Email: <a href="mailto:info@tmtsbahamas.com">info@tmtsbahamas.com</a></li>
          <li>Phone: +1 (242) 472-0016</li>
          <li>Alternate: +1 (242) 367-0942</li>
          <li>Address: Coconut Cruisers HQ, Deadman’s Cay, Bahamas</li>
        </ul>
      </section>

      <section className="contact-form">
        <h2 className="form-title">Send Us a Message</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="form-container">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} className="form-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} className="form-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="242-555-1234" {...field} className="form-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message here..." {...field} className="form-textarea" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="form-button">
              Send Message
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default Contact;