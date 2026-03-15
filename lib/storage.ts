import { UserStats, WorkoutSession } from './types';

const STATS_KEY = 'repclock_stats';

export function getStats(): UserStats {
  if (typeof window === 'undefined') {
    return getDefaultStats();
  }

  const stored = localStorage.getItem(STATS_KEY);
  if (!stored) {
    return getDefaultStats();
  }

  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultStats();
  }
}

export function saveStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function saveSession(session: WorkoutSession): void {
  const stats = getStats();

  const today = new Date().toDateString();
  const lastWorkout = stats.lastWorkoutDate
    ? new Date(stats.lastWorkoutDate).toDateString()
    : null;

  if (lastWorkout !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastWorkout === yesterdayStr || stats.currentStreak === 0) {
      stats.currentStreak += 1;
    } else if (lastWorkout !== today) {
      stats.currentStreak = 1;
    }
  }

  stats.lastWorkoutDate = new Date().toISOString();
  stats.totalSessions += 1;

  if (session.type === 'pushup') {
    stats.lifetimePushups += session.totalReps;
  } else {
    stats.lifetimePullups += session.totalReps;
  }

  stats.sessionsHistory.unshift(session);
  if (stats.sessionsHistory.length > 100) {
    stats.sessionsHistory = stats.sessionsHistory.slice(0, 100);
  }

  saveStats(stats);
}

export function getWeekNumber(type: 'pushup' | 'pullup'): number {
  const stats = getStats();
  const completedSessions = stats.sessionsHistory.filter(
    (s) => s.type === type
  ).length;

  if (completedSessions < 7) return 1;
  if (completedSessions < 14) return 2;
  return 3;
}

function getDefaultStats(): UserStats {
  return {
    currentStreak: 0,
    totalSessions: 0,
    lifetimePushups: 0,
    lifetimePullups: 0,
    lastWorkoutDate: null,
    sessionsHistory: [],
  };
}
