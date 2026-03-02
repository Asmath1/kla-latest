"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import "../styles/Dummy.css";

export default function LatestNews() {
  const [activeTab, setActiveTab] = useState("updates");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section className="pb-8 md:pb-12 latest-news">
      <div className="container mx-auto px-4">
        <div className="row flex justify-center items-center mb-8 animate-fadeIn">
          <div className="col-lg-9 mx-auto">
            <div className="main-title text-center mb-6">
              <h2 className="title text-3xl font-bold">Latest</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 w-full">
            <div className="navpill-style2">
              <ul
                className="nav nav-pills mb-10 flex flex-wrap justify-center gap-2"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link fw500 dark-color px-4 py-2 rounded-md font-medium ${
                      activeTab === "updates"
                        ? "active bg-purple-100 text-purple-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleTabClick("updates")}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "updates"}
                  >
                    Updates
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link fw500 dark-color px-4 py-2 rounded-md font-medium ${
                      activeTab === "announcements"
                        ? "active bg-purple-100 text-purple-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleTabClick("announcements")}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "announcements"}
                  >
                    {/* Announcements */}
                    പ്രഖ്യാപനങ്ങൾ
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link fw500 dark-color px-4 py-2 rounded-md font-medium ${
                      activeTab === "press-release"
                        ? "active bg-purple-100 text-purple-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleTabClick("press-release")}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "press-release"}
                  >
                    Press Release
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link fw500 dark-color px-4 py-2 rounded-md font-medium ${
                      activeTab === "bulletin"
                        ? "active bg-purple-100 text-purple-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleTabClick("bulletin")}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "bulletin"}
                  >
                    Bulletin
                  </button>
                </li>
              </ul>
              <div className="tab-content">
                <div className="text-lg-center mb-5 flex justify-center">
                  <a
                    className="ud-btn2 flex items-center gap-2 text-gray-700 hover:text-gray-900"
                    href="#"
                  >
                    View All
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </div>

                {/* Updates Tab Content */}
                <div
                  className={`tab-pane fz15 text ${
                    activeTab === "updates" ? "block" : "hidden"
                  }`}
                  role="tabpanel"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, index) => (
                      <div key={`updates-${index}`} className="col">
                        <div className="iconbox-style1 at-home14-v1 shadow-md rounded-md overflow-hidden border border-gray-200 p-4">
                          <div className="details">
                            <p className="text mb-1">
                              <a href="#" className="hover:text-purple-700">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Hic nesciunt quae neque exab
                                consequatur. Volup
                              </a>
                            </p>
                            <div className="dateImg flex items-center text-gray-500 text-sm">
                              <span>21.02.2025</span> &nbsp;|&nbsp;{" "}
                              <a href="#" className="text-blue-500">
                                <FileText className="w-4 h-4 inline" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Announcements Tab Content */}
                <div
                  className={`tab-pane fz15 text ${
                    activeTab === "announcements" ? "block" : "hidden"
                  }`}
                  role="tabpanel"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, index) => (
                      <div key={`announcements-${index}`} className="col">
                        <div className="iconbox-style1 at-home14-v1 shadow-md rounded-md overflow-hidden border border-gray-200 p-4">
                          <div className="details">
                            <p className="text mb-1">
                              <a href="#" className="hover:text-purple-700">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Hic neque exab consequatur..
                              </a>
                            </p>
                            <div className="dateImg flex items-center text-gray-500 text-sm">
                              <span>21.02.2025</span> &nbsp;|&nbsp;{" "}
                              <a href="#" className="text-blue-500">
                                <FileText className="w-4 h-4 inline" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Press Release Tab Content */}
                <div
                  className={`tab-pane fz15 text ${
                    activeTab === "press-release" ? "block" : "hidden"
                  }`}
                  role="tabpanel"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, index) => (
                      <div key={`press-${index}`} className="col">
                        <div className="iconbox-style1 at-home14-v1 shadow-md rounded-md overflow-hidden border border-gray-200 p-4">
                          <div className="details">
                            <p className="text mb-1">
                              <a href="#" className="hover:text-purple-700">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. exab consequatur. Voluptates,
                                rerum..
                              </a>
                            </p>
                            <div className="dateImg flex items-center text-gray-500 text-sm">
                              <span>21.02.2025</span> &nbsp;|&nbsp;{" "}
                              <a href="#" className="text-blue-500">
                                <FileText className="w-4 h-4 inline" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bulletin Tab Content */}
                <div
                  className={`tab-pane fz15 text ${
                    activeTab === "bulletin" ? "block" : "hidden"
                  }`}
                  role="tabpanel"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, index) => (
                      <div key={`bulletin-${index}`} className="col">
                        <div className="iconbox-style1 at-home14-v1 shadow-md rounded-md overflow-hidden border border-gray-200 p-4">
                          <div className="details">
                            <p className="text mb-1">
                              <a href="#" className="hover:text-purple-700">
                                Lorem ipsum adipisicing elit. Hic nesciunt quae
                                nequ..
                              </a>
                            </p>
                            <div className="dateImg flex items-center text-gray-500 text-sm">
                              <span>21.02.2025</span> &nbsp;|&nbsp;{" "}
                              <a href="#" className="text-blue-500">
                                <FileText className="w-4 h-4 inline" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
