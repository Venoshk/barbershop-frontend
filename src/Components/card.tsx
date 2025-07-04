import React from "react";

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};
export function Card({ icon, title, description }: CardProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center flex flex-col items-center transition-transform hover:scale-105 duration-300">
      {icon}

      <h4 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h4>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
