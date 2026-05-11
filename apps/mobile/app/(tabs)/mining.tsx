import { ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * Mining tab — GPU/CPU utilization, shares accepted/rejected, hashrate.
 */
export default function MiningScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>STATUS</Text>
        <View style={styles.statusRow}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>IDLE — minerd not running</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>PERFORMANCE</Text>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>GPU UTIL</Text>
          <Text style={styles.metricValue}>0%</Text>
        </View>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: '0%', backgroundColor: '#00ffe1' }]} />
        </View>
        <View style={[styles.metricRow, { marginTop: 12 }]}>
          <Text style={styles.metricLabel}>CPU UTIL</Text>
          <Text style={styles.metricValue}>0%</Text>
        </View>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: '0%', backgroundColor: '#ff00d4' }]} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>SHARES</Text>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>ACCEPTED</Text>
          <Text style={[styles.metricValue, { color: '#00ff94' }]}>0</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>REJECTED</Text>
          <Text style={[styles.metricValue, { color: '#ff4444' }]}>0</Text>
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
  metricRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  metricLabel: { color: '#4a5568', fontSize: 12 },
  metricValue: { color: '#ffffff', fontSize: 12, fontWeight: '700' },
  bar: {
    height: 4,
    backgroundColor: '#1a2332',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: { height: '100%', borderRadius: 2 },
});
