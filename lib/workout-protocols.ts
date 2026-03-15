import { WorkoutProtocol } from './types';

export const pushupProtocol: WorkoutProtocol = {
  type: 'pushup',
  totalMinutes: 60,
  getRepsForMinute: (minute: number, weekNumber: number) => {
    if (weekNumber === 1) {
      return 2;
    } else if (weekNumber === 2) {
      return minute <= 10 ? 3 : 2;
    } else {
      return minute <= 20 ? 3 : 2;
    }
  },
};

export const pullupProtocol: WorkoutProtocol = {
  type: 'pullup',
  totalMinutes: 60,
  getRepsForMinute: () => 1,
};

export function getProtocol(type: 'pushup' | 'pullup'): WorkoutProtocol {
  return type === 'pushup' ? pushupProtocol : pullupProtocol;
}
