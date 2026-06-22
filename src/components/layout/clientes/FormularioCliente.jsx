import React, { useState } from 'react';
import { 
  Modal, Box, Typography, TextField, Button, Grid, Stack, Alert 
} from '@mui/material';

// Estilo del modal centrado en pantalla
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

const FormularioCliente = ({ open, handleClose, onClienteCreado, setGlobalError, showSnackbar }) => {
  const [nuevoCliente, setNuevoCliente] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: ''
  });
  const [errorInput, setErrorInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorInput('');

    // Validaciones del formulario obligatorias antes del envío
    if (!nuevoCliente.firstname || !nuevoCliente.lastname || !nuevoCliente.email) {
      setErrorInput('Por favor, completa los campos obligatorios (Nombre, Apellido y Email).');
      return;
    }

    try {
      // Petición asíncrona HTTP POST hacia la API real
      const res = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: nuevoCliente.email,
          username: nuevoCliente.firstname.toLowerCase(),
          password: '1234_default',
          name: {
            firstname: nuevoCliente.firstname,
            lastname: nuevoCliente.lastname
          },
          address: {
            city: nuevoCliente.city,
            street: 'default_street',
            number: 0,
            zipcode: '0000'
          },
          phone: nuevoCliente.phone
        })
      });

      if (!res.ok) throw new Error('Error al intentar crear el cliente en el servidor remoto.');
      const data = await res.json();

      // Envie el nuevo cliente a la lista principal para refrescar la tabla en tiempo real
      onClienteCreado(data);

      // Desplegamos el feedback visual mediante el snackbar del contenedor
      showSnackbar(`¡Cliente agregado con éxito! ID asignado: ${data.id}`);
      
      // Limpiamos los campos y cerramos el modal de forma limpia
      setNuevoCliente({ firstname: '', lastname: '', email: '', phone: '', city: '' });
      handleClose();

    } catch (err) {
      setGlobalError(err.message);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          ➕ Registrar Nuevo Cliente
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Completa el formulario para dar de alta al usuario en FakeStore API.
        </Typography>

        {errorInput && <Alert severity="warning" sx={{ mb: 2 }}>{errorInput}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField 
            label="Nombre *" value={nuevoCliente.firstname} fullWidth margin="normal" size="small"
            onChange={e => setNuevoCliente({ ...nuevoCliente, firstname: e.target.value })} 
          />
          <TextField 
            label="Apellido *" value={nuevoCliente.lastname} fullWidth margin="normal" size="small"
            onChange={e => setNuevoCliente({ ...nuevoCliente, lastname: e.target.value })} 
          />
          <TextField 
            label="Email *" type="email" value={nuevoCliente.email} fullWidth margin="normal" size="small"
            onChange={e => setNuevoCliente({ ...nuevoCliente, email: e.target.value })} 
          />
          <TextField 
            label="Teléfono" value={nuevoCliente.phone} fullWidth margin="normal" size="small"
            onChange={e => setNuevoCliente({ ...nuevoCliente, phone: e.target.value })} 
          />
          <TextField 
            label="Ciudad" value={nuevoCliente.city} fullWidth margin="normal" size="small"
            onChange={e => setNuevoCliente({ ...nuevoCliente, city: e.target.value })} 
          />
          
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button onClick={handleClose} variant="outlined" color="inherit">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Guardar</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default FormularioCliente;
