import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, typography } from '../../data/mockData';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default' | 'purple';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  success:  { bg: colors.successBg,  text: colors.success },
  warning:  { bg: colors.warningBg,  text: colors.warning },
  danger:   { bg: colors.dangerBg,   text: colors.danger },
  info:     { bg: colors.primaryMuted, text: colors.primary },
  default:  { bg: '#F1F5F9',          text: colors.textSecondary },
  purple:   { bg: '#F3E8FF',          text: '#7C3AED' },
};

export const Badge = ({ label, variant = 'default' }: BadgeProps) => {
  const v = variantStyles[variant];
  return (
    <View style={[styles.badge, { backgroundColor: v.bg }]}>
      <Text style={[styles.label, { color: v.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 10,
    fontWeight: typography.black,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});
