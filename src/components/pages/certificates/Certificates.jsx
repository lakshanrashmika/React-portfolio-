import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';   // ← FIX 1: was 'react-router'

// ─────────────────────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────────────────────
// const padNumber = (num) => String(num).padStart(2, '0');

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
// const tickerItems = ["DESIGN", "BUILD", "LEAD", "DELIVER"];

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATE DATA
// ─────────────────────────────────────────────────────────────────────────────
const certificatesData = [
    {
        id: 1,
        title: 'Graduate Diploma Certificate',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop',
        type: 'certificate',
        issuer: 'IJSE',
        year: '2023',
    },
    {
        id: 2,
        title: 'Transcript - Semester 1',
        image: 'https://images.unsplash.com/photo-1591267990532-e5bdb2b63b12?q=80&w=800&auto=format&fit=crop',
        type: 'transcript',
        issuer: 'IJSE',
        year: '2022',
    },
    {
        id: 3,
        title: 'Transcript - Semester 2',
        image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800&auto=format&fit=crop',
        type: 'transcript',
        issuer: 'IJSE',
        year: '2022',
    },
    {
        id: 4,
        title: 'Transcript - Semester 3',
        image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800&auto=format&fit=crop',
        type: 'transcript',
        issuer: 'IJSE',
        year: '2023',
    },
    {
        id: 5,
        title: 'Diploma Certificate',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop',
        type: 'certificate',
        issuer: 'IJSE',
        year: '2024',
    },
    {
        id: 6,
        title: 'Transcript - Semester 4',
        image: 'https://images.unsplash.com/photo-1591267990532-e5bdb2b63b12?q=80&w=800&auto=format&fit=crop',
        type: 'transcript',
        issuer: 'IJSE',
        year: '2024',
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────────────────────
const ArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Lightbox = ({ isOpen, currentIndex, images, onClose, onPrev, onNext, onSelect }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const currentImage = images[currentIndex];

    useEffect(() => {
        if (isOpen && currentImage) {
            setImageLoaded(false);
        }
    }, [currentIndex, isOpen, currentImage]);

    // ─── SCROLL LOCK ────────────────────────────────────────────────────────
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            const scrollX = window.scrollX;

            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = `-${scrollX}px`;
            document.body.style.width = '100%';

            const preventScroll = (e) => e.preventDefault();
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });

            return () => {
                window.removeEventListener('wheel', preventScroll);
                window.removeEventListener('touchmove', preventScroll);

                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.width = '';

                window.scrollTo(scrollX, scrollY);
            };
        }
    }, [isOpen]);

    if (!isOpen || !currentImage) return null;

    const padNumberLocal = (n) => String(n).padStart(2, '0');

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(4,4,5,0.95)]"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative">
                {/* Close button */}
                <button
                    className="absolute -top-10 -right-10 w-10 h-10 rounded-full bg-[#F57500] border-none flex items-center justify-center transition-transform duration-250 hover:scale-110 hover:rotate-90 z-10"
                    onClick={onClose}
                >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white stroke-[2.5] fill-none">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Prev arrow */}
                <button
                    className="absolute top-1/2 -left-[68px] -translate-y-1/2 w-12 h-12 rounded-full bg-white/7 border border-white/15 flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(245,117,0,0.25)] hover:border-[#F57500] hover:scale-108 z-10"
                    onClick={onPrev}
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white stroke-2 fill-none">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                {/* Image */}
                <img
                    key={currentIndex}
                    src={currentImage.image}
                    alt={`Gallery ${currentIndex + 1}`}
                    className="max-w-[88vw] max-h-[80vh] object-contain rounded-[1px] transition-opacity duration-300"
                    style={{ opacity: imageLoaded ? 1 : 0 }}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Next arrow */}
                <button
                    className="absolute top-1/2 -right-[68px] -translate-y-1/2 w-12 h-12 rounded-full bg-white/7 border border-white/15 flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(245,117,0,0.25)] hover:border-[#F57500] hover:scale-108 z-10"
                    onClick={onNext}
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white stroke-2 fill-none">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>

                {/* Info footer */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-4">
                    <span className="font-barlow-condensed text-[11px] tracking-[4px] text-white/40 uppercase">
                        {padNumberLocal(currentIndex + 1)} / {padNumberLocal(images.length)}
                    </span>
                    <div className="flex gap-1.5 items-center">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                className={`transition-all duration-300 cursor-pointer ${
                                    idx === currentIndex
                                        ? 'bg-[#F57500] w-4 h-1 rounded-[2px]'
                                        : 'bg-white/20 w-1 h-1 rounded-full'
                                }`}
                                onClick={() => onSelect(idx)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION / ABOUT IJSE SECTION
// ─────────────────────────────────────────────────────────────────────────────
const EducationSection = () => {
    const navigate = useNavigate();   // ← FIX 2: was missing

    return (
        <div className="relative bg-[#f7f7f7] text-[#222] py-24 px-5 md:px-[4.5rem] overflow-hidden font-mukta">

            {/* Huge Background Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full text-center">
                <span className="font-anton text-[22vw] leading-none text-black/[0.045] uppercase tracking-tighter whitespace-nowrap">
                    EDUCATION
                </span>
            </div>

            {/* Background subtle vertical grid lines */}
            <div className="absolute inset-0 flex justify-between px-20 pointer-events-none opacity-[0.04]">
                <div className="w-px h-full bg-black"></div>
                <div className="w-px h-full bg-black"></div>
                <div className="w-px h-full bg-black"></div>
                <div className="w-px h-full bg-black"></div>
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">

                <div className="flex flex-col lg:flex-row  mb-16">

                    {/* Left Column: Diploma Info */}
                    <div className="lg:w-1/3 relative pt-2">

                        <div className="pl-8 relative">
                            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#F57500]" />

                            <div className="absolute -top-12 -left-6 flex gap-1.5 opacity-[0.18] pointer-events-none">
                                <div className="w-9 h-36 bg-[#F57500] skew-x-[-25deg]" />
                                <div className="w-9 h-36 bg-[#F57500] skew-x-[-25deg]" />
                            </div>

                            <h2 className="font-roboto font-bold text-[1.75rem] leading-[1.15] text-[#222] mb-3 relative z-10 tracking-tight">
                                Diploma In Software<br />Engineering
                            </h2>
                            <p className="text-[0.82rem] text-gray-500 leading-relaxed mb-6 font-medium relative z-10 max-w-[220px]">
                                You can see brief details about IJSE Campus here.
                            </p>
                        </div>

                        {/*<div className="absolute bottom-16 left-0 w-[50px] h-[2px] bg-[#fbc02d] opacity-60" />*/}
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:w-2/3 relative">

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-[35px] h-[3px] bg-[#F57500]" />
                            <h3 className="font-roboto font-bold text-[1.5rem] md:text-[1.8rem] text-[#222] tracking-tight">
                                Education and <span className="text-[#F57500]">IJSE</span> certificates
                            </h3>
                        </div>

                        {/* Category Tabs */}
                        <div className="bg-[#2d2d2d] text-white inline-flex flex-wrap items-center px-7 py-4 mb-8 text-[0.62rem] font-semibold tracking-[0.18em] uppercase shadow-sm">
                            <span className="text-[#F57500] mr-7">Category :</span>
                            <div className="flex items-center gap-7">
                                <span className="hover:text-[#F57500] cursor-pointer transition-colors duration-200">Diploma</span>
                                <span className="hover:text-[#F57500] cursor-pointer transition-colors duration-200">Certificates</span>
                                <span className="hover:text-[#F57500] cursor-pointer transition-colors duration-200">Technology</span>
                            </div>
                        </div>

                        <h4 className="text-[0.95rem] font-bold text-gray-800 mb-3 tracking-tight">You can see some information about me.</h4>
                        <p className="text-[0.8rem] text-gray-600 leading-[1.95] mb-10 font-medium max-w-[650px]">
                            I'm a proficient software developer with an impressive skill set in Java, PHP, and Angular. I studied at the IJSE Institute for two years, where I gained hands-on experience developing various software applications. My ability to write clean and efficient code is evident in my work, which I completed with great attention to detail. My certificates in these programming languages demonstrate my proficiency and commitment to excellence. My talent and dedication make me an ideal candidate for any software development position.
                        </p>

                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Meta Info */}
                            <div className="flex flex-col gap-4 mb-12 text-[0.75rem]">
                                <div className="flex gap-4">
                                    <span className="block text-gray-400 font-bold tracking-[0.15em] uppercase text-[0.6rem] min-w-[50px]">Date :</span>
                                    <span className="font-bold text-gray-800 tracking-wide">06.08.2016 – 03.02.2018</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="block text-gray-400 font-bold tracking-[0.15em] uppercase text-[0.6rem] min-w-[70px]">Skills :</span>
                                    <span className="font-bold text-gray-800 tracking-wide">PHP/JAVASCRIPT/JAVA</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="block text-gray-400 font-bold tracking-[0.15em] uppercase text-[0.6rem] min-w-[70px]">Location :</span>
                                    <span className="font-bold text-gray-800 tracking-wide">GALLE/PANADURA</span>
                                </div>
                            </div>

                            {/* ABOUT IJSE Card */}
                            <div className="relative bg-white border-2 border-[#0000001a] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)]  max-w-[620px] mb-14 lg:mr-auto">

                                <div className="absolute top-4 left-7 text-[5.5rem] text-gray-100/80 font-serif leading-none select-none">
                                    &ldquo;
                                </div>

                                <h5 className="font-roboto font-bold text-[1.05rem] text-[#333] mb-4 relative z-10 tracking-tight">ABOUT IJSE</h5>
                                <p className="text-[0.82rem] text-gray-500 italic leading-[1.85] relative z-10 max-w-[90%]">
                                    "Offer BSc(hons) Computer Science and software engineering degrees. Produce IT professional to the IT industry as a leading institute for IT"
                                </p>

                                <div className="absolute bottom-4 right-7 text-[5.5rem] text-gray-100/80 font-serif leading-none select-none rotate-180">
                                    &ldquo;
                                </div>

                                <div className="absolute -top-10 right-6 md:right-8 w-[95px] h-[95px] bg-white rounded-full border-2 border-[#0000001a] shadow-[0_6px_20px_rgba(0,0,0,0.08)] flex items-center justify-center z-20 overflow-hidden p-2">
                                    <img
                                        className="w-full h-full object-cover object-center rounded-full brightness-50 saturate-70"
                                        src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="IJSE logo"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* View Project Button — UNCHANGED */}
                        <button className="bg-[#F57500] hover:bg-[#F57500] text-[#222] font-syne text-[0.65rem] tracking-[0.25em] uppercase font-extrabold py-4 px-12 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            View Project
                        </button>

                    </div>


                </div>
            </div>
            {/* View Project Navigation Bar */}
            <div className="flex items-stretch w-full  bg-[#2d2d2d] mt-2">
                {/* Left Arrow Button */}
                <button
                    onClick={() => navigate('/projects')}
                    className="group flex items-center justify-center w-[160px] md:w-[200px] bg-[#3a3a3a] hover:bg-[#F57500] transition-colors duration-300 py-5"
                    aria-label="Previous project"
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-[#F57500] group-hover:text-white transition-colors duration-300"
                    >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                </button>

                {/* Center Label */}
                <button
                    className="group flex-1 flex items-center justify-center px-4 md:px-8 py-5 bg-[#2d2d2d] border-x border-[#00000033] hover:bg-[#3a3a3a] transition-colors duration-300"
                >
                    <span className="font-syne text-[0.62rem] tracking-[0.35em] uppercase font-extrabold text-white/80 group-hover:text-[#F57500] transition-colors duration-300 whitespace-nowrap">
                        All Projects
                    </span>
                </button>

                {/* Right Arrow Button */}
                <button
                    onClick={() => navigate('/portfolio')}
                    className="group flex items-center justify-center w-[160px] md:w-[200px] bg-[#3a3a3a] hover:bg-[#F57500] transition-colors duration-300 py-5"
                    aria-label="Next project"
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-[#F57500] group-hover:text-white transition-colors duration-300"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATES SECTION
// ─────────────────────────────────────────────────────────────────────────────
const CertificatesSection = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    const isOpen = selectedIndex !== null;
    const len = certificatesData.length;

    // Auto-scroll thumbnails
    useEffect(() => {
        if (!isPaused && !isOpen) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % len);
            }, 3500);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, isOpen, len]);

    // Scroll slider to active card
    useEffect(() => {
        if (sliderRef.current && !isOpen) {
            const card = sliderRef.current.children[currentIndex];
            if (card) {
                const container = sliderRef.current;
                const cardLeft = card.offsetLeft;
                const cardWidth = card.offsetWidth;
                const containerWidth = container.offsetWidth;
                const scrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
                container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    }, [currentIndex, isOpen]);

    const handlePrev = useCallback((count = 1) => {
        setSelectedIndex((prev) => {
            const base = prev ?? 0;
            return (base - count + len) % len;
        });
    }, [len]);

    const handleNext = useCallback((count = 1) => {
        setSelectedIndex((prev) => {
            const base = prev ?? 0;
            return (base + count) % len;
        });
    }, [len]);

    const handleSelect = useCallback((idx) => {
        setSelectedIndex(idx);
    }, []);

    const handleClose = useCallback(() => setSelectedIndex(null), []);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, handlePrev, handleNext, handleClose]);

    const handleDotClick = (idx) => setCurrentIndex(idx);

    return (
        <div
            className="relative  bg-[#1e1e1e] pt-24 pb-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex justify-between px-20 pointer-events-none opacity-[0.06]">
                <div className="w-px h-full bg-white"></div>
                <div className="w-px h-full bg-white"></div>
                <div className="w-px h-full bg-white"></div>
                <div className="w-px h-full bg-white"></div>
            </div>

            <div className="max-w-[1400px] mx-auto w-full px-8 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-[2px] bg-gray-600"></div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-500 tracking-wide">
                        Certificates from IJSE
                    </h1>
                </div>
                <p className="font-cormorant italic text-[0.95rem] text-white/40 ml-12 mb-10">
                    Academic credentials and transcripts
                </p>

                {/* Navigation Arrows */}
                <div className="flex gap-6 mb-10">
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev - 1 + len) % len)}
                        className="text-[#F57500] hover:text-white transition-transform hover:scale-110"
                        aria-label="Previous certificate"
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % len)}
                        className="text-[#F57500] hover:text-white transition-transform hover:scale-110"
                        aria-label="Next certificate"
                    >
                        <ArrowRight />
                    </button>
                </div>

                {/* Slider Container */}
                <div
                    ref={sliderRef}
                    className="flex gap-6 overflow-x-auto pb-12 pt-4 px-2 scrollbar-hide scroll-smooth"
                >
                    {certificatesData.map((cert, idx) => {
                        const isActive = currentIndex === idx;
                        return (
                            <div
                                key={cert.id}
                                className={`relative flex-shrink-0 w-[280px] md:w-[320px] group transition-all duration-500 ${
                                    isActive ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-50'
                                }`}
                            >
                                <div
                                    className="relative h-[450px] bg-white shadow-2xl overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedIndex(idx)}
                                >
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

                                    {/* Hover overlay with search */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                            <SearchIcon />
                                        </div>
                                    </div>

                                    {/* Certificate type badge */}
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border border-white/20">
                                            {cert.type}
                                        </span>
                                    </div>

                                    {/* Year badge */}
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className="bg-[#F57500] text-white text-[9px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full">
                                            {cert.year}
                                        </span>
                                    </div>

                                    {/* Title on image */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                                        <h3 className="text-white font-semibold text-sm leading-snug tracking-wide">
                                            {cert.title}
                                        </h3>
                                        <p className="text-white/60 text-[10px] tracking-[0.15em] uppercase mt-1">
                                            {cert.issuer}
                                        </p>
                                    </div>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F57500] z-20" />
                                    )}
                                </div>

                                {/* "View" Bottom Bar */}
                                <div
                                    className="bg-[#1e1e1e] py-4 text-center cursor-pointer border-t border-gray-800 hover:bg-[#F57500] hover:border-[#F57500] transition-all duration-300 group/info"
                                    onClick={() => setSelectedIndex(idx)}
                                >
                                    <span className="text-white/70 group-hover/info:text-white text-xs font-bold tracking-[0.25em] uppercase transition-colors">
                                        View
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer / Pagination */}
                <div className="flex justify-between items-center mt-4 pb-8 border-t border-gray-800 pt-6">
                    <div className="flex items-center gap-3 text-sm font-mono">
                        <span className="text-[#F57500]">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-gray-500">/</span>
                        <span className="text-gray-500">
                            {String(len).padStart(2, '0')}
                        </span>
                        <div className="w-12 h-[2px] bg-gray-700 ml-2 relative overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full bg-[#F57500] transition-all duration-300"
                                style={{ width: `${((currentIndex + 1) / len) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {certificatesData.map((_, dot) => (
                            <button
                                key={dot}
                                onClick={() => handleDotClick(dot)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    currentIndex === dot ? 'bg-[#F57500] scale-125' : 'bg-gray-600 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to certificate ${dot + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* LIGHTBOX */}
            <Lightbox
                isOpen={isOpen}
                currentIndex={selectedIndex ?? 0}
                images={certificatesData}
                onClose={handleClose}
                onPrev={() => handlePrev(1)}
                onNext={() => handleNext(1)}
                onSelect={handleSelect}
            />
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Certificates = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#060606] min-h-screen overflow-x-hidden font-syne font-barlow text-[#f2f2f0]">

            <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-10" />

            {/* PAGE HEADER */}
            <div className="relative z-10 pt-24 pb-12 px-5 md:px-[4.5rem]">
                <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-[30px] h-[1.5px] bg-[#F57500]" />
                    <span className="text-[0.58rem] tracking-[5px] uppercase text-[#F57500] font-extrabold">Credentials</span>
                    <span className="ml-1.5 bg-[rgba(245,117,0,0.12)] border border-[rgba(245,117,0,0.3)] text-[0.52rem] tracking-[2px] text-[#F57500] py-0.5 px-2.5 rounded-full hidden md:inline">2025</span>
                </div>
                <h1 className="font-oswald uppercase text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] tracking-[-2px] text-white">
                    MY <span className="inline-block [-webkit-text-stroke:1.8px_#F57500] text-transparent skew-x-[-3deg]">ACHIEVEMENTS</span>
                </h1>
            </div>

            {/* MARQUEE */}
            <div className="relative z-10 border-y border-white/5 overflow-hidden py-4">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                        <div key={i} className="inline-flex items-center gap-[18px] px-4 md:px-8">
                            <span className="font-anton text-[0.7rem] md:text-[0.76rem] tracking-[3px] text-white/20 uppercase">{item}</span>
                            <span className="w-1 h-1 bg-[#F57500] rounded-full flex-shrink-0" />
                        </div>
                    ))}
                </div>
            </div>
            <CertificatesSection />
            <EducationSection />


            {/* CTA SECTION — UNCHANGED */}
            <div className="relative z-10 px-3 md:px-[4.5rem] py-20 md:py-28 ">
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

            {/* GLOBAL STYLES — fonts preserved exactly as original */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Oswald:wght@500;700&family=Roboto:wght@500&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
                
                 @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Oswald:wght@500;700&family=Roboto:wght@500;700&family=Syne:wght@400;600;700;800&display=swap');

                .font-oswald {
                    font-family: 'Oswald', sans-serif;
                }
                .font-mukta {
                    font-family: 'Mukta Vaani', sans-serif;
                }
                .font-roboto {
                    font-family: 'Roboto', sans-serif;
                }

                .bg-noise {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    background-repeat: repeat;
                    background-size: 200px;
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
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease forwards;
                }
                @keyframes slideUp {
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideUp {
                    animation: slideUp 1.1s 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                @keyframes scrollThumb {
                    0% { top: -60%; }
                    100% { top: 160%; }
                }
                .animate-scrollThumb {
                    animation: scrollThumb 2s 2.5s ease-in-out infinite;
                }
                .scroll-smooth {
                    scroll-behavior: smooth;
                }
                .font-anton {
                    font-family: 'Anton', sans-serif;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-ticker, .animate-marquee, .animate-scrollThumb {
                        animation-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Certificates;