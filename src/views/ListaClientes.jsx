import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, TextField, CircularProgress, Skeleton, Alert, Box,
  Button, Snackbar
} from '@mui/material';
// Se Importo el nuevo componente modular del formulario modal
import FormularioCliente from '../components/clientes/FormularioCliente';

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  
  // Estado para controlar la apertura de la ventana emergente
  const [openModal, setOpenModal] = useState(false);

  // GET de usuarios remoto
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

  // Filtrar por apellido o ciudad (con protección de nulos)
  const clientesFiltrados = clientes.filter(c =>
    (c.name?.lastname?.toLowerCase() || '').includes(busqueda.toLowerCase()) ||
    (c.address?.city?.toLowerCase() || '').includes(busqueda.toLowerCase())
  );

  // Callback para insertar el nuevo cliente creado en la tabla inmediatamente
  const handleAgregarClienteALista = (nuevoClienteData) => {
    setClientes([...clientes, nuevoClienteData]);
  };

  // Manejador de feedback visual para disparar el Snackbar desde el hijo
  const desencadenarSnackbar = (mensaje) => {
    setSnackbar({ open: true, message: mensaje });
  };

  return (
    <Container>
      {/* Encabezado limpio y alineado */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Tabla de Clientes
        </Typography>
        
        {/* Botón que dispara la apertura del formulario modular */}
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => setOpenModal(true)}
          sx={{ borderRadius: '6px', textTransform: 'none', fontWeight: 'bold' }}
        >
          ➕ Nuevo Cliente
        </Button>
      </Box>

      <TextField
        label="Buscar por apellido o ciudad"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {/* Control de estados de carga */}
      {loading && (
        <Box sx={{ mt: 3 }}>
          <CircularProgress />
          <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2 }} />
        </Box>
      )}

      {/* Control de estados de error */}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {/* Control de estados de éxito (Renderizado de la tabla profesional) */}
      {!loading && !error && (
        <Table sx={{ mt: 2 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Nombre Completo</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Teléfono</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Ciudad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientesFiltrados.map(c => (
              <TableRow key={c.id} hover>
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

      {/* Conexión al componente modular flotante mediante propiedades */}
      <FormularioCliente 
        open={openModal} 
        handleClose={() => setOpenModal(false)} 
        onClienteCreado={handleAgregarClienteALista}
        setGlobalError={setError}
        showSnackbar={desencadenarSnackbar}
      />

      {/* Snackbar feedback global */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Container>
  );
}

export default ListaClientes;
