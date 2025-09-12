import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { PreVentaLead, Interes } from '../models/PreVentaLead';
import { getFirestore } from '../db/firebase';
import { sendPreventaNotification, sendClientConfirmation } from '../lib/email';
import { env } from '../lib/env';

const router = Router();

// Esquema de validación para el body de la request
const preventaSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email es requerido'),
  nombre: z.string().optional(),
  interes: z.enum(['Masaje Manual', 'Pistola de Percusión', 'Sauna', 'Pack Recovery', 'Pack Express'] as const),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Debe aceptar los términos y condiciones',
  }),
});

type PreVentaRequest = z.infer<typeof preventaSchema>;

// Función para extraer UTMs de la query string
const extractUTM = (req: Request) => {
  const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.query;
  
  if (!utm_source && !utm_medium && !utm_campaign && !utm_term && !utm_content) {
    return undefined;
  }

  const utm: any = {};
  
  if (utm_source) utm.source = utm_source as string;
  if (utm_medium) utm.medium = utm_medium as string;
  if (utm_campaign) utm.campaign = utm_campaign as string;
  if (utm_term) utm.term = utm_term as string;
  if (utm_content) utm.content = utm_content as string;

  return utm;
};

router.post('/', async (req: Request, res: Response) => {
  try {
    // Log de los datos recibidos para debugging
    console.log('Datos recibidos:', JSON.stringify(req.body, null, 2));
    
    // Validar el body de la request
    console.log('Iniciando validación...');
    const validatedData = preventaSchema.parse(req.body);
    console.log('Validación exitosa:', validatedData);
    
    // Extraer información adicional
    const utm = extractUTM(req);
    const referer = req.get('referer');
    
    // Crear el lead
    const lead = new PreVentaLead({
      ...validatedData,
      origen: 'landing',
      timestamp: Date.now(),
      utm,
      referer,
    });

    // Obtener instancia de Firestore
    const db = getFirestore();
    
    // Verificar si ya existe un lead con el mismo email e interés
    const existingLeads = await db.collection('preventa_leads')
      .where('email', '==', lead.email)
      .where('interes', '==', lead.interes)
      .get();

    if (!existingLeads.empty) {
      return res.status(400).json({
        error: 'lead_duplicado',
        message: 'Ya tienes una reserva para este servicio',
      });
    }

    // Guardar en Firestore
    const docRef = await db.collection('preventa_leads').add(lead.toFirestore());
    
    // Asignar el ID generado
    lead.id = docRef.id;
    
    console.log(`💾 Lead guardado en Firebase: ${lead.id}`);
    console.log(`   📧 Email: ${lead.email}`);
    console.log(`   🎯 Servicio: ${lead.interes}`);

    // Enviar emails de notificación (en paralelo, sin esperar)
    console.log('📧 Iniciando envío de emails...');
    console.log('📧 Lead ID para emails:', lead.id);
    console.log('📧 Email del lead para confirmación:', lead.email);
    console.log('📧 Email del admin para notificación:', env.EMAIL_TO);
    
    Promise.all([
      sendPreventaNotification(lead),
      sendClientConfirmation(lead)
    ]).then(() => {
      console.log('✅ Todos los emails enviados correctamente');
    }).catch(error => {
      console.error('❌ Error enviando emails:', error);
      console.error('❌ Lead ID con error de email:', lead.id);
      // En producción, logueamos pero no afectamos la respuesta
      if (env.NODE_ENV === 'production') {
        // Aquí podrías enviar el error a un servicio de monitoreo
        console.error('Email service failed for lead:', lead.id);
      }
    });

    return res.status(201).json({
      ok: true,
      message: 'Lead registrado correctamente',
      id: lead.id,
    });

  } catch (error) {
    console.error('Error en preventa:', error);

    if (error instanceof z.ZodError) {
      console.error('Error de validación:', error.errors);
      return res.status(400).json({
        error: 'validation_error',
        message: 'Datos inválidos',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        })),
      });
    }

    // Error genérico
    return res.status(500).json({
      error: 'internal_error',
      message: 'Error interno del servidor',
    });
  }
});

export default router;

