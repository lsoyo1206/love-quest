import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/navigation';
import { ROUTES } from '../app/routes';
import { clearProgress, loadProgress } from '../lib/progress';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

export default function MapScreen({ navigation }: Props) {
  const [cleared, setCleared] = useState<{ [k: number]: boolean }>({});

  const refresh = async () => {
    const p = await loadProgress();
    setCleared(p.cleared);
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', refresh);
    refresh();
    return unsub;
  }, [navigation]);

  const allCleared = !!cleared[1] && !!cleared[2] && !!cleared[3] && !!cleared[4];

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>MAP</Text>

      <View style={styles.grid}>
        {[1, 2, 3, 4].map((lv) => (
          <Pressable
            key={lv}
            style={styles.level}
            onPress={() => navigation.navigate(ROUTES.Level, { level: lv as 1 | 2 | 3 | 4 })}
          >
            <Text style={styles.levelText}>LEVEL {lv}</Text>
            <Text style={styles.badge}>{cleared[lv] ? 'CLEARED ✅' : 'LOCKED 🔒'}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ height: 14 }} />
      <PrimaryButton
        title="FINAL BOSS"
        disabled={!allCleared}
        onPress={() => navigation.navigate(ROUTES.FinalBoss)}
      />
      <PrimaryButton title="🎒 인벤토리" onPress={() => navigation.navigate(ROUTES.Inventory)} />
      <View style={{ height: 10 }} />

      <Pressable
        onPress={async () => {
          await clearProgress();
          await refresh();
        }}
      >
        <Text style={{ color: '#6B7280' }}>진행도 초기화</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 24, backgroundColor: '#F9FAFB' },
  title: { marginTop: 30, fontSize: 28, fontWeight: '900' },
  grid: { marginTop: 16, gap: 12 },
  level: { backgroundColor: 'white', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  levelText: { fontSize: 18, fontWeight: '800' },
  badge: { marginTop: 8, color: '#374151' },
});