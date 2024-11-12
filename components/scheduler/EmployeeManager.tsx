'use client'

import { useState } from 'react'
import { Plus, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Employee, Schedule } from '@/lib/types'
import { generateSchedule } from '@/lib/scheduler'
import QuickAdd from './employee-list/QuickAdd'
import { EmployeeShiftDialog } from './employee-list/EmployeeShiftDialog'
import { X } from 'lucide-react'

interface EmployeeManagerProps {
  employees: Employee[]
  setEmployees: (employees: Employee[]) => void
  setSchedule: (schedule: Schedule[]) => void
}

export default function EmployeeManager({ 
  employees = [], 
  setEmployees, 
  setSchedule 
}: EmployeeManagerProps) {
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    name: '',
    constraints: [],
    preferredShifts: []
  })

  const addEmployee = () => {
    if (newEmployee.name.trim()) {
      setEmployees([
        ...employees,
        {
          id: Math.max(0, ...employees.map(e => e.id)) + 1,
          ...newEmployee
        }
      ])
      setNewEmployee({
        name: '',
        constraints: [],
        preferredShifts: []
      })
    }
  }

  const handleGenerateSchedule = () => {
    const newSchedule = generateSchedule(employees)
    setSchedule(newSchedule)
  }

  const handleAddPredefinedEmployee = (predefinedEmployee: { id: number; name: string }) => {
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

  const handleRemoveEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id))
  }

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ))
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Quick Add Employees</Label>
          <QuickAdd
            onAddEmployee={handleAddPredefinedEmployee}
            existingEmployeeIds={employees.map(e => e.id)}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or add new employee
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">New Employee Name</Label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              id="name"
              placeholder="Enter employee name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
            <Button 
              onClick={addEmployee} 
              disabled={!newEmployee.name.trim()}
              className="w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Current Employees</h3>
          <Badge variant="secondary">{employees.length} employees</Badge>
        </div>

        <ScrollArea className="h-[300px] border rounded-md p-2 md:p-4">
          <div className="space-y-2 md:space-y-4">
            {employees.map((employee) => (
              <div 
                key={employee.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 p-2 rounded-lg hover:bg-muted/50"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{employee.name}</h4>
                  {employee.constraints.length > 0 && (
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Constraints: {employee.constraints.join(', ')}
                    </p>
                  )}
                  {employee.preferredShifts.length > 0 && (
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Preferred: {employee.preferredShifts.join(', ')}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <EmployeeShiftDialog 
                    employee={employee} 
                    onUpdate={handleUpdateEmployee} 
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEmployee(employee.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Button 
          onClick={handleGenerateSchedule} 
          className="w-full"
          variant="secondary"
          disabled={employees.length === 0}
        >
          <Save className="mr-2 h-4 w-4" /> Generate Schedule
        </Button>
      </div>
    </div>
  )
}