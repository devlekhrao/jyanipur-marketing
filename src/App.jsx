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

  // Quick Live Estimator State
  const [heroSqft, setHeroSqft] = useState(2400);

  // Estimator Form State
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
      icon: <Building className="w-8 h-8 text-indigo-300" />,
      title: "Civil Construction",
      desc: "End-to-end structural execution including excavation, RCC framing, and masonry, built to last generations."
    },
    {
      icon: <Home className="w-8 h-8 text-indigo-300" />,
      title: "Luxury Interiors",
      desc: "Bespoke interior design and execution featuring factory-finished modular woodwork and premium material sourcing."
    },
    {
      icon: <Hammer className="w-8 h-8 text-indigo-300" />,
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 text-indigo-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- TOP CONTACT BAR --- */}
      <div className="bg-indigo-950/60 border-b border-indigo-800/50 py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-medium tracking-wide text-indigo-200">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-indigo-400" /> +91 9246546742</span>
            <span className="hidden sm:flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-indigo-400" /> accounts@jyanipur.in</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Hyderabad, Telangana
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-indigo-950/70 backdrop-blur-xl border-b border-indigo-800/80 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 text-white font-black rounded-lg flex items-center justify-center text-xl shadow-md shadow-indigo-900/50">
              J
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-white block leading-none">JYANIPUR</span>
              <span className="text-[9px] font-bold tracking-widest text-indigo-300 uppercase block mt-1">Construction & Interiors</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-indigo-200">
            <a href="#about" className="hover:text-white transition-colors">Our Expertise</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.jyanipur.org.in" 
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:block text-sm font-bold text-indigo-300 hover:text-white transition-colors"
            >
              Client Login
            </a>
            <button 
              onClick={() => setIsEstimateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-lg shadow-indigo-900/50 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 border border-indigo-500"
            >
              Get Free Estimate <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-200 bg-indigo-800/40 px-4 py-2 rounded-full border border-indigo-700/50 backdrop-blur-md">
              <Star className="w-4 h-4 text-indigo-400 fill-current" /> Premium Builders in Hyderabad
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Building Spaces That <span className="text-indigo-400">Inspire.</span>
            </h1>

            <p className="text-indigo-200 text-lg max-w-lg leading-relaxed">
              From robust civil foundations to breathtaking luxury interiors, Jyanipur delivers turnkey construction excellence with zero compromises on quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setIsEstimateModalOpen(true)}
                className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-4 rounded-full text-sm transition-all shadow-xl shadow-indigo-900/50 hover:-translate-y-1 text-center border border-indigo-400"
              >
                Start Your Project
              </button>
              <a 
                href="#portfolio"
                className="bg-indigo-900/50 hover:bg-indigo-800 text-indigo-100 border border-indigo-600 font-bold px-8 py-4 rounded-full text-sm transition-all text-center backdrop-blur-sm"
              >
                View Portfolio
              </a>
            </div>

            <div className="pt-8 flex items-center gap-8 border-t border-indigo-800/50">
              <div>
                <p className="text-3xl font-black text-white">50+</p>
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mt-1">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mt-1">Quality Guaranteed</p>
              </div>
            </div>
          </div>

          {/* Quick Calculator Card on Hero */}
          <div className="relative z-10 lg:ml-auto w-full max-w-md">
            <div className="bg-indigo-900/40 backdrop-blur-2xl border border-indigo-700/50 p-8 rounded-3xl shadow-2xl shadow-indigo-950">
              <h3 className="text-xl font-black text-white mb-2">Instant Cost Estimator</h3>
              <p className="text-sm text-indigo-300 mb-8">Move the slider to estimate your project cost.</p>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-3">
                    <span className="text-indigo-200">Carpet Area</span>
                    <span className="text-indigo-400 text-lg">{heroSqft} Sq.Ft.</span>
                  </div>
                  <input 
                    type="range" 
                    min="800" max="8000" step="100" 
                    value={heroSqft} 
                    onChange={(e) => setHeroSqft(parseInt(e.target.value))}
                    className="w-full h-2 bg-indigo-950 rounded-full appearance-none cursor-pointer accent-indigo-400"
                  />
                </div>

                <div className="bg-indigo-950/80 border border-indigo-800 text-white p-6 rounded-2xl shadow-inner">
                  <span className="text-xs text-indigo-400 uppercase tracking-widest font-bold block mb-1">Estimated Budget</span>
                  <span className="text-3xl font-black block mb-4">₹{(heroSqft * 1500).toLocaleString('en-IN')}*</span>
                  <button 
                    onClick={() => {
                      setLeadData({...leadData, sqft: heroSqft.toString()});
                      setIsEstimateModalOpen(true);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors text-sm border border-indigo-500 shadow-md"
                  >
                    Get Detailed Quote &rarr;
                  </button>
                </div>
                <p className="text-[10px] text-indigo-400/60 text-center">*Base rate estimate. Final cost depends on material selection.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CAPABILITIES SECTION --- */}
      <section id="about" className="py-24 px-6 border-t border-indigo-800/40 bg-indigo-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-indigo-400 font-bold text-sm tracking-widest uppercase mb-2 block">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Everything You Need Under One Roof.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <div key={i} className="bg-indigo-800/20 backdrop-blur-sm p-8 rounded-3xl shadow-xl transition-all duration-300 border border-indigo-700/50 hover:bg-indigo-800/40 hover:border-indigo-600">
                <div className="w-16 h-16 bg-indigo-900/60 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-indigo-700/50">
                  {cap.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-3">{cap.title}</h3>
                <p className="text-indigo-200 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SHOWCASE --- */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto border-t border-indigo-800/40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="max-w-xl">
            <span className="text-indigo-400 font-bold text-sm tracking-widest uppercase mb-2 block">Featured Work</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Delivered With Perfection.</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Residential', 'Civil', 'Interiors'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all border ${
                  activeFilter === filter ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-600/30' : 'bg-indigo-900/40 text-indigo-200 border-indigo-700/50 hover:bg-indigo-800/60 hover:text-white'
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
              className="group bg-indigo-900/30 backdrop-blur-md border border-indigo-700/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 cursor-pointer hover:border-indigo-500/80 hover:bg-indigo-900/50"
              onClick={() => setSelectedProject(p)}
            >
              <div className="h-72 overflow-hidden relative border-b border-indigo-800/50">
                <div className="absolute inset-0 bg-indigo-950/40 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                <div className="absolute top-4 left-4 z-20 bg-indigo-950/80 backdrop-blur-md text-indigo-200 border border-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {p.category}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-indigo-300 transition-colors">{p.title}</h3>
                    <p className="text-sm text-indigo-300 flex items-center gap-1"><MapPin className="w-4 h-4 text-indigo-400" /> {p.location}</p>
                  </div>
                  <span className="bg-indigo-950/60 border border-indigo-800 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full">
                    {p.area}
                  </span>
                </div>
                <p className="text-indigo-200/80 mb-6 line-clamp-2">{p.description}</p>
                <div className="flex items-center text-indigo-400 font-bold text-sm group-hover:translate-x-2 transition-transform">
                  View Project Details <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJECT DETAILS MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-indigo-950/90 backdrop-blur-md">
          <div className="bg-indigo-900 w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col relative shadow-2xl shadow-indigo-950 border border-indigo-700">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 z-10 bg-indigo-800 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors shadow-sm border border-indigo-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-64 sm:h-80 relative shrink-0 border-b border-indigo-800">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="bg-indigo-600 text-white border border-indigo-500 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block shadow-sm">
                    {selectedProject.status}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black">{selectedProject.title}</h2>
                  <p className="text-indigo-200 mt-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedProject.location} • {selectedProject.area}</p>
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              <h3 className="text-xl font-bold text-white mb-3">Project Overview</h3>
              <p className="text-indigo-200 leading-relaxed mb-8">{selectedProject.description}</p>

              <h3 className="text-xl font-bold text-white mb-4">Key Deliverables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-indigo-950/50 p-4 rounded-xl border border-indigo-800 shadow-inner">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span className="text-sm font-semibold text-indigo-100">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="bg-indigo-950 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-800/80 shadow-inner">
                <div>
                  <h4 className="font-bold text-white">Want to build something similar?</h4>
                  <p className="text-sm text-indigo-300 mt-1">Get a transparent, detailed BOQ for your plot today.</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setIsEstimateModalOpen(true);
                  }}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full text-sm font-black transition-all whitespace-nowrap shadow-md border border-indigo-500"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/90 backdrop-blur-md">
          <div className="bg-indigo-900 w-full max-w-md p-8 rounded-3xl relative shadow-2xl shadow-indigo-950 border border-indigo-700">
            <button 
              onClick={() => { setIsEstimateModalOpen(false); setIsLeadSaved(false); }} 
              className="absolute top-6 right-6 text-indigo-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {!isLeadSaved ? (
              <>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">Request an Estimate</h3>
                <p className="text-sm text-indigo-300 mb-8">Provide your details and we will send you a transparent, itemized quotation.</p>

                <form onSubmit={handleEstimateSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-indigo-300 uppercase mb-2 ml-1">Full Name</label>
                    <input type="text" required value={leadData.clientName} onChange={e => setLeadData({...leadData, clientName: e.target.value})} placeholder="e.g. Ramesh Varma" className="w-full px-5 py-4 bg-indigo-950/50 border border-indigo-700 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all placeholder:text-indigo-400/50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-indigo-300 uppercase mb-2 ml-1">Phone</label>
                      <input type="tel" required value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} placeholder="+91 98765..." className="w-full px-5 py-4 bg-indigo-950/50 border border-indigo-700 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all placeholder:text-indigo-400/50" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-indigo-300 uppercase mb-2 ml-1">Area (Sq.Ft)</label>
                      <input type="number" required value={leadData.sqft} onChange={e => setLeadData({...leadData, sqft: e.target.value})} placeholder="2500" className="w-full px-5 py-4 bg-indigo-950/50 border border-indigo-700 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all placeholder:text-indigo-400/50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-indigo-300 uppercase mb-2 ml-1">Project Type</label>
                    <select value={leadData.projectType} onChange={e => setLeadData({...leadData, projectType: e.target.value})} className="w-full px-5 py-4 bg-indigo-950/50 border border-indigo-700 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all cursor-pointer">
                      <option value="Turnkey Residential Construction" className="bg-indigo-900">Turnkey Residential (Structure + Finish)</option>
                      <option value="Civil Structural Execution" className="bg-indigo-900">Civil Structural Execution Only</option>
                      <option value="Turnkey Interior Fit-Out" className="bg-indigo-900">Turnkey Interior Fit-Out Only</option>
                    </select>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-full transition-all mt-4 shadow-lg shadow-indigo-600/30 border border-indigo-400 hover:-translate-y-0.5">
                    {loading ? 'Processing...' : 'Get My Quote'}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-indigo-950 border border-indigo-700 text-indigo-400 flex items-center justify-center mx-auto rounded-full mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">Request Received!</h3>
                <p className="text-indigo-200">
                  Based on <span className="font-bold text-white">{leadData.sqft} Sq.Ft.</span>, your project will range between <span className="font-bold text-indigo-400">₹{((parseFloat(leadData.sqft) || 1500) * 1500).toLocaleString('en-IN')}</span> and <span className="font-bold text-indigo-400">₹{((parseFloat(leadData.sqft) || 1500) * 1900).toLocaleString('en-IN')}</span>.
                </p>
                <p className="text-sm text-indigo-400 pt-4 border-t border-indigo-800 mt-6">Our planning team will call {leadData.phone} shortly to discuss precise material specifications.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6 text-center border-t border-indigo-800/50 bg-indigo-950/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">Ready to break ground?</h2>
          <p className="text-indigo-200 text-lg mb-10">Stop worrying about hidden costs and delayed timelines. Let Jyanipur handle everything from architectural blueprints to the final coat of paint.</p>
          <button 
            onClick={() => setIsEstimateModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-10 py-5 rounded-full text-lg shadow-xl shadow-indigo-900/50 border border-indigo-500 hover:scale-105 transition-transform"
          >
            Request a Consultation
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-indigo-950/80 border-t border-indigo-900 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-indigo-600 text-white font-black rounded flex items-center justify-center text-lg border border-indigo-500 shadow-sm shadow-indigo-900/50">
                J
              </div>
              <span className="text-xl font-black text-white tracking-wider uppercase">Jyanipur</span>
            </div>
            <p className="text-sm text-indigo-300/80 max-w-sm leading-relaxed">
              Premium Turnkey Construction & Luxury Interiors. Building the future of Hyderabad, one masterpiece at a time.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm font-semibold text-indigo-200">
            <span className="flex items-center gap-3"><MapPin className="w-4 h-4 text-indigo-400" /> 302 Amrutha Lakshmi Residency, Kondapur, Hyderabad, 500084</span>
            <span className="flex items-center gap-3"><Mail className="w-4 h-4 text-indigo-400" /> accounts@jyanipur.in</span>
            <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-indigo-400" /> +91 9246546742</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-indigo-900 text-center text-xs text-indigo-400/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© 2026 Jyanipur Construction & Interiors. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-200 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}