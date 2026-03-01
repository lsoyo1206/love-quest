import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'LOVE_QUEST_REWARDS_V1';

export type RewardsState = Record<string, boolean>;

export async function loadRewards(): Promise<RewardsState> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function unlockReward(rewardKey: string) {
  const rewards = await loadRewards();
  rewards[rewardKey] = true;
  await AsyncStorage.setItem(KEY, JSON.stringify(rewards));
}

export async function isUnlocked(rewardKey: string) {
  const rewards = await loadRewards();
  return !!rewards[rewardKey];
}