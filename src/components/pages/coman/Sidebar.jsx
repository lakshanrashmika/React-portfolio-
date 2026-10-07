import React, { useState, useEffect } from 'react';

const Sidebar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const socialLinks = [
        { href: "https://facebook.com", icon: "fab fa-facebook-f", label: "Facebook" },
        { href: "https://instagram.com", icon: "fab fa-instagram", label: "Instagram" },
        { href: "https://twitter.com", icon: "fab fa-twitter", label: "Twitter" },
        { href: "https://vk.com", icon: "fab fa-vk", label: "VK" }
    ];

    return (
        <>
            <aside className={`sidebar hidden md:block ${isVisible ? 'visible' : ''}`}>

                {/*<div className="w-11 h-11 absolute mt-[-60px] ml-5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-md group-hover:scale-105 transition duration-300">*/}
                {/*    <span className="text-white text-lg font-bold">L</span>*/}
                {/*</div>*/}

                <a
                    href="/#home"
                    className="logo mt-[-60px] ml-5 "
                >
                    <div className="logo-icon">
                                <span className="logo-letter">
                                    L
                                </span>
                    </div>
                </a>

                <span className="sidebar__decoration"></span>

                <div className="sidebar__social">
                    <ul>
                        {socialLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                >
                                    <i className={link.icon}></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="share-btn"></div>
            </aside>

            <style jsx>{`

                .logo {
                    display: flex;

                    align-items: center;

                    gap: .75rem;

                    text-decoration: none;

                    flex-shrink: 0;
                }

                .logo-icon {
                    position: relative;

                    width: 36px;
                    height: 36px;

                    border: 1.5px solid #ffffff;

                    border-radius: 8px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    overflow: hidden;

                    transition:
                            border-color .3s;
                }

                .logo:hover .logo-icon {
                    border-color: #F57500;
                }

                .logo-icon::before {
                    content: '';

                    position: absolute;

                    inset: 0;

                    background:
                            linear-gradient(
                                    135deg,
                                    #F57500 0%,
                                    transparent 65%
                            );

                    opacity: 0;

                    transition:
                            opacity .3s;
                }

                .logo:hover .logo-icon::before {
                    opacity: 1;
                }

                .logo-letter {
                    font-family:
                            'Space Mono',
                            monospace;

                    font-size: .9rem;

                    font-weight: 700;

                    color: #F57500;

                    position: relative;

                    z-index: 1;

                    transition: color .3s;
                }

                .logo:hover .logo-letter {
                    color: #fff;
                }

                .logo-text {
                    display: flex;

                    flex-direction: column;

                    gap: 1px;
                }

                .logo-name {
                    font-family:
                            'Space Mono',
                            monospace;

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

                    font-family:
                            'Inter',
                            sans-serif;
                }
                .sidebar {
                    background: #313131;
                    position: fixed;
                    top: 80px;
                    left: 0;
                    bottom: 0;
                    width: 80px;
                    z-index: 30;
                    transition: opacity 0.3s ease;
                }

                //.sidebar:not(.visible) {
                //    opacity: 0.7;
                //}

                .sidebar::before {
                    content: '';
                    position: absolute;
                    left: 50%;
                    width: 1px;
                    height: 120px;
                    top: 0px;
                    background: rgba(255,255,255,0.2);
                    transform: translateX(-50%);
                }

                .sidebar::after {
                    content: '';
                    position: absolute;
                    bottom: 10px;
                    width: 60px;
                    height: 8px;
                    left: 50%;
                    margin-left: -30px;
                    background: #F57500;
                }

                .sidebar__decoration {
                    position: absolute;
                    top: 118px;
                    left: 50%;
                    width: 6px;
                    height: 6px;
                    margin-left: -3px;
                    border-radius: 50%;
                    background: #F57500;
                }

                .sidebar__social {
                    position: absolute;
                    bottom: 38%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                }

                .sidebar__social ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }

                .sidebar__social li {
                    position: relative;
                    overflow: hidden;
                    width: 40px;
                    height: 40px;
                    background: #313131;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-top: none;
                    transition: all 0.2s ease;
                }

                .sidebar__social li:before {
                    content: '';
                    position: absolute;
                    right: 0;
                    width: 0;
                    height: 100%;
                    top: 0;
                    background: #F57500;
                    z-index: 1;
                    transition: all 200ms ease-out;
                }

                .sidebar__social li:hover:before {
                    width: 100%;
                    left: 0;
                    right: auto;
                }

                .sidebar__social li:first-child {
                    border-top: 1px solid rgba(255,255,255,0.08);
                }

                .sidebar__social li:hover {
                    transform: translateY(-2px);
                }

                .sidebar__social li a {
                    position: relative;
                    z-index: 2;
                    color: #767676;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .sidebar__social li a:hover {
                    color: #fff;
                }

                .share-btn::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    width: 1px;
                    height: 120px;
                    bottom: 25px;
                    background: rgba(255,255,255,0.2);
                    transform: translateX(-50%);
                }
            `}</style>
        </>
    );
};

export default Sidebar;