import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminProvider, AdminContext } from "./context/AdminContext";

{/*importamos todas nlas pantallas*/}
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Header from "./components/layout/Header";

{/*este componente envuelve a las páginas privadas.Si no estás logueado, te manda una patada al /login.*/}
const RutaProtegida = ({ children }) => {
    const { admin } = useContext(AdminContext);
      if (admin === null) {
        return <Navigate to="/login" />;   {/*Te rebota*/}
      }
  
      return children;   {/*Te deja pasar*/}
};

function RutasDeLaApp() {
  return (
    <BrowserRouter>
      {/* La barra superior siempre está atenta, ella sola sabe cuándo ocultarse */}
      <Header />
      
      <Routes>
        {/* ruta publica (Solo el Login) */}
        <Route path="/login" element={<Login />} />

        {/* rutas privadas */}
        <Route 
          path="/dashboard" 
          element={
            <RutaProtegida>
              <Dashboard />
            </RutaProtegida>
          } 
        />
        
        <Route 
          path="/clientes" 
          element={
            <RutaProtegida>
              <div style={{ padding: "20px" }}>Acá va el código de la Persona 2</div>
            </RutaProtegida>
          } 
        />

        {/* Si el usuario escribe cualquier verdura en la URL, lo manda al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
    {/*AdminProvider abraza a toda la aplicación para que todos escuchen el Contexto*/}
  return (
    <AdminProvider>
      <RutasDeLaApp />
    </AdminProvider>
  );
}

export default App;