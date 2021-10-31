import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import authContext from '../../context/auth/authContext';


const Proyectos = () => {

    //extraer la información de autnticación
    const {usuarioAutenticado} = useContext(authContext);

    useEffect(() => {
        usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( 
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;