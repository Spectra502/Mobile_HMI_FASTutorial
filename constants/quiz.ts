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
  // ─────────── Driving Assist (ActivateDA) ───────────
  {
    id: 'DAQ1',
    chapter: TourChapter.ActivateDA,
    questionText:
      'Wie können Sie als Fahrer*in das teilautomatisierte Fahren (DRIVING ASSIST) aktivieren?',
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
      'Leuchtet „DRIVING ASSIST READY“ in weiß, ist das teilautomatisierte Fahren verfügbar.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'DAQ3',
    chapter: TourChapter.ActivateDA,
    questionText:
      'In welcher Farbe leuchtet das Symbol „DRIVING ASSIST“ bei erfolgreicher Aktivierung des teilautomatisierten Fahrens?',
    possibleAnswers: ['Blau', 'Rot', 'Gelb', 'Grün'],
    correctAnswerIndex: 3,
  },

  // ───────── Verkehrszeichen-Assistent (Verkehrszeichen) ─────────
  {
    id: 'VQ1',
    chapter: TourChapter.Verkehrszeichen,
    questionText:
      'Das Fahrzeug erkennt Tempolimits und andere Verkehrszeichen.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'VQ2',
    chapter: TourChapter.Verkehrszeichen,
    questionText:
      'Welche Taste nutzen Sie als Fahrer*in, um eine erkannte Geschwindigkeit zu übernehmen?',
    possibleAnswers: [
      'Abstandstaste',
      'Blinkerhebel',
      'Set-Taste',
      'Aktivierungstaste',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'VQ3',
    chapter: TourChapter.Verkehrszeichen,
    questionText:
      'Können Sie als Fahrer*in die Geschwindigkeit nach der Übernahme manuell anpassen?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 0,
  },

  // ─────────── ACC & Stau-Assistent (ACC) ───────────
  
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
      'Für Sie als Fahrer*in ist es grundsätzlich nicht möglich, den Abstand zum Vorderfahrzeug individuell anzupassen.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 1,
  },
  {
    id: 'AQ3',
    chapter: TourChapter.ACC,
    questionText:
      'Woran erkennen Sie als Fahrer*in, dass der ACC aktiviert ist?',
    possibleAnswers: [
      'Am roten Symbol im Rückspiegel',
      'Am Blinken des Lenkradlichts',
      'Am grünen ACC-Symbol im Display',
      'Am weißen ACC-Symbol im Display',
    ],
    correctAnswerIndex: 2,
  },
  
  {
    id: 'SQ1',
    chapter: TourChapter.ACC,
    questionText:
      'Der Stauassistent wird automatisch bei Geschwindigkeiten unter 60 km/h aktiviert.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'SQ2',
    chapter: TourChapter.ACC,
    questionText: 'Wie fährt das Fahrzeug aus dem Stillstand wieder an?',
    possibleAnswers: [
      'Manuelles Anfahren durch den Fahrer',
      'Automatisch oder durch Drücken der Set-Taste',
      'Nur mit eingeschaltetem Blinker',
      'Durch leichtes Antippen des Bremspedals',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 'SQ3',
    chapter: TourChapter.ACC,
    questionText:
      'Wenn der Stauassistent aktiv ist, können Sie als Fahrer*in den Blick von der Straße abwenden?',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 1,
  },

  // ─────────── Ampelerkennung (LKA enum) ───────────
  {
    id: 'AMPQ1',
    chapter: TourChapter.LKA,
    questionText:
      'Das Fahrzeug erkennt Ampeln und zeigt diese im Display an.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'AMPQ2',
    chapter: TourChapter.LKA,
    questionText:
      'Bremst das Fahrzeug automatisch, wenn es eine rote Ampel erkannt hat und diese von Ihnen als Fahrer*in bestätigt wurde?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 0,
  },
  {
    id: 'AMPQ3',
    chapter: TourChapter.LKA,
    questionText:
      'Wie signalisiert das System, dass eine rote Ampel von Ihnen als Fahrer*in bestätigt wurde?',
    possibleAnswers: [
      'Durch ein akustisches Signal',
      'Durch ein rotes Warnlicht',
      'Durch einen grünen Haken im Display',
      'Durch Vibrieren des Lenkrads',
    ],
    correctAnswerIndex: 2,
  },

  // ─────────── Spurhalte-Assistent (LKA) ───────────
  {
    id: 'LQ1',
    chapter: TourChapter.LKA,
    questionText:
      'Welche Anzeige im Display bestätigt die Aktivierung des Spurhalteassistenten (LKA) im DRIVING ASSIST?',
    possibleAnswers: [
      'Ein rotes Lenkradsymbol',
      'Das grüne LKA-Symbol',
      'Die Geschwindigkeitsangabe',
      'Ein weißes Ausrufezeichen',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 'LQ2',
    chapter: TourChapter.LKA,
    questionText:
      'Ist der Spurhalteassistent aktiv, hält das Fahrzeug die Spur selbstständig.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'LQ3',
    chapter: TourChapter.LKA,
    questionText:
      'Können Sie als Fahrer*in das Lenkrad loslassen, wenn der Spurhalteassistent aktiv ist?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 1,
  },

  // ─────────── Spurwechsel-Assistent ───────────
  {
    id: 'SWQ1',
    chapter: TourChapter.Spurwechsel,
    questionText:
      'Wie wird ein automatischer Spurwechsel durch Sie als Fahrer*in eingeleitet?',
    possibleAnswers: [
      'Durch das Betätigen des Bremspedals',
      'Durch eine Sprachanweisung',
      'Durch Antippen des Blinkers',
      'Durch Erkennen von Fahrbahnmarkierungen',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'SWQ2',
    chapter: TourChapter.Spurwechsel,
    questionText:
      'Das Fahrzeug schlägt eigenständig einen Spurwechsel vor, auch wenn es die Verkehrssituation nicht zulässt.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 1,
  },
  {
    id: 'SWQ3',
    chapter: TourChapter.Spurwechsel,
    questionText:
      'Müssen Sie als Fahrer*in einen vorgeschlagenen Spurwechsel durch das Fahrzeug immer bestätigen, bevor dieser ausgeführt wird?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 0,
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
      'Der DRIVING ASSIST deaktiviert sich automatisch',
      'Der Fahrer erhält nur eine visuelle Warnung',
    ],
    correctAnswerIndex: 1,
  },

  // ─────────── Deaktivierung ───────────
  {
    id: 'DQ1',
    chapter: TourChapter.Deaktivierung,
    questionText: 'Wie kann der DRIVING ASSIST deaktiviert werden?',
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
      'Kann der DRIVING ASSIST durch manuelles Eingreifen (z.B. Lenken oder Bremsen) durch Sie als Fahrer*in deaktiviert werden?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 0,
  },
  {
    id: 'DQ3',
    chapter: TourChapter.Deaktivierung,
    questionText:
      'Wie wird angezeigt, dass der DRIVING ASSIST deaktiviert wurde?',
    possibleAnswers: [
      'Durch ein rotes Ausrufezeichen im Display',
      'Durch ein akustisches Signal',
      'Durch das Erlöschen der Lenkradlichter und des Symbols im Display',
      'Durch eine Warnmeldung im Head-Up-Display',
    ],
    correctAnswerIndex: 2,
  },

  // ─────────── Risiken & Verantwortung ───────────
  {
    id: 'RQ1',
    chapter: TourChapter.Risiken,
    questionText:
      'Das teilautomatisierte Fahren durch den DRIVING ASSIST entbindet Sie als Fahrer*in von der Verantwortung, sodass Sie nicht mehr aufmerksam sein müssen.',
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
      'Warum dürfen Sie sich als Fahrer*in nicht vollständig auf die Assistenzsysteme im DRIVING ASSIST verlassen?',
    possibleAnswers: [
      'Weil die Systeme zu langsam reagieren',
      'Weil das teilautomatisierte Fahrzeug immer 10 km/h schneller fährt als erlaubt',
      'Weil die Systeme Fehler machen können, ohne Sie als Fahrer*in zu warnen',
      'Weil der DRIVING ASSIST nur auf Autobahnen nutzbar ist',
    ],
    correctAnswerIndex: 2,
  },
];
