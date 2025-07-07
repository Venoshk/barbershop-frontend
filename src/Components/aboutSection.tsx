import React from "react";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChairIcon from "@mui/icons-material/Chair";
import WifiIcon from "@mui/icons-material/Wifi";
import type { AboutSection } from "../Interface/AboutSection";

const FeatureItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <li className="flex items-center gap-3">
    <div className="text-[#7747ff]">{icon}</div>
    <span className="text-gray-700 dark:text-gray-300">{text}</span>
  </li>
);

export function AboutSection({
  title,
  subTitle,
  description,
  imgSrc,
}: AboutSection) {
  return (
    // 1. REMOVEMOS 'hidden lg:block' para que a seção apareça em todos os tamanhos de tela.
    <section className="hidden md:block bg-white dark:bg-black py-16 sm:py-24 flex-row items-center">
      <div className="container mx-auto px-6">
    
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
          {/* Coluna 1: Imagem */}
          <div className="w-full xl:h-full md:h-80 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Coluna 2: Texto e Destaques */}
          <div className="flex flex-col justify-center">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#7747ff]">
              {title}
            </h2>
            <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              {subTitle}
            </h3>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>

            {/* Lista de Destaques */}
            <ul className="mt-8 space-y-4">
              <FeatureItem
                icon={<CheckCircleOutlineIcon />}
                text="Profissionais Altamente Qualificados"
              />
              <FeatureItem
                icon={<ChairIcon />}
                text="Ambiente Climatizado e Confortável"
              />
              <FeatureItem
                icon={<WifiIcon />}
                text="Wi-Fi de Cortesia para Clientes"
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
