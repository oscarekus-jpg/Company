import { motion } from "framer-motion";
import { Home, Building2, Briefcase, Calendar } from "lucide-react";

const audiences = [
  {
    icon: Home,
    title: "Families & Home Buyers",
    description: "Find the perfect neighborhood for your family with confidence. Know about schools, parks, and safety before you visit.",
  },
  {
    icon: Building2,
    title: "Real Estate Agencies",
    description: "Impress clients with professional location reports. White-label solutions available for your brand.",
  },
  {
    icon: Briefcase,
    title: "Developers & Investors",
    description: "Make data-driven investment decisions. Analyze potential returns and area development trends.",
  },
  {
    icon: Calendar,
    title: "Event Planners",
    description: "Check venue accessibility, parking, transport links, and local amenities before booking.",
  },
];

const Audience = () => {
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
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Who It's For</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Built for Decision Makers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're buying your first home or closing your hundredth deal, 
            location intelligence gives you the edge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 flex gap-6 group hover:border-primary/30 transition-all"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-shadow">
                <audience.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{audience.title}</h3>
                <p className="text-muted-foreground">{audience.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;
