'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Employee } from '@/lib/types'
import { EmployeeItem } from './EmployeeItem'

interface EmployeeListProps {
  employees: Employee[]
  onRemove: (id: number) => void
  onUpdate: (employee: Employee) => void
}

export default function EmployeeList({ employees, onRemove, onUpdate }: EmployeeListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Current Employees</h3>
        <Badge variant="secondary">{employees.length} employees</Badge>
      </div>
      <ScrollArea className="h-[300px] border rounded-md p-2 md:p-4">
        <div className="space-y-2 md:space-y-4">
          {employees.map((employee) => (
            <EmployeeItem
              key={employee.id}
              employee={employee}
              onRemove={onRemove}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}