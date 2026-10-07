import React from 'react';

const FooterCTA = () => {
    return (
        <div className="relative w-full bg-white font-dm-sans flex items-center justify-center">
            <section className="relative w-full px-6 sm:px-8 md:px-12 py-16 sm:py-20 pb-20 sm:pb-24 overflow-hidden flex flex-col items-center justify-center text-center">

                {/* Circle deco top-left */}
                <div className="absolute top-5 left-5 sm:top-7 sm:left-9 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#313131]/20 animate-spin-slow">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#F57500] rounded-full"></div>
                </div>

                {/* Sub label */}
                <p className="text-xs sm:text-sm font-light text-[#313131]/55 tracking-[0.3px] mb-4 sm:mb-[18px] animate-fade-up">
                    Have a project in mind?
                </p>

                {/* Giant heading */}
                <h2 className="font-syne font-extrabold leading-none tracking-tighter text-[#313131] text-[clamp(72px,14vw,160px)] animate-fade-up [animation-delay:100ms]">

                    <span className="relative inline-block transition-colors duration-200 group/word hover:text-[#F57500]">
                        LET'S&nbsp;WORK
                        <span className="absolute left-0 bottom-0.5 sm:bottom-2.5 w-full h-1 sm:h-1.5 bg-[#F57500] rounded-full scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/word:scale-x-100"></span>
                    </span>

                    <br />

                    <span className="relative inline-block text-transparent [-webkit-text-stroke:2px_#313131] sm:[-webkit-text-stroke:3px_#313131] transition-[stroke] duration-200 hover:[-webkit-text-stroke-color:#F57500] group/word">
                        TOGETHER
                        <span className="absolute left-0 bottom-0.5 sm:bottom-1.5 w-full h-1 sm:h-1.5 bg-[#F57500] rounded-full scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/word:scale-x-100"></span>
                    </span>

                </h2>

                {/* CTA pill */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 animate-fade-up [animation-delay:200ms]">

                    <div className="hidden sm:block w-12 h-[1.5px] bg-[#313131]/20"></div>


                    <a href="#" className="btn-2 inline-block">
                        <span className="relative z-10 group-hover:translate-x-3 transition-transform duration-300 flex items-center justify-center lg:justify-start">Start a project</span>
                    </a>

                    <div className="hidden sm:block w-12 h-[1.5px] bg-[#313131]/20"></div>

                </div>

                {/* Dot grid deco */}
                <div className="absolute bottom-6 right-6 sm:bottom-9 sm:right-11 grid grid-cols-4 grid-rows-4 gap-1 sm:gap-1.5 opacity-25 animate-fade-up [animation-delay:500ms]">
                    {[...Array(16)].map((_, i) => (
                        <span key={i} className="w-1 h-1 rounded-full bg-[#313131]"></span>
                    ))}
                </div>

            </section>
            <style jsx>{
                `
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
                `
            }</style>
        </div>
    );
};

export default FooterCTA;