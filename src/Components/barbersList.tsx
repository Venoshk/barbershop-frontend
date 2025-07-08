// ... imports ...
import type { Barber } from "../Interface/Barber";
import { BarberCard } from "./barberCard";

// 1. Adicione as novas props
interface BarbersListProps {
  title?: string;
  subTitle?: string;
  barbers: Barber[];
  onSelect: (id:any) => void; // Função para lidar com a seleção
  selectedId: number | null; // O ID do item atualmente selecionado
}

export function BarbersList({ title, subTitle, barbers, onSelect, selectedId }: BarbersListProps) {
  // ...
  return (
    <section /* ... */>
       <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          {subTitle}
        </p>
      </div>
      {/* ... título e subtítulo ... */}
      <div className="container mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {barbers.map((barber) => (
          <BarberCard
            key={barber.id} 
            barber={barber}
            onClick={() => onSelect(barber.id)}
            isSelected={barber.id === selectedId}
          />
        ))}
      </div>
    </section>
  );
}