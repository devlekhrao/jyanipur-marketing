import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-[#B45309]maps';
import { saveMarketingLead } from './db';
import { 
  Grid, Briefcase, Phone, User, ArrowRight, 
  Check, Mail, MapPin, X, Building, Shield, PenTool,
  Layers, Globe, Home
} from 'lucide-react';

// Official India GeoJSON topology
const INDIA_GEO_JSON = "/india-states.json";

export default function App() {
  const [currentPage, setCurrentPage] = useState('stories');
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

  const clients = [
    { name: 'Dodla Dairy', role: 'Corporate Headquarters & Outlets', location: 'Greater Hyderabad' },
    { name: 'Dodla Foundation', role: 'CSR & Institutional Facilities', location: 'Telangana' },
    { name: 'Dodla College', role: 'Educational Infrastructure Fit-Outs', location: 'Hyderabad Corridor' },
    { name: 'DivyaSree', role: 'Commercial & High-End Interiors', location: 'HITEC City Corridor' }
  ];

  const telanganaStories = {
    dodla: {
      title: 'The Dodla Corporate & Institutional Footprint',
      client: 'Dodla Dairy, Foundation & College',
      desc: 'Executing specialized commercial fit-outs, educational facilities, and corporate administrative infrastructure across Hyderabad and surrounding districts with heavy structural precision.',
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

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Layers },
    { id: 'stories', label: 'Stories of Telangana', icon: Globe },
    { id: 'projects', label: 'Projects', icon: Grid },
    { id: 'capabilities', label: 'Capabilities', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-white text-[#292524] font-sans selection:bg-[#B45309] selection:text-white flex flex-col antialiased relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* SIDEBAR DOCK */}
      <aside className="w-full lg:w-16 lg:fixed lg:top-1/2 lg:-translate-y-1/2 lg:left-6 bg-white text-[#B45309] rounded-full py-4 flex lg:flex-col items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-40 border border-[#E7E5E4]">
        <nav className="flex lg:flex-col items-center gap-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
                    isActive 
                      ? 'bg-[#B45309] text-white shadow-md' 
                      : 'hover:bg-amber-50 text-[#B45309]'
                  }`}
                >
                  <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                </button>

                <div className="hidden lg:block absolute left-16 top-1/2 -translate-y-1/2 bg-[#292524] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl z-50">
                  {item.label}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#292524]"></div>
                </div>
              </div>
            );
          })}
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
            className="w-12 h-12 bg-[#B45309] text-white hover:bg-[#92400E] transition-all shadow-sm flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 lg:ml-28 p-6 lg:p-10 relative bg-white min-h-screen max-w-[1600px] mx-auto w-full">
        
        {/* HEADER */}
        <header className="relative z-10 mb-12 pt-2 flex items-center justify-start">
          <div className="relative flex items-center w-full">
            <div className="h-24 sm:h-32 lg:h-36 w-auto flex items-center shrink-0 lg:-ml-28 pr-6 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img 
                src="/jyanipur.png" 
                alt="Jyanipur Symbol" 
                className="h-full w-auto object-contain object-left" 
                style={{ filter: teakTintFilter }} 
              />
            </div>
            <h1 
              onClick={() => setCurrentPage('home')}
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.3em] text-[#B45309] uppercase cursor-pointer"
            >
              Jyanipur
            </h1>
          </div>
        </header>

        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-16">
            <section className="relative z-10">
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

            <section className="max-w-4xl lg:pl-4 py-8">
              <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-3 block">Architectural Studio</span>
              <h2 className="text-4xl lg:text-5xl font-light text-[#B45309] leading-[1.2] tracking-tight mb-6">
                Turnkey Construction & Luxury Interior Engineering.
              </h2>
              <p className="text-[#57534E] text-lg lg:text-xl font-light leading-relaxed mb-8">
                Based in Hyderabad, we combine heavy civil structural precision with refined luxury interior execution under a single studio umbrella.
              </p>
              <button 
                onClick={() => setCurrentPage('projects')}
                className="inline-flex items-center gap-3 bg-[#B45309] text-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-[#92400E] transition-all"
              >
                Explore Selected Works <ArrowRight className="w-4 h-4" />
              </button>
            </section>
          </div>
        )}

        {/* ABOUT US PAGE */}
        {currentPage === 'about' && (
          <div className="space-y-16 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-3 block">Hyderabad Headquarters</span>
                <h2 className="text-4xl lg:text-5xl font-light text-[#B45309] leading-[1.15] tracking-tight mb-6">
                  The Roots of Jyanipur.
                </h2>
                <p className="text-[#57534E] text-base lg:text-lg font-light leading-relaxed mb-6">
                  Anchored in Hyderabad, Jyanipur is a premier civil construction and luxury interior firm built on structural integrity, meticulous engineering, and high-end fit-out mastery.
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
              </div>
            </div>

            <div className="pt-12 border-t border-[#E7E5E4]">
              <div className="mb-10">
                <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Enterprise Partners</span>
                <h2 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight">Institutional Roster</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {clients.map((c, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-[#E7E5E4]">
                    <h3 className="text-xl font-normal text-[#1C1917] mb-2 tracking-tight">{c.name}</h3>
                    <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider block mb-1">{c.role}</span>
                    <p className="text-xs text-[#78716C] font-light">{c.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STORIES OF TELANGANA PAGE (REACT SIMPLE MAPS ACCURATE TOPOLOGY) */}
        {currentPage === 'stories' && (
          <div className="py-4 space-y-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
              <div>
                <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Core Stronghold</span>
                <h2 className="text-4xl lg:text-5xl font-light text-[#292524] tracking-tight">Stories of Telangana</h2>
              </div>
              <p className="text-sm text-[#78716C] max-w-md font-light">
                Centrally built in Hyderabad, delivering landmark infrastructure and high-end fit-outs across Telangana.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
              
              {/* REAL TOPOLOGY MAP USING REACT-SIMPLE-MAPS */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[420px]">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: 1000,
                    center: [78.9629, 22.5937]
                  }}
                  className="w-full h-auto max-h-[420px]"
                >
                  <Geographies geography={INDIA_GEO_JSON}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const isTelangana = geo.properties.ST_NM === "Telangana" || geo.properties.NAME_1 === "Telangana";
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={isTelangana ? "#B45309" : "#F5F5F4"}
                            stroke={isTelangana ? "#78350F" : "#E7E5E4"}
                            strokeWidth={isTelangana ? 1.5 : 0.8}
                            style={{
                              default: { outline: "none" },
                              hover: { fill: isTelangana ? "#92400E" : "#E7E5E4", outline: "none" },
                              pressed: { outline: "none" }
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>

                  {/* HYDERABAD LOCATION MARKER */}
                  <Marker coordinates={[78.4867, 17.3850]}>
                    <circle r={6} fill="#FFFFFF" stroke="#B45309" strokeWidth={2} />
                    <circle r={14} fill="none" stroke="#B45309" strokeWidth={1.5} className="animate-ping opacity-75" />
                  </Marker>
                </ComposableMap>

                <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-[#B45309] bg-amber-50 px-5 py-2.5 rounded-full border border-amber-200/60">
                  <MapPin className="w-4 h-4" />
                  <span>Hyderabad • Primary Execution Stronghold</span>
                </div>
              </div>

              {/* STORY CONTENT CARDS */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedStory('dodla')}
                    className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                      selectedStory === 'dodla' 
                        ? 'bg-[#B45309] text-white border-[#B45309] shadow-md' 
                        : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-amber-50'
                    }`}
                  >
                    Dodla Group
                  </button>
                  <button
                    onClick={() => setSelectedStory('divyasree')}
                    className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                      selectedStory === 'divyasree' 
                        ? 'bg-[#B45309] text-white border-[#B45309] shadow-md' 
                        : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-amber-50'
                    }`}
                  >
                    DivyaSree
                  </button>
                  <button
                    onClick={() => setSelectedStory('monoliths')}
                    className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                      selectedStory === 'monoliths' 
                        ? 'bg-[#B45309] text-white border-[#B45309] shadow-md' 
                        : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-amber-50'
                    }`}
                  >
                    Luxury Villas
                  </button>
                </div>

                <div className="bg-white p-8 lg:p-10 rounded-3xl border border-[#E7E5E4] shadow-sm space-y-6">
                  <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider block">
                    {telanganaStories[selectedStory].client}
                  </span>
                  <h3 className="text-3xl font-light text-[#292524] tracking-tight">
                    {telanganaStories[selectedStory].title}
                  </h3>
                  <p className="text-[#57534E] text-base font-light leading-relaxed">
                    {telanganaStories[selectedStory].desc}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-[#E7E5E4]">
                    <div>
                      <span className="text-xs text-[#78716C] uppercase tracking-wider block">Telangana Volume</span>
                      <span className="text-lg font-semibold text-[#B45309]">
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
          </div>
        )}

        {/* PROJECTS PAGE */}
        {currentPage === 'projects' && (
          <div className="space-y-12 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-8">
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
          </div>
        )}

        {/* CAPABILITIES PAGE */}
        {currentPage === 'capabilities' && (
          <div className="space-y-16 py-4">
            <div className="mb-8">
              <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Our Scope</span>
              <h2 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight">End-to-End Execution</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-[#E7E5E4]">
                <h3 className="text-xl font-normal mb-3 tracking-tight text-[#1C1917]">Civil Construction</h3>
                <p className="text-[#57534E] text-sm font-light leading-relaxed">Structural RCC framing, masonry, and civil engineering built to last generations.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E7E5E4]">
                <h3 className="text-xl font-normal mb-3 tracking-tight text-[#1C1917]">Bespoke Interiors</h3>
                <p className="text-[#57534E] text-sm font-light leading-relaxed">Factory-finished modular woodwork, marble flooring, and custom furniture fitting.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E7E5E4]">
                <h3 className="text-xl font-normal mb-3 tracking-tight text-[#1C1917]">Turnkey Management</h3>
                <p className="text-[#57534E] text-sm font-light leading-relaxed">Single point of accountability coordinating labor, vendors, and precise handovers.</p>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div className="space-y-12 py-4">
            <div className="max-w-2xl">
              <span className="text-[#B45309] font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Get In Touch</span>
              <h2 className="text-3xl lg:text-4xl font-light text-[#292524] tracking-tight mb-4">Start Your Architectural Journey</h2>
              <p className="text-[#57534E] text-sm font-light leading-relaxed">
                Connect with our principal engineering team in Kondapur, Hyderabad for site consultations, structural audits, or turnkey interior estimates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 bg-stone-50 p-8 rounded-2xl border border-[#E7E5E4] space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#B45309] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#292524]">Hyderabad Headquarters</h4>
                    <p className="text-xs text-[#57534E] font-light mt-1">302 Amrutha Lakshmi Residency, Kondapur, Hyderabad, Telangana 500084</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#B45309] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#292524]">Email Inquiries</h4>
                    <p className="text-xs text-[#57534E] font-light mt-1">accounts@jyanipur.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#B45309] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#292524]">Direct Line</h4>
                    <p className="text-xs text-[#57534E] font-light mt-1">+91 9246546742</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-[#E7E5E4] shadow-sm">
                <button 
                  onClick={() => setIsEstimateModalOpen(true)}
                  className="w-full py-5 bg-[#B45309] text-white rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:bg-[#92400E] transition-all"
                >
                  Book Executive Consultation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="relative z-10 bg-white text-[#292524] rounded-2xl p-8 lg:p-12 shadow-sm border border-[#E7E5E4] mt-24 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-12 border-b border-[#E7E5E4]">
            <div>
              <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => setCurrentPage('home')}>
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

      {/* MODALS */}
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
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}