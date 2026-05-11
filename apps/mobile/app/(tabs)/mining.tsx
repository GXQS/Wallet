import { ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * Mining tab — GPU Compute Overview, CPU/GPU utilization bars, shares accepted/rejected, hashrate.
 */

const GPU_UNITS = [
  { id: 'GPU:0', util: 0, temp: 0, mem: 0 },
  { id: 'GPU:1', util: 0, temp: 0, mem: 0 },
] as const;

const SPARKLINE = [12, 18, 9, 24, 31, 15, 8, 20, 14, 22, 10, 16] as const;

export default function MiningScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Status card */}
      <View style={styles.card}>
        <Text style={styles.label}>STATUS</Text>
        <View style={styles.statusRow}>
          <View style={styles.dotIdle} />
          <Text style={styles.statusText}>IDLE — minerd not running</Text>
        </View>
      </View>

      {/* Hashrate card */}
      <View style={styles.card}>
        <Text style={styles.label}>HASHRATE</Text>
        <View style={styles.hashrateRow}>
          <Text style={styles.hashrate}>0</Text>
          <Text style={styles.hashrateUnit}>MH/s</Text>
        </View>
        {/* Sparkline */}
        <View style={styles.sparkline}>
          {SPARKLINE.map((v, i) => (
            <View key={i} style={[styles.sparkBar, { height: Math.max(v * 0.6, 3) }]} />
          ))}
        </View>
      </View>

      {/* GPU Compute Overview */}
      <View style={styles.card}>
        <Text style={styles.label}>GPU COMPUTE OVERVIEW</Text>
        {GPU_UNITS.map((gpu) => (
          <View key={gpu.id} style={styles.gpuUnit}>
            <View style={styles.gpuHeader}>
              <Text style={styles.gpuId}>{gpu.id}</Text>
              <View style={styles.gpuMeta}>
                <Text style={styles.gpuTemp}>
                  Temp: <Text style={styles.warnText}>{gpu.temp > 0 ? `${gpu.temp}°C` : '—'}</Text>
                </Text>
                <Text style={styles.gpuMem}>
                  VRAM: <Text style={styles.primaryText}>{gpu.mem > 0 ? `${gpu.mem}%` : '—'}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.bar}>
              <View style={[styles.barFillGpu, { width: `${gpu.util}%` as `${number}%` }]} />
            </View>
            <Text style={styles.utilPct}>{gpu.util}%</Text>
          </View>
        ))}
      </View>

      {/* CPU utilisation */}
      <View style={styles.card}>
        <Text style={styles.label}>CPU UTILISATION</Text>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>UTIL</Text>
          <Text style={styles.metricValue}>0%</Text>
        </View>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: '0%', backgroundColor: '#00ffe1' }]} />
        </View>
      </View>

      {/* Shares */}
      <View style={styles.card}>
        <Text style={styles.label}>SHARES</Text>
        <View style={styles.sharesRow}>
          <View style={styles.shareItem}>
            <Text style={styles.shareLabel}>ACCEPTED</Text>
            <Text style={[styles.shareValue, { color: '#00ff94' }]}>0</Text>
          </View>
          <View style={styles.shareDivider} />
          <View style={styles.shareItem}>
            <Text style={styles.shareLabel}>REJECTED</Text>
            <Text style={[styles.shareValue, { color: '#ff4444' }]}>0</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const C = {
  bg: '#060a14',
  surface: '#0d1424',
  border: '#1a2540',
  primary: '#00ffe1',
  accent: '#ff00d4',
  warning: '#ff9500',
  muted: '#4a5568',
  text: '#e2e8f0',
} as const;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: C.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 12,
  },
  label: { color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 10 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dotIdle: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.warning },
  statusText: { color: '#718096', fontSize: 13 },
  hashrateRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 10 },
  hashrate: { color: C.accent, fontSize: 40, fontWeight: '700' },
  hashrateUnit: { color: C.muted, fontSize: 15 },
  sparkline: { flexDirection: 'row', alignItems: 'flex-end', height: 28, gap: 2 },
  sparkBar: { flex: 1, backgroundColor: C.accent + '50', borderRadius: 2 },
  gpuUnit: { marginBottom: 12 },
  gpuHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  gpuId: { color: C.text, fontSize: 12, fontFamily: 'monospace', fontWeight: '700' },
  gpuMeta: { flexDirection: 'row', gap: 12 },
  gpuTemp: { color: C.muted, fontSize: 11 },
  gpuMem: { color: C.muted, fontSize: 11 },
  warnText: { color: C.warning },
  primaryText: { color: C.primary },
  bar: {
    height: 6,
    backgroundColor: C.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 2,
  },
  barFill: { height: '100%', borderRadius: 3 },
  barFillGpu: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: C.accent,
  },
  utilPct: { color: C.muted, fontSize: 10, textAlign: 'right' },
  metricRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  metricLabel: { color: C.muted, fontSize: 12 },
  metricValue: { color: C.text, fontSize: 12, fontWeight: '700' },
  sharesRow: { flexDirection: 'row', alignItems: 'center' },
  shareItem: { flex: 1, alignItems: 'center' },
  shareDivider: { width: 1, height: 32, backgroundColor: C.border },
  shareLabel: {
    color: C.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  shareValue: { fontSize: 24, fontWeight: '700' },
});
