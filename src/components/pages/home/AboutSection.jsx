import React, { useEffect, useRef } from 'react';
import img1 from '../../../assets/image/FB_IMG_1778660754468.jpg'
import img2 from '../../../assets/image/FB_IMG_1765465210215.jpg'

const AboutSection = () => {
    const leftTrackRef = useRef(null);
    const rightTrackRef = useRef(null);
    const sceneRef = useRef(null);

    const words = ['Design', 'Development', 'Php', 'Jquery', 'React', 'UI / UX', 'Figma', 'Node.js', 'Html', 'Css', 'Wordpress', 'Git'];

    useEffect(() => {
        // Build tickers
        const buildTicker = (container) => {
            if (!container) return;
            container.innerHTML = '';
            const repeats = 6;
            for (let i = 0; i < repeats; i++) {
                words.forEach(word => {
                    const wordSpan = document.createElement('span');
                    wordSpan.textContent = word;
                    container.appendChild(wordSpan);
                    const sepSpan = document.createElement('span');
                    sepSpan.className = 'sep';
                    sepSpan.textContent = '◆';
                    container.appendChild(sepSpan);
                });
            }
        };

        buildTicker(leftTrackRef.current);
        buildTicker(rightTrackRef.current);

        // Mouse move effect for photo scene
        const scene = sceneRef.current;
        if (scene) {
            const handleMouseMove = (e) => {
                const cx = window.innerWidth / 2;
                const cy = window.innerHeight / 2;
                const dx = (e.clientX - cx) / cx;
                const dy = (e.clientY - cy) / cy;
                scene.style.transform = `perspective(1000px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg)`;
            };
            const handleMouseLeave = () => {
                scene.style.transform = '';
            };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [words]);

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
                                        <p className="text-[11px] tracking-[4px] uppercase text-[#F57500] font-medium mb-2.5">My Story</p>
                                        <h2 className="font-syne font-extrabold text-[clamp(44px,7vw,72px)] leading-[0.95] text-[#313131]">
                                            About <span className="text-[#F57500]">Me</span>
                                        </h2>
                                    </div>
                                </div>
            {/* Grain/Noise overlay */}
            <div className="pointer-events-none fixed inset-0 z-[1000] mix-blend-multiply">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.02\'/%3E%3C/svg%3E')] bg-cover bg-center opacity-100"></div>
            </div>

            {/* Blob accents - commented out in original, kept as comment */}
            {/* <div className="blob blob-1"></div>
      <div className="blob blob-2"></div> */}

            {/* Main About Section */}
            <section className="relative z-[1] grid min-h-screen items-center gap-8 pb-20 md:grid-cols-1 lg:grid-cols-2 lg:pb-20">
                {/* Left Column */}
                <div className="relative w-full max-w-full lg:pr-[3vw]">
                    <h1 className="about__heading mb-5 translate-y-[44px] font-oswald uppercase text-[clamp(66px,8.2vw,116px)] leading-[0.88] tracking-[.01em] text-[#111] opacity-0 [animation:slideUp_.85s_cubic-bezier(.22,1,.36,1)_.25s_forwards]">
                        I <span className="outline inline-block text-transparent [-webkit-text-stroke:1.5px_#111]">Design</span><br />
                        <span
                            className="accent relative inline-block text-[#F57500] before:absolute before:inset-0 before:z-[-1] before:text-transparent before:opacity-20 before:content-[attr(data-text)] before:[-webkit-text-stroke:1px_#F57500] before:[transform:translate(3px,4px)]"
                            data-text="& Build"
                        >
                          & Build
                        </span>
                        <br />
                        the Web
                    </h1>

                    <div className="tagline mb-[30px] flex items-center gap-[14px] opacity-0 [animation:fadeIn_.6s_ease_.55s_forwards]">
                        <span className="tagline-text whitespace-nowrap font-['Syne',sans-serif] text-[11px] uppercase tracking-[.2em] text-black/40">
                          Designer · Developer · Creator
                        </span>
                        <span className="tagline-bar h-px flex-1 bg-gradient-to-r from-[#F57500]/35 to-transparent"></span>
                    </div>

                    <p className="about__bio mb-9 max-w-[450px] translate-y-6 border-l-2 border-[#F57500]/40 pl-[18px] font-['DM_Sans',sans-serif] text-[clamp(14px,1.2vw,16px)] font-normal leading-[1.85] text-black/65 opacity-0 [animation:slideUp_.8s_cubic-bezier(.22,1,.36,1)_.5s_forwards]">
                        I am <strong className="font-semibold text-black">Lakshan Rashmika</strong>, a passionate software engineer who builds modern digital solutions with clean code and thoughtful design. I specialize in creating <strong className="font-semibold text-black">responsive web applications and dynamic user interfaces</strong> using technologies like React, Node.js, PHP, and Java. Focused on performance, usability, and innovation — every project I build is designed to deliver real impact and seamless user experiences.
                    </p>

                    <div className="chips mb-[38px] flex flex-wrap gap-2 opacity-0 [animation:fadeIn_.7s_ease_.68s_forwards]">
                        {['UI / UX', 'React', 'Php', 'Wordpress', 'Node.js', 'Figma'].map((chip) => (
                            <span
                                key={chip}
                                className="chip relative cursor-pointer overflow-hidden border border-black/12 bg-transparent px-[15px] py-[7px] font-['Syne',sans-serif] text-[10px] font-semibold uppercase tracking-[.14em] text-black/65 transition-all duration-300 ease-in-out before:absolute before:inset-0 before:z-[-1] before:origin-left before:scale-x-0 before:bg-[#F57500] before:transition-transform before:duration-300 hover:border-[#F57500] hover:text-white hover:before:scale-x-100"
                            >
                            {chip}
                          </span>
                        ))}
                    </div>

                    {/*<div className="stats mb-[42px] flex gap-0 border border-black/6 bg-black/5 opacity-0 [animation:fadeIn_.8s_ease_.84s_forwards] md:flex-col">*/}
                    {/*    <div className="stat group relative flex-1 cursor-pointer p-[18px_22px] transition-colors duration-300 hover:bg-[#F57500]/4">*/}
                    {/*        <div className="stat__num font-['Bebas_Neue',sans-serif] flex items-baseline gap-0.5 text-[44px] leading-none text-[#111]">*/}
                    {/*            9<sup className="text-[20px] text-[#F57500]">+</sup>*/}
                    {/*        </div>*/}
                    {/*        <div className="stat__label mt-[5px] font-['Syne',sans-serif] text-[10px] uppercase tracking-[.18em] text-black/45">Years Exp</div>*/}
                    {/*        <div className="stat__bar absolute bottom-0 left-0 h-0.5 w-0 bg-[#F57500] transition-all duration-500 group-hover:w-full"></div>*/}
                    {/*    </div>*/}
                    {/*    <div className="stat group relative flex-1 cursor-pointer border-l border-black/6 p-[18px_22px] transition-colors duration-300 hover:bg-[#F57500]/4 md:border-l-0 md:border-t md:border-black/6">*/}
                    {/*        <div className="stat__num font-['Bebas_Neue',sans-serif] flex items-baseline gap-0.5 text-[44px] leading-none text-[#111]">*/}
                    {/*            48<sup className="text-[20px] text-[#F57500]">+</sup>*/}
                    {/*        </div>*/}
                    {/*        <div className="stat__label mt-[5px] font-['Syne',sans-serif] text-[10px] uppercase tracking-[.18em] text-black/45">Projects</div>*/}
                    {/*        <div className="stat__bar absolute bottom-0 left-0 h-0.5 w-0 bg-[#F57500] transition-all duration-500 group-hover:w-full"></div>*/}
                    {/*    </div>*/}
                    {/*    <div className="stat group relative flex-1 cursor-pointer border-l border-black/6 p-[18px_22px] transition-colors duration-300 hover:bg-[#F57500]/4 md:border-l-0 md:border-t md:border-black/6">*/}
                    {/*        <div className="stat__num font-['Bebas_Neue',sans-serif] flex items-baseline gap-0.5 text-[44px] leading-none text-[#111]">*/}
                    {/*            24<sup className="text-[20px] text-[#F57500]">/7</sup>*/}
                    {/*        </div>*/}
                    {/*        <div className="stat__label mt-[5px] font-['Syne',sans-serif] text-[10px] uppercase tracking-[.18em] text-black/45">Support</div>*/}
                    {/*        <div className="stat__bar absolute bottom-0 left-0 h-0.5 w-0 bg-[#F57500] transition-all duration-500 group-hover:w-full"></div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="cta-row flex translate-y-[18px] flex-wrap gap-[14px] opacity-0 [animation:slideUp_.8s_cubic-bezier(.22,1,.36,1)_1.05s_forwards] flex-col sm:flex-row">
                        <a href="#" className="btn btn--primary relative inline-flex cursor-pointer items-center gap-2.5 overflow-hidden border-none bg-[#F57500] px-[30px] py-[15px] font-['Syne',sans-serif] text-[12px] font-semibold uppercase tracking-[.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(245,117,0,0.25)] after:absolute after:inset-0 after:-translate-x-full after:skew-x-[-15deg] after:bg-white/30 after:transition-transform after:duration-400 hover:after:translate-x-[110%]">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download CV
                        </a>

                        <a href="#" className="btn-3 inline-block group cursor-pointer items-center gap-2.5 px-[30px] py-[15px] font-['Syne',sans-serif] text-[12px] font-semibold uppercase tracking-[.12em]">
                            <span className="relative z-10 group-hover:translate-x-3 transition-transform duration-300 flex items-center justify-center lg:justify-start font-['Syne',sans-serif]">Let's Talk</span>
                        </a>

                        {/*<a href="#" className="btn btn--ghost group inline-flex cursor-pointer items-center gap-2.5 border border-black/15 bg-transparent px-[30px] py-[15px] font-['Syne',sans-serif] text-[12px] font-semibold uppercase tracking-[.12em] text-black/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F57500] hover:text-[#F57500]">*/}
                        {/*    Let's Talk*/}
                        {/*    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="transition-transform duration-300 group-hover:translate-x-1">*/}
                        {/*        <line x1="5" y1="12" x2="19" y2="12" />*/}
                        {/*        <polyline points="12 5 19 12 12 19" />*/}
                        {/*    </svg>*/}
                        {/*</a>*/}
                    </div>
                </div>

                {/* Right Column - Photo Scene */}
                <div className="about__right relative flex items-center justify-center px-0 py-5 lg:pl-[30px]">
                    <div
                        ref={sceneRef}
                        className="photos-scene relative h-[550px] w-[440px] transition-transform duration-100 ease-out max-[860px]:mx-auto max-[860px]:h-[480px] max-[860px]:w-[420px] max-[540px]:h-[420px] max-[540px]:w-full max-[540px]:max-w-[360px] max-[380px]:scale-90"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="glow-orb absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-[pulse_4s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(245,117,0,0.1)_0%,transparent_70%)]"></div>
                        <div className="dot-matrix absolute bottom-[18px] left-[-16px] h-[86px] w-[86px] bg-[radial-gradient(circle,rgba(245,117,0,0.35)_1.2px,transparent_1.2px)] bg-[length:11px_11px] opacity-0 [animation:fadeIn_.8s_ease_1.65s_forwards] max-[860px]:bottom-0 max-[860px]:left-0"></div>
                        <div className="vert-text absolute left-[-48px] top-1/2 z-[2] hidden -translate-y-1/2 -rotate-90 whitespace-nowrap font-['Bebas_Neue',sans-serif] text-[11px] tracking-[.35em] text-black/12 lg:block">
                            Creative Portfolio 2025
                        </div>

                        {/* Main Photo */}
                        <div className="photo-main absolute left-[0px] top-0 z-[3] h-[500px] w-[360px] translate-y-9 scale-[0.97] opacity-0 [animation:revealPhoto_.9s_cubic-bezier(.22,1,.36,1)_.45s_forwards] max-[1100px]:h-[380px] max-[1100px]:w-[280px] max-[860px]:left-[20px] max-[860px]:h-[360px] max-[860px]:w-[260px] max-[540px]:left-2 max-[540px]:top-2.5 max-[540px]:h-[290px] max-[540px]:w-[210px]">
                            <div className="photo-main__img relative h-full w-full overflow-hidden">
                                <img
                                    src={img2}
                                    alt="Portrait"
                                    className="block h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#F57500]/5"></div>
                            </div>
                            <div className="photo-main__frame pointer-events-none absolute inset-0 translate-x-[14px] translate-y-[14px] border-2 border-[#F57500] opacity-0 [animation:fadeIn_.7s_ease_1.1s_forwards] max-[540px]:translate-x-2 max-[540px]:translate-y-2"></div>
                            <div className="photo-main__outline pointer-events-none absolute inset-0 border border-black/5"></div>
                        </div>

                        {/* Secondary Photo */}
                        <div className="photo-sec absolute bottom-0 right-0 z-[5] h-[272px] w-[214px] translate-y-[44px] scale-[0.96] opacity-0 [animation:revealPhoto_.9s_cubic-bezier(.22,1,.36,1)_.72s_forwards] max-[1100px]:h-[240px] max-[1100px]:w-[190px] max-[860px]:right-2.5 max-[860px]:h-[230px] max-[860px]:w-[180px] max-[540px]:bottom-2.5 max-[540px]:right-0 max-[540px]:h-[190px] max-[540px]:w-[150px]">
                            <div className="photo-sec__img relative h-full w-full overflow-hidden border-3 border-white shadow-[-6px_-6px_0_0_#F57500,0_28px_56px_rgba(0,0,0,0.08)]">
                                <img
                                    src={img1}
                                    alt="Workspace"
                                    className="block h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#F57500]/5"></div>
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="badge absolute left-[-20px] top-[43%] z-10 -rotate-8 scale-75 bg-[#F57500] px-5 py-[18px] text-center text-white opacity-0 shadow-[0_12px_36px_rgba(245,117,0,0.3)] [animation:popIn_.65s_cubic-bezier(.34,1.56,.64,1)_1.3s_forwards] max-[1100px]:left-[-10px] max-[1100px]:p-3 max-[860px]:left-[-5px] max-[860px]:top-[40%] max-[540px]:left-[-8px] max-[540px]:p-2">
                            <span className="badge__num block font-['Bebas_Neue',sans-serif] text-[40px] leading-none max-[540px]:text-[28px]">18+</span>
                            <span className="badge__text font-['Syne',sans-serif] text-[9px] font-semibold uppercase tracking-[.14em] text-white/85 max-[540px]:text-[7px]">Mon Exp</span>
                        </div>

                        {/* Expertise Card */}
                        <div className="exp-card absolute right-[-30px] top-[60px] z-10 min-w-[150px] -translate-y-[18px] border border-black/8 border-t-2 border-t-[#F57500] bg-[#FAFAFA]/96 p-[14px_18px] opacity-0 shadow-[0_12px_24px_rgba(0,0,0,0.03)] backdrop-blur-sm [animation:slideDown_.6s_cubic-bezier(.22,1,.36,1)_1.5s_forwards] max-[1100px]:right-[-10px] max-[1100px]:top-[30px] max-[860px]:right-0 max-[860px]:top-2.5 max-[860px]:min-w-[130px] max-[860px]:p-2">
                            <div className="exp-card__title mb-2 font-['Syne',sans-serif] text-[10px] font-semibold uppercase tracking-[.18em] text-[#F57500]">Expertise</div>
                            <ul className="exp-card__list flex flex-col gap-1.5">
                                {['Product Design', 'Frontend Dev', 'Brand Identity'].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-[12px] text-black/70 before:h-1 before:w-1 before:flex-shrink-0 before:rounded-full before:bg-[#F57500] max-[860px]:text-[10px]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Availability Card */}
                        <div className="avail-card absolute bottom-[56px] right-[-38px] z-10 flex translate-x-[18px] items-center gap-2.5 border border-black/6 bg-[#F8F8F8]/96 p-[11px_16px] opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.02)] backdrop-blur-sm [animation:slideLeft_.6s_cubic-bezier(.22,1,.36,1)_1.7s_forwards] max-[1100px]:bottom-10 max-[1100px]:right-[-20px] max-[860px]:bottom-5 max-[860px]:right-[-8px] max-[860px]:p-2 max-[540px]:bottom-[18px] max-[540px]:right-[-10px]">
                            <div className="avail-dot h-2 w-2 flex-shrink-0 animate-[blink_2s_ease-in-out_infinite] rounded-full bg-[#4ade80] shadow-[0_0_0_3px_rgba(74,222,128,0.2)]"></div>
                            <div className="avail-text font-['Syne',sans-serif] text-[11px] text-[#F57500] max-[860px]:text-[10px]">
                                <strong className="font-semibold text-[#F57500]">Available</strong> for work
                            </div>
                        </div>
                    </div>
                </div>
            </section>


                            </div>
                        </div>


                        {/* Tickers */}
                        <div className="ticker-wrap--left relative font-oswald uppercase flex h-[42px] w-full items-center overflow-hidden border-b border-white/20 bg-[#F57500] [transform:rotateZ(1deg)]">
                            <div
                                ref={leftTrackRef}
                                className="ticker-track--left flex animate-[tickerLeftToRight_40s_linear_infinite] whitespace-nowrap will-change-transform [&_span]:inline-flex [&_span]:flex-shrink-0 [&_span]:items-center [&_span]:px-7 [&_span]:text-[17px] [&_span]:font-medium [&_span:not(.sep)]:tracking-[.14em] [&_span]:text-white/85 [&_span]:uppercase [&_.sep]:px-1 [&_.sep]:text-[11px] [&_.sep]:text-white/40"
                            ></div>
                        </div>
                        <div className="ticker-wrap--right relative font-oswald uppercase flex h-[42px] w-full items-center overflow-hidden bg-[#1a1a1a] [transform:rotateZ(-1deg)]">
                            <div
                                ref={rightTrackRef}
                                className="ticker-track--right flex animate-[tickerRightToLeft_45s_linear_infinite] whitespace-nowrap will-change-transform [&_span]:inline-flex [&_span]:flex-shrink-0 [&_span]:items-center [&_span]:px-7 [&_span]:text-[17px] [&_span]:font-medium [&_span:not(.sep)]:tracking-[.14em] [&_span]:text-white/85 [&_span]:uppercase [&_.sep]:px-1 [&_.sep]:text-[11px] [&_.sep]:text-white/40"
                            ></div>
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

            {/* Keyframes Styles - Add to global CSS */}
            <style jsx>{`
                .section-separator:before {
                    content: '';
                    position: absolute;
                    left: 80px;
                    right: 0;
                    height: 10%;
                    background: #eee;
                    z-index: 1;
                }

                .section-separator:after {
                    content: '';
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    left: 74px;
                    top: -4px;
                    z-index: 2;
                    background: #F57500;
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

                .section-number span:before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    bottom: 50%;
                    top: 0;
                    left: 0;
                    background: #fff;
                    z-index: 2;
                }

                @media (max-width: 1500px) {
                    .column-wrap {
                        width: 100%;
                    }

                    #wrapper {
                        left: 0;
                        right: 0;
                    }
                }

                .btn-3 {
                    padding: 15px 30px;
                    position: relative;
                    color: #fff;
                    //text-transform: uppercase;
                    //font-size: 10px;
                    //letter-spacing: 2px;
                    //font-weight: 800;
                    background: #F57500;
                    overflow: hidden;
                    //display: inline-block;
                    //text-decoration: none;
                    border: 1px solid #F57500;
                }

                /* Text */
                .btn-3 span {
                    position: relative;
                    z-index: 3;
                    transition: all 0.3s ease;
                }

                /* Sliding background */
                .btn-3:before {
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
                .btn-3:after {
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
                .btn-3:hover:before {
                    width: 100%;
                }

                .btn-3:hover:after {
                    left: 20px;
                }

                .btn-3:hover span {
                    transform: translateX(10px);
                }

                //@media (min-width: 768px) {
                //    .col-sm-5 {
                //        flex: 0 0 41.666667%;
                //        max-width: 41.666667%;
                //    }
                //
                //    .col-sm-7 {
                //        flex: 0 0 58.333333%;
                //        max-width: 58.333333%;
                //    }
                //}
                //
                //@media (max-width: 764px) {
                //    //.column-wrap-container {
                //    //    padding: 60px 0 30px;
                //    //}
                //    .main-about {
                //        padding-left: 0;
                //        margin-top: 30px;
                //    }
                //
                //    .inline-facts-wrap {
                //        flex: 0 0 100% !important;
                //        max-width: 100% !important;
                //    }
                //}
                //
                //@media (max-width: 564px) {
                //    #wrapper {
                //        top: 40px;
                //    }
                //
                //    section {
                //        padding: 0 0;
                //    }
                //
                //    .section-number {
                //        font-size: 120px;
                //    }
                //
                //    .section-title h3 {
                //        font-size: 20px;
                //    }
                //
                //    .main-about h2 {
                //        font-size: 24px;
                //    }
                //}
                //
                //
                //@keyframes scroll3 {
                //    0% {
                //        top: 0;
                //        opacity: 1;
                //    }
                //    70% {
                //        top: 70%;
                //        opacity: 0.7;
                //    }
                //    100% {
                //        top: 100%;
                //        opacity: 0;
                //    }
                //}
                //
                //@keyframes scroll2 {
                //    0% {
                //        bottom: 0;
                //        opacity: 1;
                //    }
                //    70% {
                //        bottom: 70%;
                //        opacity: 0.7;
                //    }
                //    100% {
                //        bottom: 100%;
                //        opacity: 0;
                //    }
                //}
                //
                //.animate-scroll3 {
                //    animation: scroll3 8s infinite;
                //}
                //
                //.animate-scroll2 {
                //    animation: scroll2 6s infinite;
                //}
                //
                //@media (max-width: 991px) {
                //    .collage-image {
                //        margin-bottom: 50px;
                //    }
                //}
                //
                //@media (max-width: 767px) {
                //    //#about {
                //    //    padding: 60px 0;
                //    //}
                //    .collage-image::before {
                //        width: 150px;
                //        height: 150px;
                //    }
                //
                //    .features-box {
                //        flex-direction: column;
                //        align-items: center;
                //        text-align: center;
                //    }
                //}
                //
                //.btn {
                //    background: #F57500;
                //}
                //
                //.btn:before {
                //    content: '';
                //    position: absolute;
                //    left: 0;
                //    top: 0;
                //    height: 100%;
                //    width: 0;
                //    z-index: 1;
                //    background: #3C3C3C;
                //    transition: all 0.3s ease-in-out;
                //}
                //
                //.btn:after {
                //    font-family: "Font Awesome 5 Pro";
                //    content: "\\f105";
                //    position: absolute;
                //    top: 16px;
                //    left: -20px;
                //    z-index: 2;
                //    transition: all 0.3s ease-in-out;
                //    transition-delay: 0.2s;
                //    font-size: 11px;
                //}
                //
                //.btn:hover:before {
                //    width: 100%;
                //}
                //
                //.btn:hover:after {
                //    left: 26px;
                //}
                //
                //.btn:hover span {
                //    left: 13px;
                //}
                //
                //.section-separator:before {
                //    content: '';
                //    position: absolute;
                //    left: 80px;
                //    right: 0;
                //    height: 10%;
                //    background: #eee;
                //    z-index: 1;
                //}
                //
                //.section-separator:after {
                //    content: '';
                //    position: absolute;
                //    width: 8px;
                //    height: 8px;
                //    border-radius: 50%;
                //    left: 74px;
                //    top: -4px;
                //    z-index: 2;
                //    background: #F57500;
                //}
                //
                //.section-title h3:before {
                //    content: '';
                //    position: absolute;
                //    left: -90px;
                //    top: -10px;
                //    width: 150px;
                //    bottom: 4px;
                //    z-index: -1;
                //    background: #f2f2f2;
                //}
                //
                //.section-number span:before {
                //    content: '';
                //    position: absolute;
                //    width: 100%;
                //    bottom: 50%;
                //    top: 0;
                //    left: 0;
                //    background: #fff;
                //    z-index: 2;
                //}

                //@media (max-width: 1500px) {
                //    .column-wrap {
                //        width: 100%;
                //    }
                //
                //    #wrapper {
                //        left: 0;
                //        right: 0;
                //    }
                //}
                //
                //@media (min-width: 768px) {
                //    .col-sm-5 {
                //        flex: 0 0 41.666667%;
                //        max-width: 41.666667%;
                //    }
                //
                //    .col-sm-7 {
                //        flex: 0 0 58.333333%;
                //        max-width: 58.333333%;
                //    }
                //}
                //
                //@media (max-width: 764px) {
                //    //.column-wrap-container {
                //    //    padding: 20px 0 30px;
                //    //}
                //    .main-about {
                //        padding-left: 0;
                //        margin-top: 30px;
                //    }
                //
                //    .inline-facts-wrap {
                //        flex: 0 0 100% !important;
                //        max-width: 100% !important;
                //    }
                //}
                //
                //@media (max-width: 564px) {
                //    #wrapper {
                //        top: 40px;
                //    }
                //
                //    section {
                //        padding: 0 0;
                //    }
                //
                //    .section-number {
                //        font-size: 120px;
                //    }
                //
                //    .section-title h3 {
                //        font-size: 20px;
                //    }
                //
                //    .main-about h2 {
                //        font-size: 24px;
                //    }
                //}
                
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes revealPhoto {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes popIn {
          to {
            opacity: 1;
            transform: scale(1) rotate(-8deg);
          }
        }
        @keyframes blink {
          0%, 100% {
            box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
          }
          50% {
            box-shadow: 0 0 0 7px rgba(74, 222, 128, 0.05);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
        }
        @keyframes tickerRightToLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes tickerLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
        </div>
    );
};

export default AboutSection;