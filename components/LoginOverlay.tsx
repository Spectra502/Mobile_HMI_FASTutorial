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

  // Create a new profile
  async function handleCreate() {
    const cleanCode = code.trim();
    if (!cleanCode) return;
    console.log('📝 Trying to create profile:', cleanCode);
    console.log('📦 Current profiles before create:', profiles);

    try {
      await createProfile(cleanCode);
      console.log('✅ After create, profiles:', profiles);
      setSuccessText('Ihr Profil wurde erfolgreich erstellt!');
      setPage('success');
    } catch (err) {
      console.warn('⛔ createProfile error:', err);
      setAlertText(`Profil mit Code "${cleanCode}" existiert bereits.`);
    }
  }

  // Log in to an existing profile
  async function handleLogin() {
    const cleanCode = code.trim();
    if (!cleanCode) return;
    console.log('📝 Trying to login with code:', cleanCode);
    console.log('📦 Current profiles for login:', profiles);

    const ok = await loadProfile(cleanCode);
    console.log('🔍 loadProfile result:', ok, 'activeProfile:', activeProfile);
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
                style={styles.btn}
                onPress={() => {
                  clean();
                  setPage('login');
                }}
              >
                <Text style={styles.btnText}>Ja</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
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
            />
            {alertText ? <Text style={styles.alert}>{alertText}</Text> : null}
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.back}
                onPress={() => {
                  clean();
                  setPage('question');
                }}
              >
                <Text style={styles.backText}>Zurück</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={handleCreate}
                disabled={!code.trim()}
              >
                <Text style={styles.btnText}>Erstellen</Text>
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
            />
            {alertText ? <Text style={styles.alert}>{alertText}</Text> : null}
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.back}
                onPress={() => {
                  clean();
                  setPage('question');
                }}
              >
                <Text style={styles.backText}>Zurück</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={handleLogin}
                disabled={!code.trim()}
              >
                <Text style={styles.btnText}>Login</Text>
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
            >
              <Text style={styles.btnText}>OK</Text>
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
  back: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: { color: '#333' },
  btn: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    backgroundColor: '#007aff',
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
