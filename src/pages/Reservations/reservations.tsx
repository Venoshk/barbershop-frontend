import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useNotification } from "../../Hooks/useNotification";


// componentes reutilizáveis e do MUI
import { Haeder } from "../../Components/header";
import { BarbersList } from "../../Components/barbersList";
import { CutsList } from "../../Components/cutsList";
import TabsBasic from "../../Components/tabs";
import { Form } from "../../Components/form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Interfaces
import type { Barber } from "../../Interface/Barber"; 
import type { Cut } from "../../Interface/Cut"; 
import { useAuth } from "../../Contexts/authContext";
import { NotificationAlert } from "../../Components/notificationAlert";
import { ReservationSummary } from "../../Components/reservationSummary";
import { InputAdornment } from "@mui/material";

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
  const { user, isAuthenticated, logout } = useAuth();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [cuts, setCuts] = useState<Cut[]>([]);
  const [selectionMade, setSelectionMade] = useState(false);
  const [reservationData, setReservationData] = useState<any>({
    codCliente: null, 
    codCorte: null,
    codBarbeiro: null,
    codFluxo: 1,
    diaDaSemana: null,
    horarioCorte: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const selectedBarber = barbers.find(
    (b) => b.id === reservationData.codBarbeiro
  );
  const selectedCut = cuts.find((c) => c.id === reservationData.codCorte);
  const { notification, showNotification, hideNotification } = useNotification();
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
    const controller = new AbortController();
    setIsLoading(true);

    const fetchData = async () => {
      if (!isAuthenticated) return;

      try {
        const [barbersRes, cutsRes] = await Promise.all([
          api.get("/barbeiro/listar", { signal: controller.signal }),
          api.get("/cortes/listar", { signal: controller.signal }),
        ]);
        setBarbers(barbersRes.data);
        setCuts(cutsRes.data);
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          console.error("Erro ao buscar agendamentos:");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (user?.userId) {
      setReservationData((prev: any) => ({ ...prev, codCliente: user.userId }));
    }
  }, [user]);

  useEffect(() => {
    if (
      reservationData.codBarbeiro &&
      reservationData.codCorte &&
      reservationData.date &&
      reservationData.horarioCorte
    ) {
      setSelectionMade(true);
    } 
  }, [
    reservationData.codBarbeiro,
    reservationData.codCorte,
    reservationData.date,
    reservationData.horarioCorte
  ]);

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
        setTimeout(() => navigate("/dashboard/agendamentos"), 1500);
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.userMessage || "Ocorreu um erro desconhecido.";

        if (status === 409) {
          showNotification("warning", "Horário Indisponível", message);
        } else if (status === 400) {
          showNotification("warning", "Dados Inválidos", message);
        } else {
          showNotification(
            "danger",
            "Erro no Servidor",
            "Não foi possível completar a operação. Tente novamente mais tarde."
          );
        }
      } else {
        showNotification(
          "danger",
          "Erro de Conexão",
          "Não foi possível conectar ao servidor."
        );
      }
    } finally {
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

      <main className="container  mx-auto p-4 md:p-8 pb-24 bg-white dark:bg-gray-900">
        {!selectionMade ? (
          <>
            <BarbersList
              title="Passo 1: Escolha seu Profissional"
              subTitle="Clique no barbeiro de sua preferência."
              barbers={barbers}
              onSelect={(id) =>
                setReservationData((prev: any) => ({
                  ...prev,
                  codBarbeiro: id,
                }))
              }
              selectedId={reservationData.codBarbeiro}
            />

            <CutsList
              title="Passo 2: Escolha o Serviço"
              subTitle="Agora, clique no serviço desejado."
              cuts={cuts}
              onSelect={(id) =>
                setReservationData((prev: any) => ({ ...prev, codCorte: id }))
              }
              selectedId={reservationData.codCorte}
            />

            <Form onSubmit={handleReservationSubmit}>
              <Box className="flex flex-col gap-4">
                <TextField
                  label="Data do Agendamento"
                  type="date"
                  required
                  value={reservationData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: new Date().toISOString().split("T")[0] }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon />
                      </InputAdornment>
                    ),
                  }}
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
                    <TextField
                      {...params}
                      label="Selecione um Horário"
                      required
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            </Form>
          </>
        ) : (
          // ===============================================
          // ETAPA 2: CONFIRMAÇÃO E DETALHES FINAIS
          // ===============================================
          <Box className="flex flex-col items-center justify-center p-4 mt-8">
            <div className="w-full max-w-lg text-center">
              <Typography
                variant="h4"
                component="h2"
                className="dark:text-white"
              >
                Confirme sua Reserva
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-4 dark:text-gray-300"
              >
                Revise suas escolhas e selecione a data e o horário.
              </Typography>
            </div>

            <ReservationSummary
              barberName={selectedBarber?.nome}
              cutName={selectedCut?.categoria}
              date={reservationData.date}
              time={reservationData.horarioCorte}
              onSubmit={handleReservationSubmit}
            />

            <Button
              variant="text"
              onClick={() => setSelectionMade(false)}
              sx={{ mb: 4 }}
            >
              Editar Seleção de Barbeiro/Corte
            </Button>
          </Box>
        )}
      </main>
      <TabsBasic />
    </>
  );
}
