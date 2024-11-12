'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { DAYS, SHIFTS } from '@/lib/constants';
import { Employee } from '@/lib/types';

interface EmployeeShiftDialogProps {
  employee: Employee;
  onUpdate: (employee: Employee) => void;
}

export function EmployeeShiftDialog({ employee, onUpdate }: EmployeeShiftDialogProps) {
  const [editedEmployee, setEditedEmployee] = useState<Employee>(employee);

  const handleSave = () => {
    onUpdate(editedEmployee);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs md:text-sm"
        >
          Edit Shifts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Shifts for {employee.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Shift Constraints</Label>
            <ScrollArea className="h-[200px] border rounded-md p-2 md:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {DAYS.map(day =>
                  SHIFTS.map(shift => (
                    <div key={`edit-constraint-${day}-${shift}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-constraint-${day}-${shift}`}
                        checked={editedEmployee.constraints.includes(`${day} ${shift}`)}
                        onCheckedChange={(checked) => {
                          const constraint = `${day} ${shift}`;
                          setEditedEmployee({
                            ...editedEmployee,
                            constraints: checked
                              ? [...editedEmployee.constraints, constraint]
                              : editedEmployee.constraints.filter(c => c !== constraint)
                          });
                        }}
                      />
                      <label
                        htmlFor={`edit-constraint-${day}-${shift}`}
                        className="text-xs md:text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {day} {shift}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-2">
            <Label>Preferred Shifts</Label>
            <ScrollArea className="h-[200px] border rounded-md p-2 md:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {DAYS.map(day =>
                  SHIFTS.map(shift => (
                    <div key={`edit-pref-${day}-${shift}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-pref-${day}-${shift}`}
                        checked={editedEmployee.preferredShifts.includes(`${day} ${shift}`)}
                        onCheckedChange={(checked) => {
                          const preferredShift = `${day} ${shift}`;
                          setEditedEmployee({
                            ...editedEmployee,
                            preferredShifts: checked
                              ? [...editedEmployee.preferredShifts, preferredShift]
                              : editedEmployee.preferredShifts.filter(p => p !== preferredShift)
                          });
                        }}
                      />
                      <label
                        htmlFor={`edit-pref-${day}-${shift}`}
                        className="text-xs md:text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {day} {shift}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}