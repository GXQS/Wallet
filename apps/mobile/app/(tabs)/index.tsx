import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Wallet tab — displays address, balance, and recent transactions.
 * Connects to walletd via @gxqs/sdk GxqsClient.
 */
export default function WalletScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Balance card with glow accent */}
      <View style={styles.balanceCard}>
        <Text style={styles.label}>TOTAL BALANCE</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balance}>0.000000</Text>
          <Text style={styles.unit}>GXQS</Text>
        </View>
        <Text style={styles.usd}>≈ $0.00 USD</Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>TXNS</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>NONCE</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>BLOCK</Text>
          <Text style={styles.statValue}>—</Text>
        </View>
      </View>

      {/* Address card */}
      <View style={styles.card}>
        <Text style={styles.label}>ADDRESS</Text>
        <Text style={styles.address} numberOfLines={1} ellipsizeMode="middle">
          gxqs1—connect walletd to load
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionBtn, styles.actionBtnPrimary]}>
          <Text style={styles.actionBtnPrimaryText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]}>
          <Text style={styles.actionBtnSecondaryText}>Receive</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction list */}
      <View style={styles.card}>
        <Text style={styles.label}>RECENT TRANSACTIONS</Text>
        <Text style={styles.empty}>No transactions yet</Text>
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
  success: '#00ff94',
  muted: '#4a5568',
  text: '#e2e8f0',
  // Hex alpha suffixes for semi-transparent tints on #RRGGBB hex colors
  alpha10: '18', // ~10% opacity
  alpha30: '4d', // ~30% opacity
  alpha25: '40', // ~25% opacity
} as const;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 32 },
  balanceCard: {
    backgroundColor: C.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.primary + C.alpha25,
    padding: 20,
    marginBottom: 12,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  balanceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 4 },
  balance: { color: C.primary, fontSize: 36, fontWeight: '700' },
  unit: { color: C.muted, fontSize: 16, fontWeight: '600' },
  usd: { color: C.muted, fontSize: 12 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statCard: {
    flex: 1,
    backgroundColor: C.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border,
    padding: 12,
    alignItems: 'center',
  },
  statLabel: { color: C.muted, fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  statValue: { color: C.primary, fontSize: 16, fontWeight: '700' },
  card: {
    backgroundColor: C.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 12,
  },
  label: { color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 10 },
  address: { color: C.primary, fontSize: 13, fontFamily: 'monospace' },
  empty: { color: C.muted, fontSize: 13, textAlign: 'center', paddingVertical: 16 },
  actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  actionBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  actionBtnPrimary: { backgroundColor: C.primary + C.alpha10, borderColor: C.primary + C.alpha30 },
  actionBtnPrimaryText: { color: C.primary, fontWeight: '700', fontSize: 14 },
  actionBtnSecondary: { backgroundColor: C.accent + C.alpha10, borderColor: C.accent + C.alpha30 },
  actionBtnSecondaryText: { color: C.accent, fontWeight: '700', fontSize: 14 },
});
