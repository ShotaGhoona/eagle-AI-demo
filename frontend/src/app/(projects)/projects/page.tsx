'use client'

import { useState, useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/layout/HeadTab'
import { Table, Grid, Calendar } from 'lucide-react'
import { dummyProjects } from '@/data/projects'
import { Project } from '@/types/project'
import ProjectFilters from '@/components/projects/ProjectFilters'
import ProjectTableView from '@/components/projects/ProjectTableView'
import ProjectGalleryView from '@/components/projects/ProjectGalleryView'

type ViewMode = 'table' | 'gallery' | 'timeline'

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [phaseFilter, setPhaseFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  const filteredProjects = useMemo(() => {
    return dummyProjects.filter((project: Project) => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter

      // Phase filter
      const matchesPhase = phaseFilter === '' || 
        project.phases.some(phase => phase.name.toLowerCase().includes(phaseFilter.toLowerCase()))

      // Priority filter
      const matchesPriority = priorityFilter === '' || project.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPhase && matchesPriority
    })
  }, [searchTerm, statusFilter, phaseFilter, priorityFilter])

  const handleSearchChange = (search: string) => {
    setSearchTerm(search)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
  }

  const handlePhaseFilter = (phase: string) => {
    setPhaseFilter(phase === phaseFilter ? '' : phase)
  }

  const handlePriorityFilter = (priority: string) => {
    setPriorityFilter(priority === priorityFilter ? '' : priority)
  }

  return (
    <div className="space-y-6">

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="table" className="flex items-center gap-2">
            <Table className="w-4 h-4" />
            テーブル
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <Grid className="w-4 h-4" />
            ギャラリー
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            タイムライン
          </TabsTrigger>
        </TabsList>
        <ProjectFilters
          onSearchChange={handleSearchChange}
          onStatusFilter={handleStatusFilter}
          onPhaseFilter={handlePhaseFilter}
          onPriorityFilter={handlePriorityFilter}
        />
        <TabsContent value="table" className='m-6'>
          <ProjectTableView projects={filteredProjects} />
        </TabsContent>

        <TabsContent value="gallery" className='m-6'>
          <ProjectGalleryView projects={filteredProjects} />
        </TabsContent>

        <TabsContent value="timeline" className='m-6'>
          <div className="bg-card rounded-lg border shadow-sm p-8 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">タイムラインビュー</h3>
            <p className="text-muted-foreground">タイムライン表示は開発中です</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}