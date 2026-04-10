import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { completedRounds } from '@/services/roundEngine/mock-rounds';
import { calculateRoundTotal } from '@/services/scoring/totals';

export default function RoundsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Round History</Text>
      <Text style={styles.subtitle}>Saved rounds should be easy to scan and compare.</Text>

      {completedRounds.map((round) => (
        <View key={round.id} style={styles.card}>
          <Text style={styles.cardTitle}>{round.courseName}</Text>
          <Text style={styles.cardMeta}>
            {new Date(round.startedAt).toLocaleDateString()} • Score {calculateRoundTotal(round)}
          </Text>
          <Text style={styles.cardCopy}>
            {round.holeScores.filter((hole) => hole.strokes !== null).length} holes recorded
          </Text>
        </View>
      ))}
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
    gap: 6
  },
  cardTitle: {
    color: '#18231d',
    fontSize: 18,
    fontWeight: '700'
  },
  cardMeta: {
    color: '#315139',
    fontWeight: '600'
  },
  cardCopy: {
    color: '#526154'
  }
});
