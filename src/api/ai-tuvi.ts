import { UserProfile, TuViPalace } from '../types';
import { apiFetch } from './client';

interface AiTuViResponse {
  content: string;
}

export function fetchAiTuVi(
  profile: UserProfile,
  tuviData: TuViPalace[]
): Promise<string> {
  return apiFetch<AiTuViResponse>('/api/ai/tuvi', {
    name: profile.name,
    dob: profile.dob,
    time: profile.time,
    place: profile.place,
    gender: profile.gender,
    tuviData,
  }).then(res => res.content);
}
