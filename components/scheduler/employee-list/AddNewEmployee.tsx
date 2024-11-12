'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface AddNewEmployeeProps {
  onAdd: (name: string) => void;
}

export default function AddNewEmployee({ onAdd }: AddNewEmployeeProps) {
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name);
      setName('');
    }
  };

  return (
    <div className="space-y-2">
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button 
            onClick={handleAdd} 
            disabled={!name.trim()}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}