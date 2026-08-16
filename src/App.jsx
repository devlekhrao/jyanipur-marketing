import React, { useState } from 'react';
import { saveMarketingLead } from './db';
import { 
  ArrowUpRight, CheckCircle2, Phone, Mail, MapPin, 
  X, Building, Home, Hammer, ArrowRight, Star
} from 'lucide-react';

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isLeadSaved, setIsLeadSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [heroSqft, setHeroSqft] = useState(2400);

  const [leadData, setLeadData] = useState({
    clientName: '',
    phone: '',
    projectType: 'Turnkey Residential Construction',
    sqft: '2500',
    notes: ''
  });

  const projects = [
    {
      id: 1,
      category: "Residential Construction",
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
      category: "Civil Structural",
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
      category: "Turnkey Interiors",
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
      category: "Turnkey Interiors",
      title: "Corporate Office Hub",
      location: "HITEC City, Hyderabad",
      area: "8,500 Sq.Ft.",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      description: "Modern open-plan workspace designed for productivity, featuring acoustic paneling, glass partitions, and ergonomic modular workstations.",
      features: ["Acoustic Ceiling Clouds", "Toughened Glass Partitions", "Commercial HVAC Integration", "Modular Workstations"]
    }
  ];

  const capabilities = [
    {
      icon: <Building className="w-8 h-8 text-[#1E1B4B]" />,
      title: "Civil Construction",
      desc: "End-to-end structural execution including excavation, RCC framing, and masonry, built to last generations."
    },
    {
      icon: <Home className="w-8 h-8 text-[#1E1B4B]" />,
      title: "Luxury Interiors",
      desc: "Bespoke interior design and execution featuring factory-finished modular woodwork and premium material sourcing."
    },
    {
      icon: <Hammer className="w-8 h-8 text-[#1E1B4B]" />,
      title: "Turnkey Execution",
      desc: "A seamless experience. We handle architectural compliance, labor management, material procurement, and final handover."
    }
  ];

  const handleEstimateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const approxVal = (parseFloat(leadData.sqft) || 1500) * 1500;

    try {
      await saveMarketingLead({
        clientName: leadData.clientName,
        phone: leadData.phone,
        projectType: leadData.projectType,
        estimatedValue: approxVal,
        notes: `Website Lead: ${leadData.sqft} Sq.Ft. (${leadData.notes})`
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
    : projects.filter(p => p.category.includes(activeFilter));

  return (
    <div className="min-h-screen bg-white text-[#1E1B4B] font-sans selection:bg-[#1E1B4B] selection:text-white">
      
      {/* --- TOP CONTACT BAR --- */}
      <div className="bg-[#1E1B4B] text-white py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-semibold tracking-wide">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-indigo-300" /> +91 9246546742</span>
            <span className="hidden sm:flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-indigo-300" /> accounts@jyanipur.in</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-300" /> Hyderabad, Telangana
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#1E1B4B]/10 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1E1B4B] text-white font-black rounded-lg flex items-center justify-center text-xl shadow-md">
              J
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-[#1E1B4B] block leading-none">JYANIPUR</span>
              <span className="text-[9px] font-bold tracking-widest text-[#1E1B4B]/70 uppercase block mt-1">Construction & Interiors</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1E1B4B]/80">
            <a href="#about" className="hover:text-[#1E1B4B] transition-colors">Our Expertise</a>
            <a href="#portfolio" className="hover:text-[#1E1B4B] transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-[#1E1B4B] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.jyanipur.org.in" 
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:block text-sm font-bold text-[#1E1B4B]/70 hover:text-[#1E1B4B] transition-colors"
            >
              Client Login
            </a>
            <button 
              onClick={() => setIsEstimateModalOpen(true)}
              className="bg-[#1E1B4B] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-transform hover:-translate-y-0.5 flex items-center gap-2 shadow-md"
            >
              Get Free Estimate <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1E1B4B] bg-indigo-50/60 px-4 py-2 rounded-full border border-[#1E1B4B]/15">
              <Star className="w-4 h-4 text-[#1E1B4B] fill-current" /> Premium Builders in Hyderabad
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-[#1E1B4B] leading-[1.1] tracking-tight">
              Building Spaces That Inspire.
            </h1>

            <p className="text-[#1E1B4B]/80 text-lg max-w-lg leading-relaxed font-medium">
              From robust civil foundations to breathtaking luxury interiors, Jyanipur delivers turnkey construction excellence with zero compromises on quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setIsEstimateModalOpen(true)}
                className="bg-[#1E1B4B] text-white font-bold px-8 py-4 rounded-full text-sm transition-transform hover:-translate-y-1 text-center shadow-lg"
              >
                Start Your Project
              </button>
              <a 
                href="#portfolio"
                className="bg-white text-[#1E1B4B] border border-[#1E1B4B] font-bold px-8 py-4 rounded-full text-sm transition-all text-center hover:bg-[#1E1B4B] hover:text-white"
              >
                View Portfolio
              </a>
            </div>

            <div className="pt-8 flex items-center gap-8 border-t border-[#1E1B4B]/15">
              <div>
                <p className="text-3xl font-black text-[#1E1B4B]">50+</p>
                <p className="text-xs text-[#1E1B4B]/70 font-bold uppercase tracking-wider mt-1">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#1E1B4B]">100%</p>
                <p className="text-xs text-[#1E1B4B]/70 font-bold uppercase tracking-wider mt-1">Quality Guaranteed</p>
              </div>
            </div>
          </div>

          {/* Quick Calculator Card on Hero */}
          <div className="relative z-10 lg:ml-auto w-full max-w-md">
            <div className="bg-white border border-[#1E1B4B]/20 p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-black text-[#1E1B4B] mb-2">Instant Cost Estimator</h3>
              <p className="text-sm text-[#1E1B4B]/70 font-medium mb-8">Move the slider to estimate your project cost.</p>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-3">
                    <span className="text-[#1E1B4B]/80">Carpet Area</span>
                    <span className="text-[#1E1B4B] text-lg font-black">{heroSqft} Sq.Ft.</span>
                  </div>
                  <input 
                    type="range" 
                    min="800" max="8000" step="100" 
                    value={heroSqft} 
                    onChange={(e) => setHeroSqft(parseInt(e.target.value))}
                    className="w-full h-2 bg-indigo-50 rounded-full appearance-none cursor-pointer accent-[#1E1B4B]"
                  />
                </div>

                <div className="bg-[#1E1B4B] text-white p-6 rounded-2xl shadow-md">
                  <span className="text-xs text-indigo-200 uppercase tracking-widest font-bold block mb-1">Estimated Budget</span>
                  <span className="text-3xl font-black block mb-4">₹{(heroSqft * 1500).toLocaleString('en-IN')}*</span>
                  <button 
                    onClick={() => {
                      setLeadData({...leadData, sqft: heroSqft.toString()});
                      setIsEstimateModalOpen(true);
                    }}
                    className="w-full bg-white text-[#1E1B4B] font-black py-3 rounded-xl transition-transform hover:-translate-y-0.5 text-sm"
                  >
                    Get Detailed Quote &rarr;
                  </button>
                </div>
                <p className="text-[10px] text-[#1E1B4B]/60 font-semibold text-center">*Base rate estimate. Final cost depends on material selection.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CAPABILITIES SECTION --- */}
      <section id="about" className="py-24 bg-indigo-50/30 px-6 border-y border-[#1E1B4B]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#1E1B4B] font-black text-sm tracking-widest uppercase mb-2 block">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1E1B4B] tracking-tight">Everything You Need Under One Roof.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-[#1E1B4B]/15">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 border border-[#1E1B4B]/10">
                  {cap.icon}
                </div>
                <h3 className="text-xl font-black text-[#1E1B4B] mb-3">{cap.title}</h3>
                <p className="text-[#1E1B4B]/80 font-medium leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SHOWCASE --- */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="max-w-xl">
            <span className="text-[#1E1B4B] font-black text-sm tracking-widest uppercase mb-2 block">Featured Work</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1E1B4B] tracking-tight">Delivered With Perfection.</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Residential', 'Civil', 'Interiors'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 text-sm font-bold rounded-full transition-colors border ${
                  activeFilter === filter ? 'bg-[#1E1B4B] text-white border-[#1E1B4B]' : 'bg-white text-[#1E1B4B] border-[#1E1B4B]/20 hover:bg-[#1E1B4B] hover:text-white'
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
              className="group bg-white border border-[#1E1B4B]/15 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedProject(p)}
            >
              <div className="h-72 overflow-hidden relative border-b border-[#1E1B4B]/10">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 z-20 bg-white text-[#1E1B4B] border border-[#1E1B4B]/20 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {p.category}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-[#1E1B4B] mb-2">{p.title}</h3>
                    <p className="text-sm text-[#1E1B4B]/80 font-bold flex items-center gap-1"><MapPin className="w-4 h-4 text-[#1E1B4B]" /> {p.location}</p>
                  </div>
                  <span className="bg-indigo-50 border border-[#1E1B4B]/15 text-[#1E1B4B] text-xs font-bold px-3 py-1 rounded-full">
                    {p.area}
                  </span>
                </div>
                <p className="text-[#1E1B4B]/80 font-medium mb-6 line-clamp-2">{p.description}</p>
                <div className="flex items-center text-[#1E1B4B] font-bold text-sm group-hover:translate-x-2 transition-transform">
                  View Project Details <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJECT DETAILS MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-[#1E1B4B]/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col relative border border-[#1E1B4B]/20 shadow-2xl">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 z-10 bg-white text-[#1E1B4B] p-2 rounded-full transition-colors border border-[#1E1B4B]/20 hover:bg-[#1E1B4B] hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-64 sm:h-80 relative shrink-0 border-b border-[#1E1B4B]/10">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B]/90 via-[#1E1B4B]/40 to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="bg-white text-[#1E1B4B] text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    {selectedProject.status}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white">{selectedProject.title}</h2>
                  <p className="text-indigo-100 font-semibold mt-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedProject.location} • {selectedProject.area}</p>
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1 bg-white">
              <h3 className="text-xl font-black text-[#1E1B4B] mb-3">Project Overview</h3>
              <p className="text-[#1E1B4B]/80 font-medium leading-relaxed mb-8">{selectedProject.description}</p>

              <h3 className="text-xl font-black text-[#1E1B4B] mb-4">Key Deliverables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-indigo-50/40 p-4 rounded-xl border border-[#1E1B4B]/10">
                    <CheckCircle2 className="w-5 h-5 text-[#1E1B4B] shrink-0" />
                    <span className="text-sm font-bold text-[#1E1B4B]">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#1E1B4B] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-black text-white">Want to build something similar?</h4>
                  <p className="text-sm text-indigo-200 font-medium mt-1">Get a transparent, detailed BOQ for your plot today.</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setIsEstimateModalOpen(true);
                  }}
                  className="w-full sm:w-auto bg-white text-[#1E1B4B] px-6 py-3 rounded-full text-sm font-black transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Get Free Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- LEAD CAPTURE MODAL --- */}
      {isEstimateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B4B]/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-8 rounded-3xl relative border border-[#1E1B4B]/20 shadow-2xl">
            <button 
              onClick={() => { setIsEstimateModalOpen(false); setIsLeadSaved(false); }} 
              className="absolute top-6 right-6 text-[#1E1B4B]/60 hover:text-[#1E1B4B] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {!isLeadSaved ? (
              <>
                <h3 className="text-2xl font-black text-[#1E1B4B] tracking-tight mb-2">Request an Estimate</h3>
                <p className="text-sm text-[#1E1B4B]/70 font-medium mb-8">Provide your details and we will send you a transparent, itemized quotation.</p>

                <form onSubmit={handleEstimateSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-black text-[#1E1B4B] uppercase mb-2 ml-1">Full Name</label>
                    <input type="text" required value={leadData.clientName} onChange={e => setLeadData({...leadData, clientName: e.target.value})} placeholder="e.g. Ramesh Varma" className="w-full px-5 py-4 bg-white border border-[#1E1B4B]/30 text-[#1E1B4B] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1E1B4B] transition-all font-bold placeholder:text-[#1E1B4B]/30" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-[#1E1B4B] uppercase mb-2 ml-1">Phone</label>
                      <input type="tel" required value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} placeholder="+91 98765..." className="w-full px-5 py-4 bg-white border border-[#1E1B4B]/30 text-[#1E1B4B] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1E1B4B] transition-all font-bold placeholder:text-[#1E1B4B]/30" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-[#1E1B4B] uppercase mb-2 ml-1">Area (Sq.Ft)</label>
                      <input type="number" required value={leadData.sqft} onChange={e => setLeadData({...leadData, sqft: e.target.value})} placeholder="2500" className="w-full px-5 py-4 bg-white border border-[#1E1B4B]/30 text-[#1E1B4B] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1E1B4B] transition-all font-bold placeholder:text-[#1E1B4B]/30" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#1E1B4B] uppercase mb-2 ml-1">Project Type</label>
                    <select value={leadData.projectType} onChange={e => setLeadData({...leadData, projectType: e.target.value})} className="w-full px-5 py-4 bg-white border border-[#1E1B4B]/30 text-[#1E1B4B] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1E1B4B] transition-all cursor-pointer font-bold">
                      <option value="Turnkey Residential Construction">Turnkey Residential (Structure + Finish)</option>
                      <option value="Civil Structural Execution">Civil Structural Execution Only</option>
                      <option value="Turnkey Interior Fit-Out">Turnkey Interior Fit-Out Only</option>
                    </select>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-4 bg-[#1E1B4B] text-white font-black rounded-full transition-transform mt-4 hover:-translate-y-0.5 shadow-md">
                    {loading ? 'Processing...' : 'Get My Quote'}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-[#1E1B4B] text-white flex items-center justify-center mx-auto rounded-full mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#1E1B4B]">Request Received!</h3>
                <p className="text-[#1E1B4B] font-medium">
                  Based on <span className="font-black">{leadData.sqft} Sq.Ft.</span>, your project will range between <span className="font-black">₹{((parseFloat(leadData.sqft) || 1500) * 1500).toLocaleString('en-IN')}</span> and <span className="font-black">₹{((parseFloat(leadData.sqft) || 1500) * 1900).toLocaleString('en-IN')}</span>.
                </p>
                <p className="text-sm text-[#1E1B4B] font-bold pt-4 border-t border-[#1E1B4B]/15 mt-6">Our planning team will call {leadData.phone} shortly to discuss precise material specifications.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-[#1E1B4B] px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">Ready to break ground?</h2>
          <p className="text-indigo-200 text-lg font-medium mb-10">Stop worrying about hidden costs and delayed timelines. Let Jyanipur handle everything from architectural blueprints to the final coat of paint.</p>
          <button 
            onClick={() => setIsEstimateModalOpen(true)}
            className="bg-white text-[#1E1B4B] font-black px-10 py-5 rounded-full text-lg hover:-translate-y-1 transition-transform shadow-lg"
          >
            Request a Consultation
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-[#1E1B4B] border-t border-indigo-900/60 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white text-[#1E1B4B] font-black rounded flex items-center justify-center text-lg">
                J
              </div>
              <span className="text-xl font-black text-white tracking-wider uppercase">Jyanipur</span>
            </div>
            <p className="text-sm text-indigo-200 font-medium max-w-sm leading-relaxed">
              Premium Turnkey Construction & Luxury Interiors. Building the future of Hyderabad, one masterpiece at a time.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm font-semibold text-indigo-100">
            <span className="flex items-center gap-3"><MapPin className="w-4 h-4 text-indigo-300" /> 302 Amrutha Lakshmi Residency, Kondapur, Hyderabad, 500084</span>
            <span className="flex items-center gap-3"><Mail className="w-4 h-4 text-indigo-300" /> accounts@jyanipur.in</span>
            <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-indigo-300" /> +91 9246546742</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-indigo-900/60 text-center text-xs font-semibold text-indigo-300 flex flex-col sm:flex-row justify-between items-center gap-4">
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