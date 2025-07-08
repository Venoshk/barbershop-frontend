export interface Appointment {
  id: number;
  codBarbeiro: number;
  diaDaSemana: string;
  codCliente: string;
  horarioCorte: string; // Ex: "2025-07-15T14:00:00"
  nomBarbeiro: string;
  status: "CONFIRMADO" | "REALIZADO" | "CANCELADO";
}