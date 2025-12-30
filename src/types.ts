import { ReactElement } from 'react'
export interface Video {
  id: string
  title: string
  description: string
  category: string
  duration: string
  level: string
  thumbnail: string
  videoSrc: string
}

export interface QuizQuestion {
  question: string
  video: string
  options: string[]
  correct: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  avatar: string
}


export interface Game {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string | ReactElement 
  features: string[]
  type: string
}


export interface ContactFormData {
  name: string
  email: string
  message: string
  category?: string
  timestamp?: string
}
