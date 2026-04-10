import { StyleSheet, Text, View } from 'react-native';

type YardageCardProps = {
  front: number;
  center: number;
  back: number;
};

export function YardageCard({ front, center, back }: YardageCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>GPS Yardages</Text>

      <View style={styles.row}>
        <View style={styles.valueGroup}>
          <Text style={styles.valueLabel}>Front</Text>
          <Text style={styles.value}>{front}</Text>
        </View>

        <View style={styles.centerGroup}>
          <Text style={styles.valueLabel}>Center</Text>
          <Text style={styles.centerValue}>{center}</Text>
        </View>

        <View style={styles.valueGroup}>
          <Text style={styles.valueLabel}>Back</Text>
          <Text style={styles.value}>{back}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a3225',
    borderRadius: 28,
    padding: 20,
    gap: 16
  },
  label: {
    color: '#d5e4d0',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  valueGroup: {
    flex: 1,
    alignItems: 'center',
    gap: 6
  },
  centerGroup: {
    flex: 1.2,
    alignItems: 'center',
    gap: 6
  },
  valueLabel: {
    color: '#c3d3bf',
    fontWeight: '700'
  },
  value: {
    color: '#fff8ec',
    fontSize: 34,
    fontWeight: '800'
  },
  centerValue: {
    color: '#e3c177',
    fontSize: 54,
    fontWeight: '900'
  }
});
