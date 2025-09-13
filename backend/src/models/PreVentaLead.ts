export type Interes = 'Masaje Manual' | 'Pistola de Percusión' | 'Sauna' | 'Pack Recovery' | 'Pack Express';

export interface UTMData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface IPreVentaLead {
  id?: string;
  email: string;
  nombre?: string;
  telefono: string;
  interes: Interes;
  origen: string;
  timestamp: number;
  utm?: UTMData;
  referer?: string;
  consent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class PreVentaLead {
  public id?: string;
  public email: string;
  public nombre?: string;
  public telefono: string;
  public interes: Interes;
  public origen: string;
  public timestamp: number;
  public utm?: UTMData;
  public referer?: string;
  public consent: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(data: Omit<IPreVentaLead, 'id' | 'createdAt' | 'updatedAt'>) {
    this.email = data.email;
    this.nombre = data.nombre;
    this.telefono = data.telefono;
    this.interes = data.interes;
    this.origen = data.origen || 'landing';
    this.timestamp = data.timestamp;
    this.utm = data.utm;
    this.referer = data.referer;
    this.consent = data.consent;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Método para convertir a objeto plano para Firestore
  toFirestore(): Omit<IPreVentaLead, 'id'> {
    const data: any = {
      email: this.email,
      interes: this.interes,
      origen: this.origen,
      timestamp: this.timestamp,
      consent: this.consent,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    // Agregar teléfono que ahora es requerido
    data.telefono = this.telefono;
    
    // Solo agregar campos opcionales que no sean undefined
    if (this.nombre) data.nombre = this.nombre;
    if (this.utm) data.utm = this.utm;
    if (this.referer) data.referer = this.referer;

    return data;
  }

  // Método estático para crear desde datos de Firestore
  static fromFirestore(data: any, id: string): PreVentaLead {
    const lead = new PreVentaLead({
      email: data.email,
      nombre: data.nombre,
      telefono: data.telefono,
      interes: data.interes,
      origen: data.origen || 'landing',
      timestamp: data.timestamp,
      utm: data.utm,
      referer: data.referer,
      consent: data.consent,
    });
    lead.id = id;
    lead.createdAt = data.createdAt?.toDate() || new Date();
    lead.updatedAt = data.updatedAt?.toDate() || new Date();
    return lead;
  }
}