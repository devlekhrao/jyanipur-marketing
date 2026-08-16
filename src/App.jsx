import React, { useState } from 'react';
import { saveMarketingLead } from './db';
import { 
  ArrowUpRight, CheckCircle2, Phone, Mail, MapPin, 
  X, Building, Home, Hammer, ArrowRight, Star,
  Paintbrush, ShieldCheck
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
      icon: <Building className="w-8 h-8 text-[#B45309]" />,
      title: "Civil Construction",
      desc: "End-to-end structural execution including excavation, RCC framing, and masonry, built to last generations."
    },
    {
      icon: <Paintbrush className="w-8 h-8 text-[#B45309]" />,
      title: "Luxury Interiors",
      desc: "Bespoke interior design and execution featuring factory-finished modular woodwork and premium material sourcing."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#B45309]" />,
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
    <div className="min-h-screen bg-[#F5F5F4] text-[#B45309] font-sans selection:bg-[#B45309] selection:text-white">
      
      {/* --- TOP CONTACT BAR --- */}
      <div className="bg-[#B45309] text-[#F5F5F4] py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-medium tracking-wide">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#A8A29E]" /> +91 9246546742</span>
            <span className="hidden sm:flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#A8A29E]" /> accounts@jyanipur.in</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#A8A29E]" /> Hyderabad, Telangana
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-[#F5F5F4]/90 backdrop-blur-md border-b border-[#E7E5E4] px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#B45309] text-[#F5F5F4] font-black rounded-lg flex items-center justify-center text-xl shadow-md">
              J
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-[#292524] block leading-none">JYANIPUR</span>
              <span className="text-[9px] font-bold tracking-widest text-[#78716C] uppercase block mt-1">Construction & Interiors</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#B45309]">
            <a href="#about" className="hover:text-[#292524] transition-colors">Our Expertise</a>
            <a href="#portfolio" className="hover:text-[#292524] transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-[#292524] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.jyanipur.org.in" 
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:block text-sm font-bold text-[#78716C] hover:text-[#292524] transition-colors"
            >
              Client Login
            </a>
            <button 
              onClick={() => setIsEstimateModalOpen(true)}
              className="bg-[#B45309] hover:bg-[#292524] text-[#F5F5F4] font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-md"
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-[#E7E5E4] px-4 py-2 rounded-full border border-[#D6D3D1]">
              <Star className="w-4 h-4 text-[#78716C] fill-current" /> Premium Builders in Hyderabad
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-[#292524] leading-[1.1] tracking-tight">
              Building Spaces That <span className="text-[#78716C]">Inspire.</span>
            </h1>

            <p className="text-[#B45309] text-lg max-w-lg leading-relaxed">
              From robust civil foundations to breathtaking luxury interiors, Jyanipur delivers turnkey construction excellence with zero compromises on quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setIsEstimateModalOpen(true)}
                className="bg-[#B45309] hover:bg-[#292524] text-[#F5F5F4] font-bold px-8 py-4 rounded-full text-sm transition-all shadow-lg hover:-translate-y-0.5"
              >
                Start Your Project
              </button>
              <a 
                href="#portfolio"
                className="bg-white hover:bg-[#E7E5E4] text-[#292524] border border-[#D6D3D1] font-bold px-8 py-4 rounded-full text-sm transition-all text-center"
              >
                View Portfolio
              </a>
            </div>

            <div className="pt-8 flex items-center gap-8 border-t border-[#E7E5E4]">
              <div>
                <p className="text-3xl font-black text-[#292524]">50+</p>
                <p className="text-xs text-[#78716C] font-bold uppercase tracking-wider mt-1">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#292524]">100%</p>
                <p className="text-xs text-[#78716C] font-bold uppercase tracking-wider mt-1">Quality Guaranteed</p>
              </div>
            </div>
          </div>

          {/* Quick Calculator Card on Hero */}
          <div className="relative z-10 lg:ml-auto w-full max-w-md">
            <div className="bg-white border border-[#E7E5E4] p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-black text-[#292524] mb-2">Instant Cost Estimator</h3>
              <p className="text-sm text-[#78716C] mb-8">Move the slider to estimate your project cost.</p>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-3">
                    <span className="text-[#B45309]">Carpet Area</span>
                    <span className="text-[#292524] text-lg font-black">{heroSqft} Sq.Ft.</span>
                  </div>
                  <input 
                    type="range" 
                    min="800" max="8000" step="100" 
                    value={heroSqft} 
                    onChange={(e) => setHeroSqft(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#E7E5E4] rounded-full appearance-none cursor-pointer accent-[#B45309]"
                  />
                </div>

                <div className="bg-[#B45309] text-white p-6 rounded-2xl">
                  <span className="text-xs text-[#D6D3D1] uppercase tracking-widest font-bold block mb-1">Estimated Budget</span>
                  <span className="text-3xl font-black block mb-4">₹{(heroSqft * 1500).toLocaleString('en-IN')}*</span>
                  <button 
                    onClick={() => {
                      setLeadData({...leadData, sqft: heroSqft.toString()});
                      setIsEstimateModalOpen(true);
                    }}
                    className="w-full bg-[#F5F5F4] hover:bg-white text-[#292524] font-bold py-3 rounded-xl transition-all text-sm"
                  >
                    Get Detailed Quote &rarr;
                  </button>
                </div>
                <p className="text-[10px] text-[#A8A29E] text-center">*Base rate estimate. Final cost depends on material selection.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CAPABILITIES SECTION --- */}
      <section id="about" className="py-24 bg-white px-6 border-t border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#78716C] font-bold text-sm tracking-widest uppercase mb-2 block">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#292524] tracking-tight">Everything You Need Under One Roof.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <div key={i} className="bg-[#F5F5F4] p-8 rounded-3xl border border-[#E7E5E4] shadow-sm hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-white border border-[#E7E5E4] rounded-2xl flex items-center justify-center mb-6">
                  {cap.icon}
                </div>
                <h3 className="text-xl font-black text-[#292524] mb-3">{cap.title}</h3>
                <p className="text-[#B45309] leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SHOWCASE --- */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="max-w-xl">
            <span className="text-[#78716C] font-bold text-sm tracking-widest uppercase mb-2 block">Featured Work</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#292524] tracking-tight">Delivered With Perfection.</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Residential', 'Civil', 'Interiors'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all border ${
                  activeFilter === filter ? 'bg-[#B45309] text-[#F5F5F4] border-[#B45309]' : 'bg-white text-[#B45309] border-[#D6D3D1] hover:bg-[#E7E5E4]'
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
              className="group bg-white border border-[#E7E5E4] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedProject(p)}
            >
              <div className="h-72 overflow-hidden relative border-b border-[#E7E5E4]">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 z-20 bg-[#F5F5F4] text-[#292524] text-xs font-bold px-3 py-1.5 rounded-full border border-[#D6D3D1]">
                  {p.category}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-[#292524] mb-2">{p.title}</h3>
                    <p className="text-sm text-[#78716C] font-bold flex items-center gap-1"><MapPin className="w-4 h-4 text-[#B45309]" /> {p.location}</p>
                  </div>
                  <span className="bg-[#F5F5F4] border border-[#E7E5E4] text-[#B45309] text-xs font-bold px-3 py-1 rounded-full">
                    {p.area}
                  </span>
                </div>
                <p className="text-[#B45309] mb-6 line-clamp-2">{p.description}</p>
                <div className="flex items-center text-[#B45309] font-bold text-sm group-hover:translate-x-2 transition-transform">
                  View Project Details <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJECT DETAILS MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-[#292524]/60 backdrop-blur-sm">
          <div className="bg-[#F5F5F4] w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col relative border border-[#D6D3D1] shadow-2xl">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 z-10 bg-white text-[#292524] p-2 rounded-full border border-[#D6D3D1] hover:bg-[#292524] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-64 sm:h-80 relative shrink-0 border-b border-[#D6D3D1]">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292524]/80 via-transparent to-transparent flex items-end p-8">
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
              <h3 className="text-xl font-black text-[#292524] mb-3">Project Overview</h3>
              <p className="text-[#B45309] leading-relaxed mb-8">{selectedProject.description}</p>

              <h3 className="text-xl font-black text-[#292524] mb-4">Key Deliverables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E7E5E4]">
                    <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0" />
                    <span className="text-sm font-bold text-[#292524]">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#B45309] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
                <div>
                  <h4 className="font-black">Want to build something similar?</h4>
                  <p className="text-sm text-[#D6D3D1] mt-1">Get a transparent, detailed BOQ for your plot today.</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setIsEstimateModalOpen(true);
                  }}
                  className="w-full sm:w-auto bg-[#F5F5F4] text-[#292524] hover:bg-white px-6 py-3 rounded-full text-sm font-black transition-all whitespace-nowrap"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292524]/60 backdrop-blur-sm">
          <div className="bg-[#F5F5F4] w-full max-w-md p-8 rounded-3xl relative border border-[#D6D3D1] shadow-2xl">
            <button 
              onClick={() => { setIsEstimateModalOpen(false); setIsLeadSaved(false); }} 
              className="absolute top-6 right-6 text-[#78716C] hover:text-[#292524] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {!isLeadSaved ? (
              <>
                <h3 className="text-2xl font-black text-[#292524] tracking-tight mb-2">Request an Estimate</h3>
                <p className="text-sm text-[#78716C] font-medium mb-8">Provide your details and we will send you a transparent, itemized quotation.</p>

                <form onSubmit={handleEstimateSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-black text-[#292524] uppercase mb-2 ml-1">Full Name</label>
                    <input type="text" required value={leadData.clientName} onChange={e => setLeadData({...leadData, clientName: e.target.value})} placeholder="e.g. Ramesh Varma" className="w-full px-5 py-4 bg-white border border-[#D6D3D1] text-[#292524] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all font-bold" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-[#292524] uppercase mb-2 ml-1">Phone</label>
                      <input type="tel" required value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} placeholder="+91 98765..." className="w-full px-5 py-4 bg-white border border-[#D6D3D1] text-[#292524] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-[#292524] uppercase mb-2 ml-1">Area (Sq.Ft)</label>
                      <input type="number" required value={leadData.sqft} onChange={e => setLeadData({...leadData, sqft: e.target.value})} placeholder="2500" className="w-full px-5 py-4 bg-white border border-[#D6D3D1] text-[#292524] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all font-bold" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#292524] uppercase mb-2 ml-1">Project Type</label>
                    <select value={leadData.projectType} onChange={e => setLeadData({...leadData, projectType: e.target.value})} className="w-full px-5 py-4 bg-white border border-[#D6D3D1] text-[#292524] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all cursor-pointer font-bold">
                      <option value="Turnkey Residential Construction">Turnkey Residential (Structure + Finish)</option>
                      <option value="Civil Structural Execution">Civil Structural Execution Only</option>
                      <option value="Turnkey Interior Fit-Out">Turnkey Interior Fit-Out Only</option>
                    </select>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-4 bg-[#B45309] hover:bg-[#292524] text-white font-black rounded-full transition-all mt-4 shadow-md">
                    {loading ? 'Processing...' : 'Get My Quote'}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-[#B45309] text-white flex items-center justify-center mx-auto rounded-full mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#292524]">Request Received!</h3>
                <p className="text-[#B45309] font-medium">
                  Based on <span className="font-black">{leadData.sqft} Sq.Ft.</span>, your project will range between <span className="font-black">₹{((parseFloat(leadData.sqft) || 1500) * 1500).toLocaleString('en-IN')}</span> and <span className="font-black">₹{((parseFloat(leadData.sqft) || 1500) * 1900).toLocaleString('en-IN')}</span>.
                </p>
                <p className="text-sm text-[#78716C] font-bold pt-4 border-t border-[#E7E5E4] mt-6">Our planning team will call {leadData.phone} shortly to discuss precise material specifications.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-[#B45309] text-white px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Ready to break ground?</h2>
          <p className="text-[#E7E5E4] text-lg font-medium mb-10">Stop worrying about hidden costs and delayed timelines. Let Jyanipur handle everything from architectural blueprints to the final coat of paint.</p>
          <button 
            onClick={() => setIsEstimateModalOpen(true)}
            className="bg-[#F5F5F4] hover:bg-white text-[#292524] font-black px-10 py-5 rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Request a Consultation
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-[#292524] text-[#E7E5E4] py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#F5F5F4] text-[#292524] font-black rounded flex items-center justify-center text-lg">
                J
              </div>
              <span className="text-xl font-black text-white tracking-wider uppercase">Jyanipur</span>
            </div>
            <p className="text-sm text-[#A8A29E] max-w-sm leading-relaxed">
              Premium Turnkey Construction & Luxury Interiors. Building the future of Hyderabad, one masterpiece at a time.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm font-semibold text-[#D6D3D1]">
            <span className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#A8A29E]" /> 302 Amrutha Lakshmi Residency, Kondapur, Hyderabad, 500084</span>
            <span className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#A8A29E]" /> accounts@jyanipur.in</span>
            <span className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#A8A29E]" /> +91 9246546742</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#B45309] text-center text-xs font-semibold text-[#78716C] flex flex-col sm:flex-row justify-between items-center gap-4">
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