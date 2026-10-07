import React, { useState, useEffect } from 'react';
import FooterCTA from "./FooterCTA.jsx";

// Project data
const projectsData = [
    {
        id: 0,
        cat: "brand",
        height: "tall",
        title: "Travel Agency",
        catLabel: "Brand Identity",
        desc: "Full visual identity system spanning 18 global markets, blending heritage with digital edge. Each element carefully crafted to resonate across cultures.",
        year: "2024",
        client: "Voyager Group",
        scope: "Identity · Guidelines · Print",
        img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=1600&fit=crop",
        thumb: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=1100&fit=crop",
        meta: "Adventure — 18 markets"
    },
    {
        id: 1,
        cat: "digital",
        height: "std",
        title: "Trail Tribe",
        catLabel: "Digital Experience",
        desc: "Brand ecosystem for a global hiking collective. Community-first thinking at every touchpoint, from mobile app to trail signage.",
        year: "2024",
        client: "Trail Tribe Inc.",
        scope: "Web · App · Motion",
        img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=900&fit=crop",
        thumb: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=650&fit=crop",
        meta: "Community — 80k members"
    },
    {
        id: 2,
        cat: "editorial",
        height: "ultra",
        title: "Wild Horizons",
        catLabel: "Art Direction",
        desc: "Immersive editorial campaign capturing raw landscapes and textile storytelling. Shot across 4 continents over 6 weeks.",
        year: "2023",
        client: "Wild Horizons Co.",
        scope: "Photography · Editorial · Print",
        img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=1800&fit=crop",
        thumb: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=1400&fit=crop",
        meta: "Outdoor apparel — global"
    },
    {
        id: 3,
        cat: "product",
        height: "sqr",
        title: "Apex Gear",
        catLabel: "Packaging & UI",
        desc: "Modular packaging system & retail identity across 40+ flagship stores worldwide. Bold geometry meets performance materials.",
        year: "2022",
        client: "Apex Sports Ltd.",
        scope: "Packaging · Retail · UI",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=1200&fit=crop",
        thumb: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
        meta: "Sportswear — 40+ stores"
    },
    {
        id: 4,
        cat: "brand",
        height: "std",
        title: "Solara Collective",
        catLabel: "Luxury Identity",
        desc: "Eco-luxury rebrand with carbon-neutral premium materials and refined visual language. Sustainability never looked this good.",
        year: "2024",
        client: "Solara Group",
        scope: "Identity · Packaging · Web",
        img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=900&fit=crop",
        thumb: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=650&fit=crop",
        meta: "Sustainable fashion"
    },
    {
        id: 5,
        cat: "digital",
        height: "tall",
        title: "Nexa Studio",
        catLabel: "Interactive",
        desc: "Award-winning digital brand space for a creative collective, pushing interaction boundaries. WebGL, custom shaders, seamless transitions.",
        year: "2023",
        client: "Nexa Creative",
        scope: "Web · Motion · Dev",
        img: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=1200&h=1600&fit=crop",
        thumb: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=800&h=1100&fit=crop",
        meta: "Agency ecosystem"
    },
    {
        id: 6,
        cat: "editorial",
        height: "wide",
        title: "Terra Motion",
        catLabel: "Photography",
        desc: "Striking visual editorial highlighting movement, raw nature, and the poetry of landscapes. Directed, shot, and retouched in-house.",
        year: "2024",
        client: "Terra Outdoors",
        scope: "Photography · Retouching",
        img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop",
        thumb: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop",
        meta: "Outdoor brand — narrative"
    },
    {
        id: 7,
        cat: "product",
        height: "sqr",
        title: "Volta Systems",
        catLabel: "Product Design",
        desc: "End-to-end fintech product design system, from zero to Series B in 14 months. Every interaction mapped to user trust.",
        year: "2025",
        client: "Volta Financial",
        scope: "UX · UI · Design System",
        img: "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        meta: "Fintech — Series B"
    }
];

// Filter options
const filterOptions = [
    { id: "all", label: "All" },
    { id: "brand", label: "Branding" },
    { id: "digital", label: "Web" },
    { id: "editorial", label: "Photo" },
    { id: "product", label: "UI Design" }
];

