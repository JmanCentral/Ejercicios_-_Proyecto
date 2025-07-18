import { useForm } from 'react-hook-form';
import type { Paciente } from '../interfaces/Paciente';
import { useEffect ,  useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";


interface Props {
  onGuardar: (data: Omit<Paciente, 'id'>) => void;
  onVolver: () => void;
  initialValues?: Paciente;
}

function PacienteForm({ onGuardar, onVolver, initialValues }: Props) {

  const [date, setDate] = useState<Date | undefined>(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Paciente>();

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        setValue(key as keyof Paciente, value);
      });
    }
  }, [initialValues, setValue]);

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from--50 to-green-500 py-6 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          {initialValues ? 'Editar Paciente' : 'Registrar Paciente'}
        </h2>

        <form onSubmit={handleSubmit(onGuardar)} className="space-y-5">
          {/* Nombre completo */}
          <div className="space-y-2 text-green-700">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input id="nombre" type="text" {...register("nombre", { required: "Campo obligatorio" })} />
            {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre.message}</p>}
          </div>

          {/* Documento */}
          <div className="space-y-2 text-green-700">
            <Label htmlFor="documento">Documento</Label>
            <Input id="documento" type="text" {...register("documento", { required: "Campo obligatorio" })} />
            {errors.documento && <p className="text-sm text-red-500 mt-1">{errors.documento.message}</p>}
          </div>

          {/* Correo */}
          <div className="space-y-2 text-green-700">
            <Label htmlFor="correo">Correo electrónico</Label>
            <Input
              id="correo"
              type="email"
              {...register("correo", {
                required: "Campo obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Correo inválido"
                }
              })}
            />
            {errors.correo && <p className="text-sm text-red-500 mt-1">{errors.correo.message}</p>}
          </div>

          {/* Teléfono */}
          <div className="space-y-2 text-green-700">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input id="telefono" type="tel" {...register("telefono", { required: "Campo obligatorio" })} />
            {errors.telefono && <p className="text-sm text-red-500 mt-1">{errors.telefono.message}</p>}
          </div>

          {/* Fecha de nacimiento */}
          <div className="space-y-2 text-green-700">
            <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
            <Input id="fechaNacimiento" type="date" {...register("fechaNacimiento", { required: "Campo obligatorio" })} />
            {errors.fechaNacimiento && <p className="text-sm text-red-500 mt-1">{errors.fechaNacimiento.message}</p>}
          </div>

          {/* Dirección completa */}
          <div className="space-y-2 text-green-700">
            <Label htmlFor="direccionCompleta">Dirección completa</Label>
            <Textarea id="direccionCompleta" {...register("direccionCompleta", { required: "Campo obligatorio" })} />
            {errors.direccionCompleta && <p className="text-sm text-red-500 mt-1">{errors.direccionCompleta.message}</p>}
          </div>

          {/* Tipo de sangre */}
          <div className="space-y-2 text-green-700">
            <Label>Tipo de sangre</Label>
            <Select onValueChange={(value) => value && register("tipoSangre").onChange({ target: { value } })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tipoSangre && <p className="text-sm text-red-500 mt-1">{errors.tipoSangre.message}</p>}
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
             <Button type="submit" variant="success" disabled={isSubmitting} className="flex-1">
              {!isSubmitting ? "💾 Guardar" : (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Guardando...
                </>
              )}
            </Button>

            <Button type="button" onClick={onVolver} variant="muted" className="flex-1">
              🔙 Volver
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PacienteForm;
