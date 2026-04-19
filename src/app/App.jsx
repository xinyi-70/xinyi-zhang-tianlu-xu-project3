import Navbar from "../components/Navbar.jsx";
import AppRoutes from "./routes.jsx";
import { GameProvider } from "../state/GameContext.jsx";
import { AuthProvider } from "../state/AuthContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Navbar />
        <AppRoutes />
      </GameProvider>
    </AuthProvider>
  );
}
