'use client'

import { PhaseStep } from '@/types/project'
import { cn } from '@/lib/utils'

interface PhaseProgressProps {
  phases: PhaseStep[]
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
}

export default function PhaseProgress({ 
  phases, 
  size = 'md',
  showLabels = true 
}: PhaseProgressProps) {
  const getColorClasses = (color: string, status: 'completed' | 'current' | 'upcoming') => {
    const colorMap = {
      blue: {
        completed: 'bg-blue-500 border-blue-500',
        current: 'bg-blue-500 border-blue-500 ring-2 ring-blue-200',
        upcoming: 'bg-gray-200 border-gray-300'
      },
      purple: {
        completed: 'bg-purple-500 border-purple-500',
        current: 'bg-purple-500 border-purple-500 ring-2 ring-purple-200',
        upcoming: 'bg-gray-200 border-gray-300'
      },
      orange: {
        completed: 'bg-orange-500 border-orange-500',
        current: 'bg-orange-500 border-orange-500 ring-2 ring-orange-200',
        upcoming: 'bg-gray-200 border-gray-300'
      },
      green: {
        completed: 'bg-green-500 border-green-500',
        current: 'bg-green-500 border-green-500 ring-2 ring-green-200',
        upcoming: 'bg-gray-200 border-gray-300'
      },
      yellow: {
        completed: 'bg-yellow-500 border-yellow-500',
        current: 'bg-yellow-500 border-yellow-500 ring-2 ring-yellow-200',
        upcoming: 'bg-gray-200 border-gray-300'
      },
      red: {
        completed: 'bg-red-500 border-red-500',
        current: 'bg-red-500 border-red-500 ring-2 ring-red-200',
        upcoming: 'bg-gray-200 border-gray-300'
      },
      pink: {
        completed: 'bg-pink-500 border-pink-500',
        current: 'bg-pink-500 border-pink-500 ring-2 ring-pink-200',
        upcoming: 'bg-gray-200 border-gray-300'
      },
      gray: {
        completed: 'bg-gray-500 border-gray-500',
        current: 'bg-gray-500 border-gray-500 ring-2 ring-gray-200',
        upcoming: 'bg-gray-200 border-gray-300'
      }
    }
    
    return colorMap[color as keyof typeof colorMap]?.[status] || colorMap.gray[status]
  }

  const getConnectorClasses = (index: number) => {
    const phase = phases[index]
    const nextPhase = phases[index + 1]
    
    if (!nextPhase) return ''
    
    // If current phase is completed, connector is filled
    if (phase.status === 'completed') {
      return 'bg-gray-300'
    }
    
    return 'bg-gray-200'
  }

  const sizeClasses = {
    sm: {
      dot: 'w-3 h-3',
      connector: 'h-0.5',
      text: 'text-xs',
      spacing: 'gap-1'
    },
    md: {
      dot: 'w-4 h-4',
      connector: 'h-1',
      text: 'text-sm',
      spacing: 'gap-2'
    },
    lg: {
      dot: 'w-6 h-6',
      connector: 'h-1',
      text: 'text-base',
      spacing: 'gap-3'
    }
  }

  return (
    <div className="w-full">
      {/* Phase dots and connectors */}
      <div className="flex items-center justify-between mb-2">
        {phases.map((phase, index) => (
          <div key={phase.id} className="flex items-center flex-1">
            {/* Phase dot */}
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "rounded-full border-2 transition-all duration-300",
                  sizeClasses[size].dot,
                  getColorClasses(phase.color, phase.status)
                )}
              />
              {phase.status === 'current' && (
                <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current" />
              )}
            </div>
            
            {/* Connector line */}
            {index < phases.length - 1 && (
              <div className="flex-1 mx-2">
                <div
                  className={cn(
                    "w-full rounded-full transition-all duration-300",
                    sizeClasses[size].connector,
                    getConnectorClasses(index)
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Phase labels */}
      {showLabels && (
        <div className="flex items-start justify-between">
          {phases.map((phase) => (
            <div key={`label-${phase.id}`} className="flex-1 text-center">
              <div
                className={cn(
                  "font-medium truncate transition-colors duration-300",
                  sizeClasses[size].text,
                  phase.status === 'completed' && "text-foreground",
                  phase.status === 'current' && "text-foreground font-semibold",
                  phase.status === 'upcoming' && "text-muted-foreground"
                )}
                title={phase.name}
              >
                {phase.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}