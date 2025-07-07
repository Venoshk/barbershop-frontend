
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Paper, Typography  } from "@mui/material";
import type { Appointment } from "../Interface/Appointment";



export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const date = new Date(appointment.horarioCorte);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Paper
      elevation={3}
      className=" p-6 rounded-lg bg-white dark:bg-gray-800 flex flex-col sm:flex-row sm:items-center gap-4 transition-transform hover:scale-105"
    >
      <div className="text-[#7747ff]">
        <EventAvailableIcon sx={{ fontSize: 48 }} />
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <PersonIcon
            fontSize="small"
            className="text-gray-500 dark:text-gray-900"
          />
          <Typography
            variant="h6"
            className="font-bold dark:text-gray-900 text-gray-500"
          >
            {appointment.nomBarbeiro}
          </Typography>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-6 mt-2">
          <div className="flex items-center gap-2">
            <CalendarMonthIcon
              fontSize="small"
              className="text-gray-500 dark:text-gray-900"
            />
            <Typography
              variant="body1"
              className="text-gray-700 dark:text-gray-900"
            >
              {formattedDate}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <AccessTimeIcon
              fontSize="small"
              className="text-gray-500 dark:text-gray-900"
            />
            <Typography
              variant="body1"
              className="text-gray-700 dark:text-gray-900"
            >
              {formattedTime}
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
}