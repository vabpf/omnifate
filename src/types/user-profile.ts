export interface UserProfile {
  name: string;
  dob: string;
  time: string;
  place: string;
  gender: 'Nam' | 'Nữ';
  timezone?: string;
  profileId?: string;
}
