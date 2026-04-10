import { StyleSheet, Text, View } from 'react-native';

type HoleMapProps = {
  holeNumber: number;
  par: number;
  teeDistance: number;
};

export function HoleMap({ holeNumber, par, teeDistance }: HoleMapProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Hole Map</Text>
      <Text style={styles.copy}>
        Hole {holeNumber} • Par {par} • {teeDistance} yards
      </Text>
      <Text style={styles.note}>
        `react-native-maps` is installed, but this starter screen keeps the map layer out of the
        first pass until live course geometry is wired in.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff9ef',
    borderRadius: 22,
    padding: 18,
    gap: 8
  },
  title: {
    color: '#18231d',
    fontSize: 18,
    fontWeight: '700'
  },
  copy: {
    color: '#36513b',
    fontWeight: '600'
  },
  note: {
    color: '#566458',
    lineHeight: 20
  }
});
