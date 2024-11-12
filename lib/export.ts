'use client'

import { Employee, Schedule } from './types'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export function generateCSV(schedule: Schedule[], employees: Employee[]): void {
  const getEmployeeName = (id: number) => {
    return employees.find(e => e.id === id)?.name || 'Unassigned'
  }

  const rows = schedule.map(shift => {
    return [
      shift.day,
      shift.time,
      shift.mainGuard.map(id => getEmployeeName(id)).join(', '),
      getEmployeeName(shift.rearGuard),
      getEmployeeName(shift.bunker)
    ]
  })

  const headers = ['Day', 'Time', 'Main Guard', 'Rear Guard', 'Bunker']
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', 'schedule.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function generatePDF(tableRef: HTMLElement): Promise<void> {
  const canvas = await html2canvas(tableRef, {
    scale: 2,
    logging: false,
    useCORS: true
  })
  
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm'
  })
  
  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save('schedule.pdf')
}