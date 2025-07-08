import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useNotification } from "../../Hooks/useNotification";

// Nossos componentes reutilizáveis e do MUI
import { Haeder } from "../../Components/header";
import { BarbersList } from "../../Components/barbersList";
import { CutsList } from "../../Components/CutsList";
import TabsBasic from "../../Components/tabs";
import { Form } from "../../Components/form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Interfaces
import type { Barber } from "../../Interface/Barber"; // Supondo que tenha 'id'
import type { Cut } from "../../Interface/Cut"; // Supondo que tenha 'id'
import { useAuth } from "../../Hooks/useAuth";
import { NotificationAlert } from "../../Components/notificationAlert";

export function Reservations() {
  const daysOfWeekEnum = [
    "DOMINGO",
    "SEGUNDA",
    "TERCA",
    "QUARTA",
    "QUINTA",
    "SEXTA",
    "SABADO",
  ];

  // --- ESTADOS ---
  const { user } = useAuth();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [cuts, setCuts] = useState<Cut[]>([]);
  const [reservationData, setReservationData] = useState<any>({
    codCliente: null, // Comece com null
    codCorte: null,
    codBarbeiro: null,
    codFluxo: 1,
    diaDaSemana: null,
    horarioCorte: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { notification, showNotification, hideNotification } =
    useNotification();
  const navigate = useNavigate();

  const availableTimeSlots = Array.from(new Array(24 * 2))
    .map(
      (_, index) =>
        `${String(Math.floor(index / 2)).padStart(2, "0")}:${
          index % 2 === 0 ? "00" : "30"
        }`
    )
    .filter((slot) => slot >= "09:00" && slot <= "18:00");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [barbersRes, cutsRes] = await Promise.all([
          api.get("/barbeiro/listar"),
          api.get("/cortes/listar"),
        ]);
        setBarbers(barbersRes.data);
        setCuts(cutsRes.data);
      } catch (error) {
        showNotification(
          "danger",
          "Erro",
          "Não foi possível carregar os dados da página."
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user?.userId) {
      setReservationData((prev: any) => ({ ...prev, codCliente: user.userId }));
    }
  }, [user]);

  const handleDateChange = (dateString: string | null) => {
    if (!dateString) return;
    const selectedDate = new Date(dateString + "T00:00:00");
    const dayIndex = selectedDate.getDay();
    const dayNameForEnum = daysOfWeekEnum[dayIndex];
    setReservationData((prev: any) => ({
      ...prev,
      date: dateString,
      diaDaSemana: dayNameForEnum,
    }));
  };

  const handleReservationSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const dataSelecionada = reservationData.date;
      const horarioSelecionado = reservationData.horarioCorte;

      const dataHoraAgendamento = new Date(
        `${dataSelecionada}T${horarioSelecionado}:00`
      );
      // Objeto que será enviado para a API
      const payload = {
        codCliente: reservationData.codCliente,
        codCorte: reservationData.codCorte,
        codBarbeiro: reservationData.codBarbeiro,
        codFluxo: reservationData.codFluxo,
        diaDaSemana: reservationData.diaDaSemana,
        horarioCorte: dataHoraAgendamento.toISOString(),
      };

      const response = await api.post("/reservas/solicitar", payload);

      if (response) {
        showNotification("success", "Sucesso!", "Sua reserva foi agendada.");
        setTimeout(() => navigate("/dashboard/reservas"), 1500);
      }
    } catch (error: any) {

  if (error.response) {
    const status = error.response.status; 
    const message = error.response.data?.userMessage || "Ocorreu um erro desconhecido.";

    if (status === 409) { 
      showNotification("warning", "Horário Indisponível", message);
    } 
    else if (status === 400) { 
        showNotification("warning", "Dados Inválidos", message);
    }
    else { 
      showNotification("danger", "Erro no Servidor", "Não foi possível completar a operação. Tente novamente mais tarde.");
    }

  } else {
    // Erro de rede ou o servidor não pôde ser alcançado
    showNotification("danger", "Erro de Conexão", "Não foi possível conectar ao servidor.");
  }

}  finally {
      setIsLoading(false);
    }
  };

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

  return (
    <>
      <NotificationAlert
        open={notification.open}
        onClose={hideNotification}
        severity={notification.severity}
        title={notification.title}
        message={notification.message}
      />
      <div className="hidden md:block">
        <Haeder navLinks={[]} onLogout={handleLogout} />
      </div>

      <main className="container mx-auto p-4 md:p-8 bg-white dark:bg-gray-900">
        {/* PASSO 1: SELEÇÃO DE BARBEIROS */}
        <BarbersList
          title="Passo 1: Escolha seu Profissional"
          subTitle="Clique no barbeiro de sua preferência."
          barbers={barbers}
          onSelect={(id) =>
            setReservationData((prev: any) => ({ ...prev, codBarbeiro: id }))
          }
          selectedId={reservationData.codBarbeiro}
        />

        {/* PASSO 2: SELEÇÃO DE CORTES */}
        <CutsList
          title="Passo 2: Escolha o Serviço"
          subTitle="Agora, clique no serviço desejado."
          cuts={cuts}
          onSelect={(id) =>
            setReservationData((prev: any) => ({ ...prev, codCorte: id }))
          }
          selectedId={reservationData.codCorte}
        />

        {/* PASSO 3: DATA, HORA E CONFIRMAÇÃO */}
        <Box className="flex flex-col items-center justify-center p-4 mt-12">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            className="dark:text-white"
          >
            Passo 3: Escolha a Data e o Horário
          </Typography>
          <Form onSubmit={handleReservationSubmit}>
            <Box className="flex flex-col gap-4">
              <TextField
                label="Data do Agendamento"
                type="date"
                value={reservationData.date}
                onChange={(e) => handleDateChange(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: new Date().toISOString().split("T")[0] }}
              />
              <Autocomplete
                options={availableTimeSlots}
                value={reservationData.horarioCorte}
                onChange={(_, value) =>
                  setReservationData((prev: any) => ({
                    ...prev,
                    horarioCorte: value,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Selecione um Horário" />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Confirmar Agendamento"
                )}
              </Button>
            </Box>
          </Form>
        </Box>
      </main>

      <TabsBasic />
    </>
  );
}
