export interface Task {
  taskName: string
  taskDeadline: string
  isComplete: boolean
  people: People[]
  id: number
}

export interface People {
  personName: string
  personAge: number
  personSkills: string[]
}