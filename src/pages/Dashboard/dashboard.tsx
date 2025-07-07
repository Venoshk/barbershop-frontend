import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../Hooks/useAuth';
import TabsBasic from '../../Components/tabs';
import { Haeder } from '../../Components/header';
// import { useAuth } from '../../Hooks/useAuth'; 
export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

    const navigationLinks = [
    { label: "Inicio", path: "/dashboard" },
    { label: "Minhas Reservas", path: "/dashboard/reservas" },
    { label: "Perfil", path: "/perfil" },
    { label: "Sair", path: "/" },
  ];

  const nomePrincipal = user?.sub ? user.sub.split('.')[0] : '';
    const nomeFormatado = nomePrincipal.charAt(0).toUpperCase() + nomePrincipal.slice(1);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
     <div className="hidden md:block">
        <Haeder navLinks={navigationLinks} onLogout={handleLogout}/>
      </div>
      <main className="container mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bem-vindo(a), {nomeFormatado}!
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Este é o seu painel. Em breve, seus agendamentos aparecerão aqui.
          </p>
          <p className="mt-2 text-sm text-gray-500">Seu login é: {user?.sub}</p>
          
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ mt: 4 }}
          >
            Sair (Logout)
          </Button>
        </div>
        <TabsBasic/>
      </main>
    </div>
  );
}