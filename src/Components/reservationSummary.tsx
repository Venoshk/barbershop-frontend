// src/Components/ReservationSummary.js
import { Box, Typography, Divider } from "@mui/material";

export function ReservationSummary({ barberName, cutName, date, time, onSubmit }: any) {
  const formattedDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "Selecione uma data";

  return (
    <Box className="w-full relative border border-[#7747ff] rounded-lg p-4 my-6">
      <Typography variant="h6" className="font-bold mb-2 dark:text-white">
        Resumo do Agendamento
      </Typography>
      <Divider />
      <div className="flex justify-between items-center">
        <Box className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Profissional:</strong> {barberName || "Não selecionado"}
          </p>
          <p>
            <strong>Serviço:</strong> {cutName || "Não selecionado"}
          </p>
          <p>
            <strong>Data:</strong> {formattedDate}
          </p>
          <p>
            <strong>Horário:</strong> {time || "Não selecionado"}
          </p>
        </Box>
        <button onSubmit={onSubmit} className="bg-[#7747ff] p-2 cursor-pointer text-white rounded-sm font-bold dark:text-gray-900 hover:text-gray-900 transition-colors">
          Confirmar
        </button>
      </div>
    </Box>
  );
}
