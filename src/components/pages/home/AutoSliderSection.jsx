import React, {useEffect} from 'react';
import dimage from "../../../assets/3dhouse.png"
import code from "../../../assets/code.png"

const AutoSliderSection = () => {
    useEffect(() => {
        // Load external CSS
        const loadCSS = (href) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        };

        // Load external scripts
        const loadScript = (src, onLoad) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = onLoad;
            document.body.appendChild(script);
        };

        // Load CSS files
        loadCSS('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css');
        loadCSS('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css');
        loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        loadCSS('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
        loadCSS('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');

        // Load jQuery first, then other scripts
        loadScript('https://code.jquery.com/jquery-3.7.1.min.js', () => {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js', () => {
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js', () => {
                    // Initialize carousels after scripts are loaded
                    if (window.jQuery && window.jQuery.fn.owlCarousel) {
                        // Use setTimeout to ensure DOM is ready
                        setTimeout(() => {
                            $('.twm-category-carousal-slider').owlCarousel({
                                loop: true,
                                margin: 30,
                                center: false,
                                nav: false,
                                dots: false,
                                autoWidth: true,
                                autoplay: true,
                                slideTransition: 'linear',
                                autoplayTimeout: 5000,
                                autoplaySpeed: 5000,
                                smartSpeed: 5000,
                                autoplayHoverPause: false,
                                responsive: {
                                    0: {
                                        items: 1
                                    },
                                    768: {
                                        items: 2
                                    },
                                    1024: {
                                        items: 3
                                    }
                                }
                            });

                            $('.twm-category-carousal-slider2').owlCarousel({
                                loop: true,
                                margin: 30,
                                center: false,
                                nav: false,
                                rtl: true,
                                dots: false,
                                autoWidth: true,
                                autoplay: true,
                                slideTransition: 'linear',
                                autoplayTimeout: 5000,
                                autoplaySpeed: 5000,
                                smartSpeed: 5000,
                                autoplayHoverPause: false,
                                responsive: {
                                    0: {
                                        items: 1
                                    },
                                    768: {
                                        items: 2
                                    },
                                    1024: {
                                        items: 3
                                    }
                                }
                            });
                        }, 100);
                    }

                    // Initialize WOW.js
                    if (window.WOW) {
                        new window.WOW().init();
                    }
                });
            });
        });

        return () => {
            // Cleanup Owl Carousel instances
            if (window.jQuery && window.jQuery.fn.owlCarousel) {
                const sliders = ['.twm-category-carousal-slider', '.twm-category-carousal-slider2'];
                sliders.forEach(selector => {
                    const $el = $(selector);
                    if ($el.length && $el.data('owl.carousel')) {
                        $el.trigger('destroy.owl.carousel');
                        $el.removeClass('owl-loaded owl-hidden');
                        $el.find('.owl-stage').remove();
                    }
                });
            }
        };
    }, []);

    const categories = [
        { id: 1, name: 'Designer' },
        { id: 2, name: 'Developer' },
        { id: 3, name: 'Freelancer' },
        { id: 4, name: 'Creative' },
        { id: 5, name: 'Portfolio' },
        { id: 6, name: 'Branding' }
    ];

    const CrossIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 64 64" version="1.1">
            <path
                d="M4 15.51a1 1 0 0 0 .71-.29L15.22 4.71a1 1 0 1 0-1.42-1.42L3.29 13.8a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.38a1 1 0 0 0 .71-.29L26.6 4.71a1 1 0 1 0-1.42-1.42L3.29 25.18a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.36a1 1 0 0 0 .71-.25L38 4.71a1 1 0 1 0-1.42-1.42L3.29 36.54a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.38a1 1 0 0 0 .71-.29L49.34 4.71a1 1 0 1 0-1.42-1.42L3.29 47.92a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zM60.71 3.29a1 1 0 0 0-1.42 0l-56 56a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l56-56a1 1 0 0 0 0-1.42zm-1.42 11.37L14.66 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l44.63-44.63a1 1 0 0 0-1.42-1.42zm0 11.34L26 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l33.29-33.25A1 1 0 0 0 59.29 26zm0 11.4L37.4 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l21.89-21.89a1 1 0 0 0-1.42-1.42zm0 11.38L48.78 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L60.71 50.2a1 1 0 0 0-1.42-1.42z"
                data-name="Layer 9" fill="rgba(221, 221, 221, 1)"></path>
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
        <div className="bg-white text-white font-sans relative w-full min-h-screen">

            {/* Column Wrap */}
            <div className="column-wrap float-left relative h-full bg-white z-10 x w-full">
                <div className="column-wrap-container w-full">
                    <section className="bg-white relative overflow-hidden w-full">
                        <div className="container1 relative z-50 w-full max-w-full">
                            <div className="w-full">
                                <div className="page-content w-full">
                                    {/* CATEGORY SECTION */}
                                    <div
                                        className="twm-category-carousal-area relative py-10 overflow-hidden w-full">
                                        {/* Top Carousel */}
                                        <div className="owl-carousel twm-category-carousal-slider2 w-full">
                                            {categories.map((category) => (
                                                <div key={category.id} className="item">
                                                    <div className="twm_category_bx cursor-scale wow fadeInDown"
                                                         data-wow-duration="1000ms">
                                                          <span className="ao-our-categori-icon">
                                                            <CrossIcon/>
                                                          </span>
                                                        <div
                                                            className="twm-category-name text-[50px] md:text-[80px] lg:text-[160px] font-black uppercase font-['Urbanist'] leading-none tracking-[0.15em] text-[#443935] py-20">
                                                            {category.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Middle Image */}
                                        <div
                                            className="twm-category-carousal-mid-media absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[500px] z-10 w-full flex justify-center">
                                            <div
                                                className="after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:-bottom-16 after:z-[-1] after:w-[300px] after:h-[200px] after:bg-[#a6a6a6] after:filter after:blur-[30px] after:rounded-full sm:after:w-[200px] sm:after:h-[50px] sm:after:-bottom-5">
                                                <img
                                                    src={code}
                                                    alt="3D House"
                                                    className="vert-move w-full h-auto max-w-[500px]"
                                                />
                                            </div>
                                        </div>

                                        {/* Bottom Carousel */}
                                        <div className="owl-carousel twm-category-carousal-slider w-full">
                                            {categories.map((category, index) => (
                                                <div key={category.id} className="item">
                                                    <div className="twm_category_bx cursor-scale wow fadeInDown"
                                                         data-wow-duration="1000ms">
                                                          <span className="ao-our-categori-icon">
                                                            {index === 3 ? <CrossIcon/> : <CircleIcon/>}
                                                          </span>
                                                        <div
                                                            className={`twm-category-name pl-5 text-[48px] md:text-[100px] lg:text-[160px] font-black uppercase font-['Urbanist'] leading-none ${
                                                                index % 2 === 0
                                                                    ? 'text-[#e2791d] fill-[#f9f3ea] stroke-[1px] stroke-[#443935]'
                                                                    : 'text-[#e2791d]'
                                                            }`}>
                                                            {category.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* CATEGORY END */}
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <style jsx>{`
                .site-text-primary {
                    color: #e2791d;
                }

                .site-text-black {
                    color: #000;
                }

                .site-text-gray {
                    color: #e7e7e7;
                }

                .site-text-dark {
                    color: #443935;
                }

                .site-text-white {
                    color: #fff;
                }

                body, html {
                    margin: 0;
                    padding: 0;
                    font-family: 'Urbanist', sans-serif;
                    overflow-x: hidden;
                    width: 100%;
                    height: 100%;
                }

                .twm-category-carousal-area .twm-category-carousal-mid-media:after {
                    content: "";
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

                @media (max-width: 575px) {
                    .twm-category-carousal-area .twm-category-carousal-mid-media:after {
                        width: 200px;
                        height: 50px;
                        bottom: -20px;
                    }
                }

                .twm-category-carousal2-area {
                    background-color: #fff;
                    padding: 0px 0px;
                }

                .twm-category-carousal2-area .twm_category_bx .twm-category-name {
                    font-size: 50px;
                    font-weight: 900;
                }

                @media (max-width: 767px) {
                    .twm-category-carousal2-area .twm_category_bx .twm-category-name {
                        font-size: 30px;
                    }
                }

                .twm-category-carousal2-area .twm_category_bx svg {
                    width: 100px;
                    height: 100px;
                }

                .twm-category-carousal2-area .twm-category-carousal-slider .owl-stage {
                    display: flex;
                    align-items: center;
                }

                .twm-category-carousal2-area .twm-category-carousal-slider .owl-stage .owl-item {
                    white-space: nowrap;
                }

                .twm-category-carousal2-area .twm-category-carousal-slider .owl-stage .owl-item:nth-child(odd) .twm-category-name {
                    color: #443935;
                    -webkit-text-fill-color: inherit;
                    -webkit-text-stroke-width: inherit;
                    -webkit-text-stroke-color: inherit;
                }

                .twm-category-carousal-slider .owl-stage {
                    display: flex;
                    align-items: center;
                }

                .twm-category-carousal-slider .owl-stage .owl-item:nth-child(odd) .twm-category-name {
                    color: #f9f3ea;
                    -webkit-text-fill-color: #f9f3ea;
                    -webkit-text-stroke-width: 1px;
                    -webkit-text-stroke-color: #443935;
                    font-family: "Urbanist", serif;
                }

                .twm-category-carousal-slider2 .twm_category_bx .twm-category-name {
                    padding: 80px 0px;
                    color: #443935;
                    letter-spacing: 0.15em;
                    text-shadow: 1px -1px 0 #767676, -1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, -4px 8px 1px #7b7a7a, -5px 10px 1px #7f7d7d, -6px 12px 1px #828181, -7px 14px 1px #868585, -8px 16px 1px #8b8a89, -9px 18px 1px #8f8e8d, -10px 20px 1px #949392, -11px 22px 1px #999897, -12px 24px 1px #9e9c9c, -13px 26px 1px #a3a1a1, -14px 28px 1px #a8a6a6, -15px 30px 1px #adabab, -16px 32px 1px #b2b1b0, -17px 34px 1px #b7b6b5, -18px 36px 1px #bcbbba, -19px 38px 1px #c1bfbf, -20px 40px 1px #c6c4c4, -21px 42px 1px #cbc9c8, -22px 44px 1px #cfcdcd, -23px 46px 1px #d4d2d1, -24px 48px 1px #d8d6d5, -25px 50px 1px #dbdad9, -26px 52px 1px #dfdddc, -27px 54px 1px #e2e0df, -28px 56px 1px #e4e3e2;
                }

                @media (max-width: 575px) {
                    .twm-category-carousal-slider2 .twm_category_bx .twm-category-name {
                        text-shadow: 1px -1px 0 #767676, -1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, -4px 8px 1px #7b7a7a, -5px 10px 1px #7f7d7d, -6px 12px 1px #828181, -7px 14px 1px #868585, -8px 16px 1px #8b8a89, -9px 18px 1px #8f8e8d;
                    }
                }

                .twm-category-carousal-slider2 .twm_category_bx svg {
                    width: 70px;
                    height: 70px;
                    margin-left: 0px;
                }

                @media (max-width: 575px) {
                    .twm-category-carousal-slider2 .twm_category_bx svg {
                        width: 50px;
                        height: 50px;
                    }
                }

                .twm-category-carousal-slider2 .owl-stage {
                    display: flex;
                    align-items: center;
                }

                .twm-category-carousal-slider2 .owl-stage .owl-item:nth-child(odd) .twm-category-name {
                    color: #fff;
                    font-family: "Urbanist", serif;
                }

                .twm_category_bx {
                    display: flex;
                    align-items: center;
                }

                .twm_category_bx img {
                    animation: spin 10s linear infinite;
                }

                .twm_category_bx svg {
                    width: 200px;
                    height: 200px;
                }

                @media (max-width: 575px) {
                    .twm_category_bx svg {
                        width: 100px;
                        height: 100px;
                    }
                }

                .twm_category_bx svg .spin2 {
                    stroke: #443935;
                    stroke-width: 5px;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes spin2 {
                    0% {
                        stroke-dasharray: 1, 800;
                        stroke-dashoffset: 0;
                    }
                    50% {
                        stroke-dasharray: 400, 400;
                        stroke-dashoffset: -200px;
                    }
                    100% {
                        stroke-dasharray: 800, 1;
                        stroke-dashoffset: -800px;
                    }
                }

                .spin2 {
                    transform-origin: center;
                    animation: spin2 10s ease-in-out infinite, spin 5s linear infinite;
                    animation-direction: alternate;
                }

                .vert-move {
                    animation: float 6s ease-in-out infinite;
                }

                @keyframes float {
                    0% {
                        transform: translateY(-20px);
                    }
                    50% {
                        transform: translateY(20px);
                    }
                    100% {
                        transform: translateY(-20px);
                    }
                }

                .cursor-scale {
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }

                .cursor-scale:hover {
                    transform: scale(1.05);
                }

                .wow {
                    visibility: hidden;
                }

                .owl-carousel .owl-stage {
                    display: flex;
                }

                .owl-carousel .owl-item {
                    display: flex;
                    justify-content: center;
                }

                /* Full screen styles */
                #__next, ._next {
                    width: 100%;
                    height: 100%;
                }

                .container1 {
                    width: 100%;
                    max-width: 100%;
                    padding: 0;
                    margin: 0;
                }

                .page-content {
                    width: 100%;
                }

                .twm-category-carousal-area {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                /* Prevent hover pause and ensure continuous loop */
                .owl-carousel .owl-item {
                    -webkit-backface-visibility: hidden;
                    -webkit-transform: translateZ(0) scale(1.0, 1.0);
                }

                .owl-carousel {
                    -webkit-tap-highlight-color: transparent;
                    position: relative;
                    z-index: 10;
                }
            `}</style>
        </div>
    );
};

export default AutoSliderSection;