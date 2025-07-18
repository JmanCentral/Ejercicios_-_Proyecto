import React from 'react';
// Importamos el hook principal de React Hook Form
import { useForm } from 'react-hook-form';
// Importamos la interfaz Usuario que define el tipo de los datos del formulario
import type { Usuario } from '../interfaces/Usuario';

const RegistroUsuario: React.FC = () => {
  // useForm nos devuelve varias funciones y objetos para manejar el formulario
  const {
    register,       // Para registrar los campos del formulario
    handleSubmit,   // Para manejar el envío del formulario
    formState: { errors },  // Para acceder a los errores de validación
  } = useForm<Usuario>(); // Le pasamos la interfaz Usuario para tipar los campos

  // Esta función se ejecutará cuando el formulario sea válido y se envíe
  const onSubmit = (data: Usuario) => {
    console.log("Usuario registrado:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}> {/* handleSubmit maneja validación y luego llama a onSubmit */}
      <h2>Registro de Usuario</h2>

      {/* Campo Nombre */}
      <div>
        <label>Nombre:</label>
        <input
          // Registramos el input con validación: requerido
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {/* Mostramos mensaje de error si existe */}
        {errors.nombre && <span>{errors.nombre.message}</span>}
      </div>

      {/* Campo Email */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          // Registramos el campo con validación: requerido y patrón de email
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/, // Expresión regular para formato de email
              message: "Formato de email no válido",
            },
          })}
        />
        {/* Mostramos mensaje si el email tiene errores */}
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      {/* Campo Contraseña */}
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          // Registramos el campo con validación: requerido y mínimo de caracteres
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
          })}
        />
        {/* Mostramos mensaje si la contraseña tiene errores */}
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      {/* Botón de envío */}
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroUsuario;

import React from 'react';
// Importamos el hook principal de React Hook Form
import { useForm } from 'react-hook-form';
// Importamos la interfaz Usuario que define el tipo de los datos del formulario
import type { Usuario } from '../interfaces/Usuario';


const RegistroUsuario: React.FC = () => {
  // useForm nos devuelve varias funciones y objetos para manejar el formulario
  const {
    register,       // Para registrar los campos del formulario
    handleSubmit,   // Para manejar el envío del formulario
    formState: { errors },  // Para acceder a los errores de validación
  } = useForm<Usuario>(); // Le pasamos la interfaz Usuario para tipar los campos


  // Esta función se ejecutará cuando el formulario sea válido y se envíe
  const onSubmit = (data: Usuario) => {
    console.log("Usuario registrado:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}> {/* handleSubmit maneja validación y luego llama a onSubmit */}
      <h2>Registro de Usuario</h2>


      {/* Campo Nombre */}
      <div>
        <label>Nombre:</label>
        <input
          // Registramos el input con validación: requerido
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {/* Mostramos mensaje de error si existe */}
        {errors.nombre && <span>{errors.nombre.message}</span>}
      </div>

      {/* Campo Email */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          // Registramos el campo con validación: requerido y patrón de email
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/, // Expresión regular para formato de email
              message: "Formato de email no válido",
            },
          })}
        />
        {/* Mostramos mensaje si el email tiene errores */}
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      {/* Campo Contraseña */}
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          // Registramos el campo con validación: requerido y mínimo de caracteres
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
          })}
        />
        {/* Mostramos mensaje si la contraseña tiene errores */}
        {errors.password && <span>{errors.password.message}</span>}
      </div>


      {/* Botón de envío */}
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroUsuario;
