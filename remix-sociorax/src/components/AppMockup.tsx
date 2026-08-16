import React from 'react';
import {
  Activity,
  Zap,
  Timer,
  Dumbbell,
  Sliders,
  QrCode,
  FileText,
  Sparkles,
  Play,
  CheckCircle2,
  Lock,
  Search,
  Scan,
  RefreshCw,
} from 'lucide-react';

interface AppMockupProps {
  type: 'motion' | 'exercise' | 'photo' | 'qr' | 'pdf' | 'prompt';
  title: string;
}

export function AppMockup({ type, title }: AppMockupProps) {
  return (
    <div className="w-full aspect-[9/16] max-w-[260px] mx-auto rounded-[2.5rem] p-3 bg-[#161618] border border-white/20 shadow-2xl relative overflow-hidden flex flex-col justify-between select-none">
      {/* Top Phone Notch / Dynamic Island */}
      <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center gap-1.5 z-20">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
      </div>

      {/* Screen Content Area */}
      <div className="flex-1 bg-[#0d0f14] rounded-[1.8rem] p-4 flex flex-col justify-between relative overflow-hidden text-white border border-white/10">
        {type === 'motion' && (
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center text-xs text-white/60">
              <span className="font-semibold text-blue-400">Outdoor Run</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold">GPS ACTIVE</span>
            </div>

            <div className="my-auto text-center space-y-3">
              <div className="inline-flex p-3 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Activity className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <div className="text-3xl font-extrabold tracking-tight">5.24 <span className="text-sm font-normal text-white/60">km</span></div>
                <div className="text-xs text-white/50 mt-0.5">28m 42s · 142 bpm</div>
              </div>

              {/* Mini Sparkline graph */}
              <div className="h-10 w-full flex items-end gap-1 px-2">
                {[40, 65, 50, 80, 95, 70, 85, 100, 75, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-2.5 flex justify-around text-center text-xs border border-white/10">
              <div>
                <div className="text-white/40 text-[10px]">Avg Pace</div>
                <div className="font-semibold text-white">5'28"/km</div>
              </div>
              <div className="w-[1px] bg-white/10" />
              <div>
                <div className="text-white/40 text-[10px]">Calories</div>
                <div className="font-semibold text-emerald-400">384 kcal</div>
              </div>
            </div>
          </div>
        )}

        {type === 'exercise' && (
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center text-xs text-amber-400">
              <span className="font-semibold">HIIT Interval</span>
              <span className="text-white/50">Set 3 / 4</span>
            </div>

            <div className="my-auto text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Dumbbell className="w-8 h-8" />
              </div>
              <div className="text-4xl font-extrabold tracking-tight text-amber-400">00:45</div>
              <div className="text-sm font-medium text-white">Push-Up Burpees</div>
              <div className="text-xs text-white/50">Next: Jumping Jacks (15s rest)</div>
            </div>

            <div className="flex gap-2">
              <button type="button" className="flex-1 bg-amber-500 text-black font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1">
                <Play className="w-3.5 h-3.5 fill-black" /> Pause
              </button>
            </div>
          </div>
        )}

        {type === 'photo' && (
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-purple-400">Photo Compressor</span>
              <span className="text-xs text-emerald-400 font-mono">-88%</span>
            </div>

            <div className="my-auto space-y-3">
              <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Original</span>
                  <span className="text-white/80 font-mono">12.4 MB</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-full" />
                </div>

                <div className="flex justify-between text-xs pt-1">
                  <span className="text-purple-400 font-semibold">Optimized</span>
                  <span className="text-emerald-400 font-mono font-bold">1.4 MB</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[12%]" />
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-2 text-center text-xs text-purple-300">
                Resolution: 3840 × 2160 (WebP)
              </div>
            </div>

            <div className="bg-purple-600 text-white font-semibold py-2 rounded-xl text-xs text-center">
              Save Optimized Image
            </div>
          </div>
        )}

        {type === 'qr' && (
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center text-xs text-teal-400">
              <span className="font-semibold">Scanner Ready</span>
              <span className="text-emerald-400 text-[10px]">Auto Focus</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center relative">
              {/* Scan Reticle */}
              <div className="w-32 h-32 border-2 border-teal-400/80 rounded-2xl relative flex items-center justify-center bg-teal-500/5">
                <Scan className="w-16 h-16 text-teal-300/40 animate-pulse" />
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal-400" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal-400" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal-400" />
              </div>
              <span className="text-[10px] text-white/60 mt-3">Align QR code inside box</span>
            </div>

            <div className="bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-xl p-2 text-center text-[11px] font-mono">
              https://sociorax.com/connect
            </div>
          </div>
        )}

        {type === 'pdf' && (
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center text-xs text-amber-400">
              <span className="font-semibold">Document Scan</span>
              <span className="text-white/50">Page 1 / 1</span>
            </div>

            <div className="my-auto space-y-2">
              <div className="bg-white/10 rounded-xl p-3 border border-white/15 space-y-1.5 shadow-inner">
                <div className="w-3/4 h-2 bg-white/60 rounded" />
                <div className="w-full h-1.5 bg-white/30 rounded" />
                <div className="w-5/6 h-1.5 bg-white/30 rounded" />
                <div className="w-2/3 h-1.5 bg-white/30 rounded" />
                <div className="pt-2 flex justify-end">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-2 py-0.5 rounded font-mono">
                    OCR Extracted
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 bg-amber-500 text-black font-semibold py-2 rounded-xl text-xs text-center">
                Export PDF
              </div>
            </div>
          </div>
        )}

        {type === 'prompt' && (
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center text-xs text-purple-400">
              <span className="font-semibold">Prompt Gen Ai</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>

            <div className="my-auto space-y-2 text-xs">
              <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 space-y-1 text-[11px]">
                <span className="text-purple-300 font-semibold block">System Role:</span>
                <p className="text-white/80 leading-snug">
                  "Act as a senior full-stack engineer and optimize performance..."
                </p>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-2 text-center text-purple-200 text-[10px]">
                Target: Gemini 2.5 Pro · Midjourney v6
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 rounded-xl text-xs text-center shadow-md">
              Copy Formatted Prompt
            </div>
          </div>
        )}
      </div>

      {/* Screen Title Tag */}
      <div className="text-[10px] text-center text-white/50 mt-1.5 font-medium truncate px-1">
        {title}
      </div>
    </div>
  );
}
