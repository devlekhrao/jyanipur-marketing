import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { saveMarketingLead } from './db';
import { 
  Grid, Briefcase, Phone, User, ArrowRight, 
  Check, Mail, MapPin, X, Layers, Globe, Home
} from 'lucide-react';

// --- MOTION VARIANTS ---
const pageTransition = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// --- PREMIUM EFFECT 1: KINETIC TEXT REVEAL ---
function RevealText({ text, className }) {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  const wordAnim = {
    hidden: { y: "100%", opacity: 0 },
    show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className={`flex flex-wrap gap-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block pb-1">
          <motion.span variants={wordAnim} className="inline-block">{word}</motion.span>
        </span>
      ))}
    </motion.div>
  );
}

// --- PREMIUM EFFECT 2: MAGNETIC BUTTON ---
function MagneticButton({ children, onClick, className }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.25; // Pull strength
    const y = (e.clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 }); // Snap back
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// --- PREMIUM EFFECT 3: PARALLAX IMAGE ---
function ParallaxImage({ src, alt, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="w-full h-full overflow-hidden relative">
      <motion.img 
        style={{ y }} 
        src={src} 
        alt={alt} 
        className={`absolute inset-0 w-full h-[120%] object-cover -top-[10%] ${className}`} 
      />
    </div>
  );
}

// --- INTERACTIVE SLIDER COMPONENT ---
function CivilToInteriorSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef(null);

  const handleDrag = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div 
      ref={sliderRef}
      onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      onMouseDown={handleDrag}
      className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl select-none border border-[#E7E5E4] cursor-ew-resize group"
    >
      <img src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80" alt="Civil Structure" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold">Stage 1: Civil Framework</div>

      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}>
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80" alt="Finished Interior" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-6 right-6 bg-[#B45309] text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold">Stage 2: Turnkey Interior</div>
      </div>

      <div className="absolute top-0 bottom-0 w-[2px] bg-white z-30" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white text-[#B45309] rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
          ⟷
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const projects = [
    {
      id: 1, category: "Residential", title: "The Glass Monolith Villa", location: "Kondapur", area: "3,400 Sq.Ft.", status: "Completed",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      description: "A modern villa featuring structural glazing, AAC block masonry, and premium teak joinery.", features: ["M25 Grade RCC", "Smart Home", "Italian Marble"]
    },
    {
      id: 2, category: "Civil", title: "Amrutha Tower", location: "Raja Rajeshwari Nagar", area: "6,200 Sq.Ft.", status: "In Progress",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80",
      description: "Executing heavy cantilever RCC and exterior stone cladding using mechanical dry-hanging systems.", features: ["Heavy RCC", "Stone Cladding", "Polyurethane Waterproofing"]
    }
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Grid },
    { id: 'capabilities', label: 'Capabilities', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    // Cleaned up cursor-none, kept overflow-hidden and layout basics
    <div className="min-h-screen bg-[#FDFBF7] text-[#292524] font-sans selection:bg-[#B45309] selection:text-white flex flex-col relative overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>

      {/* SIDEBAR DOCK */}
      <aside className="w-full lg:w-16 lg:fixed lg:top-1/2 lg:-translate-y-1/2 lg:left-6 bg-white/80 backdrop-blur-xl text-[#B45309] rounded-full py-4 flex lg:flex-col items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] z-50 border border-white/50">
        <nav className="flex lg:flex-col items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id} onClick={() => setCurrentPage(item.id)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${currentPage === item.id ? 'bg-[#B45309] text-white scale-105 shadow-md' : 'hover:bg-amber-50 text-[#B45309] hover:scale-110'}`}
            >
              <item.icon className="w-5 h-5" strokeWidth={currentPage === item.id ? 2 : 1.5} />
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 lg:ml-28 p-6 lg:p-10 relative z-10 min-h-screen max-w-[1600px] mx-auto w-full">
        
        <header className="relative z-10 mb-12 flex items-center">
          <h1 onClick={() => setCurrentPage('home')} className="text-3xl lg:text-4xl font-light tracking-[0.3em] text-[#B45309] uppercase cursor-pointer">Jyanipur</h1>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={currentPage} variants={pageTransition} initial="initial" animate="animate" exit="exit">
            
            {/* HOME PAGE WITH HERO */}
            {currentPage === 'home' && (
              <div className="space-y-24">
                <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E7E5E4] h-[600px] lg:h-[750px] w-full bg-[#1C1917] group">
                  
                  {/* High-End Architectural Fallback Image */}
                  <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80" 
                    alt="Luxury Architectural Facade" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out opacity-80" 
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-16 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-transparent pointer-events-none">
                    <span className="text-amber-400 font-semibold text-xs tracking-[0.3em] uppercase mb-4 block">Architectural Execution</span>
                    
                    {/* IMPLEMENTED REVEAL TEXT */}
                    <RevealText text="Interact with space before we build it." className="text-4xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-6" />
                    
                    {/* IMPLEMENTED MAGNETIC BUTTON */}
                    <MagneticButton onClick={() => setCurrentPage('projects')} className="pointer-events-auto inline-flex items-center gap-3 bg-white text-[#B45309] px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase shadow-lg">
                      View Execution Portfolio <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                  </div>
                </section>
              </div>
            )}

            {/* CAPABILITIES (WITH SLIDER) */}
            {currentPage === 'capabilities' && (
              <div className="space-y-16 py-4">
                <div className="mb-12">
                  <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Our Scope</span>
                  
                  {/* IMPLEMENTED REVEAL TEXT */}
                  <RevealText text="From Ground Zero to Luxury Handover" className="text-4xl lg:text-5xl font-light text-[#292524] tracking-tight" />
                </div>
                
                <CivilToInteriorSlider />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  {[
                    { title: 'Civil Frameworks', desc: 'Structural RCC framing and foundation engineering.' },
                    { title: 'Bespoke Interiors', desc: 'Factory-finished modular woodwork and precision finishes.' },
                    { title: 'Turnkey Management', desc: 'Single-point accountability from excavation to handover.' }
                  ].map((cap, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-[#E7E5E4] shadow-sm">
                      <h3 className="text-2xl font-light mb-3 text-[#1C1917]">{cap.title}</h3>
                      <p className="text-[#57534E] text-sm font-light leading-relaxed">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS PAGE */}
            {currentPage === 'projects' && (
              <div className="space-y-12 py-4">
                <div className="flex justify-between items-end mb-12 border-b border-[#E7E5E4] pb-8">
                  <div>
                    <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Curated Works</span>
                    
                    {/* IMPLEMENTED REVEAL TEXT */}
                    <RevealText text="Recent Projects" className="text-4xl lg:text-5xl font-light text-[#292524] tracking-tight" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {projects.map((p) => (
                    <div key={p.id} onClick={() => setSelectedProject(p)} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#E7E5E4] relative cursor-pointer flex flex-col">
                      <div className="h-80 relative overflow-hidden shrink-0">
                        
                        {/* IMPLEMENTED PARALLAX SCROLLING IMAGE */}
                        <ParallaxImage src={p.image} alt={p.title} className="group-hover:scale-105 transition-transform duration-[1.5s]" />
                        
                        <div className="absolute inset-0 bg-[#B45309]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply flex items-center justify-center" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                        <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md text-[#292524] text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase">{p.category}</div>
                      </div>
                      <div className="p-8 flex-1 flex flex-col">
                        <h3 className="text-2xl font-light text-[#1C1917] mb-2">{p.title}</h3>
                        <p className="text-[#57534E] text-sm font-light mb-6 flex-1">{p.description}</p>
                        <div className="text-[#B45309] font-semibold text-xs tracking-wider uppercase group-hover:translate-x-2 transition-transform">
                          View Schematic <ArrowRight className="inline w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* SIMPLE CONTACT PAGE TO PREVENT CRASHES */}
            {currentPage === 'contact' && (
              <div className="space-y-12 py-4">
                <RevealText text="Start Your Architectural Journey" className="text-4xl lg:text-6xl font-light text-[#292524] tracking-tight mb-6" />
                <p className="text-[#57534E] text-lg font-light leading-relaxed max-w-2xl">
                  Connect with our principal engineering team in Kondapur, Hyderabad for site consultations, structural audits, or turnkey interior estimates.
                </p>
                <div className="pt-8">
                  <MagneticButton onClick={() => alert('Contact Modal Triggered!')} className="px-10 py-5 bg-[#B45309] text-white rounded-full text-sm font-semibold uppercase tracking-widest shadow-lg">
                    Book Executive Consultation
                  </MagneticButton>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}