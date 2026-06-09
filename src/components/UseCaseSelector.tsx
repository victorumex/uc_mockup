import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, AlertTriangle, HelpCircle, Gift } from 'lucide-react';

interface UseCaseSelectorProps {
  activeTab: ActiveTab;
  onSelect: (tab: ActiveTab) => void;
  autoTriggeredTab: ActiveTab;
}

export function UseCaseSelector({ activeTab, onSelect, autoTriggeredTab }: UseCaseSelectorProps) {
  const tabs = [
    {
      id: 'UC-01' as ActiveTab,
      title: 'UC-01: Konversi Free → Pro',
      label: 'Engagement-Driven Upgrade',
      target: 'Segment S3 – Conversion-Ready',
      icon: Sparkles,
      color: 'border-white/10 hover:border-[#7b2cbf]/60 bg-white/[0.01]',
      activeColor: 'bg-[#7b2cbf]/25 text-[#f8f7ff] border-[#7b2cbf] shadow-[0_0_15px_rgba(123,44,191,0.3)] backdrop-blur-md',
      badgeColor: 'bg-[#7b2cbf]/20 text-[#f8f7ff] border-[#7b2cbf]/35'
    },
    {
      id: 'UC-02' as ActiveTab,
      title: 'UC-02: Re-engage At-Risk',
      label: 'Churn Warning Handler',
      target: 'Segment S5 – At-Risk Premium',
      icon: AlertTriangle,
      color: 'border-white/10 hover:border-rose-500/50 bg-white/[0.01]',
      activeColor: 'bg-rose-600/20 text-rose-300 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.15)] backdrop-blur-md',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
    },
    {
      id: 'UC-03' as ActiveTab,
      title: 'UC-03: Onboarding Sequence',
      label: '7-Day Drip Welcome Campaign',
      target: 'Segment S2 – New Free Explorer',
      icon: HelpCircle,
      color: 'border-white/10 hover:border-emerald-500/50 bg-white/[0.01]',
      activeColor: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'UC-04' as ActiveTab,
      title: 'UC-04: Referral Activation',
      label: 'Organic Growth Catalyst',
      target: 'Segment S4 – Active Premium Loyal',
      icon: Gift,
      color: 'border-white/10 hover:border-amber-500/50 bg-white/[0.01]',
      activeColor: 'bg-amber-600/20 text-amber-300 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-md',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
    }
  ];

  return (
    <div id="usecase-tabs" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white/[0.03] p-2.5 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const isAuto = autoTriggeredTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`text-left p-4 rounded-xl border flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden ${
              isActive ? tab.activeColor : `${tab.color} text-slate-300 hover:bg-white/[0.04]`
            }`}
          >
            {isAuto && (
              <span className="absolute top-0 right-0 bg-[#7b2cbf] text-[#f8f7ff] font-extrabold text-[8px] tracking-widest px-2.5 py-0.5 rounded-bl uppercase border-l border-b border-white/10">
                AUTO-TRIGGER
              </span>
            )}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg border ${isActive ? 'bg-current/10 border-current/10 text-inherit' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                  <Icon size={16} />
                </div>
                <span className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">{tab.id}</span>
              </div>
              <h3 className="text-sm font-bold leading-tight mb-1 text-white">{tab.title}</h3>
              <p className="text-xs text-slate-400 font-medium mb-3">{tab.label}</p>
            </div>
            
            <div className={`mt-auto text-[10px] uppercase font-bold py-1 px-2.5 rounded-lg border w-fit ${
              isActive ? tab.badgeColor : 'bg-white/[0.02] text-slate-400 border-white/10'
            }`}>
              {tab.target}
            </div>
          </button>
        );
      })}
    </div>
  );
}
