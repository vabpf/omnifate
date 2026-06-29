import { UserProfile, BattuData } from '../types';
import { apiFetch } from './client';

interface AiBattuResponse {
  content: string;
}

export function fetchAiBattu(
  profile: UserProfile,
  battuData: BattuData
): Promise<string> {
  return apiFetch<AiBattuResponse>('/api/ai/battu', {
    name: profile.name,
    dob: profile.dob,
    time: profile.time,
    place: profile.place,
    gender: profile.gender,
    battuData,
  }).then(res => res.content);
}
