// components/LoginOverlay.tsx
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useProfile } from '../context/ProfileContext';

type Page = 'question' | 'create' | 'login' | 'success';

const PRIMARY_LABEL = 'Weiter'; // <— change this once to rename the blue button

export default function LoginOverlay({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) {
  const { profiles, activeProfile, createProfile, loadProfile } = useProfile();
  const [page, setPage] = useState<Page>('question');
  const [code, setCode] = useState('');
  const [alertText, setAlertText] = useState('');
  const [successText, setSuccessText] = useState('');

  const clean = () => {
    setCode('');
    setAlertText('');
  };

  async function handleCreate() {
    const cleanCode = code.trim();
    if (!cleanCode) return;
    try {
      await createProfile(cleanCode);
      setSuccessText('Ihr Profil wurde erfolgreich erstellt!');
      setPage('success');
    } catch (err) {
      setAlertText(`Profil mit Code "${cleanCode}" existiert bereits.`);
    }
  }

  async function handleLogin() {
    const cleanCode = code.trim();
    if (!cleanCode) return;
    const ok = await loadProfile(cleanCode);
    if (ok) {
      setSuccessText('Willkommen zurück!');
      setPage('success');
    } else {
      setAlertText(`Profil mit Code "${cleanCode}" nicht gefunden.`);
    }
  }

  function renderInner() {
    switch (page) {
      case 'question':
        return (
          <>
            <Text style={styles.title}>Haben Sie schon ein Profil?</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.btn, styles.half]}
                onPress={() => {
                  clean();
                  setPage('login');
                }}
              >
                <Text style={styles.btnText}>Ja</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.half]}
                onPress={() => {
                  clean();
                  setPage('create');
                }}
              >
                <Text style={styles.btnText}>Nein</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 'create':
        return (
          <>
            <Text style={styles.title}>Neues Profil erstellen</Text>
            <TextInput
              style={styles.input}
              placeholder="Profil-Code"
              value={code}
              onChangeText={setCode}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleCreate} // Enter submits
            />
            {alertText ? <Text style={styles.alert}>{alertText}</Text> : null}
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.back, styles.half]}
                onPress={() => {
                  clean();
                  setPage('question');
                }}
              >
                <Text style={styles.backText}>Zurück</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.btn,
                  styles.half,
                  !code.trim() && styles.btnDisabled, // dim when disabled
                ]}
                onPress={handleCreate}
                disabled={!code.trim()}
                accessibilityLabel={PRIMARY_LABEL}
              >
                <Text style={styles.btnText}>{PRIMARY_LABEL}</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 'login':
        return (
          <>
            <Text style={styles.title}>Bitte Profil-Code eingeben</Text>
            <TextInput
              style={styles.input}
              placeholder="Profil-Code"
              value={code}
              onChangeText={setCode}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleLogin} // Enter submits
            />
            {alertText ? <Text style={styles.alert}>{alertText}</Text> : null}
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.back, styles.half]}
                onPress={() => {
                  clean();
                  setPage('question');
                }}
              >
                <Text style={styles.backText}>Zurück</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.btn,
                  styles.half,
                  !code.trim() && styles.btnDisabled,
                ]}
                onPress={handleLogin}
                disabled={!code.trim()}
                accessibilityLabel={PRIMARY_LABEL}
              >
                <Text style={styles.btnText}>{PRIMARY_LABEL}</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 'success':
        return (
          <>
            <Text style={styles.title}>{successText}</Text>
            <Text style={styles.subtitle}>
              Ihr Code: {activeProfile?.profileCode}
            </Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                clean();
                setPage('question');
                onDismiss();
              }}
              accessibilityLabel={PRIMARY_LABEL}
            >
              <Text style={styles.btnText}>{PRIMARY_LABEL}</Text>
            </TouchableOpacity>
          </>
        );
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.backdrop}
      >
        <View style={styles.card}>{renderInner()}</View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  alert: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    flex: 1,
  },
  back: {
    marginRight: 8,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: { color: '#333' },
  btn: {
    marginLeft: 8,
    padding: 12,
    backgroundColor: '#007aff',
    borderRadius: 8,
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.5, // keep label visible while preventing press
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
