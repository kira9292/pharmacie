import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMockNotifications } from '@/hooks/useMockNotifications';
import HistoryItem from '@/components/HistoryItem';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/Colors';
import { Calendar, Check, X } from 'lucide-react-native';

export default function HistoryScreen() {
  const { processedRequests } = useMockNotifications();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'available', 'unavailable'

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refreshing data
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredHistory = filter === 'all' 
    ? processedRequests 
    : processedRequests.filter(item => 
        filter === 'available' ? item.response === 'available' : item.response === 'unavailable'
      );

  // Group history items by date
  const groupedHistory = filteredHistory.reduce((acc, item) => {
    const date = new Date(item.timestamp).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const sections = Object.keys(groupedHistory).map(date => ({
    date,
    data: groupedHistory[date],
  })).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>Tous</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'available' && styles.activeFilter]}
          onPress={() => setFilter('available')}
        >
          <View style={styles.filterContent}>
            <Check size={16} color={filter === 'available' ? Colors.success[600] : Colors.neutral[600]} />
            <Text style={[styles.filterText, filter === 'available' && styles.activeFilterText]}>Disponible</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'unavailable' && styles.activeFilter]}
          onPress={() => setFilter('unavailable')}
        >
          <View style={styles.filterContent}>
            <X size={16} color={filter === 'unavailable' ? Colors.error[600] : Colors.neutral[600]} />
            <Text style={[styles.filterText, filter === 'unavailable' && styles.activeFilterText]}>Indisponible</Text>
          </View>
        </TouchableOpacity>
      </View>

      {sections.length > 0 ? (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>{new Date(item.date).toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              })}</Text>
              {item.data.map(historyItem => (
                <HistoryItem key={historyItem.id} item={historyItem} />
              ))}
            </View>
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={[Colors.primary[500]]}
            />
          }
        />
      ) : (
        <EmptyState
          icon={<Calendar size={48} color={Colors.neutral[400]} />}
          title="Aucun historique"
          message="Votre historique de demandes traitées apparaîtra ici."
        />
      )}
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
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: Colors.primary[100],
  },
  filterText: {
    fontSize: 14,
    color: Colors.neutral[600],
    fontWeight: '500',
    marginLeft: 4,
  },
  activeFilterText: {
    color: Colors.primary[700],
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[700],
    marginBottom: 12,
    textTransform: 'capitalize',
  },
});