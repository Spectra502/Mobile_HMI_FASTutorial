// context/QuizServiceContext.tsx
import { QuizQuestion, sampleQuestions } from '@/constants/quiz'
import { TourChapter } from '@/constants/types'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

/*
export type QuizQuestion = {
  id: string
  chapter: TourChapter
  questionText: string
  possibleAnswers: string[]
  correctAnswerIndex: number
  userAnswerIndex?: number
}
*/
export interface QuizService {
  questions: QuizQuestion[]
  totalQuestions: (chapter?: TourChapter) => number
  question: (chapter: TourChapter, index: number) => QuizQuestion | undefined
  setUserAnswer: (questionID: string, selectedIndex: number) => void
  isAnsweredCorrectly: (questionID: string) => boolean
  totalCorrectAnswers: () => number
  incorrectlyAnsweredQuestions: () => { chapter: TourChapter; question: QuizQuestion }[]
}

const QuizServiceContext = createContext<QuizService | undefined>(undefined)

export function QuizServiceProvider({ children }: { children: ReactNode }) {
  // TODO: replace with real loading logic / API calls
  const [questions, setQuestions] = useState<QuizQuestion[]>([])

  // Example stub data loader
  // useEffect(() => { fetchQuestions().then(setQuestions) }, [])
  useEffect(() => {
    // in future you might fetch from a server here
    setQuestions(sampleQuestions)
  }, [])

  const totalQuestions = (chapter?: TourChapter) =>
    chapter
      ? questions.filter((q) => q.chapter === chapter).length
      : questions.length

  const question = (chapter: TourChapter, idx: number) =>
    questions.filter((q) => q.chapter === chapter)[idx]

  const setUserAnswer = (questionID: string, selectedIndex: number) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === questionID ? { ...q, userAnswerIndex: selectedIndex } : q
      )
    )
  }

  const isAnsweredCorrectly = (questionID: string) => {
    const q = questions.find((x) => x.id === questionID)
    return !!(
      q &&
      typeof q.userAnswerIndex === 'number' &&
      q.userAnswerIndex === q.correctAnswerIndex
    )
  }

  const totalCorrectAnswers = () =>
    questions.filter((q) => isAnsweredCorrectly(q.id)).length

  const incorrectlyAnsweredQuestions = () =>
    questions
      .filter((q) => typeof q.userAnswerIndex === 'number' && !isAnsweredCorrectly(q.id))
      .map((q) => ({ chapter: q.chapter, question: q }))

  const value: QuizService = {
    questions,
    totalQuestions,
    question,
    setUserAnswer,
    isAnsweredCorrectly,
    totalCorrectAnswers,
    incorrectlyAnsweredQuestions,
  }

  return (
    <QuizServiceContext.Provider value={value}>
      {children}
    </QuizServiceContext.Provider>
  )
}

export function useQuizService(): QuizService {
  const ctx = useContext(QuizServiceContext)
  if (!ctx) throw new Error('useQuizService must be inside QuizServiceProvider')
  return ctx
}