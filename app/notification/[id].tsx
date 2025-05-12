import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useMockNotifications } from '@/hooks/useMockNotifications';
import { ArrowLeft, Check, X, MapPin, Clock, FileText } from 'lucide-react-native';
import ResponseButtons from '@/components/ResponseButtons';
import MedicationDetails from '@/components/MedicationDetails';
import Colors from '@/constants/Colors';
import { getTimeSince } from '@/utils/dateUtils';

export default function NotificationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getNotificationById, respondToRequest } = useMockNotifications();
  const notification = getNotificationById(id as string);

  if (!notification) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Détail de la demande</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Demande non trouvée</Text>
          <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
            <Text style={styles.goBackText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleResponse = (response: 'available' | 'unavailable') => {
    respondToRequest(notification.id, response);
    router.back();
  };

  const isProcessed = notification.response !== undefined;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail de la demande</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statusContainer}>
          {isProcessed ? (
            <View style={[
              styles.statusBadge, 
              notification.response === 'available' ? styles.availableBadge : styles.unavailableBadge
            ]}>
              {notification.response === 'available' ? (
                <Check size={16} color={Colors.success[700]} />
              ) : (
                <X size={16} color={Colors.error[700]} />
              )}
              <Text style={[
                styles.statusText,
                notification.response === 'available' ? styles.availableText : styles.unavailableText
              ]}>
                {notification.response === 'available' ? 'Disponible' : 'Indisponible'}
              </Text>
            </View>
          ) : (
            <View style={styles.statusBadge}>
              <Clock size={16} color={Colors.warning[700]} />
              <Text style={styles.statusText}>En attente</Text>
            </View>
          )}
        </View>

        <Text style={styles.title}>Demande de {notification.medicationName}</Text>
        
        {notification.isPrescriptionRequired && (
          <View style={styles.prescriptionBadge}>
            <FileText size={16} color={Colors.primary[600]} />
            <Text style={styles.prescriptionBadgeText}>Médicament sous ordonnance</Text>
          </View>
        )}
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <MapPin size={16} color={Colors.neutral[500]} />
            <Text style={styles.metaText}>{notification.patientLocation}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={16} color={Colors.neutral[500]} />
            <Text style={styles.metaText}>Il y a {getTimeSince(notification.timestamp)}</Text>
          </View>
        </View>

        <MedicationDetails 
          medication={notification.medicationName}
          prescription={notification.prescription}
          isPrescriptionRequired={notification.isPrescriptionRequired}
        />

        {!isProcessed && (
          <ResponseButtons 
            onRespond={handleResponse}
            style={styles.responseButtons}
          />
        )}

        <View style={styles.patientInfo}>
          <Text style={styles.sectionTitle}>Informations patient</Text>
          <View style={styles.patientCard}>
            <View style={styles.patientHeader}>
              <View style={styles.patientAvatar}>
                <Text style={styles.avatarInitial}>{notification.patientName.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.patientName}>{notification.patientName}</Text>
                <Text style={styles.patientDistance}>{notification.distance} km de votre pharmacie</Text>
              </View>
            </View>
            <Text style={styles.patientNote}>
              Note: Les informations de contact du patient seront disponibles une fois que vous aurez répondu à la demande.
            </Text>
          </View>
        </View>

        {notification.prescription && (
          <View style={styles.prescriptionSection}>
            <Text style={styles.sectionTitle}>Ordonnance</Text>
            <View style={styles.prescriptionCard}>
              <View style={styles.prescriptionHeader}>
                <FileText size={20} color={Colors.primary[600]} />
                <Text style={styles.prescriptionTitle}>
                  Ordonnance du Dr. {notification.prescription.doctorName}
                </Text>
              </View>
              
              <Text style={styles.prescriptionDate}>
                Prescrit le: {new Date(notification.prescription.prescriptionDate).toLocaleDateString('fr-FR')}
              </Text>
              
              <Text style={styles.prescriptionDate}>
                Valable jusqu'au: {new Date(notification.prescription.expiryDate).toLocaleDateString('fr-FR')}
              </Text>

              {notification.prescription.image && (
                <Image 
                  source={{ uri: notification.prescription.image }}
                  style={styles.prescriptionImage}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
  },
  content: {
    flex: 1,
  },
  statusContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.warning[100],
  },
  availableBadge: {
    backgroundColor: Colors.success[100],
  },
  unavailableBadge: {
    backgroundColor: Colors.error[100],
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.warning[700],
    marginLeft: 4,
  },
  availableText: {
    color: Colors.success[700],
  },
  unavailableText: {
    color: Colors.error[700],
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[900],
    paddingHorizontal: 16,
    marginTop: 8,
  },
  prescriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  prescriptionBadgeText: {
    fontSize: 14,
    color: Colors.primary[600],
    marginLeft: 8,
    fontWeight: '500',
  },
  metaContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: 4,
  },
  responseButtons: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  patientInfo: {
    padding: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 12,
  },
  patientCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  patientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarInitial: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.secondary[600],
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
  },
  patientDistance: {
    fontSize: 14,
    color: Colors.neutral[600],
  },
  patientNote: {
    fontSize: 14,
    color: Colors.neutral[600],
    fontStyle: 'italic',
  },
  prescriptionSection: {
    padding: 16,
    paddingTop: 8,
  },
  prescriptionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  prescriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary[700],
    marginLeft: 8,
  },
  prescriptionDate: {
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 8,
  },
  prescriptionImage: {
    width: '100%',
    height: 300,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: Colors.neutral[100],
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[700],
    marginBottom: 16,
  },
  goBackButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary[600],
    borderRadius: 8,
  },
  goBackText: {
    color: Colors.white,
    fontWeight: '600',
  },
});