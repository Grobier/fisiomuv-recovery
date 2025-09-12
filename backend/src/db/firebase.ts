import admin from 'firebase-admin';
import { env } from '../lib/env';

const initializeFirebase = (): void => {
  try {
    // Verificar si Firebase ya está inicializado
    if (admin.apps.length === 0) {
      // Configuración con credenciales reales
      const serviceAccount = {
        projectId: env.FIREBASE_PROJECT_ID,
        privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        projectId: env.FIREBASE_PROJECT_ID,
      });
      
      console.log('Firebase Admin inicializado correctamente');
    }
  } catch (error) {
    console.error('Error inicializando Firebase:', error);
    process.exit(1);
  }
};

// Obtener instancia de Firestore
const getFirestore = () => {
  return admin.firestore();
};

export { initializeFirebase, getFirestore };
export default initializeFirebase;
