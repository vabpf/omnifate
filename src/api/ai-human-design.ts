import { UserProfile, HumanDesignData } from '../types';
import { apiFetch } from './client';

interface AiHumanDesignResponse {
  content: string;
}

export function fetchAiHumanDesign(
  profile: UserProfile,
  hdData: HumanDesignData
): Promise<string> {
  return apiFetch<AiHumanDesignResponse>('/api/ai/human-design', {
    name: profile.name,
    dob: profile.dob,
    time: profile.time,
    place: profile.place,
    gender: profile.gender,
    hdData,
  }).then(res => res.content);
}
