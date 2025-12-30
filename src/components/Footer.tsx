import React from "react"
import { AiOutlineInstagram } from "react-icons/ai"
import { HiOutlineMail } from "react-icons/hi"
import { RiWhatsappLine } from "react-icons/ri"

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-color)] text-white py-10 px-5 text-center">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-center gap-[25px] mb-5">
          <a
            href="https://www.instagram.com/f3lipe_cosst/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <div className="w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-[1.15] hover:opacity-80">
              <AiOutlineInstagram className="w-full h-full text-white" />
            </div>
          </a>

          <a
            href="mailto:felipekaua@acad.ifma.edu.br"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <div className="w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-[1.15] hover:opacity-80">
              <HiOutlineMail className="w-full h-full text-white" />
            </div>
          </a>

          <a
            href="https://wa.me/5598984075894"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <div className="w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-[1.15] hover:opacity-80">
              <RiWhatsappLine className="w-full h-full text-white" />
            </div>
          </a>
        </div>

        <p>© 2025 Body Signs. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
