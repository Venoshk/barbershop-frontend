export interface Appointment {
  id: number;
  codBarbeiro: number;
  nomBarbeiro: string;
  codCliente: string;
  horarioCorte: string; // Ex: "2025-07-15T14:00:00"
  nomeBarbeiro: string;
  status: "CONFIRMADO" | "REALIZADO" | "CANCELADO";
}