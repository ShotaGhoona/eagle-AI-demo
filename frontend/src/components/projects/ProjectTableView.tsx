'use client'

import { Project } from '@/types/project'
import { Progress } from '@/components/ui/progress'
import TeamAvatars from './TeamAvatars'
import { Badge } from '@/components/ui/badge'
import PhaseProgress from './PhaseProgress'
import { cn } from '@/lib/utils'

interface ProjectTableViewProps {
  projects: Project[]
}

export default function ProjectTableView({ projects }: ProjectTableViewProps) {

  const getStatusColor = (status: string) => {
    const colorMap = {
      active: 'bg-green-100 text-green-800',
      'on-hold': 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colorMap[status as keyof typeof colorMap] || 'bg-gray-100 text-gray-800'
  }

  const getDaysRemainingColor = (days: number) => {
    if (days < 0) return 'text-red-600'
    if (days < 7) return 'text-orange-600'
    if (days < 30) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-foreground text-sm uppercase tracking-wide">プロジェクト</th>
              <th className="text-left px-4 py-4 font-semibold text-foreground text-sm uppercase tracking-wide min-w-[120px]">期限・進捗</th>
              <th className="text-left px-4 py-4 font-semibold text-foreground text-sm uppercase tracking-wide min-w-[280px]">フェーズ進行</th>
              <th className="text-left px-4 py-4 font-semibold text-foreground text-sm uppercase tracking-wide">チーム</th>
              <th className="text-left px-6 py-4 font-semibold text-foreground text-sm uppercase tracking-wide">ステータス</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id} className={cn(
                "border-b border-border/40 last:border-b-0 hover:bg-muted/30 transition-all duration-200 group cursor-pointer",
                index % 2 === 0 ? "bg-background" : "bg-muted/10"
              )}>
                <td className="px-6 py-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-3 h-3 rounded-full flex-shrink-0",
                        project.priority === 'high' ? 'bg-red-500' :
                        project.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      )} />
                      <h3 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors">{project.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 ml-6">{project.description}</p>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <span className={cn("text-sm font-medium", getDaysRemainingColor(project.daysRemaining))}>
                        {project.daysRemaining < 0 
                          ? `${Math.abs(project.daysRemaining)}日超過` 
                          : `${project.daysRemaining}日`
                        }
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(project.endDate).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">進捗</span>
                        <span className="text-xs font-medium text-foreground">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="w-full max-w-xs">
                    <PhaseProgress 
                      phases={project.phases}
                      size="sm"
                      showLabels={false}
                    />
                    <div className="mt-2 text-xs text-muted-foreground">
                      フェーズ {project.currentPhaseIndex + 1}/{project.phases.length}: 
                      <span className="font-medium text-foreground ml-1">
                        {project.phases[project.currentPhaseIndex]?.name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="space-y-2">
                    <TeamAvatars team={project.team} maxDisplay={4} size="sm" />
                    <div className="text-xs text-muted-foreground">
                      {project.team.length}名のチーム
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <Badge className={cn("text-xs font-medium", getStatusColor(project.status))}>
                    {project.status === 'active' && '進行中'}
                    {project.status === 'on-hold' && '保留'}
                    {project.status === 'completed' && '完了'}
                    {project.status === 'cancelled' && '中止'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {projects.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          プロジェクトが見つかりませんでした
        </div>
      )}
    </div>
  )
}