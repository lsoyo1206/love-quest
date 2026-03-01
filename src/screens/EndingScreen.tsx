import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function EndingScreen() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.cake}>🎂</Text>
      <Text style={styles.title}>HAPPY BIRTHDAY, 규리!</Text>
      <Text style={styles.letter}>
        규리야, 우리가 레벨 1부터 여기까지 온 것처럼 앞으로도 같이 스테이지 하나씩 깨자.
        세이브 파일은 내가 평생 들고 있을게. ❤️
      </Text>

      <View style={{ height: 16 }} />
      <PrimaryButton title="다시 보기" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' },
  cake: { fontSize: 70, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: '900' },
  letter: { marginTop: 12, color: '#374151', textAlign: 'center', lineHeight: 22 },
});