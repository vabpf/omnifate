import {
  collection, query, where, getDocs, setDoc, doc, deleteDoc, addDoc, Timestamp,
  orderBy, limit, getDoc, serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile, FateAnalysisReport } from '../types';

export async function saveProfile(userId: string, profile: UserProfile): Promise<string> {
  if (profile.profileId) {
    await setDoc(doc(db, 'profiles', profile.profileId), {
      userId,
      name: profile.name,
      dob: profile.dob,
      time: profile.time,
      place: profile.place,
      gender: profile.gender,
      timezone: profile.timezone || 'Asia/Ho_Chi_Minh',
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return profile.profileId;
  }

  const ref = await addDoc(collection(db, 'profiles'), {
    userId,
    name: profile.name,
    dob: profile.dob,
    time: profile.time,
    place: profile.place,
    gender: profile.gender,
    timezone: profile.timezone || 'Asia/Ho_Chi_Minh',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function loadProfiles(userId: string): Promise<UserProfile[]> {
  const q = query(collection(db, 'profiles'), where('userId', '==', userId), orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => {
    const data = d.data();
    return {
      name: data.name || '',
      dob: data.dob || '',
      time: data.time || '12:00',
      place: data.place || '',
      gender: data.gender || 'Nam',
      timezone: data.timezone || 'Asia/Ho_Chi_Minh',
      profileId: d.id,
    } as UserProfile;
  });
}

export async function deleteProfile(profileId: string): Promise<void> {
  await deleteDoc(doc(db, 'profiles', profileId));
}

export async function saveReport(
  userId: string, profileId: string, profile: UserProfile, report: FateAnalysisReport
): Promise<void> {
  await addDoc(collection(db, 'reports'), {
    userId,
    profileId,
    profileSnapshot: {
      name: profile.name,
      dob: profile.dob,
      time: profile.time,
      place: profile.place,
      gender: profile.gender,
    },
    report,
    model: 'gemini-3.5-flash',
    createdAt: serverTimestamp(),
  });
}

export async function loadLatestReport(userId: string, profileId: string): Promise<FateAnalysisReport | null> {
  const q = query(
    collection(db, 'reports'),
    where('userId', '==', userId),
    where('profileId', '==', profileId),
    orderBy('createdAt', 'desc'),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const data = snap.docs[0].data();
  return (data.report as FateAnalysisReport) || null;
}
