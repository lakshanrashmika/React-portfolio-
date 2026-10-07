import React from 'react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#313131]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="md:ml-20 min-h-screen flex flex-col">
                <Header />

                <main className="flex-1">
                    {children}
                </main>

                {/*<main className="flex-1 pt-[68px]">*/}
                {/*    {children}*/}
                {/*</main>*/}

                <Footer />
            </div>
        </div>
    );
}