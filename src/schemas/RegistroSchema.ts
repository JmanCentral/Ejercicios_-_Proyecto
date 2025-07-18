import { z } from "zod";

export const registroSchema = z.object({
   name: z.string().min(1, "El nombre es requerido"),
    username: z.string().min(1, "El nombre de usuario es requerido"),
    email: z.string().email("Email no válido"),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[\W_]/, "Debe contener al menos un carácter especial"),
    rol: z
  .array(z.enum(["ADMIN", "USER"]))
  .length(1, "Debe seleccionar un solo rol"),

});


export type RegistroSchemaType = z.infer<typeof registroSchema>;