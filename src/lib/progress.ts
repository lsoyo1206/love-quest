import AsyncStorage from '@react-native-async-storage/async-storage';

export type LevelId = 1 | 2 | 3 | 4;
export type Progress = { cleared: Record<LevelId, boolean> };

const KEY = 'LOVE_QUEST_PROGRESS_V1';

export const defaultProgress: Progress = {
  cleared: { 1: false, 2: false, 3: false, 4: false },
};

export async function loadProgress(): Promise<Progress> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return defaultProgress;
  try {
    const parsed = JSON.parse(raw) as Progress;
    return {
      cleared: {
        1: !!parsed?.cleared?.[1],
        2: !!parsed?.cleared?.[2],
        3: !!parsed?.cleared?.[3],
        4: !!parsed?.cleared?.[4],
      },
    };
  } catch {
    return defaultProgress;
  }
}

export async function saveProgress(p: Progress) {
  await AsyncStorage.setItem(KEY, JSON.stringify(p));
}

export async function clearProgress() {
  await AsyncStorage.removeItem(KEY);
}
