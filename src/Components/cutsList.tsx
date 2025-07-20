import { CutCard } from "./cutCard";
import type { Cut } from "../Interface/Cut";

interface CutsListProps {
  title: string;
  subTitle: string;
  cuts: Cut[];
  onSelect?: (id: any) => void;
  selectedId?: number | null;
  asCarousel?: boolean;
}

export function CutsList({
  title,
  subTitle,
  cuts,
  onSelect,
  selectedId,
  asCarousel = false,
}: CutsListProps) {

  const containerClasses = asCarousel
    ? "flex overflow-x-auto gap-6 snap-x snap-mandatory py-4 no-scrollbar container mx-auto px-4"
    : "container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4";

  return (
    <section className="dark:bg-gray-900 pt-12 pb-16">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          {subTitle}
        </p>
      </div>

      <div className={containerClasses}>
        {cuts.map((cut) => (
          <CutCard
            key={cut.id}
            cut={cut}
            onClick={() => onSelect?.(cut.id)}
            isSelected={cut.id === selectedId}
          />
        ))}
      </div>
    </section>
  );
}
