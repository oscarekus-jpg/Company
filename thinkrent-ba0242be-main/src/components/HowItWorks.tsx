import { motion } from "framer-motion";
import { MapPin, Layers, FileText, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Select Your Area",
    description: "Choose a plot, district, or draw a radius around any address. Our system works globally.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Explore Data Layers",
    description: "Interactive map with traffic, schools, parks, noise levels, and real estate prices – all in one view.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Generate Report",
    description: "One click creates a professional PDF with written analysis, perfect for clients or personal records.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative bg-secondary/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">How It Works</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Three Steps to Clarity
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From address to actionable insights in under 2 minutes.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass rounded-2xl p-8 text-center relative z-10 hover:border-primary/50 transition-all hover:shadow-glow">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="text-primary/50 text-sm font-mono">{step.number}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-24 -right-4 z-20">
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
