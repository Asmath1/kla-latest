import React, { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import HomeTest from "../Header";
import { BreadcrumbNav, CategoriesNav, SectionTitle } from "../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faFileAlt,
  faMoneyBillWave,
  faCarSide,
  faHospital,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import "./Memberlist.css";

const FacilitytoMembers = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage(); // Get language from context

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const facilities = [
  //   { name: "പെരിയാര്‍ ഫ്ളാറ്റ്", rate: "₹100" },
  //   { name: "ചന്ദ്രഗിരി / നെയ്യാര്‍ ഫ്ളാറ്റ്", rate: "₹200" },
  //   { name: "പമ്പ സ്യൂട്ട്", rate: "₹100" },
  //   { name: "നിള / പമ്പ", rate: "" },
  //   { name: "സിംഗിള്‍ റൂം", rate: "₹25" },
  //   { name: "ഡബിള്‍ റൂം", rate: "₹40" },
  // ];

  const contacts = [
    { name: "എസ്റ്റേറ്റ് ഓഫീസര്‍", phone: "2206" },
    { name: "ഡെപ്യൂട്ടി സെക്രട്ടറി", phone: "2212" },
    { name: "അമിനിറ്റീസ് 'എ' സെക്ഷന്‍", phone: "2204" },
    { name: "അമിനിറ്റീസ് 'ബി' സെക്ഷന്‍", phone: "2211" },
    { name: "അമിനിറ്റീസ് 'സി' സെക്ഷന്‍", phone: "2254" },
    { name: "അമിനിറ്റീസ് 'ഡി' സെക്ഷന്‍", phone: "2268" },
    { name: "അമിനിറ്റീസ് 'ഇ' സെക്ഷന്‍", phone: "2207" },
    { name: "അമിനിറ്റീസ് 'എഫ്' സെക്ഷന്‍", phone: "2278" },
    { name: "ഡോക്ടര്‍ (അലോപ്പതി)", phone: "2216" },
    { name: "ഡോക്ടര്‍ (ഹോമിയോ)", phone: "2352" },
    { name: "ഡോക്ടര്‍ (ആയൂര്‍വേദം)", phone: "2227" },
    { name: "ഡോക്ടര്‍ (ഡെന്‍റല്‍)", phone: "2293" },
    { name: "ലാബ്", phone: "2309" },
    { name: "ഹെല്‍ത്ത് ക്ലിനിക്", phone: "2215" },
    { name: "അസിസ്റ്റന്റ് മാനേജര്‍", phone: "2261" },
    { name: "എന്‍ക്വയറി കൗണ്ടര്‍", phone: "2260" },
    { name: "കോഫി ഹൗസ്", phone: "2264" },
    { name: "കാന്‍റീന്‍ (വെജിറ്റേറിയന്‍)", phone: "2265" },
    { name: "കാന്‍റീന്‍ (നോണ്‍ വെജിറ്റേറിയന്‍)", phone: "2266" },
    { name: "റെയില്‍വേ കൗണ്ടര്‍", phone: "2392" },
  ];

  // Content based on language
  const content = {
    malayalam: {
      pageTitle: "നിയമസഭാ സാമാജികര്‍ക്ക് അനുവദനീയമായിട്ടുള്ള സൗകര്യങ്ങള്‍",
      downloadForms: "Download Forms",
      actsRules: "Acts & Rules",
      hostelPhones: "നിയമസഭാ ഹോസ്റ്റല്‍ — ഫോണ്‍ നമ്പരുകള്‍",
      department: "വിഭാഗം / ഓഫീസ്",
      phoneNumber: "ഫോണ്‍ നമ്പര്‍",
    },
    english: {
      pageTitle: "Facilities to Members of Legislature",
      downloadForms: "Download Forms",
      actsRules: "Acts & Rules",
      hostelPhones: "Legislature Hostel — Phone Numbers",
      department: "Department / Office",
      phoneNumber: "Phone Number",
    },
  };

  const currentContent = content[language];

  // Shortened list for two-column demo
  const facilitySections = [
    {
      title: "1. താമസസൗകര്യം (Accommodation)",
      items: [
        {
          text: "നിയമസഭാംഗങ്ങള്‍ക്ക് നിയമസഭാ ഹോസ്റ്റലില്‍ ചട്ടപ്രകാരമുള്ള വാടക നല്‍കി താമസിക്കാവുന്നതാണ്. നിലവിലുള്ള പ്രതിമാസ വാടകനിരക്ക് താഴെപ്പറയും പ്രകാരമാണ്:",
        },
        {
          label: "പെരിയാര്‍ ഫ്ളാറ്റ്",
          value: "₹ 100",
        },
        {
          label: "ചന്ദ്രഗിരി / നെയ്യാര്‍ ഫ്ളാറ്റ്",
          value: "₹ 200",
        },
        {
          label: "പമ്പ സ്യൂട്ട്",
          value: "₹ 100",
        },
        {
          label: "നിള / പമ്പ",
          value: "—",
        },
        {
          label: "സിംഗിള്‍ റൂം",
          value: "₹ 25",
        },
        {
          label: "ഡബിള്‍ റൂം",
          value: "₹ 40",
        },
        {
          text: "ടൂറിസം ഗസ്റ്റ് ഹൗസ് / റസ്റ്റ്ഹൗസ് / ബംഗ്ലാവുകള്‍ എന്നിവയില്‍ അംഗങ്ങള്‍ക്ക് സര്‍ക്കാര്‍ നിശ്ചയിച്ച സാധാരണ കുറഞ്ഞ നിരക്കില്‍ താമസ സൗകര്യം ലഭ്യമാവുന്നതാണ്.",
        },
      ],
      // note: "ടൂറിസം ഗസ്റ്റ് ഹൗസ് / റസ്റ്റ്ഹൗസ് / ബംഗ്ലാവുകള്‍ എന്നിവയില്‍ അംഗങ്ങള്‍ക്ക് സര്‍ക്കാര്‍ നിശ്ചയിച്ച സാധാരണ കുറഞ്ഞ നിരക്കില്‍ താമസ സൗകര്യം ലഭ്യമാവുന്നതാണ്.",
    },
    {
      title: "2. തിരിച്ചറിയല്‍ കാര്‍ഡ് (ID Card)",
      items: [
        {
          text: "എല്ലാ നിയമസഭാ സമാജികര്‍ക്കും ഫോട്ടോ പതിച്ച് ലാമിനേറ്റ് ചെയ്ത തിരിച്ചറിയല്‍ കാര്‍ഡുകള്‍ നല്‍കുന്നു.",
        },
        {
          text: "തീയ്യാതെ പോയാല്‍ ആ വിവരം സെക്രട്ടറിയേറ്റിന് അറിയിക്കേണ്ടതാണ്. അംഗം രാജിവയ്ക്കുകയോ അംഗത്വം അവസാനിപ്പിക്കുകയോ ചെയ്താല്‍ കാര്‍ഡ് തള്ളിപ്പോകേണ്ടതാണ്.",
        },
      ],
    },
    {
      title: "3. ശമ്പളവും ബത്തകളും (Salary & Allowances)",
      items: [
        {
          text: "1951ലെ ശമ്പളവും ബത്തകളും നല്‍കല്‍ നിയമത്തിലും അതിന്റെ ചട്ടങ്ങളിലും നിയമസഭാംഗങ്ങളുടെ ശമ്പളവും ബത്തകളും മറ്റ് സൗകര്യങ്ങളും സംബന്ധിച്ച വിശദാംശം അടങ്ങിയിട്ടുണ്ട്.ഇപ്പോള്‍ നിയമസഭാംഗങ്ങള്‍ക്ക്  താഴെപ്പറയുന്ന നിരക്കില്‍ ശമ്പളവും ബത്തകളും വാങ്ങാവുന്നതാണ്:",
        },
        { label: "പ്രതിമാസ സ്ഥിരബത്ത", value: "₹ 2,000" },
        { label: "നിയമസഭാ കർമ്മ ചെലവ് അലവൻസ്", value: "₹ 25,000" },
        { label: "ടെലിഫോൺ ബത്ത (പ്രതിമാസം)", value: "₹ 11,000" },
        { label: "ഇൻഫർമേഷൻ അലവൻസ്", value: "₹ 4,000" },
        { label: "സമ്പ്ച്വറി അലവൻസ്", value: "₹ 8,000" },
      ],
    },
    {
      title: "4. യാത്രാബത്തയും ദിനബത്തയും (Travel & Daily Allowance)",
      items: [
        {
          text: "ഉൾപ്രദേശ യാത്ര – റോഡ്: ₹10 / കി.മി; പ്രതിമാസം കുറഞ്ഞത് ₹20,000; സമ്മേളന ദിനം: ₹1,000",
        },
        {
          text: "പ്രദേശത്തിന് പുറത്തുള്ള യാത്ര – റെയിൽ: First/Second AC + ₹0.25 / km; റോഡ്: ₹6 / km; ദിനബത്ത്: ₹1,200",
        },
      ],
    },
    {
      title: "5. യാത്രാസൗകര്യങ്ങള്‍ (Travel Facilities)",
      items: [
        {
          text: "KSRTC ബസ്സുകളിൽ അംഗങ്ങൾക്ക് ID കാർഡുപയോഗിച്ച് സൗജന്യ യാത്ര.",
        },
        {
          text: "ഓരോ അംഗത്തിനും ഒരു വാർഷിക റെയിൽ കൂപ്പൺ: ₹4,00,000 (അംഗം + ഭാര്യ/ഭർത്താവ് + 1 അക്കം) ഏതു ക്ലാസ്സിലും ഇന്ത്യയിൽ.",
        },
        {
          text: "സ്വകാര്യ വാഹന യാത്രയ്ക്ക് ഫ്യുവൽ കൂപ്പൺ ആയി ഉപയോഗിക്കാം.",
        },
        {
          text: " സമ്മേളന സമയത്ത് ഹോസ്റ്റൽ മുതൽ നിയമസഭ मंडപഴേക്കും വാഹന സൗകര്യം ലഭ്യമാക്കുന്നു.",
        },
      ],
    },
    {
      title: "6. ടെലിഫോൺ സൗകര്യം (Telephone Facility)",
      items: [
        {
          text: "ഓരോ അംഗത്തിന്റെയും ഹോസ്റ്റലിലും ഫ്ലാറ്റിലും ടെലിഫോൺ ഉണ്ട്; ₹3,000 വരെ കോളുകൾ സൗജന്യം.",
        },
        {
          text: "അംഗത്വം അവസാനിച്ച ശേഷം 15 ദിവസത്തേക്ക് അംഗത്തിന്റെ വാസസ്ഥലത്ത് ഫോണ്‍ സ്ഥാപിക്കുന്നു; സ്ഥാപനം & വാടക അംഗം ആദ്യം നൽകണം, പിന്നീട് BSNL രസീത് നൽകിയാണ് തിരിച്ചടക്കം.",
        },
      ],
    },
    {
      title: "7. ഫാക്സ് (Fax)",
      items: [
        {
          text: "അസിസ്റ്റന്റ് മാനേജരുടെ കാബിനിൽ ഫാക്‌സ് മെഷീൻ: ഫോണ്‍: 0471-2512606",
        },
        {
          text: "കേരളത്തിനകത്ത്: ₹3 / പേജ്; പുറം: ₹5 / പേജ്",
        },
      ],
    },
    {
      title: "8. കമ്പ്യൂട്ടർ സൗകര്യം (Computer Facilities)",
      items: [
        {
          text: "ഓരോ അംഗ ഫ്ലാറ്റിലും കമ്പ്യൂട്ടർ + സ്കാനർ + പ്രിന്റർ + UPS.",
        },
        {
          text: "നിലവിലുള്ള സെക്രറ്ററിയേറ്റിൽ നിന്നും ഫുള്‍ ഇന്റർനെറ്റ്.",
        },
        {
          text: "അംഗത്തിന്റെ മൊബൈൽ ഫോണിൽ വായ്‌ഫൈ സൗകര്യം.",
        },
        {
          text: "ഓഫീഷ്യൽ ഇ-മെയിൽ വിലാസം, MS Word സോഫ്റ്റ്വെയർ മുതലായവ ലഭ്യമാണ്.",
        },
      ],
    },
    {
      title: "9. അസിസ്റ്റന്റ് സേവനം (Assistant Service)",
      items: [
        {
          text: "ഓരോ അംഗത്തിനും 1 സർക്കാരിന്റെ ഉദ്യോഗസ്ഥൻ + 2 കൂടുതൽ സ്റ്റാഫ് നിയമിക്കാം.",
        },
        {
          text: "ഓരോ സ്റ്റാഫിനും പ്രതിമാസം ₹20,000 സ്റ്റാഫ് അലവൻസ്.",
        },
      ],
    },
    {
      title: "10. ലെറ്റർഹെഡ് (Letterhead)",
      items: [
        {
          text: "ഓരോ വർഷവും മലയാളത്തിലും ഇംഗ്ലീഷിലുമായ ലെറ്റർഹെഡുകൾ അച്ചടിച്ച് നൽകുന്നു.",
        },
      ],
    },
    {
      title: "11. കത്തുകളുടെ വിതരണം (Mail / Letters Distribution)",
      items: [
        {
          text: "അംഗങ്ങളിലേക്കുള്ള കത്തുകൾ, പോസ്റ്റൽ ഉരുപ്പടികൾ ഹോസ്റ്റൽ പ്രവേശന കവാടത്തിലെ പ്രത്യേക സെക്ഷനിൽ സൂക്ഷിക്കുന്നു.",
        },
      ],
    },
    {
      title: "12. ചികിത്സാ സൗകര്യങ്ങള്‍ (Medical Facilities)",
      items: [
        {
          text: "ഹോസ്റ്റലില്‍ 24 മണിക്കൂര്‍ പ്രവർത്തനക്ഷമമായ അലോപ്പതി ക്ലിനിക് + ആയുർവേദം, ഹോമിയോ, ഡെൻൽ ക്ലിനികുകൾ.",
        },
        {
          text: "സമ്മേളന ദിവസങ്ങളിൽ: നിയമസഭ മന്ദപത്തിലെ മുറි #530 (ഫോൺ 2043) മെഡിക്കൽ സഹായം ലഭ്യം.",
        },
        {
          text: "ലാബ് പരിശോധനകൾ 7:30 മുതല്‍ 4:30 വരെ; അംഗം ചെലവ് വഹിക്കും.",
        },
        {
          text: "1994 മുകളിൽ: അംഗങ്ങള്‍ക്കും കുടുംബങ്ങള്‍ക്കും സർക്കാർ / സ്വകാര്യ ആശുപത്രികളിൽ ചികിത്സ; മരുന്ന് വില തിരിച്ചടവ് ചട്ടപ്രകാരമായി.",
        },
      ],
    },
    {
      title: "13. ഹെല്‍ത്ത് ക്ലബ്ബ് (Health Club)",
      items: [
        {
          text: "നിലവിലുള്ള അംഗങ്ങൾക്ക് ഹൈഡ്ര്റെൻഫ്ലാറ്റ് ലെവലിലെ ഹോസ്റ്റലിൽ ഹെൽത്ത് ക്ലബ്.",
        },
      ],
    },
    {
      title: "14. ഇന്‍ഷ്വറൻസ് (Insurance Scheme)",
      items: [
        {
          text: "അംഗത്വകാലത്ത് അപകടങ്ങള്‍ക്ക് ₹5,00,000 വരെ ആക്‌സിഡന്റ് ഇന്‍ഷ്വറൻസ്; ചെലവ് സർക്കാർ വഹിക്കുന്നത്.",
        },
      ],
    },
    {
      title: "15. ഭവന വായ്പ (Housing Loan)",
      items: [
        {
          text: "അംഗങ്ങള്‍ക്ക് ₹20,00,000 വരെ ഭവന വായ്പ; 150 + 30 മാസങ്ങൾ തിരിച്ചടക്ക; പലിശ 4%.",
        },
      ],
    },
    {
      title: "16. വാഹന വായ്പ (Vehicle Loan)",
      items: [
        {
          text: "സ്പീക്കർ, ഡെപ്യൂട്ടി സ്പീക്കർ, പ്രതിപക്ഷ നേതാവ്, ചീഫ് വിപ്പ് ഒഴികെയുള്ള അംഗങ്ങൾക്ക് ₹10,00,000 വരെ പലിശരഹിത വാഹന വായ്പ.",
        },
      ],
    },
    {
      title: "17. പുസ്തകങ്ങള്‍ മടക്കിനൽകല്‍ (Books Reimbursement)",
      items: [
        {
          text: "എല്ലാ അംഗങ്ങള്‍ക്കും ഒരു സാമ്പത്തിക വര്‍ഷത്തില്‍ പുസ്തകങ്ങള്‍ വാങ്ങിയ വകയില്‍ ചെലവായ തുകയില്‍ പരമാവധി പതിനയ്യായിരം രൂപ നിബന്ധനകള്‍ക്ക് വിധേയമായി മടക്കിനല്‍കുന്നു.",
        },
      ],
    },
    {
      title: "18. റെയിൽവേ കൗണ്ടർ (Railway Counter)",
      items: [
        {
          text: "ഹോസ്റ്റലിന്റെ ന്യൂ ബ്ലോക്ക് 6-ാം മുറിയിൽ റെയിൽ ടിക്കറ്റ് / റിസർവേഷൻ സേവനം; ഫോൺ: 2392",
        },
      ],
    },
    {
      title: "19. നോട്ടീസ് ഓഫീസ് (Notice Office)",
      items: [
        {
          text: "സമ്മേളന ദിവസങ്ങളില്‍ Room #508, Legislative Building; ഫോൺ: 2031; കോപ്പികൾ, ബില്ലുകൾ തുടങ്ങിയവ ലഭിക്കും.",
        },
      ],
    },
    {
      title: "20. ടൈപ്പിംഗ് (Typing)",
      items: [
        {
          text: "സമ്മേളന ദിവസങ്ങളിൽ നിയമസഭാ മന്ദപത്തിൽ ആദ്യ നിലയിലെ നോറ്റീസ് ഓഫീസിൽ ടൈപ്പിംഗ് സൗകര്യം.",
        },
      ],
    },
    {
      title: "21. വിശ്രമ സൗകര്യങ്ങള്‍ (Rest Facilities)",
      items: [
        {
          text: "സമ്മേളന കാലത്ത് Room #526 & Members Lounge; വനിതാ അംഗത്തിന് Room #501.",
        },
      ],
    },
    {
      title: "22. കാന്‍റീന്‍ (Canteen)",
      items: [
        {
          text: "Vegetarian & Non-vegetarian canteens in hostel; plus special canteen in Legislative Building during sessions.",
        },
      ],
    },
    {
      title: "23. റിസപ്ഷന്‍ സെക്ഷൻ (Reception Section)",
      items: [
        {
          text: "Visitor passes etc during sessions; Reception Section issues application; phone: 2028 / 2029.",
        },
      ],
    },
    {
      title: "24. റിസര്‍ച്ച് സെക്ഷന്‍ (Research Section)",
      items: [
        {
          text: "Provides handbooks, “Focus”, “News Digest”, legal/constitutional digests, etc.; phone: 2079.",
        },
      ],
    },
    {
      title: "25. നിയമസഭാ ലൈബ്രറി (Legislature Library)",
      items: [
        {
          text: "Full library in Legislative building; OPAC, digital services; extension counter in hostel; children’s section; legal / constitutional digests and Documentation Kerala, etc.",
        },
      ],
    },
  ];
  const data = [
    {
      title:
        "The Kerala Payment of Pension to Members of Legislature Act, 1976 (Act 46 of 1976)",
      link: "/pdff.pdf",
    },
    {
      title:
        "The Payment of Salaries and Allowances Act, 1951 (Act XIV of 1951)",
      link: "/pdf1.pdf",
    },
    {
      title: "The Payment of Salaries and Allowances (Amendment) Bill 2018",
      link: "/pdfs/salaries-amendment-2018.pdf",
    },
    {
      title: "The Payment of Salaries and Allowances (Amendment) Bill, 2017",
      link: "/pdfs/salaries-amendment-2017.pdf",
    },
    {
      title: "House Building Advance Amendment Rules 2014",
      link: "/pdfs/hba-amendment-2014.pdf",
    },
    {
      title: "House Building Advance Amendment Rules 2013",
      link: "/pdfs/hba-amendment-2013.pdf",
    },
    {
      title: "House Building Advance Rules 2013",
      link: "/pdfs/hba-rules-2013.pdf",
    },
    {
      title: "Advance for the Purchase of Vehicle Rules 2012",
      link: "/pdfs/vehicle-rules-2012.pdf",
    },
    {
      title: "Advance for the Purchase of Vehicle Amendment Rules 2012",
      link: "/pdfs/vehicle-amendment-2012.pdf",
    },
    {
      title:
        "Reimbursement of Amount Incurred for the Purchase of Books Rules 2013",
      link: "/pdfs/books-rules-2013.pdf",
    },
  ];

  const handleLinkClick = (link) => {
    // e.preventDefault();
    // Replace this path with your actual dummy PDF file path
    // const dummyPdf = "/images/pdf1.pdf";
    window.open(link, "", "noopener,noreferrer");
  };

  // const pdfLinks = [
  //   {
  //     title: "The Payment of Salaries and Allowances (Amendment) Bill, 2017",
  //     link: "/pdfs/salaries-amendment-2017.pdf",
  //   },
  //   {
  //     title: "House Building Advance Amendment Rules 2013",
  //     link: "/pdfs/hba-amendment-2013.pdf",
  //   },
  //   {
  //     title: "Advance for the Purchase of Vehicle Rules 2012",
  //     link: "/pdfs/vehicle-rules-2012.pdf",
  //   },
  //   {
  //     title:
  //       "Reimbursement of Amount Incurred for the Purchase of Books Rules 2013",
  //     link: "/pdfs/books-rules-2013.pdf",
  //   },
  // ];

  // const pensionRates = [
  //   { period: "Below 2 years", amount: "₹8,000" },
  //   { period: "2 years", amount: "₹8,000" },
  //   { period: "3 years", amount: "₹12,000" },
  //   { period: "4 years", amount: "₹16,000" },
  //   { period: "5 years", amount: "₹20,000" },
  // ];

  return (
    <div className="wrapper ovh">
      {/* HEADER */}
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
            { name: "Members", href: "/members" },
            { name: "Facilities", href: "/members/facilities" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30-md represent">
          <div className="container">
            <SectionTitle title="Facility to Members" />
            <h4>{currentContent.pageTitle}</h4>
            <div className="bg-white  rounded shadw-sm">
              {/* ---------- DOWNLOAD FORMS ---------- */}
              <h5 className="mb-3">{currentContent.downloadForms}</h5>

              {/* <div className="row">
                {data.map((item, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h6 className="card-title text-primary">{item}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
              <div className="d-flex flex-wrap gap-3 mb-4 w-auto ">
                {[
                  { title: "Medical Reimbursement Form", pdf: "/Form for Medical Reimbursement..pdf" },
                  { title: "Pension Form", pdf: "/Form for Pension.pdf" },
                  { title: "Property Statement of Public Servants (ABC Form)", pdf: "/ABC_Form.pdf" },
                ].map((item, idx) => (
                  <a
                    href={item.pdf}
                    key={idx}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rtix p-1 d-flex align-items-center justify-content-center w-auto text-decoration-none"
                  >
                    <span className="mb-0 text-muted me-2">
                      <strong>{item.title}</strong>
                    </span>
                    <div className="imgx">
                      <img src="images/file2.svg" width={16} alt="PDF" />
                    </div>
                  </a>
                ))}
              </div>

              {/* ---------- TWO COLUMN LAYOUT ---------- */}

              <div className="containe mt-4">
                <div className="acts-rules card shadow-sm">
                  <div className="card-header text-white">
                    <h5 className="list-grp-item-head mb-0">{currentContent.actsRules}</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {data.map((item, index) => (
                        <li key={index} className="list-group-item">
                          <a href={item.link} onClick={handleLinkClick}>
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row g-3 mt40">
                {language === "malayalam" && facilitySections.map((section, idx) => (
                  <div className="col-md-6 d-flex" key={idx}>
                    <div className="px-3 rounded w-100 d-flex flex-column">
                      <h6 className="facil-sec fw-bold mb-2 ">
                        {section.title}
                      </h6>
                      <ul className="facility-sec ms-3 flex-grow-1 mb-0">
                        {section.items.map((item, id2) => (
                          <li key={id2} className="mb-1">
                            {item.label && <strong>{item.label}:</strong>}{" "}
                            {item.value || item.text}
                          </li>
                        ))}
                      </ul>
                      {section.note && (
                        <div
                          className="mt-2 text-muted"
                          style={{ fontSize: "0.9em" }}
                        >
                          {section.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* ---------- HOSTEL CONTACT TABLE ---------- */}
              <div className="mt-4">
                <h5 className="fw-bold text-center mb-3">
                  {currentContent.hostelPhones}
                </h5>
                <div className="table-responsive">
                  <table className="table table-bordered align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: "70%" }}>{currentContent.department}</th>
                        <th style={{ width: "30%", textAlign: "center" }}>
                          {currentContent.phoneNumber}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="hct-table-body">
                      {contacts.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td style={{ textAlign: "center" }}>{item.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ---------------------------------------------------------------- */}
              {language === "english" && (
              <div className="fm-container container mt-4 mb-5">
                <h3 className="mb-3 fac-data text-center text-transform-capitalize">
                  <FontAwesomeIcon icon={faGift} className="me-2 fac-icon" />
                  Kerala legislature - facilities to members
                </h3>

                <div className="mb-4">
                  <p>
                    <FontAwesomeIcon icon={faPhone} className="me-2 fac-icon" />
                    Telephone Allowance : 11,000.00
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faCarSide}
                      className="me-2 fac-icon"
                    />
                    Minimum Monthly T.A.: 20,000.00
                  </p>
                  <p>
                    <strong>Total : 31,000.00</strong>
                  </p>
                </div>

                <div className="mb-4">
                  <h5>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="me-2 fac-icon"
                    />
                    Relevant Rules & Acts
                  </h5>
                  <p>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      The Payment of Salaries and Allowances (Amendment) Bill,
                      2017
                    </a>
                    <br />
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      House Building Advance Amendment Rules 2013
                    </a>
                    <br />
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Advance for the Purchase of Vehicle Rules 2012
                    </a>
                    <br />
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Reimbursement of Amount Incurred for the Purchase of Books
                      Rules 2013
                    </a>
                  </p>
                </div>

                <div className="mb-4">
                  <h5>
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      className="me-2 fac-icon"
                    />
                    Allowances
                  </h5>
                  <ul>
                    <li>Monthly fixed allowance : 2000.00</li>
                    <li>Constituency Allowance : 25000.00</li>
                    <li>Telephone Allowance : 11000.00</li>
                    <li>Information Allowance : 4000.00</li>
                    <li>Sumptuary Allowance : 8000.00</li>
                  </ul>
                  <p>
                    <strong>Total : 50,000.00</strong>
                  </p>
                  <p>Minimum Monthly T.A. : 20,000.00</p>
                  <p>
                    <strong>Grand Total : 70,000.00</strong>
                  </p>
                </div>

                <div className="mb-4">
                  <h5>
                    <FontAwesomeIcon
                      icon={faCarSide}
                      className="me-2 fac-icon"
                    />
                    RATES OF TA AND DA
                  </h5>
                  <ul>
                    <li>
                      Road Mileage (inside and outside Kerala): Rs.10.00 per km
                    </li>
                    <li>
                      Rail (Outside Kerala): First/Second Class AC fare + 25
                      paise/km as incidental expenses
                    </li>
                    <li>
                      Free Transit coupons of aggregate value of ₹4.00 lakhs
                      (including Rail Travel Coupon per year)
                    </li>
                    <li>D.A. inside the State: ₹1000 per day</li>
                    <li>D.A. outside the State: ₹1200 per day</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5>
                    <FontAwesomeIcon
                      icon={faHospital}
                      className="me-2 fac-icon"
                    />
                    OTHER AMENITIES
                  </h5>
                  <ul>
                    <li>
                      Reimbursement of installation fee and periodical rentals
                      of telephones
                    </li>
                    <li>Medical reimbursement</li>
                    <li>Residential telephone</li>
                    <li>Free travel facility in KSRTC buses/boats</li>
                    <li>Accident insurance up to ₹20 lakh</li>
                    <li>
                      Services of an officer (Under Secretary rank or below) +
                      ₹20,000 staff allowance for two personal staff
                    </li>
                    <li>Interest-free Vehicle Advance up to ₹10 lakh</li>
                    <li>
                      House Building Advance up to ₹20 lakh at reduced interest
                    </li>
                    <li>Books Allowance ₹15,000 per financial year</li>
                  </ul>
                </div>

                <div>
                  <table className="table myTable2 table-striped pension-table">
                    <thead>
                      <tr>
                        <th>Period</th>
                        <th>Rate of Pension (Per month)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Below two years</td>
                        <td>₹8,000.00</td>
                      </tr>
                      <tr>
                        <td>Two years</td>
                        <td>₹8,000.00</td>
                      </tr>
                      <tr>
                        <td>Three years</td>
                        <td>₹12,000.00</td>
                      </tr>
                      <tr>
                        <td>Four years</td>
                        <td>₹16,000.00</td>
                      </tr>
                      <tr>
                        <td>Five years</td>
                        <td>₹20,000.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* <div>
                  <h5>
                    <FontAwesomeIcon icon={faCoins} className="me-2 fac-icon" />
                    RATE OF PENSION
                  </h5>
                  <table className="table table-bordered m30">
                    <thead>
                      <tr>
                        <th>Period</th>
                        <th>Rate of Pension (Per month)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Below two years</td>
                        <td>₹8,000.00</td>
                      </tr>
                      <tr>
                        <td>Two years</td>
                        <td>₹8,000.00</td>
                      </tr>
                      <tr>
                        <td>Three years</td>
                        <td>₹12,000.00</td>
                      </tr>
                      <tr>
                        <td>Four years</td>
                        <td>₹16,000.00</td>
                      </tr>
                      <tr>
                        <td>Five years</td>
                        <td>₹20,000.00</td>
                      </tr>
                    </tbody>
                  </table>

                  <p>
                    Provided that where any person has served as a Member as
                    stated in sub-section (1) of section 2 for a period
                    exceeding five years, there shall be paid to him an
                    additional pension of 1000 Rupees per mensum for every year
                    in excess of five Years;
                  </p>
                  <p>
                    Provided further that in calculating the net qualifying
                    period for pension, fraction of half year and above shall be
                    rounded to the next completed Year;
                  </p>
                  <p>
                    Provided also that the Ex-members may be paid an additional
                    pension of `3000/-per mensum on completion of Seventy years
                    of age, 3500/- per mensum on completion of Eighty years of
                    age;
                  </p>
                  <p>
                    Provided also that the maximum pension to which a member is
                    eligible under this act shall not, in the aggregate, exceed
                    50000/- per mensem.
                  </p>
                  <p>
                    The Ex-members are also eligible for Rail Travel Coupon for
                    travel by rail or Fuel Coupon for the purchase of fuel for
                    the travel in private vehicle of an aggregate value of
                    75000/- for a period of 12 calendar months ( w.e.f
                    01.04.2018).
                  </p>
                </div> */}
              </div>
              )}

              {/* ---------- ACCOMMODATION TARIFF TABLE ---------- */}
              {/* <div className=" p-4 rounded shadw-sm mt-5">
                <h5 className="fw-bold mb-3 text-center">
                  Accommodation Tariff Details
                </h5>
                <div className="table-responsive">
                  <table className="table table-bordered align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Room Type / Facility</th>
                        <th style={{ textAlign: "center" }}>Rate (Per Day)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facilities.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.rate || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

/* ----------- REUSABLE SUBCOMPONENT ----------- */
const FacilitySection = ({ title, items = [] }) => (
  <div className=" px-3 rounded w-100 d-flex flex-column">
    <h6 className="fw-bold mb-2 ">{title}</h6>
    <ul className=" ms-3 flex-grow-1 mb-0">
      {items.map((item, idx) => (
        <li key={idx} className="mb-1">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default FacilitytoMembers;

// import React, { useEffect, useState } from "react";
// import HomeTest from "../Header";
// import { BreadcrumbNav, CategoriesNav, SectionTitle } from "../common";
// import "bootstrap/dist/css/bootstrap.min.css";

// const FacilitytoMembers = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [, setShowPdfModal] = useState(false);
//   // const dummyPdf = "/pdfs/sample.pdf";

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   const facilities = [
//     { name: "പെരിയാര്‍ ഫ്ളാറ്റ്", rate: "₹100" },
//     { name: "ചന്ദ്രഗിരി / നെയ്യാര്‍ ഫ്ളാറ്റ്", rate: "₹200" },
//     { name: "പമ്പ സ്യൂട്ട്", rate: "₹100" },
//     { name: "നിള / പമ്പ", rate: "" },
//     { name: "സിംഗിള്‍ റൂം", rate: "₹25" },
//     { name: "ഡബിള്‍ റൂം", rate: "₹40" },
//   ];

//   const contacts = [
//     { name: "എസ്റ്റേറ്റ് ഓഫീസര്‍", phone: "2206" },
//     { name: "ഡെപ്യൂട്ടി സെക്രട്ടറി", phone: "2212" },
//     { name: "അമിനിറ്റീസ് 'എ' സെക്ഷന്‍", phone: "2204" },
//     { name: "അമിനിറ്റീസ് 'ബി' സെക്ഷന്‍", phone: "2211" },
//     { name: "അമിനിറ്റീസ് 'സി' സെക്ഷന്‍", phone: "2254" },
//     { name: "അമിനിറ്റീസ് 'ഡി' സെക്ഷന്‍", phone: "2268" },
//     { name: "അമിനിറ്റീസ് 'ഇ' സെക്ഷന്‍", phone: "2207" },
//     { name: "അമിനിറ്റീസ് 'എഫ്' സെക്ഷന്‍", phone: "2278" },
//     { name: "ഡോക്ടര്‍ (അലോപ്പതി)", phone: "2216" },
//     { name: "ഡോക്ടര്‍ (ഹോമിയോ)", phone: "2352" },
//     { name: "ഡോക്ടര്‍ (ആയൂര്‍വേദം)", phone: "2227" },
//     { name: "ഡോക്ടര്‍ (ഡെന്‍റല്‍)", phone: "2293" },
//     { name: "ലാബ്", phone: "2309" },
//     { name: "ഹെല്‍ത്ത് ക്ലിനിക്", phone: "2215" },
//     { name: "അസിസ്റ്റന്റ് മാനേജര്‍", phone: "2261" },
//     { name: "എന്‍ക്വയറി കൗണ്ടര്‍", phone: "2260" },
//     { name: "കോഫി ഹൗസ്", phone: "2264" },
//     { name: "കാന്‍റീന്‍ (വെജിറ്റേറിയന്‍)", phone: "2265" },
//     { name: "കാന്‍റീന്‍ (നോണ്‍ വെജിറ്റേറിയന്‍)", phone: "2266" },
//     { name: "റെയില്‍വേ കൗണ്ടര്‍", phone: "2392" },
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
//             { name: "Members", href: "/members" },
//             { name: "Facilities", href: "/members/facilities" },
//           ]}
//         />

//         {/* ---------------- PAGE CONTENT ---------------- */}
//         <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
//           <div className="container">
//             <SectionTitle title="Facility to Members" />

//             <div className="page-title mb-4">
//               {/* <h2 className="mb-2">Facilities to Members</h2> */}
//               <h2 className="text-muted">
//                 നിയമസഭാ സാമാജികര്‍ക്ക് അനുവദനീയമായിട്ടുള്ള സൗകര്യങ്ങള്‍
//               </h2>
//             </div>

//             <div className="bg-white p-4 rounded shadow-sm">
//               <div className="container mt-4">
//                 <h5 className="mb-3">Download Forms</h5>

//                 <div className="d-flex flex-wrap gap-3 mb-3">
//                   <a
//                     href="#"
//                     className="rtix p-1 d-flex align-items-center justify-content-center"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setShowPdfModal(true);
//                     }}
//                   >
//                     <span className="mb-0 text-muted me-2">
//                       <strong>Medical Reimbursement Form</strong>
//                     </span>
//                     <div className="imgx">
//                       <img src="images/file2.svg" width={16} alt="PDF" />
//                     </div>
//                   </a>

//                   <a
//                     href="#"
//                     className="rtix p-1 d-flex align-items-center justify-content-center"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setShowPdfModal(true);
//                     }}
//                   >
//                     <span className="mb-0 text-muted me-2">
//                       <strong>Pension Form</strong>
//                     </span>
//                     <div className="imgx">
//                       <img src="images/file2.svg" width={16} alt="PDF" />
//                     </div>
//                   </a>

//                   <a
//                     href="#"
//                     className="rtix p-1 d-flex align-items-center justify-content-center"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setShowPdfModal(true);
//                     }}
//                   >
//                     <span className="mb-0 text-muted me-2">
//                       <strong>
//                         Property Statement of Public Servants (ABC Form)
//                       </strong>
//                     </span>
//                     <div className="imgx">
//                       <img src="images/file2.svg" width={16} alt="PDF" />
//                     </div>
//                   </a>
//                 </div>
//               </div>
//               <FacilitySection
//                 title="1. താമസസൗകര്യം"
//                 items={[
//                   "നിയമസഭാംഗങ്ങള്‍ക്ക് നിയമസഭാ ഹോസ്റ്റലില്‍ ചട്ടപ്രകാരമുള്ള വാടക നല്‍കി താമസിക്കാവുന്നതാണ്. നിലവിലുള്ള പ്രതിമാസ വാടകനിരക്ക് താഴെപ്പറയും പ്രകാരമാണ്:",
//                   <div className="bg-white p-4 rounded mt-4">
//                     <h5 className="fw-bold mb-3">
//                       Accommodation Tariff Details
//                     </h5>
//                     <div className="table-responsive">
//                       <table className="table table-bordered align-middle mb-0">
//                         <thead className="table-light">
//                           <tr>
//                             <th style={{ width: "70%" }}>
//                               Room Type / Facility
//                             </th>
//                             <th style={{ width: "30%", textAlign: "center" }}>
//                               Rate (Per Day)
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {facilities.map((item, idx) => (
//                             <tr key={idx}>
//                               <td>{item.name}</td>
//                               <td style={{ textAlign: "center" }}>
//                                 {item.rate || "—"}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>,
//                   "ടൂറിസം ഡിപ്പാര്‍ട്ടുമെന്‍റിന്റെ കീഴിലുള്ള ഗസ്റ്റ് ഹൗസുകളിലും ടൂറിസ്റ്റ് ബംഗ്ലാവുകളിലും പൊതുമരാമത്ത് വകുപ്പിന്റെ കീഴിലുള്ള റസ്റ്റ് ഹൗസുകളിലും ഇന്‍സ്പെക്ഷന്‍ ബംഗ്ലാവുകളിലും സര്‍ക്കാര്‍ നിശ്ചയിച്ചിട്ടുള്ള കുറഞ്ഞ നിരക്കില്‍ അംഗങ്ങള്‍ക്ക് താമസ സൗകര്യം ലഭിക്കുന്നതാണ്.",
//                 ]}
//               />
//               <FacilitySection
//                 title="2. തിരിച്ചറിയല്‍ കാര്‍ഡ്"
//                 items={[
//                   "എല്ലാ നിയമസഭാ സാമാജികര്‍ക്കും ഫോട്ടോ പതിച്ച് ലാമിനേറ്റ് ചെയ്ത തിരിച്ചറിയല്‍ കാര്‍ഡുകള്‍ നല്‍കുന്നതാണ്. തിരിച്ചറിയല്‍ കാര്‍ഡ് നഷ്ടപ്പെടുന്നപക്ഷം താമസംവിനാ പ്രസ്തുത വിവരം നിയമസഭാ സെക്രട്ടറിയുടെ ശ്രദ്ധയില്‍ കൊണ്ടുവരേണ്ടതാണ്. ഒരംഗം രാജിവയ്ക്കുകയോ നിയമസഭാംഗമല്ലാതായി തീരുകയോ ചെയ്താല്‍ കാര്‍ഡ് നിയമസഭാ സെക്രട്ടേറിയറ്റില്‍ തിരിച്ചേല്‍പ്പിക്കേണ്ടതാണ്.",
//                 ]}
//               />
//               <FacilitySection
//                 title="3.  ശമ്പളവും ബത്തകളും"
//                 items={[
//                   "1951ലെ ശമ്പളവും ബത്തകളും നല്‍കല്‍ നിയമത്തിലും അതിന്റെ ചട്ടങ്ങളിലും നിയമസഭാംഗങ്ങളുടെ ശമ്പളവും ബത്തകളും മറ്റ് സൗകര്യങ്ങളും സംബന്ധിച്ച വിശദാംശം അടങ്ങിയിട്ടുണ്ട്.ഇപ്പോള്‍ നിയമസഭാംഗങ്ങള്‍ക്ക്  താഴെപ്പറയുന്ന നിരക്കില്‍ ശമ്പളവും ബത്തകളും വാങ്ങാവുന്നതാണ്:",
//                 ]}
//               />
//               <FacilitySection
//                 title="4. യാത്രാബത്തയും ദിനബത്തയും"
//                 items={[
//                   "(1)  സംസ്ഥാനത്തിനകത്തെ യാത്ര",
//                   <br />,
//                   "റോഡ് മാര്‍ഗ്ഗമുള്ള യാത്രയ്ക്ക്; കിലോമീറ്ററിന് 10 രൂപ നിരക്കില്‍ യാത്രാബത്ത സംസ്ഥാനത്തിനുള്ളിലെ യാത്രകള്‍ക്ക് ഓരോ അംഗത്തിനും പ്രതിമാസം ഏറ്റവും കുറഞ്ഞത് 20,000  രൂപയ്ക്ക് അര്‍ഹതയുണ്ട് നിയമസഭാ സമ്മേളനദിനങ്ങളിലും നിയമസഭാ സമിതികളുടെ യോഗങ്ങളിലും പങ്കെടുക്കുന്നതിന് .. പ്രതിദിനം 1,000 രൂപ നിരക്കില്‍ ലഭിക്കുന്ന ദിനബത്ത.",
//                   <br />,
//                   "(2) സംസ്ഥാനത്തിന് പുറത്തുളള യാത്ര",
//                   <br />,
//                   "തീവണ്ടിമാര്‍ഗ്ഗമുള്ള യാത്രയ്ക്ക്; ഒന്നാം ക്ലാസ്സ്/രണ്ടാം ക്ലാസ്സ് എ.സി. റെയില്‍വേ ടിക്കറ്റ് നിരക്കും കിലോമീറ്ററിന് 25 പൈസ നിരക്കില്‍ യാത്രാ ചെലവും റോഡുമാര്‍ഗ്ഗമുള്ള യാത്രയ്ക്ക്; കിലോമീറ്ററിന് 6 രൂപ നിരക്കില്‍ യാത്രാബത്ത ദിനബത്ത 1,200 രൂപ",
//                 ]}
//               />
//               <FacilitySection
//                 title="5. യാത്രാസൗകര്യങ്ങള്‍"
//                 items={[
//                   "നിയമസഭാംഗങ്ങള്‍ക്ക് കൈമാറ്റം ചെയ്യാന്‍ പറ്റാത്ത തിരിച്ചറിയല്‍ കാര്‍ഡുപയോഗിച്ച് കേരള സംസ്ഥാന റോഡ് ട്രാന്‍സ്പോര്‍ട്ട് കോര്‍പ്പറേഷന്റെ ബസ്സുകളില്‍ സൗജന്യമായി യാത്ര ചെയ്യാവുന്നതാണ്.",
//                   "ഓരോ നിയമസഭാ സാമാജികനും ഒരു വര്‍ഷത്തേക്ക് 4,00,000 രൂപ മൂല്യമുള്ള റെയില്‍വേ കൂപ്പണ്‍ നല്‍കുന്നതാണ്. റെയില്‍വേ കൂപ്പണ്‍ ഉപയോഗിച്ച് അംഗത്തിനും അംഗത്തിന്റെ ഭാര്യ /ഭര്‍ത്താവിനും ഒരു സഹായിക്കും ഇന്ത്യയൊട്ടാകെ റെയില്‍വേകളില്‍ ഏതു ക്ലാസ്സിലും യാത്ര ചെയ്യാവുന്നതാണ്. ഓരോ അംഗത്തിനും താല്‍പ്പര്യമുള്ളപക്ഷം ഇതേ തുകയ്ക്കുള്ള ഫ്യൂവല്‍ കൂപ്പണ്‍ സ്വകാര്യ വാഹനങ്ങളില്‍ യാത്ര ചെയ്യുന്നതിനായി വാങ്ങാവുന്നതാണ്. സമ്മേളനകാലത്ത് അംഗങ്ങളെ നിയമസഭാ ഹോസ്റ്റലില്‍ നിന്ന് നിയമസഭാ മന്ദിരത്തിലേക്കും തിരികെ നിയമസഭാ ഹോസ്റ്റലിലേക്കും എത്തിക്കുന്നതിനുള്ള വാഹനസൗകര്യം ലഭ്യമാകുന്നതാണ്.",
//                 ]}
//               />
//               <FacilitySection
//                 title="6.  ടെലിഫോണ്‍ സൗകര്യം"
//                 items={[
//                   "നിയമസഭാ ഹോസ്റ്റലിലെ അംഗങ്ങള്‍ക്കുള്ള മുറികളിലും ഫ്ളാറ്റുകളിലും ടെലിഫോണ്‍ സജ്ജീകരിച്ചിട്ടുണ്ട്.  പ്രതിമാസം 3,000 രൂപവരെയുള്ള കോളുകള്‍ സൗജന്യമാണ്. ഓരോ നിയമസഭാംഗത്തിനും കാലാവധി തീരുന്നതുവരെയും പിന്നീട് 15 ദിവസത്തേക്കും അവര്‍ സാധാരണ താമസിക്കുന്ന വസതിയില്‍ ഒരു ടെലിഫോണ്‍ സ്ഥാപിച്ചു കിട്ടുന്നതാണ്.  ടെലിഫോണ്‍ സ്ഥാപിക്കുന്നതിനുള്ള ചെലവും വാടകച്ചെലവും ആരംഭത്തില്‍ അംഗം വഹിക്കേണ്ടതും അപ്രകാരം നല്‍കിയ തുക ബി.എസ്.എന്‍.എല്‍.-ന്റെ രസീത് ഹാജരാക്കുന്ന മുറയ്ക്ക് നിയമസഭാ സെക്രട്ടേറിയറ്റ് തിരികെ നല്‍കുന്നതുമാണ്.",
//                 ]}
//               />
//               <FacilitySection
//                 title="7.  ഫാക്സ് സൗകര്യം"
//                 items={[
//                   "നിയമസഭാ സാമാജികരുടെ ഉപയോഗത്തിനായി നിയമസഭാ ഹോസ്റ്റലിലെ അസിസ്റ്റന്റ് മാനേജരുടെ കാബിനില്‍ 0471-2512606 എന്ന നമ്പരോടു കൂടിയ ഒരു ഫാക്സ് മെഷീന്‍ സ്ഥാപിച്ചിട്ടുണ്ട്. കേരളത്തിനകത്ത് ഫാക്സ് അയയ്ക്കുന്നതിന് ഒരു പേജിന് മൂന്ന് രൂപയും കേരളത്തിന് പുറത്ത് ഫാക്സ് അയയ്ക്കുന്നതിന് ഒരു പേജിന് അഞ്ച് രൂപയും ഈടാക്കുന്നതാണ്.",
//                 ]}
//               />
//               <FacilitySection
//                 title="8.  കമ്പ്യൂട്ടര്‍ സൗകര്യം"
//                 items={[
//                   "നിയമസഭാ ഹോസ്റ്റലിലെ ബഹു. സാമാജികരുടെ മുറികളില്‍ കമ്പ്യൂട്ടര്‍ സംബന്ധമായ താഴെപ്പറയുന്ന സൗകര്യങ്ങള്‍ ലഭ്യമാക്കിയിട്ടുണ്ട്:",
//                   <br />,
//                   "കമ്പ്യൂട്ടര്‍, സ്കാനറോടു കൂടിയ പ്രിന്‍റര്‍, യുപിഎസ്. നിയമസഭാ സെക്രട്ടേറിയറ്റില്‍ നിന്നും അനുവദിച്ചിട്ടുള്ള കമ്പ്യൂട്ടറില്‍ ഫുള്‍ ഇന്‍റര്‍നെറ്റ് സൗകര്യം.ബഹു. സാമാജികരുടെ ഒരു മൊബൈല്‍ ഫോണില്‍ നിയമസഭാ സെക്രട്ടേറിയറ്റില്‍ നിന്നും അനുവദിച്ചിട്ടുള്ള സൗജന്യ വൈഫൈ സൗകര്യം. ഔദ്യോഗിക കാര്യങ്ങള്‍ക്ക് ഉപയോഗിക്കുന്നതിലേക്കായി ബഹു. സാമാജികര്‍ക്ക് ഔദ്യോഗിക ഇ-മെയില്‍ വിലാസം (xxxx@niyamasabha.nic.in) അനുവദിച്ചിട്ടുണ്ട്. ഡോക്യുമെന്റ്സ് തയ്യാറാക്കുന്നതിന് മൈക്രോസോഫ്റ്റ് വേഡ് 2010 സോഫ്റ്റ് വെയര്‍ നിയമസഭാ സെക്രട്ടേറിയറ്റില്‍ നിന്നും അനുവദിച്ചിട്ടുള്ള കമ്പ്യൂട്ടറുകളിലെല്ലാം ലഭ്യമാക്കിയിട്ടുണ്ട്.",
//                 ]}
//               />
//               <FacilitySection
//                 title="9.  അസിസ്റ്റന്‍റിന്റെ സേവനം"
//                 items={[
//                   " നിയമസഭാംഗം എന്ന നിലയിലുള്ള പ്രവര്‍ത്തനങ്ങളെ സഹായിക്കുന്നതിനായി ഓരോ അംഗത്തിനും ഗവണ്‍മെന്റ് സര്‍വ്വീസിലുള്ള ഗവണ്‍മെന്റ് സെക്രട്ടേറിയറ്റിലെ അണ്ടര്‍ സെക്രട്ടറിയുടെ റാങ്കിന് താഴെയുള്ള ഒരു ഉദ്യോഗസ്ഥനെ അസിസ്റ്റന്‍റായി നിയമിക്കാവുന്നതാണ്. സര്‍ക്കാരിന്റെയോ  സര്‍ക്കാരിന്റെ കീഴിലുള്ള ലോക്കല്‍ അതോറിറ്റി, കോര്‍പ്പറേഷന്‍ എന്നിവയിലേയോ ഉദ്യോഗസ്ഥരെ അംഗത്തിന്റെ ഇഷ്ടാനുസരണം തെരഞ്ഞെടുക്കാവുന്നതാണ്. കൂടാതെ ഓരോ അംഗത്തിനും അഡീഷണല്‍ സ്റ്റാഫായി രണ്ടുപേരെ നിയമിക്കാവുന്നതാണ്. പ്രസ്തുത ജീവനക്കാര്‍ക്ക് പ്രതിമാസം 20,000 രൂപ വീതം നിയമസഭാ സെക്രട്ടേറിയറ്റ് നേരിട്ട് നല്‍കുന്നതാണ്..",
//                 ]}
//               />{" "}
//               <FacilitySection
//                 title="10.  ലെറ്റര്‍ഹെഡ്"
//                 items={[
//                   " നിയമസഭാ സാമാജികര്‍ക്ക് വര്‍ഷം തോറും മലയാളത്തിലും ഇംഗ്ലീഷിലുമുള്ള ചെറുതും വലുതുമായ ലെറ്റര്‍ഹെഡുകള്‍ അച്ചടിച്ച് ലഭ്യമാക്കുന്നതാണ്.",
//                 ]}
//               />{" "}
//               <FacilitySection
//                 title="11.  അംഗങ്ങള്‍ക്കുള്ള കത്തുകളുടെ വിതരണം"
//                 items={[
//                   "നിയമസഭാംഗങ്ങള്‍ക്ക് വരുന്ന കത്തുകളും മറ്റ് പോസ്റ്റല്‍ ഉരുപ്പടികളും നിയമസഭാ ഹോസ്റ്റലിന്റെ പ്രവേശന കവാടത്തില്‍ സ്ഥാപിച്ചിട്ടുള്ള പ്രത്യേക അറകളില്‍ സൂക്ഷിക്കുന്നതാണ്.",
//                 ]}
//               />{" "}
//               <FacilitySection
//                 title="12.  ചികിത്സാ സൗകര്യങ്ങള്‍"
//                 items={[
//                   "നിയമസഭാ ഹോസ്റ്റലില്‍ 24 മണിക്കൂറും പ്രവര്‍ത്തനസജ്ജമായിട്ടുള്ള ഒരു അലോപ്പതി ഹെല്‍ത്ത് ക്ലിനിക്കിനു പുറമെ ആയൂര്‍വേദം, ഹോമിയോ, ഡെന്‍റല്‍ എന്നീ വിഭാഗങ്ങളുടെ ക്ലിനിക്കുകളും നിലവിലുണ്ട്.  നിയമസഭാ സമ്മേളനം നടക്കുന്ന അവസരങ്ങളില്‍ വൈകുന്നേരം 4 മണി മുതല്‍ 5 മണിവരെ നിയമസഭാ ഹോസ്റ്റലില്‍ അംഗീകൃത മെഡിക്കല്‍ അറ്റന്‍ഡന്‍റിന്റെ സേവനം അംഗങ്ങള്‍ക്കും അവരുടെ കുടുംബാംഗങ്ങള്‍ക്കും ലഭ്യമാകുന്നതാണ്. സഭ സമ്മേളിക്കുന്ന ദിവസങ്ങളില്‍ നിയമസഭാ മന്ദിരത്തിലെ 530-ാം നമ്പര്‍ മുറിയിലും അംഗങ്ങള്‍ക്ക് വൈദ്യസഹായം ലഭ്യമാണ് (ഫോണ്‍ നമ്പര്‍: 2043). കൂടാതെ എല്ലാ പ്രവൃത്തി ദിവസങ്ങളിലും രാവിലെ 7.30 മുതല്‍ വൈകുന്നേരം 4.30 വരെ ലബോറട്ടറി പരിശോധനയ്ക്കുള്ള സാമ്പിളുകള്‍ ഹെല്‍ത്ത് ക്ലിനിക്കില്‍ സ്വീകരിക്കുന്നതും പരിശോധനയ്ക്കു ശേഷം അവയുടെ റിപ്പോര്‍ട്ട് ലഭ്യമാക്കുന്നതുമാണ്. പ്രസ്തുത ടെസ്റ്റിനുള്ള ചെലവ് അതത് അംഗം വഹിക്കേണ്ടതാണ്. 1994-ലെ കേരള നിയമസഭാംഗങ്ങള്‍ (ചികിത്സാ സൗകര്യങ്ങള്‍) ചട്ടപ്രകാരം നിയമസഭാംഗങ്ങള്‍ക്കും അവരുടെ കുടുംബാംഗങ്ങള്‍ക്കും സംസ്ഥാനത്തെ ഗവണ്‍മെന്റ് ആശുപത്രികളില്‍ സൗജന്യമായും സംസ്ഥാനത്തെ സ്വകാര്യ ആശുപത്രികളില്‍ ഗവണ്‍മെന്റ് ചെലവിലും ചികിത്സയ്ക്ക് അര്‍ഹതയുണ്ട്.  പുറമേ നിന്നും വാങ്ങുന്ന മരുന്നുകളുടെ വില തിരികെ നല്‍കുന്നതാണ്. ചില നിബന്ധനകള്‍ക്ക് വിധേയമായി അംഗങ്ങള്‍ക്ക് സംസ്ഥാനത്തിന് പുറത്തുള്ള ആശുപത്രികളിലെ ചികിത്സയ്ക്കും വിദേശ ചികിത്സയ്ക്കും അര്‍ഹതയുണ്ട്.",
//                 ]}
//               />{" "}
//               <FacilitySection
//                 title="13.  ഹെല്‍ത്ത് ക്ലബ്ബ്"
//                 items={[
//                   "നിയമസഭാ ഹോസ്റ്റലിലെ ന്യൂ ഫ്ളാറ്റ്- ഒന്നിന്റെ താഴത്തെ നിലയില്‍ സ്ഥാപിച്ചിട്ടുള്ള ഹെല്‍ത്ത് ക്ലബ്ബിന്റെ സേവനം അംഗങ്ങള്‍ക്ക് ഉപയോഗപ്പെടുത്താവുന്നതാണ്.",
//                 ]}
//               />
//               <FacilitySection
//                 title="14. ഇന്‍ഷ്വറന്‍സ് പദ്ധതി"
//                 items={[
//                   "ഒരു നിയമസഭാംഗത്തിന് തന്റെ അംഗത്വ കാലാവധിയില്‍ ഉണ്ടായേക്കാവുന്ന അപകടങ്ങള്‍ക്ക് പരമാവധി അഞ്ച് ലക്ഷം രൂപ വരെ ലഭിക്കുന്ന ആക്സിഡന്റ് ഇന്‍ഷ്വറന്‍സ് പദ്ധതിയില്‍ അംഗമാകാവുന്നതാണ്. ഇതിനുള്ള എല്ലാ ചെലവും സര്‍ക്കാര്‍ വഹിക്കുന്നതാണ്.",
//                 ]}
//               />
//               <FacilitySection
//                 title="15. ഭവന വായ്പ"
//                 items={[
//                   "നിയമസഭാംഗങ്ങള്‍ക്ക് ചുവടെ ചേര്‍ക്കുന്ന ആവശ്യങ്ങളിലേക്കായി പരമാവധി 20,00,000 (ഇരുപത് ലക്ഷം) രൂപ വരെ ഭവന വായ്പയായി നിയമസഭാ സെക്രട്ടേറിയറ്റില്‍ നിന്നും അനുവദിക്കുന്നു. വായ്പ അനുവദിക്കുന്ന മാസത്തിന്റെ തൊട്ടടുത്ത മാസം മുതല്‍ 150 മാസ തവണകളായി മുതലും പിന്നീടുള്ള 30 മാസ തവണകളായി ഒരു വര്‍ഷം 4% സാധാരണ നിരക്കില്‍ പലിശയുമായി വായ്പാ തിരിച്ചടവ് നിജപ്പെടുത്തിയിരിക്കുന്നു.",
//                   "• ഗൃഹനിര്‍മ്മാണം",
//                   "• സ്ഥലം വാങ്ങിയുള്ള ഗൃഹനിര്‍മ്മാണം അല്ലെങ്കില്‍ ഫ്ളാറ്റ്/അപ്പാര്‍ട്ട്മെന്റ് വാങ്ങല്‍",
//                   "• ഗൃഹത്തോടുകൂടിയുള്ള സ്ഥലം വാങ്ങല്‍",
//                   "• നിലവിലുള്ള ഗൃഹത്തിന്റെ അറ്റകുറ്റപ്പണികള്‍",
//                   "• നിലവിലുള്ള ഗൃഹനിര്‍മ്മാണം പൂര്‍ത്തിയാക്കല്‍ അല്ലെങ്കില്‍ ഗൃഹം വിസ്തൃതമാക്കല്‍",
//                 ]}
//               />
//               <FacilitySection
//                 title="16. വാഹന വായ്പ"
//                 items={[
//                   "സ്പീക്കര്‍, ഡെപ്യൂട്ടി സ്പീക്കര്‍, പ്രതിപക്ഷ നേതാവ്, ചീഫ് വിപ്പ് എന്നിവര്‍ക്കും മന്ത്രിമാര്‍ ഒഴികെയുള്ള എല്ലാ അംഗങ്ങള്‍ക്കും പത്ത് ലക്ഷം രൂപ വരെ പലിശരഹിത വാഹന വായ്പ അനുവദിക്കുന്നു.",
//                 ]}
//               />
//               <FacilitySection
//                 title="17. പുസ്തകങ്ങള്‍ വാങ്ങിയ തുക മടക്കി നല്‍കല്‍"
//                 items={[
//                   "എല്ലാ അംഗങ്ങള്‍ക്കും ഒരു സാമ്പത്തിക വര്‍ഷത്തില്‍ പുസ്തകങ്ങള്‍ വാങ്ങിയ വകയില്‍ ചെലവായ തുകയില്‍ പരമാവധി പതിനയ്യായിരം രൂപ നിബന്ധനകള്‍ക്ക് വിധേയമായി മടക്കിനല്‍കുന്നു.",
//                 ]}
//               />
//               <FacilitySection
//                 title="18. റെയില്‍വേ കൗണ്ടര്‍"
//                 items={[
//                   "നിയമസഭാംഗങ്ങളുടെ സൗകര്യാര്‍ത്ഥം ട്രെയിന്‍ ടിക്കറ്റ്, റിസര്‍വേഷന്‍ തുടങ്ങിയവയ്ക്കായി നിയമസഭാ ഹോസ്റ്റലിലെ ന്യൂ ബ്ലോക്കിലെ 6-ാം നമ്പര്‍ മുറിയില്‍ പ്രവര്‍ത്തിക്കുന്ന റെയില്‍വേ കൗണ്ടറിന്റെ സേവനം അംഗങ്ങള്‍ക്ക് ഉപയോഗപ്പെടുത്താവുന്നതാണ്. (ഫോണ്‍ നമ്പര്‍: 2392)",
//                 ]}
//               />
//               <FacilitySection
//                 title="19. നോട്ടീസ് ഓഫീസ്"
//                 items={[
//                   "നിയമസഭാ സമ്മേളന ദിവസങ്ങളില്‍ അംഗങ്ങള്‍ക്ക് ആവശ്യമായ വിവിധ ഫോറങ്ങളും ബില്ലുകളുടെ കോപ്പിയും മറ്റും നിയമസഭാ മന്ദിരത്തിന്റെ ഒന്നാം നിലയില്‍ പ്രവര്‍ത്തിക്കുന്ന നോട്ടീസ് ഓഫീസില്‍ നിന്നും (റൂം നമ്പര്‍ 508) ലഭിക്കുന്നതാണ്. (ഫോണ്‍ നമ്പര്‍: 2031)",
//                 ]}
//               />
//               <FacilitySection
//                 title="20. ടൈപ്പിംഗ് ജോലി"
//                 items={[
//                   "സഭ സമ്മേളിക്കുന്ന ദിവസങ്ങളില്‍ അംഗങ്ങള്‍ക്ക് ആവശ്യമായ ടൈപ്പിംഗ് ജോലികള്‍ ചെയ്യുന്നതിന് നിയമസഭാ മന്ദിരത്തിലെ ഒന്നാം നിലയിലുള്ള നോട്ടീസ് ഓഫീസില്‍ സൗകര്യം ഏര്‍പ്പെടുത്തിയിട്ടുണ്ട്.",
//                 ]}
//               />
//               <FacilitySection
//                 title="21. വിശ്രമ സൗകര്യങ്ങള്‍"
//                 items={[
//                   "നിയമസഭാ സമ്മേളന സമയത്ത് അംഗങ്ങള്‍ക്ക് വിശ്രമത്തിനായി നിയമസഭാ മന്ദിരത്തിന്റെ ഒന്നാം നിലയിലുള്ള 526-ാം നമ്പര്‍ മുറിയിലും താഴത്തെ നിലയിലുള്ള മെമ്പേഴ്സ് ലോഞ്ചിലും വേണ്ട സൗകര്യങ്ങള്‍ ഏര്‍പ്പെടുത്തിയിട്ടുണ്ട്.",
//                   "വനിതാ അംഗങ്ങള്‍ക്കുള്ള വിശ്രമമുറി നിയമസഭാ മന്ദിരത്തിലെ ഒന്നാം നിലയിലുള്ള 501-ാം നമ്പര്‍ മുറിയിലാണ് സജ്ജീകരിച്ചിട്ടുള്ളത്.",
//                 ]}
//               />
//               <FacilitySection
//                 title="22. കാന്‍റീന്‍"
//                 items={[
//                   "നിയമസഭാംഗങ്ങളുടെ സൗകര്യാര്‍ത്ഥം നിയമസഭാ ഹോസ്റ്റലില്‍ വെജിറ്റേറിയന്‍ കാന്‍റീന്‍, നോണ്‍ വെജിറ്റേറിയന്‍ കാന്‍റീന്‍, ഇന്ത്യന്‍ കോഫി ഹൗസ് എന്നിവ പ്രവര്‍ത്തിക്കുന്നു.",
//                   "നിയമസഭാമന്ദിരത്തിലുള്ള കോഫി ഹൗസിനൊപ്പം സമ്മേളനകാലത്ത് അംഗങ്ങള്‍ക്ക് പ്രത്യേകം ഒന്നാം നിലയില്‍ ഇന്ത്യന്‍ കോഫി ഹൗസിന്റെ കാന്‍റീന്‍ പ്രവര്‍ത്തിക്കുന്നു.",
//                 ]}
//               />
//               <FacilitySection
//                 title="23. റിസപ്ഷന്‍ സെക്ഷന്‍"
//                 items={[
//                   "നിയമസഭാ സമ്മേളന സമയത്ത് അംഗങ്ങളുടെ അതിഥികളായി എത്തുന്നവര്‍ക്ക് പബ്ലിക് ഗ്യാലറിയിലേക്കും സ്പീക്കറുടെ ഗ്യാലറിയിലേക്കും പാസ്സുകള്‍ മുഖേന പ്രവേശനം അനുവദിക്കുന്നതാണ്. അപേക്ഷാഫാറം റിസപ്ഷന്‍ സെക്ഷനില്‍ നിന്നും ലഭിക്കും; അത് അംഗം സാക്ഷ്യപ്പെടുത്തേണ്ടതാണ്.",
//                   "ഒരു ദിവസം സ്പീക്കറുടെ ഗ്യാലറിയിലേക്ക് ഒരാള്‍ക്കും പബ്ലിക് ഗ്യാലറിയിലേക്ക് രണ്ടുപേര്‍ക്കും പ്രവേശനം അനുവദിക്കുന്നു.",
//                   "സംഘമായി വരുന്ന സന്ദര്‍ശകരെ അംഗം ശിപാര്‍ശ ചെയ്താല്‍ സ്പീക്കറുടെ അനുമതിക്ക് വിധേയമായി കാണാന്‍ അനുവദിക്കുന്നു.",
//                   "അംഗങ്ങള്‍ക്ക് സഹായം ആവശ്യമെങ്കില്‍ റിസപ്ഷന്‍ സെക്ഷനുമായി ബന്ധപ്പെടാവുന്നതാണ്. (ഫോണ്‍ നമ്പര്‍: 2028/2029)",
//                 ]}
//               />
//               <FacilitySection
//                 title="24. റിസര്‍ച്ച് സെക്ഷന്‍"
//                 items={[
//                   "റിസര്‍ച്ച് സെക്ഷനില്‍ നിന്നും ഹാന്‍ഡ് ബുക്ക്, ആനുകാലിക പ്രസിദ്ധീകരണങ്ങളിലെ പ്രധാന ലേഖനങ്ങള്‍ ഉള്‍ക്കൊള്ളുന്ന 'ഫോക്കസ്' എന്ന മാസിക, പ്രാദേശികവും ദേശീയവും അന്തര്‍ദേശീയവുമായ വാര്‍ത്തകളടങ്ങിയ 'ന്യൂസ് ഡൈജസ്റ്റ്' എന്ന മാസിക എന്നിവ പ്രസിദ്ധീകരിച്ചുവരുന്നു. (ഫോണ്‍ നമ്പര്‍: 2079)",
//                 ]}
//               />
//               <FacilitySection
//                 title="25. നിയമസഭാ ലൈബ്രറി"
//                 items={[
//                   "നിയമസഭാ സാമാജികര്‍ക്കായി വിപുലമായ ലൈബ്രറി അഡ്മിനിസ്ട്രേറ്റീവ് ബ്ലോക്കില്‍ പ്രവര്‍ത്തിക്കുന്നു. ലൈബ്രറിയുടെ സുഗമമായ പ്രവര്‍ത്തനങ്ങള്‍ക്കായി ബഹു. സ്പീക്കര്‍ നിയമിച്ച ഏഴംഗ ഉപദേശക സമിതിയുണ്ട്.",
//                   "കമ്പ്യൂട്ടറൈസ്ഡ് സംവിധാനത്തിലൂടെ OPAC (Online Public Access Catalogue) ഉപയോഗിച്ച് പുസ്തക വിവരങ്ങള്‍ പരിശോധിക്കാവുന്നതാണ്.",
//                   "റഫറന്‍സ് ബ്രാഞ്ച് നിയമസഭാ മന്ദിരത്തിലെ 504-ാം നമ്പര്‍ മുറിയിലാണ്. (ഫോണ്‍ നമ്പര്‍: 2259)",
//                   "ലൈബ്രറിയില്‍ നിന്നും പ്രസിദ്ധീകരിക്കുന്ന പ്രസിദ്ധീകരണങ്ങള്‍: കേരള ലെജിസ്ലേച്ചര്‍ ലൈബ്രറി ബുള്ളറ്റിന്‍ (KLLB), ലീഗല്‍ ആന്റ് കോണ്‍സ്റ്റിറ്റ്യൂഷണല്‍ ഡൈജസ്റ്റ്, ഡോക്യുമെന്റേഷന്‍ കേരള, സാമാജികന്‍ തുടങ്ങിയവ.",
//                   "കുട്ടികള്‍ക്കായി നിയമസഭാ മ്യൂസിയത്തില്‍ ചില്‍ഡ്രന്‍സ് ലൈബ്രറിയും ഹോസ്റ്റലില്‍ ലൈബ്രറി എക്സ്റ്റന്‍ഷന്‍ കൗണ്ടറും പ്രവര്‍ത്തിക്കുന്നു.",
//                   "ഡിജിറ്റല്‍ ലൈബ്രറി, ഇന്റര്‍നെറ്റ് ബ്രൗസിംഗ്, ഇ-റീഡിംഗ് സൗകര്യങ്ങളും ലഭ്യമാണ്. (ഫോണ്‍ നമ്പര്‍: 2522)",

//                   <div className="bg-white p-4 rounded shadow-sm mt-4">
//                     <h5 className="fw-bold mb-3">
//                       നിയമസഭാ ഹോസ്റ്റല്‍ — ഫോണ്‍ നമ്പരുകള്‍
//                     </h5>

//                     <div className="table-responsive">
//                       <table className="table table-bordered align-middle mb-0">
//                         <thead className="table-light">
//                           <tr>
//                             <th style={{ width: "70%" }}>വിഭാഗം / ഓഫീസ്</th>
//                             <th style={{ width: "30%", textAlign: "center" }}>
//                               ഫോണ്‍ നമ്പര്‍
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {contacts.map((item, idx) => (
//                             <tr key={idx}>
//                               <td>{item.name}</td>
//                               <td style={{ textAlign: "center" }}>
//                                 {item.phone}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>,
//                 ]}
//               />
//               <div className="bg-white p-4 rounded shadow-sm mt-4">
//                 <h4 className="fw-bold mb-3 text-uppercase text-center">
//                   Kerala Legislature - Facilities to Members
//                 </h4>

//                 {/* Allowances Summary Table */}
//                 <div className="table-responsive mb-4">
//                   <table className="table table-bordered align-middle text-center">
//                     <thead className="table-light">
//                       <tr>
//                         <th>Particulars</th>
//                         <th>Amount (₹)</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Telephone Allowance</td>
//                         <td>11,000.00</td>
//                       </tr>
//                       <tr>
//                         <td>Minimum Monthly T.A.</td>
//                         <td>20,000.00</td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <strong>Total</strong>
//                         </td>
//                         <td>
//                           <strong>31,000.00</strong>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Related Acts / Rules */}
//                 <div className="mb-4">
//                   <h5 className="fw-bold">Relevant Acts & Rules</h5>
//                   <ul>
//                     <li>
//                       The Payment of Salaries and Allowances (Amendment) Bill,
//                       2017
//                     </li>
//                     <li>House Building Advance Amendment Rules 2013</li>
//                     <li>Advance for the Purchase of Vehicle Rules 2012</li>
//                     <li>
//                       Reimbursement of Amount Incurred for the Purchase of Books
//                       Rules 2013
//                     </li>
//                   </ul>
//                 </div>

//                 {/* Monthly Allowances */}
//                 <div className="table-responsive mb-4">
//                   <h5 className="fw-bold">Monthly Allowances</h5>
//                   <table className="table table-bordered align-middle text-center">
//                     <thead className="table-light">
//                       <tr>
//                         <th>Allowance</th>
//                         <th>Amount (₹)</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Monthly Fixed Allowance</td>
//                         <td>2,000.00</td>
//                       </tr>
//                       <tr>
//                         <td>Constituency Allowance</td>
//                         <td>25,000.00</td>
//                       </tr>
//                       <tr>
//                         <td>Telephone Allowance</td>
//                         <td>11,000.00</td>
//                       </tr>
//                       <tr>
//                         <td>Information Allowance</td>
//                         <td>4,000.00</td>
//                       </tr>
//                       <tr>
//                         <td>Sumptuary Allowance</td>
//                         <td>8,000.00</td>
//                       </tr>
//                       <tr className="table-secondary">
//                         <td>
//                           <strong>Total</strong>
//                         </td>
//                         <td>
//                           <strong>50,000.00</strong>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>Minimum Monthly T.A.</td>
//                         <td>20,000.00</td>
//                       </tr>
//                       <tr className="table-success">
//                         <td>
//                           <strong>Grand Total</strong>
//                         </td>
//                         <td>
//                           <strong>70,000.00</strong>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Rates of TA and DA */}
//                 <div className="mb-4">
//                   <h5 className="fw-bold">Rates of T.A. and D.A.</h5>
//                   <ul>
//                     <li>
//                       <strong>Road Mileage:</strong> ₹10.00 per km (inside or
//                       outside the State of Kerala)
//                     </li>
//                     <li>
//                       <strong>Rail (Outside the State):</strong> First / Second
//                       Class A.C. fare + 25 paise per km as incidental expenses.
//                     </li>
//                     <li>
//                       <strong>Free Transit Coupons:</strong> Value of ₹4.00
//                       lakhs per year (for member, spouse & one companion by any
//                       class railway).
//                     </li>
//                     <li>
//                       <strong>D.A. (Inside State):</strong> ₹1000 per day
//                     </li>
//                     <li>
//                       <strong>D.A. (Outside State):</strong> ₹1200 per day
//                     </li>
//                   </ul>
//                 </div>

//                 {/* Other Amenities */}
//                 <div className="mb-4">
//                   <h5 className="fw-bold">Other Amenities</h5>
//                   <ul>
//                     <li>
//                       Reimbursement of installation fee and periodical rentals
//                       of telephones.
//                     </li>
//                     <li>Medical reimbursement.</li>
//                     <li>Residential telephone.</li>
//                     <li>Free travel in K.S.R.T.C. buses/boats.</li>
//                     <li>
//                       Accident insurance up to ₹20 lakhs at Government expense.
//                     </li>
//                     <li>
//                       Staff Allowance: ₹20,000 per month for each of two staff
//                       members.
//                     </li>
//                     <li>Interest-free vehicle advance up to ₹10 lakhs.</li>
//                     <li>
//                       House building advance up to ₹20 lakhs at reduced
//                       interest.
//                     </li>
//                     <li>Book allowance ₹15,000 per financial year.</li>
//                   </ul>
//                 </div>

//                 {/* Rate of Pension */}
//                 <div className="table-responsive">
//                   <h5 className="fw-bold">Rate of Pension</h5>
//                   <table className="table table-bordered align-middle text-center">
//                     <thead className="table-light">
//                       <tr>
//                         <th>Period of Service</th>
//                         <th>Pension (₹ per month)</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Below 2 years</td>
//                         <td>8,000</td>
//                       </tr>
//                       <tr>
//                         <td>2 years in aggregate</td>
//                         <td>8,000</td>
//                       </tr>
//                       <tr>
//                         <td>3 years in aggregate</td>
//                         <td>12,000</td>
//                       </tr>
//                       <tr>
//                         <td>4 years in aggregate</td>
//                         <td>16,000</td>
//                       </tr>
//                       <tr>
//                         <td>5 years in aggregate</td>
//                         <td>20,000</td>
//                       </tr>
//                     </tbody>
//                   </table>

//                   <p className="mt-3">
//                     <strong>Notes:</strong>
//                   </p>
//                   <ul>
//                     <li>
//                       Additional ₹1000 per year for service beyond 5 years (up
//                       to a maximum of ₹50,000).
//                     </li>
//                     <li>
//                       Additional pension of ₹3000/month after 70 years of age,
//                       and ₹3500/month after 80 years of age.
//                     </li>
//                     <li>
//                       Ex-members are also eligible for Rail Travel Coupon or
//                       Fuel Coupon worth ₹75,000 per 12 months (w.e.f.
//                       01.04.2018).
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// // ----------- Reusable Subcomponent -----------
// const FacilitySection = ({ title, items = [] }) => (
//   <div className="mb-4">
//     <h5 className="fw-bold">{title}</h5>
//     <ul className="ms-3">
//       {items.map((item, idx) => (
//         <li key={idx} className="mb-1">
//           {item}
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// export default FacilitytoMembers;
