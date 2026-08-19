import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const imageReveal = {
  hidden: { scale: 1.1, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isConsultModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isLeadSaved, setIsLeadSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState('dodla');

  const [leadData, setLeadData] = useState({
    clientName: '',
    phone: '',
    projectType: 'Turnkey Residential Construction',
    notes: ''
  });

  // --- DATA ---
  const clients = [
    { name: 'Dodla Dairy', role: 'Corporate Headquarters & Outlets', location: 'Greater Hyderabad' },
    { name: 'Dodla Foundation', role: 'CSR & Institutional Facilities', location: 'Telangana' },
    { name: 'Dodla College', role: 'Educational Infrastructure', location: 'Hyderabad Corridor' },
    { name: 'DivyaSree', role: 'Commercial & High-End Interiors', location: 'HITEC City' }
  ];

  const telanganaStories = {
    dodla: {
      title: 'The Dodla Institutional Footprint',
      client: 'Dodla Dairy, Foundation & College',
      desc: 'Executing specialized commercial fit-outs, educational facilities, and corporate administrative infrastructure across Hyderabad with heavy structural precision.',
      stats: '350,000+ Sq.Ft Delivered'
    },
    divyasree: {
      title: 'High-Density Commercial Fit-Outs',
      client: 'DivyaSree Commercial',
      desc: 'Precision acoustic paneling, glass partitions, and large-format flooring fit-outs delivered within premier IT corridors for high-capacity corporate environments.',
      stats: '220,000+ Sq.Ft Delivered'
    },
    monoliths: {
      title: 'Bespoke Luxury Residential Monoliths',
      client: 'Private High-Net-Worth Residences',
      desc: 'Villas built from ground excavation to complete interior handover in 14 months across Kondapur, Jubilee Hills, and Gachibowli.',
      stats: '150,000+ Sq.Ft Handed Over'
    }
  };

  const projects = [
    {
      id: 1,
      category: "Residential",
      title: "The Glass Monolith Villa",
      location: "Kondapur, Hyderabad",
      area: "3,400 Sq.Ft.",
      status: "Completed",
      // Image: Luxury interior with a person interacting with the space
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
      description: "A state-of-the-art modern villa featuring structural glazing, AAC block masonry, and premium teak veneer joinery. Built from excavation to final handover in 14 months.",
      features: ["M25 Grade RCC Structure", "Premium Teak Woodwork", "Smart Home Automation", "Italian Marble Flooring"]
    },
    {
      id: 2,
      category: "Civil",
      title: "Amrutha Residential Tower",
      location: "Raja Rajeshwari Nagar",
      area: "6,200 Sq.Ft.",
      status: "In Progress",
      // Image: Architects/engineers on a construction site
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80",
      description: "A multi-story residential framework executing heavy cantilever RCC and exterior stone cladding using mechanical dry-hanging systems.",
      features: ["Heavy Reinforced Concrete", "Exterior Stone Cladding", "Polyurethane Waterproofing", "Commercial Grade Plumbing"]
    },
    {
      id: 3,
      category: "Interiors",
      title: "Luxury Duplex Fit-Out",
      location: "Gachibowli, Hyderabad",
      area: "4,800 Sq.Ft.",
      status: "Completed",
      // Image: Elegant interior with motion blur/people walking
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
      description: "A complete interior transformation featuring factory-pressed BWP plywood modular kitchens, Gyproc cove illumination, and bespoke furniture.",
      features: ["Acrylic Modular Kitchen", "Concealed Lighting", "Large-format Tiles", "Bespoke Flush Doors"]
    },
    {
      id: 4,
      category: "Interiors",
      title: "Corporate Office Hub",
      location: "HITEC City, Hyderabad",
      area: "8,500 Sq.Ft.",
      status: "Completed",
      // Image: Modern office space with people working/collaborating
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      description: "Modern open-plan workspace designed for productivity, featuring acoustic paneling, glass partitions, and ergonomic modular workstations.",
      features: ["Acoustic Ceiling Clouds", "Glass Partitions", "Commercial HVAC", "Modular Workstations"]
    }
  ];

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveMarketingLead({
        clientName: leadData.clientName,
        phone: leadData.phone,
        projectType: leadData.projectType,
        notes: leadData.notes
      });
      setIsLeadSaved(true);
    } catch (err) {
      setIsLeadSaved(true); // Fallback for demo
    } finally {
      setLoading(false);
    }
  };

  const teakTintFilter = 'brightness(0) saturate(100%) invert(36%) sepia(61%) saturate(2251%) hue-rotate(5deg) brightness(95%) contrast(92%)';

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Layers },
    { id: 'stories', label: 'Stories of Telangana', icon: Globe },
    { id: 'projects', label: 'Projects', icon: Grid },
    { id: 'capabilities', label: 'Capabilities', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#292524] font-sans selection:bg-[#B45309] selection:text-white flex flex-col antialiased relative overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* BACKGROUND GRAPHICS (Subtle motion layer) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="fixed -top-[40vh] -right-[20vw] w-[80vw] h-[80vw] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none z-0" 
      />

      {/* SIDEBAR DOCK */}
      <aside className="w-full lg:w-16 lg:fixed lg:top-1/2 lg:-translate-y-1/2 lg:left-6 bg-white/80 backdrop-blur-xl text-[#B45309] rounded-full py-4 flex lg:flex-col items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] z-50 border border-white/50">
        <nav className="flex lg:flex-col items-center gap-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#B45309] text-white shadow-lg scale-105' 
                      : 'hover:bg-amber-50 text-[#B45309] hover:scale-110'
                  }`}
                >
                  <IconComponent className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                </button>
                <div className="hidden lg:block absolute left-16 top-1/2 -translate-y-1/2 bg-[#292524] text-white text-xs font-semibold px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 pointer-events-none shadow-xl z-50">
                  {item.label}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex lg:flex-col items-center gap-2 mt-2 pt-4 border-t border-[#E7E5E4] shrink-0">
          <a 
            href="https://www.jyanipur.org.in" target="_blank" rel="noreferrer" title="Client Portal"
            className="w-12 h-12 flex items-center justify-center text-[#B45309] hover:bg-amber-50 transition-colors rounded-full"
          >
            <User className="w-5 h-5" strokeWidth={1.5} />
          </a>
          <button 
            onClick={() => setIsEstimateModalOpen(true)}
            className="w-12 h-12 bg-[#292524] text-white hover:bg-[#B45309] rounded-full transition-colors shadow-lg flex items-center justify-center group"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 lg:ml-28 p-6 lg:p-10 relative z-10 min-h-screen max-w-[1600px] mx-auto w-full">
        
        {/* HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 mb-12 pt-2 flex items-center justify-start"
        >
          <div className="relative flex items-center w-full">
            <div className="h-24 sm:h-32 lg:h-36 w-auto flex items-center shrink-0 lg:-ml-28 pr-6 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img 
                src="/jyanipur.png" 
                alt="Jyanipur Symbol" 
                className="h-full w-auto object-contain object-left hover:opacity-80 transition-opacity" 
                style={{ filter: teakTintFilter }} 
              />
            </div>
            <h1 onClick={() => setCurrentPage('home')} className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.3em] text-[#B45309] uppercase cursor-pointer">
              Jyanipur
            </h1>
          </div>
        </motion.header>

        {/* PAGE CONTENT SWITCHER WITH ANIMATION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* --- HOME PAGE --- */}
            {currentPage === 'home' && (
              <div className="space-y-16">
                <section className="relative z-10">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/40 h-[600px] lg:h-[750px] w-full group">
                    <motion.img 
                      variants={imageReveal}
                      initial="hidden"
                      animate="show"
                      // Image featuring a person in an architectural space
                      src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2400&q=80" 
                      alt="Featured Architecture with people" 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292524]/90 via-[#292524]/20 to-transparent flex flex-col justify-end p-10 lg:p-16">
                      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-3xl">
                        <motion.span variants={fadeUpItem} className="text-amber-400 font-semibold text-xs tracking-[0.3em] uppercase mb-4 block">
                          Architectural Execution
                        </motion.span>
                        <motion.h2 variants={fadeUpItem} className="text-4xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-6">
                          Where structural engineering meets lived-in luxury.
                        </motion.h2>
                        <motion.div variants={fadeUpItem}>
                          <button onClick={() => setCurrentPage('projects')} className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-white hover:text-[#B45309] transition-all duration-300">
                            Explore Selected Works <ArrowRight className="w-4 h-4" />
                          </button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* --- ABOUT US PAGE --- */}
            {currentPage === 'about' && (
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-16 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-5">
                    <motion.span variants={fadeUpItem} className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-3 block">Hyderabad Headquarters</motion.span>
                    <motion.h2 variants={fadeUpItem} className="text-4xl lg:text-6xl font-light text-[#292524] leading-[1.1] tracking-tight mb-6">
                      Built for <br/><span className="text-[#B45309] italic">Generations.</span>
                    </motion.h2>
                    <motion.p variants={fadeUpItem} className="text-[#57534E] text-lg font-light leading-relaxed mb-6">
                      Anchored in Hyderabad, Jyanipur is a premier civil construction and luxury interior firm built on structural integrity, meticulous engineering, and high-end fit-out mastery. We don't just build structures; we craft environments where people thrive.
                    </motion.p>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div variants={fadeUpItem} className="bg-white p-10 rounded-3xl border border-[#E7E5E4] shadow-sm hover:shadow-xl transition-shadow duration-500">
                      <span className="text-4xl lg:text-5xl font-light text-[#B45309] block mb-4">800k+</span>
                      <span className="text-xs font-semibold text-[#292524] uppercase tracking-wider block mb-3">Sq.Ft Delivered in Telangana</span>
                      <p className="text-sm text-[#78716C] font-light leading-relaxed">Spanning luxury private residences, institutional campuses, and corporate headquarters built for daily human interaction.</p>
                    </motion.div>
                    <motion.div variants={fadeUpItem} className="bg-[#B45309] text-white p-10 rounded-3xl shadow-xl">
                      <span className="text-4xl lg:text-5xl font-light block mb-4">100%</span>
                      <span className="text-xs font-semibold text-amber-100 uppercase tracking-wider block mb-3">In-House Execution</span>
                      <p className="text-sm text-amber-50 font-light leading-relaxed">Direct management of specialized civil labor, joinery units, and architectural teams ensures zero compromise on quality.</p>
                    </motion.div>
                  </div>
                </div>

                <motion.div variants={fadeUpItem} className="pt-16 border-t border-[#E7E5E4]">
                  <div className="mb-10 flex flex-col md:flex-row justify-between items-end">
                    <div>
                      <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Enterprise Partners</span>
                      <h2 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight">Institutional Roster</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {clients.map((c, i) => (
                      <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border border-[#E7E5E4] shadow-sm">
                        <h3 className="text-xl font-normal text-[#1C1917] mb-2 tracking-tight">{c.name}</h3>
                        <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider block mb-2">{c.role}</span>
                        <p className="text-xs text-[#78716C] font-light">{c.location}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* --- STORIES OF TELANGANA PAGE --- */}
            {currentPage === 'stories' && (
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="py-4 space-y-12">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                  <motion.div variants={fadeUpItem}>
                    <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Core Stronghold</span>
                    <h2 className="text-4xl lg:text-5xl font-light text-[#292524] tracking-tight">Stories of Telangana</h2>
                  </motion.div>
                  <motion.p variants={fadeUpItem} className="text-base text-[#78716C] max-w-md font-light leading-relaxed">
                    Centrally built in Hyderabad, delivering landmark infrastructure and high-end fit-outs across the state.
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-8">
                  {/* MAP CONTAINER */}
                  <motion.div variants={fadeUpItem} className="lg:col-span-6 flex flex-col relative space-y-10">
                    <style dangerouslySetInnerHTML={{__html: `
                      .highlight-telangana path#IN-TG, .highlight-telangana path[title="Telangana"] { 
                        fill: #B45309 !important; transition: fill 0.3s ease; 
                      }
                    `}} />
                    <div className="flex flex-col items-center justify-center w-full py-4 bg-white rounded-3xl border border-[#E7E5E4] shadow-sm p-8">
                      <object type="image/svg+xml" data="/india.svg" className="w-full h-auto max-h-[500px] object-contain drop-shadow-sm" aria-label="India Vector Map">
                        <img src="/india.svg" alt="India Map" className="w-full max-h-[500px]" />
                      </object>
                      <div className="flex items-center gap-2 mt-8 text-xs font-semibold text-[#B45309] bg-amber-50 px-5 py-2.5 rounded-full border border-amber-200/60">
                        <MapPin className="w-4 h-4" /> <span>Hyderabad • Active Execution Stronghold</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* STORY CARDS */}
                  <motion.div variants={fadeUpItem} className="lg:col-span-6 space-y-8">
                    <div className="flex flex-wrap gap-3">
                      {['dodla', 'divyasree', 'monoliths'].map((story) => (
                        <button
                          key={story}
                          onClick={() => setSelectedStory(story)}
                          className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border ${
                            selectedStory === story 
                              ? 'bg-[#292524] text-white border-[#292524] shadow-lg' 
                              : 'bg-white text-[#57534E] border-[#E7E5E4] hover:border-[#B45309] hover:text-[#B45309]'
                          }`}
                        >
                          {story === 'dodla' ? 'Dodla Group' : story === 'divyasree' ? 'DivyaSree' : 'Luxury Villas'}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={selectedStory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white p-10 lg:p-12 rounded-3xl border border-[#E7E5E4] shadow-xl space-y-6"
                      >
                        <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider block">
                          {telanganaStories[selectedStory].client}
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight leading-tight">
                          {telanganaStories[selectedStory].title}
                        </h3>
                        <p className="text-[#57534E] text-lg font-light leading-relaxed">
                          {telanganaStories[selectedStory].desc}
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-[#E7E5E4] mt-8 gap-4">
                          <div>
                            <span className="text-xs text-[#78716C] uppercase tracking-wider block mb-1">Execution Volume</span>
                            <span className="text-xl font-normal text-[#292524]">
                              {telanganaStories[selectedStory].stats}
                            </span>
                          </div>
                          <button onClick={() => setIsEstimateModalOpen(true)} className="flex items-center gap-2 text-xs font-semibold text-[#B45309] hover:text-[#92400E] transition-colors uppercase tracking-wider group">
                            Discuss Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* --- PROJECTS PAGE --- */}
            {currentPage === 'projects' && (
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-12 py-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 border-b border-[#E7E5E4] pb-8">
                  <motion.div variants={fadeUpItem}>
                    <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Curated Works</span>
                    <h2 className="text-4xl lg:text-5xl font-light text-[#292524] tracking-tight">Recent Projects</h2>
                  </motion.div>
                  <motion.div variants={fadeUpItem} className="flex flex-wrap gap-2 bg-white p-2 rounded-full border border-[#E7E5E4] shadow-sm">
                    {['All', 'Residential', 'Civil', 'Interiors'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-2.5 text-xs font-semibold tracking-wider rounded-full transition-all duration-300 ${
                          activeFilter === filter ? 'bg-[#292524] text-white shadow-md' : 'bg-transparent text-[#57534E] hover:text-[#B45309]'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </motion.div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <AnimatePresence>
                    {filteredProjects.map((p) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        key={p.id} 
                        className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#E7E5E4]"
                        onClick={() => setSelectedProject(p)}
                      >
                        <div className="h-80 overflow-hidden relative">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                          <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md text-[#292524] text-xs font-bold px-4 py-2 rounded-full shadow-sm tracking-widest uppercase">
                            {p.category}
                          </div>
                        </div>
                        <div className="p-8 lg:p-10">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-2xl font-light text-[#1C1917] mb-3 group-hover:text-[#B45309] transition-colors">{p.title}</h3>
                              <p className="text-xs text-[#78716C] font-semibold flex items-center gap-1.5 tracking-wider uppercase"><MapPin className="w-3.5 h-3.5 text-[#B45309]" strokeWidth={2} /> {p.location}</p>
                            </div>
                          </div>
                          <p className="text-[#57534E] text-base font-light mb-8 line-clamp-2 leading-relaxed">{p.description}</p>
                          <div className="flex items-center justify-between border-t border-[#E7E5E4] pt-6">
                            <span className="text-[#B45309] text-xs font-bold tracking-widest uppercase">
                              {p.area}
                            </span>
                            <div className="flex items-center text-[#292524] font-semibold text-xs tracking-wider uppercase group-hover:text-[#B45309] transition-colors">
                              View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" strokeWidth={2} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}

            {/* --- CONTACT PAGE --- */}
            {currentPage === 'contact' && (
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-12 py-4">
                <motion.div variants={fadeUpItem} className="max-w-3xl">
                  <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Get In Touch</span>
                  <h2 className="text-4xl lg:text-6xl font-light text-[#292524] tracking-tight mb-6">Start Your Architectural Journey</h2>
                  <p className="text-[#57534E] text-lg font-light leading-relaxed">
                    Connect with our principal engineering team in Kondapur, Hyderabad for site consultations, structural audits, or turnkey interior estimates.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <motion.div variants={fadeUpItem} className="lg:col-span-5 bg-white p-10 rounded-3xl border border-[#E7E5E4] shadow-sm space-y-8 flex flex-col justify-center">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#B45309]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#292524] uppercase tracking-wider mb-1">Headquarters</h4>
                        <p className="text-sm text-[#57534E] font-light leading-relaxed">302 Amrutha Lakshmi Residency, Kondapur, Hyderabad, 500084</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-[#B45309]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#292524] uppercase tracking-wider mb-1">Email</h4>
                        <p className="text-sm text-[#57534E] font-light leading-relaxed">accounts@jyanipur.in</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-[#B45309]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#292524] uppercase tracking-wider mb-1">Direct Line</h4>
                        <p className="text-sm text-[#57534E] font-light leading-relaxed">+91 9246546742</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUpItem} className="lg:col-span-7 bg-[#292524] p-10 lg:p-14 rounded-3xl shadow-xl flex flex-col justify-center text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#B45309] rounded-full blur-[100px] opacity-30"></div>
                    <h3 className="text-3xl font-light mb-4 relative z-10">Ready to break ground?</h3>
                    <p className="text-stone-300 font-light mb-10 relative z-10 max-w-md">Schedule a detailed executive consultation with our project directors to map out timelines, structural requirements, and design scopes.</p>
                    <button 
                      onClick={() => setIsEstimateModalOpen(true)}
                      className="w-full py-5 bg-[#B45309] text-white rounded-full text-sm font-semibold uppercase tracking-widest shadow-lg hover:bg-white hover:text-[#B45309] transition-all duration-300 relative z-10"
                    >
                      Book Executive Consultation
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* --- CAPABILITIES --- */}
            {currentPage === 'capabilities' && (
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-16 py-4">
                <motion.div variants={fadeUpItem} className="mb-12">
                  <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Our Scope</span>
                  <h2 className="text-4xl lg:text-5xl font-light text-[#292524] tracking-tight">End-to-End Execution</h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: 'Civil Construction', desc: 'Structural RCC framing, heavy masonry, and foundational civil engineering built to last generations.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
                    { title: 'Bespoke Interiors', desc: 'Factory-finished modular woodwork, precision marble flooring, and custom acoustic environments.', img: 'https://images.unsplash.com/photo-1540932239986-30128078f3b5?auto=format&fit=crop&w=800&q=80' },
                    { title: 'Turnkey Management', desc: 'A single point of accountability coordinating labor, vendors, compliance, and flawless handovers.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' }
                  ].map((cap, i) => (
                    <motion.div key={i} variants={fadeUpItem} className="bg-white rounded-3xl overflow-hidden border border-[#E7E5E4] shadow-sm group">
                      <div className="h-48 overflow-hidden">
                        <img src={cap.img} alt={cap.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-light mb-3 tracking-tight text-[#1C1917]">{cap.title}</h3>
                        <p className="text-[#57534E] text-sm font-light leading-relaxed">{cap.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* FOOTER */}
        <footer className="relative z-10 bg-white text-[#292524] rounded-3xl p-8 lg:p-14 shadow-sm border border-[#E7E5E4] mt-32 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 pb-12 border-b border-[#E7E5E4]">
            <div>
              <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => setCurrentPage('home')}>
                <div className="h-12 w-auto flex items-center justify-start shrink-0">
                  <img src="/jyanipur.png" alt="Jyanipur Symbol" className="h-full w-auto object-contain object-left" style={{ filter: teakTintFilter }} />
                </div>
                <span className="text-3xl font-light tracking-[0.2em] uppercase text-[#1C1917]">Jyanipur</span>
              </div>
              <p className="text-sm text-[#57534E] font-light max-w-sm leading-relaxed">
                Turnkey Construction & Bespoke Luxury Interiors. Building high-end architectural environments in Hyderabad.
              </p>
            </div>
            <div className="flex flex-col gap-4 text-sm font-light text-[#292524]">
              <span className="flex items-center gap-4"><MapPin className="w-4 h-4 text-[#B45309]" strokeWidth={2} /> 302 Amrutha Lakshmi Residency, Kondapur</span>
              <span className="flex items-center gap-4"><Mail className="w-4 h-4 text-[#B45309]" strokeWidth={2} /> accounts@jyanipur.in</span>
              <span className="flex items-center gap-4"><Phone className="w-4 h-4 text-[#B45309]" strokeWidth={2} /> +91 9246546742</span>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-[#A8A29E] uppercase tracking-wider">
            <span>© 2026 Jyanipur Construction & Interiors.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#B45309] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#B45309] transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </main>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-center items-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col relative shadow-2xl"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-20 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white hover:text-[#B45309] transition-all">
                <X className="w-6 h-6" strokeWidth={2} />
              </button>
              <div className="h-72 sm:h-96 relative shrink-0">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
                  <div className="text-white">
                    <span className="bg-[#B45309] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 inline-block shadow-sm">
                      {selectedProject.status}
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-light tracking-tight">{selectedProject.title}</h2>
                    <p className="text-stone-300 font-light text-sm mt-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#B45309]" /> {selectedProject.location} • {selectedProject.area}</p>
                  </div>
                </div>
              </div>
              <div className="p-10 overflow-y-auto flex-1 bg-[#FDFBF7]">
                <h3 className="text-xs font-bold text-[#B45309] uppercase tracking-widest mb-4">Project Overview</h3>
                <p className="text-[#57534E] text-base leading-relaxed mb-8 font-light">{selectedProject.description}</p>
                <h3 className="text-xs font-bold text-[#B45309] uppercase tracking-widest mb-4">Key Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProject.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-[#292524] font-medium"><Check className="w-4 h-4 text-[#B45309] shrink-0" /> {f}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isConsultModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#292524]/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg p-10 rounded-3xl relative shadow-2xl"
            >
              <button onClick={() => { setIsEstimateModalOpen(false); setIsLeadSaved(false); }} className="absolute top-6 right-6 text-[#A8A29E] hover:text-[#292524] transition-colors">
                <X className="w-6 h-6" strokeWidth={2} />
              </button>
              
              {!isLeadSaved ? (
                <>
                  <h3 className="text-3xl font-light text-[#292524] tracking-tight mb-2">Discuss your space.</h3>
                  <p className="text-sm text-[#78716C] font-light mb-8">Share your requirements and our principal architect will contact you directly.</p>
                  <form onSubmit={handleConsultSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-[#292524] uppercase tracking-widest mb-2 ml-1">Full Name</label>
                      <input type="text" required value={leadData.clientName} onChange={e => setLeadData({...leadData, clientName: e.target.value})} placeholder="e.g. Ramesh Varma" className="w-full px-5 py-4 bg-[#FDFBF7] border border-[#E7E5E4] text-[#292524] rounded-2xl focus:outline-none focus:border-[#B45309] transition-colors text-sm font-normal" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#292524] uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                      <input type="tel" required value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} placeholder="+91 98765..." className="w-full px-5 py-4 bg-[#FDFBF7] border border-[#E7E5E4] text-[#292524] rounded-2xl focus:outline-none focus:border-[#B45309] transition-colors text-sm font-normal" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-5 bg-[#292524] hover:bg-[#B45309] text-white font-semibold rounded-full transition-colors mt-2 text-xs tracking-widest uppercase shadow-lg">
                      {loading ? 'Transmitting...' : 'Request Architectural Meeting'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center space-y-5">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-[#B45309] text-white flex items-center justify-center mx-auto rounded-full shadow-lg">
                    <Check className="w-10 h-10" strokeWidth={2} />
                  </motion.div>
                  <h3 className="text-2xl font-light text-[#292524]">Inquiry Received</h3>
                  <p className="text-sm text-[#78716C] font-light">Our engineering team will review your details and connect shortly.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}