"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel.jsx";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import Autoplay from "embla-carousel-autoplay";


const CarouselComponent = () => {
    const [carCards, setCarCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
          try {
            const response = await fetch(`http://localhost:4000/carousel`);
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
          <h2 className="banner1">Your Island's Ultimate Stop for Car Rentals, Stays and more!</h2>
          <Carousel
          plugins={[
            Autoplay({
                delay:5000,
            })
          ]}
          >
            <CarouselContent>
              {carCards.map((carousel) => (
                <CarouselItem key={carousel.id}>
                  <Card
                  className='carousel' 
                  style={{ "--bg-image": `url(${carousel.image})` }}
                    ><div className="overlay"></div>
                    <CardHeader className='content'>
                      <CardTitle>{carousel.bannertitle}</CardTitle>
                      <CardDescription className='bannersubtitle'>{carousel.bannersubtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                        </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Book Now</Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      );
    };
    
    export default CarouselComponent;