import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
    {/*traemos los datos del usuario logueado y la función para desloguear*/}
    const { admin, logout } = useContext(AdminContext);
    const navigate = useNavigate();

    {/*Función para el botón de salir*/}
    const manejarSalida = () => {
        logout(); {/*Borra los datos del estado global*/}
        navigate("/login"); {/*Te devuelve a la pantalla de ingreso*/}
    };

    {/*Si no hay nadie logueado (es null), esta línea esconde la barra por completo*/}
    if (admin === null) {
        return null; 
    }

    {/*Si pasa para abajo, es porque hay alguien logueado, entonces mostramos la barra*/}
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Panel de Control
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* Mostramos el nombre y el sector guardados en el contexto */}
                    <Typography variant="body1">
                        Hola, {admin.nombre} ({admin.sector})
                    </Typography>

                    <Button color="inherit" variant="outlined" onClick={manejarSalida}>
                        Cerrar Sesión
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;