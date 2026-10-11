import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const TRAIL_COUNT = 8;

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Certificates', href: '/certificates', hasDropdown: true },
    { label: 'Services', href: '/service' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
];

const certificateItems = [
    { label: 'All Certificates', href: '/certificates' },
    { label: 'Web Development', href: '/certificates/web' },
    { label: 'UI/UX Design', href: '/certificates/uiux' },
    { label: 'Cloud & DevOps', href: '/certificates/cloud' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(true);
    const [active, setActive] = useState('home');
    const [mobileCertOpen, setMobileCertOpen] = useState(false);
    const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

    const lastScrollY = useRef(0);

    // --- Cursor refs ---
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const cursorTrailsRef = useRef([]);

    const mousePos = useRef({ x: -200, y: -200 });
    const ringPos = useRef({ x: -200, y: -200 });

    const rafRef = useRef(null);
    const isHovering = useRef(false);
    const isClicking = useRef(false);

    // ============================================================
    // HEADER SCROLL BEHAVIOR
    // ============================================================
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

    // ============================================================
    // CLOSE MOBILE MENU ON RESIZE (desktop)
    // ============================================================
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

    // ============================================================
    // ACTIVE NAVIGATION
    // ============================================================
    useEffect(() => {
        const ids = navItems
            .map((n) => document.getElementById(n.label.toLowerCase()))
            .filter(Boolean);

        if (!ids.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { threshold: 0.4 }
        );

        ids.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    // ============================================================
    // PREMIUM CURSOR
    // ============================================================
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

                const tx = lerp(
                    parseFloat(trail.dataset.x || mousePos.current.x),
                    target.x,
                    speed
                );
                const ty = lerp(
                    parseFloat(trail.dataset.y || mousePos.current.y),
                    target.y,
                    speed
                );

                trail.dataset.x = tx;
                trail.dataset.y = ty;

                const scale =
                    (1 - (i / trails.length) * 0.7) * (isHovering.current ? 1.4 : 1);
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

        const targets = document.querySelectorAll(
            'a, button, .hsc, .share-btn, .nav-button, [role="button"]'
        );

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

    // ============================================================
    // HANDLERS
    // ============================================================
    const handleMobileToggle = () => {
        setIsOpen((open) => !open);
    };

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

    // Close desktop dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                desktopDropdownOpen &&
                !e.target.closest('.nav-dropdown')
            ) {
                setDesktopDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [desktopDropdownOpen]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');

        /* =====================================================
           RESET
        ===================================================== */
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* =====================================================
           DESKTOP CURSOR
        ===================================================== */
        @media(min-width: 1024px) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }

        /* =====================================================
           HEADER
        ===================================================== */
        .hdr {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 999;
          font-family: 'Inter', sans-serif;
          transform: translateY(0);
          transition:
            transform 0.35s cubic-bezier(.4, 0, .2, 1),
            opacity 0.35s ease;
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

        /* =====================================================
           ACCENT LINE
        ===================================================== */
        .hdr-accent-line {
          height: 2px;
          width: 100%;
          background: #F57500;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hdr.scrolled .hdr-accent-line {
          opacity: 1;
        }

        /* =====================================================
           HEADER BAR
        ===================================================== */
        .hdr-bar {
          background: rgb(49 49 49 / 90%);
          border-bottom: 1px solid #1a1a1a;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition:
            background 0.3s,
            border-color 0.3s,
            backdrop-filter 0.3s,
            -webkit-backdrop-filter 0.3s,
            box-shadow 0.3s;
        }

        .hdr.scrolled .hdr-bar {
          background: rgba(5, 5, 5, 0.55);
          border-bottom-color: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          box-shadow: 0 4px 40px rgba(0, 0, 0, .45);
        }

        /* =====================================================
           HEADER INNER
        ===================================================== */
        .hdr-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          transition: height 0.3s;
        }

        .hdr.scrolled .hdr-inner {
          height: 58px;
        }

        /* =====================================================
           LOGO
        ===================================================== */
        .logo {
          display: flex;
          align-items: center;
          gap: .75rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .logo-name {
          font-family: 'Space Mono', monospace;
          font-size: .85rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: .05em;
        }

        .logo-tag {
          font-size: .6rem;
          font-weight: 500;
          color: #F57500;
          letter-spacing: .2em;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
        }

        /* =====================================================
           DESKTOP NAV
        ===================================================== */
        .nav {
          display: none;
          align-items: center;
        }

        @media(min-width: 1024px) {
          .nav {
            display: flex;
          }
        }

        .nav-divider {
          width: 1px;
          height: 28px;
          background: #1e1e1e;
          margin-right: 2rem;
        }

        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: .35rem;
          padding: .5rem .85rem;
          font-size: .72rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .14em;
          color: #f0ece499;
          text-decoration: none;
          transition: color .2s;
          white-space: nowrap;
          background: none;
          border: none;
          font-family: 'Inter', sans-serif;
        }

        .nav-item:hover {
          color: #F57500;
        }

        .nav-item.active {
          color: #fff;
        }

        .nav-index {
          font-family: 'Space Mono', monospace;
          font-size: .58rem;
          color: rgb(255 255 255 / 0.2);
          transition: color .2s;
        }

        .nav-item:hover .nav-index,
        .nav-item.active .nav-index {
          color: #fff;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: #F57500;
          transition: width .3s ease;
        }

        .nav-item.active::after {
          width: 70%;
        }

        .nav-item:hover::after {
          width: 40%;
        }

        /* =====================================================
           DROPDOWN (Certificates)
        ===================================================== */
        .nav-dropdown {
          position: relative;
        }

        .nav-dropdown .nav-item {
          gap: .25rem;
        }

        .dropdown-chevron {
          transition: transform 0.25s ease;
          margin-left: 2px;
        }

        .nav-dropdown.open .dropdown-chevron {
          transform: rotate(180deg);
        }

        .dropdown-content {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          min-width: 190px;
          background: rgba(18, 18, 18, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          padding: 6px 0;
          opacity: 0;
          visibility: hidden;
          transition:
            opacity 0.22s ease,
            transform 0.22s ease,
            visibility 0.22s;
          box-shadow:
            0 20px 45px rgba(0, 0, 0, 0.85),
            0 0 0 1px rgba(245, 117, 0, 0.08);
          z-index: 1000;
        }

        .nav-dropdown.open .dropdown-content {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-content a {
          display: block;
          padding: 10px 20px;
          font-size: 0.68rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #ccc;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, padding-left 0.2s;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
        }

        .dropdown-content a:hover {
          background: rgba(245, 117, 0, 0.12);
          color: #F57500;
          padding-left: 26px;
        }

        .dropdown-content a.active {
          color: #F57500;
          background: rgba(245, 117, 0, 0.08);
        }

        /* =====================================================
           RIGHT SIDE
        ===================================================== */
        .hdr-right {
          display: none;
          align-items: center;
          gap: 1rem;
        }

        @media(min-width: 1024px) {
          .hdr-right {
            display: flex;
          }
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: .45rem;
          padding: .3rem .75rem;
          border: 1px solid #eeeeee66;
          border-radius: 100px;
          font-size: .65rem;
          font-weight: 500;
          color: #eeeeeea6;
          letter-spacing: .08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: .4; }
        }

        /* =====================================================
           HIRE BUTTON
        ===================================================== */
        .btn-hire {
          position: relative;
          overflow: hidden;
          padding: .5rem 1.2rem;
          background: transparent;
          border: 1px solid #F57500;
          border-radius: 6px;
          font-family: 'Space Mono', monospace;
          font-size: .72rem;
          font-weight: 700;
          color: #F57500;
          letter-spacing: .1em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: color .25s;
          display: inline-block;
        }

        .btn-hire::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #F57500;
          transform: translateX(-100%);
          transition: transform .25s ease;
        }

        .btn-hire:hover::before {
          transform: translateX(0);
        }

        .btn-hire:hover {
          color: #000;
        }

        .btn-hire span {
          position: relative;
          z-index: 1;
        }

        /* =====================================================
           MOBILE BUTTON
        ===================================================== */
        .mob-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: transparent;
          border: 1px solid #1e1e1e;
          border-radius: 6px;
          color: #888;
          cursor: pointer;
          transition: border-color .2s, color .2s;
        }

        .mob-btn:hover {
          border-color: #444;
          color: #fff;
        }

        @media(min-width: 1024px) {
          .mob-btn {
            display: none;
          }
        }

        /* =====================================================
           MOBILE DRAWER
        ===================================================== */
        .mob-drawer {
          background: rgb(49 49 49 / 90%);
          border-bottom: 1px solid #1a1a1a;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          max-height: 0;
          overflow: hidden;
          transition: max-height .45s cubic-bezier(.4, 0, .2, 1);
        }

        .mob-drawer.open {
          max-height: 820px;
        }

        .mob-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1rem 2rem 2rem;
        }

        .mob-path {
          font-family: 'Space Mono', monospace;
          font-size: .65rem;
          color: #d6d6d6;
          padding-bottom: 1rem;
          border-bottom: 1px solid #777777;
          margin-bottom: .5rem;
        }

        .mob-path span {
          color: #F57500;
        }

        .mob-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: .9rem 0;
          border-bottom: 1px solid #777777;
          text-decoration: none;
          transition: padding-left .2s;
          background: none;
          border: none;
          width: 100%;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          text-align: left;
        }

        .mob-nav-item:hover {
          padding-left: .5rem;
        }

        .mob-nav-left {
          display: flex;
          align-items: center;
          gap: .75rem;
        }

        .mob-nav-num {
          font-family: 'Space Mono', monospace;
          font-size: .6rem;
          color: rgb(255 255 255 / 0.2);
          width: 18px;
        }

        .mob-nav-label {
          font-size: .8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .14em;
          color: #fff;
          transition: color .2s;
        }

        .mob-nav-item:hover .mob-nav-label,
        .mob-nav-item.active .mob-nav-label {
          color: #ff7a00;
        }

        .mob-nav-item.active .mob-nav-num {
          color: #F57500;
        }

        .mob-nav-arrow {
          font-size: .7rem;
          color: #d6d6d6;
          transition: color .2s, transform .2s;
        }

        .mob-nav-item:hover .mob-nav-arrow {
          color: #F57500;
          transform: translateX(3px);
        }

        /* Mobile Certificates dropdown */
        .mob-dropdown-wrapper {
          border-bottom: 1px solid #777777;
        }

        .mob-dropdown-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: .9rem 0;
          width: 100%;
          background: none;
          border: none;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: padding-left .2s;
          text-align: left;
        }

        .mob-dropdown-toggle:hover {
          padding-left: .5rem;
        }

        .mob-dropdown-toggle .mob-nav-left {
          display: flex;
          align-items: center;
          gap: .75rem;
        }

        .mob-dropdown-arrow {
          font-size: .75rem;
          color: #d6d6d6;
          transition: transform 0.28s ease, color 0.2s;
        }

        .mob-dropdown-toggle[aria-expanded="true"] .mob-dropdown-arrow {
          transform: rotate(180deg);
          color: #F57500;
        }

        .mob-dropdown-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.32s ease;
          padding-left: 2.2rem;
        }

        .mob-dropdown-menu.open {
          max-height: 220px;
        }

        .mob-dropdown-menu a {
          display: block;
          padding: .65rem 0;
          font-size: .72rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: #bbb;
          text-decoration: none;
          transition: color .2s, padding-left .2s;
          border-bottom: 1px solid rgba(119, 119, 119, 0.25);
        }

        .mob-dropdown-menu a:last-child {
          border-bottom: none;
        }

        .mob-dropdown-menu a:hover {
          color: #F57500;
          padding-left: 6px;
        }

        .mob-dropdown-menu a.active {
          color: #F57500;
        }

        .mob-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          gap: 1rem;
        }

        .mob-status {
          display: flex;
          align-items: center;
          gap: .5rem;
          font-size: .65rem;
          color: #d6d6d6;
        }

        .mob-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 5px #22c55e;
        }

        /* =====================================================
           PREMIUM CURSOR
        ===================================================== */
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background: #F57500;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10002;
          will-change: transform;
          transition: width .15s ease, height .15s ease, background .15s ease;
        }

        .cursor-dot.cursor-hover-dot {
          width: 6px;
          height: 6px;
          background: #fff;
          box-shadow: 0 0 8px 3px rgba(245, 117, 0, .6);
        }

        .cursor-dot.cursor-click-dot {
          width: 4px;
          height: 4px;
          background: #fff;
        }

        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(245, 117, 0, .55);
          pointer-events: none;
          z-index: 10001;
          will-change: transform;
          transition:
            width .3s cubic-bezier(.23, 1, .32, 1),
            height .3s cubic-bezier(.23, 1, .32, 1),
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
          background: radial-gradient(circle, rgba(245, 117, 0, .08) 0%, transparent 70%);
          transition: all .3s ease;
        }

        .cursor-ring.cursor-hover {
          width: 58px;
          height: 58px;
          border-color: rgba(245, 117, 0, .9);
          background: rgba(245, 117, 0, .07);
          box-shadow:
            0 0 0 1px rgba(245, 117, 0, .15),
            0 0 20px 4px rgba(245, 117, 0, .18),
            inset 0 0 12px rgba(245, 117, 0, .08);
        }

        .cursor-ring.cursor-hover::after {
          background: radial-gradient(circle, rgba(245, 117, 0, .18) 0%, transparent 70%);
        }

        .cursor-ring.cursor-click {
          width: 30px;
          height: 30px;
          border-color: #F57500;
          background: rgba(245, 117, 0, .15);
        }

        .cursor-trail {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #F57500;
          pointer-events: none;
          will-change: transform, opacity;
        }

        @keyframes cursor-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* =====================================================
           MOBILE HEADER
        ===================================================== */
        @media(max-width: 767px) {
          .hdr-inner {
            height: 62px;
            padding: 0 1rem;
          }

          .hdr.scrolled .hdr-inner {
            height: 58px;
          }

          .logo-name {
            font-size: .78rem;
          }

          .logo-tag {
            font-size: .5rem;
          }

          .mob-inner {
            padding: 1rem 1rem 1.5rem;
          }
        }
      `}</style>

            {/* =========================================================
          HEADER
      ========================================================= */}
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
                        <a href="/#home" className="logo">
                            <div className="logo-text">
                                <span className="logo-name">Lakshan</span>
                                <span className="logo-tag">Developer</span>
                            </div>
                        </a>

                        {/* DESKTOP NAVIGATION */}
                        <nav className="nav">
                            <div className="nav-divider" />

                            {navItems.map(({ label, href, hasDropdown }, i) => {
                                const lower = label.toLowerCase();
                                if (hasDropdown) {
                                    return (
                                        <div
                                            key={label}
                                            className={`nav-dropdown ${
                                                desktopDropdownOpen ? 'open' : ''
                                            }`}
                                        >
                                            <button
                                                type="button"
                                                className={`nav-item ${
                                                    active === lower ? 'active' : ''
                                                }`}
                                                onClick={toggleDesktopDropdown}
                                                aria-expanded={desktopDropdownOpen}
                                            >
                                                <span className="nav-index">0{i + 1}</span>
                                                {label}
                                                <ChevronDown
                                                    size={12}
                                                    className="dropdown-chevron"
                                                    strokeWidth={2.5}
                                                />
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
                                        className={`nav-item ${
                                            active === lower ? 'active' : ''
                                        }`}
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
                            <div className="status-badge">
                                <div className="status-dot" />
                                Available for work
                            </div>

                            <a href="/#contact" className="btn-hire">
                                <span>Hire Me</span>
                            </a>
                        </div>

                        {/* MOBILE MENU BUTTON */}
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
                            ~/lakshan
                            <span>/{active}</span>
                        </div>

                        {/* Home */}
                        <a
                            href="/"
                            className={`mob-nav-item ${
                                active === 'home' ? 'active' : ''
                            }`}
                            onClick={() => handleMobileNavClick('Home')}
                        >
                            <div className="mob-nav-left">
                                <span className="mob-nav-num">01</span>
                                <span className="mob-nav-label">Home</span>
                            </div>
                            <span className="mob-nav-arrow">→</span>
                        </a>

                        {/* Certificates dropdown (mobile) */}
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
                                <ChevronDown
                                    size={14}
                                    className="mob-dropdown-arrow"
                                    strokeWidth={2.5}
                                />
                            </button>

                            <div
                                className={`mob-dropdown-menu ${
                                    mobileCertOpen ? 'open' : ''
                                }`}
                            >
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

                        {/* Services */}
                        <a
                            href="/service"
                            className={`mob-nav-item ${
                                active === 'services' ? 'active' : ''
                            }`}
                            onClick={() => handleMobileNavClick('Services')}
                        >
                            <div className="mob-nav-left">
                                <span className="mob-nav-num">03</span>
                                <span className="mob-nav-label">Services</span>
                            </div>
                            <span className="mob-nav-arrow">→</span>
                        </a>

                        {/* Portfolio */}
                        <a
                            href="/portfolio"
                            className={`mob-nav-item ${
                                active === 'portfolio' ? 'active' : ''
                            }`}
                            onClick={() => handleMobileNavClick('Portfolio')}
                        >
                            <div className="mob-nav-left">
                                <span className="mob-nav-num">04</span>
                                <span className="mob-nav-label">Portfolio</span>
                            </div>
                            <span className="mob-nav-arrow">→</span>
                        </a>

                        {/* Contact */}
                        <a
                            href="/contact"
                            className={`mob-nav-item ${
                                active === 'contact' ? 'active' : ''
                            }`}
                            onClick={() => handleMobileNavClick('Contact')}
                        >
                            <div className="mob-nav-left">
                                <span className="mob-nav-num">05</span>
                                <span className="mob-nav-label">Contact</span>
                            </div>
                            <span className="mob-nav-arrow">→</span>
                        </a>

                        {/* MOBILE FOOTER */}
                        <div className="mob-footer">
                            <div className="mob-status">
                                <div className="mob-status-dot" />
                                <span>Available for work</span>
                            </div>

                            <a
                                href="/#contact"
                                className="btn-hire"
                                onClick={() => setIsOpen(false)}
                            >
                                <span>Hire Me</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================
          PREMIUM CURSOR TRAILS
      ========================================================= */}
            {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (cursorTrailsRef.current[i] = el)}
                    className="cursor-trail hidden lg:block"
                    style={{ zIndex: 9990 - i }}
                />
            ))}

            {/* Outer cursor ring */}
            <div
                ref={cursorRingRef}
                className="cursor-ring hidden lg:block z-[999]"
            />

            {/* Inner cursor dot */}
            <div
                ref={cursorDotRef}
                className="cursor-dot hidden lg:block z-[999]"
            />
        </>
    );
}