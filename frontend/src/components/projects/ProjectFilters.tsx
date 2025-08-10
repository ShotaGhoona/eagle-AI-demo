'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProjectFiltersProps {
  onSearchChange: (search: string) => void
  onStatusFilter: (status: string) => void
  onPhaseFilter: (phase: string) => void
  onPriorityFilter: (priority: string) => void
}

export default function ProjectFilters({ 
  onSearchChange, 
  onStatusFilter, 
  onPhaseFilter, 
  onPriorityFilter 
}: ProjectFiltersProps) {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [phaseFilter, setPhaseFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onSearchChange(value)
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    onStatusFilter(value)
  }

  const handlePhaseChange = (value: string) => {
    setPhaseFilter(value)
    onPhaseFilter(value === 'all' ? '' : value)
  }

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value)
    onPriorityFilter(value === 'all' ? '' : value)
  }

  if (!mounted) {
    return (
      <div className="flex items-center gap-4 m-6 bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="プロジェクトを検索..."
            className="pl-10"
            disabled
          />
        </div>
        <div className="w-32 h-10 bg-muted/50 rounded-md animate-pulse" />
        <div className="w-32 h-10 bg-muted/50 rounded-md animate-pulse" />
        <div className="w-32 h-10 bg-muted/50 rounded-md animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 m-6 bg-card p-4 rounded-lg border shadow-sm">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="プロジェクトを検索..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filter */}
      <Select value={statusFilter} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="ステータス" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべて</SelectItem>
          <SelectItem value="active">進行中</SelectItem>
          <SelectItem value="completed">完了</SelectItem>
          <SelectItem value="on-hold">保留</SelectItem>
          <SelectItem value="cancelled">中止</SelectItem>
        </SelectContent>
      </Select>

      {/* Phase Filter */}
      <Select value={phaseFilter} onValueChange={handlePhaseChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="フェーズ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべて</SelectItem>
          <SelectItem value="企画">企画</SelectItem>
          <SelectItem value="デザイン">デザイン</SelectItem>
          <SelectItem value="開発">開発</SelectItem>
          <SelectItem value="テスト">テスト</SelectItem>
          <SelectItem value="デプロイ">デプロイ</SelectItem>
        </SelectContent>
      </Select>

      {/* Priority Filter */}
      <Select value={priorityFilter} onValueChange={handlePriorityChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="優先度" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべて</SelectItem>
          <SelectItem value="high">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              高優先度
            </div>
          </SelectItem>
          <SelectItem value="medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              中優先度
            </div>
          </SelectItem>
          <SelectItem value="low">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              低優先度
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}