import nodemailer from 'nodemailer';
import { env } from './env';
import { IPreVentaLead } from '../models/PreVentaLead';

// Crear transporter solo si las credenciales están disponibles
const createTransporter = () => {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    console.log('Configuración de email no completa, saltando envío de emails');
    return null;
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
};

const transporter = createTransporter();

// Función para enviar email de notificación de preventa
export const sendPreventaNotification = async (lead: IPreVentaLead): Promise<void> => {
  console.log('📧 Iniciando envío de email de notificación...');
  console.log('📧 Lead ID:', lead.id);
  console.log('📧 Email del lead:', lead.email);
  console.log('📧 Servicio:', lead.interes);
  
  if (!transporter) {
    console.log('❌ Transporter no disponible, saltando envío de email de notificación');
    console.log('❌ SMTP_HOST:', env.SMTP_HOST);
    console.log('❌ SMTP_USER:', env.SMTP_USER);
    console.log('❌ SMTP_PASS:', env.SMTP_PASS ? '***configurado***' : 'NO CONFIGURADO');
    return;
  }

  console.log('✅ Transporter disponible, procediendo con envío...');
  console.log('📧 Destinatario:', env.EMAIL_TO);
  console.log('📧 Remitente:', env.EMAIL_FROM);

  try {
    const mailOptions = {
      from: `"FisioMuv Recovery" <${env.EMAIL_FROM}>`,
      to: env.EMAIL_TO,
      subject: `🚀 Nueva Reserva de Preventa - ${lead.interes}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🚀 Nueva Reserva de Preventa</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Información del Cliente</h3>
            <p><strong>Email:</strong> ${lead.email}</p>
            ${lead.nombre ? `<p><strong>Nombre:</strong> ${lead.nombre}</p>` : ''}
            <p><strong>📱 Teléfono:</strong> <a href="tel:${lead.telefono}" style="color: #059669; text-decoration: none;">${lead.telefono}</a></p>
            <p><strong>Servicio de Interés:</strong> ${lead.interes}</p>
            <p><strong>Origen:</strong> ${lead.origen}</p>
            <p><strong>Fecha:</strong> ${new Date(lead.timestamp).toLocaleString('es-ES')}</p>
          </div>

          ${lead.utm ? `
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #0369a1; margin-top: 0;">Datos de Marketing</h4>
            ${lead.utm.source ? `<p><strong>Fuente:</strong> ${lead.utm.source}</p>` : ''}
            ${lead.utm.medium ? `<p><strong>Medio:</strong> ${lead.utm.medium}</p>` : ''}
            ${lead.utm.campaign ? `<p><strong>Campaña:</strong> ${lead.utm.campaign}</p>` : ''}
            ${lead.utm.term ? `<p><strong>Término:</strong> ${lead.utm.term}</p>` : ''}
            ${lead.utm.content ? `<p><strong>Contenido:</strong> ${lead.utm.content}</p>` : ''}
          </div>
          ` : ''}

          ${lead.referer ? `
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #92400e; margin-top: 0;">Referencia</h4>
            <p><strong>Página de origen:</strong> ${lead.referer}</p>
          </div>
          ` : ''}

          <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #065f46; margin-top: 0;">Próximos Pasos</h4>
            <p>1. <strong>Contactar al cliente</strong> para confirmar la reserva</p>
            <p>   📞 <a href="tel:${lead.telefono}" style="color: #059669; text-decoration: none;">${lead.telefono}</a></p>
            <p>   💬 <a href="https://wa.me/${lead.telefono.replace(/\D/g, '')}" target="_blank" style="color: #25D366; text-decoration: none;">WhatsApp</a></p>
            <p>2. Proporcionar información sobre el servicio ${lead.interes}</p>
            <p>3. Coordinar fecha y hora para la sesión</p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            Este email fue generado automáticamente por el sistema de FisioMuv Recovery.
          </p>
        </div>
      `,
    };

    console.log('📧 Enviando email de notificación...');
    console.log('📧 Opciones de email:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      htmlLength: mailOptions.html.length
    });
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email de notificación enviado correctamente al administrador');
    console.log('✅ Resultado del envío:', {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected
    });
  } catch (error: any) {
    console.error('❌ Error enviando email de notificación:', error);
    console.error('❌ Detalles del error:', {
      code: error.code,
      response: error.response,
      responseCode: error.responseCode,
      command: error.command
    });
    throw error;
  }
};

// Función para enviar email de confirmación al cliente
export const sendClientConfirmation = async (lead: IPreVentaLead): Promise<void> => {
  console.log('📧 Iniciando envío de email de confirmación al cliente...');
  console.log('📧 Cliente email:', lead.email);
  console.log('📧 Servicio:', lead.interes);
  
  if (!transporter) {
    console.log('❌ Transporter no disponible, saltando envío de email de confirmación');
    return;
  }

  console.log('✅ Transporter disponible, procediendo con envío de confirmación...');

  try {
    const mailOptions = {
      from: `"FisioMuv Recovery" <${env.EMAIL_FROM}>`,
      to: lead.email,
      subject: `✅ Reserva Confirmada - ${lead.interes}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">✅ ¡Reserva Confirmada!</h2>
          
          <p>Hola${lead.nombre ? ` ${lead.nombre}` : ''},</p>
          
          <p>¡Gracias por tu interés en <strong>FisioMuv Recovery</strong>! Hemos recibido tu reserva para el servicio de <strong>${lead.interes}</strong>.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Detalles de tu Reserva</h3>
            <p><strong>Servicio:</strong> ${lead.interes}</p>
            <p><strong>Fecha de registro:</strong> ${new Date(lead.timestamp).toLocaleString('es-ES')}</p>
            <p><strong>Estado:</strong> Pendiente de confirmación</p>
          </div>

          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #0369a1; margin-top: 0;">¿Qué sigue?</h4>
            <p>Nuestro equipo se pondrá en contacto contigo pronto para:</p>
            <ul>
              <li>Confirmar la fecha y hora de tu sesión</li>
              <li>Proporcionarte más información sobre el servicio</li>
              <li>Resolver cualquier duda que puedas tener</li>
            </ul>
          </div>

          <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #065f46; margin-top: 0;">Contacto</h4>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <p><strong>Email:</strong> ${env.EMAIL_FROM}</p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            Gracias por confiar en FisioMuv Recovery. ¡Esperamos verte pronto!
          </p>
        </div>
      `,
    };

    console.log('📧 Enviando email de confirmación al cliente...');
    console.log('📧 Opciones de email:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      htmlLength: mailOptions.html.length
    });
    
    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Email de confirmación enviado al cliente: ${lead.email}`);
    console.log('✅ Resultado del envío:', {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected
    });
  } catch (error: any) {
    console.error('❌ Error enviando email de confirmación:', error);
    console.error('❌ Detalles del error:', {
      code: error.code,
      response: error.response,
      responseCode: error.responseCode,
      command: error.command
    });
    // No lanzamos el error para que no afecte el guardado del lead
  }
};
