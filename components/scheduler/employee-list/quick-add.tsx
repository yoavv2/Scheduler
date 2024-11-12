'use client'

import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Employee } from '@/lib/types'
import { PREDEFINED_EMPLOYEES } from '@/lib/constants'

interface QuickAddProps {
  employees: Employee[]
  setEmployees: (employees: Employee[]) => void
}

export function QuickAdd({ employees, setEmployees }: QuickAddProps) {
  const addPredefinedEmployee = (predefinedEmployee: typeof PREDEFINED_EMPLOYEES[number]) => {
    if (!employees.some(e => e.id === predefinedEmployee.id)) {
      setEmployees([
        ...employees,
        {
          id: predefinedEmployee.id,
          name: predefinedEmployee.name,
          constraints: [],
          preferredShifts: []
        }
      ])
    }
  }

  return (
    <div className="space-y-2">
      <Label>Quick Add Employees</Label>
      <ScrollArea className="h-[200px] border rounded-md p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {PREDEFINED_EMPLOYEES.map((employee) => {
            const isAdded = employees.some(e => e.id === employee.id)
            return (
              <Button
                key={employee.id}
                variant={isAdded ? "secondary" : "outline"}
                className="justify-start"
                onClick={() => addPredefinedEmployee(employee)}
                disabled={isAdded}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                <span className="text-right truncate">{employee.name}</span>
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}