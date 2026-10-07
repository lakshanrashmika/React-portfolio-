import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

// --- Helper for lerp (smooth easing) ---
const lerp = (a, b, t) => a + (b - a) * t;

// --- Data for services ---
const servicesData = [
    {
        id: 0,
        num: "01",
        title: "UI / UX Designing",
        tags: ["Figma", "Wireframes", "Prototype"],
        img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
        label: "UI / UX Designing",
        descTitle: "Design with purpose",
        desc: "Modern, clean, and user-focused interfaces crafted to create smooth digital experiences that users enjoy. Every design is carefully planned to improve usability, engagement, and visual consistency across all devices. From research and wireframing to final prototypes, the goal is to create intuitive and visually appealing products that leave a lasting impression.",
        features: [
            "User Interface Design",
            "Wireframing",
            "Interactive Prototypes",
            "Design Systems",
            "Mobile Responsive Design"
        ]
    },
    {
        id: 1,
        num: "02",
        title: "Web Development",
        tags: ["React", "Next.js", "Tailwind"],
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
        label: "Web Development",
        descTitle: "Fast & scalable code",
        desc: "Building responsive, modern, and high-performance web applications using the latest frontend technologies. Each project is developed with clean architecture, optimized performance, and scalability in mind to ensure a seamless user experience. From landing pages to complex web platforms, every solution is crafted for speed, reliability, and long-term growth.",
        features: [
            "React & Next.js Apps",
            "Responsive Layouts",
            "Performance Optimization",
            "API Integration",
            "Cross-browser Support"
        ]
    },
    {
        id: 2,
        num: "03",
        title: "Bug Fixing",
        tags: ["Debugging", "Optimization", "Support"],
        img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80",
        label: "Bug Fixing",
        descTitle: "Fixing what matters",
        desc: "Identifying and resolving issues quickly to keep your website or application stable, secure, and smooth. Careful debugging and performance analysis help eliminate errors, improve functionality, and enhance the overall user experience. The focus is on delivering reliable solutions that keep your digital products running efficiently without interruptions.",
        features: [
            "Website Bug Fixes",
            "Performance Issues",
            "UI Error Fixing",
            "Code Optimization",
            "Technical Support"
        ]
    },
    {
        id: 3,
        num: "04",
        title: "Brand Identity",
        tags: ["Logo", "Visuals", "Guidelines"],
        img: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?w=600&q=80",
        label: "Brand Identity",
        descTitle: "Build your presence",
        desc: "Creating memorable brand identities with strong visuals, typography, and consistent design language. A well-crafted identity helps businesses stand out, build trust, and connect with their audience more effectively. From logos to complete visual systems, every element is designed to reflect the brand’s personality and vision.",
        features: [
            "Logo Design",
            "Typography System",
            "Brand Guidelines",
            "Color Palette",
            "Marketing Assets"
        ]
    },
    {
        id: 4,
        num: "05",
        title: "Digital Strategy",
        tags: ["Analytics", "Roadmap", "Growth"],
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
        label: "Digital Strategy",
        descTitle: "Direction, not guesswork",
        desc: "We translate ambition into actionable plans. Data-informed, instinct-sharpened, and always oriented toward outcomes that matter. Through research, analytics, and strategic planning, businesses gain a clear roadmap for digital growth, helping them improve engagement, increase conversions, and stay competitive in a constantly evolving market.",
        features: [
            "Competitor Analysis",
            "Product Roadmapping",
            "Analytics & Tracking",
            "Conversion Optimization",
            "Growth Frameworks"
        ]
    },
    {
        id: 5,
        num: "06",
        title: "SEO Optimization",
        tags: ["SEO", "Analytics", "Growth"],
        img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80",
        label: "SEO Optimization",
        descTitle: "Grow organically",
        desc: "Improving search visibility and website performance to help your business reach more people online. By optimizing technical structure, content quality, and search strategies, websites can rank higher and attract targeted traffic organically. The focus is on sustainable growth, better user engagement, and measurable online success.",
        features: [
            "Technical SEO",
            "Speed Optimization",
            "Content Strategy",
            "Keyword Research",
            "Analytics Tracking"
        ]
    }
];

