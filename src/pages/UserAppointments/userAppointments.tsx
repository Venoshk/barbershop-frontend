import { useState, useEffect } from "react";
import { Haeder } from "../../Components/header";
import api from "../../services/api";
import { useAuth } from "../../Hooks/useAuth";

// Ícones do Material-UI para dar um toque visual
import { Typography, Box, Alert } from "@mui/material";
import type { Appointment } from "../../Interface/Appointment";
import { CircularProgress } from "@mui/joy";
import { AppointmentCard } from "../../Components/appointmentCard";
import TabsBasic from "../../Components/tabs";
import { useNavigate } from "react-router-dom";

// Tipagem para os dados do agendamento que vêm do backend

export function UserAppointments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigationLinks = [
    { label: "Inicio", path: "/dashboard" },
    { label: "Minhas Reservas", path: "/dashboard/reservas" },
    { label: "Perfil", path: "/perfil" },
    { label: "Sair", path: "/" },
  ];

  const nomePrincipal = user?.sub ? user.sub.split(".")[0] : "";
  const nomeFormatado = nomePrincipal.charAt(0).toUpperCase() + nomePrincipal.slice(1);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;

      try {
        const response = await api.get(`/reservas/suas/${user.userId}`);
        setAppointments(response.data);
      } catch (err) {
        console.error("Erro ao buscar agendamentos:", err);
        setError(
          "Não foi possível carregar seus agendamentos. Tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box className="flex justify-center items-center h-64">
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" className="mt-4">
          {error}
        </Alert>
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
      <main className="container mx-auto p-6 sm:p-8 ">
        <Typography
          variant="h3"
          component="h1"
          className="font-bold text-gray-900 dark:text-white"
        >
          <strong>Meus Agendamentos</strong>
        </Typography>
        <Typography
          variant="body1"
          className="mt-1 text-gray-600 dark:text-gray-400"
        >
          Aqui está seu histórico dos seus horários <strong className="text-[#7747ff]">{nomeFormatado}</strong>.
        </Typography>

        {renderContent()}

        <TabsBasic />
      </main>
    </div>
  );
}
