import React, { useState } from 'react';
import { saveMarketingLead } from './db';
import { 
  Grid, Briefcase, Compass, Phone, User, ArrowRight, 
  Check, Mail, MapPin, X, Building, Shield, PenTool,
  Layers, Globe, Award, Sparkles
} from 'lucide-react';

export default function App() {
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

  // Enterprise & Regional Roster
  const clients = [
    { name: 'Dodla Dairy', role: 'Corporate Headquarters & Outlets', location: 'Greater Hyderabad' },
    { name: 'Dodla Foundation', role: 'CSR & Institutional Facilities', location: 'Telangana' },
    { name: 'Dodla College', role: 'Educational Infrastructure Fit-Outs', location: 'Hyderabad Corridor' },
    { name: 'DivyaSree', role: 'Commercial & High-End Interiors', location: 'HITEC City Corridor' }
  ];

  // Telangana Stories
  const telanganaStories = {
    dodla: {
      title: 'The Dodla Corporate & Institutional Footprint',
      client: 'Dodla Dairy, Foundation & College',
      scope: 'Multi-Facility Execution',
      desc: 'Executing specialized commercial fit-outs, educational facilities, and corporate administrative infrastructure across Hyderabad and surrounding districts with heavy structural precision.',
      stats: '350,000+ Sq.Ft Delivered'
    },
    divyasree: {
      title: 'High-Density Commercial Fit-Outs',
      client: 'DivyaSree Commercial',
      scope: 'Turnkey Modern Interiors',
      desc: 'Precision acoustic paneling, glass partitions, and large-format flooring fit-outs delivered within premier IT corridors for high-capacity corporate environments.',
      stats: '220,000+ Sq.Ft Delivered'
    },
    monoliths: {
      title: 'Bespoke Luxury Residential Monoliths',
      client: 'Private High-Net-Worth Residences',
      scope: 'Full Structural & Interior Handover',
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

  const teakTintFilter = 'brightness(0) saturate(100%) invert(36%) sepia(61%) saturate(2251%) hue-rotate(5deg) brightness(95%) contrast(92%)';

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white text-[#292524] font-sans selection:bg-[#B45309] selection:text-white flex flex-col antialiased relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* --- ICON-ONLY FLOATING LEFT-CENTER DOCK --- */}
      <aside className="w-full lg:w-16 lg:fixed lg:top-1/2 lg:-translate-y-1/2 lg:left-6 bg-white text-[#B45309] rounded-full py-4 flex lg:flex-col items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-40 border border-[#E7E5E4]">
        <nav className="flex lg:flex-col items-center gap-2">
          <a href="#about" title="About Us" className="w-12 h-12 flex items-center justify-center hover:bg-amber-50 text-[#B45309] rounded-full transition-colors">
            <Layers className="w-5 h-5" strokeWidth={1.75} />
          </a>
          <a href="#clients" title="Key Clients" className="w-12 h-12 flex items-center justify-center hover:bg-amber-50 text-[#B45309] rounded-full transition-colors">
            <Building className="w-5 h-5" strokeWidth={1.75} />
          </a>
          <a href="#stories" title="Telangana Presence" className="w-12 h-12 flex items-center justify-center hover:bg-amber-50 text-[#B45309] rounded-full transition-colors">
            <Globe className="w-5 h-5" strokeWidth={1.75} />
          </a>
          <a href="#portfolio" title="Portfolio" className="w-12 h-12 flex items-center justify-center hover:bg-amber-50 text-[#B45309] rounded-full transition-colors">
            <Grid className="w-5 h-5" strokeWidth={1.75} />
          </a>
          <a href="#contact" title="Contact" className="w-12 h-12 flex items-center justify-center hover:bg-amber-50 text-[#B45309] rounded-full transition-colors">
            <Phone className="w-5 h-5" strokeWidth={1.75} />
          </a>
        </nav>

        <div className="flex lg:flex-col items-center gap-2 mt-2 pt-4 border-t border-[#E7E5E4] shrink-0">
          <a 
            href="https://www.jyanipur.org.in" 
            target="_blank" 
            rel="noreferrer"
            title="Client Portal"
            className="w-12 h-12 flex items-center justify-center text-[#B45309] hover:bg-amber-50 transition-colors rounded-full"
          >
            <User className="w-5 h-5" strokeWidth={1.75} />
          </a>
          <button 
            onClick={() => setIsEstimateModalOpen(true)}
            title="Book Consultation"
            className="w-12 h-12 bg-[#B45309] text-white hover:bg-[#92400E] rounded-full transition-all shadow-sm flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 lg:ml-28 p-6 lg:p-10 relative bg-white min-h-screen max-w-[1600px] mx-auto w-full">
        
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#B45309 1.5px, transparent 1.5px), linear-gradient(to right, #B45309 1px, transparent 1px), linear-gradient(to bottom, #B45309 1px, transparent 1px)`,
            backgroundSize: '24px 24px, 72px 72px, 72px 72px'
          }}
        ></div>

        {/* --- BRAND HEADER --- */}
        <header className="relative z-10 mb-8 pt-2 flex items-center justify-start">
          <div className="relative flex items-center w-full">
            <div className="h-24 sm:h-32 lg:h-36 w-auto flex items-center shrink-0 lg:-ml-28 pr-6">
              <img 
                src="/jyanipur.png" 
                alt="Jyanipur Symbol" 
                className="h-full w-auto object-contain object-left" 
                style={{ filter: teakTintFilter }} 
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.3em] text-[#B45309] uppercase">
              Jyanipur
            </h1>
          </div>
        </header>

        {/* --- HERO SHOWCASE --- */}
        <section className="relative z-10 mb-16">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E7E5E4] h-[500px] lg:h-[700px] w-full group">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80" 
              alt="Featured Architecture" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute bottom-12 left-0 right-0 w-full bg-[#B45309]/90 backdrop-blur-md py-5 flex flex-col items-center justify-center text-white shadow-xl">
              <h2 className="text-xl lg:text-2xl font-bold tracking-[0.2em] uppercase">The Glass Monolith Villa</h2>
              <p className="text-sm lg:text-base font-light tracking-wide mt-1 text-amber-50">Kondapur, Hyderabad</p>
            </div>
          </div>
        </section>

        {/* --- ABOUT US & ROOTS OF JYANIPUR --- */}
        <section id="about" className="relative z-10 mb-20 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-3 block">Hyderabad Headquarters</span>
              <h2 className="text-4xl lg:text-5xl font-light text-[#B45309] leading-[1.15] tracking-tight mb-6">
                The Roots of Jyanipur.
              </h2>
              <p className="text-[#57534E] text-base lg:text-lg font-light leading-relaxed mb-6">
                Anchored in Hyderabad, Jyanipur is a premier civil construction and luxury interior firm built on structural integrity, meticulous engineering, and high-end fit-out mastery.
              </p>
              <p className="text-[#78716C] text-sm font-light leading-relaxed">
                Trusted by enterprise leaders across commercial, educational, and institutional sectors, we deliver projects seamlessly from soil excavation to final key handover.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-amber-50/50 p-8 rounded-2xl border border-amber-200/60">
                <span className="text-3xl lg:text-4xl font-light text-[#B45309] block mb-2">800,000+</span>
                <span className="text-xs font-semibold text-[#292524] uppercase tracking-wider block mb-2">Sq.Ft Delivered in Telangana</span>
                <p className="text-xs text-[#57534E] font-light">Spanning luxury private residences, institutional campuses, and corporate headquarters.</p>
              </div>

              <div className="bg-amber-50/50 p-8 rounded-2xl border border-amber-200/60">
                <span className="text-3xl lg:text-4xl font-light text-[#B45309] block mb-2">100%</span>
                <span className="text-xs font-semibold text-[#292524] uppercase tracking-wider block mb-2">In-House Execution</span>
                <p className="text-xs text-[#57534E] font-light">Direct management of specialized civil labor, joinery units, and architectural teams.</p>
              </div>

              <div className="bg-amber-50/50 p-8 rounded-2xl border border-amber-200/60">
                <span className="text-3xl lg:text-4xl font-light text-[#B45309] block mb-2">Turnkey</span>
                <span className="text-xs font-semibold text-[#292524] uppercase tracking-wider block mb-2">End-to-End Delivery</span>
                <p className="text-xs text-[#57534E] font-light">Single point of contact for civil framing, MEP integration, and bespoke interiors.</p>
              </div>

              <div className="bg-amber-50/50 p-8 rounded-2xl border border-amber-200/60">
                <span className="text-3xl lg:text-4xl font-light text-[#B45309] block mb-2">15-Year</span>
                <span className="text-xs font-semibold text-[#292524] uppercase tracking-wider block mb-2">Structural Warranty</span>
                <p className="text-xs text-[#57534E] font-light">Engineered concrete stability, polyurethane waterproofing, and premium materials.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- PROMINENT CLIENT ROSTER --- */}
        <section id="clients" className="relative z-10 mb-24 pt-12 border-t border-[#E7E5E4]">
          <div className="mb-10">
            <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Enterprise Partners</span>
            <h2 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight">Institutional Client Roster</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((c, i) => (
              <div key={i} className="bg-stone-50 p-8 rounded-2xl border border-[#E7E5E4] hover:border-[#B45309] transition-all hover:bg-white hover:shadow-md group">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-6 border border-amber-200/60 text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white transition-colors">
                  <Building className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-normal text-[#1C1917] mb-2 tracking-tight">{c.name}</h3>
                <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider block mb-1">{c.role}</span>
                <p className="text-xs text-[#78716C] font-light">{c.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- STORIES OF TELANGANA (INDIA MAP WITH HIGHLIGHTED TELANGANA) --- */}
        <section id="stories" className="relative z-10 mb-24 pt-12 border-t border-[#E7E5E4]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            <div>
              <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Core Stronghold</span>
              <h2 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight">Stories of Telangana</h2>
            </div>
            <p className="text-xs text-[#78716C] max-w-md font-light">
              Centrally built in Hyderabad, delivering landmark infrastructure and high-end fit-outs across Telangana.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-stone-50 p-8 lg:p-12 rounded-3xl border border-[#E7E5E4]">
            
            {/* Left: Custom Clean India Map with Highlighted Telangana */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E7E5E4] flex flex-col items-center justify-center relative shadow-sm h-[400px]">
              
              {/* Minimalist SVG Outline of India with Telangana Highlight */}
              <svg viewBox="0 0 500 550" className="w-full h-full max-h-[350px] object-contain drop-shadow-sm">
                
                {/* Subdued India Outer Bounds Silhouette */}
                <path 
                  d="M230,20 L270,40 L310,70 L280,110 L300,150 L340,160 L380,210 L430,220 L480,240 L450,280 L390,300 L340,360 L290,440 L250,520 L220,460 L180,380 L120,310 L80,280 L90,230 L140,200 L180,150 L200,80 Z" 
                  fill="#F5F5F4" 
                  stroke="#E7E5E4" 
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* Highlighted Telangana State Region in Warm Teak */}
                <g className="cursor-pointer group">
                  <path 
                    d="M230,300 C250,290 270,300 280,320 C285,340 275,360 260,370 C240,375 225,355 220,330 Z" 
                    fill="#B45309" 
                    className="hover:fill-[#92400E] transition-colors"
                  />
                  
                  {/* Hyderabad Pulsing Location Dot */}
                  <circle cx="250" cy="335" r="5" fill="#FFFFFF" />
                  <circle cx="250" cy="335" r="12" fill="none" stroke="#B45309" strokeWidth="2" className="animate-ping opacity-75" />

                  {/* Label */}
                  <text x="250" y="315" textAnchor="middle" fill="#B45309" className="text-[12px] font-semibold tracking-wider uppercase" style={{ fontSize: '13px', fontWeight: 'bold' }}>
                    Telangana (HQ)
                  </text>
                </g>
              </svg>

              <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-[#B45309] bg-amber-50 px-4 py-2 rounded-full border border-amber-200/60">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad • Active Construction Stronghold</span>
              </div>
            </div>

            {/* Right: Interactive Story Selector */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Story Tab Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedStory('dodla')}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                    selectedStory === 'dodla' 
                      ? 'bg-[#B45309] text-white border-[#B45309] shadow-sm' 
                      : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-amber-50'
                  }`}
                >
                  Dodla Group
                </button>
                <button
                  onClick={() => setSelectedStory('divyasree')}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                    selectedStory === 'divyasree' 
                      ? 'bg-[#B45309] text-white border-[#B45309] shadow-sm' 
                      : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-amber-50'
                  }`}
                >
                  DivyaSree
                </button>
                <button
                  onClick={() => setSelectedStory('monoliths')}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                    selectedStory === 'monoliths' 
                      ? 'bg-[#B45309] text-white border-[#B45309] shadow-sm' 
                      : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-amber-50'
                  }`}
                >
                  Luxury Villas
                </button>
              </div>

              {/* Story Content Card */}
              <div className="bg-white p-8 rounded-2xl border border-[#E7E5E4] shadow-sm">
                <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider block mb-2">
                  {telanganaStories[selectedStory].client}
                </span>
                <h3 className="text-2xl font-light text-[#292524] mb-4 tracking-tight">
                  {telanganaStories[selectedStory].title}
                </h3>
                <p className="text-[#57534E] text-sm font-light leading-relaxed mb-6">
                  {telanganaStories[selectedStory].desc}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-[#E7E5E4]">
                  <div>
                    <span className="text-[11px] text-[#78716C] uppercase tracking-wider block">Telangana Volume</span>
                    <span className="text-base font-semibold text-[#B45309]">
                      {telanganaStories[selectedStory].stats}
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsEstimateModalOpen(true)}
                    className="flex items-center gap-2 text-xs font-semibold text-[#B45309] hover:underline uppercase tracking-wider"
                  >
                    Discuss Telangana Project <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* PORTFOLIO GALLERY */}
        <section id="portfolio" className="relative z-10 mb-24 pt-12 border-t border-[#E7E5E4]">
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
                className="group bg-white text-[#292524] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#E7E5E4]"
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
        <section id="services" className="relative z-10 mb-24 pt-12 border-t border-[#E7E5E4]">
          <div className="mb-12">
            <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Our Capabilities</span>
            <h2 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight">End-to-End Execution</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white text-[#292524] p-8 rounded-2xl border border-[#E7E5E4] shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 border border-[#B45309]/20">
                <Building className="w-6 h-6 text-[#B45309]" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-normal mb-3 tracking-tight text-[#1C1917]">Civil Construction</h3>
              <p className="text-[#57534E] text-sm font-light leading-relaxed">Structural RCC framing, masonry, and civil engineering built to last generations.</p>
            </div>
            <div className="bg-white text-[#292524] p-8 rounded-2xl border border-[#E7E5E4] shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 border border-[#B45309]/20">
                <PenTool className="w-6 h-6 text-[#B45309]" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-normal mb-3 tracking-tight text-[#1C1917]">Bespoke Interiors</h3>
              <p className="text-[#57534E] text-sm font-light leading-relaxed">Factory-finished modular woodwork, marble flooring, and custom furniture fitting.</p>
            </div>
            <div className="bg-white text-[#292524] p-8 rounded-2xl border border-[#E7E5E4] shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 border border-[#B45309]/20">
                <Shield className="w-6 h-6 text-[#B45309]" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-normal mb-3 tracking-tight text-[#1C1917]">Turnkey Management</h3>
              <p className="text-[#57534E] text-sm font-light leading-relaxed">Single point of accountability coordinating labor, vendors, and precise handovers.</p>
            </div>
          </div>
        </section>

        {/* METHODOLOGY */}
        <section id="process" className="relative z-10 mb-24 pt-12 border-t border-[#E7E5E4]">
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

        {/* --- FOOTER --- */}
        <footer id="contact" className="relative z-10 bg-white text-[#292524] rounded-2xl p-8 lg:p-12 shadow-sm border border-[#E7E5E4] mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-12 border-b border-[#E7E5E4]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-auto flex items-center justify-start shrink-0">
                  <img 
                    src="/jyanipur.png" 
                    alt="Jyanipur Symbol" 
                    className="h-full w-auto object-contain object-left" 
                    style={{ filter: teakTintFilter }} 
                  />
                </div>
                <span className="text-2xl font-light tracking-[0.15em] uppercase text-[#1C1917]">Jyanipur</span>
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

      {/* --- MODALS --- */}
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
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" strokeWidth={2} />
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
                  <Check className="w-8 h-8" strokeWidth={2} />
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