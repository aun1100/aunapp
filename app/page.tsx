"use client";

import React, { useState, useEffect } from "react";

type TabType = "home" | "explore" | "activity" | "workout";

interface WorkoutItem {
  id: string;
  title: string;
  category: string;
  durationMin: number;
  calories: number;
  level: string;
  image: string;
  exercises: { name: string; durationSec: number; sets: number; reps: number; image: string }[];
}

interface ActivityRecord {
  id: string;
  title: string;
  date: string;
  month: string;
  distance: number;
  duration: string;
  pace: string;
  calories: number;
}

const WORKOUT_CATALOG: WorkoutItem[] = [
  {
    id: "full-body-blast",
    title: "Full Body Blast - 30 min",
    category: "ไฮอิท",
    durationMin: 30,
    calories: 280,
    level: "กลาง",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80",
    exercises: [
      {
        name: "สควอท (Squat)",
        durationSec: 45,
        sets: 4,
        reps: 12,
        image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "วิดพื้น (Push-ups)",
        durationSec: 45,
        sets: 4,
        reps: 10,
        image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "แพลงก์ (Plank)",
        durationSec: 60,
        sets: 3,
        reps: 1,
        image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=700&q=80",
      },
    ],
  },
  {
    id: "core-strength",
    title: "Core Strength - 25 min",
    category: "สร้างกล้ามเนื้อ",
    durationMin: 25,
    calories: 210,
    level: "เริ่มต้น",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
    exercises: [
      {
        name: "ครันช์ (Crunches)",
        durationSec: 40,
        sets: 3,
        reps: 15,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "รัสเซียนทวิสต์ (Russian Twist)",
        durationSec: 40,
        sets: 3,
        reps: 20,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80",
      },
    ],
  },
  {
    id: "morning-yoga",
    title: "Morning Flow Yoga",
    category: "โยคะ",
    durationMin: 20,
    calories: 120,
    level: "เริ่มต้น",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    exercises: [
      {
        name: "ท่าสุนัขก้มหน้า (Downward Dog)",
        durationSec: 60,
        sets: 3,
        reps: 1,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80",
      },
    ],
  },
  {
    id: "cardio-burn",
    title: "Cardio Fat Burn",
    category: "คาร์ดิโอ",
    durationMin: 35,
    calories: 340,
    level: "ท้าทาย",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80",
    exercises: [
      {
        name: "กระโดดตบ (Jumping Jacks)",
        durationSec: 45,
        sets: 4,
        reps: 30,
        image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=700&q=80",
      },
    ],
  },
];

