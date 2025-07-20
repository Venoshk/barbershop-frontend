import type { Cut } from "../Interface/Cut"; // Importe a interface

interface CutCardProps {
  cut: Cut;
  onClick?: () => void;
  isSelected?: boolean;
  showDetails?: boolean;
}

export function CutCard({
  cut,
  onClick,
  isSelected,
  showDetails = true,
}: CutCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cut.preco);

  const selectionClasses = isSelected
    ? "ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900 ring-[#7747ff]"
    : "shadow-md";

  if (!showDetails) {
    return (
      <div
        onClick={onClick}
        className={`relative rounded-lg overflow-hidden snap-start flex-shrink-0 w-48 h-64 transform hover:scale-105 transition-all duration-300 cursor-pointer ${selectionClasses}`}
      >
        <img
          src={cut.imagem}
          alt={cut.categoria}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#7747ff]/50 to-transparent">
          <h3 className="text-md font-bold text-[#7747ff] truncate">{cut.desc}</h3>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${selectionClasses}`}
    >
      <img
        src={cut.imagem}
        alt={cut.categoria}
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
