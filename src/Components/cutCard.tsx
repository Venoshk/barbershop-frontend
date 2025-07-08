import type { Cut } from "../Interface/Cut"; // Importe a interface

interface CutCardProps {
  cut: Cut;
  onClick: () => void;
  isSelected: boolean;
}

export function CutCard({ cut, onClick, isSelected }: CutCardProps) {
  // Formata o valor para o padrão brasileiro (R$)
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cut.preco);

  const selectionClasses = isSelected
    ? "ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900 ring-[#7747ff]"
    : "shadow-md";

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${selectionClasses}`}
    >
      <img
        src={cut.imagem}
        alt={cut.desc}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {cut.desc}
        </h3>
        <p className="mt-1 text-md font-semibold text-[#7747ff]">
          {formattedPrice}
        </p>
      </div>
    </div>
  );
}