export default function FitFlowApp() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  // ข้อมูลสถิติวันนี้ (บันทึกลงเครื่องจริง)
  const [todayCalories, setTodayCalories] = useState<number>(350);
  const [todayMinutes, setTodayMinutes] = useState<number>(45);
  const dailyGoal = 500;

  // ค้นหาและกรองหมวดหมู่
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ทั้งหมด");

  // ประวัติการวิ่ง (เพิ่มรายการใหม่ได้จริง)
  const [activities, setActivities] = useState<ActivityRecord[]>([
    {
      id: "1",
      title: "วิ่งช่วงเช้า",
      date: "12",
      month: "พ.ย.",
      distance: 5.2,
      duration: "32:15 นาที",
      pace: "6:12 min/km",
      calories: 350,
    },
  ]);
  const [newDist, setNewDist] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");
  const [showRunModal, setShowRunModal] = useState<boolean>(false);

  // ระบบเล่นท่าออกกำลังกายจริง
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutItem>(WORKOUT_CATALOG[0]);
  const [exerciseIdx, setExerciseIdx] = useState<number>(0);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [secondsLeft, setSecondsLeft] = useState<number>(WORKOUT_CATALOG[0].exercises[0].durationSec);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // โหลดข้อมูลที่เคยบันทึกไว้ในมือถือ
  useEffect(() => {
    const savedCal = localStorage.getItem("fitflow_cal");
    const savedMin = localStorage.getItem("fitflow_min");
    const savedActs = localStorage.getItem("fitflow_acts");
    if (savedCal) setTodayCalories(Number(savedCal));
    if (savedMin) setTodayMinutes(Number(savedMin));
    if (savedActs) setActivities(JSON.parse(savedActs));
  }, []);

  // บันทึกข้อมูลลงมือถือเมื่อมีการอัปเดต
  useEffect(() => {
    localStorage.setItem("fitflow_cal", todayCalories.toString());
    localStorage.setItem("fitflow_min", todayMinutes.toString());
    localStorage.setItem("fitflow_acts", JSON.stringify(activities));
  }, [todayCalories, todayMinutes, activities]);

  // ระบบนับถอยหลังเวลาออกกำลังกายจริง
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (activeTab === "workout" && isPlaying && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isPlaying) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [activeTab, isPlaying, secondsLeft]);

  const startWorkout = (workout: WorkoutItem) => {
    setSelectedWorkout(workout);
    setExerciseIdx(0);
    setCurrentSet(1);
    setSecondsLeft(workout.exercises[0].durationSec);
    setIsPlaying(true);
    setActiveTab("workout");
  };

  const handleNextExercise = () => {
    const currentEx = selectedWorkout.exercises[exerciseIdx];
    if (currentSet < currentEx.sets) {
      setCurrentSet((s) => s + 1);
      setSecondsLeft(currentEx.durationSec);
      setIsPlaying(true);
    } else if (exerciseIdx < selectedWorkout.exercises.length - 1) {
      const nextIdx = exerciseIdx + 1;
      setExerciseIdx(nextIdx);
      setCurrentSet(1);
      setSecondsLeft(selectedWorkout.exercises[nextIdx].durationSec);
      setIsPlaying(true);
    } else {
      // จบคลาสออกกำลังกาย -> บวกแคลอรี่และเวลาจริง!
      setIsPlaying(false);
      setTodayCalories((c) => c + selectedWorkout.calories);
      setTodayMinutes((m) => m + selectedWorkout.durationMin);
      alert(`ยอดเยี่ยม! คุณออกกำลังกายจบแล้ว (+${selectedWorkout.calories} kcal, +${selectedWorkout.durationMin} นาที)`);
      setActiveTab("home");
    }
  };

  const handleAddRun = (e: React.FormEvent) => {
    e.preventDefault();
    const dist = parseFloat(newDist);
    const mins = parseFloat(newTime);
    if (!dist || !mins) return;

    const paceVal = (mins / dist).toFixed(2).replace(".", ":");
    const burned = Math.round(dist * 65);

    const newRecord: ActivityRecord = {
      id: Date.now().toString(),
      title: "วิ่งออกกำลังกาย",
      date: new Date().getDate().toString(),
      month: "พ.ย.",
      distance: dist,
      duration: `${mins} นาที`,
      pace: `${paceVal} min/km`,
      calories: burned,
    };

    setActivities([newRecord, ...activities]);
    setTodayCalories((c) => c + burned);
    setTodayMinutes((m) => m + Math.round(mins));
    setNewDist("");
    setNewTime("");
    setShowRunModal(false);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPercent = Math.min(100, Math.round((todayCalories / dailyGoal) * 100));
  const currentExercise = selectedWorkout.exercises[exerciseIdx];
  const nextExerciseName =
    exerciseIdx < selectedWorkout.exercises.length - 1
      ? selectedWorkout.exercises[exerciseIdx + 1].name
      : "เสร็จสิ้นคลาส!";

  const filteredWorkouts = WORKOUT_CATALOG.filter((w) => {
    const matchCat = selectedCategory === "ทั้งหมด" || w.category === selectedCategory;
    const matchSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center font-sans text-slate-800">
      {/* คอนเทนเนอร์เต็มจอบนมือถือ (100dvh) และจัดกลางบนคอมพิวเตอร์ */}
      <div className="w-full max-w-[430px] h-[100dvh] bg-white shadow-xl flex flex-col relative overflow-hidden">
        {/* ==================== 1. HOME SCREEN ==================== */}
        {activeTab === "home" && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50 pb-20">
            <div className="bg-gradient-to-b from-[#0d5c91] to-[#197bbd] text-white px-5 pt-6 pb-24 rounded-b-[32px]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white text-[#0d5c91] px-2 py-1 rounded-lg font-black text-xs">
                    FF
                  </div>
                  <span className="font-extrabold tracking-wide text-lg">FITFLOW</span>
                </div>
                <button
                  onClick={() => {
                    if (confirm("รีเซ็ตข้อมูลสถิติวันนี้เป็น 0 หรือไม่?")) {
                      setTodayCalories(0);
                      setTodayMinutes(0);
                    }
                  }}
                  className="text-[11px] bg-white/15 px-3 py-1 rounded-full hover:bg-white/25"
                >
                  รีเซ็ตสถิติ
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
                  <p className="text-xs text-slate-500">เป้าหมาย: {dailyGoal} kcal</p>
                  <div className="pt-1 text-xs text-slate-700 space-y-0.5">
                    <p>
                      แคลอรี่: <span className="font-bold text-[#0d5c91]">{todayCalories} kcal</span>
                    </p>
                    <p>
                      ระยะเวลา: <span className="font-bold">{todayMinutes} นาที</span>
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-block bg-[#1982a6] text-white text-[10px] font-medium px-3 py-1 rounded-full">
                      {progressPercent >= 100 ? "บรรลุเป้าหมายแล้ว!" : "กำลังไปได้สวย"}
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
                      className="text-[#1994c2] transition-all duration-500"
                      strokeDasharray={`${progressPercent}, 100`}
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-base font-bold text-slate-800">{progressPercent}%</span>
                </div>
              </div>
            </div>

            {/* Recommended */}
            <div className="px-5 pt-6 pb-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-slate-900 text-base">แนะนำออกกำลังกาย</h2>
                <button
                  onClick={() => setActiveTab("explore")}
                  className="text-xs font-semibold text-[#0d5c91]"
                >
                  ดูทั้งหมด
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {WORKOUT_CATALOG.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => startWorkout(item)}
                    className="min-w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer active:scale-95 transition"
                  >
                    <div className="h-36 overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                        +{item.calories} kcal
                      </span>
                    </div>
                    <div className="p-3.5">
                      <p className="text-[11px] text-[#0d5c91] font-semibold">{item.category}</p>
                      <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.durationMin} นาที • ระดับ: {item.level}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. EXPLORE SCREEN ==================== */}
        {activeTab === "explore" && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-white pb-20">
            <div className="bg-[#0d5c91] text-white px-5 pt-6 pb-5">
              <h1 className="text-lg font-bold mb-3">ค้นหาการออกกำลังกาย</h1>
              <div className="bg-white rounded-xl px-3 py-2.5 flex items-center gap-2 text-slate-700">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="พิมพ์ชื่อคลาสออกกำลังกาย..."
                  className="bg-transparent text-xs w-full focus:outline-none"
                />
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Filter Pills */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {["ทั้งหมด", "คาร์ดิโอ", "สร้างกล้ามเนื้อ", "โยคะ", "ไฮอิท"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? "bg-[#0d5c91] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Workout List */}
              <div className="space-y-3">
                {filteredWorkouts.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => startWorkout(w)}
                    className="flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl border border-slate-100 cursor-pointer active:scale-98 transition"
                  >
                    <div className="flex items-center gap-3">
                      <img src={w.image} alt={w.title} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <span className="text-[10px] font-bold text-[#0d5c91]">{w.category}</span>
                        <h4 className="font-bold text-sm text-slate-900">{w.title}</h4>
                        <p className="text-xs text-slate-500">
                          {w.durationMin} นาที • เผาผลาญ {w.calories} kcal
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#0d5c91] text-white p-2 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. ACTIVITY LOG SCREEN ==================== */}
        {activeTab === "activity" && (
          <div className="flex-1 flex flex-col overflow-y-auto bg-white pb-20">
            <div className="bg-[#0d5c91] text-white px-5 pt-6 pb-4 flex items-center justify-between">
              <h1 className="font-bold text-lg">บันทึกกิจกรรม</h1>
              <button
                onClick={() => setShowRunModal(true)}
                className="bg-white text-[#0d5c91] text-xs font-bold px-3 py-1.5 rounded-full shadow"
              >
                + บันทึกการวิ่ง
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Latest Run Summary */}
              <div className="flex items-center gap-4">
                <div className="w-16 rounded-xl overflow-hidden border border-slate-200 text-center shadow-sm">
                  <div className="bg-[#0d5c91] h-3" />
                  <div className="py-1.5">
                    <p className="text-lg font-extrabold text-slate-900 leading-none">{activities[0]?.date}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{activities[0]?.month}</p>
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <h2 className="font-bold text-sm text-slate-900">{activities[0]?.title}</h2>
                  <p className="text-slate-600">
                    ระยะทาง: <span className="font-semibold">{activities[0]?.distance} กม.</span>
                  </p>
                  <p className="text-slate-600">
                    เวลา: <span className="font-semibold">{activities[0]?.duration}</span>
                  </p>
                  <p className="text-slate-600">
                    Pace: <span className="font-semibold">{activities[0]?.pace}</span>
                  </p>
                </div>
              </div>

              {/* Map Visual */}
              <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="Route Map"
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
                <span className="absolute bottom-3 left-4 text-white text-xs font-bold drop-shadow">
                  Lumpini Park
                </span>
                <div className="absolute bottom-2.5 right-2.5 bg-white/95 rounded-xl px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 shadow">
                  <p>❤️ Avg. HR: 148 bpm</p>
                  <p>🔥 เผาผลาญ: {activities[0]?.calories} kcal</p>
                </div>
              </div>

              {/* History List */}
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-2">ประวัติทั้งหมด ({activities.length} รายการ)</h3>
                <div className="space-y-2 text-xs">
                  {activities.map((act) => (
                    <div
                      key={act.id}
                      className="grid grid-cols-3 bg-sky-50/80 border border-sky-100 rounded-xl p-2.5"
                    >
                      <div>
                        <p className="text-[10px] text-slate-400">วันที่ {act.date} {act.month}</p>
                        <p className="font-semibold text-slate-800">{act.title}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">ระยะทาง</p>
                        <p className="font-semibold text-slate-800">{act.distance} km</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">Pace</p>
                        <p className="font-semibold text-[#0d5c91]">{act.pace}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal เพิ่มบันทึกวิ่งจริง */}
            {showRunModal && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
                <form onSubmit={handleAddRun} className="bg-white w-full rounded-2xl p-5 space-y-4 shadow-xl">
                  <h3 className="font-bold text-base text-slate-900">บันทึกผลการวิ่งใหม่</h3>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">ระยะทาง (กิโลเมตร)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="เช่น 5.0"
                      value={newDist}
                      onChange={(e) => setNewDist(e.target.value)}
                      className="w-full mt-1 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">เวลาที่ใช้ (นาที)</label>
                    <input
                      type="number"
                      required
                      placeholder="เช่น 30"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full mt-1 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowRunModal(false)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-600"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#0d5c91] text-xs font-bold text-white"
                    >
                      บันทึกข้อมูล
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== 4. WORKOUT PLAYER SCREEN ==================== */}
        {activeTab === "workout" && (
          <div className="flex-1 flex flex-col bg-white">
            <div className="bg-[#0d5c91] text-white px-4 pt-6 pb-3 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveTab("home");
                }}
                className="p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <h1 className="font-bold text-base truncate px-2">{selectedWorkout.title}</h1>
              <div className="w-6" />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="h-60 rounded-2xl overflow-hidden shadow-md bg-slate-100">
                  <img
                    src={currentExercise.image}
                    alt={currentExercise.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-center font-bold text-lg text-slate-900 mt-4">
                  {currentExercise.name}
                </h2>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-3xl font-extrabold text-[#1679b8]">
                    {formatTime(secondsLeft)}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">
                    เหลือเวลาอีก
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1989cc] transition-all duration-300"
                    style={{
                      width: `${((currentExercise.durationSec - secondsLeft) / currentExercise.durationSec) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-slate-200 text-center py-2">
                <div>
                  <p className="text-xs text-slate-500">Set</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {currentSet} of {currentExercise.sets}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Reps</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {currentExercise.reps} ครั้ง
                  </p>
                </div>
              </div>

              <div className="pb-4 text-center">
                <p className="text-xs font-semibold text-slate-600 mb-5">
                  ท่าถัดไป: {nextExerciseName}
                </p>
                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={() => setSecondsLeft(currentExercise.durationSec)}
                    className="p-3 text-[#0d5c91] hover:bg-slate-100 rounded-full"
                    title="เริ่มจับเวลาใหม่"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-[#0d5c91] text-white flex items-center justify-center shadow-lg active:scale-95 transition"
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
                    onClick={handleNextExercise}
                    className="p-3 text-[#0d5c91] hover:bg-slate-100 rounded-full"
                    title="เซ็ตถัดไป / ท่าถัดไป"
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
          <div className="bg-white border-t border-slate-200 px-6 py-2.5 flex justify-between items-center fixed bottom-0 w-full max-w-[430px]">
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
              onClick={() => startWorkout(WORKOUT_CATALOG[0])}
              className="flex flex-col items-center gap-1 text-[10px] font-semibold text-slate-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              <span>Workout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
