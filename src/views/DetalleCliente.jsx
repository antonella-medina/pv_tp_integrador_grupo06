import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Container, Typography, Box, Divider } from "@mui/material";
import { Card, CardContent } from "@mui/material";
const DetalleCliente = () => {
  //const id = 4;
  const { id } = useParams();

  //creo variable de estado para cliente
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  //creo un useEffect para contener el fetch
  useEffect(() => {
    //operación asincrona
    const fetchCliente = async () => {
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);
        //para convertir la respuesta a objeto js
        const data = await respuesta.json();
        //Cliente toma esos datos
        setCliente(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCliente();
  }, []);
  //En caso de algún error, como sin conexión o si el cliente no existe
  if (error) return <div> Error: {error} </div>;
  //En caso de que aún no lleguen los datos
  if (cliente === null) return <CircularProgress />;
  return (
    //Muestro todos los datos anidados del Cliente
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, mb: 4 }}>
        <CardContent>
          <Box sx={{ mt: 4, p: 2 }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>Ficha del Cliente</Typography>
            <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
              <strong>Dirección</strong>
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 1 }}>
             ciudad: {cliente.address.city}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              calle: {cliente.address.street}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              numero de calle: {cliente.address.number}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              código postal: {cliente.address.zipcode}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
              <strong>Credenciales</strong>
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 1 }}>
              email: {cliente.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              nombre de usuario: {cliente.username}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              contraseña: {cliente.password}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
export default DetalleCliente;
