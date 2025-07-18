import { useState, useEffect } from "react";
import { Haeder } from "../../Components/header";
import api from "../../services/api";
import { useAuth } from "../../Contexts/authContext";

// Ícones do Material-UI para dar um toque visual
import { Typography, Box } from "@mui/material";
import type { Appointment } from "../../Interface/Appointment";
import { CircularProgress } from "@mui/joy";
import { AppointmentCard } from "../../Components/appointmentCard";
import TabsBasic from "../../Components/tabs";
import { Link } from "react-router-dom";

// Tipagem para os dados do agendamento que vêm do backend

export function UserAppointments() {
  const { isAuthenticated, logout, user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    logout();
  };

  const navigationLinks = [
    { label: "Inicio", path: "/dashboard" },
    { label: "Minhas Reservas", path: "/dashboard/reservas" },
    { label: "Perfil", path: "/perfil" },
    { label: "Sair", path: "/" },
  ];

  const nomePrincipal = user?.sub ? user.sub.split(".")[0] : "";
  const nomeFormatado =
    nomePrincipal.charAt(0).toUpperCase() + nomePrincipal.slice(1);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    const fetchAppointments = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await api.get(`/reservas/minhas-reservas/${user?.userId}`, {
          signal: controller.signal 
        });
        setAppointments(response.data);
      } catch (err:any) {
       if (err.name !== 'CanceledError') {
          console.error("Erro ao buscar agendamentos:");
          
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();

    return () => {
      controller.abort();
    }
  }, [isAuthenticated]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box className="flex justify-center items-center h-64">
          <CircularProgress />
        </Box>
      );
    }

    if (appointments.length === 0) {
      return (
        <Box className="text-center py-16">
          <Typography variant="h5" className="text-gray-700 dark:text-gray-300">
            Nenhum agendamento encontrado.
          </Typography>
          <Typography
            variant="body1"
            className="mt-2 text-gray-500 dark:text-gray-400"
          >
            Que tal agendar seu próximo corte agora mesmo?
          </Typography>
        </Box>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {appointments.map((app) => (
          <AppointmentCard key={app.id} appointment={app} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="hidden md:block">
        <Haeder navLinks={navigationLinks} onLogout={handleLogout} />
      </div>
      <main className="container mx-auto p-6 sm:p-8 md:pb-8 pb-24 ">
        <div className="p-6 rounded-lg bg-white flex flex-col gap-4 shadow-lg ">
          <Typography variant="h4" component="h1">
            <strong>Meus Agendamentos</strong>
          </Typography>
          <Typography
            variant="body1"
            className="mt-1 text-gray-600 dark:text-gray-950 sm:text-[12px]"
          >
            Aqui está seu histórico dos seus horários{" "}
            <strong className="text-[#7747ff]">{nomeFormatado}</strong>.
          </Typography>

          <Link
            className="w-full md:w-4/12 text-amber-50 dark:text-gray-300 bg-gray-950 rounded-md p-2 text-center font-bold"
            to={"/dashboard/agendar"}
          >
            Nova Reserva
          </Link>
        </div>

        {renderContent()}
      </main>
      <TabsBasic />
    </div>
  );
}
