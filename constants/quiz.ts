// constants/quiz.ts
import { TourChapter } from './types'

export interface QuizQuestion {
  id: string
  chapter: TourChapter
  questionText: string
  possibleAnswers: string[]
  correctAnswerIndex: number
  userAnswerIndex?: number
}

export const sampleQuestions: QuizQuestion[] = [
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
  // for .verkehrszeichen
  {
    id: 'VQ1',
    chapter: TourChapter.LKA,
    questionText:
      'Das Fahrzeug erkennt Tempolimits und andere Verkehrszeichen.',
    possibleAnswers: ['Richtig', 'Falsch'],
    correctAnswerIndex: 0,
  },
  {
    id: 'VQ2',
    chapter: TourChapter.LKA,
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
    chapter: TourChapter.LKA,
    questionText:
      'Können Sie als Fahrer*in die Geschwindigkeit nach der Übernahme manuell anpassen?',
    possibleAnswers: ['Ja', 'Nein'],
    correctAnswerIndex: 0,
  },
  // …and so on for abstand, stau, ampel, lka, spurwechsel, notbremse, deaktivierung, risiken
]
