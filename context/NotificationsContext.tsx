import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { NotificationType } from '@/types/notifications';
import { generateMockNotifications } from '@/utils/mockData';

interface NotificationsContextType {
  activeRequests: NotificationType[];
  processedRequests: NotificationType[];
  isLoading: boolean;
  getNotificationById: (id: string) => NotificationType | undefined;
  respondToRequest: (id: string, response: 'available' | 'unavailable') => void;
  generateNewRequest: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [activeRequests, setActiveRequests] = useState<NotificationType[]>([]);
  const [processedRequests, setProcessedRequests] = useState<NotificationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load
    loadMockData();
  }, []);

  const loadMockData = async () => {
    setIsLoading(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData = generateMockNotifications(3);
    setActiveRequests(mockData);
    setIsLoading(false);
  };

  const generateNewRequest = () => {
    const newRequest = generateMockNotifications(1)[0];
    setActiveRequests(prev => [...prev, newRequest]);
  };

  const getNotificationById = (id: string): NotificationType | undefined => {
    return [...activeRequests, ...processedRequests].find(req => req.id === id);
  };

  const respondToRequest = (id: string, response: 'available' | 'unavailable') => {
    const request = activeRequests.find(req => req.id === id);
    if (!request) return;

    // Process the request
    const processedRequest = { ...request, response };

    // Move from active to processed
    setActiveRequests(prev => prev.filter(req => req.id !== id));
    setProcessedRequests(prev => [processedRequest, ...prev]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        activeRequests,
        processedRequests,
        isLoading,
        getNotificationById,
        respondToRequest,
        generateNewRequest,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}