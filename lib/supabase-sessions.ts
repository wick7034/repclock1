import { supabase, isSupabaseConfigured } from './supabase';
import type { ExerciseType } from './types';

export interface CompletedSessionRow {
  id: string;
  display_name: string | null;
  type: ExerciseType;
  total_reps: number;
  completed_minutes: number;
  week_number: number;
  created_at: string;
}

export interface LeaderboardRow {
  display_name: string;
  total_reps: number;
  total_sessions: number;
}

export async function saveCompletedSessionToSupabase(params: {
  displayName: string | null;
  type: ExerciseType;
  totalReps: number;
  completedMinutes: number;
  weekNumber: number;
}): Promise<{ error: Error | null }> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('completed_sessions').insert({
    display_name: params.displayName?.trim().slice(0, 32) || null,
    type: params.type,
    total_reps: params.totalReps,
    completed_minutes: params.completedMinutes,
    week_number: params.weekNumber,
  });
  return { error: error ?? null };
}

export async function getRecentSessions(limit = 50): Promise<{
  data: CompletedSessionRow[] | null;
  error: Error | null;
}> {
  if (!supabase) return { data: [], error: null };
  const { data, error } = await supabase
    .from('completed_sessions')
    .select('id, display_name, type, total_reps, completed_minutes, week_number, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);
  return { data: data as CompletedSessionRow[] | null, error: error ?? null };
}

export async function getLeaderboard(limit = 50): Promise<{
  data: LeaderboardRow[] | null;
  error: Error | null;
}> {
  if (!supabase) return { data: [], error: null };
  const { data, error } = await supabase
    .from('leaderboard')
    .select('display_name, total_reps, total_sessions')
    .order('total_reps', { ascending: false })
    .limit(limit);
  return { data: data as LeaderboardRow[] | null, error: error ?? null };
}

export { isSupabaseConfigured };
