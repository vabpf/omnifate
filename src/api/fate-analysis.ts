import { FateAnalysisReport, UserProfile } from '../types';
import { apiFetch } from './client';

export function fetchFateReport(profile: UserProfile): Promise<FateAnalysisReport> {
  return apiFetch<FateAnalysisReport>('/api/fate-analysis', profile);
}
