import { useEffect, useState } from "react";
import Logo from "../logo/Logo";
import NavLinks from "./NavLinks";
import NavButtons from "./NavButtons";
import MobileNav from "./MobileNav";

function Navigation() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [stickyNav, setStickyNav] = useState(true);

  useEffect(function () {
    function stickNav() {
      window.scrollY > -1 ? setStickyNav(true) : setStickyNav(false);
    }

    window.addEventListener("scroll", stickNav);

    return () => window.removeEventListener("scroll", stickNav);
  }, []);



  function handleToggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <>
      <nav
        className={`${
          stickyNav ? "sticky top-0 bg-black" : "relative"
        } z-50 flex items-center justify-between gap-4 px-8  py-3`}
      >
        <Logo />

        <NavLinks styles="3xl:flex hidden gap-6 font-medium text-white" />

        <NavButtons
          onToggleNav={handleToggleNav}
        />
      </nav>

      <MobileNav isNavOpen={isNavOpen} onToggleNav={handleToggleNav} />

    </>
  );
}

export default Navigation;
