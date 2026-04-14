import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors, shadows, radius, typography } from '../../data/mockData';

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const Button = ({
  onPress,
  title,
  variant = 'primary',
  fullWidth = true,
  isLoading,
  icon,
  size = 'md',
  disabled,
}: ButtonProps) => {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isDanger = variant === 'danger';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      disabled={isLoading || disabled}
      style={[
        styles.container,
        size === 'sm' && styles.sm,
        size === 'lg' && styles.lg,
        isPrimary && styles.primaryBg,
        isPrimary && shadows.glow,
        isOutline && styles.outlineBg,
        isDanger && styles.dangerBg,
        !isPrimary && !isOutline && !isDanger && styles.ghostBg,
        fullWidth && { width: '100%' },
        (disabled || isLoading) && { opacity: 0.5 },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={isPrimary || isDanger ? '#FFF' : colors.primary} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconWrap}>{icon}</View>}
          <Text
            style={[
              styles.text,
              size === 'sm' && styles.textSm,
              size === 'lg' && styles.textLg,
              isPrimary || isDanger ? styles.primaryText : styles.secondaryText,
              isOutline && styles.outlineText,
            ]}
          >
            {title.toUpperCase()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: radius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sm: {
    height: 40,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
  },
  lg: {
    height: 60,
    borderRadius: radius['2xl'],
    paddingHorizontal: 28,
  },
  primaryBg: {
    backgroundColor: colors.primary,
  },
  outlineBg: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  ghostBg: {
    backgroundColor: colors.primaryMuted,
  },
  dangerBg: {
    backgroundColor: '#DC2626',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 13,
    fontWeight: typography.black,
    letterSpacing: 1.5,
  },
  textSm: {
    fontSize: 11,
    letterSpacing: 1.2,
  },
  textLg: {
    fontSize: 14,
    letterSpacing: 1.8,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: colors.primary,
  },
  outlineText: {
    color: colors.textPrimary,
  },
});
