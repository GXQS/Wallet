import { ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * Telemetry tab — daemon uptime, restart count, health status for all daemons.
 */

const DAEMONS = ['walletd', 'minerd', 'validatord', 'telemetryd', 'deployerd'] as const;

export default function TelemetryScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.colDaemon}>DAEMON</Text>
          <Text style={styles.colStatus}>STATUS</Text>
          <Text style={styles.colUptime}>UPTIME</Text>
          <Text style={styles.colRst}>RST</Text>
        </View>
        {DAEMONS.map((daemon) => (
          <View key={daemon} style={styles.row}>
            <Text style={styles.daemonName}>{daemon}</Text>
            <Text style={styles.statusIdle}>IDLE</Text>
            <Text style={styles.uptime}>—</Text>
            <Text style={styles.rst}>0</Text>
          </View>
        ))}
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>0 / 5 running</Text>
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
  headerRow: { flexDirection: 'row', marginBottom: 8 },
  colDaemon: { flex: 2, color: '#4a5568', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  colStatus: { flex: 1.5, color: '#4a5568', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  colUptime: { flex: 1.5, color: '#4a5568', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  colRst: {
    width: 32,
    color: '#4a5568',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'right',
  },
  row: { flexDirection: 'row', paddingVertical: 6, borderTopWidth: 1, borderTopColor: '#1a2332' },
  daemonName: { flex: 2, color: '#a0aec0', fontSize: 12, fontFamily: 'monospace' },
  statusIdle: { flex: 1.5, color: '#4a5568', fontSize: 11 },
  uptime: { flex: 1.5, color: '#718096', fontSize: 11 },
  rst: { width: 32, color: '#718096', fontSize: 11, textAlign: 'right' },
  badge: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#ff00d4',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  badgeText: { color: '#ff00d4', fontSize: 11, fontWeight: '700' },
});
