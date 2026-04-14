import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, typography } from '../../data/mockData';

// Deterministic color based on name — matches webapp's CustomerAvatar logic
const avatarPalette = [
  { bg: '#EAF0FF', text: colors.primary },
  { bg: '#DCFCE7', text: colors.success },
  { bg: '#FEF3C7', text: colors.warning },
  { bg: '#F3E8FF', text: '#7C3AED' },
  { bg: '#FFE4E6', text: '#E11D48' },
  { bg: '#E0F2FE', text: '#0284C7' },
];

const getColor = (name: string) => {
  const idx = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % avatarPalette.length;
  return avatarPalette[idx];
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

interface AvatarProps {
  name: string;
  size?: number;
}

export const Avatar = ({ name, size = 44 }: AvatarProps) => {
  const { bg, text } = getColor(name);
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
        },
      ]}
    >
      <Text style={[styles.initials, { color: text, fontSize: size * 0.35 }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: typography.black,
    letterSpacing: 0.5,
  },
});
