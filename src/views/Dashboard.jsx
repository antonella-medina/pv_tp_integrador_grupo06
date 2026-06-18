import { Container, Typography, Paper } from "@mui/material";

const Dashboard = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Paper sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    ¡Bienvenida al sistema!
                </Typography>
                <Typography variant="body1">
                    Aquí vas a poder navegar por el menú. (Espacio reservado para las otras pantallas).
                </Typography>
            </Paper>
        </Container>
    );
};

export default Dashboard;