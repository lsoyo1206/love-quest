import { Audio } from 'expo-av';
import { Vibration } from 'react-native';

// ✅ 파일이 있으면 이 경로로 재생됨
//    (src/assets/sfx/ding.mp3 를 의미)
const SFX = {
  use: require('../assets/sfx/ding.mp3'),
} as const;

export async function playSfx(name: keyof typeof SFX = 'use') {
  try {
    const { sound } = await Audio.Sound.createAsync(SFX[name], { shouldPlay: true });

    sound.setOnPlaybackStatusUpdate((status) => {
      // @ts-ignore
      if (status?.didJustFinish) sound.unloadAsync();
    });
  } catch (e) {
    // ✅ 파일이 없거나 재생 실패하면 진동으로 대체 (앱 안 죽게)
    Vibration.vibrate(40);
    console.log('sfx error', e);
  }
}