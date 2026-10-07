import React, { useState, useEffect, useRef, useCallback } from 'react';

// Gallery images data
const galleryImages = [
    {
        id: 0,
        src: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=90',
        thumb: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=700&q=80',
        label: 'Destinations · 01',
        gridCol: 1,
        gridRow: 1,
        className: ''
    },
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=90',
        thumb: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80',
        label: 'Destinations · 02',
        gridCol: 2,
        gridRow: 1,
        className: ''
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=90',
        thumb: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80',
        label: 'Destinations · 03',
        gridCol: 3,
        gridRow: 1,
        className: ''
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1400&q=90',
        thumb: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=900&q=80',
        label: 'Destinations · 04',
        gridCol: 1,
        gridRow: 2,
        className: 'md:col-span-2 md:row-span-2'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1400&q=90',
        thumb: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=700&q=80',
        label: 'Destinations · 05',
        gridCol: 2,
        gridRow: 2,
        className: ''
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1400&q=90',
        thumb: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=700&q=80',
        label: 'Destinations · 06',
        gridCol: 3,
        gridRow: 2,
        className: ''
    }
];

// Accordion items data
const accordionItems = [
    {
        title: "Concept for Project",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat."
    },
    {
        title: "Support and Development",
        content: "Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra."
    },
    {
        title: "Results and Outcomes",
        content: "Eu ius postulant salutatus definitionem, explicari graeci viderer. Cu nam tale ferri utroque, eu habemus albucius mel, cu vidit possit ornatus eum. Pri choro pertinax indoctum ne, ad partiendo persecuti forensibus est."
    }
];

// Project details rows
const projectDetails = [
    { index: "01", key: "Date", value: "26.05.2019", highlight: false },
    { index: "02", key: "Client", value: "Envato", highlight: false },
    { index: "03", key: "Category", value: "Design", highlight: false },
    { index: "04", key: "Online", value: "themeforest.net", highlight: true }
];

// Lightbox Component
const Lightbox = ({ isOpen, currentIndex, images, onClose, onPrev, onNext }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState(0);
    const currentImage = images[currentIndex];

    useEffect(() => {
        if (isOpen && currentImage) {
            setImageLoaded(false);
        }
    }, [currentIndex, isOpen, currentImage]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen || !currentImage) return null;

    const handlePrev = () => {
        setTransitionDirection(-1);
        onPrev();
    };

    const handleNext = () => {
        setTransitionDirection(1);
        onNext();
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const padNumber = (n) => String(n + 1).padStart(2, '0');

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-400 ${
                isOpen ? 'bg-[rgba(4,4,5,0.95)] pointer-events-auto' : 'bg-transparent pointer-events-none'
            }`}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className={`relative transition-all duration-400 ${
                isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-85 translate-y-7'
            }`}>
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
                    onClick={handlePrev}
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white stroke-2 fill-none">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                {/* Image */}
                <img
                    src={currentImage.src}
                    alt={`Gallery ${currentIndex + 1}`}
                    className="max-w-[88vw] max-h-[80vh] object-contain rounded-[1px] transition-all duration-300"
                    style={{
                        opacity: imageLoaded ? 1 : 0,
                        transform: `translateX(${transitionDirection * 2}px)`,
                        transition: 'opacity 0.3s, transform 0.3s'
                    }}
                    onLoad={handleImageLoad}
                />

                {/* Next arrow */}
                <button
                    className="absolute top-1/2 -right-[68px] -translate-y-1/2 w-12 h-12 rounded-full bg-white/7 border border-white/15 flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(245,117,0,0.25)] hover:border-[#F57500] hover:scale-108 z-10"
                    onClick={handleNext}
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white stroke-2 fill-none">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>

                {/* Info footer */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-4">
                  <span className="font-barlow-condensed text-[11px] tracking-[4px] text-white/40 uppercase">
                    {padNumber(currentIndex)} / {padNumber(images.length - 1)}
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
                                onClick={() => {
                                    if (idx < currentIndex) onPrev(currentIndex - idx);
                                    else if (idx > currentIndex) onNext(idx - currentIndex);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Gallery Item Component
const GalleryItem = ({ image, index, onOpen }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative overflow-hidden cursor-pointer bg-[#161618] ${image.className}`}
            style={{ gridColumn: image.gridCol, gridRow: image.gridRow }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onOpen(index)}
        >
            <img
                src={image.thumb}
                alt={image.label}
                className="w-full h-full object-cover block transition-all duration-800 brightness-[0.78] saturate-[0.85] group-hover:scale-110 group-hover:brightness-100 group-hover:saturate-108"
                style={{
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    filter: isHovered ? 'brightness(1) saturate(1.08)' : 'brightness(0.78) saturate(0.85)',
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s'
                }}
            />

            {/* Hover overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-transparent to-[rgba(245,117,0,0.18)] transition-opacity duration-400"
                style={{ opacity: isHovered ? 1 : 0 }}
            />

            {/* Label */}
            <div
                className="absolute bottom-0 left-0 right-0 p-5 pb-4 bg-gradient-to-t from-black/70 to-transparent transition-transform duration-400"
                style={{ transform: isHovered ? 'translateY(0)' : 'translateY(100%)' }}
            >
                <span className="font-barlow-condensed text-[10px] tracking-[3px] uppercase text-white/70">{image.label}</span>
            </div>

            {/* Zoom icon */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-350"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.6)'
                }}
            >
                <div className="w-13 h-13 rounded-full border-[1.5px] border-white/80 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white stroke-[1.8] fill-none">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

