import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import Colors from '@/constants/Colors';
import { Bell, CircleCheck as CheckCircle, ChartBar as BarChart3 } from 'lucide-react-native';

type DashboardSummaryProps = {
  activeRequests: number;
  responsesGiven: number;
  availabilityRate: number;
};

export default function DashboardSummary({ activeRequests, responsesGiven, availabilityRate }: DashboardSummaryProps) {
  const progressValue = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withTiming(availabilityRate / 100, { duration: 1000 });
  }, [availabilityRate]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value * 100}%`,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Bell size={20} color={Colors.primary[600]} />
          </View>
          <Text style={styles.statValue}>{activeRequests}</Text>
          <Text style={styles.statLabel}>Demandes actives</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <CheckCircle size={20} color={Colors.success[600]} />
          </View>
          <Text style={styles.statValue}>{responsesGiven}</Text>
          <Text style={styles.statLabel}>Réponses données</Text>
        </View>
      </View>
      
      <View style={styles.availabilitySection}>
        <View style={styles.availabilityHeader}>
          <View style={styles.titleContainer}>
            <BarChart3 size={18} color={Colors.primary[600]} />
            <Text style={styles.availabilityTitle}>Taux de disponibilité</Text>
          </View>
          <Text style={styles.availabilityValue}>{availabilityRate}%</Text>
        </View>
        
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, progressStyle]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsSection: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.neutral[200],
    marginHorizontal: 8,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.neutral[900],
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  availabilitySection: {
    padding: 16,
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral[700],
    marginLeft: 6,
  },
  availabilityValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary[600],
  },
  progressContainer: {
    height: 6,
    backgroundColor: Colors.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary[500],
    borderRadius: 3,
  },
});