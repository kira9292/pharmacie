import { NotificationType, PrescriptionType } from '@/types/notifications';

const medications = [
  'Paracétamol',
  'Amoxicilline',
  'Ibuprofène',
  'Oméprazole',
  'Aspirine',
  'Glucophage',
  'Ranitidine',
  'Loratadine',
  'Doliprane',
  'Azithromycine'
];

const patientNames = [
  'Amadou Diop',
  'Fatou Ndiaye',
  'Ousmane Sow',
  'Aïcha Sarr',
  'Moussa Fall',
  'Mariama Diallo',
  'Ibrahim Gueye',
  'Sophie Mbaye',
  'Omar Cisse',
  'Ndeye Faye'
];

const locations = [
  'Médina, Dakar',
  'Mermoz, Dakar',
  'Ouakam, Dakar',
  'Almadies, Dakar',
  'Plateau, Dakar',
  'Grand Yoff, Dakar',
  'Ngor, Dakar',
  'Point E, Dakar',
  'Sacré Cœur, Dakar',
  'Liberté 6, Dakar'
];

const doctors = [
  'Dr. Sall',
  'Dr. Diagne',
  'Dr. Ba',
  'Dr. Ndiaye',
  'Dr. Faye'
];

const prescriptionRequired = [
  'Amoxicilline',
  'Oméprazole',
  'Azithromycine',
  'Glucophage'
];

function generateMockPrescription(medication: string): PrescriptionType | undefined {
  if (!prescriptionRequired.includes(medication)) {
    return undefined;
  }

  const prescriptionDate = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(prescriptionDate.getDate() + 30); // Prescription valid for 30 days

  return {
    id: Math.random().toString(36).substr(2, 9),
    medications: [
      {
        name: medication,
        dosage: '500mg',
        quantity: Math.floor(Math.random() * 20) + 10,
        instructions: 'Prendre 1 comprimé 3 fois par jour'
      }
    ],
    doctorName: doctors[Math.floor(Math.random() * doctors.length)],
    prescriptionDate: prescriptionDate.toISOString(),
    expiryDate: expiryDate.toISOString(),
    image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg',
  };
}

export function generateMockNotifications(count: number): NotificationType[] {
  const notifications: NotificationType[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomMedication = medications[Math.floor(Math.random() * medications.length)];
    const randomPatient = patientNames[Math.floor(Math.random() * patientNames.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomDistance = (Math.random() * 5 + 0.5).toFixed(1);
    const isPrescriptionRequired = prescriptionRequired.includes(randomMedication);
    
    notifications.push({
      id: Math.random().toString(36).substr(2, 9),
      medicationName: randomMedication,
      patientName: randomPatient,
      patientLocation: randomLocation,
      distance: parseFloat(randomDistance),
      timestamp: Date.now() - Math.floor(Math.random() * 10000000),
      prescription: isPrescriptionRequired ? generateMockPrescription(randomMedication) : undefined,
      isPrescriptionRequired,
    });
  }
  
  return notifications;
}