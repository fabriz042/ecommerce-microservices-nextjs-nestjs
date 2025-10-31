import Image from "next/image";

const BurbuWhatsapp = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=Hola!`}
      aria-label="Contactarse por whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      className="bottom-0 right-0 fixed w-[85px] h-[85px] mb-[2%] mr-[2%]"
    >
      <Image
        src="/icon-whats.webp"
        alt="Botón contacto whatsapp"
        width={120}
        height={120}
        className="w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-110"
      />
    </a>
  );
};

export default BurbuWhatsapp;
