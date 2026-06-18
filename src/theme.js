import { createTheme } from '@mui/material/styles';

// Creamos una constante llamada 'theme' que contendrá todas nuestras reglas de diseño. La exportamos para poder usarla en otros archivos (como en App.jsx).
export const theme = createTheme({

    // "palette" maneja los colores globales.
    palette: {
        // el color primario es el que más se ve.
        primary: {
            main: '#2d3436', 
        },
        // el color secundario es para acciones que contrastan con la principal.
        secondary: {
            main: '#7a7a7a', 
        },
        // Maneja el fondo de la página.
        background: {
            default: '#f4f4f4', 
            paper: '#ffffff'
        },
    },

    //maneja las fuentes y textos.
    typography: {
        // definimos la familia de fuentes. Si no encuentra la primera, usa la siguiente.
        fontFamily: '"Inter", "Helvetica", sans-serif',
        // configuramos los botones para que el texto no esté siempre en MAYÚSCULAS (por defecto de MUI).
        button: {
            textTransform: 'none', // así el texto del botón se lee tal cual lo escribimos.
            fontWeight: 500,      // le damos un poco más de grosor a la letra .
        },
    },

    //maneja las formas de los componentes.
        shape: {
        borderRadius: 24, //define qué tan redondeados están los botones, inputs y tarjetas.
    },
});