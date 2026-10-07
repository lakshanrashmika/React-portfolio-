import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Parallax, Navigation, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/parallax';
import AboutSection from "./AboutSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import FactsSection from "./FactsSection.jsx";
import ResumeSection from "./ResumeSection.jsx";
import AutoSliderSection from "./AutoSliderSection.jsx";
import ScrollText from "./ScrollText.jsx";
import ProjectSliderSection from "./ProjectSliderSection.jsx";
import SkillSection from "./SkillSection.jsx";
import FooterCTA from "./FooterCTA.jsx";

const HeroSection = () => {
    const [textSwiper, setTextSwiper] = useState(null);
    const [imageSwiper, setImageSwiper] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);

    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (textSwiper) {
            if (isPlaying) {
                textSwiper.autoplay.stop();
            } else {
                textSwiper.autoplay.start();
            }
        }
        if (imageSwiper) {
            if (isPlaying) {
                imageSwiper.autoplay.stop();
            } else {
                imageSwiper.autoplay.start();
            }
        }
    };

    useEffect(() => {
        if (textSwiper && imageSwiper) {
            textSwiper.controller.control = imageSwiper;
            imageSwiper.controller.control = textSwiper;
        }
    }, [textSwiper, imageSwiper]);


    const slides = [
        {
            id: 1,
            title: "Lakshan Rashmika -",
            subtitle: "Associate Software Engineer from Sri Lanka",
            description:
                "Passionate about building modern, scalable, and high-performance web applications with clean code, creative UI experiences, and smooth interactions.",
            header: "Welcome to My Portfolio",
            btnText: "Explore Portfolio",
            btnLink: "#portfolio",
            bgImage:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
        },
        {
            id: 2,
            title: "Creative UI/UX",
            subtitle: "designed for modern experiences",
            description:
                "Designing visually engaging and user-friendly interfaces focused on usability, responsiveness, accessibility, and seamless digital interaction.",
            header: "UI / UX Design",
            btnText: "View Projects",
            btnLink: "#project",
            bgImage:
                "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80"
        },
        {
            id: 3,
            title: "Frontend Development",
            subtitle: "powered by modern technologies",
            description:
                "Developing responsive and interactive applications using React, JavaScript, Tailwind CSS, and modern frontend frameworks for exceptional performance.",
            header: "Development Skills",
            btnText: "My Skills",
            btnLink: "#skills",
            bgImage:
                "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
        },
        {
            id: 4,
            title: "Innovative Solutions",
            subtitle: "for digital transformation",
            description:
                "Transforming ideas into impactful digital solutions through creativity, problem-solving, modern technologies, and performance-focused development.",
            header: "Creative Engineering",
            btnText: "About Me",
            btnLink: "#about",
            bgImage:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        }
    ];

    const calculateProgress = (index) => {
        const progress = ((index + 1) / slides.length) * 100;
        const getRadius = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth < 640) return 15;
                if (window.innerWidth < 1024) return 19;
                return 23;
            }
            return 23; // Default value for SSR
        };
        const radius = getRadius();
        const circumference = 2 * Math.PI * radius;
        return circumference - (progress / 100) * circumference;
    };

    const getCircleAttributes = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return { cx: 16, cy: 16, r: 15 };
            if (window.innerWidth < 1024) return { cx: 20, cy: 20, r: 19 };
            return { cx: 24, cy: 24, r: 23 };
        }
        return { cx: 24, cy: 24, r: 23 }; // Default values for SSR
    };

    const circleAttrs = getCircleAttributes();

    return (
        <div className="z-20">

        <div className="min-h-[92.5vh] bg-[#292929] text-white font-sans overflow-hidden relative">

            {/* Main Content */}
            <div className="relative min-h-[80vh]">
                <div className="hero-wrapper relative min-h-[92.5vh] overflow-hidden">
                    {/* Decorative Circle - Hidden on mobile */}
                    <div className="hc_dec hidden lg:block absolute w-[450px] h-[450px] rounded-full border border-white/20 shadow-[0_0_0_52px_rgba(255,255,255,0.05)] left-1/4 -ml-[265px] top-1/2 -mt-[245px] z-2 bg-white/5
                        before:content-[''] before:absolute before:top-1/2 before:right-24 before:left-[-120px] before:h-px before:bg-white/20
                        after:content-[''] after:absolute after:left-[-120px] after:w-2 after:h-2 after:rounded-full after:top-1/2 after:-mt-1 after:transition-all after:duration-500 after:ease-in-out after:scale-100 after:bg-orange-500">
                    </div>

                    {/* Text Slider */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center lg:justify-start">
                        <Swiper
                            modules={[Navigation, Autoplay, Parallax, Controller]}
                            speed={1200}
                            parallax={true}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            navigation={{
                                nextEl: '.hsc-next',
                                prevEl: '.hsc-prev',
                            }}
                            onSwiper={setTextSwiper}
                            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
                            className="h-full w-full "
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={slide.id}>
                                    <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-0 mt-16 sm:mt-20 lg:mt-0 lg:absolute lg:left-1/4 lg:top-1/2 transform lg:-translate-y-1/2 lg:-translate-x-1/4 max-w-5xl mx-auto lg:mx-52 xl:mx-40">
                                        <div className="text-xs sm:text-sm uppercase tracking-widest font-bold text-center lg:text-left pb-3 sm:pb-4 lg:pb-5 text-orange-500">
                                            {slide.header}
                                        </div>
                                        <h1 className="text-[2.75rem] xl:text-6xl 2xl:text-8xl font-bold uppercase leading-tight text-center lg:text-left font-oswald mb-3 sm:mb-4 lg:mb-6">
                                            {slide.title} <br/>
                                            <span className="text-white">{slide.subtitle}</span>
                                        </h1>
                                        <p className="text-xs sm:text-sm md:text-base text-white text-opacity-90 text-center lg:text-justify max-w-lg mx-auto lg:mx-0 leading-relaxed mb-4 sm:mb-6 lg:mb-8 px-4 sm:px-0">
                                            {slide.description}
                                        </p>
                                        <div className="text-center lg:text-left px-4 sm:px-0">
                                            <a href={slide.btnLink} className="btn-2 inline-block">
                                                <span className="relative z-10 group-hover:translate-x-3 transition-transform duration-300 flex items-center justify-center lg:justify-start">{slide.btnText}</span>
                                            </a>
                                            {/*<a*/}
                                            {/*    href={slide.btnLink}*/}
                                            {/*    className="btn ajax fl-btn color-bg inline-block text-xs sm:text-sm group relative overflow-hidden"*/}
                                            {/*>*/}
                                            {/*  <span className="relative z-10 group-hover:translate-x-3 transition-transform duration-300 flex items-center justify-center lg:justify-start">*/}
                                            {/*    {slide.btnText}*/}
                                            {/*  </span>*/}
                                            {/*    <div className="absolute inset-0 bg-orange-600 w-0 group-hover:w-full transition-all duration-300"></div>*/}
                                            {/*</a>*/}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Image Slider */}
                    <div className="absolute inset-0 lg:left-1/4 z-10 bg-gray-800 overflow-hidden">
                        <Swiper
                            modules={[Autoplay, Parallax, Controller]}
                            speed={1200}
                            parallax={true}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            onSwiper={setImageSwiper}
                            className="h-full w-full"
                        >
                            {slides.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <div
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
                                        style={{backgroundImage: `url(${slide.bgImage})`}}
                                        data-swiper-parallax="20%"
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#313131] via-[#313131]/70 to-transparent lg:bg-gradient-to-r lg:from-[#313131] lg:via-[#313131]/70 lg:to-transparent"></div>
                                    <div className="absolute inset-0 bg-black bg-opacity-40 lg:bg-opacity-30"></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Corner Decoration - Hidden on mobile */}
                        <div className=" absolute left-48 bottom-9 right-14 top-1/2 border-r border-b border-white border-opacity-10 z-20"></div>
                    </div>

                    {/* Play/Pause Button - Fixed Position */}
                    <div
                        className="absolute right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-30 cursor-pointer"
                        onClick={togglePlay}
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-full relative group">
                            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-orange-500 text-sm sm:text-base transition-all duration-200 ease-in-out ${!isPlaying ? 'ml-1' : ''}`}></i>
                            <div className="absolute -inset-3 border border-white/20 rounded-full transition-all duration-200 ease-in-out group-hover:bg-white/10 group-hover:scale-110 -z-10"></div>
                        </div>
                    </div>

                    {/* Slider Controls */}
                    <div className="hero-slider_control-wrap absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 lg:left-1/4 lg:transform-none lg:bottom-8 z-30 flex items-center space-x-2 sm:space-x-3">
                        <div className="hsc hsc-prev w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                            <i className="fas fa-chevron-left text-xs sm:text-sm"></i>
                        </div>
                        <div className="hsc hsc-next w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                            <i className="fas fa-chevron-right text-xs sm:text-sm"></i>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-12 lg:right-12 z-30">
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
                            <svg className="transform -rotate-90 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
                                <circle
                                    className="circ2"
                                    cx={circleAttrs.cx}
                                    cy={circleAttrs.cy}
                                    r={circleAttrs.r}
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="1"
                                    fill="none"
                                />
                                <circle
                                    className="circ1"
                                    cx={circleAttrs.cx}
                                    cy={circleAttrs.cy}
                                    r={circleAttrs.r}
                                    stroke="#fff"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray={2 * Math.PI * circleAttrs.r}
                                    strokeDashoffset={calculateProgress(currentSlide - 1)}
                                    style={{transition: 'stroke-dashoffset 0.5s ease'}}
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-12 lg:left-20 z-30 font-oswald">
                        <div className="flex items-baseline">
                            <div className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold text-orange-500">
                                {currentSlide.toString().padStart(2, '0')}
                            </div>
                            <div className="text-sm sm:text-base lg:text-lg xl:text-xl text-white text-opacity-40 ml-1 lg:ml-2 relative top-0 sm:top-1 lg:top-2">
                                /{slides.length.toString().padStart(2, '0')}
                            </div>
                        </div>
                    </div>

                    {/* Clone Counter */}
                    <div className="hidden lg:block absolute left-[70px] bottom-[-20px] z-9999 font-oswald
                        [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] text-white/10 text-[184px]
                        before:content-['//'] before:absolute before:bottom-12 before:left-full before:ml-10 before:text-sm before:text-orange-500 before:[-webkit-text-stroke:0px]">
                        <div className="current">{currentSlide.toString().padStart(2, '0')}</div>
                    </div>
                </div>
            </div>


            {/* Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 z-30 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}

            {/* Custom Styles */}
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Oswald:wght@500;700&family=Roboto:wght@500&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

                .font-oswald {
                    font-family: 'Oswald', sans-serif;
                }

                /* Dark Scrollbar Styles */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #313131;
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb {
                    background: #4a4a4a;
                    border-radius: 4px;
                    transition: background 0.2s ease;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #F57500;
                }

                ::-webkit-scrollbar-corner {
                    background: #313131;
                }

                /* For Firefox */
                * {
                    scrollbar-width: thin;
                    scrollbar-color: #F57500 #313131;
                }

                .btn-2 {
                    padding: 12px 30px;
                    position: relative;
                    color: #fff;
                    text-transform: uppercase;
                    font-size: 10px;
                    letter-spacing: 2px;
                    font-weight: 800;
                    background: #F57500;
                    overflow: hidden;
                    display: inline-block;
                    text-decoration: none;
                    //border-radius: 6px;
                    border: 1px solid #F57500;
                }

                /* Text */
                .btn-2 span {
                    position: relative;
                    z-index: 3;
                    transition: all 0.3s ease;
                }

                /* Sliding background */
                .btn-2:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 0;
                    background: #313131;
                    z-index: 1;
                    transition: width 0.3s ease;
                }

                /* Arrow */
                .btn-2:after {
                    content: "→";
                    position: absolute;
                    top: 49%;
                    transform: translateY(-50%);
                    left: -20px;
                    z-index: 2;
                    transition: all 0.3s ease;
                    font-size: 14px;
                }

                /* Hover effects */
                .btn-2:hover:before {
                    width: 100%;
                }

                .btn-2:hover:after {
                    left: 20px;
                }

                .btn-2:hover span {
                    transform: translateX(10px);
                }

                .color-bg{
                    background: #F57500;
                }

                .element-item::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    background: rgba(245, 117, 0, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(1.5);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% {
                        transform: translate(-50%, -50%) scale(1.5);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(2.5);
                        opacity: 0;
                    }
                }

                .share-btn::before {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #F57500;
                    transition: width 0.3s ease;
                }

                .share-btn:hover::before {
                    width: 100%;
                }

                .nav-button:hover span:nth-child(1) {
                    transform: translateY(6px) rotate(45deg);
                }

                .nav-button:hover span:nth-child(2) {
                    opacity: 0;
                }

                .nav-button:hover span:nth-child(3) {
                    transform: translateY(-6px) rotate(-45deg);
                }

                .hc_dec_color {
                    position: fixed;
                    right: 0;
                    height: 80px;
                    width: 30%;
                    top: 0;
                    z-index: 20;
                }

                .hc_dec:after, .hc_dec_color, .hc_dec_color:after{
                    background: #F57500;
                }

                .hc_dec {
                    border-left-color: #F57500;
                }

                .hc_dec{
                    border-right-color: #F57500;
                }

                .hero-slider_control-wrap {
                    position: absolute;
                    left: 30%;
                    bottom: 18px;
                    z-index: 20;
                }

                .hero-slider_control-wrap:before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: -60px;
                    width: 40px;
                    height: 1px;
                    background: rgba(255, 255, 255, 0.2);
                }

                .hsc {
                    float: left;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    background: #3C3C3C;
                    border-radius: 100%;
                    color: #fff;
                    font-size: 14px;
                    margin-right: 4px;
                    cursor: pointer;
                    box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.1);
                    transition: all 0.2s ease-in-out;
                    transform: scale(1.0);
                }

                .hsc:hover {
                    transform: scale(0.9);
                    background: #3C3C3C;
                }

                /* Mobile-specific styles */
                @media (max-width: 1024px) {
                    .hero-wrapper .lg\\:absolute.lg\\:left-1\\/4 {
                        position: relative !important;
                        left: auto !important;
                        top: auto !important;
                        transform: none !important;
                    }

                    
                }

                @media (max-width: 768px) {
                    .text-2xl, .text-3xl, .text-4xl {
                        font-size: 1.75rem !important;
                        line-height: 1.2 !important;
                    }

                    .absolute.inset-0.lg\\:left-1\\/4 {
                        left: 0 !important;
                    }

                    .text-xs.uppercase {
                        font-size: 0.75rem !important;
                    }

                    p.text-xs {
                        font-size: 0.75rem !important;
                        line-height: 1.5 !important;
                    }

                   
                }

                @media (max-width: 480px) {
                    .text-2xl {
                        font-size: 1.5rem !important;
                    }

                    .text-xs.uppercase {
                        font-size: 0.7rem !important;
                    }

                    

                    .hero-slider_control-wrap {
                        bottom: 20px;
                    }
                }

                @media (max-width: 380px) {
                    .text-2xl {
                        font-size: 1.25rem !important;
                    }
                    
                }
            `}</style>
        </div>
            <AboutSection/>
            <ScrollText/>

            <ServicesSection/>
            <FactsSection/>
            <ResumeSection/>
            {/*<AutoSliderSection/>*/}
            <ProjectSliderSection/>
            <SkillSection/>

            <FooterCTA/>
        </div>



    );
};

export default HeroSection;