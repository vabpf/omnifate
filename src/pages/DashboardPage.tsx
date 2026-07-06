import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import {
  UserProfile,
  FateAnalysisReport,
  NumerologyData,
  AstrologyData,
  TuViPalace,
  BattuData,
  HumanDesignData,
} from '../types';
import {
  computeNumerology,
  computeAstrology,
  computeTuVi,
  computeBattu,
  computeHumanDesign,
} from '../computation';
import { fetchFateReport } from '../api';
import { saveReport, loadLatestReport } from '../lib/firestore-db';

import { TabId } from '../layout/TabNavigation';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import TabNavigation from '../layout/TabNavigation';
import LoadingOverlay from '../layout/LoadingOverlay';
import ErrorBanner from '../layout/ErrorBanner';
import LoadingSpinner from '../ui/LoadingSpinner';
import FormInput from '../features/FormInput';
import OverviewPanel from '../features/overview/OverviewPanel';

const NumerologyViewer = lazy(() => import('../features/numerology/NumerologyViewer'));
const AstrologyViewer = lazy(() => import('../features/astrology/AstrologyViewer'));
const TuViViewer = lazy(() => import('../features/tuvi/TuViViewer'));
const BattuViewer = lazy(() => import('../features/battu/BattuViewer'));
const HumanDesignViewer = lazy(() => import('../features/human-design/HumanDesignViewer'));
const PrintDossier = lazy(() => import('../print/PrintDossier'));

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const [numData, setNumData] = useState<NumerologyData | null>(null);
  const [astData, setAstData] = useState<AstrologyData | null>(null);
  const [tuviData, setTuviData] = useState<TuViPalace[] | null>(null);
  const [battuData, setBattuData] = useState<BattuData | null>(null);
  const [hdData, setHdData] = useState<HumanDesignData | null>(null);

  const [aiReport, setAiReport] = useState<FateAnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % 7);
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const recalculateRef = useRef(0);

  const handleRecalculate = (p: UserProfile) => {
    const ref = ++recalculateRef.current;
    const safeTime = p.time || '12:00';
    const n = computeNumerology(p.name, p.dob);
    const a = computeAstrology(p.dob, safeTime, undefined, undefined, p.timezone);
    const t = computeTuVi(p.dob, safeTime, p.gender, p.timezone);
    const b = computeBattu(p.dob, safeTime, p.timezone);
    const h = computeHumanDesign(p.dob, safeTime, p.timezone);

    setProfile(p);
    setNumData(n);
    setAstData(a);
    setTuviData(t);
    setBattuData(b);
    setHdData(h);

    const user = auth.currentUser;
    if (user && p.profileId) {
      loadLatestReport(user.uid, p.profileId).then(report => {
        if (ref !== recalculateRef.current) return;
        if (report) setAiReport(report);
      }).catch(() => {});
    }
  };

  const handleStartAnalysis = async (userProfile: UserProfile, runAi: boolean) => {
    setErrorText(null);
    setLocalLoading(true);

    const safeTime = userProfile.time || '12:00';
    const n = computeNumerology(userProfile.name, userProfile.dob);
    const a = computeAstrology(userProfile.dob, safeTime, undefined, undefined, userProfile.timezone);
    const t = computeTuVi(userProfile.dob, safeTime, userProfile.gender, userProfile.timezone);
    const b = computeBattu(userProfile.dob, safeTime, userProfile.timezone);
    const h = computeHumanDesign(userProfile.dob, safeTime, userProfile.timezone);

    setProfile(userProfile);
    setNumData(n);
    setAstData(a);
    setTuviData(t);
    setBattuData(b);
    setHdData(h);

    if (!runAi) {
      setAiReport(null);
      requestAnimationFrame(() => setLocalLoading(false));
      return;
    }

    setIsLoading(true);
    setLoadingMsgIdx(0);

    try {
      const data = await fetchFateReport(userProfile, {
        numData: n, astroData: a, tuviData: t, battuData: b, hdData: h,
      });
      setAiReport(data);
      setActiveTab('overview');

      const user = auth.currentUser;
      if (user && userProfile.profileId) {
        saveReport(user.uid, userProfile.profileId, userProfile, data).catch(() => {});
      }
    } catch (e: any) {
      console.error('Fate analysis AI error:', e);
      setErrorText(e.message || 'Không thể liên lạc với máy chủ AI lúc này. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
      setLocalLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen text-white flex flex-col relative overflow-hidden">
      <div className="absolute top-[-5%] left-[-10%] w-[55%] h-[55%] bg-warm-amber/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[55%] h-[55%] bg-warm-amber/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[25%] right-[5%] w-[35%] h-[35%] bg-warm-amber/5 rounded-full blur-[110px] pointer-events-none" />

      <Header
        profile={profile}
        onSelectSavedProfile={(savedP) => {
          handleRecalculate(savedP);
          setAiReport(null);
          setActiveTab('overview');
        }}
        onPrint={handlePrint}
      />

      {isLoading && (
        <LoadingOverlay messageIndex={loadingMsgIdx} />
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative">
        {errorText && (
          <ErrorBanner message={errorText} onDismiss={() => setErrorText(null)} />
        )}

        <section className="print:hidden">
          <FormInput onSubmit={handleStartAnalysis} isLoading={isLoading} localLoading={localLoading} user={user} />
        </section>

        {profile && numData && astData && tuviData && battuData && hdData && (
          <section className="space-y-6 print:hidden">
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              hasAiReport={!!aiReport}
            />

            <div className={`glass-container p-6 rounded-2xl min-h-[420px] transition-opacity duration-150 ${localLoading ? 'opacity-60' : ''}`}>
              <Suspense fallback={<LoadingSpinner text="Đang tải..." accentColor="amber" />}>
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fade-in">
                  <OverviewPanel
                    aiReport={aiReport}
                    numData={numData}
                    astData={astData}
                    tuviData={tuviData}
                    battuData={battuData}
                    hdData={hdData}
                  />
                </div>
              )}
              {activeTab === 'numerology' && (
                <NumerologyViewer data={numData} aiInterpretation={aiReport?.numerology} profile={profile} />
              )}
              {activeTab === 'astrology' && (
                <AstrologyViewer data={astData} aiInterpretation={aiReport?.astrology} profile={profile} />
              )}
              {activeTab === 'tuvi' && (
                <TuViViewer
                  palaces={tuviData}
                  userName={profile.name}
                  gender={profile.gender}
                  dob={profile.dob}
                  time={profile.time}
                  bornPlace={profile.place}
                  profile={profile}
                  aiInterpretation={aiReport?.tuvi}
                />
              )}
              {activeTab === 'battu' && (
                <BattuViewer data={battuData} aiInterpretation={aiReport?.battu} profile={profile} />
              )}
              {activeTab === 'hd' && (
                <HumanDesignViewer data={hdData} aiInterpretation={aiReport?.humanDesign} profile={profile} />
              )}
              </Suspense>
            </div>
          </section>
        )}

        {profile && numData && astData && tuviData && battuData && hdData && (
          <div className="hidden print:block">
            <Suspense fallback={null}>
            <PrintDossier
              profile={profile}
              numData={numData}
              astData={astData}
              tuviData={tuviData}
              battuData={battuData}
              hdData={hdData}
              aiReport={aiReport}
            />
            </Suspense>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
