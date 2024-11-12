'use client'

import { useState, useEffect } from 'react'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PREDEFINED_EMPLOYEES } from '@/lib/constants'

interface QuickAddProps {
  onAddEmployee: (employee: typeof PREDEFINED_EMPLOYEES[number]) => void
  existingEmployeeIds: number[]
}

export default function QuickAdd({ 
  onAddEmployee, 
  existingEmployeeIds = [] 
}: QuickAddProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-2">
      <ScrollArea className="h-[200px] border rounded-md p-2 md:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {PREDEFINED_EMPLOYEES.map((employee) => {
            const isAdded = existingEmployeeIds?.includes(employee.id) ?? false
            return (
              <Button
                key={employee.id}
                variant={isAdded ? "secondary" : "outline"}
                className="justify-start w-full"
                onClick={() => onAddEmployee(employee)}
                disabled={isAdded}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                <span className="truncate">{employee.name}</span>
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}