import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/navigation';
import { ROUTES } from '../app/routes';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>LOVE QUEST</Text>
      <Text style={styles.sub}>Player 1 : 규리</Text>

      <View style={{ height: 18 }} />
      <PrimaryButton title="START" onPress={() => navigation.navigate(ROUTES.Map)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#F9FAFB' },
  title: { fontSize: 40, fontWeight: '900', letterSpacing: 1 },
  sub: { marginTop: 10, fontSize: 16, color: '#374151' },
});