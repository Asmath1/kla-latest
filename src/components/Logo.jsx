import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DynamicLogo({
  whiteLogoSrc = "/images/logq1.png",
  blackLogoSrc = "/images/logb1.png",
  width = 325,
  className = "",
  href = "/", // new prop
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    setIsHomePage(path === "/" || path === "/home");

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoSrc = isHomePage && !isScrolled ? whiteLogoSrc : blackLogoSrc;

  const imgElement = <img src={logoSrc || "/placeholder.svg"} alt="Logo" width={width} />;

  return href ? <Link to={href} className={className}>{imgElement}</Link> : imgElement;
}



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom

// export default function DynamicLogo({
//   whiteLogoSrc = "/images/logq1.png",
//   blackLogoSrc = "/images/logb1.png",
//   width = 325,
//   className = "",
// }) {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isHomePage, setIsHomePage] = useState(false);

//   useEffect(() => {
//     const path = window.location.pathname;
//     const isHome = path === "/" || path === "/home";
//     setIsHomePage(isHome);

//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const logoSrc = isHomePage && !isScrolled ? whiteLogoSrc : blackLogoSrc;

//   return (
//     <Link to="/" className={className}>
//       {" "}
//       {/* Link to home */}
//       <img src={logoSrc || "/placeholder.svg"} alt="Logo" width={width} />
//     </Link>
//   );
// }