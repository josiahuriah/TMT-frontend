"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";

const CarCards = () => {
    const [carCards, setCarCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const API_URL =
        process.env.NODE_ENV === "development"
            ? "http://localhost:5001/car-categories"
            : "https://tmt-rental-backend.onrender.com/car-categories";
  
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setCarCards(data);
        } catch (error) {
          console.error("Error fetching cars:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCars();
    }, []);
  
    if (loading) {
      return <p>Loading cars...</p>;
    }
  
    return (
      <div>
        <h2 className="car-cards-title">Choose the perfect class for your needs.</h2>
        <div className="car-cards">
            {carCards.map((car) => (
                <Card key={car.id} className='car-card'>
                  <CardHeader>
                    <CardTitle className="car-title">{car.title}</CardTitle>
                    <CardDescription className="car-subtitle">{car.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="car-container">
                    <img src={car.image} alt={car.title}  className="car-image"/>
                    <p className="car-rate">${car.rate}<br></br><span className="car-subrate">+Tax Daily</span></p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                    className="car-card-button"
                    onClick={() => navigate(`/rental/`)

                    }>Book Now</Button>
                  </CardFooter>
                </Card>
            ))}
            </div>
      </div>
    );
  };
  
  export default CarCards;