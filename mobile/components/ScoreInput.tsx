import { Pressable, StyleSheet, Text, View } from 'react-native';

type ScoreInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
};

export function ScoreInput({ label, value, onChange, min, max }: ScoreInputProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => onChange(Math.max(min, value - 1))}>
          <Text style={styles.buttonLabel}>-</Text>
        </Pressable>

        <Text style={styles.value}>{value}</Text>

        <Pressable style={styles.button} onPress={() => onChange(Math.min(max, value + 1))}>
          <Text style={styles.buttonLabel}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2eadc',
    borderRadius: 18,
    padding: 14,
    gap: 12
  },
  label: {
    color: '#223028',
    fontSize: 14,
    fontWeight: '700'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: '#1f5534',
    borderRadius: 14,
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonLabel: {
    color: '#fff8ec',
    fontSize: 22,
    fontWeight: '800'
  },
  value: {
    color: '#18231d',
    fontSize: 28,
    fontWeight: '800'
  }
});
