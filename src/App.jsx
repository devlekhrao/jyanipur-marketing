import React, { useState } from 'react';
import { saveMarketingLead } from './db';
import { 
  ArrowUpRight, CheckCircle2, Phone, Mail, MapPin, 
  X, Building, ArrowRight, Compass, Paintbrush, 
  ShieldCheck, Home, LayoutGrid, Briefcase, Contact
} from 'lucide-react';

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isConsultModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isLeadSaved, setIsLeadSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [leadData, setLeadData] = useState({
    clientName: '',
    phone: '',
    projectType: 'Turnkey Residential Construction',
    notes: ''
  });

  const projects = [
    {
      id: 1,
      category: "Residential",
      title: "The Glass Monolith Villa",
      location: "Kondapur, Hyderabad",
      area: "3,400 Sq.Ft.",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
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
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
      description: "A complete interior transformation featuring factory-pressed BWP plywood modular kitchens, Gyproc cove illumination, and bespoke furniture.",
      features: ["Acrylic Modular Kitchen", "Concealed Architectural Lighting", "Large-format Vitrified Tiles", "Bespoke Flush Doors"]
    },
    {
      id: 4,
      category: "Interiors",
      title: "Corporate Office Hub",
      location: "HITEC City, Hyderabad",
      area: "8,500 Sq.Ft.",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      description: "Modern open-plan workspace designed for productivity, featuring acoustic paneling, glass partitions, and ergonomic modular workstations.",
      features: ["Acoustic Ceiling Clouds", "Toughened Glass Partitions", "Commercial HVAC Integration", "Modular Workstations"]
    }
  ];

  const processSteps = [
    { num: "01", title: "Consultation", desc: "Site analysis & structural planning." },
    { num: "02", title: "3D Design & BOQ", desc: "Blueprints, material selection, transparent pricing." },
    { num: "03", title: "Execution", desc: "Precision construction & interior fitting." },
    { num: "04", title: "Handover", desc: "Quality audit & key delivery on schedule." }
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
      setIsLeadSaved(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white text-[#292524] font-sans selection:bg-[#B45309] selection:text-white flex flex-col lg:flex-row">
      
      {/* --- SIDEBAR NAVIGATION (SOFT CIRCULAR EDGES) --- */}
      <aside className="w-full lg:w-72 lg:fixed lg:h-[calc(100vh-2rem)] lg:m-4 bg-[#B45309] text-white rounded-3xl p-6 flex flex-col justify-between shadow-2xl z-40 border border-amber-600/30">
        <div>
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white text-[#B45309] font-black rounded-2xl flex items-center justify-center text-xl shadow-md">
              J
            </div>
            <div>
              <span className="font-black text-lg tracking-wider block leading-none">JYANIPUR</span>
              <span className="text-[9px] font-bold tracking-widest text-amber-200 uppercase block mt-1">Studio & Works</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="space-y-3">
            <a href="#portfolio" className="flex items-center gap-3 px-4 py-3 bg-amber-800/40 hover:bg-white hover:text-[#B45309] font-bold text-sm rounded-2xl transition-all">
              <LayoutGrid className="w-4 h-4" /> Portfolio
            </a>
            <a href="#services" className="flex items-center gap-3 px-4 py-3 hover:bg-amber-800/40 font-bold text-sm rounded-2xl transition-all text-amber-100 hover:text-white">
              <Briefcase className="w-4 h-4" /> Capabilities
            </a>
            <a href="#process" className="flex items-center gap-3 px-4 py-3 hover:bg-amber-800/40 font-bold text-sm rounded-2xl transition-all text-amber-100 hover:text-white">
              <Compass className="w-4 h-4" /> Methodology
            </a>
            <a href="#contact" className="flex items-center gap-3 px-4 py-3 hover:bg-amber-800/40 font-bold text-sm rounded-2xl transition-all text-amber-100 hover:text-white">
              <Contact className="w-4 h-4" /> Contact
            </a>
          </nav>
        </div>

        {/* Sidebar Bottom Action & Client Login */}
        <div className="pt-6 border-t border-amber-700/50 space-y-4">
          <a 
            href="https://www.jyanipur.org.in" 
            target="_blank" 
            rel="noreferrer"
            className="block text-center text-xs font-bold text-amber-200 hover:text-white transition-colors"
          >
            Client Login Portal
          </a>
          <button 
            onClick={() => setIsEstimateModalOpen(true)}
            className="w-full bg-white text-[#B45309] hover:bg-amber-50 font-black py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
          >
            Book Consultation <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA WITH ARCHITECTURAL CARPET/BLUEPRINT TEXTURE --- */}
      <main className="flex-1 lg:ml-80 p-6 lg:p-12 relative overflow-hidden">
        
        {/* Subtle Architectural Carpet Grid Effect */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#B45309 1.5px, transparent 1.5px), linear-gradient(to right, #B45309 1px, transparent 1px), linear-gradient(to bottom, #B45309 1px, transparent 1px)`,
            backgroundSize: '24px 24px, 72px 72px, 72px 72px'
          }}
        ></div>

        {/* HERO SHOWCASE */}
        <section className="relative z-10 mb-20">
          <div className="max-w-3xl space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
              <Compass className="w-4 h-4 text-[#B45309]" /> Architectural Portfolio Studio
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-[#292524] leading-[1.1] tracking-tight">
              Bespoke Spaces. <br /><span className="text-[#B45309]">Uncompromising Precision.</span>
            </h1>

            <p className="text-[#57534E] text-base lg:text-lg leading-relaxed">
              Jyanipur is a premier turnkey construction and luxury interior studio based in Hyderabad. We turn structural blueprints into living architectural artwork.
            </p>
          </div>

          {/* Featured Project Banner Box */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-100 h-[450px] group">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" 
              alt="Featured Architecture" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#B45309]/95 via-[#B45309]/30 to-transparent flex items-end p-8 lg:p-12">
              <div className="text-white max-w-2xl">
                <span className="bg-white text-[#B45309] text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block shadow-sm">
                  Featured Masterpiece
                </span>
                <h2 className="text-3xl lg:text-4xl font-black">The Glass Monolith Villa</h2>
                <p className="text-amber-100 mt-2 text-sm lg:text-base">Kondapur, Hyderabad • 3,400 Sq.Ft. Structural Glazing & Modern Interiors</p>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO GALLERY */}
        <section id="portfolio" className="relative z-10 mb-20 pt-8 border-t border-amber-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div>
              <span className="text-[#B45309] font-bold text-sm tracking-widest uppercase mb-2 block">Curated Works</span>
              <h2 className="text-3xl lg:text-4xl font-black text-[#292524] tracking-tight">Recent Projects</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 'Residential', 'Civil', 'Interiors'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all border ${
                    activeFilter === filter ? 'bg-[#B45309] text-white border-[#B45309] shadow-md' : 'bg-white text-[#57534E] border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((p) => (
              <div 
                key={p.id} 
                className="group bg-[#B45309] text-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-amber-600/30"
                onClick={() => setSelectedProject(p)}
              >
                <div className="h-72 overflow-hidden relative">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 bg-white text-[#B45309] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    {p.category}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">{p.title}</h3>
                      <p className="text-sm text-amber-200 font-bold flex items-center gap-1"><MapPin className="w-4 h-4 text-white" /> {p.location}</p>
                    </div>
                    <span className="bg-amber-800/60 border border-amber-600 text-amber-100 text-xs font-bold px-3 py-1 rounded-full">
                      {p.area}
                    </span>
                  </div>
                  <p className="text-amber-100/90 mb-6 line-clamp-2">{p.description}</p>
                  <div className="flex items-center text-white font-bold text-sm group-hover:translate-x-2 transition-transform">
                    View Case Study <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAPABILITIES SECTION */}
        <section id="services" className="relative z-10 mb-20 pt-8 border-t border-amber-100">
          <div className="mb-12">
            <span className="text-[#B45309] font-bold text-sm tracking-widest uppercase mb-2 block">Our Capabilities</span>
            <h2 className="text-3xl lg:text-4xl font-black text-[#292524] tracking-tight">End-to-End Execution</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#B45309] text-white p-8 rounded-3xl border border-amber-600/30 shadow-xl">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <Building className="w-8 h-8 text-[#B45309]" />
              </div>
              <h3 className="text-xl font-black mb-3">Civil Construction</h3>
              <p className="text-amber-100 leading-relaxed">Structural RCC framing, masonry, and civil engineering built to last generations.</p>
            </div>

            <div className="bg-[#B45309] text-white p-8 rounded-3xl border border-amber-600/30 shadow-xl">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <Paintbrush className="w-8 h-8 text-[#B45309]" />
              </div>
              <h3 className="text-xl font-black mb-3">Bespoke Interiors</h3>
              <p className="text-amber-100 leading-relaxed">Factory-finished modular woodwork, marble flooring, and custom furniture fitting.</p>
            </div>

            <div className="bg-[#B45309] text-white p-8 rounded-3xl border border-amber-600/30 shadow-xl">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <ShieldCheck className="w-8 h-8 text-[#B45309]" />
              </div>
              <h3 className="text-xl font-black mb-3">Turnkey Management</h3>
              <p className="text-amber-100 leading-relaxed">Single point of accountability coordinating labor, vendors, and precise handovers.</p>
            </div>
          </div>
        </section>

        {/* METHODOLOGY / PROCESS */}
        <section id="process" className="relative z-10 mb-20 pt-8 border-t border-amber-100">
          <div className="mb-12">
            <span className="text-[#B45309] font-bold text-sm tracking-widest uppercase mb-2 block">Methodology</span>
            <h2 className="text-3xl lg:text-4xl font-black text-[#292524] tracking-tight">How We Build</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-amber-200/80 shadow-sm relative">
                <span className="text-4xl font-black text-[#B45309] block mb-4">{s.num}</span>
                <h3 className="text-lg font-black text-[#292524] mb-2">{s.title}</h3>
                <p className="text-sm text-[#57534E] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- TEAK FOOTER --- */}
        <footer id="contact" className="relative z-10 bg-[#B45309] text-white rounded-3xl p-10 lg:p-12 shadow-2xl border border-amber-600/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-12 border-b border-amber-700/50">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white text-[#B45309] font-black rounded-2xl flex items-center justify-center text-xl shadow-md">
                  J
                </div>
                <span className="text-2xl font-black tracking-wider uppercase">Jyanipur</span>
              </div>
              <p className="text-sm text-amber-100 max-w-sm leading-relaxed">
                Turnkey Construction & Bespoke Luxury Interiors. Building high-end architectural residences in Hyderabad.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-sm font-semibold text-amber-100">
              <span className="flex items-center gap-3"><MapPin className="w-4 h-4 text-white" /> 302 Amrutha Lakshmi Residency, Kondapur, Hyderabad, 500084</span>
              <span className="flex items-center gap-3"><Mail className="w-4 h-4 text-white" /> accounts@jyanipur.in</span>
              <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-white" /> +91 9246546742</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-amber-200">
            <span>© 2026 Jyanipur Construction & Interiors. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>

      </main>

      {/* --- PROJECT DETAILS MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col relative shadow-2xl border border-amber-200">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 z-10 bg-white text-[#B45309] p-2 rounded-full shadow-md hover:bg-[#B45309] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-64 sm:h-80 relative shrink-0">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#B45309]/90 via-transparent to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="bg-white text-[#B45309] text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block shadow-sm">
                    {selectedProject.status}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black">{selectedProject.title}</h2>
                  <p className="text-amber-100 font-semibold mt-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedProject.location} • {selectedProject.area}</p>
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              <h3 className="text-xl font-black text-[#292524] mb-3">Project Overview</h3>
              <p className="text-[#57534E] leading-relaxed mb-8">{selectedProject.description}</p>

              <h3 className="text-xl font-black text-[#292524] mb-4">Key Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                    <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0" />
                    <span className="text-sm font-bold text-[#292524]">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#B45309] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
                <div>
                  <h4 className="font-black">Interested in a similar project?</h4>
                  <p className="text-sm text-amber-100 mt-1">Book an architectural meeting with our team.</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setIsEstimateModalOpen(true);
                  }}
                  className="w-full sm:w-auto bg-white text-[#B45309] hover:bg-amber-50 px-6 py-3 rounded-full text-sm font-black transition-all whitespace-nowrap shadow-md"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONSULTATION MODAL --- */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-8 rounded-3xl relative shadow-2xl border border-amber-200">
            <button 
              onClick={() => { setIsEstimateModalOpen(false); setIsLeadSaved(false); }} 
              className="absolute top-6 right-6 text-[#78716C] hover:text-[#292524] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {!isLeadSaved ? (
              <>
                <h3 className="text-2xl font-black text-[#292524] tracking-tight mb-2">Book Consultation</h3>
                <p className="text-sm text-[#78716C] font-medium mb-8">Share your site details and our principal architect will contact you directly.</p>

                <form onSubmit={handleConsultSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-black text-[#292524] uppercase mb-2 ml-1">Full Name</label>
                    <input type="text" required value={leadData.clientName} onChange={e => setLeadData({...leadData, clientName: e.target.value})} placeholder="e.g. Ramesh Varma" className="w-full px-5 py-4 bg-amber-50/30 border border-amber-200 text-[#292524] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all font-bold" />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#292524] uppercase mb-2 ml-1">Phone Number</label>
                    <input type="tel" required value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} placeholder="+91 98765..." className="w-full px-5 py-4 bg-amber-50/30 border border-amber-200 text-[#292524] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all font-bold" />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#292524] uppercase mb-2 ml-1">Project Scope</label>
                    <select value={leadData.projectType} onChange={e => setLeadData({...leadData, projectType: e.target.value})} className="w-full px-5 py-4 bg-amber-50/30 border border-amber-200 text-[#292524] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all cursor-pointer font-bold">
                      <option value="Turnkey Residential Construction">Turnkey Construction (Structure + Interiors)</option>
                      <option value="Civil Structural Execution">Civil Structural Execution</option>
                      <option value="Turnkey Interior Fit-Out">Turnkey Luxury Interiors</option>
                    </select>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-4 bg-[#B45309] hover:bg-amber-700 text-white font-black rounded-full transition-all mt-4 shadow-md">
                    {loading ? 'Submitting...' : 'Request Architectural Meeting'}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-[#B45309] text-white flex items-center justify-center mx-auto rounded-full mb-6 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#292524]">Consultation Requested</h3>
                <p className="text-[#57534E] font-medium">
                  Thank you, <span className="font-black text-[#292524]">{leadData.clientName}</span>. Our project planning team will call {leadData.phone} within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}