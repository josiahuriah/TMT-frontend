"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";

const SmallCarCards = () => {
  const [carCards, setCarCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001/car-categories"
      : "https://tmt-rental-backend.onrender.com/car-categories";

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCarCards(data);
      } catch (error) {
        console.error("Error fetching car categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p>Loading car categories...</p>;
  }

  return (
    <div>
      <div className="car-cards">
        {carCards.map((car) => (
          <Card key={car.id} className="small-car-card">
            <CardHeader className="small-car-header">
            <img src={car.image} alt={car.title} className="small-car-image" />
            </CardHeader>
            <CardContent className="car-container">
            <CardTitle className="small-car-title">{car.title}</CardTitle>
            {/* <CardDescription className="small-car-subtitle">{car.description}</CardDescription> */}
              <p className="small-car-rate">
              <br />

                ${car.rate}
                <br />

                <span className="small-car-subrate">+Tax Daily</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmallCarCards;