import { useState } from "react";
import { Flame, Zap, Shield, Users, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthScreenProps {
  onComplete: () => void;
}

type AuthStep = "splash" | "onboarding" | "signup" | "login";

const onboardingSlides = [
  {
    icon: Flame,
    title: "Broadcast Your Plot",
    description: "Post what you're doing NOW. Your crew sees it. They pull up.",
    color: "text-vibe-chaos",
    bgGlow: "glow-chaos",
  },
  {
    icon: Zap,
    title: "Real-Time Vibes",
    description: "CHAOS, ACTIVE, or CHILL - let your squad know your energy.",
    color: "text-vibe-active",
    bgGlow: "glow-active",
  },
  {
    icon: Users,
    title: "Your Crews, Your Rules",
    description: "Different squads, different vibes. Control who sees what.",
    color: "text-vibe-chill",
    bgGlow: "glow-chill",
  },
];

export function AuthScreen({ onComplete }: AuthScreenProps) {
  const [step, setStep] = useState<AuthStep>("splash");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Splash screen auto-advance
  if (step === "splash") {
    return (
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center p-8 cursor-pointer"
        onClick={() => setStep("onboarding")}
      >
        <div className="animate-pulse-vibe">
          <h1 className="text-5xl font-black text-foreground tracking-tighter">
            VIBE<span className="text-primary">_</span>OS
          </h1>
        </div>
        <p className="text-muted-foreground mt-4 text-center">
          The Plot Operating System
        </p>
        <p className="text-xs text-muted-foreground mt-8 animate-pulse">
          Tap anywhere to continue
        </p>
      </div>
    );
  }

  // Onboarding slides
  if (step === "onboarding") {
    const slide = onboardingSlides[currentSlide];
    const Icon = slide.icon;

    return (
      <div className="min-h-screen bg-background flex flex-col p-8 safe-top safe-bottom">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className={cn("p-6 rounded-3xl bg-surface-1 mb-8", slide.bgGlow)}>
            <Icon className={cn("w-16 h-16", slide.color)} />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">{slide.title}</h2>
          <p className="text-lg text-muted-foreground max-w-xs">{slide.description}</p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {onboardingSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === currentSlide ? "w-8 bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {currentSlide === onboardingSlides.length - 1 ? (
            <>
              <button
                onClick={() => setStep("signup")}
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-colors"
              >
                Get Started
              </button>
              <button
                onClick={() => setStep("login")}
                className="w-full py-4 bg-surface-2 text-foreground rounded-xl font-bold hover:bg-surface-3 transition-colors"
              >
                I already have an account
              </button>
            </>
          ) : (
            <button
              onClick={() => setCurrentSlide(currentSlide + 1)}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-colors"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Login / Signup form
  const isSignup = step === "signup";

  return (
    <div className="min-h-screen bg-background flex flex-col p-8 safe-top safe-bottom">
      <button
        onClick={() => setStep("onboarding")}
        className="text-muted-foreground mb-8"
      >
        ← Back
      </button>

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isSignup ? "Join the vibe" : "Let's get you back in"}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Email or Phone
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-4 bg-surface-1 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-4 bg-surface-1 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {isSignup && (
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3 mt-8">
        <button
          onClick={onComplete}
          disabled={!email || !password}
          className={cn(
            "w-full py-4 rounded-xl font-bold transition-all",
            email && password
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {isSignup ? "Create Account" : "Log In"}
        </button>

        <button
          onClick={() => setStep(isSignup ? "login" : "signup")}
          className="w-full py-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          {isSignup ? "Already have an account? Log in" : "Need an account? Sign up"}
        </button>
      </div>
    </div>
  );
}
