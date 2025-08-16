"use client";

import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { getApiUrl } from '../config/api.js';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "Please enter a valid phone number"
    )
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(500),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(getApiUrl('/contact'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Get In Touch</h1>
          <p className="hero-subtitle">We're here to help make your island adventure perfect</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info-section">
            <h2 className="section-title">Contact Information</h2>
            <p className="section-description">
              Have questions about rentals or need assistance? We're here to help!
            </p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <MapPin />
                </div>
                <div className="info-content">
                  <h3>Visit Us</h3>
                  <p>Coconut Cruisers HQ<br />Deadman's Cay, Long Island<br />Bahamas</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Phone />
                </div>
                <div className="info-content">
                  <h3>Call Us</h3>
                  <p>+1 (242) 472-0016<br />+1 (242) 367-0942</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Mail />
                </div>
                <div className="info-content">
                  <h3>Email Us</h3>
                  <p>info@tmtsbahamas.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Clock />
                </div>
                <div className="info-content">
                  <h3>Business Hours</h3>
                  <p>Monday - Saturday: 8:00 AM - 6:00 PM<br />Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* Map or Image */}
            <div className="location-image">
              <img src="/assets/location-map.jpg" alt="Our Location" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2 className="section-title">Send Us a Message</h2>
            
            {submitStatus === "success" && (
              <div className="success-message">
                <CheckCircle className="success-icon" />
                <p>Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="error-message">
                <p>There was an error sending your message. Please try again.</p>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="contact-form">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          {...field} 
                          className="form-input"
                          disabled={isSubmitting}
                        />
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
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          {...field} 
                          className="form-input"
                          disabled={isSubmitting}
                        />
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
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="242-555-1234" 
                          {...field} 
                          className="form-input"
                          disabled={isSubmitting}
                        />
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
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          {...field} 
                          className="form-textarea"
                          rows={6}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="button-icon" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;