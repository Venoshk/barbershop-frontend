import { useTheme } from "../contexts/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

type HeaderProps = {
  title: string;
  link: string;
};

export function Haeder({ title, link }: HeaderProps): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Link para a Home Page ao clicar no logo */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          BarberShop
        </Link>
        <div className="flex items-center gap-4">
          {/* 4. Usando o componente Link em vez de <a> */}
          <Link
            to={link}
            className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#7747ff] transition-colors"
          >
            {title}
          </Link>

          <IconButton onClick={toggleTheme} sx={{ color: "text.primary" }}>
            {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </nav>
    </header>
  );
}
