import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import companiesData from "../data/companies.json";
import FAQs from "../data/FAQ.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job <span flex> and get Hired</span>
        </h1>

        <p className="text-white sm:mt-4 text-xs sm:text-xl">
          Explore thousands of jobs here or find the perfect candidate
        </p>
      </section>
      {/* buttons */}
      <div className="flex justify-center items-center gap-6">
        <Link to="/jobs">
          <Button variant="green" size="lg">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button size="lg" variant="secondary">
            Post a Job
          </Button>
        </Link>
      </div>
      {/* carousel */}
      <Carousel
        className="w-full py-10"
        plugins={[
          Autoplay({
            delay: 1000,
          }),
        ]}
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companiesData.map((company) => (
            <CarouselItem key={company.id} className="basis-1/3 lg:basis-1/6">
              <img
                src={company.path}
                alt=""
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* cards */}

      <section className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post Jobs, manage applications, and find the best candidate
          </CardContent>
        </Card>
      </section>

      {/* faq section */}

      <h1 className="text-center text-2xl font-extrabold">FAQs</h1>
      <Accordion type="single" collapsible>
        {FAQs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;