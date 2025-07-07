import { Component } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/login";
import { Sing } from "./pages/Sign/sing";
import { Home } from "./pages/Home/home";
import { ThemeProvider } from "./Contexts/themeContext";
import { ProtectedRoute } from "./Components/protectedRoute";
import { Dashboard } from "./pages/Dashboard/dashboard";
import { AccessDeniedPage } from "./pages/AccessDenied/accessDenied";
import { RoleBasedRoute } from "./Components/roleBasedRoute";
import { UserAppointments } from "./pages/UserAppointments/userAppointments";
class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <Routes>
        {/* --- Rotas Públicas --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Sing />} />
        <Route path="/acesso-negado" element={<AccessDeniedPage />} />


        {/* --- Rotas Protegidas por Autenticação --- */}
        <Route element={<ProtectedRoute />}>
          
          {/* Rota genérica para usuários logados */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* --- ROTAS PROTEGIDAS POR ROLE --- */}
          
          {/* Grupo de rotas que SÓ o ROLE_USER pode acessar */}
          <Route element={<RoleBasedRoute allowedRoles={['ROLE_USER']} />}>
            <Route path="/dashboard/reservas" element={<UserAppointments />} />
          </Route>

          {/* Grupo de rotas que SÓ o ROLE_BARBER pode acessar */}
    

          {/* Exemplo de uma rota que tanto BARBER quanto ADMIN podem acessar */}
          {/* <Route element={<RoleBasedRoute allowedRoles={['ROLE_BARBER', 'ROLE_ADMIN']} />}>
            <Route path="/gerenciar-horarios" element={<ManageHoursPage />} />
          </Route> */}

        </Route>
        
        <Route path="*" element={<p>Página não encontrada!</p>} />
      </Routes>
      </ThemeProvider>
    );
  }
}

export default App;
