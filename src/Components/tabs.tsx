import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Importe os ícones que você vai usar
import Home from "@mui/icons-material/Home";
import ListAlt from "@mui/icons-material/ListAlt";
import Person from "@mui/icons-material/Person";
import ExitToApp from "@mui/icons-material/ExitToApp";

export default function BottomNav() {
  // Renomeei o componente para refletir sua função
  const location = useLocation();
  const activeTabValue = location.pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Tabs
      value={activeTabValue}
      sx={{
        position: "fixed",
        textAlign: "center",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: "background.body",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        display: { xs: "flex", sm: "none" },
      }}
    >
      <TabList sx={{ "--List-gap": "8px", justifyContent: "center", fontSize: 13}}>
        <Tab
          orientation="vertical"
          component={Link}
          to="/dashboard"
          value="/dashboard"
        >
          <Home />
          Início
        </Tab>
        <Tab
          orientation="vertical"
          component={Link}
          to="/dashboard/agendamentos"
          value="/dashboard/agendamentos"
        >
          <ListAlt />
          Minhas Reservas
        </Tab>
        <Tab
          orientation="vertical"
          component={Link}
          to="/dashboard/perfil"
          value="/dashboard/perfil"
        >
          <Person />
          Perfil
        </Tab>
        <Tab
          onChange={() => handleLogout}
          orientation="vertical"
          component={Link}
          to="/dashboard/perfil"
          value="/dashboard/perfil"
        >
          <ExitToApp />
          Sair
        </Tab>
      </TabList>
    </Tabs>
  );
}
