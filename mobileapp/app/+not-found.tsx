import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { colors, typography, radius } from '@/src/data/mockData';
import { Button } from '@/src/components/ui/Button';
import { HeartOff } from 'lucide-react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Lost?' }} />
      <View style={s.container}>
        <View style={s.iconCircle}>
          <HeartOff size={48} color={colors.danger} strokeWidth={2} />
        </View>
        <Text style={s.title}>Screen Not Found</Text>
        <Text style={s.subtitle}>
          The page you are looking for might have been moved or doesn't exist.
        </Text>

        <Link href="/" asChild>
          <Button 
            title="Back to Dashboard" 
            variant="primary" 
            size="lg"
            fullWidth={false}
          />
        </Link>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: colors.background,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: radius.full,
    backgroundColor: colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: typography.black,
    color: colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: typography.medium,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
});
