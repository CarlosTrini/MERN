import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import authContext from "../../context/auth/authContext";
import alertasContext from '../../context/alertas/alertasContext';

const Login = (props) => {

    //context de auth y alertas
  const {alerta, mostrarAlerta} = useContext(alertasContext);
    const {mensaje, autenticado , iniciarSesion} = useContext(authContext);


  const [datosLogin, setDatosLogin] = useState({
    email: "",
    password: "",
  });
  const { email, password } = datosLogin;

  //guardar los datos en los campos de email y password
  const onChange = (e) => {
    setDatosLogin({
      ...datosLogin,
      [e.target.name]: e.target.value,
    });
  };

  //cuando se de submit al formulario
  const onSubmit = (e) => {
    e.preventDefault();

    //validar no campos vacíos
      //validar no campos vacíos
      if (email.trim() === '' || password.trim() === '' ) {
        return mostrarAlerta('No se admiten campos vacíos', 'alerta-error');
      }
    //pasar datos al action
    iniciarSesion(datosLogin);
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
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
        {
            alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null
          }
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

          <div className="">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link 
            to="/nueva-cuenta" 
            className="enlace-cuenta">
            Crear una cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
