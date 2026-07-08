import { motion } from "framer-motion";
import { Car, GraduationCap, TreePine, Building, Volume2, Shield } from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Traffic Analysis",
    description: "Real-time and historical traffic patterns, commute times, and congestion hotspots.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: GraduationCap,
    title: "Schools & Education",
    description: "Nearby schools, ratings, types (public/private), and walking distances.",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: TreePine,
    title: "Green Spaces",
    description: "Parks, forests, recreational areas, and green coverage percentage.",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Building,
    title: "Real Estate Prices",
    description: "Current market prices, trends, price per square meter, and comparisons.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Volume2,
    title: "Noise Levels",
    description: "Ambient noise analysis from traffic, industry, and nightlife sources.",
    color: "bg-red-500/10 text-red-500",
  },
  {
    icon: Shield,
    title: "Safety Index",
    description: "Crime statistics, emergency services proximity, and safety ratings.",
    color: "bg-primary/10 text-primary",
  },
];

const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 gradient-glow opacity-30" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Data Layers</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Everything You Need to Know
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive location intelligence powered by multiple data sources, 
            unified in one beautiful interface.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all hover:shadow-card"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
