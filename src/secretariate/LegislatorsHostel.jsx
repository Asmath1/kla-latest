import React, { useEffect, useState } from "react";
import HomeTest from "../components/Header";
import { BreadcrumbNav, CategoriesNav } from "../components/common";
import "./Secretariat.css";

const EstateOfficer = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const PhoneIcon = () => (
    <img src="/images/call.svg" className="sec-icon" alt="call" />
  );

  const iconWrap = (value) => (
    <span className="phone-with-icon">
      <PhoneIcon />
      {value}
    </span>
  );

  const data = [
    {
      name: "Shri. A.K.M Ashraf",
      constituency: "Manjeshwar (1)",
      phone: "9995239701 / 0471-2512317",
      hostel: "Nila Block 53",
    },
    {
      name: "Shri N. A. Nellikkunnu",
      constituency: "Kasaragod (02)",
      phone: "9447010338 / 0471-2512342",
      hostel: "Neyyar Block 8C",
    },
    {
      name: "Shri C.H. Kunhambu",
      constituency: "Udma (03)",
      phone: "9447489707 / 0471-2512374",
      hostel: "Neyyar Block 4D",
    },
    {
      name: "Shri E. Chandrasekharan",
      constituency: "Kanhangad (4)",
      phone: "9447672200 / 0471-2512210",
      hostel: "Neyyar Block 1C",
    },
    {
      name: "Shri M. Rajagopalan",
      constituency: "Trikaripur (05)",
      phone: "9446168577 / 0471-2512240",
      hostel: "Neyyar Block 7D",
    },
    {
      name: "Shri T.I. Madhusoodanan",
      constituency: "Payyannur (06)",
      phone: "9447026670 / 0471-2512580",
      hostel: "Chandragiri Block 502",
    },
    {
      name: "Shri M. Vijin",
      constituency: "Kalliasseri (07)",
      phone: "9847443943 / 0471-2512214",
      hostel: "Periyar Block 504",
    },
    {
      name: "Shri M.V. Govindan Master",
      constituency: "Taliparamba (08)",
      phone: "9400099111 / 0471-2512209",
      hostel: "Neyyar Block 7A",
    },
    {
      name: "Shri Sajeev Joseph",
      constituency: "Irikkur (09)",
      phone: "9447881506 / 0471-2512246",
      hostel: "Nila Block 54",
    },
    {
      name: "Shri K.V. Sumesh",
      constituency: "Azhikode (10)",
      phone: "9447372151 / 0471-2512384",
      hostel: "Chandragiri Block 604",
    },
    {
      name: "Shri Ramachandran Kadannappalli",
      constituency: "Kannur (11)",
      phone: "9447628800",
      hostel: "Minister for Registration, Museums and Archeology",
    },
    {
      name: "Shri Pinarayi Vijayan",
      constituency: "Dharmadam (12)",
      phone: "9447565656",
      hostel: "Chief Minister",
    },
    {
      name: "Shri A. N. Shamseer",
      constituency: "Thalassery (13)",
      phone: "9447056803",
      hostel: "Speaker",
    },
    {
      name: "Shri K.P. Mohanan",
      constituency: "Kuthuparamba (14)",
      phone: "9496255500 / 0471-2512218",
      hostel: "Neyyar Block 6B",
    },
    {
      name: "Smt. K.K. Shailaja Teacher",
      constituency: "Mattannur (15)",
      phone: "9447694326 / 0471-2512334",
      hostel: "Chandragiri Block 401",
    },
    {
      name: "Shri Sunny Joseph",
      constituency: "Peravoor (16)",
      phone: "9447046694 / 0471-2512609",
      hostel: "Chandragiri Block 204",
    },
    {
      name: "Shri O. R. Kelu",
      constituency: "Mananthavady(ST) (17)",
      phone: "9446545146 / 0471-2512366",
      hostel: "Chandragiri Block 201",
    },
    {
      name: "Shri I. C. Balakrishnan",
      constituency: "Sulthan Bathery(ST) (18)",
      phone: "9947675080 / 0471-2512303",
      hostel: "Neyyar Block 1B",
    },
    {
      name: "Shri T. Siddiqu",
      constituency: "Kalpetta (19)",
      phone: "9446060303 / 0471-2512220",
      hostel: "Nila Block 60",
    },
    {
      name: "Smt. K. K. Rema",
      constituency: "Vadakara (20)",
      phone: "9497648545 / 0471-2512242",
      hostel: "Periyar Block 201",
    },
    {
      name: "Shri K.P. Kunhammed Kutty Master",
      constituency: "Kuttiadi (21)",
      phone: "9400796466 / 0471-2512344",
      hostel: "Chandragiri Block 304",
    },
    {
      name: "Shri E K Vijayan",
      constituency: "Nadapuram (22)",
      phone: "9447426175 / 0471-2512237",
      hostel: "Chandragiri Block 702",
    },
    {
      name: "Smt. Kanathil Jameela",
      constituency: "Quilandy (23)",
      phone: "9447542026 / 0471-2512320",
      hostel: "Chandragiri Block 801",
    },
    {
      name: "Shri T. P. Ramakrishnan",
      constituency: "Perambra (24)",
      phone: "9446485543 / 0471-2512335",
      hostel: "Chandragiri Block 601",
    },
    {
      name: "Shri K.M. Sachindev",
      constituency: "Balusseri(SC) (25)",
      phone: "9961304198 / 0471-2512582",
      hostel: "Nila Block 29, 30",
    },
    {
      name: "Shri A.K. Saseendran",
      constituency: "Elathur (26)",
      phone: "9847001879",
      hostel: "Minister for Forests, Wildlife Protection",
    },
    {
      name: "Shri Thottathil Raveendran",
      constituency: "Kozhikode(North) (27)",
      phone: "9446259898 / 0471-2512241",
      hostel: "Periyar Block G 02",
    },
    {
      name: "Shri Ahammed Devarkovil",
      constituency: "Kozhikode(South) (28)",
      phone: "9847005405 / 0471-2512285",
      hostel: "Neyyar Block 2B",
    },
    {
      name: "Shri P.A. Mohamed Riyas",
      constituency: "Beypore (29)",
      phone: "9446373370",
      hostel: "Minister for Public Works and Tourism",
    },
    {
      name: "Shri P. T. A. Rahim",
      constituency: "Kunnamangalam (30)",
      phone: "9847510238 / 0471-2512348",
      hostel: "Neyyar Block 6A",
    },
    {
      name: "Dr. M. K. Muneer",
      constituency: "Koduvally (31)",
      phone: "9947041000 / 0471-2512313",
      hostel: "Chandragiri Block 602",
    },
    {
      name: "Shri Linto Joseph",
      constituency: "Thiruvambady (32)",
      phone: "9656039897 / 0471-2512232",
      hostel: "Periyar Block 101",
    },
    {
      name: "Shri T. V. Ibrahim",
      constituency: "Kondotty (33)",
      phone: "9446774400 / 0471-2512297",
      hostel: "Nila Block 38, 39",
    },
  ];

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
            { name: "secretariate", href: "/secretariate" },
            {
              name: "Legislators Hostel",
              href: "/secretariate/LegislatorsHostel",
            },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container estate-officer-page">
            <h2 className="title">Legislators Hostel</h2>

            {/* --- Estate Officer Card --- */}
            <div className="row mb20">
              <div className="col-md-6 mb20">
                <div className="leg-section1 card custom-card p10">
                  <h3 className="mb15">Estate Officer</h3>

                  <div className="item-row">
                    <span className="label-text">Name</span>
                    <span className="value-text">
                      Shri. S. Sunil Kumar, Joint Secretary VII / Estate Officer
                    </span>
                  </div>

                  <div className="item-row mt10">
                    <span className="label-text">Room</span>
                    <span className="value-text">
                      Room No. 6, Ground Floor, Nila Block, MLA Hostel
                    </span>
                  </div>

                  <div className="item-row mt10">
                    <span className="label-text">Email</span>
                    <span className="value-text">
                      <a href="mailto:ssunilkumar@niyamasabha.nic.in">
                        ssunilkumar@niyamasabha.nic.in
                      </a>
                      <br />
                      <a href="mailto:estateofficer@niyamasabha.nic.in">
                        estateofficer@niyamasabha.nic.in
                      </a>
                    </span>
                  </div>

                  <div className="item-row mt10">
                    <span className="label-text">Phone</span>
                    <span className="value-text">
                     2302189 (Direct), 2206 (EPBAX)
                    </span>
                  </div>

                  <div className="item-row mt10">
                    <span className="label-text">Mobile</span>
                    <span className="value-text">
                      9447564884
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb20">
                <div className="leg-section1 card custom-card p10">
                  <h3 className="mb15">Deputy Secretary</h3>

                  <div className="ds-row">
                    <span className="ds-label">Deputy Secretary</span>
                    <span className="ds-value">2212</span>
                  </div>

                  <div className="ds-row mt10">
                    <span className="ds-label">Under Secretary III</span>
                    <span className="ds-value">2273</span>
                  </div>

                  <div className="ds-row mt10">
                    <span className="ds-label">Under Secretary I</span>
                    <span className="ds-value">2267, 2274</span>
                  </div>

                  <div className="ds-row mt10">
                    <span className="ds-label">Fax</span>
                    <span className="ds-value">2606</span>
                  </div>

                  <div className="ds-row mt10">
                    <span className="ds-label">Assistant Manager / Enquiry</span>
                    <span className="ds-value">2261</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Sections --- */}

            <div className="mb20">
              <h3>Sections</h3>

              <div className="sec-block">
                <h5 className="sec-heading">Members’ Amenities ‘A’ Section</h5>
                <div className="sec-row">
                  <span className="sec-label">Room</span>
                  <span className="sec-value">
                    Room No. 4, Ground Floor, Nila Block
                  </span>
                </div>
                <div className="sec-row">
                  <span className="sec-label">Section Officer</span>
                  <span className="sec-value">{iconWrap("2204")}</span>
                </div>
              </div>

              <div className="sec-block">
                <h5 className="sec-heading">Members’ Amenities ‘B’ Section</h5>
                <div className="sec-row">
                  <span className="sec-label">Room</span>
                  <span className="sec-value">
                    Room No. 14, Ground Floor, Nila Block
                  </span>
                </div>
                <div className="sec-row">
                  <span className="sec-label">Section Officer</span>
                  <span className="sec-value">{iconWrap("2211")}</span>
                </div>
              </div>

              <div className="sec-block">
                <h5 className="sec-heading">Members’ Amenities ‘C’ Section</h5>
                <div className="sec-row">
                  <span className="sec-label">Room</span>
                  <span className="sec-value">
                    Room No. 36A, II Floor, Nila Block
                  </span>
                </div>
                <div className="sec-row">
                  <span className="sec-label">Section Officer</span>
                  <span className="sec-value">{iconWrap("2254")}</span>
                </div>
              </div>

              <div className="sec-block">
                <h5 className="sec-heading">Members’ Amenities ‘D’ Section</h5>
                <div className="sec-row">
                  <span className="sec-label">Room</span>
                  <span className="sec-value">
                    Room No. 8, Ground Floor, Nila Block
                  </span>
                </div>
                <div className="sec-row">
                  <span className="sec-label">Section Officer</span>
                  <span className="sec-value">{iconWrap("2268")}</span>
                </div>
              </div>

              <div className="sec-block">
                <h5 className="sec-heading">Members’ Amenities ‘E’ Section</h5>
                <div className="sec-row">
                  <span className="sec-label">Room</span>
                  <span className="sec-value">
                    Room No. 7, Ground Floor, Nila Block
                  </span>
                </div>
                <div className="sec-row">
                  <span className="sec-label">Section Officer</span>
                  <span className="sec-value">{iconWrap("2207")}</span>
                </div>
              </div>

              <div className="sec-block">
                <h5 className="sec-heading">Members’ Amenities ‘F’ Section</h5>
                <div className="sec-row">
                  <span className="sec-label">Room</span>
                  <span className="sec-value">
                    Room No. 14-A, Ground Floor, Nila Block
                  </span>
                </div>
                <div className="sec-row">
                  <span className="sec-label">Section Officer</span>
                  <span className="sec-value">{iconWrap("2278")}</span>
                </div>
              </div>

              <div className="sec-block">
                <h5 className="sec-heading">
                  Members’ Assistance & Fair Copying Branch VI
                </h5>
                <div className="sec-row">
                  <span className="sec-label">Room</span>
                  <span className="sec-value">
                    Room No. 41-B, II Floor, Nila Block
                  </span>
                </div>
                <div className="sec-row">
                  <span className="sec-label">Office Superintendent</span>
                  <span className="sec-value">{iconWrap("2203")}</span>
                </div>
              </div>

              <div className="sec-block">
                <h5 className="sec-heading">Office Section</h5>
                <div className="sec-row">
                  <span className="sec-label">Room</span>
                  <span className="sec-value">
                    Room No. 18, I Floor, Nila Block
                  </span>
                </div>
                <div className="sec-row">
                  <span className="sec-label">Office Superintendent</span>
                  <span className="sec-value">{iconWrap("2269")}</span>
                </div>
              </div>
            </div>

            {/* --- Clinics --- */}

            <div className="mb20 clinic-counter-others">
              <h3>Clinics</h3>
              <ul className="clinic-list info-list">
                <li>
                  <span className="info-label">Ayurveda:</span>
                  <span className="info-value">{iconWrap("2227")}</span>
                </li>
                <li>
                  <span className="info-label">Dental:</span>
                  <span className="info-value">{iconWrap("2293")}</span>
                </li>
                <li>
                  <span className="info-label">Eye Clinic:</span>
                  <span className="info-value">{iconWrap("2659")}</span>
                </li>
                <li>
                  <span className="info-label">Health Clinic Doctor:</span>
                  <span className="info-value">{iconWrap("2216")}</span>
                </li>
                <li>
                  <span className="info-label">Health Clinic:</span>
                  <span className="info-value">{iconWrap("2215")}</span>
                </li>
                <li>
                  <span className="info-label">Health Clinic Lab:</span>
                  <span className="info-value">{iconWrap("2309")}</span>
                </li>
                <li>
                  <span className="info-label">Homoeo:</span>
                  <span className="info-value">{iconWrap("2352")}</span>
                </li>
              </ul>

              <h3>Counters</h3>
              <ul className="counter-list info-list">
                <li>
                  <span className="info-label">Periyar Block:</span>
                  <span className="info-value">{iconWrap("2307")}</span>
                </li>
                <li>
                  <span className="info-label">Pamba Block:</span>
                  <span className="info-value">{iconWrap("2300")}</span>
                </li>
                <li>
                  <span className="info-label">Nila Block:</span>
                  <span className="info-value">{iconWrap("2260")}</span>
                </li>
                <li>
                  <span className="info-label">Chandragiri Block:</span>
                  <span className="info-value">{iconWrap("2299")}</span>
                </li>
                <li>
                  <span className="info-label">Neyyar Block:</span>
                  <span className="info-value">{iconWrap("2399")}</span>
                </li>
                <li>
                  <span className="info-label">Watch and Ward:</span>
                  <span className="info-value">{iconWrap("2263")}</span>
                </li>
              </ul>

              <h3>Others</h3>
              <ul className="others-list info-list">
                <li>
                  <span className="info-label">
                    Library (Room No. 100, Nila Block):
                  </span>
                  <span className="info-value">{iconWrap("2259")}</span>
                </li>
                <li>
                  <span className="info-label">
                    Railway Counter (Room No. 24, Nila Block):
                  </span>
                  <span className="info-value">{iconWrap("2392")}</span>
                </li>
              </ul>
            </div>

            {/* --- MLA Table --- */}

            <table className="table table myTable2">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Constituency (No.)</th>
                  <th>Phone Number</th>
                  <th>MLA Hostel</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.constituency}</td>
                    <td>{item.phone}</td>
                    <td>{item.hostel}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </section>
      </div>
    </div>
  );
};

