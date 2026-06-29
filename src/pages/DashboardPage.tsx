import { useState, useEffect } from 'react';
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

import { TabId } from '../layout/TabNavigation';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import TabNavigation from '../layout/TabNavigation';
import LoadingOverlay from '../layout/LoadingOverlay';
import ErrorBanner from '../layout/ErrorBanner';
import FormInput from '../features/FormInput';
import OverviewPanel from '../features/overview/OverviewPanel';
import NumerologyViewer from '../features/numerology/NumerologyViewer';
import AstrologyViewer from '../features/astrology/AstrologyViewer';
import TuViViewer from '../features/tuvi/TuViViewer';
import BattuViewer from '../features/battu/BattuViewer';
import HumanDesignViewer from '../features/human-design/HumanDesignViewer';
import PrintDossier from '../print/PrintDossier';

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

  const handleRecalculate = (p: UserProfile) => {
    const n = computeNumerology(p.name, p.dob);
    const a = computeAstrology(p.dob, p.time);
    const t = computeTuVi(p.dob, p.time, p.gender);
    const b = computeBattu(p.dob, p.time);
    const h = computeHumanDesign(p.dob, p.time);

    setProfile(p);
    setNumData(n);
    setAstData(a);
    setTuviData(t);
    setBattuData(b);
    setHdData(h);
  };

  const handleStartAnalysis = async (userProfile: UserProfile, runAi: boolean) => {
    setErrorText(null);
    setLocalLoading(true);
    handleRecalculate(userProfile);

    if (!runAi) {
      setAiReport(null);
      await new Promise(r => setTimeout(r, 80));
      setLocalLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadingMsgIdx(0);

    try {
      const data = await fetchFateReport(userProfile);
      setAiReport(data);
      setActiveTab('overview');
    } catch (e: any) {
      console.error(e);
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
            </div>
          </section>
        )}

        {profile && numData && astData && tuviData && battuData && hdData && (
          <div className="hidden print:block">
            <PrintDossier
              profile={profile}
              numData={numData}
              astData={astData}
              tuviData={tuviData}
              battuData={battuData}
              hdData={hdData}
              aiReport={aiReport}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
