import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMockNotifications } from '@/hooks/useMockNotifications';
import NotificationCard from '@/components/NotificationCard';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/Colors';
import { Bell, BellOff } from 'lucide-react-native';

export default function NotificationsScreen() {
  const { activeRequests, processedRequests, respondToRequest, generateNewRequest, isLoading } = useMockNotifications();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'responded'

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refreshing data
    await new Promise(resolve => setTimeout(resolve, 1000));
    generateNewRequest();
    setRefreshing(false);
  };

  const filteredRequests = filter === 'all' 
    ? [...activeRequests, ...processedRequests].sort((a, b) => b.timestamp - a.timestamp)
    : filter === 'active' 
      ? activeRequests
      : processedRequests;

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>Toutes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'active' && styles.activeFilter]}
          onPress={() => setFilter('active')}
        >
          <Text style={[styles.filterText, filter === 'active' && styles.activeFilterText]}>Actives</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'responded' && styles.activeFilter]}
          onPress={() => setFilter('responded')}
        >
          <Text style={[styles.filterText, filter === 'responded' && styles.activeFilterText]}>Traitées</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
            onRespond={respondToRequest}
          />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={[Colors.primary[500]]}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon={isLoading ? <Bell size={48} color={Colors.primary[400]} /> : <BellOff size={48} color={Colors.neutral[400]} />}
            title={isLoading ? "Chargement des notifications..." : "Aucune notification"}
            message={isLoading ? "Veuillez patienter..." : "Vous n'avez aucune notification pour le moment."}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: Colors.neutral[100],
  },
  activeFilter: {
    backgroundColor: Colors.primary[100],
  },
  filterText: {
    fontSize: 14,
    color: Colors.neutral[600],
    fontWeight: '500',
  },
  activeFilterText: {
    color: Colors.primary[700],
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 12,
  },
});