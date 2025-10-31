import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./utils/AppRoutes";

// Entry point - wraps everything inside AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;