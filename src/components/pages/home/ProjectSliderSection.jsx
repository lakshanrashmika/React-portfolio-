import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const projects = [
    { label:'Brand Identity', t1:'Nova', t2:'Brand System', year:'2024', client:'Nova Labs', scope:'Brand · Motion', desc:'Total identity overhaul for a next-gen tech startup — from wordmark to motion language, every pixel deliberate, every edge electrified.', tags:['Branding','Identity','Motion Design'], imgUrl:'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&auto=format', caseUrl:'https://example.com/case/nova-brand' },
    { label:'UI / UX Dashboard', t1:'Apex', t2:'Data Hub', year:'2023', client:'Apex Corp', scope:'UI · Web · API', desc:'A data-dense analytics command centre redesigned to eliminate noise and surface insight instantly — for smart decisions at scale.', tags:['React','D3.js','Node.js','AWS'], imgUrl:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format', caseUrl:'https://example.com/case/apex-dashboard' },
    { label:'SaaS Platform', t1:'Orbit', t2:'Core Engine', year:'2024', client:'Orbit Inc', scope:'Dev · Infra · Cloud', desc:'Micro-service SaaS backbone built for thousands of concurrent connections — modular, resilient, obsessively fast.', tags:['Architecture','Kubernetes','Redis'], imgUrl:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format', caseUrl:'https://example.com/case/orbit-core' },
    { label:'Motion · AV', t1:'Prism', t2:'Light Wave', year:'2023', client:'Prismatic', scope:'Motion · OOH', desc:'Award-winning campaign spanning 28 markets — broadcast, digital, and outdoor — united by one fearless visual language.', tags:['After Effects','Cinema 4D','WebGL'], imgUrl:'https://images.unsplash.com/photo-1536240474400-8c84363b7c42?w=1600&auto=format', caseUrl:'https://example.com/case/prism-motion' },
    { label:'3D · AR · XR', t1:'Flux', t2:'Realm XR', year:'2024', client:'Flux Studio', scope:'AR · 3D · UX', desc:'Luxury retail augmented reality experience — bridging the physical and digital in a spatial encounter unlike anything before.', tags:['Three.js','WebGL','GSAP','Blender'], imgUrl:'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1600&auto=format', caseUrl:'https://example.com/case/flux-realm' },
];
const TOTAL = projects.length;

const ProjectSliderSection = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const sectionRef      = useRef(null);   // root wrapper
    const stageRef        = useRef(null);
    const tickerTrackRef  = useRef(null);
    const dotsWrapRef     = useRef(null);
    const arcFillRef      = useRef(null);
    const arcNumRef       = useRef(null);
    const hudCurRef       = useRef(null);
    const progLineFillRef = useRef(null);
    const progFillRef     = useRef(null);
    const prevBtnRef      = useRef(null);
    const nextBtnRef      = useRef(null);
    const dragZoneRef     = useRef(null);

    const slideElsRef = useRef([]);
    const dotElsRef   = useRef([]);
    const curRef      = useRef(0);
    const busyRef     = useRef(false);
    const arcIntervalRef = useRef(null);
    const dragXRef    = useRef(null);

    const tickItems = projects.map(p => `${p.label} <span>✦</span> ${p.t1} ${p.t2}`);
    const full = tickItems.join(' &nbsp;&nbsp;&nbsp; ');

    const stopArc = () => {
        if (arcIntervalRef.current) { cancelAnimationFrame(arcIntervalRef.current); arcIntervalRef.current = null; }
    };

    const updateUI = () => {
        dotElsRef.current.forEach((d, i) => d.classList.toggle('ps-dot-active', i === curRef.current));
        if (hudCurRef.current)       hudCurRef.current.textContent       = String(curRef.current + 1).padStart(2, '0');
        if (arcNumRef.current)       arcNumRef.current.textContent       = String(curRef.current + 1).padStart(2, '0');
        const pct = (curRef.current / (TOTAL - 1)) * 100;
        if (progLineFillRef.current) progLineFillRef.current.style.height = `${pct}%`;
        if (progFillRef.current)     progFillRef.current.style.width      = `${pct}%`;
    };

    const startArc = () => {
        if (!arcFillRef.current) return;
        stopArc();
        gsap.set(arcFillRef.current, { strokeDashoffset: 100 });
        const startTime = Date.now();
        const duration  = 5500;
        const tick = () => {
            if (!arcFillRef.current) return;
            const elapsed  = Date.now() - startTime;
            const progress = Math.min(1, elapsed / duration);
            arcFillRef.current.style.strokeDashoffset = 100 * (1 - progress);
            if (progress >= 1) { stopArc(); goTo(curRef.current + 1, 1); }
            else arcIntervalRef.current = requestAnimationFrame(tick);
        };
        arcIntervalRef.current = requestAnimationFrame(tick);
    };

    const animExit = (slide, dir) => {
        const imgDiv     = slide.querySelector('.ps-img');
        const titleLines = [...slide.querySelectorAll('.ps-title-line')];
        const bgYear     = slide.querySelector('.ps-bgyear');
        const tl = gsap.timeline();
        tl.to(slide, { clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', duration: 0.85, ease: 'expo.inOut' }, 0);
        if (imgDiv)  tl.to(imgDiv,  { scale: 1.15, opacity: 0, duration: 0.6,  ease: 'power2.in' }, 0.1);
        if (bgYear)  tl.to(bgYear,  { opacity: 0,  x: -15,     duration: 0.5,  ease: 'power2.in' }, 0.05);
        tl.to(titleLines,                                   { y: '-55%', opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.in' }, 0.05);
        tl.to(slide.querySelector('.ps-eyebrow-text'),      { opacity: 0, y: -10, duration: 0.3 }, 0);
        tl.to(slide.querySelector('.ps-desc'),              { opacity: 0, y: -8,  duration: 0.3 }, 0);
        tl.to(slide.querySelector('.ps-cta'),               { opacity: 0, y:  8,  duration: 0.3 }, 0);
        return tl;
    };

    const animEnter = (slide, dir) => {
        const titleLines = [...slide.querySelectorAll('.ps-title-line')];
        const imgDiv     = slide.querySelector('.ps-img');
        const bgYear     = slide.querySelector('.ps-bgyear');
        const tl = gsap.timeline();
        tl.set(slide, { zIndex: 2 });
        gsap.set(slide, { clipPath: dir > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' });
        tl.to(slide, { clipPath: 'inset(0 0% 0 0)', duration: 0.95, ease: 'expo.inOut' }, 0);
        tl.fromTo(slide.querySelector('.ps-stripe'), { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 0.65, ease: 'expo.out' }, 0.45);
        if (imgDiv)  gsap.fromTo(imgDiv,  { scale: 1.2, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' }, 0.1);
        if (bgYear)  gsap.fromTo(bgYear,  { opacity: 0, x: 25 },        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },    0.6);
        const srMeta   = slide.querySelector('.ps-sr-meta');
        const eyeLine  = slide.querySelector('.ps-eyebrow-line');
        const eyeText  = slide.querySelector('.ps-eyebrow-text');
        const meta     = slide.querySelector('.ps-meta');
        const desc     = slide.querySelector('.ps-desc');
        const tags     = [...slide.querySelectorAll('.ps-tag')];
        const cta      = slide.querySelector('.ps-cta');
        const bignum   = slide.querySelector('.ps-bignum');
        if (srMeta)   tl.fromTo(srMeta,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.7);
        if (eyeLine)  tl.fromTo(eyeLine,  { scaleX: 0 },          { scaleX: 1, duration: 0.5, ease: 'power3.out' },        0.5);
        if (eyeText)  tl.fromTo(eyeText,  { x: 20, opacity: 0 },  { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.6);
        if (titleLines.length) tl.fromTo(titleLines, { y: '105%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' }, 0.55);
        if (meta)  tl.fromTo(meta,  { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.85);
        if (desc)  tl.fromTo(desc,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.92);
        if (tags.length) tl.fromTo(tags, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' }, 1.0);
        if (cta)    tl.fromTo(cta,    { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.2)' }, 1.12);
        if (bignum) tl.fromTo(bignum, { x: dir > 0 ? '-4%' : '4%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.3);
        return tl;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const goTo = (next, dir) => {
        if (busyRef.current) return;
        next = ((next % TOTAL) + TOTAL) % TOTAL;
        if (next === curRef.current) return;
        busyRef.current = true;
        stopArc();
        const prevIdx  = curRef.current;
        curRef.current = next;
        if (dir === undefined) dir = next > prevIdx ? 1 : -1;
        const outgoing = slideElsRef.current[prevIdx];
        const incoming = slideElsRef.current[curRef.current];
        if (!outgoing || !incoming) { busyRef.current = false; return; }
        gsap.set(outgoing, { zIndex: 1 });
        gsap.set(incoming, { zIndex: 2 });

        const inImg = incoming.querySelector('.ps-img');
        if (inImg) gsap.set(inImg, { scale: 1.2, opacity: 0.6 });
        gsap.set(incoming.querySelector('.ps-stripe'),       { scaleY: 0 });
        gsap.set(incoming.querySelector('.ps-sr-meta'),      { y: 20, opacity: 0 });
        gsap.set(incoming.querySelectorAll('.ps-title-line'),{ y: '105%', opacity: 0 });
        gsap.set(incoming.querySelector('.ps-eyebrow-line'), { scaleX: 0 });
        gsap.set(incoming.querySelector('.ps-eyebrow-text'), { x: 20, opacity: 0 });
        gsap.set(incoming.querySelector('.ps-meta'),         { y: 25, opacity: 0 });
        gsap.set(incoming.querySelector('.ps-desc'),         { y: 20, opacity: 0 });
        gsap.set(incoming.querySelectorAll('.ps-tag'),       { y: 15, opacity: 0 });
        gsap.set(incoming.querySelector('.ps-cta'),          { y: 18, opacity: 0 });
        gsap.set(incoming.querySelector('.ps-bignum'),       { x: dir > 0 ? '-4%' : '4%', opacity: 0 });
        const inYear = incoming.querySelector('.ps-bgyear');
        if (inYear) gsap.set(inYear, { opacity: 0, x: 20 });

        const master = gsap.timeline({ onComplete: () => { busyRef.current = false; updateUI(); startArc(); } });
        master.add(animExit(outgoing, dir), 0);
        master.add(animEnter(incoming, dir), 0.08);
    };

    const init = () => {
        if (!stageRef.current || !tickerTrackRef.current) return;

        tickerTrackRef.current.innerHTML = full + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + full;

        stageRef.current.innerHTML = '';
        slideElsRef.current = projects.map((p, i) => {
            const s = document.createElement('div');
            s.className = 'ps-slide';
            s.innerHTML = `
                <div class="ps-sl">
                    <div class="ps-bignum">${String(i + 1).padStart(2, '0')}</div>
                    <div class="ps-content">
                        <div class="ps-eyebrow">
                            <div class="ps-eyebrow-line"></div>
                            <span class="ps-eyebrow-text">${p.label}</span>
                        </div>
                        <h2 class="ps-title" >
                            <span class="ps-title-line">${p.t1}</span>
                            <span class="ps-title-line"><em>${p.t2}</em></span>
                        </h2>
                        <div class="ps-meta">
                            <div class="ps-meta-cell"><label>Year</label><span>${p.year}</span></div>
                            <div class="ps-meta-cell"><label>Client</label><span>${p.client}</span></div>
                            <div class="ps-meta-cell"><label>Scope</label><span>${p.scope}</span></div>
                        </div>
                        <p class="ps-desc">${p.desc}</p>
                        <div class="ps-tags">${p.tags.map(t => `<span class="ps-tag">${t}</span>`).join('')}</div>
                        <a class="ps-cta" href="${p.caseUrl}" target="_blank" rel="noopener noreferrer">
                            <span>View Case Study</span>
                        </a>
                    </div>
                </div>
                <div class="ps-sr">
                    <div class="ps-stripe"></div>
                    <div class="ps-img-wrap">
                        <div class="ps-img" style="background-image:url('${p.imgUrl}')"></div>
                        <div class="ps-img-grad"></div>
                    </div>
                    <div class="ps-bgyear">${p.year}</div>
                    <div class="ps-sr-meta">
                        <div class="ps-sr-meta-year">${p.year}</div>
                        <div class="ps-sr-meta-role">${p.scope.split('·')[0].trim()}</div>
                    </div>
                </div>
            `;
            stageRef.current.appendChild(s);
            return s;
        });

        if (dotsWrapRef.current) {
            dotsWrapRef.current.innerHTML = '';
            dotElsRef.current = projects.map((_, i) => {
                const d = document.createElement('div');
                d.className = 'ps-dot' + (i === 0 ? ' ps-dot-active' : '');
                d.addEventListener('click', () => goTo(i));
                dotsWrapRef.current.appendChild(d);
                return d;
            });
        }

        slideElsRef.current.forEach((s, i) => {
            gsap.set(s, { clipPath: i === 0 ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)', zIndex: i === 0 ? 2 : 0 });
        });

        const first = slideElsRef.current[0];
        if (!first) return;

        gsap.set(first.querySelector('.ps-img'),                    { scale: 1.2, opacity: 0.6 });
        gsap.set(first.querySelector('.ps-stripe'),                  { scaleY: 0 });
        gsap.set(first.querySelector('.ps-eyebrow-text'),            { x: 20, opacity: 0 });
        gsap.set(first.querySelectorAll('.ps-title-line'),           { y: '105%', opacity: 0 });
        gsap.set(first.querySelector('.ps-meta'),                    { y: 25, opacity: 0 });
        gsap.set(first.querySelector('.ps-desc'),                    { y: 20, opacity: 0 });
        gsap.set(first.querySelectorAll('.ps-tag'),                  { y: 15, opacity: 0 });
        gsap.set(first.querySelector('.ps-cta'),                     { y: 18, opacity: 0 });
        gsap.set(first.querySelector('.ps-sr-meta'),                 { y: 20, opacity: 0 });
        gsap.set(first.querySelector('.ps-bignum'),                  { x: '-4%', opacity: 0 });
        gsap.set(first.querySelector('.ps-bgyear'),                  { opacity: 0, x: 20 });

        const tl = gsap.timeline({ delay: 0.2, onComplete: () => startArc() });
        tl.to(first, { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'expo.inOut' }, 0);
        tl.to(first.querySelector('.ps-stripe'),                     { scaleY: 1, duration: 0.7, ease: 'expo.out' }, 0.5);
        tl.to(first.querySelector('.ps-img'),                        { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' }, 0.15);
        tl.to(first.querySelector('.ps-bgyear'),                     { opacity: 1, x: 0, duration: 0.85, ease: 'power2.out' }, 0.65);
        tl.to(first.querySelector('.ps-sr-meta'),                    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.7);
        tl.to(first.querySelector('.ps-eyebrow-line'),               { scaleX: 1, duration: 0.5, ease: 'power3.out' }, 0.55);
        tl.to(first.querySelector('.ps-eyebrow-text'),               { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.65);
        tl.to(first.querySelectorAll('.ps-title-line'),              { y: '0%', opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' }, 0.6);
        tl.to(first.querySelector('.ps-meta'),                       { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.9);
        tl.to(first.querySelector('.ps-desc'),                       { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.98);
        tl.to(first.querySelectorAll('.ps-tag'),                     { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' }, 1.05);
        tl.to(first.querySelector('.ps-cta'),                        { y: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.2)' }, 1.15);
        tl.to(first.querySelector('.ps-bignum'),                     { x: '0%', opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.35);

        updateUI();
        setIsInitialized(true);
    };

    useEffect(() => {
        if (!isInitialized) return;
        const handlePrev = () => goTo(curRef.current - 1, -1);
        const handleNext = () => goTo(curRef.current + 1,  1);
        const handleKey  = (e) => {
            if (e.key === 'ArrowRight') goTo(curRef.current + 1,  1);
            if (e.key === 'ArrowLeft')  goTo(curRef.current - 1, -1);
        };

        const dz = dragZoneRef.current;
        let isDragging = false;

        const handleMouseDown  = (e) => {
            isDragging = true;
            dragXRef.current = e.clientX;
        };
        const handleMouseUp    = (e) => {
            if (!isDragging) return;
            isDragging = false;
            if (dragXRef.current !== null) {
                const dx = e.clientX - dragXRef.current;
                if (Math.abs(dx) > 50) goTo(dx < 0 ? curRef.current + 1 : curRef.current - 1, dx < 0 ? 1 : -1);
                dragXRef.current = null;
            }
        };
        const handleTouchStart = (e) => {
            isDragging = true;
            dragXRef.current = e.touches[0].clientX;
        };
        const handleTouchEnd   = (e) => {
            if (!isDragging) return;
            isDragging = false;
            if (dragXRef.current !== null) {
                const dx = e.changedTouches[0].clientX - dragXRef.current;
                if (Math.abs(dx) > 50) goTo(dx < 0 ? curRef.current + 1 : curRef.current - 1, dx < 0 ? 1 : -1);
                dragXRef.current = null;
            }
        };
        const handleMouseMove  = (e) => {
            if (!isDragging) return;
            const rect = sectionRef.current?.getBoundingClientRect();
            if (!rect) return;
            const rx = (e.clientX - rect.left) / rect.width  - 0.5;
            const ry = (e.clientY - rect.top)  / rect.height - 0.5;
            const slide = slideElsRef.current[curRef.current];
            if (!slide) return;
            const bgImg  = slide.querySelector('.ps-img');
            const bignum = slide.querySelector('.ps-bignum');
            if (bgImg)  gsap.to(bgImg,  { x: rx * 25, y: ry * 15, duration: 1.4, ease: 'power2.out' });
            if (bignum) gsap.to(bignum, { x: rx * -18, y: ry * -12, duration: 1.6, ease: 'power2.out' });
        };
        const handleMouseLeave = () => {
            isDragging = false;
            dragXRef.current = null;
            const slide = slideElsRef.current[curRef.current];
            if (slide) {
                gsap.to(slide.querySelector('.ps-img'),    { x: 0, y: 0, duration: 1.2, ease: 'expo.out' });
                gsap.to(slide.querySelector('.ps-bignum'), { x: 0, y: 0, duration: 1.4, ease: 'expo.out' });
            }
        };

        prevBtnRef.current?.addEventListener('click', handlePrev);
        nextBtnRef.current?.addEventListener('click', handleNext);
        document.addEventListener('keydown', handleKey);
        if (dz) {
            dz.addEventListener('mousedown',  handleMouseDown);
            window.addEventListener('mouseup',    handleMouseUp);
            dz.addEventListener('touchstart', handleTouchStart, { passive: true });
            window.addEventListener('touchend',   handleTouchEnd);
            dz.addEventListener('mousemove',  handleMouseMove);
            dz.addEventListener('mouseleave', handleMouseLeave);
        }
        return () => {
            prevBtnRef.current?.removeEventListener('click', handlePrev);
            nextBtnRef.current?.removeEventListener('click', handleNext);
            document.removeEventListener('keydown', handleKey);
            if (dz) {
                dz.removeEventListener('mousedown',  handleMouseDown);
                window.removeEventListener('mouseup',    handleMouseUp);
                dz.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchend',   handleTouchEnd);
                dz.removeEventListener('mousemove',  handleMouseMove);
                dz.removeEventListener('mouseleave', handleMouseLeave);
            }
            stopArc();
        };
    }, [isInitialized]);

    useEffect(() => { init(); }, []);

    return (
        <section
            ref={sectionRef}
            className="ps-root"
            style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#0d0d0d', color: '#F0ECE4' }}
        >
            {/* Ticker bar */}
            <div className="ps-ticker">
                <div className="ps-ticker-track" ref={tickerTrackRef} />
            </div>

            {/* Top progress bar */}
            <div className="ps-prog-bar">
                <div className="ps-prog-fill" ref={progFillRef} />
            </div>

            {/* Left vertical progress line */}
            <div className="ps-prog-line">
                <div className="ps-prog-line-fill" ref={progLineFillRef} />
            </div>

            {/* HUD counter */}
            <div className="ps-hud">
                <em className="ps-hud-cur" ref={hudCurRef}>01</em>
                {' / '}
                <span>{String(TOTAL).padStart(2, '0')}</span>
            </div>

            {/* Vertical label */}
            <div className="ps-vert-label">Selected Work · 2024</div>

            {/* Slides stage */}
            <div className="ps-stage" ref={stageRef} />

            {/* Bottom nav */}
            <nav className="ps-nav">
                <div className="ps-nav-center">
                    <button className="ps-nav-btn" ref={prevBtnRef} aria-label="Previous">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <div className="ps-dots" ref={dotsWrapRef} />
                    <button className="ps-nav-btn" ref={nextBtnRef} aria-label="Next">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className="ps-arc-wrap">
                    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22" cy="22" r="17" stroke="rgba(240,236,228,0.07)" strokeWidth="1.5"/>
                        <circle ref={arcFillRef} cx="22" cy="22" r="17" stroke="#F57500" strokeWidth="1.5" strokeLinecap="round" pathLength="100"/>
                    </svg>
                    <div className="ps-arc-num" ref={arcNumRef}>01</div>
                </div>
            </nav>

            {/* Drag zone - now with pointer-events: none so it doesn't block clicks */}
            <div className="ps-drag-zone" ref={dragZoneRef} />

            <style>{`
            
                @import url('https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Oswald:wght@500;700&family=Roboto:wght@500&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

                .font-oswald {
                    font-family: 'Oswald', sans-serif;
                }
            
                /* ── Scoped to .ps-root ── */
                .ps-root {
                    --o: #F57500;
                    --d: #191919;
                    --b: #0d0d0d;
                    --w: #F0ECE4;
                    --ease-expo: cubic-bezier(0.87,0,0.13,1);
                    --ease-back: cubic-bezier(0.34,1.56,0.64,1);
                    font-family: 'DM Sans', sans-serif;
                    cursor: default;
                    box-sizing: border-box;
                }

                /* Noise overlay */
                .ps-root::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
                    background-size: 160px 160px;
                    pointer-events: none;
                    z-index: 9900;
                    opacity: 0.7;
                    mix-blend-mode: overlay;
                }

                /* ── TICKER ── */
                .ps-ticker {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 40px;
                    border-bottom: 1px solid rgba(240,236,228,0.06);
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    background: rgba(17,16,16,.6);
                    backdrop-filter: blur(8px);
                    z-index: 10;
                }
                .ps-ticker-track {
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    animation: psTickScroll 24s linear infinite;
                    font-family: 'Space Mono', monospace;
                    font-size: 9px;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    color: rgba(242,237,230,.25);
                }
                .ps-ticker-track span { color: var(--o); margin: 0 8px; }
                @keyframes psTickScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

                /* ── PROGRESS BAR (horizontal, under ticker) ── */
                .ps-prog-bar {
                    position: absolute;
                    top: 40px; left: 0; right: 0;
                    height: 2px;
                    z-index: 20;
                    background: rgba(240,236,228,0.06);
                }
                .ps-prog-fill {
                    height: 100%;
                    background: var(--o);
                    width: 0%;
                    transition: width 0.6s var(--ease-expo);
                }

                /* ── PROGRESS LINE (vertical, left edge) ── */
                .ps-prog-line {
                    position: absolute;
                    left: 0; top: 42px; bottom: 64px;
                    width: 2px;
                    background: rgba(240,236,228,0.06);
                    z-index: 20;
                }
                .ps-prog-line-fill {
                    width: 100%;
                    background: var(--o);
                    height: 0%;
                    transition: height 0.8s var(--ease-expo);
                }

                /* ── HUD COUNTER ── */
                .ps-hud {
                    position: absolute;
                    top: 52px; right: max(16px, 2vw);
                    font-family: 'Space Mono', monospace;
                    font-size: clamp(10px, 2vw, 12px);
                    letter-spacing: 3px;
                    color: rgba(240,236,228,0.35);
                    background: rgba(13,13,13,0.6);
                    backdrop-filter: blur(10px);
                    padding: 6px 18px;
                    border-radius: 40px;
                    border: 0.5px solid rgba(245,117,0,0.2);
                    z-index: 10;
                }
                .ps-hud-cur { color: var(--o); font-style: normal; font-weight: bold; }

                /* ── VERTICAL LABEL ── */
                .ps-vert-label {
                    position: absolute;
                    right: 28px; top: 50%;
                    transform: translateY(-50%) rotate(90deg);
                    font-family: 'Space Mono', monospace;
                    font-size: 9px;
                    letter-spacing: 5px;
                    text-transform: uppercase;
                    color: rgba(240,236,228,0.12);
                    z-index: 6000;
                    white-space: nowrap;
                }

                /* ── STAGE ── */
                .ps-stage {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                /* ── SLIDES ── */
                .ps-slide {
                    position: absolute;
                    inset: 0;
                    display: grid;
                    grid-template-columns: 56% 44%;
                    clip-path: inset(0 100% 0 0);
                    will-change: clip-path;
                }

                /* LEFT PANEL */
                .ps-sl {
                    background: var(--d);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 0 60px 80px;
                    position: relative;
                    overflow: hidden;
                    border-right: 1px solid rgba(240,236,228,0.05);
                    z-index: 2;
                }
                .ps-bignum {
                    position: absolute;
                    top: -0.08em; left: -0.03em;
                    font-family: 'Anton', sans-serif;
                    font-size: clamp(200px, 26vw, 360px);
                    line-height: 1;
                    color: transparent;
                    -webkit-text-stroke: 2px rgb(240 236 228 / 15%);
                    pointer-events: none;
                    user-select: none;
                    letter-spacing: -6px;
                    will-change: transform;
                }
                .ps-sl::before {
                    content: ''; position: absolute;
                    bottom: -120px; left: -120px;
                    width: 400px; height: 400px; border-radius: 50%;
                    border: 1px solid rgba(245,117,0,0.06);
                    pointer-events: none;
                }
                .ps-sl::after {
                    content: ''; position: absolute;
                    bottom: -80px; left: -80px;
                    width: 260px; height: 260px; border-radius: 50%;
                    border: 1px solid rgba(245,117,0,0.04);
                    pointer-events: none;
                }
                .ps-content { position: relative; z-index: 2; }

                .ps-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; overflow: hidden; }
                .ps-eyebrow-line { width: 36px; height: 1.5px; background: var(--o); transform-origin: left; flex-shrink: 0; }
                .ps-eyebrow-text {
                    font-family: 'Space Mono', monospace;
                    font-size: 10px; letter-spacing: 4px;
                    text-transform: uppercase; color: var(--o);
                }

                .ps-title {
                    font-family: 'Oswald', sans-serif;
                    font-size: clamp(48px, 7.5vw, 100px);
                    line-height: 0.92;
                    letter-spacing: -1.5px;
                    text-transform: uppercase;
                    color: var(--w);
                    margin-bottom: 30px;
                    overflow: hidden;
                }
                .ps-title em { font-style: normal; color: var(--o); display: block; }
                .ps-title-line { overflow: hidden; display: block; }

                .ps-meta {
                    display: grid; grid-template-columns: repeat(3,1fr);
                    border-top: 1px solid rgba(240,236,228,0.08);
                    border-bottom: 1px solid rgba(240,236,228,0.08);
                    margin-bottom: 28px;
                }
                .ps-meta-cell { padding: 12px 0; border-right: 1px solid rgba(240,236,228,0.06); }
                .ps-meta-cell:last-child { border-right: none; }
                .ps-meta-cell label {
                    display: block;
                    font-family: 'Space Mono', monospace;
                    font-size: 8px; letter-spacing: 3px; text-transform: uppercase;
                    color: rgba(240,236,228,0.35); margin-bottom: 5px;
                }
                .ps-meta-cell span {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(11px,2vw,13px); font-weight: 700; color: var(--w);
                }

                .ps-desc {
                    font-size: clamp(13px, 2.2vw, 15px);
                    font-style: italic; font-weight: 300;
                    line-height: 1.65;
                    color: rgba(240,236,228,0.5);
                    max-width: 420px; margin-bottom: 26px;
                }

                .ps-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 34px; }
                .ps-tag {
                    font-family: 'Space Mono', monospace;
                    font-size: 8px; letter-spacing: 2.5px; text-transform: uppercase;
                    color: rgba(245,117,0,0.8);
                    border: 1px solid rgba(245,117,0,0.3);
                    padding: 5px 14px;
                    background: rgba(245,117,0,0.04);
                    transition: background 0.2s;
                }
                .ps-tag:hover { background: rgba(245,117,0,0.12); }
                
                .ps-cta {
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
                    border: 1px solid #F57500;
                    cursor: pointer;
                    z-index: 200;
                    pointer-events: auto;
                }

                /* Text */
                .ps-cta span {
                    position: relative;
                    z-index: 3;
                    transition: all 0.3s ease;
                }

                /* Sliding background */
                .ps-cta::before {
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
                .ps-cta::after {
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
                .ps-cta:hover:before {
                    width: 100%;
                }

                .ps-cta:hover:after {
                    left: 20px;
                }

                .ps-cta:hover span {
                    transform: translateX(10px);
                }
                
                .ps-cta span {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition-property: transform;
                    transition-duration: 300ms;
                }
                
                .ps-cta:hover span {
                    transform: translateX(0.75rem);
                }

                /* RIGHT PANEL */
                .ps-sr { position: relative; overflow: hidden; background: #0a0a0a; }
                .ps-stripe {
                    position: absolute; top: 0; bottom: 0; left: 0;
                    width: 5px; background: var(--o);
                    transform-origin: top; z-index: 3;
                }
                .ps-img-wrap { position: absolute; inset: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; }
                .ps-img { width: 100%; height: 100%; background-size: cover; background-position: center; will-change: transform; }
                .ps-img-grad {
                    position: absolute; inset: 0;
                    background: linear-gradient(to right, var(--d) 0%, rgba(25,25,25,0.6) 30%, rgba(0,0,0,0.2) 70%, transparent 100%);
                    z-index: 1;
                }
                .ps-bgyear {
                    position: absolute; bottom: 30px; right: 30px;
                    font-family: 'Anton', sans-serif;
                    -webkit-text-stroke: 1.8px rgba(245,117,0,0.65);
                    font-size: clamp(70px, 12vw, 140px);
                    line-height: 1;
                    color: rgba(240,236,228,0.18);
                    letter-spacing: -4px;
                    pointer-events: none; user-select: none;
                    z-index: 40; white-space: nowrap;
                    text-shadow: 0 0 12px rgba(0,0,0,0.3);
                    will-change: transform, opacity;
                }
                .ps-sr-meta { position: absolute; bottom: 30px; right: 30px; z-index: 4; text-align: right; }
                .ps-sr-meta-year {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(10px,2.5vw,14px); letter-spacing: 4px;
                    color: rgba(240,236,228,0.35);
                }
                .ps-sr-meta-role { font-size: clamp(8px,2vw,10px); font-weight: 300; color: rgba(240,236,228,0.2); margin-top: 3px; letter-spacing: 1px; }

                /* ── NAV ── */
                .ps-nav {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    height: 64px;
                    border-top: 1px solid rgba(240,236,228,0.06);
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 0 max(20px, 4vw);
                    background: rgba(17,16,16,.55);
                    backdrop-filter: blur(12px);
                    z-index: 10;
                }
                .ps-nav-center { display: flex; align-items: center; gap: 18px; }
                .ps-nav-btn {
                    width: 44px; height: 44px; border-radius: 50%;
                    border: 1px solid rgba(240,236,228,0.15);
                    background: transparent; color: var(--w);
                    display: flex; align-items: center; justify-content: center;
                    transition: background 0.2s, border-color 0.2s;
                    cursor: pointer;
                }
                .ps-nav-btn:hover { background: var(--o); border-color: var(--o); }

                .ps-dots { display: flex; align-items: center; gap: 8px; }
                .ps-dot {
                    width: 5px; height: 5px; border-radius: 50%;
                    background: rgba(240,236,228,0.2);
                    transition: all 0.4s var(--ease-expo);
                    cursor: pointer;
                }
                .ps-dot-active { width: 22px !important; border-radius: 3px !important; background: var(--o) !important; }

                /* ── ARC ── */
                .ps-arc-wrap { position: relative; width: 44px; height: 44px; flex-shrink: 0; }
                .ps-arc-wrap svg { position: absolute; inset: 0; transform: rotate(-90deg); }
                .ps-arc-wrap circle:last-child { stroke-dasharray: 100; stroke-dashoffset: 100; transition: stroke-dashoffset 0.05s linear; }
                .ps-arc-num {
                    position: absolute; inset: 0;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Anton', sans-serif;
                    font-size: 11px; letter-spacing: 1px; color: var(--o);
                }

                /* ── DRAG ZONE - fixed to not block clicks ── */
                .ps-drag-zone {
                    position: absolute;
                    top: 42px; left: 0; right: 0; bottom: 64px;
                    z-index: 100;
                    pointer-events: none;
                }

                /* Make sure CTA and other interactive elements are clickable */
                .ps-sl, .ps-content, .ps-cta {
                    pointer-events: auto;
                }

                /* ── RESPONSIVE ── */
                @media (max-width: 1024px) {
                    .ps-sl { padding: 0 40px 70px; }
                }
                @media (max-width: 900px) {
                    .ps-slide { grid-template-columns: 1fr; }
                    .ps-sl { justify-content: center; padding: 100px 36px 60px; background: linear-gradient(0deg, rgba(0,0,0,0.8), rgba(0,0,0,0.3)); }
                    .ps-sr { display: none; }
                    .ps-bignum { font-size: clamp(140px,36vw,280px); }
                    .ps-vert-label { display: none; }
                    .ps-prog-line  { display: none; }
                }
                @media (max-width: 768px) {
                    .ps-sl { padding: 80px 28px 50px; }
                    .ps-title { font-size: clamp(40px,7vw,64px); margin-bottom: 20px; }
                    // .ps-cta { height: 48px; padding: 0 24px; }
                    .ps-nav-btn { width: 38px; height: 38px; }
                    .ps-arc-wrap { width: 38px; height: 38px; }
                }
                @media (max-width: 480px) {
                    .ps-sl { padding: 70px 20px 50px; }
                    .ps-title { font-size: clamp(34px,8vw,52px); }
                    .ps-tag { font-size: 6px; padding: 3px 10px; }
                    // .ps-cta { height: 44px; gap: 8px; font-size: 9px; }
                    .ps-nav { padding: 0 16px; }
                    .ps-nav-btn { width: 36px; height: 36px; }
                }
            `}</style>
        </section>
    );
};

export default ProjectSliderSection;