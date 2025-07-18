// Em App.js

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Contexts/authContext";
import { ThemeProvider } from "./Contexts/themeContext";
import { ProtectedRoute } from "./Components/protectedRoute";

// Suas páginas
import { Home } from "./pages/Home/home";
import { Login } from "./pages/Login/login";
import { Sing } from "./pages/Sign/sing";
import { Dashboard } from "./pages/Dashboard/dashboard";
import { Reservations } from "./pages/Reservations/reservations";
import { UserAppointments } from "./pages/UserAppointments/userAppointments";
import { AccessDeniedPage } from "./pages/AccessDenied/accessDenied";
// ... outras páginas

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* =================================================== */}
          {/* 1. ROTAS PÚBLICAS - FORA DO PROTECTEDROUTE      */}
          {/* =================================================== */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Sing />} />
          <Route path="/acesso-negado" element={<AccessDeniedPage />} />

          {/* =================================================== */}
          {/* 2. ROTAS PROTEGIDAS - DENTRO DO PROTECTEDROUTE    */}
          {/* =================================================== */}
          <Route element={<ProtectedRoute />}>
            {/* Todas as rotas aqui dentro exigirão login */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/agendamentos" element={<UserAppointments />} />
            <Route path="/dashboard/agendar" element={<Reservations />} />
            
            {/* Você pode aninhar outras verificações aqui, como as de Role */}
            {/* <Route element={<RoleBasedRoute allowedRoles={['ROLE_ADMIN']} />}>
               <Route path="/admin/painel" element={<AdminPanel />} />
            </Route> 
            */}
          </Route>
          
          {/* Rota para páginas não encontradas */}
          <Route path="*" element={<p>Página não encontrada!</p>} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;