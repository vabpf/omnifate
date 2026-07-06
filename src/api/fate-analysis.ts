import { FateAnalysisReport, UserProfile, NumerologyData, AstrologyData, TuViPalace, BattuData, HumanDesignData } from '../types';
import { apiFetch } from './client';

export function fetchFateReport(
  profile: UserProfile,
  computed?: {
    numData?: NumerologyData;
    astroData?: AstrologyData;
    tuviData?: TuViPalace[];
    battuData?: BattuData;
    hdData?: HumanDesignData;
  }
): Promise<FateAnalysisReport> {
  return apiFetch<FateAnalysisReport>('/api/fate-analysis', {
    name: profile.name,
    dob: profile.dob,
    time: profile.time,
    place: profile.place,
    gender: profile.gender,
    ...(computed || {}),
  });
}
