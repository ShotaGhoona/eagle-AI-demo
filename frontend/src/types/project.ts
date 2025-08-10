export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
}

export interface PhaseStep {
  id: string
  name: string
  status: 'completed' | 'current' | 'upcoming'
  color: string
}

export interface Project {
  id: string
  title: string
  description: string
  daysRemaining: number
  progress: number // 0-100
  phases: PhaseStep[]
  currentPhaseIndex: number
  team: TeamMember[]
  status: 'active' | 'on-hold' | 'completed' | 'cancelled'
  priority: 'high' | 'medium' | 'low'
  startDate: string
  endDate: string
}