// --- Floating Image Card Component (only on non-touch devices > 768px) ---
const FloatingCard = ({ item, mousePos }) => {
    const [imgSwitching, setImgSwitching] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [currentImg, setCurrentImg] = useState("");
    const rafRef = useRef(null);
    const prevItemId = useRef(null);

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
                    alt={item.label}
                    className={`w-full h-full object-cover block transition-all duration-300 ease-out ${
                        imgSwitching ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2 flex-wrap">
                    <span className="font-syne text-[10px] font-bold text-white/55 tracking-[2px]">{item.num}</span>
                    <span className="font-syne text-[13px] font-bold text-white tracking-wide">{item.label}</span>
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

// --- Individual Service Row Component ---
const ServiceItem = ({ service, isOpen, onToggle, onMouseEnter, onMouseLeave }) => {
    return (
        <li className="border-b border-[#313131]/15 overflow-hidden   ">
            <div
                className={`grid grid-cols-[60px_1fr_60px] md:grid-cols-[60px_1fr_auto_60px] items-center gap-5 py-7 cursor-pointer select-none transition-all duration-200 hover:bg-transparent`}
                onClick={onToggle}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span className={`font-syne text-xs font-bold tracking-[2px] transition-colors duration-300 ${
                    isOpen ? 'text-[#F57500]' : 'text-[#313131]/30 group-hover:text-[#F57500]'
                }`}>
                  {service.num}
                </span>
                <span className={`font-syne font-bold text-[clamp(20px,4vw,38px)] transition-all duration-300 font-oswald uppercase ${
                    isOpen ? 'text-[#F57500] translate-x-2' : 'text-[#313131] hover:text-[#F57500] hover:translate-x-2'
                }`}>
                  {service.title}
                </span>
                <div className="hidden md:flex gap-2 flex-wrap justify-end">
                    {service.tags.map((tag, idx) => (
                        <span key={idx} className={`text-[10px] font-medium tracking-[1.5px] font-oswald uppercase px-3 py-1 rounded-full border transition-all duration-300 ${
                            isOpen ? 'border-[#F57500] text-[#F57500] bg-[#F57500]/10' : 'border-[#313131]/30 text-[#888] group-hover:border-[#F57500] group-hover:text-[#F57500]'
                        }`}>
                          {tag}
                        </span>
                    ))}
                </div>
                <div className={`w-11 h-11 rounded-full border font-extrabold flex items-center justify-center ml-auto transition-all duration-300 flex-shrink-0 ${
                    isOpen ? 'bg-[#F57500] border-[#F57500] rotate-45' : 'border-[#313131]/30 group-hover:border-[#F57500]'
                }`}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current transition-all duration-300" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" className={isOpen ? 'stroke-white' : 'stroke-[#313131]'} />
                        <line x1="5" y1="12" x2="19" y2="12" className={isOpen ? 'stroke-white' : 'stroke-[#313131]'} />
                    </svg>
                </div>
            </div>

            {/* Expandable Panel */}
            <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}>
                <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 pl-6 md:pl-[84px] pt-2 font-extrabold">
                        <div className="md:col-span-2 pr-0 md:pr-5">
                            <strong className="block font-syne font-bold text-xs uppercase tracking-wide text-[#313131] mb-2.5">{service.descTitle}</strong>
                            <p className="text-[clamp(13px,3vw,15px)] font-light leading-relaxed text-[#666] mb-5">{service.desc}</p>
                            <Link
                                to="/contact"
                                className="flex-shrink-0"
                            >
                                <button className="inline-flex items-center gap-2 font-syne text-xs font-bold tracking-[2px] uppercase text-[#F57500] transition-all duration-300 hover:gap-4">
                                    Start a project
                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        <ul className="space-y-0">
                            {service.features.map((feature, idx) => (
                                <li key={idx} className="text-[clamp(12px,2.8vw,13px)] text-[#313131] py-2 flex items-center gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F57500] flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </li>
    );
};

const ServicesSection = () => {
    const [openId, setOpenId] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Detect touch device / small screen
    useEffect(() => {
        const checkTouch = () => {
            const isSmall = window.matchMedia("(max-width: 767px)").matches;
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

    const handleToggle = (id) => {
        setOpenId(prev => (prev === id ? null : id));
    };

    // Preload images for floating card
    useEffect(() => {
        servicesData.forEach(service => {
            const img = new Image();
            img.src = service.img;
        });
    }, []);

    return (
        <div className="min-h-screen bg-white text-white font-sans relative">
            {/* Column Wrap */}
            <div className="column-wrap float-left w-[calc(70%-93px)] relative h-full bg-white z-10 xl:w-full">
                <div className="column-wrap-container py-16 md:py-12">
                    <div className="col-wc_dec absolute left-0 w-7/10 h-full bg-gray-50 top-0 z-10"></div>
                    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
                        <div className="container max-w-8xl w-11/12 mx-auto relative z-50">
                            <div className="container mx-auto px-0 max-w-8xl">
                                {/* Section Title */}
                                <div className="section-title mb-10 pb-5 relative">
                                    <div className="absolute left-0 -top-10 h-0.5 w-8 bg-orange-500"></div>
                                    <div className="absolute left-0 -bottom-2.5 h-px w-11/12 bg-gray-200"></div>
                                    <div>
                                        <p className="text-[11px] tracking-[4px] uppercase text-[#F57500] font-medium mb-2.5">What Can I Do</p>
                                        <h2 className="font-syne font-extrabold text-[clamp(44px,7vw,72px)] leading-[0.95] text-[#313131]">
                                            MY<br/> <span className="text-[#F57500]">EXPERTISE</span>
                                        </h2>
                                    </div>
                                </div>

                                {/* Background noise overlay */}
                                <div className="fixed inset-0 pointer-events-none z-10 opacity-30 bg-noise" />

                                {/* Floating Card - only on non-touch, > 768px */}
                                {!isTouchDevice && <FloatingCard item={hoveredItem} mousePos={mousePos} />}

                                {/*<section className="min-h-screen bg-[#f5f2ee] font-instrument text-[#313131] relative z-0">*/}
                                    <div className="min-h-[620px] relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8 xl:px-5
                                     ">

                                        {/* Services List */}
                                        <ul className="list-none">
                                            {servicesData.map((service, idx) => (
                                                <ServiceItem
                                                    key={service.id}
                                                    service={service}
                                                    isOpen={openId === service.id}
                                                    onToggle={() => handleToggle(service.id)}
                                                    onMouseEnter={() => !isTouchDevice && setHoveredItem(service)}
                                                    onMouseLeave={() => !isTouchDevice && setHoveredItem(null)}
                                                />
                                            ))}
                                        </ul>

                                        {/* Bottom CTA */}
                                        <div className="mt-16 md:mt-20 opacity-0 animate-fadeIn animation-delay-300">
                                            <div className="bg-[#313131] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
                                                <p className="font-syne font-bold text-[clamp(16px,4vw,18px)] text-white leading-tight max-w-[240px]">
                                                    Let's build something <span className="text-[#F57500]">remarkable.</span>
                                                </p>
                                                <Link
                                                    to="/contact"
                                                    className="flex-shrink-0"
                                                >
                                                    <button className="relative bg-[#F57500] text-white px-8 py-3.5 font-syne text-xs font-bold tracking-[2px] uppercase overflow-hidden transition-colors duration-300 hover:text-[#F57500] group">
                                                        <span className="relative z-10">Get In Touch</span>

                                                        <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                {/*</section>*/}
                            </div>
                        </div>

                        {/* Section Number */}
                        <div className="section-number absolute right-2.5 top-[-2rem] text-[224px] font-bold text-gray-200 opacity-70 font-['Oswald'] -rotate-90 md:text-[180px]">
                            <span className="relative overflow-hidden">0</span>2.
                        </div>
                    </section>

                    {/* Section Separator */}
                    <div className="section-separator float-left w-full h-px relative mb-5">
                        <span className="absolute right-0 w-36 h-px top-0 z-10 bg-orange-500"></span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .section-title:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: -40px;
                    height: 2px;
                    width: 30px;
                }
                
                .section-title h3:before {
                    content: '';
                    position: absolute;
                    left: -90px;
                    top: -10px;
                    width: 150px;
                    bottom: 4px;
                    z-index: -1;
                    background: #f2f2f2;
                }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    opacity: 0;
                    animation: fadeIn 0.8s ease forwards;
                }
                .animation-delay-300 {
                    animation-delay: 0.3s;
                }
                .bg-noise {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
                    pointer-events: none;
                }
                
                @media (max-width: 564px) {
                    #wrapper {
                        top: 40px;
                    }
                    section {
                        padding: 0 0;
                    }
                    .section-number {
                        font-size: 120px;
                    }
                    .section-title h3 {
                        font-size: 20px;
                    }
                    .main-about h2 {
                        font-size: 24px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ServicesSection;