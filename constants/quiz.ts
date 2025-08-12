// constants/quiz.ts
import { TourChapter } from './types';

export interface QuizQuestion {
  id: string;
  chapter: TourChapter;
  questionText: string;
  possibleAnswers: string[];
  correctAnswerIndex: number;
  userAnswerIndex?: number;
}

export const sampleQuestions: QuizQuestion[] = [
  // ─────────── Aktivierung / Driving Assist (ActivateDA) ───────────
  {
    id: 'DAQ1',
    chapter: TourChapter.ActivateDA,
    questionText:
      'Wie können Sie als Fahrer*in das teilautomatisierte Fahren aktivieren?',
    possibleAnswers: [
      'Durch das Drücken des Bremspedals',
      'Durch das Drücken der Aktivierungstaste',
      'Durch das Loslassen des Lenkrads',
      'Durch einen Doppelklick auf die Set-Taste',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'DAQ2',
    chapter: TourChapter.ActivateDA,
    questionText:
      'Leuchtet das Automationssymbol in weiß, ist das teilautomatisierte Fahren verfügbar.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'DAQ3',
    chapter: TourChapter.ActivateDA,
    questionText:
      'In welcher Farbe leuchtet das Automationssymbol bei erfolgreicher Aktivierung des teilautomatisierten Fahrens?',
    possibleAnswers: ['Blau', 'Rot', 'Gelb', 'Grün'],
    correctAnswerIndex: 3,
  },

  // ───────── Verkehrszeichen-Assistent (Verkehrszeichen) ─────────
  {
    id: 'VQ1',
    chapter: TourChapter.Verkehrszeichen,
    questionText:
      'Bei einem neuen Tempolimit wird die erkannte Geschwindigkeit automatisch übernommen.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'VQ2',
    chapter: TourChapter.Verkehrszeichen,
    questionText:
      'Wo wird Ihnen als Fahrer*in das erkannte Tempolimit angezeigt?',
    possibleAnswers: [
      'Im Seitenspiegel',
      'Im Display ',
      'Auf dem Lenkrad',
      'Im Rückspiegel',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'VQ3',
    chapter: TourChapter.Verkehrszeichen,
    questionText:
      'Können Sie als Fahrer*in die Geschwindigkeit während der teilautomatisierten Fahrt (nach der Übernahme) manuell anpassen?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 0,
  },

  // ─────────── Abstandsregeltempomat (ACC) ───────────
  
  {
    id: 'AQ1',
    chapter: TourChapter.ACC,
    questionText:
      'Ist das teilautomatisierte Fahren aktiviert, hält das Fahrzeug automatisch den Abstand zum Vorderfahrzeug.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'AQ2',
    chapter: TourChapter.ACC,
    questionText:
      'Für Sie als Fahrer*in ist es nicht möglich, den Abstand zum Vorderfahrzeug individuell anzupassen.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 1,
  },
  {
    id: 'AQ3',
    chapter: TourChapter.ACC,
    questionText:
      'Wie wird der eingestellte Abstand zum Vorderfahrzeug im Display symbolisch dargestellt?',
    possibleAnswers: [
      'Durch ein rotes Lenkrad',
      'Durch Blinken des Automationssymbols',
      'Durch Striche vor dem Fahrzeug',
      'Durch ein weißes Dreieck',
    ],
    correctAnswerIndex: 2,
  },

  // ─────────── Ampelerkennung ───────────
  {
    id: 'AMPQ1',
    chapter: TourChapter.LKA,
    questionText:
      'Erkennt das Fahrzeug Ampeln, wenn das teilautomatisierte Fahren aktiv ist?',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'AMPQ2',
    chapter: TourChapter.LKA,
    questionText:
      'Das Fahrzeug bremst automatisch, wenn es eine rote Ampel erkannt hat.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'AMPQ3',
    chapter: TourChapter.LKA,
    questionText:
      'Im Stillstand erkennt das Fahrzeug grüne Ampeln und fährt automatisch wieder los.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 1,
  },


  // ─────────── Spurführungsassistent ───────────
  {
    id: 'SWQ1',
    chapter: TourChapter.Spurwechsel,
    questionText:
      'Ist das teilautomatisierte Fahren aktiv, hält das Fahrzeug die Spur selbstständig.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'SWQ2',
    chapter: TourChapter.Spurwechsel,
    questionText:
      'Können Sie als Fahrer*in das Lenkrad loslassen, wenn das teilautomatisierte Fahren aktiv ist?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 0,
  },
  {
    id: 'SWQ3',
    chapter: TourChapter.Spurwechsel,
    questionText:
      'Das Fahrzeug schlägt eigenständig Spurwechsel vor, auch wenn es die Verkehrssituation nicht zulässt.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 1,
  },

  // ─────────── Notbremsassistent ───────────
  {
    id: 'NBQ1',
    chapter: TourChapter.Notbremse,
    questionText:
      'Funktioniert der Notbremsassistent nur bei statischen Hindernissen?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 1,
  },
  {
    id: 'NBQ2',
    chapter: TourChapter.Notbremse,
    questionText:
      'In welcher Situation greift der Notbremsassistent ein?',
    possibleAnswers: [
      'Wenn der Fahrer eine Warnung durch die Set-Taste bestätigt',
      'Nur in bestimmten Verkehrssituationen',
      'Wenn eine Kollision mit einem Hindernis, einer Person oder einem Fahrzeug droht',
      'Nur bei niedrigen Geschwindigkeiten unter 30 km/h',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'NBQ3',
    chapter: TourChapter.Notbremse,
    questionText:
      'Was passiert, wenn der Notbremsassistent eine Kollisionsgefahr registriert?',
    possibleAnswers: [
      'Der Fahrer wird dazu aufgefordert, selbst zu bremsen',
      'Das Fahrzeug bremst automatisch bis zum Stillstand',
      'Das Fahrzeug reagiert gar nicht.',
      'Der Fahrer erhält nur eine visuelle Warnung',
    ],
    correctAnswerIndex: 1,
  },

  // ─────────── Deaktivierung ───────────
  {
    id: 'DQ1',
    chapter: TourChapter.Deaktivierung,
    questionText: 'Wie kann das teilautomatisierte Fahren deaktiviert werden?',
    possibleAnswers: [
      'Durch langes Drücken der Set-Taste',
      'Durch kurzes Antippen des Blinkers',
      'Durch erneutes Drücken der Aktivierungstaste',
      'Durch manuelles Einstellen des Abstands über die Abstandstasten',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'DQ2',
    chapter: TourChapter.Deaktivierung,
    questionText:
      'Kann das teilautomatisierte Fahren durch manuelles Eingreifen (z.B. Lenken oder Bremsen) durch Sie als Fahrer*in deaktiviert werden?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 0,
  },
  {
    id: 'DQ3',
    chapter: TourChapter.Deaktivierung,
    questionText:
      'Wie wird angezeigt, dass das teilautomatisierte Fahren deaktiviert wurde?',
    possibleAnswers: [
      'Durch ein rotes Ausrufezeichen im Display',
      'Durch ein akustisches Signal und eine Vibration im Lenkrad',
      'Durch das Erlöschen der Lenkradlichter und das weiße Automationssymbol',
      'Durch eine Warnmeldung im Head-Up-Display',
    ],
    correctAnswerIndex: 2,
  },

  // ─────────── Risiken & Verantwortung ───────────
  {
    id: 'RQ1',
    chapter: TourChapter.Risiken,
    questionText:
      'Das teilautomatisierte Fahren entbindet Sie als Fahrer*in von der Verantwortung, sodass Sie nicht mehr aufmerksam sein müssen.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 1,
  },
  {
    id: 'RQ2',
    chapter: TourChapter.Risiken,
    questionText:
      'Müssen Sie als Fahrer*in jederzeit auf unvorhersehbare Situationen vorbereitet sein?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 0,
  },
  {
    id: 'RQ3',
    chapter: TourChapter.Risiken,
    questionText:
      'Warum dürfen Sie sich als Fahrer*in nicht vollständig auf die Assistenzsysteme verlassen?',
    possibleAnswers: [
      'Weil die Systeme zu langsam reagieren',
      'Weil das teilautomatisierte Fahrzeug immer 10 km/h schneller fährt als erlaubt',
      'Weil die Systeme Fehler machen können, ohne Sie als Fahrer*in zu warnen',
      'Weil das teilautomatisierte Fahren nur auf Autobahnen nutzbar ist',
    ],
    correctAnswerIndex: 2,
  },
];
