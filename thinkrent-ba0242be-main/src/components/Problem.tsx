import { motion } from "framer-motion";
import { AlertTriangle, Search, Clock } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Scattered Information",
    description: "Noise maps, Geoportal, real estate sites, OpenStreetMap – data is everywhere but nowhere unified.",
  },
  {
    icon: Search,
    title: "Complex Research",
    description: "Is this area safe? Are there good schools nearby? How's the traffic? Finding answers takes hours.",
  },
  {
    icon: Clock,
    title: "Time-Consuming Process",
    description: "Real estate agents and families spend days researching locations when decisions need to be made fast.",
  },
];

const Problem = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 gradient-glow opacity-50" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">The Problem</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Location Research is Broken
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're buying a home, representing clients, or planning an event, 
            understanding a location shouldn't require expert GIS knowledge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 text-center group hover:border-destructive/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-destructive/20 transition-colors">
                <problem.icon className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
