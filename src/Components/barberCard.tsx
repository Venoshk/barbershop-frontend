import type { Barber } from "../Interface/Barber"; // Supondo que você tenha esta interface

// 1. Adicione as novas props
interface BarberCardProps {
  barber: Barber;
  onClick: () => void;
  isSelected: boolean;
}

export function BarberCard({ barber, onClick, isSelected }: BarberCardProps) {
  // 2. Lógica para aplicar a classe de seleção
  const selectionClasses = isSelected 
    ? 'ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900 ring-[#7747ff]' 
    : 'shadow-md';

  return (
    <div
      onClick={onClick} // 3. Adiciona o evento de clique
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden text-center transform hover:scale-105 transition-all duration-300 cursor-pointer ${selectionClasses}`}
    >
      <img
        src={barber.imageUrl}
        alt={barber.nome}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{barber.nome}</h3>
        <p className="mt-1 text-sm font-semibold text-[#7747ff]">
          {barber.nome}
        </p>
      </div>
    </div>
  );
}