"use client";

import React, { useState, useEffect } from "react";

type TabType = "home" | "explore" | "activity" | "workout";

export default function FitFlowPrototype() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(45);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (activeTab === "workout" && isPlaying) {
      timer = setInterval(() => {
        setSeconds((prev) => (prev < 90 ? prev + 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTab, isPlaying]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      {/* ปุ่มสลับหน้าจอด้านบน */}
      <div className="mb-4 flex flex-wrap gap-2 bg-white p-2 rounded-2xl shadow-sm">
        {[
          { id: "home", label: "1. หน้าหลัก (Home)" },
          { id: "explore", label: "2. ค้นหา (Explore)" },
          { id: "activity", label: "3. บันทึกวิ่ง (Activity)" },
          { id: "workout", label: "4. เล่นท่าออกกำลังกาย (Player)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === tab.id
                ? "bg-[#0d5c91] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* กรอบสมาร์ทโฟน 390 x 882 px */}
      <div className="w-[390px] h-[882px] bg-white rounded-[44px] shadow-2xl border-[10px] border-slate-900 overflow-hidden flex flex-col relative">
        {/* Status Bar */}
        <div className="bg-[#0d5c91] text-white px-6 pt-3 pb-2 flex justify-between items-center text-xs font-semibold shrink-0">
          <span>9:41</span>
          <div className="w-24 h-5 bg-slate-900 rounded-full" />
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-0.5 h-2.5">
              <span className="w-0.5 h-1 bg-white rounded-full" />
              <span className="w-0.5 h-1.5 bg-white rounded-full" />
              <span className="w-0.5 h-2 bg-white rounded-full" />
              <span className="w-0.5 h-2.5 bg-white rounded-full" />
            </div>
            <div className="w-5 h-2.5 border border-white rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* ==================== 1. HOME SCREEN ==================== */}
        {activeTab === "home" && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
            <div className="bg-gradient-to-b from-[#0d5c91] to-[#197bbd] text-white px-5 pt-2 pb-24 rounded-b-[32px]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white text-[#0d5c91] p-1.5 rounded-lg font-black text-xs">
                    FF
                  </div>
                  <span className="font-extrabold tracking-wide text-lg">
                    FITFLOW
                  </span>
                </div>
                <button className="p-1.5 rounded-full hover:bg-white/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold leading-snug">
                  สวัสดี,
                  <br />
                  ยินดีต้อนรับกลับมา!
                </h1>
                <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="px-5 -mt-20">
              <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="font-bold text-slate-900 text-base">สรุปวันนี้</h2>
                  <p className="text-xs text-slate-500">วันที่ 12 ม.ค.</p>
                  <div className="pt-1 text-xs text-slate-700 space-y-0.5">
                    <p>แคลอรี่: <span className="font-semibold">350 kcal</span></p>
                    <p>ระยะเวลา: <span className="font-semibold">45 นาที</span></p>
                  </div>
                  <div className="pt-1">
                    <p className="text-xs text-slate-600 mb-1">ความก้าวหน้า</p>
                    <span className="inline-block bg-[#1982a6] text-white text-[10px] font-medium px-3 py-1 rounded-full">
                      ยอดเยี่ยม
                    </span>
                  </div>
                </div>

                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#1994c2]"
                      strokeDasharray="75, 100"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-base font-bold text-slate-800">75%</span>
                </div>
              </div>
            </div>

            {/* Recommended */}
            <div className="px-5 pt-6 pb-4">
              <h2 className="font-bold text-slate-900 text-base mb-3">แนะนำออกกำลังกาย</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                <div
                  onClick={() => setActiveTab("workout")}
                  className="min-w-[275px] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80"
                      alt="Full Body Blast"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3.5">
                    <p className="text-[11px] text-[#0d5c91] font-semibold">แนะนำออกกำลังกาย</p>
                    <h3 className="font-bold text-slate-900 text-base">Full Body Blast - 30 min</h3>
                    <p className="text-xs text-slate-500 mt-0.5">30 min</p>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
                      <span>Difficulty:</span>
                      <span className="w-2 h-2 rounded-full bg-[#0d5c91]" />
                      <span className="w-2 h-2 rounded-full bg-[#0d5c91]" />
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("workout")}
                  className="min-w-[240px] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80"
                      alt="Core Power"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3.5">
                    <p className="text-[11px] text-[#0d5c91] font-semibold">แนะนำออกกำลังกาย</p>
                    <h3 className="font-bold text-slate-900 text-base">Core Power - 20 min</h3>
                    <p className="text-xs text-slate-500 mt-0.5">20 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. EXPLORE SCREEN ==================== */}
        {activeTab === "explore" && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-white">
            <div className="bg-[#0d5c91] text-white px-5 pt-2 pb-5">
              <h1 className="text-lg font-bold mb-3">ค้นหาการออกกำลังกาย</h1>
              <div className="flex gap-2">
                <div className="flex-1 bg-white rounded-xl px-3 py-2 flex items-center gap-2 text-slate-700">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="ค้นหาท่าออกกำลังกาย..."
                    className="bg-transparent text-xs w-full focus:outline-none"
                  />
                </div>
                <button className="bg-[#1a82c4] p-2.5 rounded-xl text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="4" y1="21" x2="4" y2="14" />
                    <line x1="4" y1="10" x2="4" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="3" />
                    <line x1="20" y1="21" x2="20" y2="16" />
                    <line x1="20" y1="12" x2="20" y2="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <h2 className="font-bold text-slate-900 text-sm mb-3">ตามหมวดหมู่</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      title: "คาร์ดิโอ",
                      sub: "คาร์ดิโอ (15 วิดีโอ)",
                      img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=400&q=80",
                    },
                    {
                      title: "สร้างกล้ามเนื้อ",
                      sub: "กล้ามเนื้อ (18 วิดีโอ)",
                      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80",
                    },
                    {
                      title: "โยคะ",
                      sub: "โยคะ (11 วิดีโอ)",
                      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
                    },
                    {
                      title: "ไฮอิท",
                      sub: "HIIT (9 วิดีโอ)",
                      img: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=400&q=80",
                    },
                  ].map((item, idx) => (
                    <div key={idx} onClick={() => setActiveTab("workout")} className="cursor-pointer">
                      <div className="h-24 rounded-xl overflow-hidden mb-1.5 bg-slate-100">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-bold text-xs text-slate-900">{item.title}</h3>
                      <p className="text-[11px] text-slate-500">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-bold text-slate-900 text-sm mb-3">ยอดนิยมประจำสัปดาห์</h2>
                <div className="space-y-3">
                  {[
                    {
                      name: "Full Body Blast",
                      time: "30 min",
                      level: "ระดับ: กลาง",
                      leftImg: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=300&q=80",
                      rightImg: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=300&q=80",
                    },
                    {
                      name: "Core Strength",
                      time: "25 min",
                      level: "ระดับ: เริ่มต้น",
                      leftImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80",
                      rightImg: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=300&q=80",
                    },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveTab("workout")}
                      className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-100 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img src={row.leftImg} alt={row.name} className="w-14 h-14 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{row.name}</h4>
                          <p className="text-[11px] text-slate-600">{row.time}</p>
                          <p className="text-[11px] text-slate-500">{row.level}</p>
                        </div>
                      </div>
                      <img src={row.rightImg} alt="Preview" className="w-16 h-14 rounded-lg object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. ACTIVITY LOG SCREEN ==================== */}
        {activeTab === "activity" && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-white">
            <div className="bg-[#0d5c91] text-white px-4 py-3 flex items-center justify-between">
              <button onClick={() => setActiveTab("home")} className="p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <h1 className="font-bold text-base">วิ่งช่วงเช้า</h1>
              <span className="font-bold tracking-widest">•••</span>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 rounded-xl overflow-hidden border border-slate-200 text-center shadow-sm">
                  <div className="bg-[#0d5c91] h-3" />
                  <div className="py-1.5">
                    <p className="text-lg font-extrabold text-slate-900 leading-none">12</p>
                    <p className="text-xs text-slate-600 mt-0.5">ม.ค.</p>
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <h2 className="font-bold text-sm text-slate-900">Running</h2>
                  <p className="text-slate-600">ระยะทาง: <span className="font-semibold">5.2 กม.</span></p>
                  <p className="text-slate-600">เวลา: <span className="font-semibold">32:15 นาที</span></p>
                  <p className="text-slate-600">Pace: <span className="font-semibold">6:12 min/km</span></p>
                </div>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="Lumpini Park Route"
                  className="w-full h-full object-cover brightness-90"
                />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 220">
                  <path
                    d="M 55 170 Q 130 160, 150 110 T 230 55"
                    fill="none"
                    stroke="#1ca3ec"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <circle cx="55" cy="170" r="6" fill="#0d5c91" />
                  <circle cx="230" cy="55" r="6" fill="#1ca3ec" />
                </svg>
                <span className="absolute top-2.5 left-2.5 bg-white/90 text-slate-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow">
                  Map
                </span>
                <span className="absolute top-16 right-8 bg-white text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  End
                </span>
                <span className="absolute bottom-14 left-6 bg-white text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Start
                </span>
                <span className="absolute bottom-8 left-24 text-white text-xs font-bold drop-shadow">
                  Lumpini Park
                </span>
                <div className="absolute bottom-2.5 right-2.5 bg-white/95 rounded-xl px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 shadow space-y-0.5">
                  <p>❤️ Avg. HR: 148 bpm</p>
                  <p>⛰️ Elevation: 24 m</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-2">Splits/Intervals</h3>
                <div className="space-y-2 text-xs">
                  {["กม. 1", "กม. 2"].map((km, idx) => (
                    <div key={idx} className="grid grid-cols-3 bg-sky-50/80 border border-sky-100 rounded-xl p-2.5">
                      <div>
                        <p className="text-[10px] text-slate-400">Split</p>
                        <p className="font-semibold text-slate-800">{km}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">Km</p>
                        <p className="font-semibold text-slate-800">1.0 km</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">min/km</p>
                        <p className="font-semibold text-[#0d5c91]">6:05 min/km</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 4. WORKOUT PLAYER SCREEN ==================== */}
        {activeTab === "workout" && (
          <div className="flex-1 flex flex-col bg-white">
            <div className="bg-[#0d5c91] text-white px-4 py-3 flex items-center justify-between">
              <button onClick={() => setActiveTab("home")} className="p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <h1 className="font-bold text-base">Full Body Tone</h1>
              <div className="w-6" />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="h-64 rounded-2xl overflow-hidden shadow-md bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=700&q=80"
                    alt="Squat Exercise"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-center font-bold text-lg text-slate-900 mt-4">
                  สควอท (Squat)
                </h2>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-3xl font-extrabold text-[#1679b8]">
                    {formatTime(seconds)}
                  </span>
                  <span className="text-lg font-semibold text-slate-400">1:30</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1989cc] transition-all duration-300"
                    style={{ width: `${(seconds / 90) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-slate-200 text-center py-2">
                <div>
                  <p className="text-xs text-slate-500">Set</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">2 of 4</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Reps</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">8 of 12</p>
                </div>
              </div>

              <div className="pb-4 text-center">
                <p className="text-xs font-semibold text-slate-600 mb-5">
                  ท่าถัดไป: วิดพื้น (Push-ups)
                </p>
                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={() => setSeconds(0)}
                    className="p-3 text-[#0d5c91] hover:bg-slate-100 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-[#0d5c91] text-white flex items-center justify-center shadow-lg"
                  >
                    {isPlaying ? (
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="w-7 h-7 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => setSeconds(45)}
                    className="p-3 text-[#0d5c91] hover:bg-slate-100 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== BOTTOM TAB BAR ==================== */}
        {activeTab !== "workout" && (
          <div className="bg-white border-t border-slate-200 px-6 py-2.5 flex justify-between items-center shrink-0">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
                activeTab === "home" ? "text-[#0d5c91]" : "text-slate-400"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveTab("explore")}
              className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
                activeTab === "explore" ? "text-[#0d5c91]" : "text-slate-400"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              <span>Explore</span>
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
                activeTab === "activity" ? "text-[#0d5c91]" : "text-slate-400"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span>Activity</span>
            </button>
            <button
              onClick={() => setActiveTab("workout")}
              className="flex flex-col items-center gap-1 text-[10px] font-semibold text-slate-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Profile</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
