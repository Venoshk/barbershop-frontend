import type { Barber } from "../Interface/Barber"; // Supondo que você tenha esta interface

// 1. Adicione as novas props
interface BarberCardProps {
  barber: Barber;
  onClick?: () => void;
  isSelected?: boolean;
  showDetails?: boolean;
}

export function BarberCard({
  barber,
  onClick,
  isSelected,
  showDetails = true,
}: BarberCardProps) {
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
          src={barber.imageUrl}
          alt={barber.nome}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#7747ff]/50 to-transparent">
          <p className="text-md font-bold text-[#7747ff] truncate">
            {barber.nome}
          </p>
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
        src={barber.imageUrl}
        alt={barber.nome}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {barber.nome}
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#7747ff]">
          {barber.nome}
        </p>
      </div>
    </div>
  );
}
