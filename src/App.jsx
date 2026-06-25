import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminProvider, AdminContext } from "./context/AdminContext";
import { ThemeProvider } from '@mui/material/styles'; 
import { theme } from './theme'; 
{/*importamos todas nlas pantallas*/}
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Header from "./components/layout/Header";
import ListaClientes from "./views/ListaClientes";
import DetalleCliente from "./views/DetalleCliente";
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
              <Deshboard/>
            </RutaProtegida>
          } 
        />
        <Route 
          path="/clientes" 
          element={
            <RutaProtegida>
              <ListaClientes />
            </RutaProtegida>
          } 
        />
         <Route 
          path="/clientes/:id" 
          element={
            <RutaProtegida>
              <DetalleCliente />
            </RutaProtegida>
          } 
        />
        {/*
        <Route 
          path="/clientes" 
          element={
            <RutaProtegida>
              <div style={{ padding: "20px" }}>Persona 2</div>
            </RutaProtegida>
          } 
        />
          */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
function App() {

  return (
    <AdminProvider>
      <ThemeProvider theme={theme}> 
        <RutasDeLaApp />
      </ThemeProvider>
    </AdminProvider>

  );
}

export default App;