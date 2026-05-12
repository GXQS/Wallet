import { ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * Validator tab — commission rate, peers, epoch, performance score.
 */
export default function ValidatorScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>VALIDATOR STATUS</Text>
        <View style={styles.statusRow}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>INACTIVE — validatord not running</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>METRICS</Text>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>COMMISSION</Text>
          <Text style={styles.metricValue}>—</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>PEERS</Text>
          <Text style={styles.metricValue}>—</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>EPOCH</Text>
          <Text style={styles.metricValue}>—</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>PERFORMANCE</Text>
          <Text style={styles.metricValue}>—</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#060a14', padding: 16 },
  card: {
    backgroundColor: '#0d1117',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1a2332',
    padding: 16,
    marginBottom: 12,
  },
  label: { color: '#4a5568', fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4a5568' },
  statusText: { color: '#718096', fontSize: 13 },
  metricRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  metricLabel: { color: '#4a5568', fontSize: 12 },
  metricValue: { color: '#ffffff', fontSize: 12, fontWeight: '700' },
});
