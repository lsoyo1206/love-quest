import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/navigation';
import { ROUTES } from '../app/routes';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'FinalBoss'>;

export default function FinalBossScreen({ navigation }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>FINAL BOSS</Text>
      <Text style={styles.q}>앞으로도 나랑 계속 플레이하시겠습니까?</Text>

      <View style={{ height: 16 }} />
      <PrimaryButton title="YES" onPress={() => navigation.navigate(ROUTES.Ending)} />
      <View style={{ height: 10 }} />
      <PrimaryButton title="물론이지" onPress={() => navigation.navigate(ROUTES.Ending)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#0B1020' },
  title: { color: 'white', fontSize: 26, fontWeight: '900' },
  q: { marginTop: 12, color: 'white', fontSize: 18, lineHeight: 26 },
});