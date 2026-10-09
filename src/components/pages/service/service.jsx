import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE DATA (merged from both files)
// ─────────────────────────────────────────────────────────────────────────────
const servicesData = [
    {
        id: 0,
        number: "01",
        title: "Software Engineering",
        tagline: "Design, develop, test, deliver.",
        tags: ["React", "Node", "APIs"],
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
        description:
            "My professional background is in software engineering, and I have experience in designing, developing, testing, maintaining, and delivering software solutions. I have worked across the entire software development life cycle—from understanding requirements and developing solutions to testing, deployment, and continuous improvement.",
        meta: "2 Years Software Engineering Experience",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        features: [
            "Full SDLC Ownership",
            "Requirements Analysis",
            "Solution Architecture",
            "Testing & Deployment",
            "Continuous Improvement",
        ],
    },
    {
        id: 1,
        number: "02",
        title: "Web Development",
        tagline: "Fast & scalable code.",
        tags: ["React", "Next.js", "Tailwind"],
        img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
        description:
            "Building responsive, modern, and high-performance web applications using the latest frontend technologies. Each project is developed with clean architecture, optimized performance, and scalability in mind to ensure a seamless user experience.",
        meta: "Modern Frontend Craft",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
        ),
        features: [
            "React & Next.js Apps",
            "Responsive Layouts",
            "Performance Optimization",
            "API Integration",
            "Cross-browser Support",
        ],
    },
    {
        id: 2,
        number: "03",
        title: "Project Management",
        tagline: "Planning, execution, outcomes.",
        tags: ["Agile", "Roadmap", "Delivery"],
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
        description:
            "I am developing my career toward project management, with a strong focus on planning, execution, coordination, timelines, deliverables, risks, and project outcomes. My technical background allows me to understand project requirements in depth while maintaining focus on business objectives, priorities, and successful delivery.",
        meta: "Planning & Project Delivery",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
            </svg>
        ),
        features: [
            "Project Planning",
            "Execution & Coordination",
            "Timeline Management",
            "Risk & Issue Tracking",
            "Deliverable Ownership",
        ],
    },
    {
        id: 3,
        number: "04",
        title: "UI/UX Designing",
        tagline: "User-centred, research-driven.",
        tags: ["Figma", "Wireframes", "Prototype"],
        img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
        description:
            "I design intuitive digital products by understanding user needs, mapping journeys, and crafting interfaces that feel effortless. My UI/UX process includes research, wireframing, prototyping, usability testing, and design-system creation — always with the end-user and business goals in mind.",
        meta: "Product & Experience Design",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
            </svg>
        ),
        features: [
            "User Research",
            "Wireframing & Prototyping",
            "Usability Testing",
            "Design Systems",
            "Interaction Design",
        ],
    },
    {
        id: 4,
        number: "05",
        title: "Bug Fixing",
        tagline: "Diagnose, fix, verify, prevent.",
        tags: ["Debugging", "Optimization", "Support"],
        img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80",
        description:
            "Fast and reliable bug-fixing services for web and software projects. I diagnose root causes, implement clean fixes, verify the solution across environments, and add safeguards to prevent regressions. Whether it's a critical production issue or a backlog of minor defects, I restore stability and confidence.",
        meta: "Maintenance & Reliability",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        features: [
            "Root Cause Analysis",
            "Clean, Tested Fixes",
            "Cross-Environment Verification",
            "Regression Prevention",
            "Production Stability",
        ],
    },
];

