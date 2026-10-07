import React, { useEffect } from "react";
// import "./skills.css"; // <-- your SAME CSS file

const SkillsSection = () => {
    useEffect(() => {
        const C = 2 * Math.PI * 40;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const section = entry.target;

                    // donuts
                    const donuts = section.querySelectorAll("circle.df[data-pct]");
                    donuts.forEach((el) => {
                        const pctRaw = parseInt(el.dataset.pct);
                        const fraction = Math.min(Math.max(pctRaw / 100, 0), 1);
                        const dashLength = C * fraction;

                        setTimeout(() => {
                            el.style.strokeDasharray = `${dashLength} ${C}`;
                        }, 60);
                    });

                    // orange bars
                    const orangeBars = section.querySelectorAll(".bar-orange[data-w]");
                    orangeBars.forEach((el) => {
                        setTimeout(() => {
                            el.style.width = el.dataset.w + "%";
                        }, 60);
                    });

                    // dark indicators
                    const darkIndicators = section.querySelectorAll(".bar-dark[data-w]");
                    darkIndicators.forEach((el) => {
                        setTimeout(() => {
                            el.style.left = el.dataset.w + "%";
                        }, 60);
                    });

                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.2, rootMargin: "0px 0px -10px 0px" });

        const sections = document.querySelectorAll(".section");
        sections.forEach((section) => observer.observe(section));

        // initial states
        document.querySelectorAll("circle.df").forEach((c) => {
            c.style.strokeDasharray = `0 ${C}`;
        });

        document.querySelectorAll(".bar-orange").forEach((bar) => {
            bar.style.width = "0%";
        });

        document.querySelectorAll(".bar-dark").forEach((dark) => {
            dark.style.left = "0%";
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-white  font-sans relative">

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
                                        <p className="text-[11px] tracking-[4px] uppercase text-[#F57500] font-medium mb-2.5">
                                            Professional Strengths
                                        </p>

                                        <h2 className="font-syne font-extrabold text-[clamp(44px,7vw,72px)] leading-[0.95] text-[#313131]">
                                            My <span className="text-[#F57500]"> Skills</span>
                                        </h2>
                                    </div>
                                </div>

                                {/* SECTION 1 */}
                                <div className="section">
                                    <div className="sec-num-col">
                                        <div className="num-text">01.</div>
                                    </div>

                                    <div className="sec-info">
                                        <div className="sec-title">Design Skills</div>

                                        <div className="sec-desc">
                                            Crafting clean, modern, and user-focused interfaces with strong attention to usability, visual balance, and seamless user experience.
                                        </div>
                                    </div>

                                    <div className="sec-content">
                                        <div className="watermark">ATTAIN</div>

                                        <div className="donuts-row">
                                            {[
                                                { label: "Design", pct: 85 },
                                                { label: "WooCommerce", pct: 95 },
                                                { label: "Ecommerce", pct: 80 }
                                            ].map((item, i) => (
                                                <div className="donut-cell" key={i}>
                                                    <div className="donut-svg-wrap">
                                                        <svg viewBox="0 0 90 90">
                                                            <circle className="dt" cx="45" cy="45" r="40" />
                                                            <circle className="df" cx="45" cy="45" r="40" data-pct={item.pct} />
                                                        </svg>
                                                        <div className="donut-pct">{item.pct}%</div>
                                                    </div>
                                                    <div className="donut-label">{item.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2 */}
                                <div className="section">
                                    <div className="sec-content-2">
                                        <div className="sec-num-col">
                                            <div className="num-text">02.</div>
                                        </div>

                                        <div className="sec-info">
                                            <div className="sec-title">Core Frontend Skills</div>

                                            <div className="sec-desc">
                                                Building responsive and interactive user interfaces using modern frontend technologies like HTML5, CSS3, JavaScript, and TypeScript with a focus on performance, accessibility, and clean UI design.
                                            </div>
                                        </div>

                                        <div className="watermark">EXPERT</div>

                                        <div className="bars-wrap">
                                            {[
                                                { name: "HTML5", pct: 95 },
                                                { name: "CSS3", pct: 90 },
                                                { name: "JavaScript", pct: 75 },
                                                { name: "TypeScript", pct: 80 }
                                            ].map((item, i) => (
                                                <div className="bar-item" key={i}>
                                                    <div className="bar-meta">
                                                        <span className="bar-name">{item.name}</span>
                                                        <span className="bar-pct">{item.pct}%</span>
                                                    </div>

                                                    <div className="bar-track">
                                                        <div className="bar-orange" data-w={item.pct}></div>
                                                        <div className="bar-dark" data-w={item.pct}></div>
                                                        <div className="bar-tail"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3 */}
                                <div className="section">
                                    <div className="sec-content-3">
                                        <div className="sec-num-col">
                                            <div className="num-text">03.</div>
                                        </div>

                                        <div className="sec-info">
                                            <div className="sec-title">Software Development Skills</div>
                                            <div className="sec-desc">
                                                Developing modern, scalable applications using React JS, Next JS, PHP, and Java with a focus on performance, clean architecture, and user-friendly experiences.
                                            </div>                                        </div>

                                        <div className="watermark">EXPERT</div>

                                        <div className="bars-wrap">
                                            {[
                                                { name: "React JS", pct: 85 },
                                                { name: "Next JS", pct: 70 },
                                                { name: "PHP", pct: 75 },
                                                { name: "java", pct: 65 }
                                            ].map((item, i) => (
                                                <div className="bar-item" key={i}>
                                                    <div className="bar-meta">
                                                        <span className="bar-name">{item.name}</span>
                                                        <span className="bar-pct">{item.pct}%</span>
                                                    </div>

                                                    <div className="bar-track">
                                                        <div className="bar-orange" data-w={item.pct}></div>
                                                        <div className="bar-dark" data-w={item.pct}></div>
                                                        <div className="bar-tail"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 4 */}
                                <div className="section">
                                    <div className="sec-content-4">
                                        <div className="sec-num-col">
                                            <div className="num-text">04.</div>
                                        </div>

                                        <div className="sec-info">
                                            <div className="sec-title">UI Styling Skills</div>

                                            <div className="sec-desc">
                                                Designing modern and responsive user interfaces with clean layouts, smooth visuals, and consistent styling using CSS3, Tailwind CSS, Bootstrap, and SCSS for a polished user experience.
                                            </div>
                                        </div>

                                        <div className="watermark">EXPERT</div>

                                        <div className="bars-wrap">
                                            {[
                                                { name: "Tailwind CSS", pct: 90 },
                                                { name: "Bootstrap", pct: 85 },
                                                { name: "SASS / SCSS", pct: 85 },
                                                { name: "Material UI", pct: 80 }
                                            ].map((item, i) => (
                                                <div className="bar-item" key={i}>
                                                    <div className="bar-meta">
                                                        <span className="bar-name">{item.name}</span>
                                                        <span className="bar-pct">{item.pct}%</span>
                                                    </div>

                                                    <div className="bar-track">
                                                        <div className="bar-orange" data-w={item.pct}></div>
                                                        <div className="bar-dark" data-w={item.pct}></div>
                                                        <div className="bar-tail"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 5 */}
                                <div className="section">
                                    <div className="sec-content-3">
                                        <div className="sec-num-col">
                                            <div className="num-text">05.</div>
                                        </div>

                                        <div className="sec-info">
                                            <div className="sec-title">Tools Skills</div>
                                            <div className="sec-desc">
                                                Leveraging industry-standard tools including version control systems, API testing tools, and cloud services to ensure smooth development, collaboration, and deployment processes.
                                            </div>
                                        </div>

                                        <div className="watermark">EXPERT</div>

                                        <div className="bars-wrap">
                                            {[
                                                { name: "Git & GitHub", pct: 70 },
                                                { name: "REST APIs", pct: 60 },
                                                { name: "Postman", pct: 60 },
                                                { name: "phpMyAdmin", pct: 65 },
                                            ].map((item, i) => (
                                                <div className="bar-item" key={i}>
                                                    <div className="bar-meta">
                                                        <span className="bar-name">{item.name}</span>
                                                        <span className="bar-pct">{item.pct}%</span>
                                                    </div>

                                                    <div className="bar-track">
                                                        <div className="bar-orange" data-w={item.pct}></div>
                                                        <div className="bar-dark" data-w={item.pct}></div>
                                                        <div className="bar-tail"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 6 */}
                                <div className="section">
                                    <div className="sec-content-4">
                                        <div className="sec-num-col">
                                            <div className="num-text">06.</div>
                                        </div>

                                        <div className="sec-info">
                                            <div className="sec-title">Database</div>

                                            <div className="sec-desc">
                                                Managing and optimizing MySQL databases for secure and efficient data handling in web applications.
                                            </div>
                                        </div>

                                        <div className="watermark">EXPERT</div>

                                        <div className="bars-wrap">
                                            {[
                                                { name: "MongoDB", pct: 70 },
                                                { name: "MySQL", pct: 85 },
                                            ].map((item, i) => (
                                                <div className="bar-item" key={i}>
                                                    <div className="bar-meta">
                                                        <span className="bar-name">{item.name}</span>
                                                        <span className="bar-pct">{item.pct}%</span>
                                                    </div>

                                                    <div className="bar-track">
                                                        <div className="bar-orange" data-w={item.pct}></div>
                                                        <div className="bar-dark" data-w={item.pct}></div>
                                                        <div className="bar-tail"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 7 */}
                                <div className="section">
                                    <div className="sec-num-col">
                                        <div className="num-text">07.</div>
                                    </div>

                                    <div className="sec-info">
                                        <div className="sec-title">Language Skills</div>
                                        <div className="sec-desc">
                                            Fluent in Sinhala and English for effective communication and collaboration.
                                        </div>                                    </div>

                                    <div className="sec-content">
                                        <div className="watermark">FLUENT</div>

                                        <div className="donuts-row">
                                            {[
                                                { label: "English", pct: 85 },
                                                { label: "Sinhala", pct: 100 },
                                                // { label: "Tamil", pct: 10 }
                                            ].map((item, i) => (
                                                <div className="donut-cell" key={i}>
                                                    <div className="donut-svg-wrap">
                                                        <svg viewBox="0 0 90 90">
                                                            <circle className="dt" cx="45" cy="45" r="40" />
                                                            <circle className="df" cx="45" cy="45" r="40" data-pct={item.pct} />
                                                        </svg>
                                                        <div className="donut-pct">{item.pct}%</div>
                                                    </div>
                                                    <div className="donut-label">{item.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
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

                .section {
                    display: flex;
                    position: relative;
                    border-bottom: 1px solid #e8e8e8;
                    min-height: 200px;
                    width: 100%;
                }

                .sec-num-col {
                    width: 60px;
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 36px;
                    position: relative;
                }

                .sec-num-col::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    width: 1px;
                    background: #e8e8e8;
                }

                .sec-num-col::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: -1px;
                    width: 3px;
                    height: 56px;
                    background: #F57500;
                    z-index: 1;
                }

                .num-text {
                    font-size: 1rem;
                    font-weight: 800;
                    color: rgba(49, 49, 49, 0.13);
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                    letter-spacing: 0.06em;
                    margin-top: 10px;
                }

                /* INFO PANEL */
                .sec-info {
                    width: 240px;
                    flex-shrink: 0;
                    padding: 36px 24px;
                    position: relative;
                }

                .sec-title {
                    font-size: 1.1rem;
                    font-weight: 800;
                    margin-bottom: 12px;
                    line-height: 1.2;
                }

                .sec-desc {
                    font-size: 0.72rem;
                    color: rgba(49, 49, 49, 0.5);
                    line-height: 1.75;
                }

                /* CONTENT WRAPPERS (original classes remained, now with improved responsiveness) */
                .sec-content,
                .sec-content-2,
                .sec-content-3,
                .sec-content-4 {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    min-width: 0; /* critical for flex children to respect shrinking */
                }

                /* watermark stays absolute but adjusts size on mobile via media queries */
                .watermark {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 7.5rem;
                    font-weight: 900;
                    color: rgba(49, 49, 49, 0.045);
                    white-space: nowrap;
                    pointer-events: none;
                    user-select: none;
                    z-index: 0;
                }

                /* ----- DONUT GRID (flexible, fixes mobile overflow) ----- */
                .donuts-row {
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    justify-content: space-evenly;
                    background: transparent;
                }

                .donut-cell {
                    flex: 1 1 180px;
                    min-width: 160px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 28px 8px 20px;
                    border-left: 1px solid #e8e8e8;
                    transition: all 0.2s;
                }

                .donut-svg-wrap {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    margin-bottom: 14px;
                }

                .donut-svg-wrap svg {
                    width: 100px;
                    height: 100px;
                    display: block;
                }

                circle.dt {
                    fill: none;
                    stroke: #e8e8e8;
                    stroke-width: 10;
                }

                circle.df {
                    fill: none;
                    stroke: #F57500;
                    stroke-width: 10;
                    stroke-linecap: butt;
                    stroke-dasharray: 0 251.3;
                    transform-origin: 50% 50%;
                    transform: rotate(-90deg);
                    transition: stroke-dasharray 1.2s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .donut-pct {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.88rem;
                    font-weight: 700;
                    color: #313131;
                }

                .donut-label {
                    font-size: 0.72rem;
                    color: rgba(49, 49, 49, 0.5);
                    font-weight: 600;
                    text-align: center;
                    margin-top: 4px;
                }

                /* ----- HORIZONTAL BARS (preserve style, fixes width behavior) ----- */
                .bars-wrap {
                    width: 50%;
                    padding: 28px 30px 28px 20px;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    z-index: 1;
                    background: transparent;
                }

                .bar-item {
                    padding: 10px 0;
                    border-bottom: 1px solid #f0f0f0;
                }

                .bar-meta {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 7px;
                }

                .bar-name,
                .bar-pct {
                    font-size: 0.78rem;
                    font-weight: 600;
                }

                .bar-track {
                    height: 7px;
                    background: #e8e8e8;
                    position: relative;
                    overflow: hidden;
                }

                .bar-orange {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background: #F57500;
                    width: 0%;
                    transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
                    z-index: 2;
                }

                .bar-dark {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    width: 22px;
                    background: #313131;
                    left: 0%;
                    transform: translateX(-100%);
                    transition: left 1.2s cubic-bezier(0.22, 1, 0.36, 1);
                    z-index: 1;
                }

                .bar-tail {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                    width: 4px;
                    background: #313131;
                    z-index: 3;
                }

                /* ============================================= */
                /* RESPONSIVE FIXES: Tablet (preserve design)    */
                /* ============================================= */
                @media (max-width: 992px) {
                    .sec-info {
                        width: 200px;
                        padding: 28px 18px;
                    }

                    .bars-wrap {
                        width: 65%;
                        padding: 24px 20px;
                    }

                    .watermark {
                        font-size: 5rem;
                    }

                    .donut-cell {
                        min-width: 140px;
                        padding: 20px 6px 16px;
                    }
                }

                /* ============================================= */
                /* CRITICAL MOBILE FIX: stack sections perfectly */
                /* ============================================= */
                @media (max-width: 768px) {
                    .section {
                        flex-direction: column;
                        min-height: auto;
                    }

                    /* Orange vertical line + number row becomes horizontal */
                    .sec-num-col {
                        width: 100%;
                        height: 48px;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        padding-top: 0;
                        background: #fefaf7;
                        position: relative;
                    }

                    .sec-num-col::after {
                        display: none;
                    }

                    .sec-num-col::before {
                        top: 50%;
                        transform: translateY(-50%);
                        right: auto;
                        left: 0;
                        width: 56px;
                        height: 3px;
                        background: #F57500;
                    }

                    .num-text {
                        writing-mode: horizontal-tb;
                        transform: none;
                        margin-top: 0;
                        font-size: 1rem;
                        letter-spacing: 0.1em;
                        background: transparent;
                    }

                    .sec-info {
                        width: 100%;
                        text-align: center;
                        padding: 20px 20px 12px;
                    }

                    .sec-desc {
                        max-width: 85%;
                        margin: 0 auto;
                    }

                    /* All content wrappers become full width, stacking cleanly */
                    .sec-content,
                    .sec-content-2,
                    .sec-content-3,
                    .sec-content-4 {
                        width: 100%;
                        justify-content: center;
                        flex-direction: column;
                    }

                    /* Adjust bars width to full on mobile */
                    .bars-wrap {
                        width: 100%;
                        padding: 20px 24px 30px;
                    }

                    /* Donut cells: remove lateral borders, add top separation */
                    .donuts-row {
                        flex-wrap: wrap;
                        justify-content: center;
                    }

                    .donut-cell {
                        min-width: 46%;
                        flex: 1 1 160px;
                        border-left: none;
                        border-top: 1px solid #e8e8e8;
                        padding: 24px 10px 20px;
                    }

                    .donut-cell:first-child {
                        border-top: none;
                    }

                    /* watermark scales nicely */
                    .watermark {
                        font-size: 3.8rem;
                        white-space: nowrap;
                        opacity: 0.6;
                    }

                    /* fix extra spacing issue with double content alignment */
                    .sec-content-2,
                    .sec-content-3,
                    .sec-content-4 {
                        display: flex;
                        flex-direction: column;
                    }

                    .sec-content .watermark,
                    .sec-content-2 .watermark,
                    .sec-content-3 .watermark,
                    .sec-content-4 .watermark {
                        position: absolute;
                        pointer-events: none;
                    }
                }

                /* ============================================= */
                /* SMALL MOBILE (≤480px): preserve clean look    */
                /* ============================================= */
                @media (max-width: 480px) {
                    .sec-title {
                        font-size: 1.5rem;
                    }

                    .sec-desc {
                        font-size: 0.88rem;
                        max-width: 95%;
                    }

                    .watermark {
                        font-size: 2.4rem;
                        white-space: nowrap;
                        letter-spacing: -1px;
                    }

                    .donut-svg-wrap {
                        width: 85px;
                        height: 85px;
                    }

                    .donut-svg-wrap svg {
                        width: 85px;
                        height: 85px;
                    }

                    .donut-pct {
                        font-size: 0.75rem;
                    }

                    .donut-label {
                        font-size: 0.68rem;
                    }

                    .bars-wrap {
                        padding: 16px 20px 24px;
                    }

                    .bar-name,
                    .bar-pct {
                        font-size: 0.72rem;
                    }

                    .bar-item {
                        padding: 8px 0;
                    }

                    .sec-num-col::before {
                        width: 42px;
                    }
                }

                /* ultra small devices (≤380px) the donut cells become full width */
                @media (max-width: 380px) {
                    .donut-cell {
                        min-width: 100%;
                        border-top: 1px solid #e8e8e8;
                    }

                    .donut-cell:first-child {
                        border-top: 1px solid #e8e8e8;
                    }

                    .donuts-row .donut-cell:first-child {
                        border-top: none;
                    }

                    .bars-wrap {
                        padding: 16px 16px 24px;
                    }
                }

                /* preserve original aesthetic for left/right alignment for section 2/3/4 but ensures no breakage */
                .sec-content-2, .sec-content-4 {
                    justify-content: flex-end;
                }

                .sec-content-3 {
                    justify-content: flex-start;
                }

                /* fix potential overlapping for large watermark + content readability */
                .bars-wrap, .donuts-row {
                    position: relative;
                    z-index: 2;
                }

                /* ensure that any leftover alignment from original HTML is resolved */
                .section .sec-content,
                .section .sec-content-2,
                .section .sec-content-3,
                .section .sec-content-4 {
                    overflow: visible;
                }

                /* fix for odd border on last section */
                .section:last-child {
                    border-bottom: none;
                }
            `}</style>

        </div>
    );
};

export default SkillsSection;