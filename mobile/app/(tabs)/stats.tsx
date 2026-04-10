import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { completedRounds } from '@/services/roundEngine/mock-rounds';
import { calculateDashboardStats } from '@/services/stats/dashboard-stats';

export default function StatsScreen() {
  const stats = calculateDashboardStats(completedRounds);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Performance Stats</Text>
      <Text style={styles.subtitle}>MVP metrics derived from saved round data only.</Text>

      <View style={styles.grid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Average Score</Text>
          <Text style={styles.metricValue}>{stats.averageScore}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Fairway %</Text>
          <Text style={styles.metricValue}>{stats.fairwayPercentage}%</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>GIR %</Text>
          <Text style={styles.metricValue}>{stats.girPercentage}%</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Putts / Round</Text>
          <Text style={styles.metricValue}>{stats.puttsPerRound}</Text>
        </View>
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
  grid: {
    gap: 14
  },
  metricCard: {
    backgroundColor: '#fff9ef',
    borderRadius: 22,
    padding: 20,
    gap: 8
  },
  metricLabel: {
    color: '#46604b',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 0.8
  },
  metricValue: {
    color: '#102017',
    fontSize: 32,
    fontWeight: '800'
  }
});
