'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Employee } from '@/lib/types';

interface NewEmployeeProps {
  onAdd: (employee: Omit<Employee, 'id'>) => void;
}

export function NewEmployee({ onAdd }: NewEmployeeProps) {
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    name: '',
    constraints: [],
    preferredShifts: []
  });

  const handleAdd = () => {
    if (newEmployee.name.trim()) {
      onAdd(newEmployee);
      setNewEmployee({
        name: '',
        constraints: [],
        preferredShifts: []
      });
    }
  };

  return (
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
          onClick={handleAdd} 
          disabled={!newEmployee.name.trim()}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
}