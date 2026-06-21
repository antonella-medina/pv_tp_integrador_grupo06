import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, TextField, CircularProgress, Skeleton, Alert, Box,
  Button, Snackbar
} from '@mui/material';

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [nuevoCliente, setNuevoCliente] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: ''
  });

  // GET de usuarios
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/users');
        if (!res.ok) throw new Error('Error al cargar clientes');
        const data = await res.json();
        setClientes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);

  // Filtrar por apellido o ciudad (con protección)
  const clientesFiltrados = clientes.filter(c =>
    (c.name?.lastname?.toLowerCase() || '').includes(busqueda.toLowerCase()) ||
    (c.address?.city?.toLowerCase() || '').includes(busqueda.toLowerCase())
  );

  // POST nuevo cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: nuevoCliente.email,
          username: nuevoCliente.firstname.toLowerCase(),
          password: '1234',
          name: {
            firstname: nuevoCliente.firstname,
            lastname: nuevoCliente.lastname
          },
          address: {
            city: nuevoCliente.city,
            street: 'default',
            number: 0,
            zipcode: '0000',
            geolocation: { lat: '0', long: '0' }
          },
          phone: nuevoCliente.phone
        })
      });
      if (!res.ok) throw new Error('Error al crear cliente');
      const data = await res.json();
      console.log("Nuevo cliente:", data);
      setClientes([...clientes, data]); // refrescar lista
      setSnackbar({ open: true, message: `Cliente agregado con ID ${data.id}` });
      setNuevoCliente({ firstname: '', lastname: '', email: '', phone: '', city: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tabla de Clientes
      </Typography>

      <TextField
        label="Buscar por apellido o ciudad"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {/* Estado de carga */}
      {loading && (
        <Box>
          <CircularProgress />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>
      )}

      {/* Estado de error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Estado de éxito */}
      {!loading && !error && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Ciudad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {clientesFiltrados.map(c => (
            <TableRow key={c.id}>
            <TableCell>{c.id}</TableCell>
            <TableCell>{`${c.name?.firstname || ''} ${c.name?.lastname || ''}`}</TableCell>
            <TableCell>{c.email || ''}</TableCell>
            <TableCell>{c.phone || ''}</TableCell>
            <TableCell>{c.address?.city || ''}</TableCell>
            </TableRow>
        ))}
        </TableBody>
        </Table>
      )}

      {/* Formulario de alta */}
      <Box mt={4}>
        <Typography variant="h5">Alta de Cliente</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Nombre" value={nuevoCliente.firstname}
            onChange={e => setNuevoCliente({ ...nuevoCliente, firstname: e.target.value })}
            fullWidth margin="normal" />
          <TextField label="Apellido" value={nuevoCliente.lastname}
            onChange={e => setNuevoCliente({ ...nuevoCliente, lastname: e.target.value })}
            fullWidth margin="normal" />
          <TextField label="Email" value={nuevoCliente.email}
            onChange={e => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
            fullWidth margin="normal" />
          <TextField label="Teléfono" value={nuevoCliente.phone}
            onChange={e => setNuevoCliente({ ...nuevoCliente, phone: e.target.value })}
            fullWidth margin="normal" />
          <TextField label="Ciudad" value={nuevoCliente.city}
            onChange={e => setNuevoCliente({ ...nuevoCliente, city: e.target.value })}
            fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary">Guardar</Button>
        </form>
      </Box>

      {/* Snackbar feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />
    </Container>
  );
}

export default ListaClientes;
