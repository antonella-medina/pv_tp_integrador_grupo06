import { createContext, useState, useEffect } from "react";
{/*creamos el Contexto (donde vamos a poner los datos del usuario)*/}
export const AdminContext = createContext();

{/*creamos el Proveedor*/} 
export const AdminProvider = ({ children }) => {
    {/*buscamos si ya habia iniciado sesion*/}
    const sesionGuardada = localStorage.getItem("adminSession");

    let estadoInicial = null; {/*por defecto arrancamos sin nadie logueado*/}

    if (sesionGuardada !== null) {
        {/*Si encontramos datos guardados en el navegador, los volvemos a convertir en un objeto*/}
        estadoInicial = JSON.parse(sesionGuardada);
    }

    {/*creamos el estado de react, "admin" guarda los datos, "setAdmin" es la única función que puede modificarlos*/}
    const [admin, setAdmin] = useState(estadoInicial);

    {/*mantener el localstorage actualizado - useEffect "vigila" a la variable [admin]. Si 'admin' cambia, se ejecuta esto:*/}
    useEffect(() => {
        if (admin !== null) {
            {/*si hay un usuario, lo guardamos como texto*/}
            localStorage.setItem("adminSession", JSON.stringify(admin));
        } else {
            {/*Si es null (cerró sesión), limpiamos el navegador*/}
            localStorage.removeItem("adminSession");
        }
    }, [admin]);

        {/*funciones para los botones*/}
    const login = (datosDelFormulario) => {
        setAdmin(datosDelFormulario);  {/*Recibe el nombre y sector desde la pantalla Login*/}
    };

    const logout = () => {
        setAdmin(null);   {/*borra al usuario del sistema*/}
    };

    {/*entregamos las herramientas al resto de la aplicación*/}
    return (
        <AdminContext.Provider value={{ admin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};
