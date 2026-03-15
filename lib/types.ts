export type ExerciseType = 'pushup' | 'pullup';

export interface WorkoutProtocol {
  type: ExerciseType;
  totalMinutes: number;
  getRepsForMinute: (minute: number, weekNumber: number) => number;
}

export interface MinuteStatus {
  minute: number;
  completed: boolean;
  skipped: boolean;
}

export interface WorkoutSession {
  id: string;
  type: ExerciseType;
  date: string;
  minuteStatuses: MinuteStatus[];
  totalReps: number;
  completedMinutes: number;
  weekNumber: number;
}

export interface UserStats {
  currentStreak: number;
  totalSessions: number;
  lifetimePushups: number;
  lifetimePullups: number;
  lastWorkoutDate: string | null;
  sessionsHistory: WorkoutSession[];
}
