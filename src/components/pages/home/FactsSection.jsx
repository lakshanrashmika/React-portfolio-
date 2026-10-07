import React, { useEffect, useRef } from 'react';

const FactsSection = () => {
    const count1Ref = useRef(null);
    const count2Ref = useRef(null);
    const count3Ref = useRef(null);
    const count4Ref = useRef(null);
    const factsGridRef = useRef(null);

    useEffect(() => {
        const animateCount = (element, targetNumber, duration = 2000) => {
            let currentNumber = 0;
            const increment = targetNumber / (duration / 16);

            const updateCount = () => {
                currentNumber += increment;
                if (currentNumber < targetNumber) {
                    element.textContent = Math.floor(currentNumber);
                    requestAnimationFrame(updateCount);
                } else {
                    element.textContent = targetNumber;
                }
            };

            updateCount();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(count1Ref.current, 87);
                    animateCount(count2Ref.current, 42);
                    animateCount(count3Ref.current, 1825);
                    animateCount(count4Ref.current, 18);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        if (factsGridRef.current) {
            observer.observe(factsGridRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="min-h-[620px] bg-[#2a2a2e] relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8 xl:px-5">
            {/* Image Container */}
                <div className="absolute top-0 right-0 w-4/5 md:w-3/5 h-[785px] md:h-full overflow-hidden">
                    <img
                        className="w-full h-[780px] md:h-full object-cover"
                        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="Professional workspace"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
                    <div className="absolute bottom-0 left-0 w-full h-12 sm:h-20  bg-white"></div>
                </div>

                {/* Main Container */}
                <div className="container max-w-8xl w-11/12 mx-auto relative z-20 mt-0 md:mt-6">
                    {/* Text Content */}
                    <div className="max-w-full lg:max-w-[700px] mb-8 lg:mb-15">
                        <div className="w-[52px] h-2 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.11)] mb-5"></div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-4">
                            <span className="text-white">Some Interisting </span>
                            <span className="text-[#F57500]">Facts</span>
                            <br />
                            <span className="text-white">About Me</span>
                        </h2>
                        <div className="w-[50px] h-0.5 border-b border-dashed border-[rgba(255,255,255,0.21)]"></div>
                        <p className="text-[rgba(255,255,255,0.71)] text-sm sm:text-base leading-6 font-medium mt-7 max-w-full lg:max-w-[600px]">
                            We have a wide range of pneumatic and vacuum components and conveyor belts specifically suiting the precise needs of the print and packaging industry.
                        </p>
                    </div>

                    {/* Background Numbers */}
                    <div className="hidden lg:block text-[rgba(255,255,255,0.11)] text-[104px] tracking-[6px] font-bold uppercase absolute top-48 -left-20 -rotate-90 whitespace-nowrap -z-10">
                        NUMBERS
                    </div>

                    {/* Mobile Background Numbers */}
                    <div className="lg:hidden text-[rgba(255,255,255,0.11)] text-6xl sm:text-7xl tracking-[4px] font-bold uppercase absolute top-32 left-1/2 -translate-x-1/2 whitespace-nowrap -z-10 text-center">
                        NUMBERS
                    </div>

                    {/* Facts Grid */}
                    <div ref={factsGridRef} className="mt-8 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {/* Fact 1 */}
                        <div className="text-left relative pl-8 sm:pl-10">
                            <div ref={count1Ref} className="text-white text-3xl sm:text-4xl lg:text-[44px] font-bold mb-2">0</div>
                            <div className="bg-[rgba(51,51,51,0.31)] py-2 px-3 sm:px-4 pl-6 sm:pl-7 relative -ml-6 sm:-ml-7">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-0.5 bg-[#F57500]"></div>
                                <div className="text-[rgba(255,255,255,0.51)] text-xs tracking-widest font-normal uppercase">
                                    Finished projects
                                </div>
                            </div>
                        </div>

                        {/* Fact 2 */}
                        <div className="text-left relative pl-8 sm:pl-10">
                            <div ref={count2Ref} className="text-white text-3xl sm:text-4xl lg:text-[44px] font-bold mb-2">0</div>
                            <div className="bg-[rgba(51,51,51,0.31)] py-2 px-3 sm:px-4 pl-6 sm:pl-7 relative -ml-6 sm:-ml-7">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-0.5 bg-[#F57500]"></div>
                                <div className="text-[rgba(255,255,255,0.51)] text-xs tracking-widest font-normal uppercase">
                                    Repositories
                                </div>
                            </div>
                        </div>

                        {/* Fact 3 */}
                        <div className="text-left relative pl-8 sm:pl-10">
                            <div ref={count3Ref} className="text-white text-3xl sm:text-4xl lg:text-[44px] font-bold mb-2">0</div>
                            <div className="bg-[rgba(51,51,51,0.31)] py-2 px-3 sm:px-4 pl-6 sm:pl-7 relative -ml-6 sm:-ml-7">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-0.5 bg-[#F57500]"></div>
                                <div className="text-[rgba(255,255,255,0.51)] text-xs tracking-widest font-normal uppercase">
                                    Working hours
                                </div>
                            </div>
                        </div>

                        {/* Fact 4 */}
                        <div className="text-left relative pl-8 sm:pl-10">
                            <div ref={count4Ref} className="text-white text-3xl sm:text-4xl lg:text-[44px] font-bold mb-2">0</div>
                            <div className="bg-[rgba(51,51,51,0.31)] py-2 px-3 sm:px-4 pl-6 sm:pl-7 relative -ml-6 sm:-ml-7">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-0.5 bg-[#F57500]"></div>
                                <div className="text-[rgba(255,255,255,0.51)] text-xs tracking-widest font-normal uppercase">
                                    Months of Experience
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="bg-[rgba(255,255,255,0.31)] w-12 h-0.5 mx-auto mt-8 lg:mt-10"></div>
                </div>
        </div>
    );
};

export default FactsSection;