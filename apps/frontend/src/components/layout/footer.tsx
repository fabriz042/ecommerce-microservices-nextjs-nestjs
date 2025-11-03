import Container from "@/components/Container";

import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bottom-0 bg-gray-700">
      <Container>
        <div className="flex p-6 justify-evenly mb-24 text-gray-100">
          <div className="space-y-4">
            <p className="font-bold">Envios</p>
            <ul className="space-y-2">
              <li>Empaquetado</li>
              <li>Opciones de Envío</li>
              <li>Seguimiento de Envío</li>
              <li>Políticas de Devolución</li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="font-bold">Sobre Nosotros</p>
            <ul className="space-y-2">
              <li>Sobre SpryUp</li>
              <li>Términos y Condiciones</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="font-bold">Contacto</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaWhatsapp size={22} className="mr-2" />
                +51 123456789
              </li>
              <li className="flex items-center">
                <MdOutlineEmail size={22} className="mr-2" />
                info@spryup.com
              </li>
              <li>7:30 AM - 5:30 PM</li>
              <li className="flex items-center space-x-4">
                <FaFacebook size={22} /> <FaFacebook size={22} />
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="bg-gray-800 text-white h-10 flex justify-center items-center">
        <div>SpryUp © 2025</div>
      </div>
    </footer>
  );
}
