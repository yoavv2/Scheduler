'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Employee } from '@/lib/types';
import { EmployeeShiftDialog } from './EmployeeShiftDialog';

interface EmployeeItemProps {
  employee: Employee;
  onRemove: (id: number) => void;
  onUpdate: (employee: Employee) => void;
}

export function EmployeeItem({ employee, onRemove, onUpdate }: EmployeeItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 p-2 rounded-lg hover:bg-muted/50">
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
        <EmployeeShiftDialog employee={employee} onUpdate={onUpdate} />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(employee.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}