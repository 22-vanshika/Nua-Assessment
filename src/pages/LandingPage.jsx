import React from "react";
import { motion } from "framer-motion";
import AuroraBackground from "../components/ui/AuroraBackground";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
return (
    <AuroraBackground className="absolute top-0 left-0 w-full h-full ">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 1.8, ease: "easeInOut" }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 text-center"
      >
        <div className="text-3xl md:text-5xl lg:text-7xl font-bold text-white max-w-4xl tracking-tight">
          Discover Quality, <span className="aurora-text">Delivered to You</span>
        </div>
        <p className="font-light text-base md:text-xl text-white/90 py-4 max-w-2xl leading-relaxed">
          Welcome to Nua Store. Explore our curated collection of amazing products, designed to fit your lifestyle and exceed your expectations.
        </p>
        <Link to="/products" className="btn-base btn-primary text-lg group">
          <span>Shop Now</span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
        
   
      </motion.div>
    </AuroraBackground>
  );
};

export default LandingPage;