export default EstateOfficer;




// import React, { useEffect, useState } from "react";
// import HomeTest from "../components/Header";
// import { BreadcrumbNav, CategoriesNav } from "../components/common";
// import "./Secretariat.css";
// import { FaPhone } from "react-icons/fa";

// const EstateOfficer = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Set on load

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const data = [
//     {
//       name: "Shri. A.K.M Ashraf",
//       constituency: "Manjeshwar (1)",
//       phone: "9995239701 / 0471-2512317",
//       hostel: "Nila Block 53",
//     },
//     {
//       name: "Shri N. A. Nellikkunnu",
//       constituency: "Kasaragod (02)",
//       phone: "9447010338 / 0471-2512342",
//       hostel: "Neyyar Block 8C",
//     },
//     {
//       name: "Shri C.H. Kunhambu",
//       constituency: "Udma (03)",
//       phone: "9447489707 / 0471-2512374",
//       hostel: "Neyyar Block 4D",
//     },
//     {
//       name: "Shri E. Chandrasekharan",
//       constituency: "Kanhangad (4)",
//       phone: "9447672200 / 0471-2512210",
//       hostel: "Neyyar Block 1C",
//     },
//     {
//       name: "Shri M. Rajagopalan",
//       constituency: "Trikaripur (05)",
//       phone: "9446168577 / 0471-2512240",
//       hostel: "Neyyar Block 7D",
//     },
//     {
//       name: "Shri T.I. Madhusoodanan",
//       constituency: "Payyannur (06)",
//       phone: "9447026670 / 0471-2512580",
//       hostel: "Chandragiri Block 502",
//     },
//     {
//       name: "Shri M. Vijin",
//       constituency: "Kalliasseri (07)",
//       phone: "9847443943 / 0471-2512214",
//       hostel: "Periyar Block 504",
//     },
//     {
//       name: "Shri M.V. Govindan Master",
//       constituency: "Taliparamba (08)",
//       phone: "9400099111 / 0471-2512209",
//       hostel: "Neyyar Block 7A",
//     },
//     {
//       name: "Shri Sajeev Joseph",
//       constituency: "Irikkur (09)",
//       phone: "9447881506 / 0471-2512246",
//       hostel: "Nila Block 54",
//     },
//     {
//       name: "Shri K.V. Sumesh",
//       constituency: "Azhikode (10)",
//       phone: "9447372151 / 0471-2512384",
//       hostel: "Chandragiri Block 604",
//     },
//     {
//       name: "Shri Ramachandran Kadannappalli",
//       constituency: "Kannur (11)",
//       phone: "9447628800",
//       hostel: "Minister for Registration, Museums and Archeology",
//     },
//     {
//       name: "Shri Pinarayi Vijayan",
//       constituency: "Dharmadam (12)",
//       phone: "9447565656",
//       hostel: "Chief Minister",
//     },
//     {
//       name: "Shri A. N. Shamseer",
//       constituency: "Thalassery (13)",
//       phone: "9447056803",
//       hostel: "Speaker",
//     },
//     {
//       name: "Shri K.P. Mohanan",
//       constituency: "Kuthuparamba (14)",
//       phone: "9496255500 / 0471-2512218",
//       hostel: "Neyyar Block 6B",
//     },
//     {
//       name: "Smt. K.K. Shailaja Teacher",
//       constituency: "Mattannur (15)",
//       phone: "9447694326 / 0471-2512334",
//       hostel: "Chandragiri Block 401",
//     },
//     {
//       name: "Shri Sunny Joseph",
//       constituency: "Peravoor (16)",
//       phone: "9447046694 / 0471-2512609",
//       hostel: "Chandragiri Block 204",
//     },
//     {
//       name: "Shri O. R. Kelu",
//       constituency: "Mananthavady(ST) (17)",
//       phone: "9446545146 / 0471-2512366",
//       hostel: "Chandragiri Block 201",
//     },
//     {
//       name: "Shri I. C. Balakrishnan",
//       constituency: "Sulthan Bathery(ST) (18)",
//       phone: "9947675080 / 0471-2512303",
//       hostel: "Neyyar Block 1B",
//     },
//     {
//       name: "Shri T. Siddiqu",
//       constituency: "Kalpetta (19)",
//       phone: "9446060303 / 0471-2512220",
//       hostel: "Nila Block 60",
//     },
//     {
//       name: "Smt. K. K. Rema",
//       constituency: "Vadakara (20)",
//       phone: "9497648545 / 0471-2512242",
//       hostel: "Periyar Block 201",
//     },
//     {
//       name: "Shri K.P. Kunhammed Kutty Master",
//       constituency: "Kuttiadi (21)",
//       phone: "9400796466 / 0471-2512344",
//       hostel: "Chandragiri Block 304",
//     },
//     {
//       name: "Shri E K Vijayan",
//       constituency: "Nadapuram (22)",
//       phone: "9447426175 / 0471-2512237",
//       hostel: "Chandragiri Block 702",
//     },
//     {
//       name: "Smt. Kanathil Jameela",
//       constituency: "Quilandy (23)",
//       phone: "9447542026 / 0471-2512320",
//       hostel: "Chandragiri Block 801",
//     },
//     {
//       name: "Shri T. P. Ramakrishnan",
//       constituency: "Perambra (24)",
//       phone: "9446485543 / 0471-2512335",
//       hostel: "Chandragiri Block 601",
//     },
//     {
//       name: "Shri K.M. Sachindev",
//       constituency: "Balusseri(SC) (25)",
//       phone: "9961304198 / 0471-2512582",
//       hostel: "Nila Block 29, 30",
//     },
//     {
//       name: "Shri A.K. Saseendran",
//       constituency: "Elathur (26)",
//       phone: "9847001879",
//       hostel: "Minister for Forests, Wildlife Protection",
//     },
//     {
//       name: "Shri Thottathil Raveendran",
//       constituency: "Kozhikode(North) (27)",
//       phone: "9446259898 / 0471-2512241",
//       hostel: "Periyar Block G 02",
//     },
//     {
//       name: "Shri Ahammed Devarkovil",
//       constituency: "Kozhikode(South) (28)",
//       phone: "9847005405 / 0471-2512285",
//       hostel: "Neyyar Block 2B",
//     },
//     {
//       name: "Shri P.A. Mohamed Riyas",
//       constituency: "Beypore (29)",
//       phone: "9446373370",
//       hostel: "Minister for Public Works and Tourism",
//     },
//     {
//       name: "Shri P. T. A. Rahim",
//       constituency: "Kunnamangalam (30)",
//       phone: "9847510238 / 0471-2512348",
//       hostel: "Neyyar Block 6A",
//     },
//     {
//       name: "Dr. M. K. Muneer",
//       constituency: "Koduvally (31)",
//       phone: "9947041000 / 0471-2512313",
//       hostel: "Chandragiri Block 602",
//     },
//     {
//       name: "Shri Linto Joseph",
//       constituency: "Thiruvambady (32)",
//       phone: "9656039897 / 0471-2512232",
//       hostel: "Periyar Block 101",
//     },
//     {
//       name: "Shri T. V. Ibrahim",
//       constituency: "Kondotty (33)",
//       phone: "9446774400 / 0471-2512297",
//       hostel: "Nila Block 38, 39",
//     },
//     // ... Continue the same format for all remaining entries ...
//   ];

//   return (
//     <div className="wrapper ovh">
//       {/* ---------------- HEADER ---------------- */}
//       <header
//         className={`header-nav nav-homepage-style2 stricky main-menu ${
//           isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
//         }`}
//       >
//         <HomeTest />
//       </header>

//       <div className="body_content">
//         {/* ---------------- NAVIGATION ---------------- */}
//         <CategoriesNav />
//         <BreadcrumbNav
//           breadcrumbs={[
//             { name: "Home", href: "/" },
//             { name: "secretariate", href: "/secretariate" },
//             {
//               name: "Legislators Hostel",
//               href: "/secretariate/LegislatorsHostel",
//             },
//           ]}
//         />

//         <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
//           <div className="container estate-officer-page">
//             <h2 className="title">Legislators Hostel</h2>
//             {/* ------------------ Estate Officer ------------------ */}
//             {/* <div className="mb20">
//               <h2>Estate Officer</h2>

//               <p>
//                 <strong>Shri. S. Sunil Kumar</strong>
//                 <br />
//                 Joint Secretary VII / Estate Officer
//               </p>

//               <p>
//                 <strong>Room:</strong> Room No. 6, Ground Floor, Nila Block, MLA
//                 Hostel
//               </p>

//               <p>
//                 <strong>Email:</strong>
//                 <br />
//                 <a href="mailto:ssunilkumar@niyamasabha.nic.in">
//                   ssunilkumar@niyamasabha.nic.in
//                 </a>
//                 <br />
//                 <a href="mailto:estateofficer@niyamasabha.nic.in">
//                   estateofficer@niyamasabha.nic.in
//                 </a>
//               </p>

//               <p>
//                 <strong>Phone:</strong> 2302189 (Direct), 2206 (EPBAX)
//                 <br />
//                 <strong>Mobile:</strong> 9447564884
//               </p>

//               <p>
//                 <strong>Deputy Secretary:</strong> 2212
//               </p>
//               <p>
//                 <strong>Under Secretary III:</strong> 2273
//               </p>
//               <p>
//                 <strong>Under Secretary I:</strong> 2267, 2274
//               </p>
//               <p>
//                 <strong>Fax:</strong> 2606
//               </p>

//               <p>
//                 <strong>Assistant Manager / Enquiry:</strong> 2261
//               </p>
//             </div> */}

//             <div className=" row mb20">
//               {/* ---------- Card 1 ----------- */}

//               <div className="col-md-6 mb20">
//                 <div className="leg-section1 card custom-card p10">
//                   <h3 className="mb15">Estate Officer</h3>

//                   {/* Name */}
//                   <div className="item-row">
//                     <span className="label-text">Name</span>
//                     <span className="value-text">
//                       Shri. S. Sunil Kumar, Joint Secretary VII / Estate Officer
//                     </span>
//                   </div>

//                   {/* Room */}
//                   <div className="item-row mt10">
//                     <span className="label-text">Room</span>
//                     <span className="value-text">
//                       Room No. 6, Ground Floor, Nila Block, MLA Hostel
//                     </span>
//                   </div>

//                   {/* Email */}
//                   <div className="item-row mt10">
//                     <span className="label-text">Email</span>
//                     <span className="value-text">
//                       <a href="mailto:ssunilkumar@niyamasabha.nic.in">
//                         ssunilkumar@niyamasabha.nic.in
//                       </a>
//                       <br />
//                       <a href="mailto:estateofficer@niyamasabha.nic.in">
//                         estateofficer@niyamasabha.nic.in
//                       </a>
//                     </span>
//                   </div>

//                   {/* Phone */}
//                   <div className="item-row mt10">
//                     <span className="label-text">Phone</span>
//                     <span className="value-text">
//                       2302189 (Direct), 2206 (EPBAX)
//                     </span>
//                   </div>

//                   {/* Mobile */}
//                   <div className="item-row mt10">
//                     <span className="label-text">Mobile</span>
//                     <span className="value-text">9447564884</span>
//                   </div>
//                 </div>
//               </div>

//               {/* ---------- Card 2 (Same Data) ----------- */}

//               <div className="col-md-6 mb20">
//                 <div className="leg-section1 card custom-card p10">
//                   <h3 className="mb15">Deputy Secretary</h3>

//                   <div className="ds-row">
//                     <span className="ds-label">Deputy Secretary</span>
//                     <span className="ds-value">2212</span>
//                   </div>

//                   <div className="ds-row mt10">
//                     <span className="ds-label">Under Secretary III</span>
//                     <span className="ds-value">2273</span>
//                   </div>

//                   <div className="ds-row mt10">
//                     <span className="ds-label">Under Secretary I</span>
//                     <span className="ds-value">2267, 2274</span>
//                   </div>

//                   <div className="ds-row mt10">
//                     <span className="ds-label">Fax</span>
//                     <span className="ds-value">2606</span>
//                   </div>

//                   <div className="ds-row mt10">
//                     <span className="ds-label">
//                       Assistant Manager / Enquiry
//                     </span>
//                     <span className="ds-value">2261</span>
//                   </div>
//                 </div>
//               </div>

           
//             </div>

            

//             <div className="mb20">
//               <h3>Sections</h3>

//               <div className="sec-block">
//                 <h5 className="sec-heading">Members’ Amenities ‘A’ Section</h5>
//                 <div className="sec-row">
//                   <span className="sec-label">Room</span>
//                   <span className="sec-value">
//                     Room No. 4, Ground Floor, Nila Block
//                   </span>
//                 </div>
//                 <div className="sec-row">
//                   <span className="sec-label">Section Officer</span>
//                   <img  className="sec-icon" src="/images/call.svg"/>
//                   <span className="sec-value">2204</span>
//                 </div>
//               </div>

//               <div className="sec-block">
//                 <h5 className="sec-heading">Members’ Amenities ‘B’ Section</h5>
//                 <div className="sec-row">
//                   <span className="sec-label">Room</span>
//                   <span className="sec-value">
//                     Room No. 14, Ground Floor, Nila Block
//                   </span>
//                 </div>
//                 <div className="sec-row">
//                   <span className="sec-label">Section Officer</span>
//                   <span className="sec-value">2211</span>
//                 </div>
//               </div>

//               <div className="sec-block">
//                 <h5 className="sec-heading">Members’ Amenities ‘C’ Section</h5>
//                 <div className="sec-row">
//                   <span className="sec-label">Room</span>
//                   <span className="sec-value">
//                     Room No. 36A, II Floor, Nila Block
//                   </span>
//                 </div>
//                 <div className="sec-row">
//                   <span className="sec-label">Section Officer</span>
//                   <span className="sec-value">2254</span>
//                 </div>
//               </div>

//               <div className="sec-block">
//                 <h5 className="sec-heading">Members’ Amenities ‘D’ Section</h5>
//                 <div className="sec-row">
//                   <span className="sec-label">Room</span>
//                   <span className="sec-value">
//                     Room No. 8, Ground Floor, Nila Block
//                   </span>
//                 </div>
//                 <div className="sec-row">
//                   <span className="sec-label">Section Officer</span>
//                   <span className="sec-value">2268</span>
//                 </div>
//               </div>

//               <div className="sec-block">
//                 <h5 className="sec-heading">Members’ Amenities ‘E’ Section</h5>
//                 <div className="sec-row">
//                   <span className="sec-label">Room</span>
//                   <span className="sec-value">
//                     Room No. 7, Ground Floor, Nila Block
//                   </span>
//                 </div>
//                 <div className="sec-row">
//                   <span className="sec-label">Section Officer</span>
//                   <span className="sec-value">2207</span>
//                 </div>
//               </div>

//               <div className="sec-block">
//                 <h5 className="sec-heading">Members’ Amenities ‘F’ Section</h5>
//                 <div className="sec-row">
//                   <span className="sec-label">Room</span>
//                   <span className="sec-value">
//                     Room No. 14-A, Ground Floor, Nila Block
//                   </span>
//                 </div>
//                 <div className="sec-row">
//                   <span className="sec-label">Section Officer</span>
//                   <span className="sec-value">2278</span>
//                 </div>
//               </div>

//               <div className="sec-block">
//                 <h5 className="sec-heading">
//                   Members’ Assistance & Fair Copying Branch VI
//                 </h5>
//                 <div className="sec-row">
//                   <span className="sec-label">Room</span>
//                   <span className="sec-value">
//                     Room No. 41-B, II Floor, Nila Block
//                   </span>
//                 </div>
//                 <div className="sec-row">
//                   <span className="sec-label">Office Superintendent</span>
//                   <span className="sec-value">2203</span>
//                 </div>
//               </div>

//               <div className="sec-block">
//                 <h5 className="sec-heading">Office Section</h5>
//                 <div className="sec-row">
//                   <span className="sec-label">Room</span>
//                   <span className="sec-value">
//                     Room No. 18, I Floor, Nila Block
//                   </span>
//                 </div>
//                 <div className="sec-row">
//                   <span className="sec-label">Office Superintendent</span>
//                   <span className="sec-value">2269</span>
//                 </div>
//               </div>
//             </div>

//             {/* ------------------ CLINICS ------------------ */}
//             <div className="mb20 clinic-counter-others">
//               <h3 >Clinics</h3>
//               <ul className="clinic-list info-list">
//                 <li>
//                   <span className="info-label">Ayurveda:</span>{" "}
//                   <span className="info-value">2227</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Dental:</span>{" "}
//                   <span className="info-value">2293</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Eye Clinic:</span>{" "}
//                   <span className="info-value">2659</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Health Clinic Doctor:</span>{" "}
//                   <span className="info-value">2216</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Health Clinic:</span>{" "}
//                   <span className="info-value">2215</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Health Clinic Lab:</span>{" "}
//                   <span className="info-value">2309</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Homoeo:</span>{" "}
//                   <span className="info-value">2352</span>
//                 </li>
//               </ul>

//               <h3>Counters</h3>
//               <ul className="counter-list info-list">
//                 <li>
//                   <span className="info-label">Periyar Block:</span>{" "}
//                   <span className="info-value">2307</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Pamba Block:</span>{" "}
//                   <span className="info-value">2300</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Nila Block:</span>{" "}
//                   <span className="info-value">2260</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Chandragiri Block:</span>{" "}
//                   <span className="info-value">2299</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Neyyar Block:</span>{" "}
//                   <span className="info-value">2399</span>
//                 </li>
//                 <li>
//                   <span className="info-label">Watch and Ward:</span>{" "}
//                   <span className="info-value">2263</span>
//                 </li>
//               </ul>

//               <h3>Others</h3>
//               <ul className="others-list info-list">
//                 <li>
//                   <span className="info-label">
//                     Library (Room No. 100, Nila Block):
//                   </span>
//                   <span className="info-value">2259</span>
//                 </li>
//                 <li>
//                   <span className="info-label">
//                     Railway Counter (Room No. 24, Nila Block):
//                   </span>
//                   <span className="info-value">2392</span>
//                 </li>
//               </ul>
//             </div>

//             <table className="table table myTable2">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Constituency (No.)</th>
//                   <th>Phone Number</th>
//                   <th>MLA Hostel</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.name}</td>
//                     <td>{item.constituency}</td>
//                     <td>{item.phone}</td>
//                     <td>{item.hostel}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default EstateOfficer;
