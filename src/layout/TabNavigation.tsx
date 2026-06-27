import { BookOpen, Layers, Compass, Award, Activity, FileText } from 'lucide-react';

type TabId = 'overview' | 'numerology' | 'astrology' | 'tuvi' | 'battu' | 'hd';

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  hasAiReport: boolean;
}

const TABS = [
  { id: 'overview' as TabId, name: 'Báo Cáo Đại Sư', icon: BookOpen },
  { id: 'numerology' as TabId, name: 'Thần Số Học', icon: Layers },
  { id: 'astrology' as TabId, name: 'Chiêm Tinh (Bản Đồ Sao)', icon: Compass },
  { id: 'tuvi' as TabId, name: 'Lá Số Tử Vi', icon: Award },
  { id: 'battu' as TabId, name: 'Bát Tự Ngũ Hành', icon: Activity },
  { id: 'hd' as TabId, name: 'Thiết Kế Nhân Dạng', icon: FileText },
];

export default function TabNavigation({ activeTab, onTabChange, hasAiReport }: TabNavigationProps) {
  return (
    <div className="flex border-b border-white/5 overflow-x-auto scroller-hidden gap-1.5 pb-1">
      {TABS.map((tab) => {
        const TabIcon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-4 text-xs font-display font-medium tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer rounded-t-xl ${
              isActive
                ? 'border-indigo-400 text-indigo-300 bg-white/5 font-bold shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-white/2'
            }`}
          >
            <TabIcon className="w-3.5 h-3.5" />
            <span>{tab.name}</span>
            {tab.id === 'overview' && hasAiReport && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export type { TabId };
