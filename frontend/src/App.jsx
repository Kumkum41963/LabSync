import AppRoutes from "@/utils/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";
import { TicketsProvider } from "./context/TicketsContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RoleProvider>
          <TicketsProvider>
            <AppRoutes />
          </TicketsProvider>
        </RoleProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;