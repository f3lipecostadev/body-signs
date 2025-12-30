import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FiPhone } from "react-icons/fi"

export default function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) =>
    location.pathname === path ? "bg-[#6633FF] text-white" : "border-[#6633FF] text-[#6633FF]"

  function toggleMenu() {
    setIsMenuOpen(prev => !prev)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header>
      <nav className="relative flex items-center justify-between mx-[30px] my-5 md:mx-[15px]">

        {/* LOGO - esquerda */}
        <Link to="/" onClick={closeMenu} className="transition-transform hover:scale-105 md:flex-shrink-0">
          <img src="/images/img-logo.png" alt="Logo Body Signs" className="w-[180px] md:w-[150px]" />
        </Link>

        {/* LINKS CENTRAIS - desktop */}
        <div className="hidden md:flex gap-8 flex-1 justify-center mx-10">
          <Link to="/">
            <button className={`px-9 py-3 rounded-full border-2 text-lg font-semibold min-w-[140px] transition-all hover:bg-[#6633FF] hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6633FF33] ${isActive("/")}`}>
              Home
            </button>
          </Link>
          <Link to="/videos">
            <button className={`px-9 py-3 rounded-full border-2 text-lg font-semibold min-w-[140px] transition-all hover:bg-[#6633FF] hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6633FF33] ${isActive("/videos")}`}>
              Corpo em Libras
            </button>
          </Link>
          <Link to="/games">
            <button className={`px-9 py-3 rounded-full border-2 text-lg font-semibold min-w-[140px] transition-all hover:bg-[#6633FF] hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6633FF33] ${isActive("/games")}`}>
              Jogos
            </button>
          </Link>
        </div>

        {/* CONTATO - direita */}
        <div className="hidden md:flex md:flex-shrink-0">
          <Link to="/contact">
            <button className={`px-9 py-3 rounded-full border-2 flex items-center gap-2 text-lg font-semibold min-w-[140px] bg-[#6633FF] text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6633FF33] ${isActive("/contact")}`}>
              Contato
              <FiPhone className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* HAMBURGER - mobile */}
        <div onClick={toggleMenu} className="flex flex-col cursor-pointer p-1 md:hidden z-[1001]">
          <span className="w-6 h-[3px] bg-[#6633FF] my-[3px] rounded transition" />
          <span className="w-6 h-[3px] bg-[#6633FF] my-[3px] rounded transition" />
          <span className="w-6 h-[3px] bg-[#6633FF] my-[3px] rounded transition" />
        </div>

        {/* MENU MOBILE LATERAL */}
        <div className={`fixed top-0 left-0 h-screen w-[70%] sm:w-[80%] bg-white z-[1000] shadow-xl flex flex-col gap-4 px-5 pt-20 transition-transform duration-300 md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {[
            { path: "/", label: "Home" },
            { path: "/videos", label: "Corpo em Libras" },
            { path: "/games", label: "Jogos" },
            { path: "/contact", label: "Contato" }
          ].map(link => (
            <Link key={link.path} to={link.path} onClick={closeMenu} className="border-b border-gray-200 py-3">
              <span className={`text-base font-medium text-[#6633FF] transition-all ${location.pathname === link.path ? "font-bold pl-1" : "hover:text-[#7d3aff]"}`}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* OVERLAY MOBILE */}
        {isMenuOpen && (
          <div onClick={closeMenu} className="fixed inset-0 bg-black/50 z-[999] md:hidden" />
        )}

      </nav>
    </header>
  )
}
