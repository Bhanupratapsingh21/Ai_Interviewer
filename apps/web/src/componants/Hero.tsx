import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame 
} from "framer-motion";
import { 
  Sparkles, 
  Search, 
  PenTool, 
  Lightbulb, 
  Video, 
  MicOff, 
  Mic, 
  ChevronDown, 
  Smile, 
  Monitor, 
  PhoneOff, 
  Send 
} from "lucide-react";

export const HeroSection = () => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction States for Call Window
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(false); // Default false to match screenshot
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatLog, setChatLog] = useState<string[]>([
    'Added corresponding "ghost" stroke lines for both series.'
  ]);

  // Handle grid tracking coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.3; 
  const speedY = 0.3;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  // Handle Interactive Chat submits
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setChatLog((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI context generator matching the user prompt
    setTimeout(() => {
      let reply = "Checking contextual visual components in your current view...";
      if (userMessage.toLowerCase().includes("cover letter")) {
        reply = "Here is a brief outline for your Product Design role. Let me know if you would like to expand this context.";
      } else if (userMessage.toLowerCase().includes("ideas")) {
        reply = "Consider adding live-data overlays, high contrast modes, and smart summaries for meetings.";
      } else if (userMessage.toLowerCase().includes("anything")) {
        reply = "I'm ready. Ask me to draft summaries, query transcripts, or design layout revisions.";
      }
      setChatLog((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1200);
  };

  const selectSuggestion = (text: string) => {
    setInputValue(text);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full min-h-screen py-16 md:py-24 flex flex-col items-center justify-start overflow-hidden bg-[#FAFAFB] dark:bg-[#0B0B0C] transition-colors duration-300"
      )}
    >
      {/* Background Scrolling Grid Patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div 
        className="absolute inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Atmospheric Background Blurred Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 dark:bg-orange-500/5 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/15 dark:bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center space-y-12">
        
        {/* Header Hero Branding */}
        <div className="text-center space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Workspace Sandbox
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Your Meeting, <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">AI Supercharged</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Interact with the camera triggers below, test suggestion chips, or type replies inside the floating assistant frame.
          </p>
        </div>

        {/* Cloned Call Window Container */}
        <div className="w-full max-w-5xl rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-[#121214]/70 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col aspect-video min-h-[500px] md:min-h-[580px]">
          
          {/* Mockup Title bar (macOS Style Traffic Lights) */}
          <div className="h-11 border-b border-neutral-200/60 dark:border-neutral-800/60 flex items-center px-4 bg-neutral-50/80 dark:bg-[#161619]/80 justify-between select-none">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-3 h-3 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-3 h-3 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <div className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
              Call Space - Infinite Workspace
            </div>
            <div className="w-10" />
          </div>

          {/* Main Workspace Frame */}
          <div className="flex-1 relative bg-[#F7F7F9] dark:bg-[#0A0A0B] p-4 md:p-6 flex flex-col justify-between overflow-hidden">
            
            {/* Call Participants Video Box and Floating UI Panel */}
            <div className="relative flex-1 w-full flex flex-col md:flex-row gap-4 items-stretch mb-16 md:mb-20">
              
              {/* Participant "You" (Left Grid) */}
              <div className={cn(
                "flex-1 rounded-2xl overflow-hidden relative bg-neutral-100 dark:bg-neutral-900 shadow-sm border-2 transition-all duration-300",
                isCameraActive ? "border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.15)]" : "border-neutral-200 dark:border-neutral-800"
              )}>
                {isCameraActive ? (
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=600&q=80" 
                    alt="You" 
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-150 dark:bg-neutral-900 text-neutral-400">
                    <Video className="w-8 h-8 mb-2 opacity-45" />
                    <span className="text-xs">Camera Feed Inactive</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-neutral-900/75 dark:bg-neutral-950/80 backdrop-blur-md text-[11px] font-medium text-white px-2.5 py-1 rounded-md">
                  You
                </div>
              </div>

              {/* Participant "Mira" (Right Grid) */}
              <div className="flex-1 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 relative bg-neutral-100 dark:bg-neutral-900 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=600&q=80" 
                  alt="Mira" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-neutral-900/75 dark:bg-neutral-950/80 backdrop-blur-md text-[11px] font-medium text-white px-2.5 py-1 rounded-md">
                  Mira
                </div>
              </div>

              {/* Floating AI Panel (Replicates original right overlay card) */}
              <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[360px] bg-[#222225]/95 dark:bg-[#131315]/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-4 text-white flex flex-col space-y-4 z-20 self-start md:self-auto mt-4 md:mt-0">
                
                {/* Multi-gradient Glowing AI Icon and Title */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-pink-500 to-amber-400 p-[1.5px] flex items-center justify-center shadow-lg shadow-purple-500/10">
                    <div className="w-full h-full bg-[#1e1e21] rounded-[7px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold tracking-tight text-neutral-100 leading-snug">
                      Hi Irung, how can I help you today?
                    </h4>
                  </div>
                </div>

                {/* Suggestions Section */}
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold">Suggestions</span>
                  <div className="space-y-1.5">
                    <button 
                      onClick={() => selectSuggestion("Ask Anything")}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 text-xs text-left transition-colors duration-200 border border-white/[0.03]"
                    >
                      <Search className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Ask Anything</span>
                    </button>
                    <button 
                      onClick={() => selectSuggestion("Write a cover letter")}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 text-xs text-left transition-colors duration-200 border border-white/[0.03]"
                    >
                      <PenTool className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Write a cover letter</span>
                    </button>
                    <button 
                      onClick={() => selectSuggestion("Explore ideas")}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 text-xs text-left transition-colors duration-200 border border-white/[0.03]"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Explore ideas</span>
                    </button>
                  </div>
                </div>

                {/* Simulated Conversation and Interactive Input */}
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 space-y-3">
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 text-[12px] leading-relaxed text-neutral-300">
                    {chatLog.map((message, idx) => (
                      <div key={idx} className={cn(
                        "p-2 rounded-lg",
                        idx % 2 === 0 ? "bg-white/[0.02] text-neutral-300" : "bg-cyan-500/10 text-cyan-200 border-l-2 border-cyan-400"
                      )}>
                        {message}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="text-xs text-neutral-400 italic animate-pulse">
                        Analyzing meeting scope...
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSendMessage} className="border-t border-white/[0.08] pt-2 flex items-center">
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Reply..." 
                      className="w-full bg-transparent border-none outline-none text-xs text-neutral-200 placeholder-neutral-500 py-1"
                    />
                    {inputValue.trim() && (
                      <button type="submit" className="text-neutral-400 hover:text-white p-1">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </form>
                </div>

              </div>

            </div>

            {/* Bottom Controls Capsule Bar (Replicating the visual icons) */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-[#1E1E21]/95 border border-neutral-200 dark:border-neutral-800/80 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-30 max-w-[95%]">
              
              {/* Camera Trigger Toggle */}
              <button 
                onClick={() => setIsCameraActive(!isCameraActive)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors",
                  isCameraActive 
                    ? "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200" 
                    : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                )}
              >
                <Video className="w-4 h-4" />
                <span className="text-xs font-semibold hidden sm:inline">Camera</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Mic Trigger Toggle */}
              <button 
                onClick={() => setIsMicActive(!isMicActive)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors",
                  isMicActive 
                    ? "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200" 
                    : "text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )}
              >
                {isMicActive ? (
                  <Mic className="w-4 h-4 text-emerald-500" />
                ) : (
                  <MicOff className="w-4 h-4 text-red-500" />
                )}
                <span className={cn("text-xs font-semibold hidden sm:inline", !isMicActive && "line-through")}>Microphone</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              <div className="w-[1px] h-5 bg-neutral-200 dark:bg-neutral-800 mx-1" />

              {/* Emoji Button */}
              <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                <Smile className="w-4 h-4" />
              </button>

              {/* Monitor Screen Share */}
              <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                <Monitor className="w-4 h-4" />
              </button>

              {/* Hang up Call (Matches the red end-call icon) */}
              <button className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-shadow shadow-md shadow-red-500/15 flex items-center justify-center">
                <PhoneOff className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

        {/* Optional Sandbox Interactions Counter */}
        <div className="flex gap-4 z-10">
          <button 
            onClick={() => setCount(count + 1)}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-neutral-50 dark:text-neutral-900 text-sm font-semibold rounded-lg transition-all shadow-md active:scale-95"
          >
            Interact ({count})
          </button>
          <button 
            className="px-6 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-semibold rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-850 transition-all active:scale-95"
          >
            Learn More
          </button>
        </div>

      </div>
    </div>
  );
};

// SVG Animated Grid Pattern
const GridPattern = ({ offsetX, offsetY }: { offsetX: any, offsetY: any }) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-neutral-300 dark:text-neutral-700" 
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};