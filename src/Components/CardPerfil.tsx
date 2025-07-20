import React from "react";

// 1. Definimos as props que o componente vai aceitar
type CardPerfilProps = {
  imageUrl?: string; // URL da imagem de perfil
  name: string | undefined;
  bio: string;
  warning?: string; // Cor do banner opcional
};

export function CardPerfil({
  imageUrl,
  name,
  bio,
  warning,
}: CardPerfilProps) {
  return (
    <div className="relative rounded-xl overflow-hidden flex flex-col items-center shadow-lg bg-white dark:bg-black font-Roboto-light min-w-full">
      <div className="h-24 w-full bg-[#7747ff]"></div>
      <div className="top-16 z-10 flex items-center flex-col gap-4 px-5 py-5">
        <div className="-mt-20">
          {imageUrl ? (
            <img src={imageUrl} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              className="bi bi-person-fill text-white dark:text-indigo-300"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
            </svg>
          )}
        </div>

        <div className="flex items-center flex-col">
          <p title={name} className="text-black dark:text-white font-semibold font-Roboto-md">
            {name}
          </p>
          <p title="bio/بیوگرافی" className="text-xs text-gray-500 font-medium">
           {warning}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-[#7747ff] transition-all gradient text-[15px] text-white font-semibold px-3 py-[6px] rounded-full flex items-center gap-1 transform hover:scale-105 transition-all duration-300">
            {bio}
            
          </button>
          
        </div>
      </div>
    </div>
  );
}
