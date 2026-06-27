import { UserProfile, NumerologyData } from '../types';
import { apiFetch } from './client';

interface NumerologyPartResponse {
  content: string;
}

export function fetchNumerologyPart(
  profile: UserProfile,
  numData: NumerologyData,
  part: string
): Promise<string> {
  return apiFetch<NumerologyPartResponse>('/api/numerology-part', {
    name: profile.name,
    dob: profile.dob,
    gender: profile.gender,
    numData,
    part,
  }).then(res => res.content);
}
