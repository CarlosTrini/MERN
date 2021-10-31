import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import alertasContext from '../../context/alertas/alertasContext';
import authContext from '../../context/auth/authContext';

const NuevaCuenta = (props) => {

  // se llama al context de alertas y auth y se extraen sus valoes
  const {alerta, mostrarAlerta} = useContext(alertasContext);
  const {mensaje, autenticado ,registrarUsuario} = useContext(authContext);


  // state del formulario
    const [datosRegistro, setDatosRegistro] = useState({
        nombre: "",
        email: "",
        password: "",
        passwordConfirma: ""
      });
      const {nombre, email, password, passwordConfirma } = datosRegistro;
    
      //guardar los datos en los campos de nombre , email , password y passwordConfirma
      const onChange = (e) => {
        setDatosRegistro({
          ...datosRegistro,
          [e.target.name]: e.target.value,
        });
      };
    
      //cuando se de submit al formulario 
      const onSubmit = (e) => {
        e.preventDefault();

        //validar no campos vacíos
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || passwordConfirma.trim() === '') {
          return mostrarAlerta('No se admiten campos vacíos', 'alerta-error');
        }

        //password mínimo 8 caracteres
        if(password.length < 8){
          return mostrarAlerta('La contraseña debe tener mínimo 8 caracteres', 'alerta-error');
        }
        
        //passwords iguales
        if(password !== passwordConfirma){
          return mostrarAlerta('Las contraseñas son diferentes', 'alerta-error');
        }
        
        //pasar datos al action
        registrarUsuario({nombre, email, password});
      };
    
  
      // en caso de que el usuario se haya autenticado , registrado o sea un registro duplicado
      useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');  
        }
        if(mensaje){
          return mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [mensaje, autenticado, props.history])
  
  
  
      return (
        <div className="form-usuario">
          <div className="contenedor-form sombra-dark">
            <h1>Registrarse</h1>
            <form onSubmit={onSubmit}>
          {
            alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null
          }
            <div className="campo-form">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Coloca tu nombre"
                  value={nombre}
                  onChange={onChange}
                />
              </div>

              <div className="campo-form">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Coloca tu email"
                  value={email}
                  onChange={onChange}
                />
              </div>
    
              <div className="campo-form">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Coloca tu password"
                  value={password}
                  onChange={onChange}
                />
              </div>

              <div className="campo-form">
                <label htmlFor="passwordConfirma">Confirma Password:</label>
                <input
                  type="password"
                  name="passwordConfirma"
                  id="passwordConfirma"
                  placeholder="Coloca tu password de nuevo"
                  value={passwordConfirma}
                  onChange={onChange}
                />
              </div>
    
              <div className="">
                <input
                  type="submit"
                  className="btn btn-primario btn-block"
                  value="Registrarme"
                />
              </div>
            </form>
            <Link 
                to="/" 
                className="enlace-cuenta">
                Regresar a iniciar Sesión
            </Link>
          </div>
        </div>
      );
}
 
export default NuevaCuenta;