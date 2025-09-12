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

