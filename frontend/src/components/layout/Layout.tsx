'use client'

import { useSidebar } from '@/contexts/SidebarContext'
import Sidebar from '@/components/layout/Sidebar'
import { cn } from '@/lib/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className={cn(
        "flex-1 overflow-auto transition-all duration-300 ease-in-out",
        isExpanded ? "ml-[300px]" : "ml-16"
      )}>
        <div>
          {children}
        </div>
      </main>
    </div>
  )
}