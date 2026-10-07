import React, { useState, useEffect, useRef, useCallback } from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    const [typewriterText, setTypewriterText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);
    const dimensionsRef = useRef({ width: 0, height: 0 });

    const phrases = [
        'Available for freelance work_',
        'Building bold digital products_',
        'Based in New York, USA_',
        'Open to new projects in 2026_',
    ];

    // Typewriter effect
    useEffect(() => {
        const phrase = phrases[phraseIndex];
        let timeout;

        if (!isDeleting) {
            if (charIndex <= phrase.length) {
                setTypewriterText(phrase.slice(0, charIndex));
                timeout = setTimeout(() => setCharIndex(charIndex + 1), 65);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 1800);
            }
        } else {
            if (charIndex >= 0) {
                setTypewriterText(phrase.slice(0, charIndex));
                timeout = setTimeout(() => setCharIndex(charIndex - 1), 35);
            } else {
                setIsDeleting(false);
                setPhraseIndex((phraseIndex + 1) % phrases.length);
                timeout = setTimeout(() => setCharIndex(0), 400);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, phraseIndex]);

    // Canvas network animation
    const PARTICLE_COUNT = 65;
    const MAX_DIST = 150;

    const initParticles = useCallback((width, height) => {
        const particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.32,
                vy: (Math.random() - 0.5) * 0.32,
                r: Math.random() * 1.6 + 0.7,
                isOrange: Math.random() < 0.2,
            });
        }
        return particles;
    }, []);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.parentElement) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        dimensionsRef.current = { width, height };
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        particlesRef.current = initParticles(width, height);
    }, [initParticles]);

    const animateNetwork = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const { width, height } = dimensionsRef.current;
        if (!ctx || width === 0 || height === 0) return;

        ctx.clearRect(0, 0, width, height);

        // Update positions
        for (let p of particlesRef.current) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) { p.x = 0; p.vx *= -1; }
            if (p.x > width) { p.x = width; p.vx *= -1; }
            if (p.y < 0) { p.y = 0; p.vy *= -1; }
            if (p.y > height) { p.y = height; p.vy *= -1; }
        }

        // Draw lines
        for (let i = 0; i < particlesRef.current.length; i++) {
            for (let j = i + 1; j < particlesRef.current.length; j++) {
                const a = particlesRef.current[i];
                const b = particlesRef.current[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                if (dist < MAX_DIST) {
                    const intensity = 1 - dist / MAX_DIST;
                    let alpha = intensity * 0.22;
                    let isOrangeLine = a.isOrange || b.isOrange;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = isOrangeLine ? `rgba(245, 117, 0, ${alpha * 1.3})` : `rgba(255, 255, 255, ${alpha * 0.8})`;
                    ctx.lineWidth = 0.65;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        for (let p of particlesRef.current) {
            if (p.isOrange) {
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
                gradient.addColorStop(0, 'rgba(245, 117, 0, 0.35)');
                gradient.addColorStop(1, 'rgba(245, 117, 0, 0)');
                ctx.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.isOrange ? 'rgba(245, 117, 0, 0.9)' : 'rgba(255, 255, 255, 0.55)';
            ctx.fill();
        }

        animationRef.current = requestAnimationFrame(animateNetwork);
    }, []);

    useEffect(() => {
        resizeCanvas();
        animateNetwork();

        let resizeTimeout;
        const handleResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => resizeCanvas(), 100);
        };
        window.addEventListener('resize', handleResize);

        const resizeObserver = new ResizeObserver(() => resizeCanvas());
        if (canvasRef.current && canvasRef.current.parentElement) {
            resizeObserver.observe(canvasRef.current.parentElement);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            resizeObserver.disconnect();
        };
    }, [resizeCanvas, animateNetwork]);

    const handleSubscribe = (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('subEmail');
        const email = emailInput?.value.trim();
        if (!email || !email.includes('@') || !email.includes('.')) {
            alert('Please enter a valid email address.');
            return;
        }
        alert(`Thanks! We'll notify ${email} about updates.`);
        if (emailInput) emailInput.value = '';
    };


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#1e1e1e] sticky overflow-hidden w-full">

            <canvas ref={canvasRef} id="net-canvas"
                    className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-45"/>
            <div className="grid-overlay"></div>
            {/*<div className="glow-orb"></div>*/}

            <style>{`
            :root {
              --orange: #F57500;
              --glow-orange: rgba(245, 117, 0, 0.25);
            }
            
            .grid-overlay {
              position: absolute;
              inset: 0;
              background-image: 
                linear-gradient(var(--orange) 1px, transparent 1px),
                linear-gradient(90deg, var(--orange) 1px, transparent 1px);
              background-size: 55px 55px;
              opacity: 0.035;
              pointer-events: none;
              z-index: 1;
              animation: gridPulse 8s ease-in-out infinite;
            }

            @keyframes gridPulse {
              0%, 100% { opacity: 0.03; }
              50% { opacity: 0.07; }
            }

            

            @keyframes orbFloat {
              0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
              50% { transform: translate(40px, 25px) scale(1.15); opacity: 0.8; }
            }
        
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes lineDown {
          from { height: 0; }
          to { height: 100%; }
        }
        @keyframes lineRight {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tw-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(77,255,114,0.5); }
          50% { box-shadow: 0 0 0 7px rgba(77,255,114,0); }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .ticker-animation {
          animation: ticker 22s linear infinite;
        }
        .brand-sidebar::after {
          content: '';
          position: absolute;
          top: 0;
          right: -1px;
          width: 2px;
          height: 0;
          background: #F57500;
          animation: lineDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }
        @media (max-width: 768px) {
          .brand-sidebar::after {
            top: auto;
            bottom: -1px;
            right: 0;
            width: 0;
            height: 2px;
            animation: lineRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          }
        }
        .section-label-animation {
          animation: fadeUp 0.6s forwards;
        }
        .about-text-animation {
          animation: fadeUp 0.6s forwards 0.6s;
        }
        .btn-animation {
          animation: fadeUp 0.6s forwards 0.75s;
        }
        .socials-animation {
          animation: fadeUp 0.6s forwards 0.9s;
        }
        .email-row-animation {
          animation: fadeUp 0.6s forwards 0.75s;
        }
        .contacts-animation {
          animation: fadeUp 0.6s forwards 0.9s;
        }
        .brand-text {
              writing-mode: vertical-rl;
              transform: rotate(180deg);
              font-size: clamp(2.8rem, 8vw, 4.8rem);
              letter-spacing: 0.08em;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 0.07);
              user-select: none;
              line-height: 1;
            }
            @media screen and (max-width: 768px) {
              .brand-text {
                writing-mode: horizontal-tb;
                transform: rotate(0deg);
                font-size: 2.5rem;
                text-align: center;
              }
             }
      `}</style>

            {/* Ticker */}
            <div
                className="border-t-2 border-[#F57500] border-b border-white/10  py-3.5 overflow-hidden">
                <div className="flex gap-0 w-max ticker-animation">
                    {[...Array(2)].map((_, i) => (
                        <React.Fragment key={i}>
                            <span
                                className="font-['Barlow_Condensed'] text-lg tracking-[0.15em] text-[#F57500] px-10 whitespace-nowrap font-oswald  before:content-['◆'] before:mr-10 before:opacity-50">Available for Freelance</span>
                            <span
                                className="font-['Barlow_Condensed'] text-lg tracking-[0.15em] text-[#F57500] px-10 whitespace-nowrap font-oswald before:content-['◆'] before:mr-10 before:opacity-50">UI/UX Design</span>
                            <span
                                className="font-['Barlow_Condensed'] text-lg tracking-[0.15em] text-[#F57500] px-10 whitespace-nowrap font-oswald before:content-['◆'] before:mr-10 before:opacity-50">Frontend Development</span>
                            <span
                                className="font-['Barlow_Condensed'] text-lg tracking-[0.15em] text-[#F57500] px-10 whitespace-nowrap font-oswald before:content-['◆'] before:mr-10 before:opacity-50">Motion Design</span>
                            <span
                                className="font-['Barlow_Condensed'] text-lg tracking-[0.15em] text-[#F57500] px-10 whitespace-nowrap font-oswald before:content-['◆'] before:mr-10 before:opacity-50">Brand Identity</span>
                            <span
                                className="font-['Barlow_Condensed'] text-lg tracking-[0.15em] text-[#F57500] px-10 whitespace-nowrap font-oswald before:content-['◆'] before:mr-10 before:opacity-50">Web Strategy</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Main Footer Grid */}
            <div className="grid grid-cols-[100px_1fr_1fr] max-md:grid-cols-1 relative z-1">
                {/* Brand Sidebar */}
                <div
                    className="brand-sidebar border-r border-white/10 flex items-center justify-center py-8 relative bg-transparent max-md:border-r-0 max-md:border-b">
                    <div className="brand-text font-oswald uppercase ">
                        L.Rashmika
                    </div>
                </div>

                {/* Left Column - About */}
                <div className="col-left p-[55px_40px_50px] max-md:p-10 max-sm:p-8 max-[480px]:p-[32px_20px]">
                    <div
                        className="flex items-center gap-3.5 font-oswald uppercase text-[1.55rem] font-semibold tracking-[0.2em]  text-white/35 mb-7 opacity-0 section-label-animation max-md:text-base">
                        <span className="text-[#F57500] text-[1.65rem] font-oswald uppercase">01.</span> About Me
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>
                    <p className="text-sm font-light leading-[1.95] text-white/45 mb-8 opacity-0 about-text-animation max-sm:text-[0.82rem]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla
                        finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus
                        suscipit, et pulvinar nisi tincidunt. Curabitur convallis fringilla diam sed aliquam.
                    </p>

                    {/* Typewriter */}
                    <div className="flex items-center gap-2.5 mb-10">
                        <div
                            className="w-1.5 h-1.5 rounded-full bg-[#4dff72] animate-[tw-pulse_1.8s_ease-in-out_infinite] flex-shrink-0"/>
                        <div id="typewriter" className=" text-xs tracking-[0.1em] text-white/45">
                            {typewriterText}<span
                            className="inline-block w-0.5 h-3.5 bg-[#F57500] ml-0.5 align-middle animate-[blink_0.9s_step-end_infinite]"></span>
                        </div>
                    </div>

                    <Link to="/portfolio"
                       className="inline-block py-3 px-8 border border-white/20  text-[0.72rem] font-bold tracking-[0.28em] uppercase text-white no-underline relative overflow-hidden transition-colors duration-400 opacity-0 btn-animation bg-transparent cursor-pointer hover:border-[#F57500] group" >
                        <span className="relative z-10">My Portfolio</span>
                        <span
                            className="absolute inset-0 bg-[#F57500] -translate-x-full group-hover:translate-x-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.77,0,0.18,1)]"></span>
                    </Link>

                    {/* Social Icons */}
                    <div className="flex gap-3 mt-8 opacity-0 socials-animation flex-wrap">
                        {['facebook', 'instagram', 'twitter', 'linkedin'].map((social) => (
                            <a key={social} href="#"
                               className="w-[46px] h-[46px] rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/60 no-underline relative overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] backdrop-blur-sm hover:border-[#F57500] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_20px_rgba(245,117,0,0.25)] hover:text-white group">
                                <span
                                    className="absolute inset-0 bg-[#F57500] rounded-full scale-0 group-hover:scale-100 transition-transform duration-400 ease-[cubic-bezier(0.34,1.2,0.64,1)] z-0"></span>
                                <svg
                                    className="relative z-1 w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110"
                                    viewBox="0 0 24 24" fill="currentColor">
                                    {social === 'facebook' &&
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>}
                                    {social === 'instagram' && (
                                        <>
                                            <rect x="2" y="2" width="20" height="20" rx="5" fill="none"
                                                  stroke="currentColor" strokeWidth="2"/>
                                            <circle cx="12" cy="12" r="4"/>
                                            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                                        </>
                                    )}
                                    {social === 'twitter' && <path
                                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>}
                                    {social === 'linkedin' && (
                                        <>
                                            <path
                                                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                                            <circle cx="4" cy="4" r="2"/>
                                        </>
                                    )}
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Column - Subscribe / Contacts */}
                <div
                    className="col-right p-[55px_40px_50px] max-md:p-10 max-sm:p-8 max-[480px]:p-[32px_20px] border-l border-white/10 max-md:border-l-0 max-md:border-t">
                    <div
                        className="flex items-center gap-3.5 font-oswald text-[1.55rem] font-semibold tracking-[0.2em] uppercase text-white/35 mb-7 opacity-0 section-label-animation max-md:text-base">
                        <span className="text-[#F57500] text-[1.65rem]">02.</span> Subscribe / Contacts
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>
                    <p className="text-sm font-light leading-[1.95] text-white/45 mb-7 opacity-0 about-text-animation max-sm:text-[0.82rem]">
                        Want to be notified when we launch a new template or an update? Just sign up and we'll send you
                        a notification by email.
                    </p>

                    {/* Email Row */}
                    <form onSubmit={handleSubscribe}
                          className="flex mb-9 opacity-0 email-row-animation flex-nowrap w-full bg-black/20 max-md:flex-col max-md:gap-3 max-md:bg-transparent">
                        <input
                            id="subEmail"
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 h-[54px] px-5 bg-white/5 border border-white/12 font-oswald border-r-0 text-white font-['Barlow'] text-sm outline-none transition-all duration-300 min-w-0 focus:border-[rgba(245,117,0,0.6)] focus:bg-[rgba(245,117,0,0.06)] focus:shadow-[inset_0_0_6px_rgba(245,117,0,0.1)] max-md:border-r max-md:w-full max-md:py-3.5"
                        />
                        <button type="submit"
                                className="h-[54px] px-8 bg-[#F57500] border-none text-white font-['Barlow_Condensed'] text-xs font-bold tracking-[0.2em] uppercase cursor-pointer flex items-center gap-2.5 transition-all duration-300 whitespace-nowrap relative overflow-hidden hover:bg-[#d96600] hover:scale-[1.01] hover:shadow-[0_2px_12px_rgba(245,117,0,0.4)] max-md:w-full max-md:justify-center max-md:py-3.5 max-md:h-[50px] font-oswald">
                            <span
                                className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-[left] duration-500 ease hover:left-full"></span>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                            Send
                        </button>
                    </form>

                    {/* Contacts */}
                    <div className="flex flex-col gap-0 opacity-0 contacts-animation ">
                        {[
                            {icon: 'phone', label: 'Phone :', value: '+489 756 412 322'},
                            {icon: 'email', label: 'Email :', value: 'yourmail@domain.com'},
                            {icon: 'address', label: 'Address', value: 'USA 27th Brooklyn NY'}
                        ].map((contact, idx) => (
                            <div key={idx}
                                 className="flex items-center gap-[18px] py-4 border-b border-white/5 transition-all duration-250 ease hover:bg-[rgba(245,117,0,0.05)] hover:pl-2 hover:border-b-[rgba(245,117,0,0.3)] hover:translate-x-1 cursor-default ">
                                <span
                                    className="text-[#F57500] w-5 flex-shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                       strokeWidth="2">
                                    {contact.icon === 'phone' && <path
                                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 2.02 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>}
                                      {contact.icon === 'email' && (
                                          <>
                                              <path
                                                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                              <polyline points="22,6 12,13 2,6"/>
                                          </>
                                      )}
                                      {contact.icon === 'address' && (
                                          <>
                                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                                              <circle cx="12" cy="10" r="3"/>
                                          </>
                                      )}
                                  </svg>
                                </span>
                                <span
                                    className="font-['Barlow_Condensed'] text-[0.62rem] font-semibold tracking-[0.28em] uppercase text-white/35 min-w-[70px] transition-colors duration-200 max-md:min-w-[60px] group-hover:text-[#F57500] font-oswald">{contact.label}</span>
                                <span
                                    className="font-['Barlow_Condensed'] text-sm font-medium tracking-[0.03em] text-white/80 break-words transition-colors duration-200 max-md:text-[0.82rem] group-hover:text-white font-oswald">{contact.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Footer Bottom Bar */}
            <div
                className="border-t border-white/10 py-[18px] px-[50px] max-md:px-7 max-md:flex-col max-md:items-start relative z-1">
                <p className="text-[0.65rem] font-normal tracking-[0.22em] uppercase text-white">
                    © Portfolio 2026 &nbsp;/&nbsp; All Rights Reserved.
                </p>
                <button onClick={scrollToTop}
                        className="absolute right-0 bottom-0 w-14 h-[68px] bg-[#F57500] cursor-pointer flex flex-col items-center justify-center text-white transition-all duration-250 hover:bg-[#d96600] hover:-translate-y-0.5 max-md:relative max-md:w-full max-md:h-[52px] max-md:flex-row max-md:gap-3 group">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                         strokeLinecap="round" strokeLinejoin="round"
                         className="transition-transform duration-300 group-hover:-translate-y-1 max-md:group-hover:-translate-y-0.5">
                        <polyline points="18 15 12 9 6 15"/>
                    </svg>
                </button>
            </div>

        </footer>

    );
};

export default Footer;