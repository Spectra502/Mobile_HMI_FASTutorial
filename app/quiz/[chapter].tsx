// app/quiz/[chapter].tsx
import QuestionScreen from '@/components/QuestionScreen'
import { TourChapter } from '@/constants/types'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

export default function QuizRoute() {
  const { chapter, onlyChapter } = useLocalSearchParams<{
    chapter: string
    onlyChapter?: string
  }>()

  return (
    <QuestionScreen
      chapter={chapter as TourChapter}
      onlyChapter={onlyChapter === 'true'}
    />
  )
}
