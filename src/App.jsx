import {BrowserRouter, Route, Routes} from "react-router";
import {useState} from "react";
import './App.css'
import HeroSection from "./components/pages/home/HeroSection.jsx";
import {Layout} from "./components/pages/coman/Layout.jsx";
import AboutSection from "./components/pages/home/AboutSection.jsx";
import FactsSection from "./components/pages/home/FactsSection.jsx";
import AutoSliderSection from "./components/pages/home/AutoSliderSection.jsx";
import ScrollText from "./components/pages/home/ScrollText.jsx";
import ServicesSection from "./components/pages/home/ServicesSection.jsx";
import ResumeSection from "./components/pages/home/ResumeSection.jsx";
import ProjectSliderSection from "./components/pages/home/ProjectSliderSection.jsx";
import SkillSection from "./components/pages/home/SkillSection.jsx";
import Project from "./components/pages/project/Project.jsx";
import ProjectDetails from "./components/pages/projectdeatils/ProjectDetails.jsx";
import ContactFrom from "./components/pages/contact/ContactFrom.jsx";
import FooterCTA from "./components/pages/project/FooterCTA.jsx";
import Services from "./components/pages/service/Service.jsx";
import Certificates from "./components/pages/certificates/Certificates.jsx";

function App() {

    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/*Home Page Section*/}
                    <Route path="/" element={<HeroSection />} />
                    <Route path="/portfolio" element={<Project onSelectProject={setSelectedProject} />} />
                    <Route
                        path="/project-deatils"
                        element={<ProjectDetails project={selectedProject} />}
                    />
                    <Route path="/contact" element={<ContactFrom />} />
                    <Route path="/service" element={<Services />} />
                    <Route path="/certificates" element={<Certificates/>} />
                    {/*<Route path="/" element={<AboutSection />} />*/}
                    {/*<Route path="/" element={<ServicesSection />} />*/}
                    {/*<Route path="/" element={<FactsSection />} />*/}
                    {/*<Route path="/" element={<AutoSliderSection />} />*/}
                    {/*<Route path="/" element={<ResumeSection />} />*/}
                    {/*<Route path="/" element={<ScrollText />} />*/}
                    {/*    <Route path="/" element={<SkillSection/>} />*/}

                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App