// Accordion Item Component
const AccordionItem = ({ item, isOpen, onToggle }) => {
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div className="mb-[2px]">
            <button
                className={`w-full h-[60px] px-7 flex items-center justify-between cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    isOpen ? 'bg-[#1d1d20]' : 'bg-[#161618] border border-[rgba(255,255,255,0.06)]'
                }`}
                onClick={onToggle}
            >
                <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#F57500] transition-transform duration-300 ${
                        isOpen ? 'scale-y-100' : 'scale-y-0'
                    }`}
                />
                <span className={`font-barlow-condensed text-[11px] tracking-[3px] font-semibold uppercase transition-colors duration-200 ${
                    isOpen ? 'text-[#F57500]' : 'text-[#a8a8b0]'
                }`}>
          {item.title}
        </span>
                <div className={`w-8 h-8 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isOpen ? 'border-[#F57500] bg-[rgba(245,117,0,0.12)]' : ''
                }`}>
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute w-2.5 h-[1.5px] bg-[#F57500] rounded-sm" />
                        <div className={`absolute w-[1.5px] h-2.5 bg-[#F57500] rounded-sm transition-all duration-350 ${
                            isOpen ? 'opacity-0 rotate-90' : ''
                        }`} />
                    </div>
                </div>
            </button>
            <div
                className="overflow-hidden transition-all duration-450 bg-[#0f0f11] border border-[rgba(255,255,255,0.06)] border-t-0"
                style={{ maxHeight: `${height}px`, opacity: isOpen ? 1 : 0 }}
            >
                <div ref={contentRef} className="p-[26px_28px_30px] text-[#a8a8b0] text-sm leading-[2.2] font-light">
                    {item.content}
                </div>
            </div>
        </div>
    );
};

const ProjectDetails = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
    const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState({
        secHead: false,
        gallery: false,
        infoWrap: false,
        accordion: false,
        projBlock: false,
        ctaRow: false
    });
    const [isMounted, setIsMounted] = useState(false);

    const sectionRefs = {
        secHead: useRef(null),
        gallery: useRef(null),
        infoWrap: useRef(null),
        accordion: useRef(null),
        projBlock: useRef(null),
        ctaRow: useRef(null)
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Scroll reveal observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target.getAttribute('data-section');
                        if (target) {
                            setIsRevealed(prev => ({ ...prev, [target]: true }));
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
        );

        Object.keys(sectionRefs).forEach((key) => {
            if (sectionRefs[key].current) {
                sectionRefs[key].current.setAttribute('data-section', key);
                observer.observe(sectionRefs[key].current);
            }
        });

        return () => observer.disconnect();
    }, []);

    // Lightbox handlers
    const openLightbox = (index) => {
        setCurrentLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const prevImage = () => {
        setCurrentLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const nextImage = () => {
        setCurrentLightboxIndex((prev) => (prev + 1) % galleryImages.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen]);

    return (
        <div className="bg-[#060606] min-h-screen overflow-x-hidden font-syne font-barlow text-[#f2f2f0]">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10 bg-noise" />

            {/* Hero Section */}
            <section className="relative h-screen min-h-[560px] overflow-hidden flex items-end">
                {/* Background */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center animate-zoom"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=85')",
                            transform: 'scale(1)'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,9,0.95)] via-[rgba(8,8,9,0.4)] to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,8,9,0.5)] to-transparent" />
                </div>

                {/* Grain overlay */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-noise" />

                {/* Corner decor */}
                <div className="absolute bottom-[52px] right-[52px] w-[100px] h-[100px] border-r border-white/22 border-b border-white/22 opacity-0 animate-fadeIn [animation-delay:1.8s] pointer-events-none hidden md:block" />

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

                {/* Hero content */}
                <div className="relative z-10 w-[91%]  mx-auto mb-20 opacity-0 translate-y-12 animate-slideUp [animation-delay:0.4s]">
                    <div className="flex items-center gap-3.5 mb-6">
                        <div className="w-8 h-[2px] bg-[#F57500] rounded-sm" />
                        <span className="font-barlow-condensed text-[10px] tracking-[5px] uppercase text-[#F57500] font-semibold">
                          Portfolio · Case Study
                        </span>
                    </div>
                    <h1 className={`font-oswald uppercase text-[clamp(3.9rem,13vw,10.5rem)] leading-[0.87] tracking-[-3px] text-white mb-8 `}>
                        OUR <span className="inline-block [-webkit-text-stroke:1.8px_#fff] text-transparent skew-x-[-3deg]"> FINEST</span><br /><span className="text-[#F57500]">WORK</span>
                    </h1>
                    <div className="flex items-end justify-between mt-10 pt-2 border-t border-white/10 flex-wrap gap-5">
                        <p className="font-cormorant italic text-[0.95rem] md:text-[1.12rem] text-white/60 leading-relaxed max-w-full md:max-w-[340px]">
                            Bold identities that echo across mediums — crafted with <em className="not-italic text-white/80">intent</em>, built for <em className="not-italic text-white/80">distinction</em>.
                        </p>
                        <div className="flex gap-2.5 flex-wrap items-center">
                            <div className="font-barlow-condensed text-[9px] tracking-[3px] uppercase text-[#a8a8b0] py-1.5 px-3 border border-[rgba(255,255,255,0.1)] rounded-[1px] bg-white/4 transition-all duration-250 hover:border-[#F57500] hover:text-[#F57500] hover:bg-[rgba(245,117,0,0.12)]">
                                Client&ensp;<b className="text-white font-semibold">Envato</b>
                            </div>
                            <div className="font-barlow-condensed text-[9px] tracking-[3px] uppercase text-[#a8a8b0] py-1.5 px-3 border border-[rgba(255,255,255,0.1)] rounded-[1px] bg-white/4 transition-all duration-250 hover:border-[#F57500] hover:text-[#F57500] hover:bg-[rgba(245,117,0,0.12)]">
                                Year&ensp;<b className="text-white font-semibold">2019</b>
                            </div>
                            <div className="font-barlow-condensed text-[9px] tracking-[3px] uppercase text-[#a8a8b0] py-1.5 px-3 border border-[rgba(255,255,255,0.1)] rounded-[1px] bg-white/4 transition-all duration-250 hover:border-[#F57500] hover:text-[#F57500] hover:bg-[rgba(245,117,0,0.12)]">
                                Type&ensp;<b className="text-white font-semibold">Design</b>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="bg-[#080809]">
                <div className="w-[91%] mx-auto">
                    {/* Section Header */}
                    <div
                        ref={sectionRefs.secHead}
                        className={`pt-22 md:pt-[88px] relative overflow-visible transition-all duration-850 ${
                            isRevealed.secHead ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[38px]'
                        }`}
                    >
                        <div className="absolute -right-2 top-3 font-oswald text-[clamp(130px,20vw,260px)] font-bold text-[rgba(255,255,255,0.05)] leading-none select-none pointer-events-none hidden md:block writing-vertical rotate-180">
                            01
                        </div>
                        <div className="inline-flex items-center gap-2.5 mb-[18px]">
                            <div className="w-1.5 h-1.5 bg-[#F57500] rounded-full flex-shrink-0" />
                            <span className="font-barlow-condensed text-[9px] tracking-[4px] uppercase text-[#646470]">The Brief</span>
                        </div>
                        <h2 className="font-oswald text-[clamp(24px,4vw,38px)] font-semibold text-[#f2f2f0] tracking-[2px] uppercase mb-3">
                            Kent Brant Concept
                        </h2>
                        <p className="text-[#646470] text-[12px] tracking-[1px] leading-[1.9] uppercase max-w-[540px] font-light">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.
                        </p>
                        <div className="h-px bg-[rgba(255,255,255,0.05)] my-10 md:my-[52px]" />
                    </div>

                    {/* Gallery */}
                    <div
                        ref={sectionRefs.gallery}
                        className={`grid grid-cols-1 md:grid-cols-2 gap-[3px] mb-[72px] transition-all duration-600 ${
                            isRevealed.gallery ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                            gridTemplateRows: 'repeat(2, 235px)' // This creates 3 equal rows
                        }}
                    >
                        {galleryImages.map((image, idx) => (
                            <GalleryItem
                                key={image.id}
                                image={image}
                                index={idx}
                                onOpen={openLightbox}
                            />
                        ))}
                    </div>

                    {/* Project Info */}
                    <div
                        ref={sectionRefs.infoWrap}
                        className={`pb-[72px] transition-all duration-850 ${
                            isRevealed.infoWrap ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[38px]'
                        }`}
                    >
                        <div className="inline-flex items-center gap-2.5 mb-4">
                            <div className="w-6 h-px bg-[#F57500]" />
                            <span className="font-barlow-condensed text-[9px] tracking-[4px] uppercase text-[#F57500] font-semibold">Project Info</span>
                        </div>
                        <h3 className="font-oswald text-[clamp(26px,4vw,36px)] font-semibold text-[#f2f2f0] tracking-[1px] mb-6">
                            About This Work
                        </h3>
                        <p className="text-[#a8a8b0] text-sm leading-[2.2] font-light max-w-[800px]">
                            Vestibulum orci felis, ullamcorper non condimentum non, ultrices ac nunc. Mauris non ligula suscipit, vulputate mi accumsan, dapibus felis. Nullam sed sapien dui. Nulla auctor sit amet sem non porta. Integer iaculis tellus nulla, quis imperdiet magna venenatis vitae. Ut nec hinc dolor possim. An eros argumentum vel, elit diceret duo eu.<br /><br />
                            Cu nam tale ferri utroque, eu habemus albucius mel, cu vidit possit ornatus eum. Eu ius postulant salutatus definitionem, explicari graeci viderer qui ut, at habeo facer solet usu. Pri choro pertinax indoctum ne, ad partiendo persecuti forensibus est.
                        </p>
                    </div>

                    {/* Process Section */}
                    <div className="pt-0">
                        <div className="inline-flex items-center gap-2.5 mb-[18px]">
                            <div className="w-1.5 h-1.5 bg-[#F57500] rounded-full flex-shrink-0" />
                            <span className="font-barlow-condensed text-[9px] tracking-[4px] uppercase text-[#646470]">Process</span>
                        </div>
                        <h2 className="font-oswald text-[clamp(24px,4vw,38px)] font-semibold text-[#f2f2f0] tracking-[2px] uppercase mb-3">
                            The Brief
                        </h2>
                        <div className="h-px bg-[rgba(255,255,255,0.05)] mt-[30px] mb-[52px]" />
                    </div>

                    {/* Accordion */}
                    <div
                        ref={sectionRefs.accordion}
                        className={`mb-[72px] transition-all duration-850 ${
                            isRevealed.accordion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[38px]'
                        }`}
                    >
                        {accordionItems.map((item, idx) => (
                            <AccordionItem
                                key={idx}
                                item={item}
                                isOpen={openAccordionIndex === idx}
                                onToggle={() => setOpenAccordionIndex(openAccordionIndex === idx ? -1 : idx)}
                            />
                        ))}
                    </div>

                    {/* Project Details Block */}
                    <div
                        ref={sectionRefs.projBlock}
                        className={`flex flex-col md:flex-row mb-13 border border-[rgba(255,255,255,0.06)] rounded-[2px] overflow-hidden transition-all duration-500 hover:border-[rgba(255,255,255,0.1)] ${
                            isRevealed.projBlock ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className="flex-1 p-[28px_22px] md:p-[48px_52px] flex flex-col justify-center gap-5 bg-[#0f0f11]">
                            {projectDetails.map((detail, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-0 transition-all duration-500 ${
                                        isRevealed.projBlock ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[18px]'
                                    }`}
                                    style={{ transitionDelay: `${idx * 90}ms` }}
                                >
                                      <span className="font-barlow-condensed text-[9px] tracking-[2px] text-[#3a3a42] uppercase w-6 flex-shrink-0">
                                        {detail.index}
                                      </span>
                                    <span className="font-barlow-condensed text-[10px] tracking-[3px] text-[#646470] uppercase min-w-[92px]">
                                        {detail.key}
                                      </span>
                                    <span className="text-[#3a3a42] mx-3 text-[11px]">·</span>
                                    <span className={`font-barlow-condensed text-[11px] tracking-[2px] uppercase font-semibold ${
                                        detail.highlight ? 'text-[#F57500]' : 'text-[#f2f2f0]'}`}>
                                        {detail.value}
                                      </span>
                                </div>
                            ))}
                        </div>
                        <div className="w-full md:w-[150px] bg-[#161618] flex items-center justify-center border-l border-[rgba(255,255,255,0.06)] md:border-l md:border-t-0">
                          <span className="font-barlow-condensed text-[9px] tracking-[9px] font-semibold uppercase text-[#F57500] writing-vertical rotate-180 md:rotate-180 py-4 md:py-0">
                            Details
                          </span>
                        </div>
                    </div>

                    {/* CTA Row */}
                    <div
                        ref={sectionRefs.ctaRow}
                        className={`flex flex-col md:flex-row items-start md:items-center gap-5 mb-24 transition-all duration-850 ${
                            isRevealed.ctaRow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[38px]'
                        }`}
                    >
                        <a href="#" className="inline-flex items-center gap-3.5 bg-[#F57500] text-white font-barlow-condensed text-[11px] tracking-[4px] font-semibold uppercase no-underline h-13 px-8 relative overflow-hidden cursor-pointer rounded-[2px] transition-transform duration-200 hover:scale-97 group">
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                            View Project
                            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white stroke-[2.2] fill-none">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                        <a href="#" className="inline-flex items-center gap-2.5 bg-transparent text-[#a8a8b0] font-barlow-condensed text-[11px] tracking-[4px] font-semibold uppercase no-underline h-13 px-7 border border-[rgba(255,255,255,0.1)] cursor-pointer rounded-[2px] transition-all duration-250 hover:border-[#F57500] hover:text-[#F57500] hover:bg-[rgba(245,117,0,0.12)] group">
                            Download Case
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2 transition-transform duration-250 group-hover:-rotate-45">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </a>
                    </div>


                </div>
            </main>

            {/* Lightbox */}
            <Lightbox
                isOpen={lightboxOpen}
                currentIndex={currentLightboxIndex}
                images={galleryImages}
                onClose={closeLightbox}
                onPrev={prevImage}
                onNext={nextImage}
            />

            {/* Global Styles */}
            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Oswald:wght@500;700&family=Roboto:wght@500&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

                .font-oswald {
                    font-family: 'Oswald', sans-serif;
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
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .rotate-180 {
          transform: rotate(180deg);
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        @media (max-width: 960px) {
          .gallery {
            grid-template-rows: repeat(4, 200px);
          }
        }
        @media (max-width: 640px) {
          .gallery {
            grid-template-rows: none;
          }
        }
        .hover\\:scale-97:hover {
          transform: scale(0.97);
        }
        .hover\\:scale-108:hover {
          transform: scale(1.08) translateY(-50%);
        }
        .group\\:hover\\:translate-x-full {
          transform: translateX(100%);
        }
      `}</style>
        </div>
    );
};


export default ProjectDetails;