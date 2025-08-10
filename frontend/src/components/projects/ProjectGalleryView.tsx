'use client'

import { Project } from '@/types/project'
import { Progress } from '@/components/ui/progress'
import TeamAvatars from './TeamAvatars'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import PhaseProgress from './PhaseProgress'
import { cn } from '@/lib/utils'
import { Calendar, Clock } from 'lucide-react'

interface ProjectGalleryViewProps {
  projects: Project[]
}

export default function ProjectGalleryView({ projects }: ProjectGalleryViewProps) {

  const getDaysRemainingColor = (days: number) => {
    if (days < 0) return 'text-red-600'
    if (days < 7) return 'text-orange-600'
    if (days < 30) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {projects.map((project) => (
        <Card 
          key={project.id} 
          className={cn(
            "hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/80 relative overflow-hidden group cursor-pointer",
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
          )}
        >
          {/* Priority indicator */}
          <div className={cn(
            "absolute top-0 left-0 w-full h-1 bg-gradient-to-r",
            project.priority === 'high' ? 'from-red-500 to-red-400' :
            project.priority === 'medium' ? 'from-yellow-500 to-yellow-400' : 
            'from-green-500 to-green-400'
          )} />
          <CardHeader className="pb-4 relative">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-foreground text-xl group-hover:text-primary transition-colors">{project.title}</h3>
                  <Badge 
                    variant={project.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs px-2 py-1 rounded-full"
                  >
                    {project.status === 'active' && '進行中'}
                    {project.status === 'on-hold' && '保留'}
                    {project.status === 'completed' && '完了'}
                    {project.status === 'cancelled' && '中止'}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{project.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-5 relative">
            {/* Key Metrics Header */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className={cn("text-sm font-bold", getDaysRemainingColor(project.daysRemaining))}>
                    {project.daysRemaining < 0 
                      ? `${Math.abs(project.daysRemaining)}日超過` 
                      : `${project.daysRemaining}日`
                    }
                  </span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(project.endDate).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">{project.progress}%</div>
                <div className="text-xs text-muted-foreground">全体進捗</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={project.progress} className="h-3 bg-muted/50" />
            </div>

            {/* Phase Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">フェーズ進行</span>
                <span className="text-xs text-muted-foreground">
                  {project.currentPhaseIndex + 1}/{project.phases.length}
                </span>
              </div>
              <PhaseProgress 
                phases={project.phases}
                size="md"
                showLabels={true}
              />
            </div>

            {/* Team Section */}
            <div className="space-y-3 p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">チームメンバー</span>
                <span className="text-xs text-muted-foreground">
                  {project.team.length}名
                </span>
              </div>
              <div className="flex items-center justify-between">
                <TeamAvatars team={project.team} maxDisplay={5} size="md" />
                <div className="text-xs text-muted-foreground text-right">
                  <div>{project.team[0]?.role}</div>
                  {project.team.length > 1 && <div>+{project.team.length - 1}名</div>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {projects.length === 0 && (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          <div className="text-lg font-medium mb-2">プロジェクトが見つかりませんでした</div>
          <p className="text-sm">検索条件を変更してください</p>
        </div>
      )}
    </div>
  )
}