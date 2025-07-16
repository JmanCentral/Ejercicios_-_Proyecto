// components/LoginForm.tsx
import { useForm } from 'react-hook-form';
import type { LoginRequest } from '../interfaces/Auth';
import { useNavigate } from 'react-router-dom';


interface Props {
  onLogin: (data: LoginRequest) => void;
}

function LoginForm({ onLogin }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>();

  const navigate = useNavigate();

  return (
   <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-center mb-6">Iniciar Sesión</h3>

        <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("username", { required: "El usuario es obligatorio" })}
            />
            {errors.username && (
              <small className="text-red-500 text-sm">{errors.username.message}</small>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <small className="text-red-500 text-sm">{errors.password.message}</small>
            )}
          </div>

          <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex justify-center items-center gap-2 transition duration-200 disabled:opacity-50"
              >
                {!isSubmitting ? '🔐 Iniciar sesión' : (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    <span>Verificando...</span>
                  </>
                )}
              </button>

              <div className="w-full">
                <button
                  type="button"
                  onClick={() => navigate('/registro')} 
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded transition duration-200"
                >
                  📝 Registrarse
                </button>
              </div>
          </div>
        </form>
      </div>
    </div>
</div>

  );
}

export default LoginForm;
