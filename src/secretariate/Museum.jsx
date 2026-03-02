import React, { useState, useEffect } from "react";
import "./Secretariat.css";
import {
  BreadcrumbNav,
  CategoriesNav,
  SectionTitle,
  Tabs,
} from "../components/common";
import HomeTest from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
} from "@fortawesome/free-solid-svg-icons";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

const Museum = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {
      buttons: ["slideShow", "thumbs", "zoom", "fullScreen", "share", "close"],
      loop: false,
      protect: true,
    });
    return () => Fancybox.destroy();
  }, []);

  // const imagess = [
  //   "https://cdn.pixabay.com/photo/2023/05/22/10/49/houses-8010401_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2023/07/13/05/36/mountains-8123933_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2022/12/12/21/35/stream-7651969_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2022/10/24/20/22/muhlviertel-7544316_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2019/09/13/11/47/mountains-4473760_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2019/05/29/20/01/sunset-4238445_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2022/11/13/18/09/canyon-7589820_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2022/11/02/22/33/autumn-7566201_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2022/12/09/22/55/trees-7646226_1280.jpg",
  // ];


  

  return (
    <div className="wrapper ovh">
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>

      <div className="body_content">
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Secretariat", href: "/secretariat" },
            { name: "Museum", href: "/secretariat/Museum" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Museum" />

            <Tabs
              tabs={[
                {
                  key: "Vision and mission",
                  label: "Vision and Mission",
                  content: (
                    <div>
                      <main className="museum-container">
                        <section className="museum-grid">
                          <article className="museum-conten">
                            <h3>Vision &amp; Mission</h3>

                            <div className="museum-text">
                              <p>
                                {/* <strong>Vision:</strong>  */}
                                To collect objects of historical and
                                parliamentary significance for display,
                                protection, preservation and research.
                              </p>
                              <p>
                                {" "}
                                To disseminate knowledge about the significance
                                of the objects in respect of history and
                                institutions of democracy.
                              </p>
                              {/* <br/> */}
                              To serve as a centre for enjoyment and interaction
                              of people in parliamentary and cultural activity.
                            </div>

                            {/* <hr /> */}

                            <h3>History</h3>
                            <p>
                              A cultural and architectural landmark in the state
                              of Kerala, the Kerala Legislature Golden Jubilee
                              Museum inspires a passion for democracy and
                              learning. The museum opened at the Kerala
                              Legislative Assembly Complex and is unique —
                              widely acclaimed as a role model for state
                              assemblies elsewhere in the country.
                            </p>

                            <p>
                              The building that houses the museum was the
                              headquarters of the Travancore Nair Brigade since{" "}
                              <strong>1868</strong> and later served as a
                              military hospital. It was converted to the
                              Legislative Assembly Museum and inaugurated on{" "}
                              <strong>05 May 2006</strong>. The museum was
                              expanded with a new building on{" "}
                              <strong>15 April 2013</strong>.
                            </p>

                            <p>
                              The museum displays photos, objects and artefacts
                              that showcase the rich heritage of democratic
                              institutions of the land. It includes a model
                              assembly hall, mini theatre, library, research
                              centre, multimedia hall and touch-screen kiosks —
                              designed to give every visitor insight into
                              milestones of the Kerala Assembly.
                            </p>

                            {/* <div className="museum-images">
                              <figure>
                                <img
                                  src="/images/museum-content.jpg"
                                  alt="Museum exterior"
                                />
                                <figcaption>
                                  Museum exterior (placeholder)
                                </figcaption>
                              </figure>
                              <figure>
                                <img
                                  src="/images/museum-co.jpg"
                                  alt="Model Assembly Hall"
                                />
                                <figcaption>
                                  Model of the Assembly Hall (placeholder)
                                </figcaption>
                              </figure>
                            </div> */}
                          </article>

                          <aside className="museum-sidebar">
                            <div className="museum-card">
                              <h4>Visitor Information</h4>
                              <dl>
                                <div>
                                  <dt>Working hours</dt>
                                  <dd>11:00 — 16:00 (All working days)</dd>
                                </div>
                                <div>
                                  <dt>Services</dt>
                                  <dd>
                                    Resource Centre, Sales Division &amp;
                                    Children's Library
                                  </dd>
                                </div>
                                <div>
                                  <dt>Inauguration</dt>
                                  <dd>
                                    05 May 2006 (original), expansion 15 Apr
                                    2013
                                  </dd>
                                </div>
                              </dl>
                              <a
                                href="https://www.niyamasabha.nic.in/index.php/museum/index/museum_vision"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Official museum page
                              </a>
                            </div>

                            <div className="museum-card">
                              <h4>Quick Tour</h4>
                              <p>
                                Highlights you can include in a short visit:
                              </p>
                              <ul>
                                <li>Model of the Assembly Hall</li>
                                <li>Mini theatre &amp; multimedia displays</li>
                                <li>
                                  Research centre &amp; children's library
                                </li>
                              </ul>
                            </div>
                          </aside>
                        </section>

                        <div className="museum-offer">
                          <h3>What the Museum Offers</h3>
                          <p>
                            The museum is a repository for the rich legislative
                            history of Kerala. Thousands of school students and
                            researchers visit the museum every year as part of
                            education and study tours. Exhibits, multimedia
                            kiosks and a small library make it a practical
                            resource for learning about democratic institutions.
                          </p>
                        </div>
                      </main>
                    </div>
                  ),
                },
                {
                  key: "Image Gallery",
                  label: "Image Gallery",
                  // content: (
                  //    <main className="SabhaTV main">
                  //     <div className="SabhaTV container">
                  //       {imagess.map((src, i) => (
                  //         <div key={i} className="SabhaTV card">
                  //           <div className="SabhaTV card-image">
                  //             <a
                  //               href={src}
                  //               data-fancybox="gallery"
                  //               data-caption={`Caption Image ${i + 1}`}
                  //             >
                  //               <img src={src} alt={`Gallery ${i + 1}`} />
                  //             </a>
                  //           </div>
                  //         </div>
                  //       ))}
                  //     </div>
                  //   </main>
                  // ),
                },
                {
                  key: "How to visit",
                  label: "How to visit",
                  content: <div></div>,
                },
                {
                  key: "What are here",
                  label: "What are here",
                  content: <div></div>,
                },
              ]}
              onChange={() => {}}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Museum;
