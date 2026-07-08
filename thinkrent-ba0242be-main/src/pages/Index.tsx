import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Audience from "@/components/Audience";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WarsawMap from "@/components/WarsawMap";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Problem />
      
      {/* Interactive Map Section */}
      <section id="map" className="py-24 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Live Demo</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Explore Warsaw Locations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how ThinkRent helps you discover the best locations. Click on markers to explore different neighborhoods.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <WarsawMap className="shadow-card" />
          </motion.div>
        </div>
      </section>
      
      <HowItWorks />
      <Features />
      <Audience />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
