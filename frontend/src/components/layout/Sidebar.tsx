'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Users, Calendar, Target, MessageSquare, Layers, BarChart, DollarSign, Layout, FileText, Home } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/contexts/SidebarContext'
import { ThemeToggle } from '../theme-toggle'

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  path?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'ダッシュボード',
    icon: Home,
    path: '/'
  },
  {
    id: 'hr',
    label: '人事管理',
    icon: Users,
    children: [
      { id: 'attendance', label: '稼働実績管理', icon: Calendar, path: '/attendance' },
      { id: 'attendance-alerts', label: '勤務予定アラート', icon: Calendar, path: '/attendance/alerts' },
      { id: 'kpi', label: 'KPI管理', icon: Target, path: '/kpi' },
      { id: 'one-on-one', label: '1on1管理', icon: MessageSquare, path: '/one-on-one' },
      { id: 'skills', label: 'スキル管理', icon: Layers, path: '/skills' },
      { id: 'mentors', label: 'メンター管理', icon: Users, path: '/mentors' }
    ]
  },
  {
    id: 'projects',
    label: 'プロジェクト管理',
    icon: Layout,
    children: [
      { id: 'projects-list', label: 'プロジェクト一覧', icon: Layout, path: '/projects' },
      { id: 'projects-status', label: 'プロジェクトステータス', icon: BarChart, path: '/projects/status' },
      { id: 'performance', label: 'エンジニア評価', icon: BarChart, path: '/performance' },
      { id: 'performance-analytics', label: 'パフォーマンス分析', icon: BarChart, path: '/performance/analytics' }
    ]
  },
  {
    id: 'assignments',
    label: 'アサイン・リソース管理',
    icon: Users,
    children: [
      { id: 'assignments-manage', label: 'アサイン管理', icon: Users, path: '/assignments' },
      { id: 'assignments-dashboard', label: 'アサイン状況ダッシュボード', icon: Layout, path: '/assignments/dashboard' },
      { id: 'assignments-capacity', label: 'リソース管理', icon: BarChart, path: '/assignments/capacity' }
    ]
  },
  {
    id: 'expenses',
    label: '経理関連',
    icon: DollarSign,
    children: [
      { id: 'expenses-manage', label: '経費精算', icon: DollarSign, path: '/expenses' },
      { id: 'expenses-approval', label: '経費承認', icon: FileText, path: '/expenses/approval' }
    ]
  },
  {
    id: 'reports',
    label: 'レポート',
    icon: FileText,
    path: '/reports'
  }
]

export default function Sidebar() {
  const { isExpanded, setIsExpanded } = useSidebar()
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openItems.includes(item.id)
    const Icon = item.icon
    const isParent = depth === 0
    const isChild = depth > 0

    return (
      <div key={item.id}>
        {hasChildren ? (
          <Collapsible open={isOpen} onOpenChange={() => toggleItem(item.id)}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start transition-all duration-200",
                  // Parent item styling
                  isParent && isExpanded && "gap-3 h-14 px-3 text-left font-semibold hover:bg-primary/10 text-foreground",
                  isParent && !isExpanded && "h-14 px-4 text-left font-semibold hover:bg-primary/10 text-foreground",
                  // Child item styling
                  isChild && "gap-2 h-10 pl-16 pr-3 text-left font-normal text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
              >
                <Icon className={cn(
                  "shrink-0",
                  isParent ? "h-5 w-5" : "h-4 w-4"
                )} />
                {isExpanded && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {hasChildren && (
                      <ChevronRight className={cn(
                        "h-4 w-4 shrink-0 ml-auto transition-transform duration-200",
                        isOpen && "rotate-90"
                      )} />
                    )}
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            {isExpanded && (
              <CollapsibleContent className="space-y-0 py-1">
                {item.children?.map(child => renderMenuItem(child, depth + 1))}
              </CollapsibleContent>
            )}
          </Collapsible>
        ) : (
          <Link href={item.path || '#'}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-200 relative",
                // Parent item styling
                isParent && isExpanded && "gap-3 h-14 px-3 text-left font-semibold hover:bg-primary/10 text-foreground",
                isParent && !isExpanded && "h-14 px-4 text-left font-semibold hover:bg-primary/10 text-foreground",
                // Child item styling
                isChild && "gap-2 h-10 pl-16 pr-3 text-left font-normal text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              <Icon className={cn(
                "shrink-0",
                isParent ? "h-5 w-5" : "h-4 w-4"
              )} />
              {isExpanded && <span className="truncate">{item.label}</span>}
            </Button>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-background border-r border-border shadow-lg transition-all duration-300 ease-in-out flex flex-col",
        isExpanded ? "w-[300px]" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header - Fixed at top */}
      <div className={cn(
        "flex items-center h-16 border-b border-border transition-all duration-300 flex-shrink-0",
        isExpanded ? "px-3" : "px-4"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Layout className="h-5 w-5 text-primary-foreground" />
          </div>
          {isExpanded && (
            <span className="font-semibold text-lg text-foreground">
              EagleEye
            </span>
          )}
        </div>
      </div>

      {/* Navigation - Scrollable middle section */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto min-h-0">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>

      {/* Footer - Fixed at bottom */}
      <div className={cn(
        "border-t border-border transition-all duration-300 flex-shrink-0",
        isExpanded ? "p-4" : "p-4"
      )}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            {isExpanded && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Admin User</span>
                <span className="text-xs text-muted-foreground">管理者</span>
              </div>
            )}
          </div>
          {isExpanded && (
            <ThemeToggle />
          )}
          {!isExpanded && (
            <div className="absolute right-2">
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}