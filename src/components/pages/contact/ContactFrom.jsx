import React, { useState, useEffect, useRef } from 'react';

const ContactFrom = () => {
    const [localTime, setLocalTime] = useState('');
    const [formData, setFormData] = useState({
        fn: '',
        em: '',
        ph: '',
        sb: '',
        ms: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submittedName, setSubmittedName] = useState('');
    const [submittedEmail, setSubmittedEmail] = useState('');

    // Update local time
    useEffect(() => {
        const updateTime = () => {
            const t = new Date().toLocaleTimeString('en-LK', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Asia/Colombo'
            });
            setLocalTime(t + ' (IST)');
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Intersection Observer for reveal animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('on');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );

        document.querySelectorAll('.rv').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (e) => {
        setFormData((prev) => ({ ...prev, sb: e.target.value }));
    };

    const handleSendMessage = () => {
        const { fn, em, sb, ms } = formData;
        if (!fn.trim() || !em.trim() || !sb || !ms.trim()) {
            const btn = document.querySelector('.send-btn');
            if (btn) {
                btn.style.animation = 'shake 0.4s ease';
                btn.addEventListener(
                    'animationend',
                    () => {
                        if (btn) btn.style.animation = '';
                    },
                    { once: true }
                );
            }
            return;
        }
        setSubmittedName(fn.split(' ')[0]);
        setSubmittedEmail(em);
        setFormSubmitted(true);
    };

    const handleResetForm = () => {
        setFormData({
            fn: '',
            em: '',
            ph: '',
            sb: '',
            ms: ''
        });
        setFormSubmitted(false);
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-white text-[#313131] font-['Manrope',sans-serif] ">
            {/* Hero Section */}
            <section className="hero min-h-screen relative overflow-hidden bg-white">
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
                {/* Ticker */}
                <div className="ticker-wrap overflow-hidden border-y border-[#313131] bg-[#F57500] py-2.5 relative z-[2]">
                    <div className="ticker-inner flex gap-0 animate-[tickerMove_20s_linear_infinite] w-max">
                        {[...Array(2)].map((_, i) => (
                            <React.Fragment key={i}>
                                <div className="ticker-item flex items-center gap-7 px-7 whitespace-nowrap font-['Syne',sans-serif] text-[0.75rem] font-bold tracking-[0.14em] uppercase text-white">
                                    <span className="ticker-dot w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>Web Design
                                </div>
                                <div className="ticker-item flex items-center gap-7 px-7 whitespace-nowrap font-['Syne',sans-serif] text-[0.75rem] font-bold tracking-[0.14em] uppercase text-white">
                                    <span className="ticker-dot w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>UI/UX Design
                                </div>
                                <div className="ticker-item flex items-center gap-7 px-7 whitespace-nowrap font-['Syne',sans-serif] text-[0.75rem] font-bold tracking-[0.14em] uppercase text-white">
                                    <span className="ticker-dot w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>Branding
                                </div>
                                <div className="ticker-item flex items-center gap-7 px-7 whitespace-nowrap font-['Syne',sans-serif] text-[0.75rem] font-bold tracking-[0.14em] uppercase text-white">
                                    <span className="ticker-dot w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>Motion Design
                                </div>
                                <div className="ticker-item flex items-center gap-7 px-7 whitespace-nowrap font-['Syne',sans-serif] text-[0.75rem] font-bold tracking-[0.14em] uppercase text-white">
                                    <span className="ticker-dot w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>Development
                                </div>
                                <div className="ticker-item flex items-center gap-7 px-7 whitespace-nowrap font-['Syne',sans-serif] text-[0.75rem] font-bold tracking-[0.14em] uppercase text-white">
                                    <span className="ticker-dot w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>Prototyping
                                </div>
                                <div className="ticker-item flex items-center gap-7 px-7 whitespace-nowrap font-['Syne',sans-serif] text-[0.75rem] font-bold tracking-[0.14em] uppercase text-white">
                                    <span className="ticker-dot w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>Strategy
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* Marquee Section */}
            <div className="marquee-sec flex items-center overflow-hidden border-y border-[rgba(49,49,49,0.1)] py-5 bg-white rv opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <div className="marquee-track flex animate-[marquee_18s_linear_infinite] w-max hover:animation-play-state-paused">
                    {[...Array(2)].map((_, i) => (
                        <React.Fragment key={i}>
              <span className="m-item flex items-center gap-8 px-8 font-['Syne',sans-serif] text-[1.05rem] font-bold text-[rgba(49,49,49,0.2)] tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 hover:text-[#F57500]">
                Branding<span className="m-star text-[#F57500] text-[1.2rem]">✦</span>
              </span>
                            <span className="m-item flex items-center gap-8 px-8 font-['Syne',sans-serif] text-[1.05rem] font-bold text-[rgba(49,49,49,0.2)] tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 hover:text-[#F57500]">
                Web Design<span className="m-star text-[#F57500] text-[1.2rem]">✦</span>
              </span>
                            <span className="m-item flex items-center gap-8 px-8 font-['Syne',sans-serif] text-[1.05rem] font-bold text-[rgba(49,49,49,0.2)] tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 hover:text-[#F57500]">
                UI Systems<span className="m-star text-[#F57500] text-[1.2rem]">✦</span>
              </span>
                            <span className="m-item flex items-center gap-8 px-8 font-['Syne',sans-serif] text-[1.05rem] font-bold text-[rgba(49,49,49,0.2)] tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 hover:text-[#F57500]">
                Interaction<span className="m-star text-[#F57500] text-[1.2rem]">✦</span>
              </span>
                            <span className="m-item flex items-center gap-8 px-8 font-['Syne',sans-serif] text-[1.05rem] font-bold text-[rgba(49,49,49,0.2)] tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 hover:text-[#F57500]">
                Prototyping<span className="m-star text-[#F57500] text-[1.2rem]">✦</span>
              </span>
                            <span className="m-item flex items-center gap-8 px-8 font-['Syne',sans-serif] text-[1.05rem] font-bold text-[rgba(49,49,49,0.2)] tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 hover:text-[#F57500]">
                Motion<span className="m-star text-[#F57500] text-[1.2rem]">✦</span>
              </span>
                            <span className="m-item flex items-center gap-8 px-8 font-['Syne',sans-serif] text-[1.05rem] font-bold text-[rgba(49,49,49,0.2)] tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 hover:text-[#F57500]">
                Development<span className="m-star text-[#F57500] text-[1.2rem]">✦</span>
              </span>
                            <span className="m-item flex items-center gap-8 px-8 font-['Syne',sans-serif] text-[1.05rem] font-bold text-[rgba(49,49,49,0.2)] tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 hover:text-[#F57500]">
                Strategy<span className="m-star text-[#F57500] text-[1.2rem]">✦</span>
              </span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <section className="contact bg-white py-16 md:py-24 px-6 md:px-14 rv opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" id="contact">
                <div className="sec-hd flex justify-between items-end flex-wrap gap-6 mb-14 pb-7 border-b border-[rgba(49,49,49,0.1)]">
                    <div>
                        <div className="sec-num font-['Syne_Mono',monospace] text-[0.65rem] text-[#F57500] tracking-[0.25em] mb-3">003 — Contact</div>
                        <h2 className="sec-title font-['Syne',sans-serif] text-[clamp(3rem,5vw,5.5rem)] font-extrabold tracking-[-0.04em] leading-[0.92] text-[#313131]">
                            SAY<br /><span className="text-[#F57500]">HELLO.</span>
                        </h2>
                    </div>
                    <p className="sec-note max-w-[280px] text-[0.82rem] leading-[1.75] text-[rgba(49,49,49,0.5)]  md:text-right text-left">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
                </div>

                <div className="contact-cols grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-[rgba(49,49,49,0.12)]">
                    {/* Form Column */}
                    <div className="col-form bg-white  md:p-14">
                        {!formSubmitted ? (
                            <div id="fBody">
                                <div className="fld-row grid grid-cols-1 md:grid-cols-2 gap-7">
                                    <div className="fld flex flex-col gap-2 mb-6">
                                        <label htmlFor="fn" className="font-['Syne_Mono',monospace] text-[0.6rem] tracking-[0.2em] uppercase text-[#F57500]">Full Name</label>
                                        <input
                                            id="fn"
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.fn}
                                            onChange={handleInputChange}
                                            className="border-0 border-b-[1.5px] border-[rgba(49,49,49,0.15)] bg-transparent text-[#313131] font-['Manrope',sans-serif] text-[0.95rem] font-medium py-2.5 outline-none w-full transition-colors duration-250 focus:border-[#F57500] placeholder:text-[rgba(49,49,49,0.25)]"
                                        />
                                    </div>
                                    <div className="fld flex flex-col gap-2 mb-6">
                                        <label htmlFor="em" className="font-['Syne_Mono',monospace] text-[0.6rem] tracking-[0.2em] uppercase text-[#F57500]">Email</label>
                                        <input
                                            id="em"
                                            type="email"
                                            placeholder="john@email.com"
                                            value={formData.em}
                                            onChange={handleInputChange}
                                            className="border-0 border-b-[1.5px] border-[rgba(49,49,49,0.15)] bg-transparent text-[#313131] font-['Manrope',sans-serif] text-[0.95rem] font-medium py-2.5 outline-none w-full transition-colors duration-250 focus:border-[#F57500] placeholder:text-[rgba(49,49,49,0.25)]"
                                        />
                                    </div>
                                </div>
                                <div className="fld-row grid grid-cols-1 md:grid-cols-2 gap-7">
                                    <div className="fld flex flex-col gap-2 mb-6">
                                        <label htmlFor="ph" className="font-['Syne_Mono',monospace] text-[0.6rem] tracking-[0.2em] uppercase text-[#F57500]">Phone</label>
                                        <input
                                            id="ph"
                                            type="tel"
                                            placeholder="+1 (555) 000-000"
                                            value={formData.ph}
                                            onChange={handleInputChange}
                                            className="border-0 border-b-[1.5px] border-[rgba(49,49,49,0.15)] bg-transparent text-[#313131] font-['Manrope',sans-serif] text-[0.95rem] font-medium py-2.5 outline-none w-full transition-colors duration-250 focus:border-[#F57500] placeholder:text-[rgba(49,49,49,0.25)]"
                                        />
                                    </div>
                                    <div className="fld flex flex-col gap-2 mb-6">
                                        <label htmlFor="sb" className="font-['Syne_Mono',monospace] text-[0.6rem] tracking-[0.2em] uppercase text-[#F57500]">Subject</label>
                                        <select
                                            id="sb"
                                            value={formData.sb}
                                            onChange={handleSelectChange}
                                            className="border-0 border-b-[1.5px] border-[rgba(49,49,49,0.15)] bg-transparent text-[#313131] font-['Manrope',sans-serif] text-[0.95rem] font-medium py-2.5 outline-none w-full transition-colors duration-250 focus:border-[#F57500] cursor-pointer appearance-none  bg-no-repeat bg-[right_8px_center] bg-[length:14px]"
                                        >
                                            <option value="" disabled>Choose topic</option>
                                            <option>Web Design</option>
                                            <option>UI/UX Design</option>
                                            <option>Mobile App</option>
                                            <option>Branding</option>
                                            <option>Collaboration</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="fld flex flex-col gap-2 mb-6">
                                    <label htmlFor="ms" className="font-['Syne_Mono',monospace] text-[0.6rem] tracking-[0.2em] uppercase text-[#F57500]">Message</label>
                                    <textarea
                                        id="ms"
                                        placeholder="Tell me about your project…"
                                        rows={5}
                                        value={formData.ms}
                                        onChange={handleInputChange}
                                        className="border-0 border-b-[1.5px] border-[rgba(49,49,49,0.15)] bg-transparent text-[#313131] font-['Manrope',sans-serif] text-[0.95rem] font-medium py-2.5 outline-none w-full transition-colors duration-250 focus:border-[#F57500] placeholder:text-[rgba(49,49,49,0.25)] resize-none min-h-[100px]"
                                    ></textarea>
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    className="send-btn w-full bg-[#F57500] text-white border-none cursor-pointer font-['Syne',sans-serif] text-[0.78rem] font-bold tracking-[0.14em] uppercase py-4 px-7 mt-4 flex items-center justify-between relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 group"
                                >
                                    <span className="before:content-[''] before:absolute before:inset-0 before:bg-[#313131] before:-translate-x-full before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:before:translate-x-0"></span>
                                    <span className="relative z-[1] flex items-center justify-between w-full">
        <span>Send Message</span>
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-white stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    </span>
                                </button>
                            </div>
                        ) : (
                            <div className="form-suc flex flex-col items-start gap-4 py-10 animate-[fadeUp_0.5s_ease_both]">
                                <div className="suc-num font-['Syne_Mono',monospace] text-5xl md:text-6xl font-bold text-[#F57500] leading-none tracking-[-0.05em]">✓</div>
                                <div className="suc-h font-['Syne',sans-serif] text-[1.8rem] font-extrabold tracking-[-0.03em]">Message Received.</div>
                                <p className="suc-p text-[0.85rem] text-[rgba(49,49,49,0.5)] leading-[1.7] max-w-[300px]">
                                    Hey {submittedName}, message received! I'll reply to {submittedEmail} within 24 hours.
                                </p>
                                <button onClick={handleResetForm} className="suc-back bg-none border-[1.5px] border-[rgba(49,49,49,0.2)] cursor-pointer font-['Syne',sans-serif] text-[0.72rem] font-bold tracking-[0.12em] uppercase py-3 px-6 text-[#313131] mt-2 transition-all duration-200 hover:border-[#F57500] hover:text-[#F57500]">
                                    ← Send Another
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Info Column */}
                    <div className="col-info bg-[#f9f7f4] p-8 md:p-14 flex flex-col gap-0">
                        <div className="info-block pb-5 border-b border-[rgba(49,49,49,0.08)]">
                            <div className="ib-tag font-['Syne_Mono',monospace] text-[0.58rem] tracking-[0.22em] uppercase text-[rgba(49,49,49,0.35)] mb-2.5">// Email</div>
                            <div className="ib-val font-['Syne',sans-serif] text-base font-bold text-[#313131] tracking-[-0.02em] hover:text-[#F57500] transition-colors duration-200">hello@alexstudio.io</div>
                            <div className="ib-sub text-[0.78rem] text-[rgba(49,49,49,0.45)] mt-0.5 leading-relaxed">For project enquiries & collaborations</div>
                        </div>
                        <div className="info-block py-5 border-b border-[rgba(49,49,49,0.08)]">
                            <div className="ib-tag font-['Syne_Mono',monospace] text-[0.58rem] tracking-[0.22em] uppercase text-[rgba(49,49,49,0.35)] mb-2.5">// Phone</div>
                            <div className="ib-val font-['Syne',sans-serif] text-base font-bold text-[#313131] tracking-[-0.02em] hover:text-[#F57500] transition-colors duration-200">+1 (555) 000-0000</div>
                            <div className="ib-sub text-[0.78rem] text-[rgba(49,49,49,0.45)] mt-0.5 leading-relaxed">Mon–Fri, 9am–6pm IST</div>
                        </div>
                        <div className="info-block py-5 border-b border-[rgba(49,49,49,0.08)]">
                            <div className="ib-tag font-['Syne_Mono',monospace] text-[0.58rem] tracking-[0.22em] uppercase text-[rgba(49,49,49,0.35)] mb-2.5">// Response time</div>
                            <div className="ib-val font-['Syne',sans-serif] text-base font-bold text-[#313131] tracking-[-0.02em] hover:text-[#F57500] transition-colors duration-200">Within 24 hours</div>
                            <div className="ib-sub text-[0.78rem] text-[rgba(49,49,49,0.45)] mt-0.5 leading-relaxed">Usually much faster on weekdays</div>
                        </div>
                        <div className="info-block py-5">
                            <div className="ib-tag font-['Syne_Mono',monospace] text-[0.58rem] tracking-[0.22em] uppercase text-[rgba(49,49,49,0.35)] mb-2.5">// Follow</div>
                            <div className="bs-soc flex gap-2.5 flex-wrap">
                                <span className="soc-tag border border-[rgba(49,49,49,0.15)] py-1.5 px-3.5 text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[rgba(49,49,49,0.5)] cursor-pointer transition-all duration-200 hover:border-[#F57500] hover:text-[#F57500] hover:bg-[rgba(245,117,0,0.15)]">Twitter</span>
                                <span className="soc-tag border border-[rgba(49,49,49,0.15)] py-1.5 px-3.5 text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[rgba(49,49,49,0.5)] cursor-pointer transition-all duration-200 hover:border-[#F57500] hover:text-[#F57500] hover:bg-[rgba(245,117,0,0.15)]">LinkedIn</span>
                                <span className="soc-tag border border-[rgba(49,49,49,0.15)] py-1.5 px-3.5 text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[rgba(49,49,49,0.5)] cursor-pointer transition-all duration-200 hover:border-[#F57500] hover:text-[#F57500] hover:bg-[rgba(245,117,0,0.15)]">GitHub</span>
                                <span className="soc-tag border border-[rgba(49,49,49,0.15)] py-1.5 px-3.5 text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[rgba(49,49,49,0.5)] cursor-pointer transition-all duration-200 hover:border-[#F57500] hover:text-[#F57500] hover:bg-[rgba(245,117,0,0.15)]">Dribbble</span>
                                <span className="soc-tag border border-[rgba(49,49,49,0.15)] py-1.5 px-3.5 text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[rgba(49,49,49,0.5)] cursor-pointer transition-all duration-200 hover:border-[#F57500] hover:text-[#F57500] hover:bg-[rgba(245,117,0,0.15)]">Instagram</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Block */}
                <div className="map-block info-block pt-5 mt-5 border-t border-[rgba(49,49,49,0.08)]">
                    <div className="map-tag font-['Syne_Mono',monospace] text-[0.58rem] tracking-[0.22em] uppercase text-[rgba(49,49,49,0.35)] py-5">// Location — Matara, LK</div>
                    <div className="map-frame w-full h-[360px] relative overflow-hidden border border-[rgba(49,49,49,0.1)]">
                        <iframe
                            src="https://www.openstreetmap.org/export/embed.html?bbox=80.5318%2C5.9374%2C80.5602%2C5.9678&layer=mapnik&marker=5.9526%2C80.5460"
                            title="Studio location in Matara"
                            loading="lazy"
                            className="w-full h-full border-none grayscale-[30%] sepia-[10%]"
                        ></iframe>
                        <div className="map-pin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] pointer-events-none z-[2] animate-[pinBob_2.5s_ease-in-out_infinite]">
                            <div className="pin-head w-7 h-7 bg-[#F57500] rounded-[50%_50%_50%_0] -rotate-45 grid place-items-center shadow-[0_4px_12px_rgba(245,117,0,0.5)]">
                                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white rotate-45">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                </svg>
                            </div>
                            <div className="pin-shadow w-2 h-1 bg-black/20 rounded-full mx-auto mt-0.5 animate-[pinShadow_2.5s_ease-in-out_infinite]"></div>
                        </div>
                    </div>
                    <div className="map-addr flex items-center gap-2 pt-3.5 text-[0.78rem] text-[rgba(49,49,49,0.5)]">
                        <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] stroke-[#F57500] fill-none stroke-2 stroke-linecap-round stroke-linejoin-round flex-shrink-0">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                            <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        No-21/56, 5th cross road, Weheragampita, Matara
                    </div>
                </div>
            </section>

            {/* Bottom Strip */}
            <div className="bottom-strip grid grid-cols-1 md:grid-cols-3 border-t border-[rgba(49,49,49,0.1)] rv opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <div className="bs-cell p-8 md:p-9 border-r-0 md:border-r border-[rgba(49,49,49,0.1)] border-b md:border-b-0 flex flex-col gap-2.5">
                    <div className="bs-tag font-['Syne_Mono',monospace] text-[0.58rem] tracking-[0.22em] uppercase text-[rgba(49,49,49,0.35)]">// Currently available</div>
                    <div className="bs-content font-['Syne',sans-serif] text-[0.88rem] font-bold text-[#313131]">Open to freelance,<br />full-time & contracts.</div>
                </div>
                <div className="bs-cell p-8 md:p-9 border-r-0 md:border-r border-[rgba(49,49,49,0.1)] flex flex-col gap-2.5">
                    <div className="bs-tag font-['Syne_Mono',monospace] text-[0.58rem] tracking-[0.22em] uppercase text-[rgba(49,49,49,0.35)]">// Local time</div>
                    <div className="bs-content font-['Syne',sans-serif] text-[0.88rem] font-bold text-[#313131]" id="localTime">{localTime}</div>
                </div>
                <div className="bs-cell p-8 md:p-9 flex flex-col gap-2.5">
                    <div className="bs-tag font-['Syne_Mono',monospace] text-[0.58rem] tracking-[0.22em] uppercase text-[rgba(49,49,49,0.35)]">// Contact</div>
                    <div className="bs-content font-['Syne',sans-serif] text-[0.88rem] font-bold text-[#313131]">hello@alexstudio.io</div>
                </div>
            </div>


            {/* Global Styles for Keyframes */}
            <style>{`
            
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
        
        @keyframes tickerMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes barFill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes pulse-g {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
        }
        @keyframes pinBob {
          0%, 100% { transform: translate(-50%, -70%); }
          50% { transform: translate(-50%, -82%); }
        }
        @keyframes pinShadow {
          0%, 100% { transform: scaleX(1); opacity: 0.3; }
          50% { transform: scaleX(0.6); opacity: 0.1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-pulse-g {
          animation: pulse-g 1.4s infinite;
        }
        .hover\\:animation-play-state-paused:hover {
          animation-play-state: paused;
        }
        .rv.on {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
        </div>
    );
};

export default ContactFrom;