import React, { useState } from 'react';
import { saveMarketingLead } from './db';
import { 
  ArrowUpRight, CheckCircle2, Phone, Mail, MapPin, 
  X, Building, ArrowRight, Star, Compass, Paintbrush, 
  ShieldCheck, Layers, Sparkles
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
    {
      num: "01",
      title: "Architectural Consultation",
      desc: "We analyze your site, plot dimensions, structural requirements, and aesthetic vision."
    },
    {
      num: "02",
      title: "3D Design & BOQ Planning",
      desc: "Detailed structural blueprints, material sampling, and line-item BOQ transparent estimates."
    },
    {
      num: "03",
      title: "Precision Execution",
      desc: "On-site civil construction and off-site modular fabrication with multi-tier quality audits."
    },
    {
      num: "04",
      title: "Final Handover",
      desc: "Deep cleaning, snag list rectification, and formal project key handover on promised date."
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
      setIsLeadSaved(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-[#B45309] selection:text-white">
      
      {/* --- TOP CONTACT BAR --- */}
      <div className="bg-[#1C1917] text-[#F5F5F4] py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-medium tracking-wide">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#B45309]" /> +91 9246546742</span>
            <span className="hidden sm:flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#B45309]" /> accounts@jyanipur.in</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#B45309]" /> Hyderabad, Telangana
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E5E4] px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#B45309] text-white font-black rounded-lg flex items-center justify-center text-xl shadow-md">
              J
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-[#1C1917] block leading-none">JYANIPUR</span>
              <span className="text-[9px] font-bold tracking-widest text-[#B45309] uppercase block mt-1">Construction & Interiors</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#57534E]">
            <a href="#portfolio" className="hover:text-[#B45309] transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-[#B45309] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#B45309] transition-colors">Our Process</a>
            <a href="#contact" className="hover:text-[#B45309] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.jyanipur.org.in" 
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:block text-sm font-bold text-[#78716C] hover:text-[#B45309] transition-colors"
            >
              Client Login
            </a>
            <button 
              onClick={() => setIsEstimateModalOpen(true)}
              className="bg-[#B45309] hover:bg-[#92400E] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-md flex items-center gap-2"
            >
              Book Consultation <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO PORTFOLIO SECTION --- */}
      <section className="pt-12 pb-20 lg:pt-20 lg:pb-28 px-6 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-12 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-[#F5F0EB] px-4 py-2 rounded-full border border-[#E7E5E4]">
              <Compass className="w-4 h-4 text-[#B45309]" /> Architectural Portfolio & Studio
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-[#1C1917] leading-[1.1] tracking-tight">
              Bespoke Spaces. <br /><span className="text-[#B45309]">Uncompromising Execution.</span>
            </h1>

            <p className="text-[#57534E] text-lg leading-relaxed">
              Jyanipur is a premier turnkey construction and luxury interior design studio based in Hyderabad. We turn raw blueprints into living architectural masterpieces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#portfolio"
                className="bg-[#B45309] hover:bg-[#92400E] text-white font-bold px-8 py-4 rounded-full text-sm transition-all shadow-lg text-center"
              >
                Explore Selected Works
              </a>
              <button 
                onClick={() => setIsEstimateModalOpen(true)}
                className="bg-white hover:bg-[#F5F0EB] text-[#1C1917] border border-[#D6D3D1] font-bold px-8 py-4 rounded-full text-sm transition-all text-center"
              >
                Discuss Your Project
              </button>
            </div>
          </div>

          {/* Hero Featured Showcase Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E7E5E4] h-[450px] lg:h-[550px] group">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" 
              alt="Featured Architecture" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/20 to-transparent flex items-end p-8 lg:p-12">
              <div className="text-white max-w-2xl">
                <span className="bg-[#B45309] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                  Featured Project
                </span>
                <h2 className="text-3xl lg:text-4xl font-black">The Glass Monolith Villa</h2>
                <p className="text-[#E7E5E4] mt-2 text-sm lg:text-base">Kondapur, Hyderabad • 3,400 Sq.Ft. Structural Glazing & Modern Interior Fit-Out</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- PORTFOLIO GALLERY SECTION --- */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#E7E5E4]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="text-[#B45309] font-bold text-sm tracking-widest uppercase mb-2 block">Curated Works</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1C1917] tracking-tight">Recent Projects</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Residential', 'Civil', 'Interiors'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all border ${
                  activeFilter === filter ? 'bg-[#B45309] text-white border-[#B45309]' : 'bg-white text-[#57534E] border-[#D6D3D1] hover:bg-[#F5F0EB]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((p) => (
            <div 
              key={p.id} 
              className="group bg-white border border-[#E7E5E4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedProject(p)}
            >
              <div className="h-80 overflow-hidden relative">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm text-[#1C1917] text-xs font-bold px-3 py-1.5 rounded-full border border-[#D6D3D1]">
                  {p.category}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-[#1C1917] mb-2 group-hover:text-[#B45309] transition-colors">{p.title}</h3>
                    <p className="text-sm text-[#78716C] font-bold flex items-center gap-1"><MapPin className="w-4 h-4 text-[#B45309]" /> {p.location}</p>
                  </div>
                  <span className="bg-[#FAF8F5] border border-[#E7E5E4] text-[#B45309] text-xs font-bold px-3 py-1 rounded-full">
                    {p.area}
                  </span>
                </div>
                <p className="text-[#57534E] mb-6 line-clamp-2">{p.description}</p>
                <div className="flex items-center text-[#B45309] font-bold text-sm group-hover:translate-x-2 transition-transform">
                  View Case Study <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SERVICES / CAPABILITIES SECTION --- */}
      <section id="services" className="py-24 bg-white px-6 border-y border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#B45309] font-bold text-sm tracking-widest uppercase mb-2 block">Our Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1C1917] tracking-tight">End-to-End Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-[#E7E5E4]">
              <div className="w-16 h-16 bg-white border border-[#E7E5E4] rounded-2xl flex items-center justify-center mb-6">
                <Building className="w-8 h-8 text-[#B45309]" />
              </div>
              <h3 className="text-xl font-black text-[#1C1917] mb-3">Civil Construction</h3>
              <p className="text-[#57534E] leading-relaxed">Structural RCC framing, brick masonry, waterproofing, and civil engineering built to withstand generations.</p>
            </div>

            <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-[#E7E5E4]">
              <div className="w-16 h-16 bg-white border border-[#E7E5E4] rounded-2xl flex items-center justify-center mb-6">
                <Paintbrush className="w-8 h-8 text-[#B45309]" />
              </div>
              <h3 className="text-xl font-black text-[#1C1917] mb-3">Bespoke Interiors</h3>
              <p className="text-[#57534E] leading-relaxed">Factory-pressed modular woodwork, Italian marble laying, architectural lighting, and custom furniture fitting.</p>
            </div>

            <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-[#E7E5E4]">
              <div className="w-16 h-16 bg-white border border-[#E7E5E4] rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-[#B45309]" />
              </div>
              <h3 className="text-xl font-black text-[#1C1917] mb-3">Turnkey Management</h3>
              <p className="text-[#57534E] leading-relaxed">A single point of accountability. We coordinate architects, material vendors, site engineers, and handovers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR PROCESS SECTION --- */}
      <section id="process" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#B45309] font-bold text-sm tracking-widest uppercase mb-2 block">Methodology</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1C1917] tracking-tight">How We Build</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-[#E7E5E4] relative">
              <span className="text-4xl font-black text-[#B45309]/30 block mb-4">{s.num}</span>
              <h3 className="text-lg font-black text-[#1C1917] mb-2">{s.title}</h3>
              <p className="text-sm text-[#57534E] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJECT DETAILS MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-[#1C1917]/70 backdrop-blur-sm">
          <div className="bg-[#FAF8F5] w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col relative border border-[#D6D3D1] shadow-2xl">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 z-10 bg-white text-[#1C1917] p-2 rounded-full border border-[#D6D3D1] hover:bg-[#B45309] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-64 sm:h-80 relative shrink-0 border-b border-[#D6D3D1]">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-transparent to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="bg-[#B45309] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    {selectedProject.status}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black">{selectedProject.title}</h2>
                  <p className="text-[#E7E5E4] font-semibold mt-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedProject.location} • {selectedProject.area}</p>
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              <h3 className="text-xl font-black text-[#1C1917] mb-3">Project Overview</h3>
              <p className="text-[#57534E] leading-relaxed mb-8">{selectedProject.description}</p>

              <h3 className="text-xl font-black text-[#1C1917] mb-4">Key Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E7E5E4]">
                    <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0" />
                    <span className="text-sm font-bold text-[#1C1917]">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#B45309] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
                <div>
                  <h4 className="font-black">Interested in a similar project?</h4>
                  <p className="text-sm text-amber-100 mt-1">Book an architectural consultation with our principal design team.</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setIsEstimateModalOpen(true);
                  }}
                  className="w-full sm:w-auto bg-white text-[#B45309] hover:bg-amber-50 px-6 py-3 rounded-full text-sm font-black transition-all whitespace-nowrap"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/70 backdrop-blur-sm">
          <div className="bg-[#FAF8F5] w-full max-w-md p-8 rounded-3xl relative border border-[#D6D3D1] shadow-2xl">
            <button 
              onClick={() => { setIsEstimateModalOpen(false); setIsLeadSaved(false); }} 
              className="absolute top-6 right-6 text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {!isLeadSaved ? (
              <>
                <h3 className="text-2xl font-black text-[#1C1917] tracking-tight mb-2">Book Consultation</h3>
                <p className="text-sm text-[#78716C] font-medium mb-8">Share your site details and our chief architect will contact you directly.</p>

                <form onSubmit={handleConsultSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-black text-[#1C1917] uppercase mb-2 ml-1">Full Name</label>
                    <input type="text" required value={leadData.clientName} onChange={e => setLeadData({...leadData, clientName: e.target.value})} placeholder="e.g. Ramesh Varma" className="w-full px-5 py-4 bg-white border border-[#D6D3D1] text-[#1C1917] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all font-bold" />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#1C1917] uppercase mb-2 ml-1">Phone Number</label>
                    <input type="tel" required value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} placeholder="+91 98765..." className="w-full px-5 py-4 bg-white border border-[#D6D3D1] text-[#1C1917] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all font-bold" />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#1C1917] uppercase mb-2 ml-1">Project Scope</label>
                    <select value={leadData.projectType} onChange={e => setLeadData({...leadData, projectType: e.target.value})} className="w-full px-5 py-4 bg-white border border-[#D6D3D1] text-[#1C1917] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all cursor-pointer font-bold">
                      <option value="Turnkey Residential Construction">Turnkey Construction (Structure + Interiors)</option>
                      <option value="Civil Structural Execution">Civil Structural Execution</option>
                      <option value="Turnkey Interior Fit-Out">Turnkey Luxury Interiors</option>
                    </select>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-4 bg-[#B45309] hover:bg-[#92400E] text-white font-black rounded-full transition-all mt-4 shadow-md">
                    {loading ? 'Submitting...' : 'Request Architectural Meeting'}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-[#B45309] text-white flex items-center justify-center mx-auto rounded-full mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#1C1917]">Consultation Requested</h3>
                <p className="text-[#57534E] font-medium">
                  Thank you, <span className="font-black text-[#1C1917]">{leadData.clientName}</span>. Our project planning team will call {leadData.phone} within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- CALL TO ACTION --- */}
      <section className="py-24 bg-[#B45309] text-white px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Ready to realize your plot's potential?</h2>
          <p className="text-amber-100 text-lg font-medium mb-10">Partner with Jyanipur for a seamless experience from architectural blueprints to key handover.</p>
          <button 
            onClick={() => setIsEstimateModalOpen(true)}
            className="bg-white hover:bg-amber-50 text-[#B45309] font-black px-10 py-5 rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-[#1C1917] text-[#E7E5E4] py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#B45309] text-white font-black rounded flex items-center justify-center text-lg">
                J
              </div>
              <span className="text-xl font-black text-white tracking-wider uppercase">Jyanipur</span>
            </div>
            <p className="text-sm text-[#A8A29E] max-w-sm leading-relaxed">
              Turnkey Construction & Bespoke Luxury Interiors. Building high-end architectural residences in Hyderabad.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm font-semibold text-[#D6D3D1]">
            <span className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#B45309]" /> 302 Amrutha Lakshmi Residency, Kondapur, Hyderabad, 500084</span>
            <span className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#B45309]" /> accounts@jyanipur.in</span>
            <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#B45309]" /> +91 9246546742</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#292524] text-center text-xs font-semibold text-[#78716C] flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© 2026 Jyanipur Construction & Interiors. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}