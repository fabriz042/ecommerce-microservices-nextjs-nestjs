import Image from "next/image";
const BurbuWhatsapp = () => {
  return (
    <div className="bottom-0 right-0 fixed w-[85px] h-[85px] border-green-500 border-2 mb-[2%] mr-[2%]">
      <Image
        src="/icon-whats.webp"
        alt="image"
        width={120}
        height={120}
        className="w-full h-full object-cover transition-all duration-300 cursor-pointer"
      />
    </div>
  );
};

export default BurbuWhatsapp;
