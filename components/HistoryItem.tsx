import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { NotificationType } from '@/types/notifications';
import { Check, X, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { getFormattedTime } from '@/utils/dateUtils';

type HistoryItemProps = {
  item: NotificationType;
};

export default function HistoryItem({ item }: HistoryItemProps) {
  const router = useRouter();

  // Ensure the item has a response (it should, since it's in history)
  if (!item.response) {
    return null;
  }

  const handlePress = () => {
    router.push(`/notification/${item.id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        {item.response === 'available' ? (
          <Check size={20} color={Colors.success[600]} />
        ) : (
          <X size={20} color={Colors.error[600]} />
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.medicationName}>{item.medicationName}</Text>
          <Text style={styles.time}>{getFormattedTime(item.timestamp)}</Text>
        </View>
        
        <Text style={styles.patientInfo}>
          Demande de {item.patientName}
        </Text>
        
        <View style={[
          styles.badge,
          item.response === 'available' ? styles.availableBadge : styles.unavailableBadge
        ]}>
          <Text style={[
            styles.badgeText,
            item.response === 'available' ? styles.availableText : styles.unavailableText
          ]}>
            {item.response === 'available' ? 'Disponible' : 'Indisponible'}
          </Text>
        </View>
      </View>
      
      <ChevronRight size={18} color={Colors.neutral[400]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  medicationName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.neutral[800],
  },
  time: {
    fontSize: 12,
    color: Colors.neutral[500],
  },
  patientInfo: {
    fontSize: 13,
    color: Colors.neutral[600],
    marginBottom: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: Colors.success[100],
  },
  unavailableBadge: {
    backgroundColor: Colors.error[100],
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  availableText: {
    color: Colors.success[700],
  },
  unavailableText: {
    color: Colors.error[700],
  },
});