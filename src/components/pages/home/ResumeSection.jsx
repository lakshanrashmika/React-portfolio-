import React from 'react';
import img1 from '../../../assets/image/Codingcad.png'


const ResumeSection = () => {

    return (
        <div className="min-h-screen bg-white text-white font-sans  relative">

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
                                    <h3 className="text-2xl text-left uppercase text-black font-black float-left w-full tracking-wider pb-2.5 leading-8 md:text-xl">
                                        From Engineering to Associate software engineer
                                    </h3>
                                    <p className="pt-2.5 text-gray-600 text-left text-xs uppercase font-normal tracking-wider leading-6 relative z-20 max-w-md">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.
                                    </p>
                                </div>


                                <div className="custom-inner-holder relative pl-[1.45rem] mt-14">
                                    {/* Timeline Line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[0.03%] bg-gray-200"></div>

                                    {/* First Resume Item */}
                                    <div className="custom-inner relative mb-12 mt-5 last:mb-0">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            {/* Left Column - Company Info */}
                                            <div className="lg:w-2/4">
                                                <div className="resum-header workres relative border border-gray-200 bg-gray-50 p-[2rem_2rem_2rem_5rem]">
                                                    {/* Icon */}
                                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 border border-gray-200 rounded bg-white flex items-center justify-center text-orange-500">
                                                        <i className="fa fa-briefcase"></i>
                                                    </div>

                                                    {/* Timeline Dot */}
                                                    <div className="absolute -left-7 top-1/2 transform -translate-y-1/2 w-2 h-3 bg-orange-500"></div>

                                                    {/* Decorative Background Icon */}
                                                    <div className="absolute bottom-2 right-2 text-gray-500 text-6xl opacity-10 transform rotate-45">
                                                        <i className="fa fa-briefcase"></i>
                                                    </div>

                                                    <h3 className="text-base font-bold text-gray-800 text-left mb-2">
                                                        Comtech Web Solutions
                                                    </h3>
                                                    <h3 className="text-[16px] font-semibold text-gray-800 text-left mb-2">
                                                        Associate Software Engineer
                                                    </h3>
                                                    <span className="text-xs font-bold text-gray-400 uppercase text-left block">
                                                    Current Position
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="lg:w-1/4">
                                                <img
                                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop"
                                                    className="w-full h-auto block relative z-20"
                                                    alt="Solonick"
                                                />
                                            </div>

                                            {/* Right Column - Job Details */}
                                            <div className="lg:w-3/4">
                                                <div className="resum-content fl-wrap border border-gray-200 bg-gray-50  p-8">
                                                    <h4 className="text-base font-extrabold text-gray-800 uppercase text-left mb-4">
                                                        Software Development
                                                    </h4>
                                                    <p className="text-gray-700 text-left text-[13px]  font-normal mb-6">
                                                        As an Associate Software Engineer, I am engaged in the development and maintenance of software and web-based solutions in alignment with project and company requirements, contributing to feature implementation, debugging, and ongoing system improvements. I work collaboratively within agile teams to ensure deliverables meet both technical standards and business objectives.
                                                    </p>
                                                    <div className="dec-list fl-wrap mb-6">
                                                        <ul className="space-y-1">
                                                            <li className="text-gray-600 font-bold text-sm text-left relative pl-7">
                                                                <span className="absolute left-0 text-orange-500">•</span>
                                                                Institute of Analytics (IoA) Web site
                                                            </li>
                                                            <li className="text-gray-600 font-bold text-sm text-left relative pl-7">
                                                                <span className="absolute left-0 text-orange-500">•</span>
                                                                Crowned Cross Health Care Web Site
                                                            </li>
                                                            <li className="text-gray-600 font-bold text-sm text-left relative pl-7">
                                                                <span className="absolute left-0 text-orange-500">•</span>
                                                                Pv Engineering Solar Solutions pvt Web Site
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second Resume Item */}
                                    <div className="custom-inner ncmb relative">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            {/* Left Column - Company Info */}
                                            <div className="lg:w-2/4">
                                                <div className="resum-header workres relative border border-gray-200 bg-gray-50  p-[2rem_2rem_2rem_5rem]">
                                                    {/* Icon */}
                                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 border border-gray-200 rounded bg-white flex items-center justify-center text-orange-500">
                                                        <i className="fa fa-briefcase"></i>
                                                    </div>

                                                    {/* Timeline Dot */}
                                                    <div className="absolute -left-7 top-1/2 transform -translate-y-1/2 w-2 h-3 bg-orange-500"></div>

                                                    {/* Decorative Background Icon */}
                                                    <div className="absolute bottom-2 right-2 text-gray-500 text-6xl opacity-10 transform rotate-45">
                                                        <i className="fa fa-briefcase"></i>
                                                    </div>

                                                    <h3 className="text-base font-bold text-gray-800 uppercase text-left mb-2">
                                                        Codingcad (pvt) LTD
                                                    </h3>
                                                    <h3 className="text-[16px] font-semibold text-gray-800 text-left mb-2">
                                                        Trainee Software Engineer
                                                    </h3>
                                                    <span className="text-xs font-bold text-gray-400 uppercase text-left block">
                                                    2025-2026
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Right Column - Job Details */}
                                            <div className="lg:w-2/4">
                                                <div className="resum-content fl-wrap border border-gray-200 bg-gray-50 p-8 ">
                                                    <h4 className="text-base font-extrabold text-gray-800 uppercase text-left mb-4">
                                                        Early Software Engineering Experience
                                                    </h4>
                                                    <p className="text-gray-700 text-left text-[13px]  font-normal mb-6">
                                                        Started my professional software engineering career working with development teams on web and software projects, building a strong foundation in collaborative development, version control, and agile methodologies. These early experiences shaped my approach to problem-solving and set the stage for the more complex, scalable systems I work on today.
                                                    </p>
                                                    <div className="dec-list fl-wrap mb-6">
                                                        <ul className="space-y-1">
                                                            <li className="text-gray-600 font-bold text-sm text-left relative pl-7">
                                                                <span className="absolute left-0 text-orange-500">•</span>
                                                                Institute of Analytics (IoA) Web site
                                                            </li>
                                                            <li className="text-gray-600 font-bold text-sm text-left relative pl-7">
                                                                <span className="absolute left-0 text-orange-500">•</span>
                                                                Crowned Cross Health Care Web Site
                                                            </li>
                                                            <li className="text-gray-600 font-bold text-sm text-left relative pl-7">
                                                                <span className="absolute left-0 text-orange-500">•</span>
                                                                Pv Engineering Solar Solutions pvt Web Site
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Download Button */}
                                                {/*<a*/}
                                                {/*    href="#"*/}
                                                {/*    className="btn color-bg fl-btn inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"*/}
                                                {/*>*/}
                                                {/*    <span>Download resume</span>*/}
                                                {/*</a>*/}
                                            </div>

                                            <div className="lg:w-1/4">
                                                <img
                                                    src={img1}
                                                    className="lg:w-full w-[50%] h-auto block relative z-20"
                                                    alt="Solonick"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Section Number */}
                        <div className="section-number absolute right-2.5 top-[-2rem] text-[224px] font-bold text-gray-200 opacity-70 font-['Oswald'] -rotate-90 md:text-[180px]">
                            <span className="relative overflow-hidden">0</span>3.
                        </div>

                    </section>

                    {/* Section Separator */}
                    <div className="section-separator float-left w-full h-px relative mb-5">
                        <span className="absolute right-0 w-36 h-px top-0 z-10 bg-orange-500"></span>
                    </div>


                </div>
            </div>

            <style jsx>{`
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

                @media (max-width: 564px) {
                    section {
                        padding: 0 0;
                    }
                    .section-title h3 {
                        font-size: 20px;
                    }
                    .main-about h2 {
                        font-size: 24px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ResumeSection;
