import Hero from "@/components/Hero";
import Products from "@/components/Services";
import About from "@/components/About";
import WhyUs from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/BookingCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <About />
      <WhyUs />
      <Testimonials />
      <Contact />
    </main>
  );
}
