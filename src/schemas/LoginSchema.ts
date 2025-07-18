
import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "El usuario es obligatorio" }),
  password: z
    .string()
    .min(6, { message: "Debe tener al menos 6 caracteres" })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
    .regex(/[0-9]/, { message: "Debe contener al menos un número" })
    .regex(/[^A-Za-z0-9]/, { message: "Debe contener al menos un carácter especial" }),
});


export type LoginSchemaType = z.infer<typeof loginSchema>;


