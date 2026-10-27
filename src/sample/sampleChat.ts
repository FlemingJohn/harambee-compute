import type { ChatMessage } from '../types/ChatMessage.ts'

export const sampleChat: ChatMessage[] = [
  { id: 'question', author: 'student', text: 'Explain photosynthesis for a Form 2 student.' },
  {
    id: 'answer',
    author: 'pool',
    text: 'Photosynthesis is how green plants make their own food. The leaves take in sunlight through the green pigment chlorophyll, water from the soil through the roots, and carbon dioxide from the air through tiny holes called stomata. Using the light energy, the plant turns water and carbon dioxide into glucose, its food, and gives out oxygen, which we breathe.'
  }
]
