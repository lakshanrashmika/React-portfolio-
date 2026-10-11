import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

// Marquee items
const marqueeItems = [
    "Software Engineering",
    "Technical Leadership",
    "Project Management",
    "UI/UX Design",
    "Web Design",
    "Bug Fixing",
    "Quality Assurance",
    "Stakeholder Management",
];

// Ticker items
const tickerItems = ["DESIGN", "BUILD", "LEAD", "DELIVER"];

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATE DATA
// ─────────────────────────────────────────────────────────────────────────────
const certificateData = [
    // {
    //     id: 1,
    //     index: "01.",
    //     title: "Master of Science in Software Engineering",
    //     university: "Kingston University - UK",
    //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Kingston_University_London_logo.svg/400px-Kingston_University_London_logo.svg.png",
    //     logoBg: "bg-white",
    //     description: "After completing my Bachelor's degree at London Metropolitan University, I immediately pursued my Master's in Software Engineering at Kingston University (January 2023 - September 2024) to ensure continuous academic progression. This allowed me to build on my knowledge without gaps, further strengthening my expertise in the field. I have now successfully completed the program and hold an MSc degree, which complements my 7+ years of industry experience.",
    // },
    {
        id: 1,
        index: "01.",
        title: "Bachelor of Engineering (Hons) In Software Engineering",
        university: "Metropolitan University - UK",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/London_Metropolitan_University_logo.svg/400px-London_Metropolitan_University_logo.svg.png",
        logoBg: "bg-black",
        description: "I need to change my position in this industry, so I need to complete my degree first. After I start my degree at a metropolitan university in London, it's one year program. I started that course in 2021 September. In 2022 September I completed my degree with second-class upper. Then after that, I joined \"Hype invention (pvt) (LTD)\" as a \"Software Engineer\".",
    },
    {
        id: 2,
        index: "02.",
        title: "Diploma In Software Engineering",
        university: "IJSE (Institute of Java and Software Engineering)",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/IJSE_Logo.png/400px-IJSE_Logo.png",
        logoBg: "bg-white",
        description: "I am completing my graduate diploma in \"IJSE\" in 2018. And I have another certificate from IJSE named \"Advanced Business Java Developer\". It was a two-year program for the diploma level. After that I got that certificate from them in February 2018 and I joined my first job in \"DMS Software Engineering pvt (LTD)\" as a \"trainee Software Engineer\".",
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Certificates = () => {
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [dragDelta, setDragDelta] = useState(0);

    const gridRef = useRef(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // ── Detect mobile/tablet (slider mode) vs desktop (grid mode) ────────
    useEffect(() => {
        const checkViewport = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
    }, []);

    // ── Reveal on scroll ─────────────────────────────────────────────────
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsRevealed(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
        );
        if (gridRef.current) observer.observe(gridRef.current);
        return () => observer.disconnect();
    }, []);

    const totalSlides = certificateData.length;

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    const goToSlide = useCallback((i) => {
        setActiveIndex(i);
    }, []);

    // ── Drag handlers ────────────────────────────────────────────────────
    const handleDragStart = (clientX) => {
        if (!isMobile) return;
        setIsDragging(true);
        setDragStart(clientX);
        setDragDelta(0);
    };
    const handleDragMove = (clientX) => {
        if (!isDragging || !isMobile) return;
        setDragDelta(clientX - dragStart);
    };
    const handleDragEnd = () => {
        if (!isDragging || !isMobile) return;
        if (dragDelta < -60) nextSlide();
        else if (dragDelta > 60) prevSlide();
        setIsDragging(false);
        setDragDelta(0);
    };

    // Global mouseup so dragging doesn't get stuck
    useEffect(() => {
        if (!isDragging) return;
        const up = () => handleDragEnd();
        window.addEventListener('mouseup', up);
        return () => window.removeEventListener('mouseup', up);
    }, [isDragging, dragDelta]);

    // Slide transform values
    const translatePercent = -activeIndex * 100;
    const dragOffsetPercent = isDragging && sliderRef.current
        ? (dragDelta / sliderRef.current.offsetWidth) * 100
        : 0;

    // ── Reusable card markup ─────────────────────────────────────────────
    const CertificateCard = ({ cert, index }) => (
        <div
            className={`relative transition-all duration-700 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 120}ms` }}
        >
            {/* Wrapper with padding-top so the overlapping logo circle has room */}
            <div className="relative pt-8 md:pt-10">

                {/* Logo Circle — positioned outside card, NOT clipped */}
                <div
                    className={`absolute top-0 right-4 md:right-6 z-30 w-[72px] h-[72px] md:w-[86px] md:h-[86px] rounded-full flex items-center justify-center border-2 border-white/15 shadow-2xl ${cert.logoBg}`}
                >
                    <img
                        src={cert.logo}
                        alt={`${cert.university} logo`}
                        className="w-[68%] h-[68%] object-contain"
                        onError={(e) => { e.target.style.display = 'none'; }}
                        draggable={false}
                    />
                </div>

                {/* Big background number */}
                <div className="absolute -bottom-8 -left-4 text-[6rem] md:text-[7rem] font-oswald font-bold text-white/[0.03] select-none pointer-events-none z-0 leading-none">
                    {cert.index}
                </div>

                {/* Card */}
                <div className="relative z-10 bg-white/[0.02] border border-white/[0.06] p-6 md:p-8 h-full flex flex-col backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">

                    {/* Leaf decor */}
                    <div className="absolute top-6 left-6 text-[#F57500] opacity-60">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z" />
                        </svg>
                    </div>

                    {/* Title + University */}
                    <div className="mt-10 mb-6 pr-20 md:pr-24">
                        <h3 className="font-oswald uppercase text-[1rem] md:text-[1.05rem] leading-snug text-white/90 tracking-wide mb-2">
                            {cert.title}
                        </h3>
                        <p className="font-cormorant italic text-[0.85rem] md:text-[0.9rem] text-white/50">
                            {cert.university}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="font-barlow text-[0.85rem] md:text-[0.9rem] text-white/60 leading-relaxed flex-grow mb-8">
                        {cert.description}
                    </p>

                    {/* Button */}
                    <button
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        className="self-start bg-[#F5B041] text-black font-syne text-[0.65rem] font-extrabold tracking-[2px] uppercase py-3 px-6 transition-all duration-200 hover:bg-[#ffc46b] hover:scale-105 active:scale-95"
                        style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)' }}
                    >
                        Check it Out
                    </button>
                </div>
            </div>

            {/* Dashed line + arrow */}
            <div className="relative z-10 flex items-center justify-between mt-4 px-2 opacity-30 transition-opacity duration-300 hover:opacity-60">
                <div className="flex-1 h-px border-b border-dashed border-white/30 mr-4"></div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="13 17 18 12 13 7" />
                    <polyline points="6 17 11 12 6 7" />
                </svg>
            </div>
        </div>
    );

    return (
        <div id="certificates" className="bg-[#060606] min-h-screen overflow-x-hidden font-syne font-barlow text-[#f2f2f0]">

            {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
            <div className="relative min-h-[80vh] md:min-h-screen flex flex-col justify-end overflow-hidden px-5 md:px-[4.5rem] pb-12 md:pb-[72px]">

                <div className="absolute z-20 bottom-[52px] right-[52px] w-[100px] h-[100px] border-r border-white/22 border-b border-white/22 opacity-0 animate-fadeIn [animation-delay:1.8s] pointer-events-none hidden md:block" />

                <div className="absolute right-16 top-1/2 -translate-y-1/2 rotate-90 font-barlow-condensed text-[9px] tracking-[8px] uppercase text-white/35 whitespace-nowrap opacity-0 animate-fadeIn [animation-delay:2s] hidden md:block">
                    Services · 08 / 08
                </div>

                <div className="absolute right-12 bottom-[10.5rem] flex-col items-center gap-2 opacity-0 animate-fadeIn [animation-delay:2.2s] hidden md:flex">
                    <div className="w-px h-[50px] bg-white relative overflow-hidden">
                        <div className="absolute w-full h-[60%] bg-[#F57500] animate-scrollThumb" />
                    </div>
                    <span className="font-barlow-condensed text-[8px] tracking-[6px] uppercase text-white writing-vertical rotate-180">Scroll</span>
                </div>

                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-full md:w-[48%] h-full overflow-hidden opacity-40">
                        <img
                            className="w-full h-full object-cover object-center brightness-50 saturate-70 scale-105 animate-float"
                            src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Hero background"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-[rgba(6,6,6,0.65)] to-transparent md:bg-gradient-to-r z-10" />
                    </div>
                    <div className="absolute top-0 right-[48%] bottom-0 w-[160px] bg-gradient-to-r from-[#060606] to-transparent z-10 hidden md:block" />
                </div>

                <div className="absolute top-[40px] md:top-[50px] left-0 right-0 overflow-hidden z-10 border-y border-white/5 py-2 md:py-2.5">
                    <div className="flex whitespace-nowrap animate-ticker opacity-10">
                        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                            <span key={i} className="font-oswald uppercase text-[5rem] md:text-[10rem] leading-none tracking-[-4px] text-white px-5 md:px-10">{item}</span>
                        ))}
                    </div>
                </div>

                <div className="relative z-20 max-w-full md:max-w-full">
                    <div className={`flex items-center gap-3.5 mb-7 ${isMounted ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                        <div className="w-[30px] h-[1.5px] bg-[#F57500]" />
                        <span className="text-[0.58rem] tracking-[5px] uppercase text-[#F57500] font-extrabold">What I Do</span>
                        <span className="ml-1.5 bg-[rgba(245,117,0,0.12)] border border-[rgba(245,117,0,0.3)] text-[0.52rem] tracking-[2px] text-[#F57500] py-0.5 px-2.5 rounded-full hidden md:inline">2025</span>
                    </div>
                    <h1 className={`font-oswald uppercase text-[clamp(3.9rem,13vw,10.5rem)] leading-[0.87] tracking-[-3px] text-white mb-8 ${isMounted ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                        MY <span className="inline-block [-webkit-text-stroke:1.8px_#F57500] text-transparent skew-x-[-3deg]"> SERVICES</span><br /><span className="text-[#F57500]">EXPERTISE</span>
                    </h1>
                    <div className={`flex flex-col md:flex-row items-start md:items-end pt-2 border-t border-white/10 flex-wrap gap-5 ${isMounted ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: '0.75s', animationFillMode: 'forwards' }}>
                        <p className="font-cormorant italic text-[0.95rem] md:text-[1.12rem] text-white/60 leading-relaxed max-w-full md:max-w-[420px]">
                            From software engineering and technical leadership to project management and UI/UX design — I deliver end-to-end solutions with <em className="not-italic text-white/80">precision</em> and <em className="not-italic text-white/80">purpose</em>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-10" />

            {/* ─── MARQUEE ──────────────────────────────────────────────────── */}
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

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* ─── CERTIFICATES SECTION ────────────────────────────────────── */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <div ref={gridRef} className="relative z-10 px-5 md:px-[4.5rem] py-24 md:py-32 overflow-hidden">

                {/* Decorative background text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-oswald uppercase text-[18vw] leading-none text-white/[0.015] select-none pointer-events-none whitespace-nowrap z-0">
                    Education
                </div>

                <div className="max-w-[1300px] mx-auto relative z-10">

                    {/* Header + Nav */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-24">
                        <div>
                            <div className="flex items-center gap-3.5 mb-5">
                                <div className="w-[30px] h-[1.5px] bg-[#F57500]" />
                                <span className="text-[0.58rem] tracking-[5px] uppercase text-[#F57500] font-extrabold">Education & Certifications</span>
                            </div>
                            <h2 className="font-oswald uppercase text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-1px] text-white">
                                Academic <span className="text-[#F57500]">Journey</span>
                            </h2>
                        </div>

                        {/* Nav arrows + counter — only visible on mobile/tablet */}
                        {isMobile && (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={prevSlide}
                                    aria-label="Previous certificate"
                                    className="group w-12 h-12 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-[#F57500] hover:bg-[#F57500]/5 transition-all duration-300 active:scale-95"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="19" y1="12" x2="5" y2="12" />
                                        <polyline points="12 19 5 12 12 5" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    aria-label="Next certificate"
                                    className="group w-12 h-12 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-[#F57500] hover:bg-[#F57500]/5 transition-all duration-300 active:scale-95"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </button>
                                <div className="ml-2 font-oswald text-[0.9rem] text-white/40 tracking-wider">
                                    <span className="text-[#F57500]">{String(activeIndex + 1).padStart(2, '0')}</span>
                                    <span className="mx-1">/</span>
                                    <span>{String(totalSlides).padStart(2, '0')}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ─── DESKTOP: GRID (≥1024px) ────────────────────────── */}
                    {!isMobile && (
                        <div className="grid grid-cols-3 gap-6 lg:gap-8">
                            {certificateData.map((cert, index) => (
                                <CertificateCard key={cert.id} cert={cert} index={index} />
                            ))}
                        </div>
                    )}

                    {/* ─── MOBILE / TABLET: SLIDER (<1024px) ──────────────── */}
                    {isMobile && (
                        <>
                            <div
                                ref={sliderRef}
                                className={`relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                                onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX); }}
                                onMouseMove={(e) => handleDragMove(e.clientX)}
                                onMouseUp={handleDragEnd}
                                onMouseLeave={handleDragEnd}
                                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                                onTouchEnd={handleDragEnd}
                            >
                                {/* NOTE: We do NOT use overflow-hidden here so the logo circle stays visible. */}
                                {/* We clip individual slides instead via padding + inner wrapper. */}
                                <div
                                    className="flex"
                                    style={{
                                        transform: `translateX(calc(${translatePercent}% + ${dragOffsetPercent}%))`,
                                        transition: isDragging ? 'none' : 'transform 0.65s cubic-bezier(0.77, 0, 0.18, 1)',
                                    }}
                                >
                                    {certificateData.map((cert, index) => (
                                        <div
                                            key={cert.id}
                                            className="flex-shrink-0 px-3 md:px-6 select-none"
                                            style={{ width: '100%' }}
                                        >
                                            <CertificateCard cert={cert} index={index} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dots */}
                            <div className="flex items-center justify-center gap-3 mt-10">
                                {certificateData.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToSlide(i)}
                                        aria-label={`Go to slide ${i + 1}`}
                                        className="relative h-[3px] transition-all duration-500"
                                        style={{ width: i === activeIndex ? '48px' : '24px' }}
                                    >
                                        <span className={`absolute inset-0 transition-all duration-500 ${i === activeIndex ? 'bg-[#F57500]' : 'bg-white/20'}`} />
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                </div>
            </div>

            {/* ─── CTA SECTION ──────────────────────────────────────────────── */}
            <div className="relative z-10 px-3 md:px-[4.5rem] py-20 md:py-28">
                <div className="max-w-[800px] mx-auto text-center flex flex-col items-center gap-6">
                    <div className="flex items-center gap-3.5">
                        <div className="w-[30px] h-[1.5px] bg-[#F57500]" />
                        <span className="text-[0.58rem] tracking-[5px] uppercase text-[#F57500] font-extrabold">Let's Work Together</span>
                        <div className="w-[30px] h-[1.5px] bg-[#F57500]" />
                    </div>
                    <h2 className="font-oswald uppercase text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-1px] text-white">
                        Have a Project <span className="text-[#F57500]">in Mind?</span>
                    </h2>
                    <p className="font-cormorant italic text-[1rem] md:text-[1.12rem] text-white/60 leading-relaxed max-w-[520px]">
                        Whether it's a full software build, a design refresh, or a critical bug fix — I bring the technical depth and delivery focus to make it happen.
                    </p>
                    <button
                        onClick={() => navigate('/contact')}
                        className="mt-4 inline-flex items-center gap-3.5 bg-[#F57500] text-[#060606] font-syne text-[0.62rem] tracking-[3px] uppercase font-extrabold py-4 px-8 transition-all duration-200 hover:bg-[#ff9533] hover:scale-105"
                        style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)' }}
                    >
                        Start a Project
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ─── STYLES ───────────────────────────────────────────────────── */}
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Oswald:wght@500;700&family=Roboto:wght@500&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

                .font-oswald { font-family: 'Oswald', sans-serif; }
                .font-cormorant { font-family: 'Cormorant Garamond', serif; }

                .bg-noise {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    background-repeat: repeat;
                    background-size: 200px;
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
                .animate-ticker { animation: tickerScroll 20s linear infinite; }
                @keyframes marqueeScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-marquee { animation: marqueeScroll 28s linear infinite; }
                @keyframes scrollThumb {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scrollThumb { animation: scrollThumb 2s ease-in-out infinite; }
                @keyframes heroImgFloat {
                    from { transform: scale(1.05) translateY(0); }
                    to { transform: scale(1.05) translateY(-12px); }
                }
                .animate-float { animation: heroImgFloat 8s ease-in-out infinite alternate; }
                .writing-vertical { writing-mode: vertical-rl; text-orientation: mixed; }
                .rotate-180 { transform: rotate(180deg); }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .font-barlow-condensed { font-family: 'Barlow Condensed', sans-serif; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fadeIn { animation: fadeIn 0.6s ease forwards; }

                @media (prefers-reduced-motion: reduce) {
                    .animate-fadeUp, .animate-ticker, .animate-marquee, .animate-scrollThumb, .animate-float {
                        animation-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Certificates;