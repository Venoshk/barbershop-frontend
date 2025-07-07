import { useState } from "react";
import { useTheme } from "../Contexts/themeContext";
import { Link, NavLink } from "react-router-dom";

// Ícones...
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type NavLinkItem = {
  label: string;
  path: string;
};

// 1. Atualize as props para receber 'onLogout'
type HeaderProps = {
  navLinks: NavLinkItem[];
  onLogout: () => void; // A função de logout não retorna nada
};

// Remova a prop 'onChange' que não será mais usada
export function Haeder({ navLinks, onLogout }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const mobileLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `text-lg font-semibold transition-colors hover:text-[#7747ff] ${
      isActive ? "text-[#7747ff]" : "text-gray-700 dark:text-gray-200"
    }`;

  return (
    <header className="bg-transparent backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          BarberShop
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.label === "Sair" ? (
              <button
                key={link.label}
                onClick={onLogout}
                className="text-sm font-semibold transition-colors hover:text-[#7747ff] text-gray-600 dark:text-gray-300"
              >
                {link.label}
              </button>
            ) : (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) => `text-sm font-semibold transition-colors hover:text-[#7747ff] ${isActive ? 'text-[#7747ff]' : 'text-gray-600 dark:text-gray-300'}`}
              >
                {link.label}
              </NavLink>
            )
          )}
          <IconButton
            onClick={toggleTheme}
            color={theme === "dark" ? "primary" : "inherit"}
          >
            {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>

        {/* Botão do Menu Hambúrguer */}
        <div className="md:hidden">
          <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <CloseIcon className="dark:text-white" />
            ) : (
              <MenuIcon className="dark:text-white" />
            )}
          </IconButton>
        </div>
      </nav>

      {/* Painel do Menu Mobile */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg`}
      >
        <div className="flex flex-col items-center gap-4 py-8">
          {navLinks.map((link) =>
            // 3. Mesma lógica condicional para o menu mobile
            link.label === "Sair" ? (
              <button
                key={link.label}
                onClick={() => {
                  onLogout(); 
                  setIsMenuOpen(false); // Fecha o menu
                }}
                className={mobileLinkClassName({ isActive: false })}
              >
                {link.label}
              </button>
            ) : (
              <NavLink
                key={link.label}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={mobileLinkClassName}
              >
                {link.label}
              </NavLink>
            )
          )}
          <div className="mt-4">
            <IconButton
              onClick={toggleTheme}
              color={theme === "dark" ? "primary" : "inherit"}
            >
              {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}
