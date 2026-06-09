import React from 'react';
import { ActiveTab, SimulatorState } from '../types';
import { BarChart, Percent, Users, Clock, Flame, ShieldAlert, Heart, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface AnalyticsPanelProps {
  activeTab: ActiveTab;
  state: SimulatorState;
}

export function AnalyticsPanel({ activeTab, state }: AnalyticsPanelProps) {
  // Return different simulated analytics depending on the selected usecase!
  const getMetrics = () => {
    switch (activeTab) {
      case 'UC-01':
        return {
          title: 'Segment S3 - Campaign Performance',
          items: [
            { label: 'Free-to-Pro CVR', value: '18.4%', target: '18.0%', icon: TrendingUp, color: 'text-purple-400 bg-purple-500/10' },
            { label: 'Popup Engagement', value: '8.7%', target: '8.0%', icon: Percent, color: 'text-indigo-400 bg-indigo-500/10' },
            { label: 'Time-to-Upgrade', value: '19.2 Hari', target: '≤21 Hari', icon: Clock, color: 'text-pink-400 bg-pink-500/10' },
            { label: 'Conversations Triaged', value: '1,420 Users', target: 'N/A', icon: Users, color: 'text-blue-400 bg-blue-500/10' }
          ],
          funnel: [
            { stage: 'Eligible S3 Segments', count: 2450, percentage: '100%' },
            { stage: 'Campaign Triggered & Sent', count: 2450, percentage: '100%' },
            { stage: 'Popup Shown / Email Opened', count: 1845, percentage: '75.3%' },
            { stage: 'Clicked Offer (CTA Click)', count: 421, percentage: '17.1%' },
            { stage: 'Successful Upgrade to Pro', count: 285, percentage: '11.6%' }
          ]
        };
      case 'UC-02':
        return {
          title: 'Segment S5 - Churn Warning KPI',
          items: [
            { label: 'WhatsApp CTR', value: '38.6%', target: '≥35.0%', icon: Percent, color: 'text-rose-400 bg-rose-500/10' },
            { label: 'Re-engagement Rate', value: '22.8%', target: '≥20.0%', icon: Flame, color: 'text-emerald-400 bg-emerald-500/10' },
            { label: 'Active Churn Prevented', value: '142 Premium', target: 'N/A', icon: ShieldAlert, color: 'text-amber-400 bg-amber-500/10' },
            { label: 'Estimated Saved MRR', value: 'Rp 21.3 Jt', target: 'N/A', icon: TrendingUp, color: 'text-sky-400 bg-sky-500/10' }
          ],
          funnel: [
            { stage: 'Identified At-Risk User', count: 620, percentage: '100%' },
            { stage: 'WhatsApp Message Sent', count: 620, percentage: '100%' },
            { stage: 'Message Delivered & Read', count: 582, percentage: '93.8%' },
            { stage: 'Link Click Through (CTR)', count: 239, percentage: '38.5%' },
            { stage: 'Re-activated (Logged In)', count: 142, percentage: '22.9%' }
          ]
        };
      case 'UC-03':
        return {
          title: 'Segment S2 - Onboarding Funnel Progress',
          items: [
            { label: 'Completed Smart Mapping', value: '74.2%', target: '≥70.0%', icon: Percent, color: 'text-teal-400 bg-teal-500/10' },
            { label: 'Welcome Email Open Rate', value: '48.3%', target: '≥45.0%', icon: Percent, color: 'text-indigo-400 bg-indigo-500/10' },
            { label: 'Onboarding Bounce Rate', value: '2.4%', target: '≤5.0%', icon: ShieldAlert, color: 'text-rose-400 bg-rose-500/10' },
            { label: 'Day 7 Activation', value: '62.7%', target: 'N/A', icon: Heart, color: 'text-purple-400 bg-purple-500/10' }
          ],
          funnel: [
            { stage: 'New Signup Completed', count: 1200, percentage: '100%' },
            { stage: 'Email Welcome Delivered', count: 1200, percentage: '100%' },
            { stage: 'Email Welcome Opened', count: 580, percentage: '48.3%' },
            { stage: 'Smart Mapping Commenced', count: 531, percentage: '44.2%' },
            { stage: 'Smart Mapping Finished', count: 394, percentage: '32.8%' }
          ]
        };
      case 'UC-04':
        return {
          title: 'Segment S4 - Affiliate Program Activity',
          items: [
            { label: 'Referral CVR', value: '27.4%', target: '≥25.0%', icon: TrendingUp, color: 'text-amber-400 bg-amber-500/10' },
            { label: 'Active Advocates (High Sat)', value: '89 Users', target: 'N/A', icon: Users, color: 'text-emerald-400 bg-emerald-500/10' },
            { label: 'Total Invites Accepted', value: '312 Joins', target: 'N/A', icon: PlusIcon, color: 'text-indigo-400 bg-indigo-500/10' },
            { label: 'Organic CAC Saved', value: 'Rp 14.0 Jt', target: 'N/A', icon: Flame, color: 'text-rose-400 bg-rose-500/10' }
          ],
          funnel: [
            { stage: 'Selesai ≥ 3 Sesi & ★ ≥4.5', count: 320, percentage: '100%' },
            { stage: 'Voucher Code Generated', count: 320, percentage: '100%' },
            { stage: 'Referral Copied or Shared', count: 182, percentage: '56.8%' },
            { stage: 'Invited Friend Signed Up', count: 114, percentage: '35.6%' },
            { stage: 'Friend Upgraded (Paid)', count: 88, percentage: '27.5%' }
          ]
        };
    }
  };

  const PlusIcon = ({ size, className }: { size: number; className?: string }) => (
    <Sparkles size={size} className={className} />
  );

  const data = getMetrics();

  return (
    <div id="analytics-panel" className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md flex flex-col gap-6 text-slate-100">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart size={18} className="text-indigo-300" /> Analitik Efektivitas CDP 365
        </h3>
        <p className="text-xs text-slate-400 font-medium">{data.title}</p>
      </div>

      {/* Main KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {data.items.map((m, index) => {
          const Icon = m.icon;
          return (
            <div key={index} className="bg-white/[0.02] border border-white/10 p-4 rounded-xl flex flex-col gap-2 relative overflow-hidden group hover:border-white/20 hover:bg-white/[0.04] transition-all">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider line-clamp-1">{m.label}</span>
                <div className={`p-1.5 rounded-lg border border-white/5 ${m.color} shrink-0`}>
                  <Icon size={14} />
                </div>
              </div>
              <p className="text-xl font-extrabold text-white mt-1">{m.value}</p>
              {m.target !== 'N/A' && (
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" /> Target: <strong className="text-slate-200">{m.target}</strong>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Conversion Funnel Breakdown */}
      <div className="bg-white/[0.01] p-5 rounded-xl border border-white/10 flex flex-col gap-3">
        <div className="flex justify-between items-center pb-2 border-b border-white/10">
          <span className="text-xs font-bold text-slate-300">Corong Konversi Kampanye (Funnel Analysis)</span>
          <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/10 text-slate-400 font-mono">LIVE SIMULATED</span>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {data.funnel.map((f, i) => {
            // Visual width based on count ratio
            const maxVal = data.funnel[0].count;
            const widthPct = (f.count / maxVal) * 100;

            return (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">{f.stage}</span>
                  <div className="flex gap-2">
                    <span className="text-slate-400 font-mono">{f.count.toLocaleString()} Users</span>
                    <span className="text-indigo-300 font-mono font-bold mr-1">({f.percentage})</span>
                  </div>
                </div>
                {/* Visual Bar representing progression */}
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      activeTab === 'UC-01' ? 'bg-purple-500' :
                      activeTab === 'UC-02' ? 'bg-rose-500' :
                      activeTab === 'UC-03' ? 'bg-emerald-500' :
                      'bg-amber-500'
                    }`} 
                    style={{ width: `${widthPct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
