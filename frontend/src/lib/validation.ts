import { z } from 'zod';

export type Interes = 'Masaje Manual' | 'Pistola de Percusión' | 'Sauna' | 'Pack Recovery' | 'Pack Express';

export const preventaSchema = z.object({
  email: z
    .string()
    .min(1, 'Email es requerido')
    .email('Email inválido'),
  nombre: z
    .string()
    .optional(),
  telefono: z
    .string()
    .min(1, 'Teléfono es requerido')
    .refine((val) => {
      const cleanPhone = val.replace(/\D/g, '');
      return cleanPhone.length >= 7 && cleanPhone.length <= 15;
    }, {
      message: 'Teléfono debe tener entre 7 y 15 dígitos'
    }),
  interes: z.enum(['Masaje Manual', 'Pistola de Percusión', 'Sauna', 'Pack Recovery', 'Pack Express'] as const, {
    errorMap: () => ({ message: 'Selecciona un servicio' }),
  }),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
});

export type PreVentaFormData = z.infer<typeof preventaSchema>;

export const validatePreVenta = (data: unknown) => {
  return preventaSchema.safeParse(data);
};

