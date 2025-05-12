import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Bell, MapPin, Check, X, Clock, ChevronRight, FileText } from 'lucide-react-native';
import ResponseButtons from './ResponseButtons';
import Colors from '@/constants/Colors';
import { NotificationType } from '@/types/notifications';
import { getTimeSince } from '@/utils/dateUtils';

type NotificationCardProps = {
  notification: NotificationType;
  onRespond: (id: string, response: 'available' | 'unavailable') => void;
};

export default function NotificationCard({ notification, onRespond }: NotificationCardProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const isProcessed = notification.response !== undefined;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const handleRespond = (response: 'available' | 'unavailable') => {
    onRespond(notification.id, response);
  };

  const handleViewDetails = () => {
    router.push(`/notification/${notification.id}`);
  };

  return (
    <View style={[styles.card, isProcessed && styles.processedCard]}>
      <TouchableOpacity 
        style={styles.cardHeader} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          {isProcessed ? (
            notification.response === 'available' ? (
              <Check size={20} color={Colors.success[600]} />
            ) : (
              <X size={20} color={Colors.error[600]} />
            )
          ) : (
            <Bell size={20} color={Colors.primary[600]} />
          )}
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{notification.medicationName}</Text>
              {notification.isPrescriptionRequired && (
                <View style={styles.prescriptionBadge}>
                  <FileText size={12} color={Colors.primary[600]} />
                  <Text style={styles.prescriptionBadgeText}>Ordonnance</Text>
                </View>
              )}
            </View>
            {isProcessed && (
              <View style={[
                styles.badge,
                notification.response === 'available' ? styles.availableBadge : styles.unavailableBadge
              ]}>
                <Text style={[
                  styles.badgeText,
                  notification.response === 'available' ? styles.availableText : styles.unavailableText
                ]}>
                  {notification.response === 'available' ? 'Disponible' : 'Indisponible'}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.locationRow}>
            <MapPin size={14} color={Colors.neutral[500]} />
            <Text style={styles.locationText}>{notification.patientLocation}</Text>
            <View style={styles.timeContainer}>
              <Clock size={14} color={Colors.neutral[500]} />
              <Text style={styles.timeText}>{getTimeSince(notification.timestamp)}</Text>
            </View>
          </View>
        </View>
        
        <ChevronRight 
          size={20} 
          color={Colors.neutral[400]}
          style={{ transform: [{ rotate: expanded ? '90deg' : '0deg' }] }}
        />
      </TouchableOpacity>
      
      <Animated.View style={[
        styles.expandedContent,
        {
          maxHeight: animatedHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, isProcessed ? 80 : 200],
          }),
          opacity: animatedHeight,
        }
      ]}>
        {isProcessed ? (
          <TouchableOpacity 
            style={styles.viewDetailsButton} 
            onPress={handleViewDetails}
          >
            <Text style={styles.viewDetailsText}>Voir les détails</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionsContainer}>
            <Text style={styles.patientRequestText}>
              Demande de {notification.patientName} à {notification.distance} km
            </Text>
            
            {notification.prescription && (
              <View style={styles.prescriptionPreview}>
                <View style={styles.prescriptionHeader}>
                  <FileText size={16} color={Colors.primary[600]} />
                  <Text style={styles.prescriptionTitle}>Ordonnance du Dr. {notification.prescription.doctorName}</Text>
                </View>
                {notification.prescription.image && (
                  <Image 
                    source={{ uri: notification.prescription.image }}
                    style={styles.prescriptionImage}
                    resizeMode="cover"
                  />
                )}
              </View>
            )}
            
            <ResponseButtons onRespond={handleRespond} style={styles.responseButtons} />
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  processedCard: {
    opacity: 0.85,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginRight: 8,
  },
  prescriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  prescriptionBadgeText: {
    fontSize: 12,
    color: Colors.primary[600],
    marginLeft: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: Colors.success[100],
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
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: 4,
    marginRight: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: Colors.neutral[500],
    marginLeft: 4,
  },
  expandedContent: {
    overflow: 'hidden',
  },
  actionsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  patientRequestText: {
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 16,
  },
  prescriptionPreview: {
    backgroundColor: Colors.neutral[50],
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  prescriptionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary[700],
    marginLeft: 8,
  },
  prescriptionImage: {
    width: '100%',
    height: 120,
    borderRadius: 6,
  },
  responseButtons: {
    marginBottom: 8,
  },
  viewDetailsButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary[50],
    borderRadius: 8,
    margin: 16,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary[600],
  },
});