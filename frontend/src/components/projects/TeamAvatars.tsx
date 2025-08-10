'use client'

import { TeamMember } from '@/types/project'
import { cn } from '@/lib/utils'

interface TeamAvatarsProps {
  team: TeamMember[]
  maxDisplay?: number
  size?: 'sm' | 'md' | 'lg'
}

export default function TeamAvatars({ team, maxDisplay = 4, size = 'md' }: TeamAvatarsProps) {
  const displayTeam = team.slice(0, maxDisplay)
  const remainingCount = team.length - maxDisplay

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-teal-500'
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="flex -space-x-2">
      {displayTeam.map((member) => (
        <div
          key={member.id}
          className="group relative"
        >
          <div
            className={cn(
              "rounded-full flex items-center justify-center text-white font-medium border-2 border-background relative z-10",
              sizeClasses[size],
              getRandomColor(member.name)
            )}
          >
            {getInitials(member.name)}
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
            <div className="font-medium">{member.name}</div>
            <div className="text-muted-foreground">{member.role}</div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-border"></div>
          </div>
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className={cn(
            "rounded-full flex items-center justify-center bg-muted text-muted-foreground font-medium border-2 border-background",
            sizeClasses[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}