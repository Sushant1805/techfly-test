import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { shadows, radius } from '../../data/mockData';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  variant?: 'default' | 'soft' | 'elevated';
}

export const Card = ({ children, style, variant = 'default' }: CardProps) => {
  return (
    <View style={[styles.card, variant === 'elevated' && styles.elevated, variant === 'soft' && styles.soft, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius['2xl'],
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...shadows.card,
  },
  elevated: {
    ...shadows.soft,
    borderWidth: 0,
  },
  soft: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    ...shadows.card,
  },
});
