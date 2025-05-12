import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Check, X } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useState } from 'react';
import Colors from '@/constants/Colors';

type ResponseButtonsProps = {
  onRespond: (response: 'available' | 'unavailable') => void;
  style?: ViewStyle;
};

export default function ResponseButtons({ onRespond, style }: ResponseButtonsProps) {
  const [selectedResponse, setSelectedResponse] = useState<'available' | 'unavailable' | null>(null);
  
  const handleResponse = (response: 'available' | 'unavailable') => {
    setSelectedResponse(response);
    
    // Add a small delay for animation
    setTimeout(() => {
      onRespond(response);
      setSelectedResponse(null);
    }, 400);
  };

  const availableButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          scale: withTiming(selectedResponse === 'available' ? 0.95 : 1, {
            duration: 150,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        }
      ],
      backgroundColor: withTiming(
        selectedResponse === 'available' ? Colors.success[600] : Colors.success[500],
        { duration: 150 }
      ),
    };
  });

  const unavailableButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          scale: withTiming(selectedResponse === 'unavailable' ? 0.95 : 1, {
            duration: 150,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        }
      ],
      backgroundColor: withTiming(
        selectedResponse === 'unavailable' ? Colors.error[600] : Colors.error[500],
        { duration: 150 }
      ),
    };
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.buttonContainer, availableButtonStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleResponse('available')}
          activeOpacity={0.8}
        >
          <Check size={18} color={Colors.white} />
          <Text style={styles.buttonText}>Oui, disponible</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, unavailableButtonStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleResponse('unavailable')}
          activeOpacity={0.8}
        >
          <X size={18} color={Colors.white} />
          <Text style={styles.buttonText}>Non, indisponible</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
});