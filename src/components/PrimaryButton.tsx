import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        disabled && styles.disabled,
        pressed && !disabled && { opacity: 0.85 },
      ]}
    >
      <Text style={styles.txt}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  disabled: { opacity: 0.35 },
  txt: { color: 'white', fontSize: 16, fontWeight: '700' },
});