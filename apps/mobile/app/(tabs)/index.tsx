import { ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * Wallet tab — displays address, balance, and recent transactions.
 * Connects to walletd via @gxqs/sdk GxqsClient.
 */
export default function WalletScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>ADDRESS</Text>
        <Text style={styles.address} numberOfLines={1} ellipsizeMode="middle">
          gxqs1—connect walletd to load
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>BALANCE</Text>
        <View style={styles.row}>
          <Text style={styles.balance}>0.000000</Text>
          <Text style={styles.unit}>GXQS</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>RECENT TRANSACTIONS</Text>
        <Text style={styles.empty}>No transactions yet</Text>
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
  address: { color: '#00ffe1', fontSize: 13, fontFamily: 'monospace' },
  row: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  balance: { color: '#ffffff', fontSize: 28, fontWeight: '700' },
  unit: { color: '#4a5568', fontSize: 14 },
  empty: { color: '#4a5568', fontSize: 13, textAlign: 'center', paddingVertical: 16 },
});
