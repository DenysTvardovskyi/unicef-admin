export interface INewsletter{
    id: string
    type: "text" | "exercice" | "advice"
    content: string
    frequency: "daily" | "weekly"
    groupId: number
}