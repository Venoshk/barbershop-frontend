import { Component } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/login";
import { Sing } from "./pages/Sign/sing";
import { Home } from "./pages/Home/home";
import { ThemeProvider } from "./contexts/ThemeContext";
class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Sing />} />
        </Routes>
      </ThemeProvider>
    );
  }
}

export default App;
