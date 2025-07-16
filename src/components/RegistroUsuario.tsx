// pages/RegistroPage.tsx (o RegistroForm.tsx si es puro componente)
import { useForm } from 'react-hook-form';
import type { UserDTO } from '../interfaces/auth';

interface Props {
  onRegistro: (data: UserDTO) => void;
}

function RegistroForm({ onRegistro }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserDTO>();

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Registrar Usuario</h3>

            <form onSubmit={handleSubmit(onRegistro)}>
              <div className="mb-3">
                <label className="form-label">Nombre completo</label>
                <input className="form-control" {...register("name", { required: "Campo obligatorio" })} />
                {errors.name && <small className="text-danger">{errors.name.message}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input className="form-control" {...register("username", { required: "Campo obligatorio" })} />
                {errors.username && <small className="text-danger">{errors.username.message}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email", {
                    required: "Campo obligatorio",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[^@]+$/,
                      message: "Email inválido",
                    },
                  })}
                />
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  {...register("password", {
                    required: "Campo obligatorio",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  })}
                />
                {errors.password && <small className="text-danger">{errors.password.message}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Rol</label>
                <select className="form-select" {...register("rol")}>
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-success d-flex justify-content-center align-items-center gap-2"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? '💾 Guardar' : (
                    <>
                      <span className="spinner-border spinner-border-sm text-light" role="status" />
                      <span>Guardando...</span>
                    </>
                  )}
                </button>
                <button type="button" className="btn btn-secondary">
                  ⬅️ Volver
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroForm;
