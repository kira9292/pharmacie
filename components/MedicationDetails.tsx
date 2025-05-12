import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { Pill as Pills, Stethoscope, Package, FileText, Calendar, List } from 'lucide-react-native';
import { PrescriptionType, MedicationType } from '@/types/notifications';

type MedicationDetailsProps = {
  medication: string;
  prescription?: PrescriptionType;
  isPrescriptionRequired: boolean;
};

export default function MedicationDetails({ medication, prescription, isPrescriptionRequired }: MedicationDetailsProps) {
  const getMedicationDetails = (name: string) => {
    const medications = {
      'Paracétamol': {
        description: 'Analgésique et antipyrétique utilisé pour traiter la douleur et la fièvre.',
        form: 'Comprimé',
        dosage: '500mg',
        prescriptionRequired: false
      },
      'Amoxicilline': {
        description: 'Antibiotique de la famille des bêta-lactamines (pénicillines).',
        form: 'Gélule',
        dosage: '500mg',
        prescriptionRequired: true
      },
      'Ibuprofène': {
        description: 'Anti-inflammatoire non stéroïdien utilisé pour traiter la douleur, la fièvre et l\'inflammation.',
        form: 'Comprimé',
        dosage: '400mg',
        prescriptionRequired: false
      },
      'Oméprazole': {
        description: 'Inhibiteur de la pompe à protons utilisé pour traiter les troubles gastriques.',
        form: 'Gélule gastro-résistante',
        dosage: '20mg',
        prescriptionRequired: true
      },
      'Aspirine': {
        description: 'Analgésique, antipyrétique et anti-inflammatoire.',
        form: 'Comprimé',
        dosage: '500mg',
        prescriptionRequired: false
      },
    };
    
    return medications[name as keyof typeof medications] || {
      description: 'Médicament recommandé par un médecin prescripteur.',
      form: 'Variable',
      dosage: 'Variable',
      prescriptionRequired: true
    };
  };
  
  const details = getMedicationDetails(medication);
  
  const renderMedicationList = (medications: MedicationType[]) => {
    return medications.map((med, index) => (
      <View key={index} style={styles.medicationItem}>
        <View style={styles.medicationItemHeader}>
          <Pills size={16} color={Colors.primary[600]} />
          <Text style={styles.medicationItemName}>{med.name}</Text>
        </View>
        <Text style={styles.medicationItemDetails}>
          {med.quantity}x {med.dosage}
        </Text>
        {med.instructions && (
          <Text style={styles.medicationInstructions}>
            {med.instructions}
          </Text>
        )}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informations médicament</Text>
      
      <View style={styles.card}>
        <View style={styles.iconRow}>
          <Pills size={24} color={Colors.primary[600]} />
          <Text style={styles.medicationName}>{medication}</Text>
        </View>
        
        <Text style={styles.description}>{details.description}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Package size={16} color={Colors.neutral[600]} />
            <Text style={styles.detailText}>Forme: {details.form}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Stethoscope size={16} color={Colors.neutral[600]} />
            <Text style={styles.detailText}>Dosage: {details.dosage}</Text>
          </View>

          <View style={[styles.prescriptionBadge, 
            isPrescriptionRequired ? styles.prescriptionRequired : styles.prescriptionOptional
          ]}>
            <FileText size={16} color={isPrescriptionRequired ? Colors.error[600] : Colors.success[600]} />
            <Text style={[styles.prescriptionText, 
              isPrescriptionRequired ? styles.prescriptionRequiredText : styles.prescriptionOptionalText
            ]}>
              {isPrescriptionRequired ? 'Ordonnance requise' : 'Sans ordonnance'}
            </Text>
          </View>
        </View>

        {prescription && (
          <View style={styles.prescriptionSection}>
            <Text style={styles.prescriptionTitle}>Détails de l'ordonnance</Text>
            
            <View style={styles.prescriptionDetails}>
              <View style={styles.prescriptionRow}>
                <Stethoscope size={16} color={Colors.primary[600]} />
                <Text style={styles.prescriptionText}>Dr. {prescription.doctorName}</Text>
              </View>
              
              <View style={styles.prescriptionRow}>
                <Calendar size={16} color={Colors.primary[600]} />
                <Text style={styles.prescriptionText}>
                  Prescrit le: {new Date(prescription.prescriptionDate).toLocaleDateString('fr-FR')}
                </Text>
              </View>

              <View style={styles.medicationList}>
                <View style={styles.medicationListHeader}>
                  <List size={16} color={Colors.primary[600]} />
                  <Text style={styles.medicationListTitle}>Médicaments prescrits</Text>
                </View>
                {renderMedicationList(prescription.medications)}
              </View>

              {prescription.image && (
                <Image 
                  source={{ uri: prescription.image }}
                  style={styles.prescriptionImage}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.neutral[700],
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.neutral[700],
    marginLeft: 6,
  },
  prescriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 8,
  },
  prescriptionRequired: {
    backgroundColor: Colors.error[50],
  },
  prescriptionOptional: {
    backgroundColor: Colors.success[50],
  },
  prescriptionText: {
    fontSize: 14,
    marginLeft: 4,
  },
  prescriptionRequiredText: {
    color: Colors.error[600],
  },
  prescriptionOptionalText: {
    color: Colors.success[600],
  },
  prescriptionSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  prescriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 12,
  },
  prescriptionDetails: {
    backgroundColor: Colors.neutral[50],
    padding: 12,
    borderRadius: 8,
  },
  prescriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  medicationList: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: 12,
  },
  medicationListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  medicationListTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary[700],
    marginLeft: 8,
  },
  medicationItem: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  medicationItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  medicationItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral[800],
    marginLeft: 8,
  },
  medicationItemDetails: {
    fontSize: 13,
    color: Colors.neutral[600],
    marginBottom: 4,
  },
  medicationInstructions: {
    fontSize: 13,
    color: Colors.neutral[600],
    fontStyle: 'italic',
  },
  prescriptionImage: {
    width: '100%',
    height: 200,
    marginTop: 12,
    borderRadius: 8,
  },
});