import React, { useState, useEffect, useRef } from "react";

// Custom typewriter hook
function useTypewriter(text: string, speed: number = 38, startDelay: number = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const delayId = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplayed((prev) => prev + text.charAt(index));
        index++;
        if (index >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function MainframeHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [copied, setCopied] = useState(false);

  // Background Video Refs & State
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  const videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

  // AI Interviewer Call States
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(false);
  const [chatInputValue, setChatInputValue] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const [chatLog, setChatLog] = useState<string[]>([
    "Welcome! I am A.R.I.A. Let's start with your background. Could you introduce yourself?"
  ]);

  // Entrance triggers
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Monitor mouse movement to control video currentTime scrubbing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const SENSITIVITY = 0.8;
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;

      let nextTime = video.currentTime + timeOffset;
      
      // Clamp values within bounds of duration
      if (nextTime < 0) nextTime = 0;
      if (nextTime > video.duration) nextTime = video.duration;

      targetTimeRef.current = nextTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = nextTime;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Queue up next seek frame once current seek is complete to prevent flooding
  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("hello@mainframe.co");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy", err);
    }
  };

  // AI chat reply simulations
  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInputValue.trim()) return;

    const userMsg = chatInputValue;
    setChatLog((prev) => [...prev, userMsg]);
    setChatInputValue("");
    setIsAITyping(true);

    setTimeout(() => {
      let reply = "That sounds fascinating. How do you apply these technical architectures to scalable production setups?";
      if (userMsg.toLowerCase().includes("resume")) {
        reply = "Analyzing your credentials. Your experience with Next.js and distributed platforms matches our benchmark metrics.";
      } else if (userMsg.toLowerCase().includes("free") || userMsg.toLowerCase().includes("pricing")) {
        reply = "You can launch your first 3 full-scope simulation interviews free of charge. No credit card required.";
      }
      setChatLog((prev) => [...prev, reply]);
      setIsAITyping(false);
    }, 1200);
  };

  const { displayed, done } = useTypewriter(
    "Glad you stopped in. Good taste tends to find us. Now, what are we building?",
    38,
    600
  );

  return (
    <div className="relative min-h-screen w-full text-black">
      
      {/* Fixed Scrubbing Background Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: "70% center" }}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
      />

    

      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-black/5">
        <div className="flex items-center gap-3">
          <span 
            className="text-[21px] sm:text-[26px] tracking-tight text-black select-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ElevateAI® <span className="text-[25px] sm:text-[30px] text-black select-none leading-none">
            ✳︎
          </span>
          </span>
         
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center text-[20px] text-black font-normal">
          <a href="#features" className="hover:opacity-60 transition-opacity">Features</a>
          <span className="whitespace-pre">, </span>
          <a href="#how-it-works" className="hover:opacity-60 transition-opacity">How It Works</a>
          <span className="whitespace-pre">, </span>
          <a href="#pricing" className="hover:opacity-60 transition-opacity">Pricing</a>
          <span className="whitespace-pre">, </span>
          <a href="#faq" className="hover:opacity-60 transition-opacity">FAQ</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a 
            href="#touch" 
            className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity font-normal"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Hamburger menu */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-[5px] z-50 md:hidden relative focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-40 flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-[32px] font-medium hover:opacity-60 transition-opacity">Features</a>
        <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-[32px] font-medium hover:opacity-60 transition-opacity">How It Works</a>
        <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-[32px] font-medium hover:opacity-60 transition-opacity">Pricing</a>
        <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-[32px] font-medium hover:opacity-60 transition-opacity">FAQ</a>
        <a href="#touch" onClick={() => setIsMenuOpen(false)} className="text-[32px] font-medium underline underline-offset-4 hover:opacity-60 transition-opacity">Get in touch</a>
      </div>

      {/* HERO SECTION CONTAINER */}
      <section className="relative z-10 min-h-screen w-full flex flex-col pt-24 sm:pt-28 md:pt-32 px-5 sm:px-8 md:px-10 justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full pb-16">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 mb-4 text-[13px] tracking-wide font-medium bg-black/5 border border-black/10 py-1.5 px-3 rounded-full w-fit">
              <span className="text-emerald-500">✨</span>
              <span>Trusted by students, job seekers & teams</span>
            </div>

            {/* Main agency typography */}
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-black mb-3 select-none leading-[1.05]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ace Your Next <br />
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-indigo-600 bg-clip-text text-transparent">
                Interview with AI
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-neutral-600 mb-6 font-normal max-w-lg leading-relaxed">
              Practice real interview questions, receive deep response diagnostics, polish your presentation, and secure your career objectives with automated precision.
            </p>

            {/* Typewriter feedback simulation */}
            <div className="border-l-2 border-black/10 pl-4 py-1 mb-6">
              <div 
                className="pointer-events-none select-none text-[14px] uppercase tracking-wider text-neutral-400 mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A.R.I.A system feed
              </div>
              <p className="text-neutral-800 text-[15px] sm:text-[17px] min-h-[40px] leading-relaxed">
                {displayed}
                {!done && (
                  <span className="inline-block w-[1.5px] h-[1.1em] bg-black align-middle ml-[1px] cursor-blink" />
                )}
              </p>
            </div>

            {/* Action pill inputs */}
            <div 
              className="flex flex-wrap gap-y-1 transition-all duration-[400ms] ease-out mb-6"
              style={{
                opacity: showPills ? 1 : 0,
                transform: showPills ? "translateY(0)" : "translateY(8px)"
              }}
            >
              <a href="#pricing" className="inline-flex items-center justify-center bg-black text-white hover:bg-neutral-800 rounded-full text-[13px] sm:text-[15px] px-5 py-[0.5em] mr-[0.4em] mb-[0.4em] font-medium transition-all duration-200 cursor-pointer">
                Start Free
              </a>
              <button 
                onClick={copyEmailToClipboard}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 hover:border-black rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.5em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200 gap-2 cursor-pointer"
              >
                <span className="underline underline-offset-1">
                  {copied ? "Copied address" : "Copy hello@mainframe.co"}
                </span>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 8h-2v11H8v2a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1z" />
                  <path d="M15 3H5a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1zm-1 12H6V5h8v10z" />
                </svg>
              </button>
            </div>

            {/* Social metrics strip */}
            <div className="flex gap-6 border-t border-black/5 pt-5 text-[13px] text-neutral-500">
              <div>
                <strong className="block text-black text-base">10,000+</strong>
                Practice Interviews
              </div>
              <div className="border-l border-black/5 pl-6">
                <strong className="block text-black text-base">95%</strong>
                User Satisfaction
              </div>
              <div className="border-l border-black/5 pl-6">
                <strong className="block text-black text-base">500+</strong>
                Companies Covered
              </div>
            </div>

          </div>


        </div>
      </section>

      {/* TRUSTED BRANDS CAROUSEL */}
      <section className="relative z-10 bg-white border-y border-black/5 py-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-6">
            Candidates prepared here landed interviews at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-neutral-400 text-[18px] sm:text-[22px] font-semibold tracking-tight">
            <span>Google</span>
            <span>Amazon</span>
            <span>Microsoft</span>
            <span>Meta</span>
            <span>Adobe</span>
            <span>Deloitte</span>
            <span>Infosys</span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative z-10 bg-white py-20 w-full">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 
              className="text-3xl sm:text-4xl text-black font-normal tracking-tight mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Everything You Need to Crack Interviews
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg">
              Maximize evaluation indicators via deep feature intelligence tuned for modern production expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="border border-black/5 p-8 rounded-2xl bg-neutral-50 hover:border-black/20 transition-all duration-300">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-medium text-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                AI Mock Interviews
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Experience simulated evaluations generated live based on target industry matrices and standard metrics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border border-black/5 p-8 rounded-2xl bg-neutral-50 hover:border-black/20 transition-all duration-300">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-medium text-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Instant AI Feedback
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Unlock immediate scoring structures focusing on communication accuracy, structural syntax, confidence indices, and problem articulation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border border-black/5 p-8 rounded-2xl bg-neutral-50 hover:border-black/20 transition-all duration-300">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-medium text-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Resume-Based Adaptations
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Input your credentials and CV structures to extract highly hyper-personalized target sequences and challenge vectors.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* COMPARISON CHART */}
      <section className="relative z-10 bg-neutral-50 py-20 w-full border-t border-black/5">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-black font-normal tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Smarter Than Traditional Prep
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-100 border-b border-black/5 text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  <th className="p-4 sm:p-5">Traditional Method</th>
                  <th className="p-4 sm:p-5">Mainframe A.R.I.A</th>
                </tr>
              </thead>
              <tbody className="text-sm text-neutral-600 divide-y divide-black/5">
                <tr>
                  <td className="p-4 sm:p-5">Generic templates and text pools</td>
                  <td className="p-4 sm:p-5 font-semibold text-black">Dynamically adapted response profiles</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5">Delayed or absent feedback</td>
                  <td className="p-4 sm:p-5 font-semibold text-indigo-600">Realtime diagnostics & metric scores</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5">One-directional text rehearsal</td>
                  <td className="p-4 sm:p-5 font-semibold text-black">Active conversational video environments</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5">Static checklist templates</td>
                  <td className="p-4 sm:p-5 font-semibold text-black">Comprehensive analytics updates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="relative z-10 bg-white py-20 w-full">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl text-black font-normal tracking-tight mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Transparent Sizing
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base">
              Secure optimized placement parameters across custom individual and corporate options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Free */}
            <div className="border border-black/5 p-8 rounded-2xl bg-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-medium text-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Basic
                </h3>
                <div className="text-3xl font-normal text-black mb-6">$0</div>
                <ul className="space-y-3 text-neutral-500 text-sm mb-8">
                  <li>• 3 Full-simulation interviews</li>
                  <li>• Fundamental response diagnostics</li>
                  <li>• Standard network resource access</li>
                </ul>
              </div>
              <button className="w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-black text-sm font-medium rounded-lg transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro */}
            <div className="border-2 border-black p-8 rounded-2xl bg-white flex flex-col justify-between relative shadow-lg">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-black text-white text-[10px] tracking-widest uppercase py-1 px-3 rounded-full font-bold">
                RECOMMENDED
              </div>
              <div>
                <h3 className="text-xl font-medium text-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Pro
                </h3>
                <div className="text-3xl font-normal text-black mb-6">$29<span className="text-sm text-neutral-500">/mo</span></div>
                <ul className="space-y-3 text-neutral-600 text-sm mb-8 font-medium">
                  <li className="text-indigo-600">• Unlimited mock evaluations</li>
                  <li>• Complete resume diagnostic uploads</li>
                  <li>• Targeted company matrix queries</li>
                  <li>• Deep response metric analytics</li>
                </ul>
              </div>
              <button className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white text-sm font-medium rounded-lg transition-colors">
                Start Pro
              </button>
            </div>

            {/* Enterprise */}
            <div className="border border-black/5 p-8 rounded-2xl bg-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-medium text-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Enterprise
                </h3>
                <div className="text-2xl font-normal text-black mb-6">Custom</div>
                <ul className="space-y-3 text-neutral-500 text-sm mb-8">
                  <li>• Universal team dashboards</li>
                  <li>• Scalable cohort diagnostics</li>
                  <li>• Dedicated API structural endpoints</li>
                  <li>• Custom company matrix modules</li>
                </ul>
              </div>
              <button className="w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-black text-sm font-medium rounded-lg transition-colors">
                Contact Sales
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative z-10 bg-neutral-50 py-20 w-full border-t border-black/5">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-3xl text-center text-black font-normal tracking-tight mb-12" style={{ fontFamily: "var(--font-heading)" }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-xl border border-black/5">
              <h4 className="text-base font-semibold text-black mb-2">Is it free to start?</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Yes. Your sandbox profile includes three full simulation cycles featuring interactive video formats without requiring credit details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/5">
              <h4 className="text-base font-semibold text-black mb-2">Can I analyze my customized resume files?</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Yes. Our adapter allows the scanning of PDF formats to extract specialized prompt configurations matched to your specific timeline.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/5">
              <h4 className="text-base font-semibold text-black mb-2">Is data transaction security preserved?</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Yes. All credentials, recorded data metrics, and evaluations use encrypted transfer protocols to safeguard personal assets.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-black text-neutral-400 py-12 w-full border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white text-sm font-medium">
            © {new Date().getFullYear()} Mainframe Agency Corp. Built for next-generation systems.
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Framework</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#touch" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}