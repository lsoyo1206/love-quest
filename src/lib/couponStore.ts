import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'LOVE_QUEST_COUPONS_V1';

export type CouponState = Record<string, { owned: boolean; used: boolean }>;

export async function loadCouponState(): Promise<CouponState> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function grantCoupon(couponId: string) {
  const state = await loadCouponState();
  state[couponId] = { owned: true, used: state[couponId]?.used ?? false };
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}

export async function useCoupon(couponId: string) {
  const state = await loadCouponState();
  const cur = state[couponId] ?? { owned: true, used: false };
  state[couponId] = { ...cur, owned: true, used: true };
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}

export async function resetCoupons() {
  await AsyncStorage.removeItem(KEY);
}