// Stats data
const statsData = [
    { number: "148+", label: "Projects", suffix: "Delivered globally" },
    { number: "62", label: "Clients", suffix: "Across 20 countries" },
    { number: "12", label: "Awards", suffix: "Industry recognition" },
    { number: "8+", label: "Years", suffix: "Relentless craft" }
];

// Marquee items
const marqueeItems = [
    "Brand Identity", "Motion Design", "Web Experience", "Campaign Strategy", "Editorial Direction", "Visual Systems"
];

// Ticker items
const tickerItems = ["DESIGN", "BRAND", "DIGITAL", "CRAFT"];

// Height classes for masonry cards
const heightClasses = {
    tall: "aspect-[3/4.4]",
    std: "aspect-[4/3.2]",
    wide: "aspect-[4/5]",
    sqr: "aspect-[5/5.5]",
    ultra: "aspect-[2/3.8]"
};

// Card Component
const Card = ({ project, index, onOpen, formatNumber }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    const handleCardClick = (e) => {
        if (e.target.closest('.zoom-btn') || e.target.closest('.case-btn')) return;
        onOpen(index);
    };

    return (
        <div
            className="group relative break-inside-avoid mb-[3px] overflow-hidden transition-shadow duration-500 border border-white/5 hover:shadow-[0_28px_70px_rgba(0,0,0,0.65),0_0_0_1.5px_rgba(245,117,0,0.6)] cursor-pointer"
            onMouseEnter={() => !isTouch && setIsHovered(true)}
            onMouseLeave={() => !isTouch && setIsHovered(false)}
            onClick={handleCardClick}
        >
            <div className={`relative w-full overflow-hidden ${heightClasses[project.height]}`}>
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-900 filter brightness-[0.52] saturate-[0.75] group-hover:scale-105 group-hover:brightness-[0.3] group-hover:saturate-[0.65]"
                    style={{ backgroundImage: `url(${project.thumb})` }}
                />

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/15 to-black/65 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent z-30" />

                {/* Index number */}
                <div className="absolute top-3.5 right-4 font-oswald  text-[4.5rem] md:text-[10rem] leading-none text-white/5 z-20 transition-all duration-400 group-hover:text-[rgba(245,117,0,0.1)] group-hover:scale-105 group-hover:-translate-x-1 group-hover:translate-y-1">
                    {formatNumber(index + 1)}
                </div>

                {/* Category pill */}
                <div className="absolute top-4 left-4 z-40 flex items-center gap-1.5 bg-black/52 backdrop-blur-[10px] border border-white/10 py-1 px-3 rounded-full transition-all duration-250 group-hover:border-[rgba(245,117,0,0.45)]">
                    <div className="w-1.5 h-1.5 bg-[#F57500] rounded-full flex-shrink-0" />
                    <span className="text-[0.53rem] tracking-[2.5px] uppercase font-bold text-white/80 group-hover:text-[#ff9533]">{project.catLabel}</span>
                </div>

                {/* Zoom button */}
                <button
                    className={`zoom-btn absolute top-3.5 right-3.5 z-50 w-9 h-9 bg-black/60 backdrop-blur-[10px] border border-white/12 rounded-full flex items-center justify-center transition-all duration-250 pointer-events-auto ${isTouch ? 'opacity-100 scale-100' : 'opacity-0 scale-90 -translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0'}`}
                    onClick={(e) => { e.stopPropagation(); onOpen(index); }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-white">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                </button>

                {/* Hover accent lines */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#F57500] via-[#ff9533] to-transparent scale-x-0 origin-left transition-transform duration-600 group-hover:scale-x-100 z-40" />
                <div className="absolute top-0 bottom-0 left-0 w-[2.5px] bg-gradient-to-b from-[#F57500] to-transparent scale-y-0 origin-top transition-transform duration-600 delay-75 group-hover:scale-y-100 z-40" />
                <div className="absolute bottom-0 right-0 w-9 h-9 border-b-[2.5px] border-r-[2.5px] border-[#F57500] opacity-0 transition-opacity duration-350 delay-200 group-hover:opacity-100 z-40" />

                {/* Default label */}
                <div className={`absolute bottom-0 left-0 right-0 p-[26px_22px_28px] z-50 transition-all duration-400 ${isHovered && !isTouch ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <div className="font-oswald uppercase text-[2rem] leading-[1.02] tracking-[-0.3px] text-white mb-1.5">{project.title}</div>
                    <div className="font-cormorant italic text-[0.8rem] text-white/60">{project.meta}</div>
                </div>

                {/* Hover panel */}
                <div className={`absolute inset-0 z-50 flex flex-col justify-end p-[26px_22px_26px] transition-opacity duration-400 pointer-events-none ${isHovered && !isTouch ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="font-anton text-[0.68rem] tracking-[3px] text-[#F57500] mb-1.5 -translate-x-2 opacity-0 transition-all duration-400 delay-125 group-hover:translate-x-0 group-hover:opacity-100">— {formatNumber(index + 1)}</div>
                    <div className="text-[0.56rem] tracking-[3px] uppercase text-white/80 mb-0.5 -translate-x-2 opacity-0 transition-all duration-400 delay-175 group-hover:translate-x-0 group-hover:opacity-100">{project.catLabel}</div>
                    <h3 className="font-oswald uppercase text-[1.7rem] md:text-[2.4rem] leading-[1] text-white mb-3 -translate-x-3 opacity-0 transition-all duration-450 delay-225 group-hover:translate-x-0 group-hover:opacity-100">{project.title}</h3>
                    <div className="h-px bg-white/20 w-0 mb-3 transition-all duration-450 delay-300 group-hover:w-12" />
                    <p className="font-cormorant italic text-[0.88rem] text-white/80 leading-relaxed max-w-[270px] mb-5 -translate-x-2 opacity-0 transition-all duration-450 delay-375 group-hover:translate-x-0 group-hover:opacity-100">{project.desc}</p>
                    <div className="flex items-center justify-between -translate-x-2 opacity-0 transition-all duration-450 delay-425 pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100">
                        <button
                            className="case-btn flex items-center gap-2 bg-[#F57500] text-[#060606] font-syne text-[0.56rem] tracking-[2.5px] uppercase font-extrabold py-2 px-4 transition-all duration-200 hover:bg-[#ff9533]"
                            style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)' }}
                            onClick={(e) => { e.stopPropagation(); onOpen(index); }}
                        >
                            Case Study <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </button>
                        <span className="font-cormorant italic text-[0.8rem] text-white/60">{project.year}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Lightbox Component
const Lightbox = ({ isOpen, currentIndex, projects, onClose, onPrev, onNext }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const project = projects[currentIndex];

    useEffect(() => {
        if (isOpen && project) {
            setImageLoaded(false);
        }
    }, [currentIndex, isOpen, project]);

    if (!isOpen || !project) return null;

    const num = String(currentIndex + 1).padStart(2, '0');

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10 opacity-100 pointer-events-auto transition-opacity duration-400">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[rgba(4,4,4,0.92)] backdrop-blur-[20px] saturate-[1.2]"
                onClick={onClose}
            />

            {/* Close button */}
            <button
                className="fixed top-4 right-4 md:top-6 md:right-6 z-[100] w-10 h-10 md:w-12 md:h-12 bg-[rgba(20,20,20,0.9)] border border-white/10 flex items-center justify-center transition-all duration-200 hover:bg-[#F57500] hover:scale-105     absolute -top-10 -right-10 w-10 h-10 rounded-full bg-[#F57500] border-none flex items-center justify-center transition-transform duration-250 hover:scale-110 hover:rotate-90 z-10"
                // style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
                onClick={onClose}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 md:w-[18px] md:h-[18px] text-white group-hover:text-[#060606]">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Content */}
            <div className="relative z-50 flex flex-col md:flex-row gap-0 md:gap-12 w-full max-w-[1100px] bg-[#0e0e0e] md:bg-transparent rounded-t-xl md:rounded-none transform transition-transform duration-450 overflow-hidden md:overflow-visible max-h-[96dvh] md:max-h-none">
                {/* Drag handle for mobile */}
                <div className="md:hidden w-10 h-1 bg-white/20 rounded-full mx-auto " />

                {/* Image area */}
                <div className="relative flex-1 min-w-0 w-full md:flex-[1.1]">
                    <div className="relative w-full overflow-hidden border-0 md:border  border-white/10">
                        <div className="hidden md:block absolute top-0 left-0 w-[2.5px] h-full bg-gradient-to-b from-[#F57500] to-transparent z-20 pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#F57500] to-[#ff9533] z-20 pointer-events-none" />

                        <img
                            src={project.img}
                            alt={project.title}
                            className="w-full max-h-[58vw] md:max-h-[78vh] object-cover transition-transform duration-600  hover:scale-105"
                            style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.4s' }}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>

                    {/* Navigation arrows */}
                    <button
                        className="absolute top-1/2 left-2 md:left-3 -translate-y-1/2 w-12 h-12 rounded-full bg-white/7 border border-white/15 flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(245,117,0,0.25)] hover:border-[#F57500] hover:scale-108 z-10"
                        onClick={onPrev}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-white">
                            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>
                    <button
                        className="absolute top-1/2 right-2 md:right-3 -translate-y-1/2 w-12 h-12 rounded-full bg-white/7 border border-white/15 flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(245,117,0,0.25)] hover:border-[#F57500] hover:scale-108 z-10"
                        onClick={onNext}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-white">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Dot counter */}
            <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        className={`transition-all duration-250 rounded-full ${
                            idx === currentIndex
                                ? 'bg-[#F57500] w-5 h-1.5 rounded-[3px] border-[#F57500]'
                                : 'bg-white/20 w-1.5 h-1.5'
                        }`}
                        onClick={() => {
                            if (idx < currentIndex) onPrev(currentIndex - idx);
                            else if (idx > currentIndex) onNext(idx - currentIndex);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};


const Project = () => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(projectsData.length);
    const [isMounted, setIsMounted] = useState(false);

    // Filter projects
    const filteredProjects = projectsData.filter(p => activeFilter === "all" || p.cat === activeFilter);

    // Update visible count
    useEffect(() => {
        setVisibleCount(filteredProjects.length);
    }, [filteredProjects]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Handle filter change
    const handleFilterChange = (filterId) => {
        setActiveFilter(filterId);
    };

    // Get the current project index in filtered list for lightbox
    const getFilteredIndex = (originalId) => {
        return filteredProjects.findIndex(p => p.id === originalId);
    };

    // Lightbox handlers
    const openLightbox = (filteredIndex) => {
        setCurrentLightboxIndex(filteredIndex);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = '';
    };

    const prevProject = () => {
        setCurrentLightboxIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    };

    const nextProject = () => {
        setCurrentLightboxIndex((prev) => (prev + 1) % filteredProjects.length);
    };

    // Format number with leading zero
    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevProject();
            if (e.key === 'ArrowRight') nextProject();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, filteredProjects.length]);

    // Restore body overflow when lightbox closes
    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="bg-[#060606] min-h-screen overflow-x-hidden font-syne font-barlow text-[#f2f2f0]">


            {/* Hero Section */}
            <div className="relative min-h-[80vh] md:min-h-screen flex flex-col justify-end overflow-hidden px-5 md:px-[4.5rem] pb-12 md:pb-[72px]">

                {/* Corner decor */}
                <div className="absolute z-20 bottom-[52px] right-[52px] w-[100px] h-[100px] border-r border-white/22 border-b border-white/22 opacity-0 animate-fadeIn [animation-delay:1.8s] pointer-events-none hidden md:block" />

                {/* Index label */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 rotate-90 font-barlow-condensed text-[9px] tracking-[8px] uppercase text-white/35 whitespace-nowrap opacity-0 animate-fadeIn [animation-delay:2s] hidden md:block">
                    Case Study · 01 / 06
                </div>

                {/* Scroll indicator */}
                <div className="absolute right-12 bottom-[10.5rem] flex flex-col items-center gap-2 opacity-0 animate-fadeIn [animation-delay:2.2s] hidden md:flex">
                    <div className="w-px h-[50px] bg-white relative overflow-hidden">
                        <div className="absolute w-full h-[60%] bg-[#F57500] animate-scrollThumb" />
                    </div>
                    <span className="font-barlow-condensed text-[8px] tracking-[6px] uppercase text-white writing-vertical rotate-180">Scroll</span>
                </div>

                {/* Hero background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-full md:w-[48%] h-full overflow-hidden opacity-40 ">
                        <img
                            className="w-full h-full object-cover object-center brightness-50 saturate-70 scale-105 animate-float"
                            src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=900&fit=crop"
                            alt="Hero background"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-[rgba(6,6,6,0.65)] to-transparent md:bg-gradient-to-r z-10" />
                    </div>
                    <div className="absolute top-0 right-[48%] bottom-0 w-[160px] bg-gradient-to-r from-[#060606] to-transparent z-10 hidden md:block" />
                </div>

                {/* Grain overlay */}
                {/*<div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-noise" />*/}



                {/* Ticker */}
                <div className="absolute top-[40px] md:top-[50px] left-0 right-0 overflow-hidden z-10 border-y border-white/5 py-2 md:py-2.5">
                    <div className="flex whitespace-nowrap animate-ticker opacity-10">
                        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                            <span key={i} className="font-oswald uppercase text-[5rem] md:text-[10rem] leading-none tracking-[-4px] text-white px-5 md:px-10">{item}</span>
                        ))}
                    </div>
                </div>

                {/* Hero content */}
                <div className="relative z-20 max-w-full md:max-w-full">
                    <div className={`flex items-center gap-3.5 mb-7 ${isMounted ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                        <div className="w-[30px] h-[1.5px] bg-[#F57500]" />
                        <span className="text-[0.58rem] tracking-[5px] uppercase text-[#F57500] font-extrabold">Selected Works</span>
                        <span className="ml-1.5 bg-[rgba(245,117,0,0.12)] border border-[rgba(245,117,0,0.3)] text-[0.52rem] tracking-[2px] text-[#F57500] py-0.5 px-2.5 rounded-full hidden md:inline">2025</span>
                    </div>
                    <h1 className={`font-oswald uppercase text-[clamp(3.9rem,13vw,10.5rem)] leading-[0.87] tracking-[-3px] text-white mb-8 ${isMounted ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                        OUR <span className="inline-block [-webkit-text-stroke:1.8px_#F57500] text-transparent skew-x-[-3deg]"> FINEST</span><br /><span className="text-[#F57500]">WORK</span>
                    </h1>
                    <div className={`flex flex-col md:flex-row items-start md:items-end pt-2 border-t border-white/10 flex-wrap gap-5 ${isMounted ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: '0.75s', animationFillMode: 'forwards' }}>
                        <p className="font-cormorant italic text-[0.95rem] md:text-[1.12rem] text-white/60 leading-relaxed max-w-full md:max-w-[340px]">
                            Bold identities that echo across mediums — crafted with <em className="not-italic text-white/80">intent</em>, built for <em className="not-italic text-white/80">distinction</em>.
                        </p>
                    </div>
                </div>


            </div>
            <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-10" />

            {/* Filter Bar */}
            <div className="sticky top-[56px] md:top-[68px] z-[50] flex items-center gap-1.5 px-3 md:px-[4.5rem] h-[50px] md:h-14   border-b border-white/10 overflow-x-auto scrollbar-hide">
                {filterOptions.map(opt => (
                    <button
                        key={opt.id}
                        className={`filter-btn px-3 md:px-[18px] py-1 md:py-1.5 text-[0.54rem] md:text-[0.62rem] tracking-[2px] uppercase font-bold transition-all duration-200 rounded-full whitespace-nowrap flex-shrink-0 font-syne ${
                            activeFilter === opt.id
                                ? 'text-white border border-[#F57500] bg-[rgba(245,117,0,0.12)]'
                                : 'text-white/60 border border-transparent hover:text-white hover:border-[rgba(245,117,0,0.3)]'
                        }`}
                        onClick={() => handleFilterChange(opt.id)}
                    >
                        {opt.label}
                    </button>
                ))}
                <span className="ml-auto text-[0.58rem] md:text-[0.62rem] tracking-[1px] text-white/60 bg-white/5 py-1 px-3.5 rounded-full whitespace-nowrap flex-shrink-0">
          {visibleCount} project{visibleCount !== 1 ? 's' : ''}
        </span>
            </div>

            {/* Masonry Grid */}
            <div className="px-3 md:px-[4.5rem] py-6 md:py-10 relative z-10">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-[3px]">
                    {filteredProjects.map((project, idx) => (
                        <Card
                            key={project.id}
                            project={project}
                            index={idx}
                            onOpen={openLightbox}
                            formatNumber={formatNumber}
                        />
                    ))}
                </div>
            </div>

            {/* Marquee */}
            <div className="border-y border-white/5 overflow-hidden py-4">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                        <div key={i} className="inline-flex items-center gap-[18px] px-4 md:px-8">
                            <span className="font-anton text-[0.7rem] md:text-[0.76rem] tracking-[3px] text-white/20 uppercase">{item}</span>
                            <span className="w-1 h-1 bg-[#F57500] rounded-full flex-shrink-0" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                isOpen={lightboxOpen}
                currentIndex={currentLightboxIndex}
                projects={filteredProjects}
                onClose={closeLightbox}
                onPrev={prevProject}
                onNext={nextProject}
            />

            {/* Global Styles for animations and custom CSS */}
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Oswald:wght@500;700&family=Roboto:wght@500&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

                .font-oswald {
                    font-family: 'Oswald', sans-serif;
                }

                /* Fixed working noise texture */
                .bg-noise {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    background-repeat: repeat;
                    background-size: 200px;
                }

                /* Custom scrollbar for info panel */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 3px;
                }

                .overflow-y-auto::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.05);
                    border-radius: 10px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #F57500;
                    border-radius: 10px;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: #ff9533;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeUp {
                    animation: fadeUp 0.7s cubic-bezier(0.77, 0, 0.18, 1) forwards;
                    opacity: 0;
                }
                @keyframes tickerScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-ticker {
                    animation: tickerScroll 20s linear infinite;
                }
                @keyframes marqueeScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marqueeScroll 28s linear infinite;
                }
                @keyframes scrollPulse {
                    0%, 100% { opacity: 0.4; transform: scaleY(1); }
                    50% { opacity: 1; transform: scaleY(0.7); }
                }
                .animate-scrollPulse {
                    animation: scrollPulse 2s ease-in-out infinite;
                }
                @keyframes heroImgFloat {
                    from { transform: scale(1.05) translateY(0); }
                    to { transform: scale(1.05) translateY(-12px); }
                }
                .animate-float {
                    animation: heroImgFloat 8s ease-in-out infinite alternate;
                }
                .writing-vertical {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-fadeUp, .animate-ticker, .animate-marquee, .animate-scrollPulse, .animate-float {
                        animation-duration: 0.01ms !important;
                    }
                }
                @media (hover: none) and (pointer: coarse) {
                    .card .zoom-btn {
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease forwards;
                }

                @keyframes scrollThumb {
                    0% {
                        transform: translateY(-100%);
                    }
                    100% {
                        transform: translateY(100%);
                    }
                }

                .animate-scrollThumb {
                    animation: scrollThumb 2s ease-in-out infinite;
                }

                .font-barlow-condensed {
                    font-family: 'Barlow Condensed', sans-serif;
                }

                /* Fix for writing vertical mode */
                .writing-vertical {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }

                /* Ensure the elements are visible on md screens and above */
                @media (min-width: 768px) {
                    .md\\\\:block {
                        display: block;
                    }

                    .md\\\\:flex {
                        display: flex;
                    }
                }
            `}</style>
            <FooterCTA/>
        </div>
    );
};

export default Project;