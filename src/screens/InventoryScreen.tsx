import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/navigation';
import { ROUTES } from '../app/routes';
import { COUPONS_BY_LEVEL, Coupon } from '../lib/coupons';
import { loadCouponState, resetCoupons, useCoupon } from '../lib/couponStore';
import PrimaryButton from '../components/PrimaryButton';
import { playSfx } from '../lib/sfx';

type Props = NativeStackScreenProps<RootStackParamList, 'Inventory'>;

type CouponState = Record<string, { owned: boolean; used: boolean }>;

export default function InventoryScreen({ navigation }: Props) {
  const [state, setState] = useState<CouponState>({});

  const refresh = async () => {
    try {
      const s = await loadCouponState();
      // ✅ 혹시 store가 undefined/null을 리턴해도 안전하게
      setState((s ?? {}) as CouponState);
    } catch (e) {
      console.log('loadCouponState error', e);
      setState({});
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', refresh);
    refresh();
    return unsub;
  }, [navigation]);

  // ✅ 레벨 배열을 "as const"로 고정해서 타입/런타임 둘 다 안정화
  const levels = useMemo(() => [1, 2, 3, 4] as const, []);

  // ✅ 쿠폰 데이터가 깨졌을 때도 앱이 죽지 않게 방어
  const coupons: Coupon[] = useMemo(() => {
    const list = levels
      .map((lv) => COUPONS_BY_LEVEL?.[lv])
      .filter(Boolean) as Coupon[];

    return list;
  }, [levels]);

  // ✅ coupons가 비정상(0개)면 화면에서 안내만 띄우고 끝 (크래시 방지)
  if (!coupons.length) {
    return (
      <View style={[styles.wrap, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 18, fontWeight: '900' }}>쿠폰 데이터를 못 찾았어 😢</Text>
        <Text style={{ marginTop: 8, color: '#374151', textAlign: 'center' }}>
          src/lib/coupons.ts 에서 COUPONS_BY_LEVEL가 1~4 키를 갖고 있는지 확인해줘!
        </Text>
        <View style={{ height: 16 }} />
        <PrimaryButton title="맵으로" onPress={() => navigation.navigate(ROUTES.Map)} />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>🎒 인벤토리</Text>
      <Text style={styles.sub}>레벨 클리어로 쿠폰을 모으고, 눌러서 “사용하기” 해봐!</Text>

      <ScrollView contentContainerStyle={{ paddingVertical: 12, gap: 12 }}>
        {coupons.map((c) => {
          const owned = !!state?.[c.id]?.owned;
          const used = !!state?.[c.id]?.used;

          return (
            <View key={c.id} style={[styles.card, !owned && styles.locked]}>
              <View style={styles.row}>
                <Text style={styles.emoji}>{c.emoji}</Text>

                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    {c.title} {used ? '✅ USED' : owned ? '🎟️ OWNED' : '🔒 LOCKED'}
                  </Text>

                  <Text style={styles.cardDesc}>
                    {owned ? c.desc : '이 쿠폰은 아직 잠겨있어. 해당 레벨을 클리어해줘!'}
                  </Text>
                </View>
              </View>

              <View style={{ height: 10 }} />

              {owned && !used ? (
                <PrimaryButton
                  title="사용하기"
                  onPress={() => {
                    Alert.alert('쿠폰 사용', '진짜 사용할래?', [
                      { text: '취소', style: 'cancel' },
                      {
                        text: '사용',
                        style: 'destructive',
                        onPress: async () => {
                          try {
                            await useCoupon(c.id);
                            await playSfx('use');
                            await refresh();
                          } catch (e) {
                            console.log('useCoupon error', e);
                          }
                        },
                      },
                    ]);
                  }}
                />
              ) : (
                <Pressable style={styles.fakeBtn} disabled>
                  <Text style={styles.fakeBtnText}>{used ? '이미 사용했어' : '획득하면 사용 가능'}</Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={{ height: 10 }} />
      <PrimaryButton title="맵으로" onPress={() => navigation.navigate(ROUTES.Map)} />
      <View style={{ height: 10 }} />

      <Pressable
        onPress={() => {
          Alert.alert('초기화', '쿠폰/진행도를 초기화할까?', [
            { text: '취소', style: 'cancel' },
            {
              text: '초기화',
              style: 'destructive',
              onPress: async () => {
                try {
                  await resetCoupons();
                  await refresh();
                } catch (e) {
                  console.log('resetCoupons error', e);
                }
              },
            },
          ]);
        }}
      >
        <Text style={styles.reset}>쿠폰 초기화</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 24, backgroundColor: '#F9FAFB' },
  title: { marginTop: 30, fontSize: 26, fontWeight: '900' },
  sub: { marginTop: 6, color: '#374151' },

  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  locked: { opacity: 0.55 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  emoji: { fontSize: 34 },
  cardTitle: { fontSize: 16, fontWeight: '900' },
  cardDesc: { marginTop: 6, color: '#374151', lineHeight: 20 },

  fakeBtn: {
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    opacity: 0.35,
  },
  fakeBtnText: { color: 'white', fontWeight: '800' },
  reset: { textAlign: 'center', color: '#6B7280' },
});