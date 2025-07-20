import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../Contexts/authContext";

// Nossos componentes

import TabsBasic from "../../Components/tabs";
import { BarberCard } from "../../Components/barberCard";
import { CutCard } from "../../Components/cutCard";
import { Carousel } from "../../Components/Carousel";
import { CardPerfil } from "../../Components/CardPerfil";

// Componentes do MUI
import { Typography, Box, CircularProgress, Button } from "@mui/material";

// Interfaces
import type { Barber } from "../../Interface/Barber";
import type { Cut } from "../../Interface/Cut";
import { Haeder } from "../../Components/header";

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para ler o estado da navegação
  const { user, logout, isLoading: isAuthLoading } = useAuth();
  
  const [cuts, setCuts] = useState<Cut[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigationLinks = [
    { label: "Agendar", path: "/reservas" },
    { label: "Minhas Reservas", path: "/meus-agendamentos" },
  ];

  // Efeito para definir a mensagem de boas-vindas
  useEffect(() => {
    if (user) {
      const isFirstLogin = location.state?.isFirstLogin;
      const firstName = user.userName ? user.userName.split(' ')[0] : user.userName;

      if (isFirstLogin) {
        setWelcomeMessage(`Bem-vindo(a), ${firstName}!`);
      } else {
        setWelcomeMessage(`Bem-vindo(a) de volta, ${firstName}!`);
      }

      if (location.state) {
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [user, location.state, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cutsRes, barbersRes] = await Promise.all([
          api.get(`/cortes/listar`),
          api.get(`/barbeiro/listar`)
        ]);
        setCuts(cutsRes.data);
        setBarbers(barbersRes.data);
      } catch (err: any) {
        console.error("Erro ao buscar dados do dashboard:", err);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  if (isAuthLoading || isLoadingData) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="hidden md:block">
        <Haeder navLinks={[]}  onLogout={handleLogout}/>
      </div>

      <main className="container mx-auto p-6 pb-24">
        {/* Card de Perfil */}
        {user && (
          <div className="mb-12 flex justify-center">
            <CardPerfil
              imageUrl={''} 
              name={`${welcomeMessage}`}
              bio="Cliente BarberShop"
              warning="Talvez voce tenha um corte hoje"
            />
          </div>
        )}

        {/* Carrossel de Cortes */}
        <section className="mb-12">
          <Typography variant="h5" component="h2" className="font-bold text-gray-900 dark:text-white mb-2">
            Cortes em Destaque
          </Typography>
          <Carousel>
            {cuts.map((cut) => (
              <CutCard key={cut.id} cut={cut} showDetails={false} />
            ))}
          </Carousel>
        </section>

        {/* Carrossel de Barbeiros */}
        <section>
          <Typography variant="h5" component="h2" className="font-bold text-gray-900 dark:text-white mb-2">
            Nossos Barbeiros
          </Typography>
          <Carousel>
            {barbers.map((barber) => (
              <BarberCard key={barber.id} barber={barber} showDetails={false}/>
            ))}
          </Carousel>
        </section>
      </main>

      <div className="md:hidden">
        <TabsBasic />
      </div>
    </div>
  );
}