// Stats data
const statsData = [
    { number: "8+", label: "Years", suffix: "Software Engineering" },
    { number: "148+", label: "Projects", suffix: "Delivered globally" },
    { number: "62", label: "Clients", suffix: "Across 20 countries" },
    { number: "12", label: "Awards", suffix: "Industry recognition" },
];

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
// FLOATING IMAGE CARD (from ServicesSection)
// ─────────────────────────────────────────────────────────────────────────────
const FloatingCard = ({ item, mousePos }) => {
    const [imgSwitching, setImgSwitching] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [currentImg, setCurrentImg] = useState("");

    // Smoothly animate to mouse position
    useEffect(() => {
        let frame;
        let currentX = position.x;
        let currentY = position.y;

        const animate = () => {
            currentX = lerp(currentX, mousePos.x, 0.085);
            currentY = lerp(currentY, mousePos.y, 0.085);
            setPosition({ x: currentX, y: currentY });
            frame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frame);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mousePos]);

    // Handle image switching style
    useEffect(() => {
        if (item && item.img !== currentImg) {
            setImgSwitching(true);
            const timer = setTimeout(() => {
                setCurrentImg(item.img);
                setImgSwitching(false);
            }, 180);
            return () => clearTimeout(timer);
        } else if (item) {
            setCurrentImg(item.img);
        }
    }, [item, currentImg]);

    if (!item) return null;

    return (
        <div
            className="fixed z-[9999] pointer-events-none transition-opacity duration-300 will-change-transform"
            style={{
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -125%)',
                width: '300px',
                opacity: item ? 1 : 0,
            }}
        >
            <div className="relative w-full aspect-[300/210] overflow-hidden">
                <img
                    src={currentImg}
                    alt={item.title}
                    className={`w-full h-full object-cover block transition-all duration-300 ease-out ${
                        imgSwitching ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2 flex-wrap">
                    <span className="font-syne text-[10px] font-bold text-white/55 tracking-[2px]">{item.number}</span>
                    <span className="font-syne text-[13px] font-bold text-white tracking-wide uppercase">{item.title}</span>
                </div>
            </div>
            <div className="bg-[#313131] flex items-center justify-between px-4 py-2.5 gap-2 flex-wrap">
                <div className="flex gap-1.5 flex-wrap">
                    {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-[9px] font-medium tracking-[1.5px] uppercase text-white/45 border border-white/15 rounded-full px-2 py-0.5">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="w-2 h-2 rounded-full bg-[#F57500] animate-pulse" />
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE ROW (accordion-style list item, no card)
// ─────────────────────────────────────────────────────────────────────────────
const ServiceRow = ({
                        service,
                        index,
                        isRevealed,
                        isOpen,
                        onToggle,
                        isTouchDevice,
                        onHover,
                    }) => {
    const [isHovered, setIsHovered] = useState(false);
    const active = isOpen || (!isTouchDevice && isHovered);

    return (
        <div
            className={`group relative border-b border-white/10 transition-all duration-500 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'
            }`}
            style={{ transitionDelay: `${index * 80}ms` }}
            onMouseEnter={() => {
                if (!isTouchDevice) {
                    setIsHovered(true);
                    onHover(service);
                }
            }}
            onMouseLeave={() => {
                if (!isTouchDevice) {
                    setIsHovered(false);
                    onHover(null);
                }
            }}
        >
            {/* Left accent bar */}
            <div
                className="absolute top-0 bottom-0 left-0 w-[2.5px] bg-gradient-to-b from-[#F57500] via-[#ff9533] to-transparent origin-top transition-transform duration-500 z-10"
                style={{ transform: active ? 'scaleY(1)' : 'scaleY(0)' }}
            />

            {/* ── HEADER ROW (always visible) ── */}
            <button
                onClick={onToggle}
                className="relative w-full text-left flex items-center gap-4 md:gap-8 px-4 md:px-8 py-6 md:py-8 cursor-pointer"
            >
                {/* Number */}
                <span
                    className={`font-oswald text-[1.5rem] md:text-[2rem] leading-none tracking-[-0.5px] transition-colors duration-400 flex-shrink-0 w-[2.5rem] md:w-[4rem] ${
                        active ? 'text-[#F57500]' : 'text-white/20'
                    }`}
                >
                    {service.number}
                </span>

                {/* Icon */}
                <span
                    className={`hidden md:block w-8 h-8 flex-shrink-0 transition-all duration-400 ${
                        active ? 'text-[#F57500] scale-110' : 'text-white/30'
                    }`}
                >
                    {service.icon}
                </span>

                {/* Title + tagline */}
                <span className="flex-1 min-w-0">
                    <span
                        className={`block font-oswald uppercase text-[1.25rem] md:text-[2.1rem] leading-[1.05] tracking-[-0.4px] transition-colors duration-400 ${
                            active ? 'text-[#ff9533]' : 'text-white'
                        }`}
                    >
                        {service.title}
                    </span>
                    <span className="hidden md:block font-cormorant italic text-[0.82rem] text-white/40 mt-1">
                        {service.tagline}
                    </span>
                </span>

                {/* Meta pill (desktop) */}
                <span
                    className={`hidden lg:inline-flex items-center gap-1.5 bg-black/52 backdrop-blur-[10px] border py-1 px-3 rounded-full flex-shrink-0 transition-all duration-300 ${
                        active ? 'border-[rgba(245,117,0,0.45)]' : 'border-white/10'
                    }`}
                >
                    <span className="w-1.5 h-1.5 bg-[#F57500] rounded-full flex-shrink-0" />
                    <span
                        className={`text-[0.5rem] tracking-[2.5px] uppercase font-bold transition-colors duration-300 ${
                            active ? 'text-[#ff9533]' : 'text-white/70'
                        }`}
                    >
                        {service.meta}
                    </span>
                </span>

                {/* Plus / toggle indicator */}
                <span className="relative flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                    <span
                        className={`absolute w-4 md:w-5 h-[1.5px] bg-current transition-colors duration-300 ${
                            active ? 'text-[#F57500]' : 'text-white/50'
                        }`}
                    />
                    <span
                        className={`absolute w-[1.5px] h-4 md:h-5 bg-current transition-all duration-400 ${
                            active ? 'text-[#F57500] rotate-90 opacity-0' : 'text-white/50 rotate-0 opacity-100'
                        }`}
                    />
                </span>
            </button>

            {/* ── EXPANDABLE BODY ── */}
            <div
                className="overflow-hidden transition-[max-height,opacity] duration-600 ease-[cubic-bezier(0.77,0,0.18,1)]"
                style={{
                    maxHeight: active ? '700px' : '0px',
                    opacity: active ? 1 : 0,
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 px-4 md:px-8 pb-8 md:pb-10 pt-1 md:pl-[7.5rem]">
                    {/* Description */}
                    <div className="md:col-span-7">
                        <p className="font-cormorant italic text-[0.92rem] md:text-[1rem] text-white/60 leading-relaxed">
                            {service.description}
                        </p>

                        {/* Tags (mobile) */}
                        <div className="flex flex-wrap gap-2 mt-5 lg:hidden">
                            {service.tags?.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-[9px] font-medium tracking-[1.5px] uppercase text-[#ff9533] border border-[rgba(245,117,0,0.45)] rounded-full px-2.5 py-1"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Meta pill (mobile) */}
                        <div className="lg:hidden mt-4 inline-flex items-center gap-1.5 bg-black/52 backdrop-blur-[10px] border border-[rgba(245,117,0,0.45)] py-1 px-3 rounded-full">
                            <span className="w-1.5 h-1.5 bg-[#F57500] rounded-full flex-shrink-0" />
                            <span className="text-[0.5rem] tracking-[2.5px] uppercase font-bold text-[#ff9533]">
                                {service.meta}
                            </span>
                        </div>

                        {/* Desktop tags */}
                        <div className="hidden lg:flex gap-2 flex-wrap mt-5">
                            {service.tags?.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-[9px] font-medium tracking-[1.5px] uppercase text-white/45 border border-white/15 rounded-full px-2.5 py-1"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="md:col-span-5 md:border-l md:border-white/10 md:pl-8">
                        <div className="font-barlow-condensed text-[9px] tracking-[3px] uppercase text-white/30 mb-4">
                            Capabilities
                        </div>
                        <ul className="flex flex-col gap-2.5">
                            {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2.5">
                                    <span className="w-1 h-1 bg-[#F57500] rounded-full flex-shrink-0" />
                                    <span className="font-barlow-condensed text-[10px] tracking-[1.5px] uppercase text-white/50">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Services = () => {
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [openId, setOpenId] = useState(servicesData[0].id);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const gridRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Detect touch device / small screen
    useEffect(() => {
        const checkTouch = () => {
            const isSmall = window.matchMedia("(max-width: 1023px)").matches;
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsTouchDevice(isSmall || hasTouch);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    // Track mouse position for floating card
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        if (!isTouchDevice) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isTouchDevice]);

    // Preload images for floating card
    useEffect(() => {
        servicesData.forEach((service) => {
            const img = new Image();
            img.src = service.img;
        });
    }, []);

    // Reveal on scroll
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

    const formatNumber = (num) => num.toString().padStart(2, '0');

    return (
        <div className="bg-[#060606] min-h-screen overflow-x-hidden font-syne font-barlow text-[#f2f2f0]">

            {/* ─── FLOATING IMAGE CARD ─────────────────────────────────────── */}
            {!isTouchDevice && <FloatingCard item={hoveredItem} mousePos={mousePos} />}

            {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
            <div className="relative min-h-[80vh] md:min-h-screen flex flex-col justify-end overflow-hidden px-5 md:px-[4.5rem] pb-12 md:pb-[72px]">

                {/* Corner decor */}
                <div className="absolute z-20 bottom-[52px] right-[52px] w-[100px] h-[100px] border-r border-white/22 border-b border-white/22 opacity-0 animate-fadeIn [animation-delay:1.8s] pointer-events-none hidden md:block" />

                {/* Index label */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 rotate-90 font-barlow-condensed text-[9px] tracking-[8px] uppercase text-white/35 whitespace-nowrap opacity-0 animate-fadeIn [animation-delay:2s] hidden md:block">
                    Services · 08 / 08
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

            {/* ─── STATS BAR ────────────────────────────────────────────────── */}
            <div className="relative z-10 px-3 md:px-[4.5rem] py-10 md:py-14 ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                    {statsData.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col items-start gap-1 transition-all duration-600 ${
                                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            <div className="font-oswald text-[2.5rem] md:text-[3.5rem] leading-none text-[#F57500]">
                                {stat.number}
                            </div>
                            <div className="font-barlow-condensed text-[10px] tracking-[3px] uppercase text-white font-semibold">
                                {stat.label}
                            </div>
                            <div className="font-cormorant italic text-[0.78rem] text-white/40">
                                {stat.suffix}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── SERVICES LIST (no cards) ─────────────────────────────────── */}
            <div className="px-3 md:px-[4.5rem] py-6 md:py-10 relative z-10" ref={gridRef}>
                {/* Section label */}
                <div className="flex items-center gap-3.5 mb-8 md:mb-10">
                    <div className="w-[30px] h-[1.5px] bg-[#F57500]" />
                    <span className="text-[0.58rem] tracking-[5px] uppercase text-[#F57500] font-extrabold">Services Index</span>
                    <span className="font-cormorant italic text-[0.72rem] text-white/30 ml-2 hidden md:inline">
                        {isTouchDevice ? 'Tap to expand' : 'Hover to preview · Click to expand'}
                    </span>
                </div>

                <div className="border-t border-white/10">
                    {servicesData.map((service, idx) => (
                        <ServiceRow
                            key={service.id}
                            service={service}
                            index={idx}
                            isRevealed={isRevealed}
                            isOpen={openId === service.id}
                            onToggle={() => setOpenId(openId === service.id ? null : service.id)}
                            isTouchDevice={isTouchDevice}
                            onHover={setHoveredItem}
                        />
                    ))}
                </div>
            </div>

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

            {/* ─── GLOBAL STYLES ────────────────────────────────────────────── */}
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Oswald:wght@500;700&family=Roboto:wght@500&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

                .font-oswald {
                    font-family: 'Oswald', sans-serif;
                }

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
                @keyframes scrollThumb {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scrollThumb {
                    animation: scrollThumb 2s ease-in-out infinite;
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
                .rotate-180 {
                    transform: rotate(180deg);
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .font-barlow-condensed {
                    font-family: 'Barlow Condensed', sans-serif;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease forwards;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-fadeUp, .animate-ticker, .animate-marquee, .animate-scrollThumb, .animate-float {
                        animation-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Services;