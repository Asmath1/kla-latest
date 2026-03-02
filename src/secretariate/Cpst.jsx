import React, { useState, useEffect } from "react";
import "./Secretariat.css";
import {
  BreadcrumbNav,
  CategoriesNav,
  SectionTitle,
  Tabs,
} from "../components/common";
import HomeTest from "../components/Header";
import { FaChevronDown } from "react-icons/fa"; // ✅ add this icon
import { Fancybox } from "@fancyapps/ui";

export const CPSTHighlights = () => {
  const highlights = [
    {
      title: "Festival on Democracy (06 August 2018)",
      body: "Honourable President of India, Shri. Ram Nath Kovind inaugurated the Festival on Democracy consisting of National Conferences on various topics of national interest on 06 August 2018.",
    },
    {
      title: "National Conference on SC/ST Development (6–7 Aug 2018)",
      body: "The National Conference on the Development of Scheduled Castes and Scheduled Tribes in Independent India was held on 6th and 7th August, 2018 as part of the Festival on Democracy.",
    },
    {
      title: "National Students' Parliament, Kerala – 2019",
      body: "Held at the Legislature Complex from 23rd to 25th February, 2019. Over 2000 youth from all parts of India participated in the event.",
    },
    {
      title: "Constitution Classes in Schools",
      body: "Classes on Constitution of India for High School and Higher Secondary School students are being organized in over 1000 schools in the State of Kerala.",
    },
    {
      title: "Model Legislative Assembly",
      body: "Model Legislative Assembly by School and College students have been held in various districts of the State as part of the Diamond Jubilee Celebrations of the Kerala Legislative Assembly.",
    },
    {
      title: "Constitution Literacy (with KSLMA)",
      body: "Kerala Legislative Assembly and Kerala State Literacy Mission Authority have jointly organised Constitution literacy programmes for neo-literates throughout the State.",
    },
  ];

  const otherSections = [
    {
      heading: "CPST - UNICEF Initiative",
      paragraphs: [
        "With the aim of contributing to the welfare of children, youth, women and the marginalized sections of the society, CPST has been associating with the UNICEF Office for Tamil Nadu and Kerala since the launch of the CPST - UNICEF Joint Initiative on 5th August 2015.",
        "Honourable members of the House have actively participated in seminars and discussions on topics including child rights, rights of women and progress towards sustainable development goals. UNICEF is a partner in the Festival on Democracy and other CPST activities promoting democracy and sustainable development.",
      ],
    },
    {
      heading: "Certificate Course in Parliamentary Practice and Procedure",
      paragraphs: [
        "The Certificate Course in Parliamentary Practice and Procedure conducted by the Centre in distance education mode is an innovative effort to impart knowledge on the role of elected representatives in Parliament and State Legislatures.",
        "The course aims to raise awareness and strengthen democratic institutions by giving stakeholders a practical understanding of legislative roles and responsibilities.",
      ],
    },
    {
      heading: "Parliamentary Internship Programme",
      paragraphs: [
        "The Parliamentary Internship Programme provides law students an opportunity to acquaint themselves with parliamentary democracy, legislative procedures and the activities of the Kerala Legislative Assembly.",
        "The programme imparts skills and perspective to interns; many students from across India have successfully completed internships at the Centre.",
      ],
    },
    {
      heading: "Media Awards",
      paragraphs: [
        "The Kerala Legislative Assembly instituted media awards in print and visual media for three categories of reporting:",
      ],
      list: [
        "'R Sankaranarayanan Thampi Niyamasabha Media Award' — excellence in strengthening the Malayalam language and its culture.",
        "'E K Nayanar Niyamasabha Media Award' — best entry for investigative reporting that influences society.",
        "'G Karthikeyan Niyamasabha Media Award' — best reporting on procedures in the House.",
      ],
    },
    {
      heading: "General Activities",
      list: [
        "Orientation programmes for newly elected Members of the Kerala Legislative Assembly.",
        "Discussions and seminars on current issues for Members of the Legislative Assembly.",
        "Visits by Members of Parliament from other nations to the Kerala Legislative Assembly.",
        "Seminars and discussions for Members and Youth in co-operation with UNICEF.",
        "Training for Government department officials and Central Secretariat staff.",
        "Training Programmes for Officials of the Legislature Secretariat (inside and outside the State).",
        "Attachment Training with the Institute of Management in Government.",
        "Attachment Training with the Bureau of Parliamentary Studies and Training, New Delhi.",
        "Training Programmes for media personnel and watch & ward staff.",
        "Visit and study programmes for college and school students.",
        "Study programmes on the Constitution of India and its relevance to daily life.",
        "Essay writing, quiz and debate competitions for school and college students.",
      ],
    },
  ];

  return (
    <article
      className="cpst-highlights container"
      aria-labelledby="highlights-heading"
    >
      <h3 id="highlights-heading" className="cpst-highlights__title">
        Highlights
      </h3>

      <div className="cpst-highlights__grid">
        {highlights.map((h, idx) => (
          <section key={idx} className="cpst-highlights__card">
            <h3 className="cpst-highlights__card-title">{h.title}</h3>
            <p className="cpst-highlights__card-body">{h.body}</p>
          </section>
        ))}
      </div>

      {otherSections.map((s, i) => (
        <div key={i} className="cpst-highlights__section">
          <h3 className="cpst-highlights__section-heading">{s.heading}</h3>
          {s.paragraphs && s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
          {s.list && (
            <ul className="cpst-highlights__list">
              {s.list.map((li, k) => (
                <li key={k}>{li}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <p className="cpst-highlights__source">
        Source:{" "}
        <a
          href="https://www.niyamasabha.nic.in/index.php/cpst/index/cpst_activities"
          target="_blank"
          rel="noopener noreferrer"
        >
          CPST Activities — Kerala Niyamasabha
        </a>
      </p>
    </article>
  );
};

export const KLAMPSContact = () => {
  return (
    <section className="container KLAMPS-contact-section">
      <h2 className="KLAMPS-section-title mb-4">Contact</h2>

      {/* Address & Basic Details */}
      <div className="row mb-5">
        <div className="col-lg-6 mb-4 border-right-dashed">
          <h5 className="KLAMPS-subtitle">Address</h5>
          <p>
            No.739 - 3rd Floor, Assembly Building, Legislature Complex,
            <br />
            Vikas Bhavan P.O, Thiruvananthapuram - 33, Kerala
          </p>
          <p>
            <strong>Phone:</strong> <br />
            K-LAMPS A Section: 0471 2512585, 0471 2512638 <br />
            K-LAMPS B Section: 0471 2512662
          </p>
          <p>
            <strong>Fax:</strong> 0471 2512375, 2305891 <br />
            <strong>Website:</strong>{" "}
            <a
              href="https://www.niyamasabha.org"
              target="_blank"
              rel="noreferrer"
            >
              www.niyamasabha.org
            </a>{" "}
            <br />
            <strong>E-mail:</strong> klamps-a@niyamasabha.nic.in,
            klamps-b@niyamasabha.nic.in
          </p>
        </div>

        {/* Patron & Officials */}
        <div className="col-lg-6">
          <h5 className="KLAMPS-subtitle">Patron</h5>
          <p>
            Hon’ble Speaker <br />
            Kerala Legislative Assembly <br />
            0471 2513001, 0471 2513002, 0471 2513003
          </p>

          <h5 className="KLAMPS-subtitle mt-4">Head of the Institution</h5>
          <p>
            Shri. A. M. Basheer, Secretary <br />
            Kerala Legislative Assembly <br />
            0471-2305834, 0471 2513006, 0471 2512002, 0471 2513019
          </p>

          <h5 className="KLAMPS-subtitle mt-4">
            Additional Secretary & Executive Director
          </h5>
          <p>
            Smt. Manju Varghese <br />
            0471 2301984, 0471 2512190
          </p>

          <h5 className="KLAMPS-subtitle mt-4">
            Deputy Secretary & Joint Director
          </h5>
          <p>
            Smt. Deepa V. <br />
            0471 2512397
          </p>

          <h5 className="KLAMPS-subtitle mt-4">
            Under Secretary & Deputy Director
          </h5>
          <p>
            Shri. Binu R. <br />
            0471 2512670
          </p>
        </div>
      </div>

      {/* Governing Body Table */}
      <h3 className="KLAMPS-section-subtitle mb-3">Governing Body</h3>
      <div className="table-responsive KLAMPS-table-wrapper">
        <table className="table table-bordered KLAMPS-bill-table">
          <thead>
            <tr>
              <th style={{ width: "70%" }}>Name / Designation</th>
              <th style={{ width: "30%" }}>Position</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hon'ble Speaker, Kerala Legislative Assembly</td>
              <td>Chairman</td>
            </tr>
            <tr>
              <td>Hon'ble Leader of Opposition, Kerala Legislative Assembly</td>
              <td>Member</td>
            </tr>
            <tr>
              <td>Hon'ble Deputy Speaker, Kerala Legislative Assembly</td>
              <td>Member</td>
            </tr>
            <tr>
              <td>Prof. Abid Hussain Thangal, MLA</td>
              <td>Member</td>
            </tr>
            <tr>
              <td>Dean, Faculty of Law, University of Kerala</td>
              <td>Member (Ex-Officio)</td>
            </tr>
            <tr>
              <td>Head of the Department, University of Kerala</td>
              <td>Member (Ex-Officio)</td>
            </tr>
            <tr>
              <td>Dr. N. K. Jayakumar, Former Vice Chancellor, NUALS</td>
              <td>Member</td>
            </tr>
            <tr>
              <td>
                Dr. C. Ramakrishnan Nair, Additional Secretary (Rtd.), Law
                Department, Govt. Secretariat
              </td>
              <td>Member</td>
            </tr>
            <tr>
              <td>Secretary, Kerala Legislative Assembly</td>
              <td>Member Secretary</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Executive Committee Table */}
      <h3 className="KLAMPS-section-subtitle mt-5 mb-3">Executive Committee</h3>
      <div className="table-responsive KLAMPS-table-wrapper">
        <table className="table table-bordered KLAMPS-bill-table">
          <thead>
            <tr>
              <th style={{ width: "70%" }}>Name / Designation</th>
              <th style={{ width: "30%" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Sri. A. M. Basheer, Secretary, Kerala Legislative Assembly
              </td>
              <td>Ex-officio Chairman</td>
            </tr>
            <tr>
              <td>
                Smt. Manju Varghese, Additional Secretary / Executive Director
                K-LAMPS, Kerala Legislative Assembly
              </td>
              <td>Ex-officio Member</td>
            </tr>
            <tr>
              <td>
                Sri. D. D. Godfree, Joint Secretary (Table), Kerala Legislative
                Assembly
              </td>
              <td>Ex-officio Member</td>
            </tr>
            <tr>
              <td>
                Sri. G. P. Unnikrishnan, Joint Secretary / Director (K-LAMPS),
                Kerala Legislative Assembly
              </td>
              <td>Ex-officio Member</td>
            </tr>
            <tr>
              <td>
                Sri. V. G. Riju, Joint Secretary (IT), Kerala Legislative
                Assembly
              </td>
              <td>Ex-officio Member</td>
            </tr>
            <tr>
              <td>
                Smt. Jasmine P. S., Deputy Secretary / Joint Director K-LAMPS
                (Accounts), Kerala Legislative Assembly
              </td>
              <td>Ex-officio Member</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export const KLAMPSActivities = () => {
  const cpstActivities = [
    { no: 1, subject: "Induction training for Assistants of Kerala Legislature Secretariat", date: "03.01.2020 - 07.01.2020", details: "13" },
    { no: 2, subject: "Model Assembly Programme by CPST, Exhibition by Museum Section of Kerala Legislature at NNMHSS, Chelembra, Malappuram", date: "06.01.2020 - 10.01.2020", details: "60" },
    { no: 3, subject: "Niyamasabha Study Visit of Students of Department of Psychology, Kerala University", date: "16.01.2020", details: "36" },
    { no: 4, subject: "Janadhipathya Kalalayam Programme - Inauguration, Model Assembly by CPST, Exhibition by Museum Section at MES Ponnani College, Ponnani", date: "23.01.2020 - 24.01.2020", details: "Hon'ble Speaker, Members, Officials and Students from different Colleges" },
    { no: 5, subject: "Niyamasabha Study Visit of Students of MES Mampad College", date: "30.01.2020", details: "8" },
    { no: 6, subject: "Niyamasabha Study Visit of Students of Govt. Law College, Thiruvananthapuram", date: "06.02.2020", details: "62" },
    { no: 7, subject: "Niyamasabha Study Visit of Students of Hellen Keller Centenary Memorial Model School for the Blind", date: "11.02.2020", details: "62" },
    { no: 8, subject: "Training on ‘Papers Laid on Table’ for Officials of Government Departments", date: "14.02.2020", details: "75" },
    { no: 9, subject: "Training Programme on (GeM) ‘Government e-Market place’ for Officials of Kerala Legislature Secretariat", date: "25.02.2020", details: "32" },
    { no: 10, subject: "Training Programme on Income Tax", date: "26.02.2020", details: "21" },
    { no: 11, subject: "Kerala Youth Assembly 2020 (Webinar) - Covid-19 - Special Session - Inauguration", date: "22.05.2020, 23.05.2020", details: "Hon'ble Speaker, Officials, Teachers and Students from St. Albert's College, Ernakulam" },
    { no: 12, subject: "'Covid - Anubhavavum Karuthalum' - Webinar", date: "30.06.2020", details: "Hon'ble Speaker, Hon'ble Minister for Health, Other Ministers, Hon'ble Deputy Speaker, Members, Officials and Staff of Kerala Legislature." },
    { no: 13, subject: "Webinar on Indian Constitution for the students of Sandeepani School, Thiruvananthapuram", date: "05.10.2020", details: "Officials from Kerala Legislature Secretariat, Teachers and Students from Sandeepani School, Thiruvananthapuram" },
    { no: 14, subject: "Commemoration of Mahakavi Kumaranasan/Media Award Distribution/Book Release", date: "18.01.2021", details: "Hon'ble Speaker, Hon'ble Ministers, Members, Officials" },
    { no: 15, subject: "Training Programme for Amenities Assistants", date: "23.02.2021 - 24.02.2021", details: "70" },
    { no: 16, subject: "Induction Training for Assistants of Kerala Legislature Secretariat", date: "25.02.2021 – 26.02.2021", details: "14" },
    { no: 17, subject: "Attachment Training Programme with IMG for Newly Recruited Assistants of Government Secretariat", date: "01.03.2021 – 02.03.2021", details: "23" },
    { no: 18, subject: "Internship Programme for Law students - Mar Gregorios College of Law, Thiruvananthapuram", date: "24.03.2021 - 07.04.2021", details: "3" },
    { no: 19, subject: "Internship Programme for Law students - Kerala Law Academy Law College, Thiruvananthapuram", date: "26.03.2021 – 09.04.2021", details: "1" },
  ];

  const klampsActivities = [
    { no: 1, subject: "Internship Programme for Law students - Kerala Law Academy Law College, Thiruvananthapuram", date: "07.04.2021 - 20.04.2021", details: "4" },
    { no: 2, subject: "Internship Programme for Law students - Govt. Law College, Thrissur", date: "07.04.2021 - 24.04.2021", details: "2" },
    { no: 3, subject: "Internship Programme for Law students - Mar Gregorios College of Law, Thiruvananthapuram", date: "07.04.2021 - 21.04.2021", details: "1" },
    { no: 4, subject: "Internship Programme for Law students - Mount Zion College, Pathanamthitta", date: "08.04.2021 - 21.04.2021", details: "9" },
    { no: 5, subject: "Internship Programme for Law students - Govt. Law College, Thiruvananthapuram", date: "09.04.2021 - 22.04.2021", details: "6" },
    { no: 6, subject: "Internship Programme for Law students - Mar Gregorios College of Law, Thiruvananthapuram", date: "09.04.2021 - 22.04.2021", details: "1" },
    { no: 7, subject: "Internship Programme for Law students - Kerala Law Academy Law College, Thiruvananthapuram", date: "12.04.2021 - 21.04.2021", details: "3" },
    { no: 8, subject: "Internship Programme for Law students - Kerala Law Academy Law College, Thiruvananthapuram", date: "15.04.2021 - 26.04.2021", details: "4" },
    { no: 9, subject: "Internship Programme for Law students - Kerala Law Academy Law College, Thiruvananthapuram", date: "21.04.2021 - 29.04.2021", details: "3" },
    { no: 10, subject: "Attachment Training Programme with IMG for Newly Recruited Assistants of Government Secretariat", date: "23.04.2021", details: "20" },
    { no: 11, subject: "Training Programme on Protection against Covid-19 for Members of KLA", date: "09.06.2021", details: "Hon'ble Speaker, Hon'ble Deputy Speaker, Hon'ble Minister for Health, Hon'ble Ministers, Hon'ble Members, Officials" },
    { no: 12, subject: "Orientation Programme for Hon'ble Members of 15th KLA", date: "24.06.2021 - 26.06.2021", details: "Hon'ble Speaker, Hon'ble Deputy Speaker, Hon'ble Ministers, Hon'ble Members" },
    { no: 13, subject: "Online Training Programme on Processing Questions in E-Niyamasabha for Assistants of Kerala Legislature Secretariat", date: "07.07.2021 - 08.07.2021", details: "150" },
    { no: 14, subject: "Training Programme for Personal Staff to Hon'ble Ministers", date: "13.07.2021 - 14.07.2021", details: "101" },
    { no: 15, subject: "Training Programme for Personal Assistants to Hon'ble Members", date: "13.07.2021 - 14.07.2021", details: "80" },
    { no: 16, subject: "Training Programme on Income Tax and GST", date: "30.07.2021", details: "22" },
    { no: 17, subject: "Inauguration of Programmes for Azadi Ka Amrut Mahotsav & Training Programme for Members on Utilization of Asset Development Fund", date: "10.08.2021", details: "Hon'ble CM, Hon'ble Speaker, Hon'ble Deputy Speaker, Hon'ble Minister for Finance, Hon'ble Ministers, Hon'ble Members, Officials" },
    { no: 18, subject: "Pookalam as part of Azadi Ka Amrut Mahotsav", date: "13.08.2021", details: "Hon'ble CM, Hon'ble Speaker, Hon'ble Deputy Speaker, Hon'ble Ministers, Hon'ble Members, Officials" },
    { no: 19, subject: "PRIDE - Online Training Programme on 'Tax Deducted at Source'", date: "08.09.2021", details: "Staff of Kerala Legislature Secretariat" },
    { no: 20, subject: "Training on the Working of Subject Committees", date: "30.09.2021", details: "25" },
  ];

  const renderTable = (data) => (
    <div className="table-responsive KLAMPS-table-wrapper">
      <table className="table table-bordered KLAMPS-bill-table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Sl. No.</th>
            <th style={{ width: "45%" }}>Subject</th>
            <th style={{ width: "20%" }}>Date</th>
            <th style={{ width: "25%" }}>Details / No. of Participants</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td>{item.subject}</td>
              <td>{item.date}</td>
              <td>{item.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <section className="container KLAMPS-activities-section">
      <h2 className="KLAMPS-section-title mb-4">
        Activities conducted by CPST (Jan 2020 – Mar 2021)
      </h2>
      {renderTable(cpstActivities)}

      <h2 className="KLAMPS-section-title mb-4">
        K-LAMPS (PS) Activities (Apr 2021 – Sep 2021)
      </h2>
      {renderTable(klampsActivities)}
    </section>
  );
};

export const KLAMPSCertificateCourse = () => {
  return (
    <section className="KLAMPS-certificate-section container">
      <h2 className="KLAMPS-section-title">Introduction</h2>
      <p>
        Indian parliamentary democracy has no match in the world and democratic
        values are part and parcel of the life of the common man in India. A
        democratic parliament will seek to foster a vibrant civil society and to
        work closely with it in finding solutions to problems facing the country
        and in improving the quality and relevance of legislation. Informing
        citizens about the work of Parliament is not just a concern for the
        fourth estate, but a responsibility of Parliaments themselves.
      </p>
      <p>
        The Open and Distance Learning System with its inherent flexibility and
        affordability has emerged as an important mode for providing education
        and awareness to various sections of the society in the present day
        educational scenario. Being the forerunner in many democratic
        innovations in India, the Kerala Legislative Assembly successfully
        conducts a Certificate Course in Parliamentary Practice and Procedure in
        the distance education stream to propagate the idea, principle, virtues,
        philosophy and practice of parliamentary democracy.
      </p>

      <h2 className="KLAMPS-section-title">Nature of the Course</h2>
      <ul>
        <li>
          The Course shall be an awareness and learning programme designed for
          those who have no experience with parliamentary procedure and for
          those who are interested in learning parliamentary practices and
          procedure.
        </li>
        <li>
          It shall be a basic level certificate course on parliamentary practice
          and procedure.
        </li>
        <li>
          It shall be conducted in distance education mode and shall include
          contact classes along with assignments and workshops.
        </li>
        <li>
          The Course shall be managed, regulated, conducted and controlled by
          the CPST which was established as an integral division of the
          Secretariat of the Kerala Legislature.
        </li>
      </ul>

      <h2 className="KLAMPS-section-title">Eligibility for Admission</h2>
      <ul>
        <li>
          Minimum qualification for applying for the Course will be a pass in
          Higher Secondary or equivalent qualification as approved by the
          Universities in Kerala. (Pre-Degree/Plus Two or equivalent).
        </li>
        <li>
          Those who are awaiting results of the qualifying examinations are also
          eligible to apply.
        </li>
        <li>
          Maximum number of seats shall ordinarily be 500 (Five hundred) for an
          academic session or as decided by the Governing Body for the Course.
        </li>
        <li>
          Minimum number of students to commence a batch shall be 10 (Ten).
        </li>
        <li>
          There shall be Admission fee and Tuition fee for admission to the
          Course.
        </li>
        <li>
          Admission will generally be open to all eligible candidates and there
          will be no upper age bar for admission to the course.
        </li>
      </ul>

      <h2 className="KLAMPS-section-title">Registration</h2>
      <p>
        A student shall be considered to have 'Registered' in the Course only if
        he/she remits the Examination fee and submits the Application for
        Examination on time. Registered Students can avail up to four
        consecutive chances for appearing for the Examination, without having to
        re-register. However, he/she will be required to pay exam fee every time
        he/she wishes to appear for exams within this period.
      </p>

      <h2 className="KLAMPS-section-title">Duration of the Course</h2>
      <p>Duration of the Course shall be six months.</p>

      <h2 className="KLAMPS-section-title">Contact Classes</h2>
      <p>
        Personal Contact Programmes (PCPs) shall ordinarily be arranged by the
        CPST to facilitate interaction between the learners and subject experts,
        who give due academic counselling to the learners. Contact class centers
        shall ordinarily be at Thiruvananthapuram, Ernakulam and Kozhikode or as
        decided by the CPST. Days (5-6 in total) of contact classes will be
        notified on the official website as well as via SMS to registered mobile
        numbers of learners.
      </p>

      <h2 className="KLAMPS-section-title">Medium of Instruction</h2>
      <p>Medium of instruction shall be English and Malayalam.</p>

      <h2 className="KLAMPS-section-title">Mode of Instruction</h2>
      <p>
        Unlike regular programmes this Distance Programme is self-paced and
        learner-centred. It will essentially be based on the supply of reading
        materials for home study by the learner.
      </p>

      <h2 className="KLAMPS-section-title">Study Materials</h2>
      <p>
        Printed study materials are supplied to the learners. While these Self
        Learning Materials (SLMs) give the learners the required academic
        guidance, learners are advised to supplement their reading at home by
        thoroughly going through the books suggested for reading. Study
        materials for the Course shall be prepared and circulated by the CPST.
      </p>

      <h2 className="KLAMPS-section-title">Examinations</h2>
      <p>
        Examinations will be conducted at the end of the course and the centre
        of examination shall ordinarily be at Thiruvananthapuram, Ernakulam and
        Kozhikode. Application for examination shall be made in the prescribed
        form along with the prescribed fees. Medium of examination shall be
        English or Malayalam.
      </p>
      <p>
        A minimum of 5 marks out of 10 (50%) is necessary for a pass in the
        internal assessment of each paper. However a total of 40% out of maximum
        90 marks is necessary [ marks obtained for internal assessment (maximum
        10) PLUS marks obtained for written examination (maximum 80)] for a pass
        in each paper. A minimum of 20 marks out of 40 (50%) is necessary for a
        pass in viva voce, which will be considered separately.
      </p>

      <h2 className="KLAMPS-section-title">Certificate</h2>
      <p>
        Certificate shall be issued by and under the name and seal of the Centre
        for Parliamentary Studies and Training.
      </p>
    </section>
  );
};

export const KLAMPSPublications = () => {
  const publications = [
    "K-LAMPS - Handbook on Parliamentary Internship Programme",
    "കെ-ലാംപ്സ് (പി.എസ്) വിഭാഗം - ജേർണലിസം പി ജി ഡിപ്ലോമ വിദ്യാർത്ഥികൾക്കായുള്ള ദ്വിദിന പരിശീലന പരിപാടി സംബന്ധിച്ച്",
    "Handbook on Budget",
    "Commission Report on Salary and Allowances to Members",
    "Brief on CPST",
    "Notes on Procedure in Financial Matters",
    "Budget – Preparation, Implementation and Control",
    "Notes on Orientation Programme for Members",
    "Notes on different topics of Parliamentary Procedures",
    "കേരള നിയമസഭാ ചരിത്രവും പാർലമെന്ററി ജനാധിപത്യവും - തിരഞ്ഞെടുത്ത ചോദ്യോത്തരങ്ങൾ",
  ];

  return (
    <section className="KLAMPS-publications-section container">
      <h3 className="KLAMPS-section-title">
        K-LAMPS Publications & Study Materials
      </h3>
      <ul className="KLAMPS-publications-list">
        {publications.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

const Cpst = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const points = [
    "Promote exchange of ideas between Legislators and experts in various fields, including the fast paced world of technological developments and electronic media, through interactive sessions, seminars, study tours etc leading to enhanced quality of governance.",
    "Provide all stakeholders in a parliamentary democracy the opportunity to understand the importance of the role each of them plays in ensuring development of the nation.",
    "Provide opportunities for study and research in legislative procedures to enhance legislation.",
    "Enhance public participation in law making by imparting the necessary orientation and knowledge.",
    "Ensure optimum benefit to the public by providing training in parliamentary procedures to Government Officials of various departments.",
    "Ensure efficiency of the staff of the Legislature Secretariat through Training Programmes, discussions, seminars etc.",
    "Give the youth and children a practical experience of the parliamentary procedures through organising Student Parliament and Model Assemblies.",
  ];

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
            { name: "K-Lamps", href: "/secretariat/K-Lamps" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="K-Lamps" />

            <Tabs
              tabs={[
                {
                  key: "Profile",
                  label: "Profile",
                  content: (
                    <div>
                      <section
                        className="cpst-mission"
                        aria-labelledby="mission-heading"
                      >
                        <div className="cpst-mission__inner ">
                          <div className="klamp-mission-head">
                            <div
                              className="sfd w={60}
                            "
                            >
                              <h3
                                id="mission-heading"
                                className="cpst-mission__title"
                              >
                                Our Mission
                              </h3>

                              <p className="cpst-mission__lead">
                                To foster democracy by strengthening the
                                institution of Legislature through informed
                                legislators, smart and intelligent officials and
                                encouraging greater engagement between the
                                public and the Legislature.
                              </p>
                            </div>
                            <div className="cpst-mission__profile">
                              <img
                                src="/images/g-karthikeyan.jpg"
                                alt="G. Karthikeyan"
                                className="cpst-mission__profile-img"
                              />
                              <div className="cpst-mission__profile-info">
                                <p className="cpst-mission__name">
                                  G. Karthikeyan
                                </p>
                                <p className="cpst-mission__title-small">
                                  (Former Speaker)
                                </p>
                                <p className="cpst-mission__founder">
                                  Founder, CPST
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="cpst-mission__body">
                            <p>
                              The Centre for Parliamentary Studies and Training,
                              an integral division of the Kerala Legislature
                              Secretariat, is a premier institution providing
                              opportunities for systematic study and training in
                              various disciplines related to parliamentary
                              institutions, processes and procedures. The Centre
                              has embarked upon various programmes of study for
                              imparting professionalism, expertise and
                              orientation to those who work as part of the
                              parliamentary system in addition to providing
                              insight to all stakeholders of parliamentary
                              democracy including school and college students,
                              academicians and general public about the role
                              played by elected representatives in law making
                              and governance in a parliamentary democracy.
                            </p>

                            {/* <div className="cpst-mission__signature">
                              <p className="cpst-mission__name">
                                G. Karthikeyan
                              </p>
                              <p className="cpst-mission__title-small">
                                (Former Speaker)
                              </p>
                              <p className="cpst-mission__founder">
                                Founder, CPST
                              </p>
                            </div> */}
                          </div>
                        </div>
                      </section>
                    </div>
                  ),
                },
                {
                  key: "Aims and Objectives",
                  label: "Aims and Objectives",
                  content: (
                    <div>
                      <section
                        className="cpst-mission-points"
                        aria-labelledby="points-heading"
                      >
                        <div className="cpst-mission__inner container">
                          <h3
                            id="points-heading"
                            className="cpst-mission__subtitle"
                          >
                            Objectives & Activities
                          </h3>

                          <ul className="cpst-mission__list">
                            {points.map((p, i) => (
                              <li key={i} className="cpst-mission__list-item">
                                <span
                                  className="cpst-mission__bullet"
                                  aria-hidden="true"
                                >
                                  •
                                </span>
                                <span className="cpst-mission__item-text">
                                  {p}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    </div>
                  ),
                },
                {
                  key: "Activities",
                  label: "Activities",
                  content: (
                    <div>
                      <CPSTHighlights />
                    </div>
                  ),
                },
                {
                  key: "Contacts",
                  label: "Contacts",
                  content: (
                    <div>
                      <KLAMPSContact />
                    </div>
                  ),
                },
                {
                  key: "Events",
                  label: "Events",
                  content: (
                    <div>
                      <KLAMPSActivities />
                    </div>
                  ),
                },
                {
                  key: "Certificate course",
                  label: "Certificate course",
                  content: (
                    <div>
                      <KLAMPSCertificateCourse />
                    </div>
                  ),
                },
                {
                  key: "Documents",
                  label: "Documents",
                  content: (
                    <div>
                      <KLAMPSPublications />
                    </div>
                  ),
                },
              //  {
              //     key: "Image Gallery",
              //     label: "Image Gallery",
              //     content: (
              //        <main className="SabhaTV main">
              //         <div className="SabhaTV container">
              //           {imagess.map((src, i) => (
              //             <div key={i} className="SabhaTV card">
              //               <div className="SabhaTV card-image">
              //                 <a
              //                   href={src}
              //                   data-fancybox="gallery"
              //                   data-caption={`Caption Image ${i + 1}`}
              //                 >
              //                   <img src={src} alt={`Gallery ${i + 1}`} />
              //                 </a>
              //               </div>
              //             </div>
              //           ))}
              //         </div>
              //       </main>
              //     ),
              //   },
              ]}
              onChange={() => {}}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cpst;
