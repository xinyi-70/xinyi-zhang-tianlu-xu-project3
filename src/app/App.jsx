import Navbar from "../components/Navbar.jsx";
import AppRoutes from "./routes.jsx";
import { GameProvider } from "../state/GameContext.jsx";

export default function App() {
  return (
    <GameProvider>
      <Navbar />
      <AppRoutes />
    </GameProvider>
  );
}