import { View, Text, StyleSheet, FlatList } from 'react-native';
import NotificationCard from './NotificationCard';
import EmptyState from './EmptyState';
import { NotificationType } from '@/types/notifications';
import { Bell } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type ActiveRequestsListProps = {
  requests: NotificationType[];
  isLoading: boolean;
  onRespond: (id: string, response: 'available' | 'unavailable') => void;
};

export default function ActiveRequestsList({ requests, isLoading, onRespond }: ActiveRequestsListProps) {
  if (requests.length === 0) {
    return (
      <EmptyState
        icon={isLoading ? <Bell size={42} color={Colors.primary[400]} /> : <Bell size={42} color={Colors.neutral[400]} />}
        title={isLoading ? "Chargement des demandes..." : "Aucune demande active"}
        message={isLoading ? "Veuillez patienter..." : "Vous n'avez aucune demande de médicament active pour le moment."}
      />
    );
  }

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NotificationCard 
          notification={item} 
          onRespond={onRespond}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
});