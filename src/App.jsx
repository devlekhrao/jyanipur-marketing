import React, { useState } from 'react';
import { saveMarketingLead } from './db';
import { 
  ArrowUpRight, CheckCircle2, Phone, Mail, MapPin, 
  X, Building, ArrowRight, Compass, Paintbrush, 
  ShieldCheck, LayoutGrid, Briefcase, Contact, User
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
    <div className="min-h-screen bg-white text-[#292524] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#B45309] selection:text-white flex flex-col antialiased relative">
      
      {/* Google Fonts Import for Plus Jakarta Sans */}
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* --- ICON-ONLY FLOATING LEFT-CENTER DOCK (WIDER PILL SHAPE) --- */}
      <aside className="w-full lg:w-16 lg:fixed lg:top-1/2 lg:-translate-y-1/2 lg:left-6 bg-white text-[#B45309] rounded-full py-4 flex lg:flex-col items-center justify-between shadow-xl z-40 border border-[#B45309]/30">
        
        {/* Logo / Custom Icon */}
        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 overflow-hidden border border-[#B45309]/20 hover:scale-105 transition-transform">
          <img src="/icon.png" alt="Jyanipur Logo" className="w-full h-full object-cover" />
        </a>

        {/* Navigation Icons Only */}
        <nav className="flex lg:flex-col items-center gap-2 my-4">
          <a href="#portfolio" title="Portfolio" className="w-12 h-12 flex items-center justify-center hover:bg-amber-50 text-[#B45309] rounded-full transition-colors">
            <LayoutGrid className="w-5 h-5" strokeWidth={2} />
          </a>
          <a href="#services" title="Capabilities" className="w-12 h-12 flex items-center justify-center hover:bg-amber-50 text-[#B45309] rounded-full transition-colors">
            <Briefcase className="w-5 h-5" strokeWidth={2} />
          </a>
          <a href="#process" title="Methodology" className="w-12 h-12 flex items-center justify-center hover:bg-amber-50 text-[#B45309] rounded-full transition-colors">
            <Compass className="w-5 h-5" strokeWidth={2} />
          </a>
          <a href="#contact" title="Contact" className="w-12 h-12 flex items-center justify-center hover:bg-amber-50 text-[#B45309] rounded-full transition-colors">
            <Contact className="w-5 h-5" strokeWidth={2} />
          </a>
        </nav>

        {/* Action Icons */}
        <div className="flex lg:flex-col items-center gap-2 shrink-0">
          <a 
            href="https://www.jyanipur.org.in" 
            target="_blank" 
            rel="noreferrer"
            title="Client Portal"
            className="w-12 h-12 flex items-center justify-center text-[#B45309] hover:bg-amber-50 transition-colors rounded-full"
          >
            <User className="w-5 h-5" strokeWidth={2} />
          </a>
          <button 
            onClick={() => setIsEstimateModalOpen(true)}
            title="Book Consultation"
            className="w-12 h-12 bg-[#B45309] text-white hover:bg-amber-700 rounded-full transition-all shadow-sm flex items-center justify-center"
          >
            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 lg:ml-28 p-6 lg:p-12 relative bg-white min-h-screen">
        
        {/* Subtle Architectural Grid Effect */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#B45309 1.5px, transparent 1.5px), linear-gradient(to right, #B45309 1px, transparent 1px), linear-gradient(to bottom, #B45309 1px, transparent 1px)`,
            backgroundSize: '24px 24px, 72px 72px, 72px 72px'
          }}
        ></div>

        {/* HERO SHOWCASE */}
        <section className="relative z-10 mb-20">
          <div className="max-w-4xl space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B45309] bg-amber-50 px-4 py-2 rounded-full border border-[#B45309]/20">
              <Compass className="w-3.5 h-3.5 text-[#B45309]" strokeWidth={2} /> Architectural Portfolio Studio
            </div>

            <h1 className="text-4xl lg:text-6xl font-light text-[#1C1917] leading-[1.15] tracking-tight">
              Bespoke Spaces. <br /><span className="font-semibold text-[#B45309]">Uncompromising Precision.</span>
            </h1>

            <p className="text-[#57534E] text-base lg:text-lg font-normal leading-relaxed max-w-2xl">
              Jyanipur is a premier turnkey construction and luxury interior studio based in Hyderabad. We turn structural blueprints into living architectural artwork.
            </p>
          </div>

          {/* Featured Project Banner Box */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E7E5E4] h-[450px] lg:h-[550px] group">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" 
              alt="Featured Architecture" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#B45309]/95 via-[#B45309]/30 to-transparent flex items-end p-8 lg:p-12">
              <div className="text-white max-w-2xl">
                <span className="bg-white text-[#B45309] text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block shadow-sm tracking-wide">
                  Featured Masterpiece
                </span>
                <h2 className="text-3xl lg:text-4xl font-normal tracking-tight">The Glass Monolith Villa</h2>
                <p className="text-amber-100 mt-2 text-sm lg:text-base font-light">Kondapur, Hyderabad • 3,400 Sq.Ft. Structural Glazing & Modern Interiors</p>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO GALLERY */}
        <section id="portfolio" className="relative z-10 mb-20 pt-8 border-t border-[#E7E5E4]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div>
              <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Curated Works</span>
              <h2 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight">Recent Projects</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 'Residential', 'Civil', 'Interiors'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 text-xs font-semibold tracking-wider rounded-full transition-all border ${
                    activeFilter === filter ? 'bg-[#B45309] text-white border-[#B45309] shadow-sm' : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-amber-50'
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
                className="group bg-white text-[#292524] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-[#E7E5E4]"
                onClick={() => setSelectedProject(p)}
              >
                <div className="h-72 overflow-hidden relative border-b border-[#E7E5E4]">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 bg-white text-[#B45309] border border-[#E7E5E4] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm tracking-wide">
                    {p.category}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-normal text-[#1C1917] mb-2 tracking-tight group-hover:text-[#B45309] transition-colors">{p.title}</h3>
                      <p className="text-xs text-[#78716C] font-medium flex items-center gap-1 tracking-wide"><MapPin className="w-3.5 h-3.5 text-[#B45309]" strokeWidth={1.75} /> {p.location}</p>
                    </div>
                    <span className="bg-amber-50 border border-[#B45309]/20 text-[#B45309] text-xs font-medium px-3 py-1 rounded-full">
                      {p.area}
                    </span>
                  </div>
                  <p className="text-[#57534E] text-sm font-light mb-6 line-clamp-2 leading-relaxed">{p.description}</p>
                  <div className="flex items-center text-[#B45309] font-semibold text-xs tracking-wider uppercase group-hover:translate-x-2 transition-transform">
                    View Case Study <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAPABILITIES SECTION */}
        <section id="services" className="relative z-10 mb-20 pt-8 border-t border-[#E7E5E4]">
          <div className="mb-12">
            <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Our Capabilities</span>
            <h2 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight">End-to-End Execution</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white text-[#292524] p-8 rounded-2xl border border-[#E7E5E4] shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-6 border border-[#B45309]/20">
                <Building className="w-6 h-6 text-[#B45309]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-normal mb-3 tracking-tight text-[#1C1917]">Civil Construction</h3>
              <p className="text-[#57534E] text-sm font-light leading-relaxed">Structural RCC framing, masonry, and civil engineering built to last generations.</p>
            </div>

            <div className="bg-white text-[#292524] p-8 rounded-2xl border border-[#E7E5E4] shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-6 border border-[#B45309]/20">
                <Paintbrush className="w-6 h-6 text-[#B45309]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-normal mb-3 tracking-tight text-[#1C1917]">Bespoke Interiors</h3>
              <p className="text-[#57534E] text-sm font-light leading-relaxed">Factory-finished modular woodwork, marble flooring, and custom furniture fitting.</p>
            </div>

            <div className="bg-white text-[#292524] p-8 rounded-2xl border border-[#E7E5E4] shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-6 border border-[#B45309]/20">
                <ShieldCheck className="w-6 h-6 text-[#B45309]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-normal mb-3 tracking-tight text-[#1C1917]">Turnkey Management</h3>
              <p className="text-[#57534E] text-sm font-light leading-relaxed">Single point of accountability coordinating labor, vendors, and precise handovers.</p>
            </div>
          </div>
        </section>

        {/* METHODOLOGY / PROCESS */}
        <section id="process" className="relative z-10 mb-20 pt-8 border-t border-[#E7E5E4]">
          <div className="mb-12">
            <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Methodology</span>
            <h2 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight">How We Build</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-[#E7E5E4] shadow-sm relative">
                <span className="text-3xl font-light text-[#B45309] block mb-4 tracking-tight">{s.num}</span>
                <h3 className="text-base font-semibold text-[#292524] mb-2">{s.title}</h3>
                <p className="text-xs text-[#57534E] font-normal leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- FOOTER CONTAINER --- */}
        <footer id="contact" className="relative z-10 bg-white text-[#292524] rounded-2xl p-8 lg:p-12 shadow-sm border border-[#E7E5E4]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-12 border-b border-[#E7E5E4]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full overflow-hidden flex items-center justify-center shadow-sm border border-[#B45309]/20">
                  <img src="/icon.png" alt="Jyanipur Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-2xl font-semibold tracking-wider uppercase text-[#1C1917]">Jyanipur</span>
              </div>
              <p className="text-xs text-[#57534E] font-light max-w-sm leading-relaxed">
                Turnkey Construction & Bespoke Luxury Interiors. Building high-end architectural residences in Hyderabad.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-xs font-medium text-[#292524]">
              <span className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#B45309]" strokeWidth={1.75} /> 302 Amrutha Lakshmi Residency, Kondapur, Hyderabad, 500084</span>
              <span className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#B45309]" strokeWidth={1.75} /> accounts@jyanipur.in</span>
              <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#B45309]" strokeWidth={1.75} /> +91 9246546742</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-[#78716C]">
            <span>© 2026 Jyanipur Construction & Interiors. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#B45309] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#B45309] transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>

      </main>

      {/* --- PROJECT DETAILS MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col relative shadow-2xl border border-[#E7E5E4]">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 z-10 bg-white text-[#B45309] p-2 rounded-full shadow-md border border-[#E7E5E4] hover:bg-[#B45309] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" strokeWidth={2} />
            </button>

            <div className="h-64 sm:h-80 relative shrink-0">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#B45309]/95 via-transparent to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="bg-white text-[#B45309] text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block shadow-sm">
                    {selectedProject.status}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-normal tracking-tight">{selectedProject.title}</h2>
                  <p className="text-amber-100 font-light text-sm mt-2 flex items-center gap-2"><MapPin className="w-4 h-4" strokeWidth={1.75} /> {selectedProject.location} • {selectedProject.area}</p>
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              <h3 className="text-lg font-semibold text-[#292524] mb-3">Project Overview</h3>
              <p className="text-[#57534E] text-sm leading-relaxed mb-8 font-light">{selectedProject.description}</p>

              <h3 className="text-lg font-semibold text-[#292524] mb-4">Key Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                    <CheckCircle2 className="w-4 h-4 text-[#B45309] shrink-0" strokeWidth={2} />
                    <span className="text-xs font-semibold text-[#292524]">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#B45309] p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
                <div>
                  <h4 className="font-semibold text-base">Interested in a similar project?</h4>
                  <p className="text-xs text-amber-100 font-light mt-1">Book an architectural meeting with our team.</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setIsEstimateModalOpen(true);
                  }}
                  className="w-full sm:w-auto bg-white text-[#B45309] hover:bg-amber-50 px-6 py-3 rounded-full text-xs font-semibold transition-all whitespace-nowrap shadow-md tracking-wider uppercase"
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
          <div className="bg-white w-full max-w-md p-8 rounded-2xl relative shadow-2xl border border-[#E7E5E4]">
            <button 
              onClick={() => { setIsEstimateModalOpen(false); setIsLeadSaved(false); }} 
              className="absolute top-6 right-6 text-[#78716C] hover:text-[#292524] transition-colors"
            >
              <X className="w-6 h-6" strokeWidth={2} />
            </button>
            
            {!isLeadSaved ? (
              <>
                <h3 className="text-2xl font-normal text-[#292524] tracking-tight mb-2">Book Consultation</h3>
                <p className="text-xs text-[#78716C] font-light mb-8">Share your site details and our principal architect will contact you directly.</p>

                <form onSubmit={handleConsultSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#292524] uppercase tracking-wider mb-2 ml-1">Full Name</label>
                    <input type="text" required value={leadData.clientName} onChange={e => setLeadData({...leadData, clientName: e.target.value})} placeholder="e.g. Ramesh Varma" className="w-full px-5 py-3.5 bg-amber-50/30 border border-[#E7E5E4] text-[#292524] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all text-sm font-normal" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292524] uppercase tracking-wider mb-2 ml-1">Phone Number</label>
                    <input type="tel" required value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} placeholder="+91 98765..." className="w-full px-5 py-3.5 bg-amber-50/30 border border-[#E7E5E4] text-[#292524] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all text-sm font-normal" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292524] uppercase tracking-wider mb-2 ml-1">Project Scope</label>
                    <select value={leadData.projectType} onChange={e => setLeadData({...leadData, projectType: e.target.value})} className="w-full px-5 py-3.5 bg-amber-50/30 border border-[#E7E5E4] text-[#292524] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all cursor-pointer text-sm font-normal">
                      <option value="Turnkey Residential Construction">Turnkey Construction (Structure + Interiors)</option>
                      <option value="Civil Structural Execution">Civil Structural Execution</option>
                      <option value="Turnkey Interior Fit-Out">Turnkey Luxury Interiors</option>
                    </select>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-4 bg-[#B45309] hover:bg-amber-700 text-white font-semibold rounded-full transition-all mt-4 text-xs tracking-wider uppercase shadow-md">
                    {loading ? 'Submitting...' : 'Request Architectural Meeting'}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-[#B45309] text-white flex items-center justify-center mx-auto rounded-full mb-6 shadow-md">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-normal text-[#292524]">Consultation Requested</h3>
                <p className="text-[#57534E] text-sm font-light">
                  Thank you, <span className="font-semibold text-[#292524]">{leadData.clientName}</span>. Our project planning team will call {leadData.phone} within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}