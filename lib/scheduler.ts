import { Employee, Schedule } from './types';
import { DAYS, SHIFTS } from './constants';

export function generateSchedule(employees: Employee[]): Schedule[] {
  const schedule: Schedule[] = [];
  
  // Initialize empty schedule
  DAYS.forEach(day => {
    SHIFTS.forEach(time => {
      schedule.push({
        day,
        time,
        mainGuard: [],
        rearGuard: -1,
        bunker: -1
      });
    });
  });

  // Track shifts per employee
  const employeeShifts = new Map<number, number>();
  employees.forEach(emp => employeeShifts.set(emp.id, 0));

  // Helper function to check if employee can be assigned to shift
  const canAssignShift = (
    employee: Employee,
    shift: Schedule,
    currentShiftIndex: number
  ): boolean => {
    // Check constraints
    if (employee.constraints.includes(`${shift.day} ${shift.time}`)) {
      return false;
    }

    // Check if employee is already in this shift
    if (
      shift.mainGuard.includes(employee.id) ||
      shift.rearGuard === employee.id ||
      shift.bunker === employee.id
    ) {
      return false;
    }

    // Check weekly shifts limit (increased to 4 shifts per week)
    const weeklyShifts = employeeShifts.get(employee.id) || 0;
    if (weeklyShifts >= 4) {
      return false;
    }

    // Find previous shift for this employee
    const prevShiftIndex = schedule.findIndex((s, idx) => {
      if (idx >= currentShiftIndex) return false;
      return s.mainGuard.includes(employee.id) ||
        s.rearGuard === employee.id ||
        s.bunker === employee.id;
    });

    // Ensure 8-hour break between shifts
    if (prevShiftIndex !== -1 && currentShiftIndex - prevShiftIndex < 2) {
      return false;
    }

    return true;
  };

  // Helper function to assign employee to a position in shift
  const assignToShift = (
    employee: Employee,
    shift: Schedule
  ): boolean => {
    if (shift.mainGuard.length < 2) {
      shift.mainGuard.push(employee.id);
      employeeShifts.set(employee.id, (employeeShifts.get(employee.id) || 0) + 1);
      return true;
    }
    if (shift.rearGuard === -1) {
      shift.rearGuard = employee.id;
      employeeShifts.set(employee.id, (employeeShifts.get(employee.id) || 0) + 1);
      return true;
    }
    if (shift.bunker === -1) {
      shift.bunker = employee.id;
      employeeShifts.set(employee.id, (employeeShifts.get(employee.id) || 0) + 1);
      return true;
    }
    return false;
  };

  // First, assign preferred shifts
  schedule.forEach((shift, shiftIndex) => {
    const availableEmployees = employees
      .filter(emp => 
        emp.preferredShifts.includes(`${shift.day} ${shift.time}`) &&
        canAssignShift(emp, shift, shiftIndex)
      )
      .sort((a, b) => (employeeShifts.get(a.id) || 0) - (employeeShifts.get(b.id) || 0));

    availableEmployees.forEach(emp => {
      if (
        shift.mainGuard.length < 2 ||
        shift.rearGuard === -1 ||
        shift.bunker === -1
      ) {
        assignToShift(emp, shift);
      }
    });
  });

  // Then fill remaining slots with priority to employees with fewer shifts
  schedule.forEach((shift, shiftIndex) => {
    while (
      shift.mainGuard.length < 2 ||
      shift.rearGuard === -1 ||
      shift.bunker === -1
    ) {
      const availableEmployees = employees
        .filter(emp => canAssignShift(emp, shift, shiftIndex))
        .sort((a, b) => (employeeShifts.get(a.id) || 0) - (employeeShifts.get(b.id) || 0));

      if (availableEmployees.length === 0) break;

      const employee = availableEmployees[0];
      assignToShift(employee, shift);
    }
  });

  return schedule;
}