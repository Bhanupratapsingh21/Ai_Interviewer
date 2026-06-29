

import React, { useState, useEffect, useRef } from "react";

// Custom typewriter hook
function useTypewriter(text: string, speed: number = 38, startDelay: number = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId: NodeJS.Timeout;

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
      if (intervalId) clearInterval(intervalId);
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

  // Trigger Action Pill Entrance 400ms after mount
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

  // Queue up next seek frame once current seek is complete
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
      console.warn("Failed to copy text", err);
    }
  };

  const { displayed, done } = useTypewriter(
    "Glad you stopped in. Good taste tends to find us. Now, what are we building?",
    38,
    600
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-black select-none">
      
      {/* Background Video */}
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

      {/* Navbar Container */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 bg-transparent">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span 
            className="text-[21px] sm:text-[26px] tracking-tight text-black select-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mainframe®
          </span>
          <span 
            className="text-[25px] sm:text-[30px] text-black select-none leading-none"
            style={{ letterSpacing: "-0.02em" }}
          >
            ✳︎
          </span>
        </div>

        {/* Desktop Links (hidden below md) */}
        <div className="hidden md:flex items-center text-[23px] text-black font-normal">
          <a href="#labs" className="hover:opacity-60 transition-opacity">Labs</a>
          <span className="whitespace-pre">, </span>
          <a href="#studio" className="hover:opacity-60 transition-opacity">Studio</a>
          <span className="whitespace-pre">, </span>
          <a href="#openings" className="hover:opacity-60 transition-opacity">Openings</a>
          <span className="whitespace-pre">, </span>
          <a href="#shop" className="hover:opacity-60 transition-opacity">Shop</a>
        </div>

        {/* Desktop CTA (hidden below md) */}
        <div className="hidden md:block">
          <a 
            href="#touch" 
            className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity font-normal"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-[5px] z-50 md:hidden relative focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-40 flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <a 
          href="#labs" 
          onClick={() => setIsMenuOpen(false)}
          className="text-[32px] font-medium hover:opacity-60 transition-opacity"
        >
          Labs
        </a>
        <a 
          href="#studio" 
          onClick={() => setIsMenuOpen(false)}
          className="text-[32px] font-medium hover:opacity-60 transition-opacity"
        >
          Studio
        </a>
        <a 
          href="#openings" 
          onClick={() => setIsMenuOpen(false)}
          className="text-[32px] font-medium hover:opacity-60 transition-opacity"
        >
          Openings
        </a>
        <a 
          href="#shop" 
          onClick={() => setIsMenuOpen(false)}
          className="text-[32px] font-medium hover:opacity-60 transition-opacity"
        >
          Shop
        </a>
        <a 
          href="#touch" 
          onClick={() => setIsMenuOpen(false)}
          className="text-[32px] font-medium underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>

      {/* Hero Content Section */}
      <div className="relative z-10 h-screen w-full flex flex-col px-5 sm:px-8 md:px-10 justify-end pb-12 md:justify-center md:pb-0">
        <div className="max-w-xl relative">
          
          {/* Blurred Intro Label */}
          <div 
            className="pointer-events-none select-none mb-5 sm:mb-6 text-black"
            style={{ 
              fontSize: "clamp(18px, 4vw, 26px)", 
              lineHeight: 1.3, 
              fontWeight: 400,
              filter: "blur(4.5px)" 
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Mainframe's Adaptive Response Interface Agent
          </div>

          {/* Typewriter Text Box */}
          <p 
            className="text-black mb-5 sm:mb-6 font-normal"
            style={{ 
              fontSize: "clamp(18px, 4vw, 26px)", 
              lineHeight: 1.35,
              minHeight: "54px"
            }}
          >
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] cursor-blink" />
            )}
          </p>

          {/* Action Pills */}
          <div 
            className="flex flex-wrap gap-y-1 transition-all duration-[400ms] ease-out"
            style={{
              opacity: showPills ? 1 : 0,
              transform: showPills ? "translateY(0)" : "translateY(8px)"
            }}
          >
            <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
              Pitch us an idea
            </button>
            <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
              Come work here
            </button>
            <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
              Send a brief hello
            </button>
            <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
              See how we operate
            </button>

            {/* Email Copier Outline Button */}
            <button 
              onClick={copyEmailToClipboard}
              className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200 gap-2 sm:gap-3 cursor-pointer"
            >
              <span className="underline underline-offset-1">
                {copied ? "Copied address" : "Reach us: hello@mainframe.co"}
              </span>
              <svg 
                className="w-3 h-3 fill-current flex-shrink-0" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 8h-2v11H8v2a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1z" />
                <path d="M15 3H5a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1zm-1 12H6V5h8v10z" />
              </svg>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}