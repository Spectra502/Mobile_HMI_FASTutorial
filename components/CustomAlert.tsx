import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  text: string;
  style?: 'primary' | 'secondary' | 'destructive';
  onPress: () => void;
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: React.ReactNode;
  buttons: ButtonProps[];
  onClose: () => void; // For backdrop press
}

export default function CustomAlert({
  visible,
  title,
  message,
  buttons,
  onClose,
}: CustomAlertProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{message}</Text>
          <View style={[styles.actions, buttons.length < 2 && { justifyContent: 'center' }]}>
            {buttons.map((button, index) => {
              let btnStyle = styles.primaryBtn;
              let textStyle = styles.primaryText;
              if (button.style === 'secondary') {
                btnStyle = styles.secondaryBtn;
                textStyle = styles.secondaryText;
              } else if (button.style === 'destructive') {
                btnStyle = styles.destructiveBtn;
                textStyle = styles.destructiveText;
              }

              return (
                <TouchableOpacity key={index} style={btnStyle} onPress={button.onPress}>
                  <Text style={textStyle}>{button.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 8, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  body: { fontSize: 16, lineHeight: 22, marginBottom: 24, textAlign: 'center' },
  actions: { flexDirection: 'row-reverse', justifyContent: 'space-around', gap: 12 },
  primaryBtn: { backgroundColor: '#007aff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, flexShrink: 1 },
  primaryText: { color: '#fff', fontWeight: '600', fontSize: 16, textAlign: 'center' },
  secondaryBtn: { borderWidth: 1, borderColor: '#007aff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, flexShrink: 1 },
  secondaryText: { color: '#007aff', fontWeight: '600', fontSize: 16, textAlign: 'center' },
  destructiveBtn: { backgroundColor: '#d32f2f', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, flexShrink: 1 },
  destructiveText: { color: '#fff', fontWeight: '600', fontSize: 16, textAlign: 'center' },
});