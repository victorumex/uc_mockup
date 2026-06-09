import React, { useState, useEffect } from 'react';
import { SimulatorState } from '../types';
import { 
  Smartphone, Mail, Lock, CheckCircle, RefreshCw, Sparkles, Send, 
  ChevronRight, Calendar, Award, Gift, ArrowRight, Bell, MessageSquare, Star, Laptop, Eye
} from 'lucide-react';

interface MockupsProps {
  state: SimulatorState;
  activeTab: 'UC-01' | 'UC-02' | 'UC-03' | 'UC-04' | 'UC-05' | 'UC-06';
}

export function Mockups({ state, activeTab }: MockupsProps) {
  // Toggle style for multiple formats
  const [subType, setSubType] = useState<string>('popup');
  
  // Drip sequence day indicator for UC-03
  const [selectedDripDay, setSelectedDripDay] = useState<1 | 2 | 3 | 5 | 7>(1);

  // Auto-reset subType when changing tabs to prevent state mismatch
  useEffect(() => {
    if (activeTab === 'UC-01') {
      setSubType('popup');
    } else if (activeTab === 'UC-04') {
      setSubType('banner');
    } else if (activeTab === 'UC-05') {
      setSubType('popup');
    } else if (activeTab === 'UC-06') {
      setSubType('email');
    }
  }, [activeTab]);

  // Real-time dynamic timer for popups
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // Calculates Price based on discount
  const basePrice = 149000;
  const discountedPrice = basePrice * (1 - state.discountPercentage / 100);
  const formattedBasePrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(basePrice);
  const formattedDiscountedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(discountedPrice);

  // Generate Referral code
  const generatedReferralCode = `${state.userName.slice(0, 5).toUpperCase()}${state.discountPercentage}`;

  return (
    <div id="mockups-container" className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md flex flex-col gap-6">
      
      {/* Top bar with selector for formats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Eye size={18} className="text-[#7b2cbf]" /> Live Mockup Preview
          </h3>
          <p className="text-xs text-slate-400 font-medium">Mockup interaktif menyesuaikan dengan profil simulator di sebelah kiri</p>
        </div>

        {/* Format selectors based on use case */}
        {activeTab === 'UC-01' && (
          <div className="bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-sm flex gap-1">
            <button
              onClick={() => setSubType('popup')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                subType === 'popup' ? 'bg-[#7b2cbf]/30 text-[#f8f7ff] border border-[#7b2cbf]/35 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone size={13} /> Mobile Pop-up
            </button>
            <button
              onClick={() => setSubType('email')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                subType === 'email' ? 'bg-[#7b2cbf]/30 text-[#f8f7ff] border border-[#7b2cbf]/35 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail size={13} /> Desktop Email
            </button>
          </div>
        )}

        {activeTab === 'UC-02' && (
          <span className="bg-rose-500/15 text-rose-300 border border-rose-500/20 px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider">
            WhatsApp Business API
          </span>
        )}

        {activeTab === 'UC-03' && (
          <div className="bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-sm flex gap-1">
            {([1, 2, 3, 5, 7] as const).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDripDay(day)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  selectedDripDay === day ? 'bg-emerald-600/30 text-emerald-200 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Day {day}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'UC-04' && (
          <div className="bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-sm flex gap-1">
            <button
              onClick={() => setSubType('banner')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                subType === 'banner' ? 'bg-amber-600/30 text-amber-200 border border-amber-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop size={13} /> Dashboard Banner
            </button>
            <button
              onClick={() => setSubType('email')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                subType === 'email' ? 'bg-amber-600/30 text-amber-200 border border-amber-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail size={13} /> Share Email
            </button>
          </div>
        )}

        {activeTab === 'UC-05' && (
          <div className="bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-sm flex gap-1">
            <button
              onClick={() => setSubType('popup')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                subType === 'popup' ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/30 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone size={13} /> Web Popup Lead Magnet
            </button>
            <button
              onClick={() => setSubType('ad')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                subType === 'ad' ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/30 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye size={13} /> Google Retargeting Ad
            </button>
          </div>
        )}

        {activeTab === 'UC-06' && (
          <div className="bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-sm flex gap-1">
            <button
              onClick={() => setSubType('email')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                subType === 'email' ? 'bg-amber-600/30 text-amber-200 border border-amber-500/30 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail size={13} /> Nurture Email Day 1
            </button>
            <button
              onClick={() => setSubType('whatsapp')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                subType === 'whatsapp' ? 'bg-amber-600/30 text-amber-200 border border-amber-500/30 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare size={13} /> WhatsApp Follow-Up
            </button>
          </div>
        )}
      </div>

      {/* RENDER ACTIVE USE CASE MOCKUP */}
      <div className="flex justify-center items-center py-6 bg-white/[0.01] rounded-xl border border-white/10 backdrop-blur-sm shadow-inner min-h-[500px]">
        
        {/* UC-01: FREE -> PRO CONVERSION */}
        {activeTab === 'UC-01' && (
          subType === 'popup' ? (
            /* MOBILE POP-UP SIMULATOR */
            <div className="relative mx-auto w-[320px] bg-slate-950/75 border-[8px] border-white/10 rounded-[36.5px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden">
              {/* Speaker & Sensor */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-12 h-1 bg-white/20 rounded-full"></div>
              </div>

              {/* IOS StatusBar */}
              <div className="flex justify-between text-[11px] text-slate-400 font-bold px-4 pt-1 pb-4">
                <span>09:41</span>
                <div className="flex gap-1.5">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Backdrop pop-up overlay */}
              <div className="bg-[#081931]/90 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-inner flex flex-col justify-between min-h-[440px] text-center">
                
                {/* Promo content */}
                <div>
                  <div className="w-10 h-10 bg-[#7b2cbf]/10 text-[#7b2cbf] rounded-full flex items-center justify-center mx-auto mb-3 border border-[#7b2cbf]/20">
                    <Sparkles size={20} />
                  </div>
                  <span className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">
                    Penawaran Terbatas
                  </span>
                  
                  <h4 className="text-sm font-bold text-white">Kamu Sudah Hampir Siap, <span className="text-[#7b2cbf]">{state.userName || 'Mentee'}</span>!</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Selesaikan perjalananmu menuju karir impian di <strong className="text-slate-200">{state.fieldOfInterest}</strong> dengan <strong>UpPath Premium</strong>.</p>
                </div>

                {/* Locked premium benefits list */}
                <div className="flex flex-col gap-1.5 my-4 text-left">
                  <div className="flex items-center gap-2 bg-[#4b0686]/15 border border-[#7b2cbf]/25 rounded-lg p-2 text-[10px] text-purple-200">
                    <Lock size={11} className="shrink-0 text-[#7b2cbf]" />
                    <span>Sesi 1-on-1 Mentoring — <strong className="text-[#f8f7ff]">Premium</strong></span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#4b0686]/15 border border-[#7b2cbf]/25 rounded-lg p-2 text-[10px] text-purple-200">
                    <Lock size={11} className="shrink-0 text-[#7b2cbf]" />
                    <span>Personal Career Roadmap — <strong className="text-[#f8f7ff]">Premium</strong></span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#4b0686]/15 border border-[#7b2cbf]/25 rounded-lg p-2 text-[10px] text-purple-200">
                    <Lock size={11} className="shrink-0 text-[#7b2cbf]" />
                    <span>Review Portofolio & CV — <strong className="text-[#f8f7ff]">Premium</strong></span>
                  </div>
                </div>

                {/* Pricing & Real-time timer */}
                <div className="bg-[#081931] border border-white/10 rounded-xl p-3 mb-4">
                  <p className="text-[10px] text-slate-400 mb-1">⏳ Penawaran berakhir dalam:</p>
                  <div className="grid grid-cols-3 gap-1 max-w-[150px] mx-auto font-mono text-center text-xs text-[#7b2cbf] font-bold mb-2">
                    <div className="bg-black/30 p-1 rounded border border-white/5">{formatNumber(timeLeft.hours)}h</div>
                    <div className="bg-black/30 p-1 rounded border border-white/5">{formatNumber(timeLeft.minutes)}m</div>
                    <div className="bg-black/30 p-1 rounded border border-white/5">{formatNumber(timeLeft.seconds)}s</div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[10px] text-slate-500 line-through">{formattedBasePrice}</p>
                    <p className="text-lg font-extrabold text-[#7b2cbf]">
                      {formattedDiscountedPrice}
                      <span className="text-[10px] font-normal text-slate-400">/bln</span>
                    </p>
                    <span className="text-[9px] font-bold text-emerald-400 uppercase mt-0.5">
                      Hemat {state.discountPercentage}% – Hanya hari ini!
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1.5">
                  <button className="w-full bg-[#7b2cbf] hover:bg-[#4b0686] active:scale-95 text-[#f8f7ff] font-bold text-[11px] py-2.5 rounded-xl cursor-all-scroll shadow-lg transition-all flex items-center justify-center gap-1.5">
                    🚀 UPGRADE SEKARANG - FREE SESI 1
                  </button>
                  <button className="w-full text-[10px] text-slate-500 hover:text-slate-400 py-1 font-semibold">
                    Mungkin nanti · Lihat detail paket
                  </button>
                </div>

              </div>

              {/* iOS Home Indicator */}
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-4"></div>
            </div>
          ) : (
            /* EMAIL CAMPAIGN SIMULATOR */
            <div className="w-full max-w-2xl bg-[#081931]/75 rounded-xl border border-white/10 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col">
              
              {/* Mail client Header mockup */}
              <div className="bg-white/[0.04] border-b border-white/10 p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center gap-2"><Mail size={13} className="text-[#7b2cbf]" /> EMAIL CAMPAIGN TAHAP 4</span>
                  <span className="bg-[#7b2cbf]/10 text-[#7b2cbf] border border-[#7b2cbf]/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold font-mono">DIPERSONALISASI VIA CDP</span>
                </div>
                <div className="text-xs">
                  <p className="text-slate-400"><span className="text-slate-500">From:</span> UpPath Team &lt;<span className="text-[#7b2cbf]">hello@uppath.id</span>&gt;</p>
                  <p className="text-slate-400"><span className="text-slate-500">To:</span> {state.userName.toLowerCase() || 'mentee'}@email.com</p>
                  <p className="text-slate-200 mt-1"><span className="text-slate-500">Subject:</span> ⚡ <strong>{state.userName || 'Budi'}</strong>, diskon {state.discountPercentage}% Premium-mu berakhir malam ini — jangan sampai terlewat!</p>
                </div>
              </div>

              {/* Styled HTML Email Body Mockup */}
              <div className="bg-[#f8f7ff] p-6 md:p-8 text-slate-800 font-sans max-h-[500px] overflow-y-auto">
                
                {/* Email Banner */}
                <div className="bg-[#081931] p-6 rounded-xl text-center text-[#f8f7ff] mb-6">
                  <div className="inline-block bg-[#7b2cbf] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider mb-2">
                    LIMITED PROMO: -{state.discountPercentage}%
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Menangkan Karir Impian Lebih Cepat!</h3>
                </div>

                <div className="space-y-4 text-sm leading-relaxed text-slate-600">
                  <p className="text-slate-800 font-semibold text-base">Hai {state.userName || 'Mentee'}! 👋</p>
                  <p>Kamu sudah menyelesaikan <strong>{state.modulesCompleted} modul</strong> di UpPath — itu pencapaian yang luar biasa untuk masa depanmu di bidang <strong className="text-[#7b2cbf] font-bold">{state.fieldOfInterest}</strong>.</p>
                  <p>Sekarang saatnya mempercepat perjalananmu dan mendapatkan pendampingan intensif dari praktisi muda terkemuka melalui <strong className="text-[#4b0686] font-bold">Premium Tier</strong>.</p>

                  {/* Highlights Card */}
                  <div className="bg-white border border-[#7b2cbf]/20 rounded-xl p-4 shadow-sm">
                    <p className="font-bold text-[#4b0686] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#7b2cbf]" /> Benefit Spesial Premium:
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>1-on-1 Peer Mentoring</strong> — Lakukan booking langsung dengan mentor terbaik pilihanmu.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Personal Career Roadmap</strong> — Rencana karir yang dirancang presisi sesuai minat spesifikmu.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>CV & Portfolio Review</strong> — Jaminan lulus resume screening HRD perusahaan impian.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pricing Discount Presentation */}
                  <div className="bg-[#4b0686]/5 border border-[#7b2cbf]/25 rounded-xl p-5 text-center my-6 max-w-sm mx-auto">
                    <span className="text-[10px] uppercase font-bold text-[#4b0686]">KODE UNIK KELOMPOK 01</span>
                    <p className="text-slate-400 text-xs line-through mt-1">{formattedBasePrice}</p>
                    <p className="text-2xl font-black text-[#7b2cbf]">{formattedDiscountedPrice}<span className="text-xs font-normal">/bln</span></p>
                    <p className="text-[11px] text-[#4b0686] bg-[#7b2cbf]/10 border border-[#7b2cbf]/20 rounded px-2.5 py-1 w-fit mx-auto mt-2 font-semibold">
                      Diskon Spesial {state.discountPercentage}% + Gratis 1 Sesi Mentoring Tambahan
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center pt-2">
                    <a href="#upgrade" className="inline-block bg-[#7b2cbf] hover:bg-[#4b0686] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md">
                      🚀 UPGRADE PREMIUM SEKARANG →
                    </a>
                  </div>

                </div>

                {/* Footer and dynamic metadata */}
                <div className="border-t border-slate-200 mt-8 pt-4 text-[11px] text-slate-400 text-center">
                  <p>© 2025 UpPath Company · Institut Teknologi Sepuluh Nopember (ITS)</p>
                  <p className="mt-1">Email ini dikirim karena kamu berada dalam kriteria <strong>S3 - Conversion-Ready</strong> berdasarkan aktivitas terintegrasi di database CDP UpPath.</p>
                </div>

              </div>

            </div>
          )
        )}

        {/* UC-02: RE-ENGAGEMENT AT-RISK PREM */}
        {activeTab === 'UC-02' && (
          <div className="flex flex-col gap-4 items-center">
            
            {/* Lockscreen Notification Mockup first */}
            <div className="w-[300px] bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-2xl p-3 shadow-lg flex items-start gap-2.5">
              <div className="p-2 bg-white/10 border border-white/10 text-indigo-300 rounded-lg shrink-0">
                <Bell size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-xs font-bold text-white">UpPath</span>
                  <span className="text-[10px] text-slate-500">Sekarang</span>
                </div>
                <h4 className="text-xs font-bold text-white mb-0.5">Kangen progres karirmu, {state.userName}? 🥺</h4>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Sesi mentor {state.fieldOfInterest} kamu sudah menanti. Kamu punya {state.sessionsLeft} sisa sesi mentoring gratis bulan ini.
                </p>
              </div>
            </div>

            {/* WHATSAPP APP SIMULATOR CONTAINER */}
            <div className="relative w-[320px] bg-[#0b0f19]/75 border-[8px] border-white/10 rounded-[36.5px] p-4 shadow-2xl overflow-hidden aspect-[9/16] max-h-[580px] backdrop-blur-xl">
              
              {/* Speaker & Sensor */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-12 h-1 bg-white/20 rounded-full"></div>
              </div>

              {/* WhatsApp App Header */}
              <div className="bg-[#075E54] text-white p-3 pt-6 pb-3 -mx-4 -mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-black">
                    UP
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-none flex items-center gap-1">
                      UpPath Official <CheckCircle size={10} className="fill-blue-500 text-white" />
                    </h4>
                    <span className="text-[9px] text-teal-100">Akun Bisnis Resmi</span>
                  </div>
                </div>
                <div className="flex gap-3 text-white">
                  <span className="text-xs">🔊</span>
                  <span className="text-xs">⋮</span>
                </div>
              </div>

              {/* Chat Canvas with Wallpaper */}
              <div className="bg-[#ECE5DD] -mx-4 p-4 flex flex-col gap-3 h-[420px] overflow-y-auto">
                <div className="text-center">
                  <span className="inline-block bg-[rgba(225,240,225,0.78)] text-slate-600 text-[9px] px-2 py-0.5 rounded shadow-sm text-center">
                    Hari ini
                  </span>
                </div>

                {/* WhatsApp Chat template bubble */}
                <div className="bg-white text-slate-900 rounded-tr-xl rounded-b-xl p-3 shadow-md max-w-[85%] self-start relative">
                  
                  {/* Decorative quote mark/icon */}
                  <div className="absolute -left-2 top-0 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent"></div>

                  <p className="text-xs font-medium mb-1.5 text-slate-800">Halo <strong>{state.userName || 'Budi'}</strong> 👋</p>
                  <p className="text-xs text-slate-700 leading-normal mb-2">Kami kangen lihat progres belajarmu di UpPath! 🚀</p>
                  <p className="text-xs text-slate-700 leading-normal mb-2">Kamu memiliki <strong>{state.modulesCompleted || '2'} modul yang tertunda</strong> dan benefit kuota mentoring yang belum dimanfaatkan:</p>

                  {/* Highlights section */}
                  <div className="bg-[#f0f2f5] rounded-lg p-2.5 border border-slate-200/60 mb-2 space-y-1">
                    <p className="text-[10px] text-slate-600">📌 Bidang: <strong>{state.fieldOfInterest}</strong></p>
                    <p className="text-[10px] text-rose-600">📌 Tidak aktif: <strong>{state.daysInactive} hari terakhir</strong></p>
                    <p className="text-[10px] text-teal-600">📌 Sisa Benefit: <strong>{state.sessionsLeft} sesi mentor aktif</strong></p>
                  </div>

                  <p className="text-xs text-slate-700 mb-2">Mari bimbing karirmu kembali terarah. Pilih jadwal mentor favoritmu hari ini!</p>
                  
                  <p className="text-[10px] text-emerald-600 font-bold block mb-1">👉 Klik link untuk kembali belajar:</p>
                  <span className="text-[11px] text-blue-600 underline font-semibold break-all leading-tight">
                    https://uppath.id/dashboard?ref=wa_atrisk
                  </span>

                  <span className="block text-[9px] text-slate-400 text-right mt-1">11:15</span>
                </div>

                {/* Automation trigger feedback pill for demo only */}
                <div className="text-center mt-2 flex flex-col gap-1 items-center">
                  <span className="bg-rose-500/10 text-rose-700 border border-rose-500/20 text-[9px] font-sans px-2.5 py-0.5 rounded font-black uppercase">
                    WhatsApp Campaign Evaluated
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono font-bold">
                    Target: S5 Churn Score ≥ 0.60
                  </span>
                </div>
              </div>

              {/* Chat Input placeholder */}
              <div className="bg-black/60 backdrop-blur-md border-t border-white/10 p-2 -mx-4 -mb-4 flex items-center gap-2">
                <input
                  type="text"
                  disabled
                  placeholder="Ketik pesan balasan..."
                  className="bg-white/5 rounded-full flex-1 px-3.5 py-1.5 text-xs text-slate-300 placeholder-slate-500 border border-white/10"
                />
                <button className="w-8 h-8 rounded-full bg-[#128C7E] hover:bg-[#075E54] flex items-center justify-center text-white shrink-0">
                  <Send size={13} />
                </button>
              </div>

              {/* iOS Home Indicator */}
              <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-4"></div>
            </div>

          </div>
        )}

        {/* UC-03: ONBOARDING DRIP SEQUENCE WELCOME */}
        {activeTab === 'UC-03' && (
          <div className="w-full flex flex-col gap-6 px-4">
            
            {/* Interactive Timeline */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Calendar size={13} className="text-emerald-400" /> Alur Campaign Onboarding 7-Hari (Drip Sequence):
              </p>
              
              <div className="grid grid-cols-5 gap-2 relative">
                {[1, 2, 3, 5, 7].map((dayIndicator) => {
                  const dayLabels: Record<number, { title: string; trigger: string }> = {
                    1: { title: 'Daftar Baru', trigger: 'Selamat Datang + Tes Mapping' },
                    2: { title: 'Day 2', trigger: 'Eksplorasi Fitur Portal' },
                    3: { title: 'Day 3', trigger: 'Undangan Webinar Sektor' },
                    5: { title: 'Day 5', trigger: 'Rekomendasi Modul Pertama' },
                    7: { title: 'Day 7', trigger: 'Teaser Fitur Premium' }
                  };
                  const isSelected = selectedDripDay === dayIndicator;

                  return (
                    <button
                      key={dayIndicator}
                      onClick={() => setSelectedDripDay(dayIndicator as 1 | 2 | 3 | 5 | 7)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        isSelected 
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'bg-white/[0.01] border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase">Day {dayIndicator}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                      </div>
                      <p className="text-[11px] font-bold text-slate-200 mt-1 truncate">{dayLabels[dayIndicator].title}</p>
                      <p className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">{dayLabels[dayIndicator].trigger}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Container Mockup reflecting current day click */}
            <div className="bg-[#0b0f19]/75 rounded-xl border border-white/10 overflow-hidden shadow-xl backdrop-blur-md">
              <div className="bg-white/[0.04] border-b border-white/10 p-4 flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <Mail size={13} className="text-emerald-400" /> ONBOARDING DRIP EMAIL – DAY {selectedDripDay}
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] uppercase font-bold">
                    Email {selectedDripDay === 1 ? '1' : selectedDripDay === 2 ? '2' : selectedDripDay === 3 ? '3' : selectedDripDay === 5 ? '4' : '5'} dari 5
                  </span>
                </div>
                <div className="text-xs mt-1 text-slate-400">
                  <p><span className="text-slate-500">Subject:</span> <strong className="text-slate-200">
                    {selectedDripDay === 1 && `🎓 Halo ${state.userName || 'Budi'}! Karir impianmu di ${state.fieldOfInterest} dimulai di sini`}
                    {selectedDripDay === 2 && `⚡ Optimalkan Profil UpPath-mu dalam 5 menit, ${state.userName}`}
                    {selectedDripDay === 3 && `🎙️ Temu Alumni ITS: "Cara Tembus Internship ${state.fieldOfInterest}"`}
                    {selectedDripDay === 5 && `📚 Target Karir: Ini modul rekomendasi untuk ${state.userName}`}
                    {selectedDripDay === 7 && `🌟 Laporan 7 Hari Belajar: Siap melangkah ke tingkat berikutnya?`}
                  </strong></p>
                </div>
              </div>

              {/* Dynamic Email Body container */}
              <div className="bg-white p-6 text-slate-800 max-h-[350px] overflow-y-auto">
                <p className="font-extrabold text-slate-800 text-sm">Hei {state.userName || 'Mentee'}! 👋</p>
                
                {selectedDripDay === 1 && (
                  <div className="mt-2 space-y-3 text-xs text-slate-600">
                    <p>Selamat bergabung di UpPath! Kami bangga bisa mendampingi proses eksplorasi karirmu.</p>
                    <p>Banyak fresh graduate atau mahasiswa seperti kamu merasa bingung mencari jalur karir yang mantap. Kami hadir agar proses eksplorasi karirmu lebih sistematis, terarah, dan dipandu mentor berpengalaman.</p>
                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100/60 my-3">
                      <p className="font-black text-slate-800 text-[11px] mb-1.5">⚡ LANGKAH PERTAMA HARI INI:</p>
                      <p>Rekomendasi terbaik kami adalah menyelesaikan <strong>Smart Mapping Quiz (10 Menit)</strong> agar sistem kami bisa memilih mentor ideal di bidang <strong className="text-emerald-700">{state.fieldOfInterest}</strong>.</p>
                    </div>
                  </div>
                )}

                {selectedDripDay === 2 && (
                  <div className="mt-2 space-y-3 text-xs text-slate-600">
                    <p>Profil yang lengkap adalah kunci sukses mendapatkan personal mentor terbaik!</p>
                    <p>Di UpPath, mentor akan melihat kesiapanmu di platform sebelum menyetujui sesi tatap muka pertama. Yuk isi detail universitas dan portofolio kasarmu agar mentor makin tertarik mendampingimu.</p>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 my-2">
                      <p className="font-bold">✓ Bidang Terpilih: <strong>{state.fieldOfInterest}</strong></p>
                      <p className="font-bold">✓ Modul Akademik: <strong>{state.modulesCompleted} dari 5 Selesai</strong></p>
                    </div>
                  </div>
                )}

                {selectedDripDay === 3 && (
                  <div className="mt-2 space-y-3 text-xs text-slate-600">
                    <p>Pendidikan tidak cuma di buku, tapi meluas lewat jejaring alumni professional!</p>
                    <p>Minggu ini kami mengadakan exclusive sharing session: <strong>"Mulai Karir Sukses di Sektor {state.fieldOfInterest}"</strong> bersama Praktisi Muda yang juga alumni kampus ITS.</p>
                    <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-indigo-950 font-bold">
                      📅 Hari/Tgl: Kamis Ini, Pukul 19.30 WIB<br/>
                      🎙️ Eksklusif gratis bagi pengguna Free UpPath aktif.
                    </div>
                  </div>
                )}

                {selectedDripDay === 5 && (
                  <div className="mt-2 space-y-3 text-xs text-slate-600">
                    <p>Kami melihat kamu sudah menyelesaikan beberapa topik pengenalan.</p>
                    <p>Berdasarkan profil kognitifmu, kamu direkomendasikan masuk ke kelas menengah <strong>{state.fieldOfInterest} Level 2</strong> yang baru dibuka minggu ini.</p>
                    <p className="font-semibold text-emerald-600">Klik tautan di dashboard untuk mulai mempelajari modul gratis ini hari ini.</p>
                  </div>
                )}

                {selectedDripDay === 7 && (
                  <div className="mt-2 space-y-3 text-xs text-slate-600">
                    <p>Sudah 7 hari sejak kamu memutuskan bergabung di UpPath.</p>
                    <p>Untuk menembus industri yang sangat kompetitif, belajar mandiri saja tidak cukup. Upgrade ke Premium dan mulailah berdiskusi langsung dengan mentor 1-on-1, melakukan mock-interview, hingga mendapatkan sertifikat uji kompetensi penentu seleksi HRD.</p>
                    <p className="text-slate-800 font-bold bg-amber-100 p-2 rounded text-center">Spesial 1 minggu bergabung: Dapatkan diskon {state.discountPercentage}% untuk upgrade Premium!</p>
                  </div>
                )}

                <div className="text-center mt-4">
                  <span className="inline-block bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg">
                    {selectedDripDay === 1 ? 'MULAI INTEGRATED SMART MAPPING →' : 'LANJUTKAN DI DASHBOARD →'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* UC-04: REFERRAL ACTIVATION */}
        {activeTab === 'UC-04' && (
          subType === 'banner' ? (
            /* REFERRAL IN-APP DASHBOARD BANNER */
            <div className="w-[340px] bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-6 text-slate-950 shadow-2xl relative overflow-hidden">
              
              {/* Pattern Background details */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute right-4 top-4 text-6xl opacity-15 select-none font-bold">🎁</div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-slate-950/10 flex items-center justify-center text-xl">
                  🎁
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-950 bg-amber-300 px-2 py-0.5 rounded font-black">
                  Elite Referral Program
                </span>
              </div>

              <h4 className="text-base font-extrabold text-amber-950 mb-1 leading-tight">
                Kamu Loved oleh Mentormu, {state.userName}!
              </h4>
              <p className="text-xs text-amber-900/95 leading-normal mb-4">
                Peringkat interaksimu <strong>★ {state.mentorRating.toFixed(1)}</strong> — kamu termasuk 10% Mentee teraktif di bidang {state.fieldOfInterest}. Bagikan kesuksesanmu sekarang!
              </p>

              {/* Dynamic Voucher presentation block */}
              <div className="bg-white/10 rounded-xl p-4 text-center border border-white/10 shadow-inner mb-4">
                <span className="text-[9px] font-bold text-black/85 uppercase tracking-widest">KANTOR POS REFERRAL-MU</span>
                <p className="text-xl font-mono font-black tracking-widest text-slate-950 mt-1 uppercase select-all">
                  {generatedReferralCode}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Temanmu dapat <strong className="text-amber-950">diskon 15%</strong>. Kamu dapat <strong className="text-emerald-950">Rp 25.000</strong> saldo e-wallet!
                </p>
              </div>

              {/* Action */}
              <button className="w-full bg-slate-950 hover:bg-slate-900 text-amber-400 font-extrabold text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                BAGIKAN LINK REFERRAL <ArrowRight size={13} />
              </button>

              <span className="block text-[10px] text-center text-amber-950 mt-3 opacity-80 font-medium">
                Selesai s.d {state.sessionsDone} Sesi Mentoring • Reward didrop Instan!
              </span>

            </div>
          ) : (
            /* REFERRAL INVITATION EMAIL */
            <div className="w-full max-w-2xl bg-[#0b0f19]/75 rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col backdrop-blur-md">
              
              {/* Mail client Header */}
              <div className="bg-white/[0.04] border-b border-white/10 p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center gap-2"><Mail size={13} className="text-amber-400" /> EMAIL REFERRAL PROGRAM TAHAP 6</span>
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold font-mono">CHAMPION SEGMENT ON SITE</span>
                </div>
                <div className="text-xs">
                  <p className="text-slate-400"><span className="text-slate-500">From:</span> UpPath Team &lt;<span className="text-amber-400">partners@uppath.id</span>&gt;</p>
                  <p className="text-slate-400"><span className="text-slate-500">To:</span> {state.userName.toLowerCase() || 'mentee'}@email.com</p>
                  <p className="text-slate-200 mt-1"><span className="text-slate-500">Subject:</span> 🎁 <strong>{state.userName || 'Budi'}</strong>, bagikan saldo Rp 25.000 ke temanmu dan dapatkan reward tak terbatas!</p>
                </div>
              </div>

              {/* Email Content body */}
              <div className="bg-white p-6 md:p-8 text-slate-800 max-h-[500px] overflow-y-auto">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 rounded-lg text-white text-center mb-6">
                  <h3 className="text-lg font-extrabold">Ajak Teman Naik Level Karir Bersama UpPath</h3>
                </div>

                <div className="space-y-4 text-xs md:text-sm leading-relaxed text-slate-600">
                  <p className="text-slate-800 font-bold">Hai {state.userName || 'Partner'}! 🌟</p>
                  <p>Kamu telah menyelesaikan <strong>{state.sessionsDone} sesi mentoring</strong> dengan nilai rata-rata <strong>★ {state.mentorRating.toFixed(1)}/5.0</strong> dari mentormu. Itu hasil komitmen belajar yang sangat membanggakan!</p>
                  
                  <p>Sebagai salah satu anggota loyal <strong>UpPath Premium</strong>, kami mengundangmu masuk ke program eksklusif <strong>Peer Advocate</strong>:</p>

                  {/* Rules benefits box */}
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 my-3 space-y-2 text-slate-700">
                    <p className="font-extrabold text-amber-800 uppercase text-xs flex items-center gap-1.5">
                      <Gift size={14} className="text-amber-600" /> Benefit Dua Arah:
                    </p>
                    <div className="flex items-start gap-2 text-xs">
                      <Award size={13} className="text-amber-600 mt-0.5 shrink-0" />
                      <span><strong>Dua Kali Hemat:</strong> Setiap teman yang mendaftar Premium menggunakan kode unikmu akan mendapat potongan langsung <strong>15%</strong>.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Award size={13} className="text-amber-600 mt-0.5 shrink-0" />
                      <span><strong>Komisi Tunai:</strong> Kamu berhak mendapatkan reward <strong>Rp 25.000 / teman</strong> yang sukses melakukan upgrade. Komisi langsung ditransfer via GoPay/OVO/ShopeePay.</span>
                    </div>
                  </div>

                  {/* Voucher code render box */}
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-center max-w-sm mx-auto my-5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">KODE REFERRAL UNIKMU:</p>
                    <p className="text-2xl font-mono font-black text-indigo-700 tracking-widest my-1 uppercase">{generatedReferralCode}</p>
                    <p className="text-[10px] text-slate-500">Atau gunakan URL: <u>uppath.id/register?promo={generatedReferralCode}</u></p>
                  </div>

                  <p className="text-center">
                    <span className="inline-block bg-amber-500 text-slate-950 font-black text-xs px-6 py-3 rounded-lg">
                      SALIN & AJAK TEMAN SEKARANG →
                    </span>
                  </p>
                </div>

                <div className="border-t border-slate-200 mt-8 pt-4 text-[10px] text-slate-400 text-center">
                  <p>© 2025 UpPath Company · ITS Surabaya</p>
                  <p className="mt-1">Pemberitahuan khusus dikirim melalui analitik segmentasi CDP berdasarkan kepuasan aktivitas mentor-mentee.</p>
                </div>
              </div>

            </div>
          )
        )}

        {/* UC-05: AWARENESS CAMPAIGN - VISITOR ANONIM */}
        {activeTab === 'UC-05' && (
          subType === 'popup' ? (
            /* POP-UP LEAD MAGNET MOCKUP */
            <div id="uc05-popup" className="w-[340px] bg-[#0c1424] border border-indigo-500/30 rounded-[32px] p-6 shadow-[0_25px_50px_-12px_rgba(99,102,241,0.25)] relative text-slate-100 flex flex-col gap-4 overflow-hidden">
              {/* Decorative radial gradient */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-500/20 rounded-full blur-xl"></div>
              
              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold font-mono">
                  S1: AWARENESS
                </span>
                <span className="text-slate-500 hover:text-white cursor-pointer text-xs">Close ×</span>
              </div>

              <div className="flex flex-col gap-2 text-center mt-2 z-10">
                <div className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/40 rounded-full flex items-center justify-center mx-auto text-indigo-300 shadow-md">
                  <Award size={24} className="text-indigo-400" />
                </div>
                <h3 className="text-sm font-extrabold text-white mt-1">Bingung Arah Karir? 🗺️</h3>
                <p className="text-xs text-slate-300 px-1 leading-relaxed">
                  Gabung dengan <strong className="text-indigo-300">10.000+ Mentee</strong> yang sudah menemukan jalur karir ideal mereka. Ambil tes minat bakat gratis sekarang!
                </p>
              </div>

              {/* Conversion Offer Card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex flex-col gap-3 z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs font-bold font-mono">
                    100%
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white">Interactive Assessment</h4>
                    <p className="text-[9px] text-slate-400">Rekomendasi Karir & Rencana Belajar Instan</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-1">
                  <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">SUBMIT EMAIL UNTUK HASIL ASSESSMENT:</label>
                  <input 
                    type="email" 
                    placeholder="nama@gmail.com" 
                    disabled
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 placeholder-slate-500" 
                  />
                </div>
              </div>

              {/* CTA button */}
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer z-10">
                MULAI TES GRATIS SEKARANG <ChevronRight size={13} />
              </button>

              <span className="text-[8px] text-center text-slate-500 block">
                *Hanya makan waktu 2 menit • Berbasis Data Industri Terbaru
              </span>
            </div>
          ) : (
            /* GOOGLE RETARGETING AD MOCKUP */
            <div id="uc05-ad" className="w-full max-w-xl bg-slate-900/60 rounded-2xl border border-white/10 p-5 shadow-2xl backdrop-blur-md flex flex-col gap-4 text-slate-200">
              <div className="flex justify-between items-center text-xs text-slate-500 pb-2 border-b border-white/5">
                <span className="flex items-center gap-2"><Eye size={13} className="text-indigo-400" /> GOOGLE ADS RE-MARKETING (DISPLAY SYSTEM)</span>
                <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono">Visitor Retargeting Tagged</span>
              </div>

              {/* Simulated browser search result / display ad */}
              <div className="bg-[#0b0f19] border border-indigo-500/20 p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-500/10 border-l border-b border-yellow-500/20 px-2 py-0.5 rounded-bl text-[8px] text-yellow-400 font-bold uppercase font-mono">
                  Ad · Bersponsor
                </div>

                <div className="flex items-center gap-3.5 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg border border-indigo-400/30">
                    <span className="text-white text-base font-black tracking-wide">UP</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white leading-snug">Capek Karir Gini-Gini Aja? 📈</h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Dapatkan 1-on-1 Mentoring dalam <b>{state.fieldOfInterest || 'Tech & Product'}</b> dari Top Mentor Blibli, Ruangguru, & Grab. Konsultasi Gratis!
                    </p>
                    <span className="text-[10px] text-indigo-400 font-mono mt-1 block"><u>uppath.id/assessment-karir</u></span>
                  </div>
                </div>

                <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold text-[10px] px-3.5 py-2 rounded-lg shrink-0 whitespace-nowrap shadow-md shadow-indigo-500/10 cursor-pointer">
                  Mulai Tes Bebas
                </button>
              </div>

              <div className="text-slate-400 text-[11px] leading-relaxed px-1">
                📌 <b>Kriteria CDP:</b> Terpicu secara otomatis karena Pixel CDP mendeteksi visitor anonim yang menghabiskan waktu &gt;90 detik di website tapi pergi tanpa melakukan registrasi (Cart Abandonment / Goal Funnel Incomplete).
              </div>
            </div>
          )
        )}

        {/* UC-06: ACQUISITION CAMPAIGN - LEAD NURTURE */}
        {activeTab === 'UC-06' && (
          subType === 'email' ? (
            /* EMAIL LEAD NURTURE DAY 1 */
            <div id="uc06-email" className="w-full max-w-2xl bg-[#0b0f19]/75 rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col backdrop-blur-md text-left">
              
              {/* Mail client Header */}
              <div className="bg-white/[0.04] border-b border-white/10 p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center gap-2"><Mail size={13} className="text-amber-400" /> EMAIL LEAD NURTURE TAHAP 2</span>
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold font-mono">DAY 1 — INTRODUCTORY SEQUENCE</span>
                </div>
                <div className="text-xs">
                  <p className="text-slate-400"><span className="text-slate-500">From:</span> Alvon - CEO UpPath &lt;<span className="text-amber-400">alvon@uppath.id</span>&gt;</p>
                  <p className="text-slate-400"><span className="text-slate-500">To:</span> {state.userName.toLowerCase() || 'lead'}@email.com</p>
                  <p className="text-slate-200 mt-1"><span className="text-slate-500">Subject:</span> 🧬 Hasil mini-assessment karirmu sudah siap, rintis jalur {state.fieldOfInterest || 'Tech'} terbaik!</p>
                </div>
              </div>

              {/* Email Content body */}
              <div className="bg-white p-6 md:p-8 text-slate-800 max-h-[500px] overflow-y-auto rounded-b-xl">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 rounded-lg text-white text-center mb-6">
                  <h3 className="text-base font-extrabold">Your Path to Premium {state.fieldOfInterest || 'Tech/Design'} Career</h3>
                  <p className="text-xs text-white/90 mt-1">Langkah Terstruktur Menghubungkan Minatmu dengan Realitas Pasar Kerja</p>
                </div>

                <div className="space-y-4 text-xs md:text-sm leading-relaxed text-slate-600">
                  <p className="text-slate-800 font-bold">Halo Calon Mentee Masa Depan! 👋</p>
                  <p>Terima kasih telah meluangkan waktu mengisi penilaian cepat di platform kami. Kamu menunjukkan minat yang luar biasa kuat di bidang <strong className="text-indigo-600 font-bold">{state.fieldOfInterest || 'Product Management'}</strong>.</p>
                  
                  <p>Berdasarkan tren industri yang tercatat di database CDP UpPath, posisi ini diperkirakan tumbuh sebesar <strong>24% YoY</strong> selama 3 tahun ke depan, menjadikannya salah satu jalur karir dengan gaji tertinggi dan rekrutmen paling aktif.</p>

                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 my-3 text-slate-700">
                    <p className="font-extrabold text-indigo-900 uppercase text-xs mb-1">💡 INSIGHT UTK PILIHAN DI {state.fieldOfInterest.toUpperCase()}:</p>
                    <p className="text-xs">
                      Persyaratan nomor satu dari perusahaan rekruter modern saat ini adalah <b>kepemimpinan proyek nyata (portfolio)</b> dan kecocokan interpersonal yang divalidasi langsung oleh praktisi aktif. Kelas online saja tidak lagi cukup di tahun 2026!
                    </p>
                  </div>

                  <p>Di UpPath, kami memiliki 50+ Top Mentor berlisensi yang siap membimbingmu 1-on-1 membuat portfolio berkelas dunia.</p>

                  <p className="text-center">
                    <span className="inline-block bg-[#7b2cbf] text-white font-black text-xs px-6 py-3 rounded-lg hover:bg-purple-700 transition-all cursor-pointer">
                      BUAT AKUN GRATIS & KLAIM MENTORING SEKARANG →
                    </span>
                  </p>
                </div>

                <div className="border-t border-slate-200 mt-8 pt-4 text-[10px] text-slate-400 text-center">
                  <p>© 2025 UpPath Company · ITS Surabaya</p>
                  <p className="mt-1">Email ini dikirim secara otomatis oleh CDP Segment 1 (Pre-Registration Lead Sequence) karena Anda mendaftarkan email untuk mengunduh laporan assessment.</p>
                </div>
              </div>
            </div>
          ) : (
            /* WHATSAPP LEAD NURTURE DAY 3 */
            <div id="uc06-whatsapp" className="w-[330px] bg-[#075e54] border border-emerald-500/30 rounded-[32px] p-4 shadow-[0_25px_50px_-12px_rgba(16,185,129,0.25)] relative text-slate-100 flex flex-col overflow-hidden text-left">
              {/* WhatsApp top status bar */}
              <div className="bg-[#075e54] flex justify-between items-center px-2 py-1 pb-3 text-[10px] text-white/80 border-b border-white/5 font-semibold">
                <span>10:42 AM</span>
                <span className="flex items-center gap-1">WA Business · UpPath ID</span>
              </div>

              {/* Chat Container Area */}
              <div className="bg-[#e5ddd5] px-2 py-4 h-[420px] overflow-y-auto flex flex-col gap-3 relative">
                {/* Message bubble from system */}
                <div className="bg-white text-slate-800 rounded-lg p-3 text-xs max-w-[85%] shadow-md self-start relative">
                  <div className="absolute top-1 -left-1.5 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent"></div>
                  
                  <p className="font-extrabold text-[#075e54] text-[10px] mb-1">UpPath Professional Academy</p>
                  <p className="leading-relaxed text-slate-700">
                    Halo Kak! Kami perhatikan Kakak sangat tertarik dengan bidang <strong>{state.fieldOfInterest || 'SaaS'}</strong> di asesmen kemarin. 🚀
                  </p>
                  <p className="mt-1.5 leading-relaxed text-slate-700">
                    Kami mau menawarkan kupon diskon registrasi spesial <strong>{state.discountPercentage}%</strong> untuk mendaftar akun perdana Kakak hari ini!
                  </p>
                  <p className="mt-1.5 leading-relaxed text-slate-700">
                    Mentor favorit dari bidang Kakak siap diakses <b>malam ini</b> untuk sesi pencocokan gratis 15 menit. Kupon Anda: <strong className="font-mono bg-yellow-100 text-yellow-900 border border-yellow-200 px-1 rounded">START{state.discountPercentage}</strong>
                  </p>
                  
                  {/* Embedded link card */}
                  <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex flex-col">
                    <div className="p-2 border-b border-slate-100">
                      <p className="font-bold text-[10px] text-slate-900 line-clamp-1">Ambil Kupon Diskon {state.discountPercentage}% & Cari Mentor</p>
                      <p className="text-[9px] text-slate-500 line-clamp-1">uppath.id/claims-kupon-mentorship</p>
                    </div>
                  </div>

                  <span className="text-[8px] text-slate-400 block text-right mt-1.5">10:41 AM ✓✓</span>
                </div>
              </div>

              {/* Input container simulating keyboard */}
              <div className="p-1 px-2 border-t border-emerald-800 bg-[#f0f0f0] flex items-center justify-between gap-1">
                <input 
                  type="text" 
                  disabled
                  placeholder="Ketik balasan..." 
                  className="bg-white border rounded-full px-3 py-1.5 text-[10px] flex-1 text-slate-700" 
                />
                <div className="w-8 h-8 rounded-full bg-[#128c7e] text-white flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer">
                  ➤
                </div>
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}
