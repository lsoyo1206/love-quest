import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Vibration } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/navigation';
import { ROUTES } from '../app/routes';
import PrimaryButton from '../components/PrimaryButton';
import { LEVELS } from '../lib/levels';
import { loadProgress, saveProgress } from '../lib/progress';
import { COUPONS_BY_LEVEL } from '../lib/coupons';
import { grantCoupon } from '../lib/couponStore';
import { playSfx } from '../lib/sfx';

type Props = NativeStackScreenProps<RootStackParamList, 'Level'>;

export default function LevelScreen({ route, navigation }: Props) {
  // ✅ 여기 있던 'ㄴ' 제거해야 함
  const { level } = route.params;

  const data = useMemo(() => LEVELS[level], [level]);

  const [lineIndex, setLineIndex] = useState(0);
  const [stage, setStage] = useState<'story' | 'choice' | 'result'>('story');
  const [result, setResult] = useState<'success' | 'fail' | null>(null);

  const currentLine = data.story[lineIndex];
  const isLastLine = lineIndex >= data.story.length - 1;

  const next = () => {
    if (!isLastLine) setLineIndex((v) => v + 1);
    else setStage('choice');
  };

  const handleChoice = async (isCorrect?: boolean) => {
    // ✅ 오답
    if (!isCorrect) {
      Vibration.vibrate(50);
      setResult('fail');
      setStage('result');
      return;
    }

    // ✅ 정답: “확실한 액션” 넣기 (효과음/저장/쿠폰/알럿/이동)
    try {
      // 0) 효과(선택)
      Vibration.vibrate(30);
      await playSfx('use'); // ding.mp3

      // 1) 레벨 클리어 저장
      const p = await loadProgress();
      const nextP = { ...p, cleared: { ...p.cleared, [level]: true } };
      await saveProgress(nextP);

      // 2) 쿠폰 지급 (B안 보상)
      const coupon = COUPONS_BY_LEVEL[level as 1 | 2 | 3 | 4];

      // ✅ 쿠폰 매핑이 없으면 여기서 조용히 죽지 말고 경고
      if (!coupon?.id) {
        console.log('쿠폰 매핑 없음:', level, coupon);
        Alert.alert(
          '쿠폰 설정 오류',
          `레벨 ${level} 쿠폰이 설정되어 있지 않아.\nCOUPONS_BY_LEVEL[${level}] 확인해줘!`
        );
        // 그래도 클리어는 됐으니 결과 화면은 보여주자
      } else {
        await grantCoupon(coupon.id);
      }

      setResult('success');
      setStage('result');

      // 3) 추가 액션: 인벤토리/맵 선택
      Alert.alert('🎉 클리어!', '쿠폰을 인벤토리에 넣어뒀어 🎟️', [
        { text: '인벤토리 보기', onPress: () => navigation.navigate(ROUTES.Inventory) },
        { text: '맵으로', onPress: () => navigation.navigate(ROUTES.Map) },
      ]);
    } catch (e) {
      console.log('정답 처리 실패:', e);
      Alert.alert('오류', '저장/쿠폰 처리 중 문제가 생겼어. 다시 시도해줘!');
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{data.title}</Text>

      {stage === 'story' && (
        <>
          <View style={styles.card}>
            <Text style={styles.story}>{currentLine}</Text>
          </View>

          <View style={{ height: 14 }} />
          <PrimaryButton title={isLastLine ? '선택지로 가기' : '다음'} onPress={next} />
          <View style={{ height: 10 }} />
          <Pressable onPress={() => navigation.navigate(ROUTES.Map)}>
            <Text style={styles.link}>맵으로</Text>
          </Pressable>
        </>
      )}

      {stage === 'choice' && (
        <>
          <View style={styles.card}>
            <Text style={styles.story}>선택해줘 👇</Text>
          </View>
          <View style={{ height: 12 }} />
          <View style={{ gap: 10 }}>
            {data.choices.map((c, idx) => (
              <Pressable key={idx} style={styles.choice} onPress={() => handleChoice(c.isCorrect)}>
                <Text style={styles.choiceText}>{c.text}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}

      {stage === 'result' && (
        <>
          <View style={styles.card}>
            <Text style={styles.story}>
              {result === 'success' ? '클리어! 쿠폰을 획득했어 🎟️' : '앗… 다시 도전해볼까?'}
            </Text>
          </View>

          <View style={{ height: 14 }} />
          {result === 'success' ? (
            <PrimaryButton title="맵으로 돌아가기" onPress={() => navigation.navigate(ROUTES.Map)} />
          ) : (
            <PrimaryButton
              title="다시 해보기"
              onPress={() => {
                setLineIndex(0);
                setStage('story');
                setResult(null);
              }}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 24, backgroundColor: '#F9FAFB', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '900', marginBottom: 14 },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  story: { fontSize: 16, lineHeight: 22, color: '#111827' },
  link: { textAlign: 'center', color: '#6B7280' },
  choice: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  choiceText: { color: 'white', fontWeight: '800', fontSize: 15 },
});