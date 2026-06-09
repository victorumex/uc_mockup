import React from 'react';
import { SimulatorState } from '../types';
import { User, BookOpen, Clock, Star, Gift, Settings, Activity, AlertCircle } from 'lucide-react';

interface SidebarSimulatorProps {
  state: SimulatorState;
  onChange: (updates: Partial<SimulatorState>) => void;
}

export function SidebarSimulator({ state, onChange }: SidebarSimulatorProps) {
  // Evaluates which campaign gets triggered based on the schema rules in the markdown
  const getAutoTriggerReason = () => {
    if (state.userSegment === 'anonymous') {
      return {
        code: 'UC-05',
        title: 'Retargeting Anonim',
        reason: 'Pengunjung tanpa akun (Session ≥ 90s atau page_views ≥ 2)'
      };
    } else if (state.userSegment === 'lead') {
      return {
        code: 'UC-06',
        title: 'Lead Nurture',
        reason: 'Email disubmit via Pop-up, belum mendaftar akun'
      };
    } else if (state.userSegment === 'free_explorer') {
      if (state.modulesCompleted >= 2) {
        return {
          code: 'UC-01',
          title: 'Konversi Free → Pro',
          reason: 'Modul selesai ≥ 2 (Free Explorer)'
        };
      } else {
        return {
          code: 'UC-03',
          title: 'Onboarding Drip Sequence',
          reason: 'Pengguna baru terdaftar (Onboarding 7-Hari)'
        };
      }
    } else { // premium
      if (state.daysInactive >= 10) {
        return {
          code: 'UC-02',
          title: 'Re-engage At-Risk',
          reason: 'Ketidakaktifan ≥ 10 hari pada akun Premium'
        };
      } else if (state.sessionsDone >= 3 && state.mentorRating >= 4.5) {
        return {
          code: 'UC-04',
          title: 'Referral Activation',
          reason: 'Sesi mentoring ≥ 3 & rata-rata rating ★ ≥ 4.5'
        };
      } else {
        return {
          code: 'UC-04',
          title: 'Referral Activation',
          reason: 'Campaign loyalitas Premium / Kriteria terpenuhi'
        };
      }
    }
  };

  const getTahapLabel = (code: string) => {
    switch (code) {
      case 'UC-05': return 'Tahap 1';
      case 'UC-06': return 'Tahap 2';
      case 'UC-03': return 'Tahap 3';
      case 'UC-01': return 'Tahap 4';
      case 'UC-02': return 'Tahap 5';
      case 'UC-04': return 'Tahap 6';
      default: return code;
    }
  };

  const triggered = getAutoTriggerReason();

  const fields = [
    { value: 'Product Management', label: 'Product Management' },
    { value: 'UI/UX Design', label: 'UI/UX Design' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Digital Marketing', label: 'Digital Marketing' }
  ];

  return (
    <div id="sidebar-simulator" className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md text-[#f8f7ff] flex flex-col gap-6">
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <div className="p-2 bg-white/5 text-[#7b2cbf] rounded-lg border border-white/10">
          <Settings size={20} />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">CDP Persona Simulator</h2>
          <p className="text-xs text-slate-400 font-medium">Atur atribut profil untuk memicu campaign</p>
        </div>
      </div>

      {/* Profile Parameters */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Activity size={13} className="text-[#7b2cbf]" /> Segmentasi Profil CDP
          </label>
          <div className="grid grid-cols-2 gap-1.5 bg-white/[0.02] p-1.5 rounded-xl border border-white/10">
            {[
              { id: 'anonymous', label: 'Visitor Anonim (S1)' },
              { id: 'lead', label: 'Lead Nurture (S1)' },
              { id: 'free_explorer', label: 'Free Explorer (S2)' },
              { id: 'premium', label: 'Paid Premium (S4)' }
            ].map(seg => (
              <button
                key={seg.id}
                type="button"
                onClick={() => onChange({ userSegment: seg.id as any })}
                className={`px-2 py-2 rounded-lg text-[10px] font-bold transition-all text-center border cursor-pointer ${
                  state.userSegment === seg.id 
                  ? 'bg-[#7b2cbf] text-white border-white/10 shadow-md' 
                  : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {seg.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <User size={13} className="text-[#7b2cbf]" /> Nama Pengguna (Mentee)
          </label>
          <input
            id="user-name-input"
            type="text"
            value={state.userName}
            onChange={(e) => onChange({ userName: e.target.value })}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#7b2cbf] hover:border-white/20 transition-all"
            placeholder="Masukkan nama pengguna..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <BookOpen size={13} className="text-[#7b2cbf]" /> Jalur Karir Pilihan
          </label>
          <div className="relative">
            <select
              id="career-path-select"
              value={state.fieldOfInterest}
              onChange={(e) => onChange({ fieldOfInterest: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7b2cbf] hover:border-white/20 transition-all appearance-none cursor-pointer"
            >
              {fields.map((f) => (
                <option key={f.value} value={f.value} className="bg-[#081931] text-[#f8f7ff]">{f.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
              <span className="text-[10px]">▼</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 my-2"></div>

        {/* Sliders */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <BookOpen size={13} className="text-emerald-400" /> Modul Selesai
            </label>
            <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
              {state.modulesCompleted} Modul
            </span>
          </div>
          <input
            id="modules-completed-range"
            type="range"
            min="0"
            max="5"
            value={state.modulesCompleted}
            onChange={(e) => onChange({ modulesCompleted: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <p className="text-[10px] text-slate-500 mt-1">Selesai ≥ 2 memicu kriteria penawaran Premium (Tahap 4)</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <Star size={13} className="text-amber-400" /> Sesi Mentoring & Rating
            </label>
            <span className="text-xs bg-amber-500/15 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
              {state.sessionsDone} Sesi (★ {state.mentorRating.toFixed(1)})
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
              <p className="text-[10px] text-slate-500 mb-1 font-semibold uppercase">Jumlah Sesi</p>
              <input
                id="sessions-done-range"
                type="range"
                min="0"
                max="6"
                value={state.sessionsDone}
                onChange={(e) => onChange({ sessionsDone: parseInt(e.target.value) })}
                className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
            <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
              <p className="text-[10px] text-slate-500 mb-1 font-semibold uppercase">Nilai rating</p>
              <input
                id="mentor-rating-range"
                type="range"
                min="3.5"
                max="5.0"
                step="0.1"
                value={state.mentorRating}
                onChange={(e) => onChange({ mentorRating: parseFloat(e.target.value) })}
                className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Min. 3 Sesi & ★4.5 memicu Referral Reward (Tahap 6)</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <Clock size={13} className="text-rose-400" /> Ketidakaktifan (Hari)
            </label>
            <span className="text-xs bg-rose-500/10 text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded-full font-bold">
              {state.daysInactive} Hari
            </span>
          </div>
          <input
            id="days-inactive-range"
            type="range"
            min="0"
            max="15"
            value={state.daysInactive}
            onChange={(e) => onChange({ daysInactive: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
          <p className="text-[10px] text-slate-500 mt-1">Inaktif ≥ 10 hari memicu Churn Prevention WA (Tahap 5)</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <Gift size={13} className="text-[#7b2cbf]" /> Diskon Ditawarkan
            </label>
            <span className="text-xs bg-[#7b2cbf]/10 text-[#f8f7ff] border border-[#7b2cbf]/20 px-2 py-0.5 rounded-full font-bold">
              {state.discountPercentage}% OFF
            </span>
          </div>
          <input
            id="discount-percentage-range"
            type="range"
            min="10"
            max="40"
            step="5"
            value={state.discountPercentage}
            onChange={(e) => onChange({ discountPercentage: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#7b2cbf]"
          />
        </div>
      </div>

      {/* Dynamic Trigger Box */}
      <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Activity size={14} className="animate-pulse text-[#7b2cbf]" /> HASIL EVALUASI CDP 365
        </span>

        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 flex flex-col gap-2.5 hover:border-white/15 transition-all">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                triggered.code === 'UC-01' ? 'bg-[#7b2cbf]/25 text-[#f8f7ff] border border-[#7b2cbf]/30' :
                triggered.code === 'UC-02' ? 'bg-rose-500/15 text-rose-300 border border-rose-500/20' :
                triggered.code === 'UC-04' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20' :
                triggered.code === 'UC-05' ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20' :
                triggered.code === 'UC-06' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20' :
                'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
              }`}>
                {getTahapLabel(triggered.code)} — AKTIF
              </span>
              <h3 className="text-sm font-bold text-white mt-1.5">{triggered.title}</h3>
            </div>
          </div>
          <div className="flex items-start gap-1.5 text-xs text-slate-400 bg-white/[0.01] p-2 rounded-lg border border-white/5">
            <AlertCircle size={13} className="text-[#7b2cbf] shrink-0 mt-0.5" />
            <span>Pemicu: <strong className="text-slate-200">{triggered.reason}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
