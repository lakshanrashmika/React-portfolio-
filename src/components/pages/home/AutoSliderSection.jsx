import React, { useEffect, useRef } from 'react';
import code from "../../../assets/code.png";

const AutoSliderSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        // Load fonts only (no jQuery, no Owl, no WOW)
        const fonts = [
            'https://fonts.googleapis.com/css2?family=Marcellus&display=swap',
            'https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap',
        ];
        const links = [];
        fonts.forEach((href) => {
            if (!document.querySelector(`link[href="${href}"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                document.head.appendChild(link);
                links.push(link);
            }
        });

        // Optional: fade-in reveal on mount
        if (sectionRef.current) {
            sectionRef.current.classList.add('ready');
        }

        return () => {
            links.forEach((l) => l.parentNode && l.parentNode.removeChild(l));
        };
    }, []);

    const categories = [
        { id: 1, name: 'Designer' },
        { id: 2, name: 'Developer' },
        { id: 3, name: 'Freelancer' },
        { id: 4, name: 'Creative' },
        { id: 5, name: 'Portfolio' },
        { id: 6, name: 'Branding' },
    ];

    // Repeat the array so the marquee has no visible gap
    const loopItems = [...categories, ...categories, ...categories];

    const CrossIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 64 64">
            <path
                d="M4 15.51a1 1 0 0 0 .71-.29L15.22 4.71a1 1 0 1 0-1.42-1.42L3.29 13.8a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.38a1 1 0 0 0 .71-.29L26.6 4.71a1 1 0 1 0-1.42-1.42L3.29 25.18a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.36a1 1 0 0 0 .71-.25L38 4.71a1 1 0 1 0-1.42-1.42L3.29 36.54a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.38a1 1 0 0 0 .71-.29L49.34 4.71a1 1 0 1 0-1.42-1.42L3.29 47.92a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zM60.71 3.29a1 1 0 0 0-1.42 0l-56 56a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l56-56a1 1 0 0 0 0-1.42zm-1.42 11.37L14.66 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l44.63-44.63a1 1 0 0 0-1.42-1.42zm0 11.34L26 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l33.29-33.25A1 1 0 0 0 59.29 26zm0 11.4L37.4 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l21.89-21.89a1 1 0 0 0-1.42-1.42zm0 11.38L48.78 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L60.71 50.2a1 1 0 0 0-1.42-1.42z"
                fill="rgba(221, 221, 221, 1)"
            />
        </svg>
    );

    const CircleIcon = () => (
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <circle
                className="spin2"
                cx="400"
                cy="400"
                fill="none"
                r="200"
                strokeWidth="50"
                stroke="#E387FF"
                strokeDasharray="700 1400"
                strokeLinecap="round"
            />
        </svg>
    );

    return (
        <div
            ref={sectionRef}
            className="auto-slider-section bg-white text-white font-sans relative w-full  overflow-hidden"
        >
            <section className="relative overflow-hidden w-full">
                <div className="twm-category-carousal-area relative py-10 overflow-hidden w-full">
                    {/* TOP ROW — moves left-to-right (reverse) */}
                    <div className="marquee-row">
                        <div className="marquee-track reverse">
                            {loopItems.map((category, i) => (
                                <div
                                    key={`top-${category.id}-${i}`}
                                    className="marquee-item"
                                >
                                    <div className="twm_category_bx cursor-scale">
                                        <span className="ao-our-categori-icon">
                                            <CrossIcon />
                                        </span>
                                        <div className="twm-category-name top-name">
                                            {category.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MIDDLE IMAGE */}
                    <div className="twm-category-carousal-mid-media">
                        <div className="mid-media-glow">
                            <img
                                src={code}
                                alt="3D House"
                                className="vert-move"
                            />
                        </div>
                    </div>

                    {/* BOTTOM ROW — moves right-to-left */}
                    <div className="marquee-row">
                        <div className="marquee-track">
                            {loopItems.map((category, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <div
                                        key={`bot-${category.id}-${i}`}
                                        className="marquee-item"
                                    >
                                        <div className="twm_category_bx cursor-scale">
                                            <span className="ao-our-categori-icon">
                                                {i === 3 ? <CrossIcon /> : <CircleIcon />}
                                            </span>
                                            <div
                                                className={`twm-category-name bot-name ${
                                                    isEven ? 'outline' : 'solid'
                                                }`}
                                            >
                                                {category.name}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .auto-slider-section {
                    font-family: 'Urbanist', sans-serif;
                    opacity: 0;
                    transition: opacity 0.6s ease;
                }
                .auto-slider-section.ready {
                    opacity: 1;
                }

                .twm-category-carousal-area {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 20px;
                    width: 100%;
                }

                /* ---------- MARQUEE ---------- */
                .marquee-row {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    z-index: 15;
                }

                .marquee-track {
                    display: flex;
                    align-items: center;
                    width: max-content;
                    animation: marquee-ltr 40s linear infinite;
                    will-change: transform;
                }

                .marquee-track.reverse {
                    animation: marquee-rtl 40s linear infinite;
                }

                /* Pause on hover (optional — remove if you want pure constant motion) */
                .marquee-row:hover .marquee-track {
                    animation-play-state: paused;
                }

                @keyframes marquee-ltr {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }

                @keyframes marquee-rtl {
                    0%   { transform: translateX(-33.333%); }
                    100% { transform: translateX(0); }
                }

                .marquee-item {
                    flex: 0 0 auto;
                    padding: 0 0px;
                }

                /* ---------- ITEM ---------- */
                .twm_category_bx {
                    display: flex;
                    align-items: center;
                    transition: transform 0.3s ease;
                }
                .twm_category_bx:hover {
                    transform: scale(1.05);
                }

                .ao-our-categori-icon {
                    display: inline-flex;
                    flex-shrink: 0;
                }

                .ao-our-categori-icon svg {
                    width: 100px;
                    height: 100px;
                }

                .twm_category_bx svg .spin2 {
                    stroke: #443935;
                    stroke-width: 5px;
                    transform-origin: center;
                    animation: spin2 8s ease-in-out infinite, spin 5s linear infinite;
                    animation-direction: alternate;
                }

                /* ---------- TEXT ---------- */
                .twm-category-name {
                    font-weight: 900;
                    text-transform: uppercase;
                    font-family: 'Urbanist', sans-serif;
                    line-height: 1;
                    white-space: nowrap;
                    padding-left: 20px;
                }

                /* TOP row — 3D extruded shadow */
                .top-name {
                    font-size: clamp(50px, 10vw, 160px);
                    letter-spacing: 0.15em;
                    color: #443935;
                    padding: 60px 60px;
                    text-shadow:
                            1px -1px 0 #767676,
                            -1px 2px 1px #737272,
                            -2px 4px 1px #767474,
                            -3px 6px 1px #787777,
                            -4px 8px 1px #7b7a7a,
                            -5px 10px 1px #7f7d7d,
                            -6px 12px 1px #828181,
                            -7px 14px 1px #868585,
                            -8px 16px 1px #8b8a89,
                            -9px 18px 1px #8f8e8d,
                            -10px 20px 1px #949392,
                            -12px 24px 1px #9e9c9c,
                            -14px 28px 1px #a8a6a6,
                            -16px 32px 1px #b2b1b0,
                            -18px 36px 1px #bcbbba;
                }

                /* BOTTOM row — big orange text */
                .bot-name {
                    font-size: clamp(48px, 10vw, 160px);
                    color: #e2791d;
                }

                .bot-name.outline {
                    color: #f9f3ea;
                    -webkit-text-fill-color: #f9f3ea;
                    -webkit-text-stroke-width: 1px;
                    -webkit-text-stroke-color: #443935;
                }

                .bot-name.solid {
                    color: #e2791d;
                }

                .outline {
                    outline-style: none;
                }

                /* ---------- MIDDLE IMAGE ---------- */
                .twm-category-carousal-mid-media {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 500px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    z-index: 15;
                    pointer-events: none;
                }

                .mid-media-glow {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                }

                .mid-media-glow::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: -66px;
                    z-index: -1;
                    width: 300px;
                    height: 200px;
                    background-color: #a6a6a6;
                    filter: blur(30px);
                    border-radius: 50%;
                }

                .mid-media-glow img {
                    width: 100%;
                    height: auto;
                    max-width: 500px;
                    display: block;
                }

                /* ---------- ANIMATIONS ---------- */
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @keyframes spin2 {
                    0%   { stroke-dasharray: 1, 800;    stroke-dashoffset: 0; }
                    50%  { stroke-dasharray: 400, 400;  stroke-dashoffset: -200px; }
                    100% { stroke-dasharray: 800, 1;    stroke-dashoffset: -800px; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(-20px); }
                    50%      { transform: translateY(20px); }
                }

                .vert-move {
                    animation: float 6s ease-in-out infinite;
                }

                /* ---------- RESPONSIVE ---------- */
                @media (max-width: 1024px) {
                    .twm-category-carousal-mid-media {
                        max-width: 400px;
                    }
                }
                
                @media (max-width: 767px) {
                    .ao-our-categori-icon svg {
                        width: 50px;
                        height: 50px;
                    }
                    .top-name {
                        padding: 30px 30px;
                    }
                    .twm-category-carousal-mid-media {
                        max-width: 240px;
                    }
                    .mid-media-glow::after {
                        width: 200px;
                        height: 50px;
                        bottom: -20px;
                    }
                }
            `}</style>
        </div>
    );
};

export default AutoSliderSection;