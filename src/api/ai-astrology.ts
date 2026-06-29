import { UserProfile, AstrologyData } from '../types';
import { apiFetch } from './client';

interface AiAstrologyResponse {
  content: string;
}

export function fetchAiAstrology(
  profile: UserProfile,
  astroData: AstrologyData
): Promise<string> {
  return apiFetch<AiAstrologyResponse>('/api/ai/astrology', {
    name: profile.name,
    dob: profile.dob,
    time: profile.time,
    place: profile.place,
    gender: profile.gender,
    astroData,
  }).then(res => res.content);
}
