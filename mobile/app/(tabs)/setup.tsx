import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { getSupabaseEnvStatus } from '@/services/supabase/client';

const commands = [
  'npm install',
  'npx expo start',
  'npx eas build --platform ios --profile preview',
  'npx eas build --platform android --profile preview'
];

export default function SetupScreen() {
  const envStatus = getSupabaseEnvStatus();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Project Setup</Text>
      <Text style={styles.subtitle}>Windows-first Expo workflow with EAS cloud builds for iOS.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Environment</Text>
        <Text style={styles.copy}>Set these local variables before wiring Supabase:</Text>
        <Text style={styles.code}>EXPO_PUBLIC_SUPABASE_URL</Text>
        <Text style={styles.code}>EXPO_PUBLIC_SUPABASE_ANON_KEY</Text>
        <Text style={styles.copy}>
          Status: {envStatus.configured ? 'configured' : 'missing'} | URL:{' '}
          {envStatus.urlPresent ? 'yes' : 'no'} | anon key {envStatus.anonKeyPresent ? 'yes' : 'no'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Commands</Text>
        {commands.map((command) => (
          <Text key={command} style={styles.code}>
            {command}
          </Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Direction</Text>
        <Text style={styles.copy}>
          Wearables are out of scope for MVP. The engineering focus is course data, GPS yardages,
          scoring, round history, and stats.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 14
  },
  title: {
    color: '#18231d',
    fontSize: 28,
    fontWeight: '800'
  },
  subtitle: {
    color: '#415043',
    marginBottom: 8
  },
  card: {
    backgroundColor: '#fff9ef',
    borderRadius: 22,
    padding: 18,
    gap: 8
  },
  cardTitle: {
    color: '#18231d',
    fontSize: 18,
    fontWeight: '700'
  },
  copy: {
    color: '#455247',
    lineHeight: 20
  },
  code: {
    backgroundColor: '#efe5d2',
    color: '#18231d',
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontWeight: '600'
  }
});
