import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import DashboardSummary from '@/components/DashboardSummary';
import ActiveRequestsList from '@/components/ActiveRequestsList';
import { useMockNotifications } from '@/hooks/useMockNotifications';
import Colors from '@/constants/Colors';
import { formatDate } from '@/utils/dateUtils';

export default function Dashboard() {
  const { activeRequests, generateNewRequest, isLoading, respondToRequest } = useMockNotifications();
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refreshing data
    await new Promise(resolve => setTimeout(resolve, 1000));
    generateNewRequest();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary[500]]} />
        }
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
          <Text style={styles.welcomeText}>Bienvenue, Pharmacie du Baobab</Text>
          <Text style={styles.subtitleText}>
            Vous avez <Text style={styles.highlightText}>{activeRequests.length}</Text> demande{activeRequests.length !== 1 ? 's' : ''} active{activeRequests.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <DashboardSummary 
          activeRequests={activeRequests.length}
          responsesGiven={12}
          availabilityRate={75}
        />

        <View style={styles.recentRequestsSection}>
          <Text style={styles.sectionTitle}>Demandes récentes</Text>
          <ActiveRequestsList 
            requests={activeRequests} 
            isLoading={isLoading}
            onRespond={respondToRequest}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  welcomeSection: {
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  dateText: {
    fontSize: 14,
    color: Colors.neutral[500],
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.neutral[600],
  },
  highlightText: {
    color: Colors.primary[600],
    fontWeight: '600',
  },
  recentRequestsSection: {
    padding: 16,
    backgroundColor: Colors.white,
    marginTop: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 16,
  },
});