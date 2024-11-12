'use client'

import { useRef } from 'react'
import { Download } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Employee, Schedule } from '@/lib/types'
import { generateCSV, generatePDF } from '@/lib/export'

interface ScheduleViewerProps {
  schedule: Schedule[]
  employees: Employee[]
}

const EMPLOYEE_COLORS = [
  'text-red-500',
  'text-blue-500',
  'text-green-500',
  'text-purple-500',
  'text-orange-500',
  'text-pink-500',
  'text-teal-500',
  'text-indigo-500',
  'text-yellow-600',
  'text-cyan-600',
] as const

export default function ScheduleViewer({ schedule, employees }: ScheduleViewerProps) {
  const tableRef = useRef<HTMLDivElement>(null)

  const getEmployeeName = (id: number) => {
    return employees.find(e => e.id === id)?.name || 'Unassigned'
  }

  const getEmployeeColor = (id: number) => {
    return EMPLOYEE_COLORS[id % EMPLOYEE_COLORS.length]
  }

  const renderEmployeeName = (id: number) => {
    const name = getEmployeeName(id)
    return name === 'Unassigned' ? (
      <span className="text-muted-foreground">{name}</span>
    ) : (
      <span className={getEmployeeColor(id)}>{name}</span>
    )
  }

  const handlePDFExport = async () => {
    if (tableRef.current) {
      await generatePDF(tableRef.current)
    }
  }

  if (schedule.length === 0) {
    return (
      <div className="text-center py-8 md:py-12">
        <p className="text-sm md:text-base text-muted-foreground">
          No schedule generated yet. Add employees and generate a schedule first.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm md:text-base">
              <Download className="mr-2 h-4 w-4" />
              Export Schedule
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => generateCSV(schedule, employees)}>
              Download as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handlePDFExport}>
              Download as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="rounded-md border" ref={tableRef}>
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Day</TableHead>
                <TableHead className="w-[120px]">Time</TableHead>
                <TableHead>Main Guard (2)</TableHead>
                <TableHead>Rear Guard</TableHead>
                <TableHead>Bunker</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((shift, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-sm md:text-base">
                    {shift.day}
                  </TableCell>
                  <TableCell className="text-sm md:text-base">
                    {shift.time}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm md:text-base">
                      {shift.mainGuard.map((id, idx) => (
                        <div key={idx}>{renderEmployeeName(id)}</div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm md:text-base">
                    {renderEmployeeName(shift.rearGuard)}
                  </TableCell>
                  <TableCell className="text-sm md:text-base">
                    {renderEmployeeName(shift.bunker)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  )
}