import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .email({ message: "Correo electrónico no válido" })
        .max(100, {
            message: "El correo electrónico debe tener menos de 100 caracteres",
        }),
    password: z
        .string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(255, {
            message: "La contraseña debe tener menos de 255 caracteres",
        }),
});

export const registerSchema = z.object({
    email: z
        .string()
        .email({ message: "Correo electrónico no válido" })
        .max(100, {
            message: "El correo electrónico debe tener menos de 100 caracteres",
        })
        .min(1, { message: "El correo es requerido", }),
    password: z
        .string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(255, {
            message: "La contraseña debe tener menos de 255 caracteres",
        }),
    confirmPassword: z
        .string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(255, {
            message: "La contraseña debe tener menos de 255 caracteres",
        }),
    name: z
        .string()
        .max(100, { message: "El nombre debe tener menos de 100 caracteres" })
        .min(1, { message: "El nombre es requerido", }),
    cellphone: z
        .string()
        .max(12, { message: "El celular debe tener 12 dígitos" })
        .min(10, { message: "El celular es requerido", }),
    address: z.string()
        .max(100, { message: "La dirección debe tener menos de 100 caracteres", })
        .min(1, { message: "La dirección es requerida", }),
    state: z
        .string()
        .max(100, { message: "El estado debe tener menos de 100 caracteres" })
        .min(1, { message: "El estado es requerido", }),
    municipality: z.string()
        .max(100, { message: "El municipio debe tener menos de 100 caracteres",})
        .min(1, { message: "El municipio es requerido", }),
});

export const editSchema = z.object({
    name: z
        .string()
        .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
    cellphone: z
        .string()
        .max(12, { message: "El celular debe tener 12 dígitos" }),
    address: z.string().max(100, {
        message: "La dirección debe tener menos de 100 caracteres",
    }),
    state: z
        .string()
        .max(100, { message: "El estado debe tener menos de 100 caracteres" }),
    municipality: z.string().max(100, {
        message: "El municipio debe tener menos de 100 caracteres",
    }),
});

export const saleSchema = z.object({
    carId: z.string(),
    clientId: z.string(),
    agentId: z.string(),
    totalPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, {
        message: "Precio total incorrecto",
    }),
});

export const carSchema = z.object({
    modelId: z.string(),
    brandId: z.string(),
    name: z.string().max(255, {
        message: "El nombre debe tener menos de 255 caracteres",
    }),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
        message: "Precio incorrecto",
    }).max(10, {
        message: "El precio debe ser menor a 1,000,000,000.00",
    }),
    color: z.string().max(40, {
        message: "El color debe tener menos de 40 caracteres",
    }),
    description: z.string().max(255, {
        message: "La descripción debe tener menos de 255 caracteres",
    }),
    year: z.string().length(4, { message: "El año debe tener 4 dígitos" }),
    motor: z.string().max(140, {
        message: "El motor debe tener menos de 140 caracteres",
    })
});