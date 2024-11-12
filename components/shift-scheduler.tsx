'use client'

import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EmployeeManager } from './scheduler/employee-manager'
import { ScheduleViewer } from './scheduler/schedule-viewer'
import { useState, useEffect } from 'react'
import { Employee, Schedule } from '@/lib/types'

const STORAGE_KEYS = {
  EMPLOYEES: 'shift-scheduler-employees',
  SCHEDULE: 'shift-scheduler-schedule'
} as const

export function ShiftScheduler() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [schedule, setSchedule] = useState<Schedule[]>([])

  useEffect(() => {
    try {
      const storedEmployees = localStorage.getItem(STORAGE_KEYS.EMPLOYEES)
      const storedSchedule = localStorage.getItem(STORAGE_KEYS.SCHEDULE)
      
      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees))
      }
      if (storedSchedule) {
        const parsedSchedule = JSON.parse(storedSchedule)
        const validSchedule = parsedSchedule.map((shift: any) => ({
          day: shift.day,
          time: shift.time,
          mainGuard: Array.isArray(shift.mainGuard) ? shift.mainGuard : [],
          rearGuard: typeof shift.rearGuard === 'number' ? shift.rearGuard : -1,
          bunker: typeof shift.bunker === 'number' ? shift.bunker : -1
        }))
        setSchedule(validSchedule)
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
      setEmployees([])
      setSchedule([])
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees))
    } catch (error) {
      console.error('Error saving employees to localStorage:', error)
    }
  }, [employees])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule))
    } catch (error) {
      console.error('Error saving schedule to localStorage:', error)
    }
  }, [schedule])

  return (
    <Card className="p-6">
      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="employees">Manage Employees</TabsTrigger>
          <TabsTrigger value="schedule">View Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees" className="space-y-4">
          <EmployeeManager 
            employees={employees}
            setEmployees={setEmployees}
            setSchedule={setSchedule}
          />
        </TabsContent>
        
        <TabsContent value="schedule">
          <ScheduleViewer 
            schedule={schedule}
            employees={employees}
          />
        </TabsContent>
      </Tabs>
    </Card>
  )
}