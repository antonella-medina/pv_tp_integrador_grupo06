import { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, MenuItem, Box, Typography, Paper } from "@mui/material";

const Login = () => {
    {/*traemos la función de login desde el Contexto y la herramienta para navegar*/}
    const { login } = useContext(AdminContext);
    const navigate = useNavigate();

    {/*creamos los estados locales para guardar lo que el usuario escribe*/}
    const [nombre, setNombre] = useState("");
    const [sector, setSector] = useState("");

    {/*esta función se ejecuta cuando apretamos el botón "Ingresar"*/}
    const manejarIngreso = (e) => {
        e.preventDefault();   {/*Evita que la página parpadee o se recargue*/}

        {/*verificamos que los campos no estén vacíos*/}
        if (nombre !== "" && sector !== "") {
            {/*mandamos los datos al Contexto para que los guarde*/}
            login({ nombre: nombre, sector: sector });
                {/*lo mandamos adentro del sistema*/}
                navigate("/dashboard");
        } else {
            alert("Por favor, completá todos los datos.");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Paper sx={{ padding: 4, width: "100%" }} elevation={3}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Ingreso al Sistema
                    </Typography>

                    <Box component="form" onSubmit={manejarIngreso} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            required
                            label="Nombre del Administrador"
                            margin="normal"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} // Guarda lo que escribe
                        />

                        <TextField
                            fullWidth
                            required
                            select
                            label="Sector"
                            margin="normal"
                            value={sector}
                            onChange={(e) => setSector(e.target.value)} // Guarda lo que elige
                        >
                            <MenuItem value="Soporte">Soporte</MenuItem>
                            <MenuItem value="Gerencia">Gerencia</MenuItem>
                        </TextField>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Ingresar
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;