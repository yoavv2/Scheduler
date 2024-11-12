'use client';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Employee, Schedule } from './types';

function getEmployeesFromLocalStorage(): Employee[] {
  if (typeof window !== 'undefined') {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      return JSON.parse(storedEmployees);
    }
  }
  return [];
}

export function generateCSV(schedule: Schedule[], employees: Employee[]): void {
  const getEmployeeName = (id: number) => {
    return employees.find((e) => e.id === id)?.name || 'Unassigned';
  };

  const rows = schedule.map((shift) => {
    return [
      shift.day,
      shift.time,
      shift.mainGuard.map((id) => getEmployeeName(id)).join(', '),
      getEmployeeName(shift.rearGuard),
      getEmployeeName(shift.bunker),
    ];
  });

  const headers = ['Day', 'Time', 'Main Guard', 'Rear Guard', 'Bunker'];
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', 'schedule.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function generatePDF(
  tableRef: HTMLElement,
  employees: Employee[]
): Promise<void> {
  const pdf = new jsPDF('landscape', 'mm', 'a4');

  // Add the table to the PDF
  pdf.autoTable({
    html: tableRef,
    startY: 20,
    margin: { horizontal: 10 },
    styles: {
      fillColor: [255, 255, 255], // White background
      textColor: [0, 0, 0], // Black text
      fontSize: 10,
    },
    headStyles: {
      fillColor: [200, 200, 200], // Gray background for header
      textColor: [0, 0, 0],
      fontStyle: 'bold',
    },
    theme: 'grid',
    showHead: 'everyPage',
    pageBreak: 'auto',
  });

  pdf.save('ikismail.pdf');
}
