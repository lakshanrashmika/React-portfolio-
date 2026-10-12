import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const TRAIL_COUNT = 8;

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Certificates', href: '/certificates', hasDropdown: true },
    { label: 'Service', href: '/service' },
    { label: 'Portfolio', href: '/portfolio' },
];

const certificateItems = [
    { label: 'Education', href: '/certificates' },
    { label: 'Ijse Certificates ', href: '/ijse-certificates' },

];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(true);
    const [active, setActive] = useState('home');
    const [mobileCertOpen, setMobileCertOpen] = useState(false);
    const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

    const lastScrollY = useRef(0);

    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const cursorTrailsRef = useRef([]);

    const mousePos = useRef({ x: -200, y: -200 });
    const ringPos = useRef({ x: -200, y: -200 });

    const rafRef = useRef(null);
    const isHovering = useRef(false);
    const isClicking = useRef(false);

    // Header scroll behavior
    useEffect(() => {
        const onScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            if (currentScrollY <= 10) {
                setHeaderVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }
            if (isOpen) {
                setHeaderVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }
            if (currentScrollY > lastScrollY.current) {
                setHeaderVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
                setHeaderVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isOpen]);

    // Close mobile menu on desktop resize
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024 && isOpen) {
                setIsOpen(false);
                setMobileCertOpen(false);
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [isOpen]);

    // Scroll spy
    useEffect(() => {
        const sectionIds = ['/', 'certificates', 'service', 'portfolio', 'contact'];
        const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
        if (!elements.length) return;
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length > 0) setActive(visible[0].target.id);
            },
            { threshold: [0.15, 0.3, 0.5, 0.7], rootMargin: '-68px 0px -30% 0px' }
        );
        elements.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    // Premium cursor
    useEffect(() => {
        const dot = cursorDotRef.current;
        const ring = cursorRingRef.current;
        const trails = cursorTrailsRef.current;
        if (!dot || !ring) return;

        const history = Array(TRAIL_COUNT).fill({ x: -200, y: -200 });
        let historyIdx = 0;

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            history[historyIdx] = { x: e.clientX, y: e.clientY };
            historyIdx = (historyIdx + 1) % history.length;
            dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        };
        const onMouseDown = () => {
            isClicking.current = true;
            ring.classList.add('cursor-click');
            dot.classList.add('cursor-click-dot');
        };
        const onMouseUp = () => {
            isClicking.current = false;
            ring.classList.remove('cursor-click');
            dot.classList.remove('cursor-click-dot');
        };
        const lerp = (a, b, t) => a + (b - a) * t;
        const animate = () => {
            ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.1);
            ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.1);
            ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
            trails.forEach((trail, i) => {
                if (!trail) return;
                const target =
                    i === 0
                        ? mousePos.current
                        : {
                            x: parseFloat(trails[i - 1]?.dataset.x || mousePos.current.x),
                            y: parseFloat(trails[i - 1]?.dataset.y || mousePos.current.y),
                        };
                const speed = 0.18 - i * 0.018;
                const tx = lerp(parseFloat(trail.dataset.x || mousePos.current.x), target.x, speed);
                const ty = lerp(parseFloat(trail.dataset.y || mousePos.current.y), target.y, speed);
                trail.dataset.x = tx;
                trail.dataset.y = ty;
                const scale = (1 - (i / trails.length) * 0.7) * (isHovering.current ? 1.4 : 1);
                const opacity = (1 - i / trails.length) * 0.35;
                trail.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%) scale(${scale})`;
                trail.style.opacity = opacity;
            });
            rafRef.current = requestAnimationFrame(animate);
        };
        const onEnter = () => {
            isHovering.current = true;
            ring.classList.add('cursor-hover');
            dot.classList.add('cursor-hover-dot');
        };
        const onLeave = () => {
            isHovering.current = false;
            ring.classList.remove('cursor-hover');
            dot.classList.remove('cursor-hover-dot');
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        rafRef.current = requestAnimationFrame(animate);

        const targets = document.querySelectorAll('a, button, .hsc, .share-btn, .nav-button, [role="button"]');
        targets.forEach((el) => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            cancelAnimationFrame(rafRef.current);
            targets.forEach((el) => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    const handleMobileToggle = () => setIsOpen((open) => !open);
    const handleMobileNavClick = (label) => {
        setIsOpen(false);
        setMobileCertOpen(false);
        setActive(label.toLowerCase());
    };
    const toggleMobileCert = (e) => {
        e.stopPropagation();
        setMobileCertOpen((open) => !open);
    };
    const toggleDesktopDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDesktopDropdownOpen((open) => !open);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (desktopDropdownOpen && !e.target.closest('.nav-dropdown')) {
                setDesktopDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [desktopDropdownOpen]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @media(min-width: 1024px) {
          *, *::before, *::after { cursor: none !important; }
        }

        /* ==================== HEADER ==================== */
        .hdr {
          position: sticky;
          top: 0; left: 0; right: 0;
          width: 100%;
          z-index: 999;
          font-family: 'Inter', sans-serif;
          transform: translateY(0);
          transition: transform .4s cubic-bezier(.4,0,.2,1), opacity .4s ease;
        }
        .hdr.header-hidden {
          transform: translateY(-110%);
          opacity: 0;
          pointer-events: none;
        }
        .hdr.header-visible {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Accent line */
        .hdr-accent-line {
          height: 2px;
          width: 100%;
          background: #F57500;
          opacity: 0;
          transition: opacity .35s ease;
        }
        .hdr.scrolled .hdr-accent-line { opacity: 1; }

        /* Header bar */
        .hdr-bar {
          position: relative;
          background: #313131;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          transition: background .35s, border-color .35s, box-shadow .35s;
        }
        .hdr.scrolled .hdr-bar {
          background: rgb(49 49 49 / 85%);
          border-bottom-color: rgba(245, 117, 0, 0.12);
          // box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        /* Subtle top glow inside header */
        .hdr-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px 60px at 50% 0%,
            rgba(245, 117, 0, 0.08),
            transparent 70%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity .4s ease;
        }
        .hdr.scrolled .hdr-bar::before { opacity: 1; }

        /* Inner layout */
        .hdr-inner {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          transition: height .35s ease;
        }
        .hdr.scrolled .hdr-inner { height: 62px; }

        /* ==================== LOGO ==================== */
        .logo {
          display: flex;
          align-items: center;
          gap: .75rem;
          text-decoration: none;
          flex-shrink: 0;
          position: relative;
          padding: .25rem 0;
        }
        .logo-mark {
          position: relative;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #F57500 0%, #ff9a3c 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: .85rem;
          color: #0a0a0a;
          letter-spacing: -.02em;
          box-shadow: 0 4px 14px rgba(245, 117, 0, 0.35);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .logo:hover .logo-mark {
          transform: rotate(-6deg) scale(1.05);
          box-shadow: 0 6px 20px rgba(245, 117, 0, 0.5);
        }
        .logo-mark::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 9px;
          background: linear-gradient(135deg, #F57500, #ff9a3c);
          opacity: 0;
          z-index: -1;
          filter: blur(8px);
          transition: opacity .3s ease;
        }
        .logo:hover .logo-mark::after { opacity: .6; }

        .logo-text {
          display: flex;
          flex-direction: column;
          gap: 0;
          line-height: 1;
        }
        .logo-name {
          font-family: 'Space Mono', monospace;
          font-size: .9rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: .02em;
        }
        .logo-tag {
          font-size: .58rem;
          font-weight: 600;
          color: #F57500;
          letter-spacing: .24em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        /* ==================== DESKTOP NAV ==================== */
        .nav {
          display: none;
          align-items: center;
          gap: .15rem;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        @media(min-width: 1024px) { .nav { display: flex; } }

        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: .4rem;
          padding: .55rem .95rem;
          font-size: .74rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .13em;
          color: rgba(240, 236, 228, 0.55);
          text-decoration: none;
          white-space: nowrap;
          background: none;
          border: none;
          font-family: 'Inter', sans-serif;
          border-radius: 7px;
          transition: color .25s ease, background .25s ease;
          z-index: 1;
        }
        .nav-item:hover { color: #F57500; background: rgba(245, 117, 0, 0.06); }
        .nav-item.active { color: #fff; }

        .nav-index {
          font-family: 'Space Mono', monospace;
          font-size: .55rem;
          color: rgba(255, 255, 255, 0.18);
          transition: color .25s ease;
          letter-spacing: 0;
        }
        .nav-item:hover .nav-index { color: #F57500; }
        .nav-item.active .nav-index { color: #F57500; }

        /* Underline */
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 55%;
          height: 2px;
          border-radius: 2px;
          background: #F57500;
          transition: transform .3s cubic-bezier(.4, 0, .2, 1);
          transform-origin: center;
        }
        .nav-item.active::after { transform: translateX(-50%) scaleX(1); }
        .nav-item:hover::after { transform: translateX(-50%) scaleX(.6); }

        /* ==================== DROPDOWN ==================== */
        .nav-dropdown { position: relative; }
        .nav-dropdown .nav-item { gap: .3rem; }

        .dropdown-chevron {
          transition: transform .3s cubic-bezier(.4, 0, .2, 1);
          margin-left: 1px;
        }
        .nav-dropdown.open .dropdown-chevron { transform: rotate(180deg); }

        .dropdown-content {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          min-width: 210px;
          background: rgba(14, 14, 14, 0.96);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 8px;
          opacity: 0;
          visibility: hidden;
          transition: opacity .22s ease, transform .22s ease, visibility .22s;
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(245, 117, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          z-index: 1000;
        }
        .nav-dropdown.open .dropdown-content {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        /* Little arrow notch */
        .dropdown-content::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 10px;
          height: 10px;
          background: rgba(14, 14, 14, 0.96);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .dropdown-content a {
          position: relative;
          display: flex;
          align-items: center;
          gap: .6rem;
          padding: 10px 14px;
          font-size: .7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .11em;
          color: #b8b8b8;
          text-decoration: none;
          border-radius: 8px;
          transition: background .2s, color .2s, transform .2s;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
        }
        .dropdown-content a::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(245, 117, 0, 0.35);
          transition: background .2s, transform .2s, box-shadow .2s;
          flex-shrink: 0;
        }
        .dropdown-content a:hover {
          background: rgba(245, 117, 0, 0.1);
          color: #F57500;
          transform: translateX(2px);
        }
        .dropdown-content a:hover::before {
          background: #F57500;
          box-shadow: 0 0 8px rgba(245, 117, 0, 0.8);
        }
        .dropdown-content a.active {
          color: #F57500;
          background: rgba(245, 117, 0, 0.08);
        }
        .dropdown-content a.active::before {
          background: #F57500;
          box-shadow: 0 0 8px rgba(245, 117, 0, 0.8);
        }

        /* ==================== RIGHT SIDE ==================== */
        .hdr-right {
          display: none;
          align-items: center;
          gap: .85rem;
        }
        @media(min-width: 1024px) { .hdr-right { display: flex; } }

        .status-badge {
          display: flex;
          align-items: center;
          gap: .5rem;
          padding: .35rem .8rem;
          background: rgba(34, 197, 94, 0.06);
          border: 1px solid rgba(34, 197, 94, 0.22);
          border-radius: 100px;
          font-size: .62rem;
          font-weight: 500;
          color: rgba(220, 255, 230, 0.85);
          letter-spacing: .1em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(.85); }
        }

        /* ==================== MOBILE BUTTON ==================== */
        .mob-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9px;
          color: #ccc;
          cursor: pointer;
          transition: border-color .25s, color .25s, background .25s;
        }
        .mob-btn:hover {
          border-color: rgba(245, 117, 0, 0.5);
          color: #F57500;
          background: rgba(245, 117, 0, 0.08);
        }
        @media(min-width: 1024px) { .mob-btn { display: none; } }

        /* ==================== MOBILE DRAWER ==================== */
        .mob-drawer {
          background: rgba(10, 10, 10, 0.96);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          max-height: 0;
          overflow: hidden;
          transition: max-height .5s cubic-bezier(.4, 0, .2, 1);
        }
        .mob-drawer.open { max-height: 820px; }

        .mob-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.25rem 2rem 2rem;
        }

        .mob-path {
          display: inline-flex;
          align-items: center;
          gap: .35rem;
          font-family: 'Space Mono', monospace;
          font-size: .68rem;
          color: #888;
          padding: .35rem .7rem;
          background: rgba(245, 117, 0, 0.06);
          border: 1px solid rgba(245, 117, 0, 0.15);
          border-radius: 6px;
          margin-bottom: 1rem;
        }
        .mob-path span { color: #F57500; }

        .mob-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem .5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          text-decoration: none;
          transition: padding-left .25s, background .25s;
          background: none;
          border-left: 3px solid transparent;
          border-right: none;
          border-top: none;
          width: 100%;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          text-align: left;
        }
        .mob-nav-item:hover {
          padding-left: 1rem;
          background: rgba(245, 117, 0, 0.04);
          border-left-color: #F57500;
        }

        .mob-nav-left {
          display: flex;
          align-items: center;
          gap: .9rem;
        }
        .mob-nav-num {
          font-family: 'Space Mono', monospace;
          font-size: .6rem;
          color: rgba(255, 255, 255, 0.25);
          width: 20px;
          transition: color .25s;
        }
        .mob-nav-label {
          font-size: .82rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .14em;
          color: #fff;
          transition: color .25s;
        }
        .mob-nav-item:hover .mob-nav-label,
        .mob-nav-item.active .mob-nav-label {
          color: #F57500;
        }
        .mob-nav-item.active .mob-nav-num { color: #F57500; }

        .mob-nav-arrow {
          font-size: .85rem;
          color: rgba(255, 255, 255, 0.3);
          transition: color .25s, transform .25s;
        }
        .mob-nav-item:hover .mob-nav-arrow {
          color: #F57500;
          transform: translateX(4px);
        }

        /* Mobile dropdown */
        .mob-dropdown-wrapper {
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .mob-dropdown-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem .5rem;
          width: 100%;
          background: none;
          border: none;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: padding-left .25s, background .25s;
          text-align: left;
          border-left: 3px solid transparent;
        }
        .mob-dropdown-toggle:hover {
          padding-left: 1rem;
          background: rgba(245, 117, 0, 0.04);
          border-left-color: #F57500;
        }
        .mob-dropdown-toggle .mob-nav-left {
          display: flex;
          align-items: center;
          gap: .9rem;
        }
        .mob-dropdown-arrow {
          font-size: .8rem;
          color: rgba(255, 255, 255, 0.4);
          transition: transform .3s ease, color .25s;
        }
        .mob-dropdown-toggle[aria-expanded="true"] .mob-dropdown-arrow {
          transform: rotate(180deg);
          color: #F57500;
        }
        .mob-dropdown-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height .35s ease;
          padding-left: 2.6rem;
          background: rgba(0, 0, 0, 0.25);
        }
        .mob-dropdown-menu.open { max-height: 240px; }
        .mob-dropdown-menu a {
          display: flex;
          align-items: center;
          gap: .6rem;
          padding: .7rem 0;
          font-size: .72rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: #aaa;
          text-decoration: none;
          transition: color .2s, padding-left .2s;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .mob-dropdown-menu a::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(245, 117, 0, 0.4);
          flex-shrink: 0;
        }
        .mob-dropdown-menu a:last-child { border-bottom: none; }
        .mob-dropdown-menu a:hover {
          color: #F57500;
          padding-left: 6px;
        }
        .mob-dropdown-menu a.active { color: #F57500; }

        .mob-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .mob-status {
          display: flex;
          align-items: center;
          gap: .5rem;
          font-size: .65rem;
          color: #aaa;
          padding: .35rem .75rem;
          background: rgba(34, 197, 94, 0.06);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 100px;
        }
        .mob-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        /* ==================== PREMIUM CURSOR ==================== */
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          background: #F57500;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10002;
          will-change: transform;
          transition: width .15s ease, height .15s ease, background .15s ease;
        }
        .cursor-dot.cursor-hover-dot {
          width: 6px; height: 6px;
          background: #fff;
          box-shadow: 0 0 8px 3px rgba(245, 117, 0, .6);
        }
        .cursor-dot.cursor-click-dot {
          width: 4px; height: 4px;
          background: #fff;
        }
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(245, 117, 0, .55);
          pointer-events: none;
          z-index: 10001;
          will-change: transform;
          transition:
            width .3s cubic-bezier(.23,1,.32,1),
            height .3s cubic-bezier(.23,1,.32,1),
            border-color .3s ease,
            background .3s ease,
            box-shadow .3s ease;
        }
        .cursor-ring::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 1.5px solid transparent;
          border-top-color: #F57500;
          animation: cursor-spin 1.4s linear infinite;
        }
        .cursor-ring::after {
          content: '';
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,117,0,.08) 0%, transparent 70%);
          transition: all .3s ease;
        }
        .cursor-ring.cursor-hover {
          width: 58px; height: 58px;
          border-color: rgba(245,117,0,.9);
          background: rgba(245,117,0,.07);
          box-shadow:
            0 0 0 1px rgba(245,117,0,.15),
            0 0 20px 4px rgba(245,117,0,.18),
            inset 0 0 12px rgba(245,117,0,.08);
        }
        .cursor-ring.cursor-hover::after {
          background: radial-gradient(circle, rgba(245,117,0,.18) 0%, transparent 70%);
        }
        .cursor-ring.cursor-click {
          width: 30px; height: 30px;
          border-color: #F57500;
          background: rgba(245,117,0,.15);
        }
        .cursor-trail {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #F57500;
          pointer-events: none;
          will-change: transform, opacity;
        }
        @keyframes cursor-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* ==================== MOBILE ==================== */
        @media(max-width: 767px) {
          .hdr-inner { height: 64px; padding: 0 1rem; }
          .hdr.scrolled .hdr-inner { height: 58px; }
          .logo-mark { width: 30px; height: 30px; font-size: .75rem; }
          .logo-name { font-size: .82rem; }
          .logo-tag { font-size: .5rem; letter-spacing: .2em; }
          .mob-inner { padding: 1.25rem 1rem 1.5rem; }
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
                    
      `}</style>

            <div
                className={`
          hdr
          ${scrolled ? 'scrolled' : ''}
          ${headerVisible ? 'header-visible' : 'header-hidden'}
        `}
            >
                <div className="hdr-accent-line" />

                <div className="hdr-bar">
                    <div className="hdr-inner">
                        {/* LOGO */}
                        <a href="/" className="logo">
                            <div className="logo-mark">L</div>
                            <div className="logo-text">
                                <span className="logo-name">Lakshan</span>
                                <span className="logo-tag">Developer</span>
                            </div>
                        </a>

                        {/* DESKTOP NAV */}
                        <nav className="nav">
                            {navItems.map(({ label, href, hasDropdown }, i) => {
                                const lower = label.toLowerCase();
                                if (hasDropdown) {
                                    return (
                                        <div
                                            key={label}
                                            className={`nav-dropdown ${desktopDropdownOpen ? 'open' : ''}`}
                                        >
                                            <button
                                                type="button"
                                                className={`nav-item ${active === lower ? 'active' : ''}`}
                                                onClick={toggleDesktopDropdown}
                                                aria-expanded={desktopDropdownOpen}
                                            >
                                                <span className="nav-index">0{i + 1}</span>
                                                {label}
                                                <ChevronDown size={12} className="dropdown-chevron" strokeWidth={2.5} />
                                            </button>
                                            <div className="dropdown-content">
                                                {certificateItems.map((item) => (
                                                    <a
                                                        key={item.label}
                                                        href={item.href}
                                                        onClick={() => {
                                                            setActive('certificates');
                                                            setDesktopDropdownOpen(false);
                                                        }}
                                                    >
                                                        {item.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <a
                                        key={label}
                                        href={href}
                                        className={`nav-item ${active === lower ? 'active' : ''}`}
                                        onClick={() => setActive(lower)}
                                    >
                                        <span className="nav-index">0{i + 1}</span>
                                        {label}
                                    </a>
                                );
                            })}
                        </nav>

                        {/* RIGHT SIDE */}
                        <div className="hdr-right">
                            {/*<div className="status-badge">*/}
                            {/*    <div className="status-dot" />*/}
                            {/*    Available for work*/}
                            {/*</div>*/}
                            <div className="flex flex-wrap items-center justify-center animate-fade-up [animation-delay:200ms]">
                                <div className="hidden sm:block w-12 h-[1.5px] "></div>
                                <a href="/contact" className="btn-2 inline-block">
                                    <span className="relative z-10 group-hover:translate-x-3 transition-transform duration-300 flex items-center justify-center lg:justify-start" onClick={() => setIsOpen(false)}>Hire Me</span>
                                </a>
                                <div className="hidden sm:block w-12 h-[1.5px] "></div>
                            </div>
                        </div>

                        {/* MOBILE BUTTON */}
                        <button
                            className="mob-btn"
                            onClick={handleMobileToggle}
                            aria-label="Menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>

                {/* MOBILE DRAWER */}
                <div className={`mob-drawer ${isOpen ? 'open' : ''}`}>
                    <div className="mob-inner">
                        <div className="mob-path">
                            ~/lakshan<span>/{active}</span>
                        </div>

                        <a
                            href="/"
                            className={`mob-nav-item ${active === '/' ? 'active' : ''}`}
                            onClick={() => handleMobileNavClick('Home')}
                        >
                            <div className="mob-nav-left">
                                <span className="mob-nav-num">01</span>
                                <span className="mob-nav-label">Home</span>
                            </div>
                            <span className="mob-nav-arrow">→</span>
                        </a>

                        <div className="mob-dropdown-wrapper">
                            <button
                                type="button"
                                className="mob-dropdown-toggle"
                                onClick={toggleMobileCert}
                                aria-expanded={mobileCertOpen}
                            >
                                <div className="mob-nav-left">
                                    <span className="mob-nav-num">02</span>
                                    <span className="mob-nav-label">Certificates</span>
                                </div>
                                <ChevronDown size={14} className="mob-dropdown-arrow" strokeWidth={2.5} />
                            </button>
                            <div className={`mob-dropdown-menu ${mobileCertOpen ? 'open' : ''}`}>
                                {certificateItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => handleMobileNavClick('Certificates')}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <a
                            href="/service"
                            className={`mob-nav-item ${active === 'service' ? 'active' : ''}`}
                            onClick={() => handleMobileNavClick('Service')}
                        >
                            <div className="mob-nav-left">
                                <span className="mob-nav-num">03</span>
                                <span className="mob-nav-label">Service</span>
                            </div>
                            <span className="mob-nav-arrow">→</span>
                        </a>

                        <a
                            href="/portfolio"
                            className={`mob-nav-item ${active === 'portfolio' ? 'active' : ''}`}
                            onClick={() => handleMobileNavClick('Portfolio')}
                        >
                            <div className="mob-nav-left">
                                <span className="mob-nav-num">04</span>
                                <span className="mob-nav-label">Portfolio</span>
                            </div>
                            <span className="mob-nav-arrow">→</span>
                        </a>


                        <div className="mob-footer">
                            <div className="mob-status">
                                <div className="mob-status-dot" />
                                <span>Available for work</span>
                            </div>

                            <div className="flex flex-wrap items-center  gap-3 animate-fade-up [animation-delay:200ms]">
                                <div className="hidden sm:block w-12 h-[1.5px] bg-[#313131]/20"></div>
                                <a href="/contact" className="btn-2 inline-block">
                                    <span className="relative z-10 group-hover:translate-x-3 transition-transform duration-300 flex items-center justify-center lg:justify-start" onClick={() => setIsOpen(false)}>Hire Me</span>
                                </a>
                                <div className="hidden sm:block w-12 h-[1.5px] bg-[#313131]/20"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PREMIUM CURSOR */}
            {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (cursorTrailsRef.current[i] = el)}
                    className="cursor-trail hidden lg:block"
                    style={{ zIndex: 9990 - i }}
                />
            ))}
            <div ref={cursorRingRef} className="cursor-ring hidden lg:block z-[999]" />
            <div ref={cursorDotRef} className="cursor-dot hidden lg:block z-[999]" />
        </>
    );
}