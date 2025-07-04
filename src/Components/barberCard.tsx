
type BarberCardProps = {
  imageUrl: string;
  name: string;
  specialty: string;
};

export function BarberCard({ imageUrl, name, specialty }: BarberCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center flex flex-col items-center transition-transform hover:scale-105 duration-300">
      <img
        src={imageUrl}
        alt={`Foto de ${name}`}
        // Classes para criar a imagem circular
        className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
      />
      <h4 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
        {name}
      </h4>
      <p className="mt-2 text-base text-[#7747ff] font-semibold">
        {specialty}
      </p>
    </div>
  );
}