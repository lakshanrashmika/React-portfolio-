import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollText = () => {
    const textRef = useRef(null);
    const scrollTriggerRef = useRef([]);

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Split text into characters for animation
        const mainText = textRef.current;

        // Function to wrap characters in spans
        function wrapCharacters(element) {
            if (!element) return;

            const textNodes = [];

            // Recursive function to find all text nodes
            function findTextNodes(node) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    textNodes.push(node);
                } else {
                    for (let child of node.childNodes) {
                        findTextNodes(child);
                    }
                }
            }

            findTextNodes(element);

            // Wrap each character in a span
            textNodes.forEach(textNode => {
                const parent = textNode.parentNode;
                const text = textNode.textContent;
                const fragment = document.createDocumentFragment();

                for (let i = 0; i < text.length; i++) {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char';
                    charSpan.style.display = 'inline-block';
                    charSpan.textContent = text[i];
                    fragment.appendChild(charSpan);
                }

                parent.replaceChild(fragment, textNode);
            });
        }

        // Apply character wrapping
        wrapCharacters(mainText);

        // Get all characters
        const mainChars = mainText ? [...mainText.querySelectorAll('.char')] : [];

        // Get all words with images
        const words = [...document.querySelectorAll(".text-animation__word")];

        /* Main Text Animation */
        if (mainChars.length > 0) {
            const textTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".text-animation",
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1,
                    markers: false
                }
            });

            textTimeline.fromTo(
                mainChars,
                { color: "#000000" },
                {
                    color: "#ff7700",
                    stagger: 0.05,
                    duration: 1
                }
            );

            scrollTriggerRef.current.push(textTimeline.scrollTrigger);
        }

        /* Image Animation */
        words.forEach((word) => {
            const wrapper = word.querySelector(".text-animation__image-wrapper");

            // Set initial states
            gsap.set(wrapper, { width: 0 });

            const imageTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: word,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1,
                    markers: false
                }
            });

            imageTimeline
                .to(wrapper, {
                    width: "14vw",
                    duration: 0.5,
                    ease: "power2.out"
                });

            scrollTriggerRef.current.push(imageTimeline.scrollTrigger);
        });

        // Refresh ScrollTrigger after a brief delay to ensure DOM is ready
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        // Cleanup function
        return () => {
            scrollTriggerRef.current.forEach(trigger => {
                if (trigger && trigger.kill) {
                    trigger.kill();
                }
            });

            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="bg-white text-white font-sans relative">
            {/* Column Wrap */}
            <div className="column-wrap float-left w-[calc(70%-93px)] relative h-full bg-white z-10 xl:w-full">
                <div className="column-wrap-container ">
                    <div className="col-wc_dec absolute left-0 w-7/10 h-full bg-gray-50 top-0 z-10"></div>
                    <div className=" bg-white relative overflow-hidden">
                        <div className="container max-w-8xl w-11/12 mx-auto relative z-50">
                            <div className="container mx-auto px-0 max-w-8xl">
                                {/* Text Animation */}
                                <section className="text-animation flex flex-col font-oswald  items-center justify-center  mx-[5vw]">
                                    <div
                                        ref={textRef}
                                        className="text-animation__text text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-normal leading-tight text-center text-black uppercase"
                                    >
                                        Crafting

                                        {/* Word 1 — with "interfaces" image */}
                                        <span className="text-animation__word relative inline-block transition-colors duration-300 ease-in-out whitespace-nowrap">
                                            <span className="text-animation__blur relative inline-block">
                                                <span className="text-animation__image-wrapper relative inline-block flex-shrink-0 overflow-hidden mx-[0.5vw] w-0 max-w-[14vw] h-[5.6vw] transition-width duration-100 ease-out">
                                                    <img
                                                        className="text-animation__animated-img absolute top-0 left-1/2 w-[14vw] h-full rounded object-cover transform -translate-x-1/2"
                                                        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                                        alt="Code on screen"
                                                        width="270"
                                                        height="110"
                                                        loading="lazy"
                                                    />
                                                </span>
                                            </span>
                                            <span>Beautiful</span>
                                        </span>

                                        <br /> Interfaces with clean

                                        {/* Word 2 — with "code" image */}
                                        <span className="text-animation__word relative inline-block transition-colors duration-300 ease-in-out whitespace-nowrap">
                                            <span className="text-animation__blur relative inline-block">
                                                <span className="text-animation__image-wrapper relative inline-block flex-shrink-0 overflow-hidden mx-[0.5vw] w-0 max-w-[14vw] h-[5.6vw] transition-width duration-100 ease-out">
                                                    <img
                                                        className="text-animation__animated-img absolute top-0 left-1/2 w-[14vw] h-full rounded object-cover transform -translate-x-1/2"
                                                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                                        alt="Clean code"
                                                        width="270"
                                                        height="110"
                                                        loading="lazy"
                                                    />
                                                </span>
                                            </span>
                                            <span>Code &</span>
                                        </span>

                                        <br /> purposeful design. I build <br /> pixel-perfect

                                        {/* Word 3 — with "React/UI" image */}
                                        <span className="text-animation__word relative inline-block transition-colors duration-300 ease-in-out whitespace-nowrap">
                                            <span className="text-animation__blur relative inline-block">
                                                <span className="text-animation__image-wrapper relative inline-block flex-shrink-0 overflow-hidden mx-[0.5vw] w-0 max-w-[14vw] h-[5.6vw] transition-width duration-100 ease-out">
                                                    <img
                                                        className="text-animation__animated-img absolute top-0 left-1/2 w-[14vw] h-full rounded object-cover transform -translate-x-1/2"
                                                        src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                                        alt="UI Design"
                                                        width="270"
                                                        height="110"
                                                        loading="lazy"
                                                    />
                                                </span>
                                            </span>
                                            <span>React</span>
                                        </span>

                                        <br /> experiences that delight <br />

                                        {/* Word 4 — with "users" image */}
                                        <span className="text-animation__word relative inline-block transition-colors duration-300 ease-in-out whitespace-nowrap">
                                            <span>users</span>
                                            <span className="text-animation__blur relative inline-block">
                                                <span className="text-animation__image-wrapper relative inline-block flex-shrink-0 overflow-hidden mx-[0.5vw] w-0 max-w-[14vw] h-[5.6vw] transition-width duration-100 ease-out">
                                                    <img
                                                        className="text-animation__animated-img absolute top-0 left-1/2 w-[14vw] h-full rounded object-cover transform -translate-x-1/2"
                                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
                                                        alt="Happy users collaborating"
                                                        width="270"
                                                        height="110"
                                                        loading="lazy"
                                                    />
                                                </span>
                                            </span>
                                        </span>

                                        is <br /> what drives me.
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Oswald:wght@500;700&family=Roboto:wght@500&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

                .font-oswald {
                    font-family: 'Oswald', sans-serif;
                }
                .text-animation{
                    padding: 50px 0px 0px 0px;
                }
                .text-animation__blur::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    height: 100%;
                    max-width: 13.75vw;
                    max-height: 5.6vw;
                    border-radius: 50%;
                    background-color: #ff7700;
                    filter: blur(6.25vw);
                    z-index: 0;
                    pointer-events: none;
                }

                .char {
                    white-space: pre-wrap;
                }

                /* Ensure smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }

                /* Improve mobile responsiveness */
                @media screen and (max-width: 768px) {
                    .text-animation__image-wrapper {
                        max-width: 20vw !important;
                        height: 8vw !important;
                    }

                    .text-animation__animated-img {
                        width: 20vw !important;
                    }
                }

                @media screen and (max-width: 480px) {
                    .text-animation__image-wrapper {
                        max-width: 25vw !important;
                        height: 10vw !important;
                    }

                    .text-animation__animated-img {
                        width: 25vw !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ScrollText;