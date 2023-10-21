export interface IGroup {
  name: string
  description: string
  customersCount: number
  minChildAge: number
  maxChildAge: number
  minChildCount: number
  maxChildCount: number
  customerTraffics: string[]
  recommendationDays: string[]
  recommendationFrequencies: string[]
  conversationStates: any
  id: number
  createdAt: string
  updatedAt: any
}