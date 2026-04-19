import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Games from "../pages/Games.jsx";
import GamePage from "../pages/GamePage.jsx";
import Rules from "../pages/Rules.jsx";
import Scores from "../pages/Scores.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<Games />} />
      <Route path="/game/:gameId" element={<GamePage />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/scores" element={<Scores />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
