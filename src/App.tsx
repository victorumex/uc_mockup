import React, { useState, useEffect } from 'react';
import { ActiveTab, SimulatorState } from './types';
import { SidebarSimulator } from './components/SidebarSimulator';
import { UseCaseSelector } from './components/UseCaseSelector';
import { Mockups } from './components/Mockups';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Initialize state simulating a real CDP payload
  const [simulatorState, setSimulatorState] = useState<SimulatorState>({
    userName: 'Bezaleel',
    fieldOfInterest: 'Product Management',
    discountPercentage: 20,
    modulesCompleted: 3,
    sessionsDone: 4,
    sessionsLeft: 1,
    mentorRating: 4.8,
    daysInactive: 2,
    campaignTriggered: 'UC-01'
  });

  // Keep track of which tab the user manually clicks. If they don't click,
  // we can optionally lock it to the auto-triggered one, or let them override.
  const [activeTab, setActiveTab] = useState<ActiveTab>('UC-01');

  // Auto-evaluation hook: updates activeTab as simulator sliders change, 
  // so the user sees immediate mockup reaction, but allows manual override clicks too!
  const getAutoTriggerTab = (): ActiveTab => {
    if (simulatorState.daysInactive >= 10) return 'UC-02';
    if (simulatorState.sessionsDone >= 3 && simulatorState.mentorRating >= 4.5) return 'UC-04';
    if (simulatorState.modulesCompleted >= 2) return 'UC-01';
    return 'UC-03';
  };

  const autoTab = getAutoTriggerTab();

  // Synced state triggers
  useEffect(() => {
    setActiveTab(autoTab);
    setSimulatorState(prev => ({ ...prev, campaignTriggered: autoTab }));
  }, [autoTab]);

  return (
    <div className="min-h-screen bg-[#081931] text-[#f8f7ff] font-sans selection:bg-[#7b2cbf]/30 selection:text-[#f8f7ff] relative overflow-x-hidden">
      {/* Frosted Glass Background Mesh Blobs */}
      <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] max-w-[800px] bg-gradient-to-br from-[#7b2cbf]/15 to-[#4b0686]/15 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] bg-gradient-to-tr from-[#7b2cbf]/8 to-[#081931]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[35%] left-[20%] w-[45vw] h-[45vw] max-w-[550px] bg-gradient-to-br from-[#4b0686]/10 to-[#7b2cbf]/10 rounded-full blur-[110px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* HEADER SECTION */}
        <header className="border-b border-white/10 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7b2cbf] to-[#4b0686] rounded-xl flex items-center justify-center font-black text-[#f8f7ff] text-lg tracking-wider shadow-lg shadow-[#7b2cbf]/20">
                UP
              </div>
              <div>
                <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  UpPath <span className="text-xs bg-[#7b2cbf]/20 text-[#f8f7ff] border border-[#7b2cbf]/30 px-2 py-0.5 rounded-full font-bold">CRM & CDP STRATEGY</span>
                </h1>
                <p className="text-xs text-slate-400 font-medium">Skenario, Journey & Mockup Campaign Interaktif — Kelompok 01</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Platform Status: <strong className="text-emerald-400">CDP 365 Connected</strong></span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 flex-1">

          {/* MAIN INTERACTIVE SIMULATOR (THE CHOSEN FOCUS!) */}
          <section id="section-core" className="flex flex-col gap-4">
            <div className="flex justify-between items-center bg-white/[0.03] border border-white/10 px-6 py-4 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7b2cbf]/80 text-[#f8f7ff] flex items-center justify-center font-bold font-mono text-sm leading-none border border-white/10">
                  ★
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-bold text-white tracking-tight flex items-center gap-2">
                    Use Case Campaign & Mockup Simulator <Sparkles size={16} className="text-[#f8f7ff] animate-pulse" />
                  </h2>
                  <p className="text-xs text-slate-400">Gunakan simulator sebelah kiri untuk memicu atau edit variabel desain mockup!</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* LEFT SIDEPANEL: THE CDP USER SIMULATOR */}
              <div className="lg:col-span-4 h-full">
                <SidebarSimulator 
                  state={simulatorState} 
                  onChange={(updates) => {
                    setSimulatorState(prev => {
                      const next = { ...prev, ...updates };
                      // If slides are custom tweaked, auto-set state.sessionsLeft 
                      if (updates.sessionsDone !== undefined) {
                        next.sessionsLeft = Math.max(0, 4 - next.sessionsDone);
                      }
                      return next;
                    });
                  }} 
                />
              </div>

              {/* RIGHT SIDE: INTERACTIVE MOCKUPS AND SELECTOR */}
              <div className="lg:col-span-8 flex flex-col gap-4 h-full">
                
                {/* Tabs for Use Cases */}
                <UseCaseSelector 
                  activeTab={activeTab} 
                  onSelect={(tab) => {
                    setActiveTab(tab);
                    // Optionally sync back daysInactive or triggers to make user feel the flow
                    if (tab === 'UC-01') {
                      setSimulatorState(prev => ({ ...prev, daysInactive: 2, modulesCompleted: Math.max(2, prev.modulesCompleted) }));
                    } else if (tab === 'UC-02') {
                      setSimulatorState(prev => ({ ...prev, daysInactive: Math.max(10, prev.daysInactive) }));
                    } else if (tab === 'UC-03') {
                      setSimulatorState(prev => ({ ...prev, daysInactive: 2, modulesCompleted: 0, sessionsDone: 0 }));
                    } else if (tab === 'UC-04') {
                      setSimulatorState(prev => ({ ...prev, daysInactive: 1, sessionsDone: Math.max(3, prev.sessionsDone), mentorRating: Math.max(4.5, prev.mentorRating) }));
                    }
                  }} 
                  autoTriggeredTab={autoTab}
                />

                {/* Live Mockup Renderer */}
                <div className="flex-1">
                  <Mockups state={simulatorState} activeTab={activeTab} />
                </div>

              </div>

            </div>

            {/* LIVE FUNNELS & CAMPAIGN CONVERSION STATISTICS */}
            <AnalyticsPanel activeTab={activeTab} state={simulatorState} />

          </section>

        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md py-12 mt-12 text-center text-xs text-slate-400 relative z-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-2">
            <p className="font-bold text-white">UpPath CRM & CDP Interactive Campaign Simulator</p>
            <p>Disusun oleh Kelompok 01 • B2C SaaS Freemium Peer Mentoring Platform</p>
            <p className="mt-4 text-slate-600">© 2025 UpPath ITS. Powered by Google AI Studio React Framework.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
