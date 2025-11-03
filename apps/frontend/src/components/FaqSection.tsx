"use client";
import { useState } from "react";

import Container from "@/components/Container";

import { FaAngleDown } from "react-icons/fa";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqs = [
    {
      question: "¿Cuanto tardan los envios?",
      answer:
        "Los envios tardan entre 3 a 5 días hábiles dependiendo de tu ubicación.",
    },
    {
      question: "¿Cuál es la política de devoluciones?",
      answer:
        "Aceptamos devoluciones hasta 30 días después de la compra en condiciones originales.",
    },
    {
      question: "¿Ofrecen garantía?",
      answer: "Sí, todos nuestros productos cuentan con garantía de 1 año.",
    },
    {
      question: "¿Cuáles son los métodos de pago?",
      answer:
        "Aceptamos tarjetas de crédito, débito, transferencia bancaria y billeteras digitales.",
    },
  ];

  return (
    <Container>
      <div className="w-full flex flex-col items-center pt-10 pb-10 space-y-4">
        <span className="text-2xl font-bold">Preguntas Frecuentes</span>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white w-full max-w-[1100px] rounded-lg p-4 shadow-md"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <h5 className="select-none font-bold p-2">{faq.question}</h5>
              <FaAngleDown
                size={35}
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div
              className={`transition-all duration-300 ml-2 overflow-hidden ${
                openIndex === index ? "max-h-40 opacity-100 mt-2" : "max-h-0"
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FaqSection;
