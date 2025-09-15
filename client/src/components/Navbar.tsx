"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownData = {
    subject: {
      subjects: [
        { title: "Mathematics", desc: "Algebra, Calculus & more", href: "/math" },
        { title: "Science", desc: "Physics, Chemistry, Biology", href: "/science" }
      ],
      features: [
        { title: "Interactive Learning", desc: "Hands-on practice problems", href: "/interactive" },
        { title: "Progress Tracking", desc: "Monitor your improvement", href: "/progress" }
      ]
    },
    solutions: {
      learning: [
        { title: "Online Tutoring", desc: "1-on-1 expert guidance", href: "/tutoring" },
        { title: "Video Courses", desc: "Self-paced learning", href: "/courses" }
      ],
      assessment: [
        { title: "Practice Tests", desc: "Assess your knowledge", href: "/practice" },
        { title: "Study Groups", desc: "Collaborative learning", href: "/groups" }
      ]
    },
    resources: {
      content: [
        { title: "Blog", desc: "Latest tips & insights", href: "/blog" },
        { title: "Study Guides", desc: "Comprehensive materials", href: "/guides" }
      ],
      tools: [
        { title: "Learning Tools", desc: "Interactive resources", href: "/tools" },
        { title: "Downloads", desc: "PDFs & worksheets", href: "/downloads" }
      ]
    }
  };

  return (
    <nav className="w-full">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center justify-center gap-14 mt-2">
          <div className="flex items-center justify-center gap-2 ml-5">
            <Image src={"/logo.svg"} alt="logo" width={20} height={20} />
            <h2 className="text-2xl font-bold text-primary">Growth Tubes</h2>
          </div>
          <div className="flex items-center text-sm justify-center gap-10">
                <div className="group relative">
                  <div className="font-medium cursor-pointer hover:text-green-600">Subject</div>
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white border border-gray-200 shadow-xl rounded-lg z-50 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Subjects</h3>
                        {dropdownData.subject.subjects.map((item, idx) => (
                          <Link key={idx} href={item.href} className="group block p-3 hover:bg-gray-50 rounded-lg border-l-4 border-transparent hover:border-green-500 transition-all duration-300 mb-2">
                            <div className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">{item.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Features</h3>
                        {dropdownData.subject.features.map((item, idx) => (
                          <Link key={idx} href={item.href} className="group block p-3 hover:bg-gray-50 rounded-lg border-l-4 border-transparent hover:border-green-500 transition-all duration-300 mb-2">
                            <div className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">{item.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group relative">
                  <div className="font-medium cursor-pointer hover:text-green-600">Solutions</div>
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white border border-gray-200 shadow-xl rounded-lg z-50 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Learning</h3>
                        {dropdownData.solutions.learning.map((item, idx) => (
                          <Link key={idx} href={item.href} className="group block p-3 hover:bg-gray-50 rounded-lg border-l-4 border-transparent hover:border-green-500 transition-all duration-300 mb-2">
                            <div className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">{item.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Assessment</h3>
                        {dropdownData.solutions.assessment.map((item, idx) => (
                          <Link key={idx} href={item.href} className="group block p-3 hover:bg-gray-50 rounded-lg border-l-4 border-transparent hover:border-green-500 transition-all duration-300 mb-2">
                            <div className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">{item.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group relative">
                  <div className="font-medium cursor-pointer hover:text-green-600">Resources</div>
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white border border-gray-200 shadow-xl rounded-lg z-50 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Content</h3>
                        {dropdownData.resources.content.map((item, idx) => (
                          <Link key={idx} href={item.href} className="group block p-3 hover:bg-gray-50 rounded-lg border-l-4 border-transparent hover:border-green-500 transition-all duration-300 mb-2">
                            <div className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">{item.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Tools</h3>
                        {dropdownData.resources.tools.map((item, idx) => (
                          <Link key={idx} href={item.href} className="group block p-3 hover:bg-gray-50 rounded-lg border-l-4 border-transparent hover:border-green-500 transition-all duration-300 mb-2">
                            <div className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">{item.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="font-medium cursor-pointer hover:text-green-600">Pricing</div>
          </div>
        </div>
        <div className="flex items-center gap-3 mr-6">
           <Link href="/login">
           <p className="text-sm font-medium text-gray-700 hover:text-green-600 px-3 py-2 transition-colors duration-200">
              Log In
           </p>
           </Link>
           <Link href="/login">
              <p className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:border-green-500 hover:text-green-600 transition-all duration-200">
                Request Demo
              </p>
           </Link>
           <Link href="/login">
              <p className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors duration-200">
                 Sign Up
              </p>
           </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
