export type Employee = {
  id: number;
  name: string;
  constraints: string[];
  preferredShifts: string[];
};

export type GuardPositions = {
  mainGuard: number[];
  rearGuard: number;
  bunker: number;
};

export type Schedule = {
  day: string;
  time: string;
} & GuardPositions;