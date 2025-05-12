export type MedicationType = {
  name: string;
  dosage: string;
  quantity: number;
  instructions?: string;
};

export type PrescriptionType = {
  id: string;
  medications: MedicationType[];
  doctorName: string;
  prescriptionDate: string;
  expiryDate: string;
  image?: string;
};

export type NotificationType = {
  id: string;
  medicationName: string;
  patientName: string;
  patientLocation: string;
  distance: number;
  timestamp: number;
  response?: 'available' | 'unavailable';
  prescription?: PrescriptionType;
  isPrescriptionRequired: boolean;
};