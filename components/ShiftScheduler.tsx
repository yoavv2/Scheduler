'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmployeeManager from './scheduler/EmployeeManager';
import ScheduleViewer from './scheduler/ScheduleViewer';
import { Employee, Schedule } from '@/lib/types';

const STORAGE_KEYS = {
  EMPLOYEES: 'shift-scheduler-employees',
  SCHEDULE: 'shift-scheduler-schedule',
};

export default function ShiftScheduler() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false); // For hydration handling

  // Mark as client after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load employees from localStorage on client-side
  useEffect(() => {
    if (!isClient) return;
    try {
      const storedEmployees = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
      console.log('Loaded employees from localStorage:', storedEmployees);
      if (storedEmployees) {
        const parsedEmployees = JSON.parse(storedEmployees);
        console.log('Parsed employees:', parsedEmployees);
        setEmployees(parsedEmployees);
      }
    } catch (error) {
      console.error('Error loading employees from localStorage:', error);
    }
  }, [isClient]);

  // Load schedule from localStorage on client-side
  useEffect(() => {
    if (!isClient) return;
    try {
      const storedSchedule = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
      console.log('Loaded schedule from localStorage:', storedSchedule);
      if (storedSchedule) {
        const parsedSchedule = JSON.parse(storedSchedule);
        console.log('Parsed schedule:', parsedSchedule);
        setSchedule(
          parsedSchedule.map((shift: any) => ({
            day: shift.day,
            time: shift.time,
            mainGuard: Array.isArray(shift.mainGuard) ? shift.mainGuard : [],
            rearGuard:
              typeof shift.rearGuard === 'number' ? shift.rearGuard : -1,
            bunker: typeof shift.bunker === 'number' ? shift.bunker : -1,
          }))
        );
      }
    } catch (error) {
      console.error('Error loading schedule from localStorage:', error);
    }
  }, [isClient]);

  // After loading both employees and schedule, set the flag
  useEffect(() => {
    if (!isClient) return;
    // Assuming both employees and schedule are loaded when isDataLoaded is false and both have been set
    setIsDataLoaded(true);
  }, [employees, schedule, isClient]);

  // Save employees to localStorage whenever they change, but only after initial load
  useEffect(() => {
    if (!isDataLoaded) return; // Prevent saving on initial load
    try {
      console.log('Saving employees to localStorage:', employees);
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
    } catch (error) {
      console.error('Error saving employees to localStorage:', error);
    }
  }, [employees, isDataLoaded]);

  // Save schedule to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (!isDataLoaded) return; // Prevent saving on initial load
    try {
      console.log('Saving schedule to localStorage:', schedule);
      localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
    } catch (error) {
      console.error('Error saving schedule to localStorage:', error);
    }
  }, [schedule, isDataLoaded]);

  // Optional: Show a loading state until data is loaded
  if (!isClient || !isDataLoaded) {
    return <div>Loading...</div>; // Or a spinner/loading indicator
  }

  return (
    <Card className='p-6'>
      <Tabs defaultValue='employees' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='employees'>Manage Employees</TabsTrigger>
          <TabsTrigger value='schedule'>View Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value='employees' className='space-y-4'>
          <EmployeeManager
            employees={employees}
            setEmployees={setEmployees}
            setSchedule={setSchedule}
          />
        </TabsContent>

        <TabsContent value='schedule'>
          <ScheduleViewer schedule={schedule} employees={employees} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
