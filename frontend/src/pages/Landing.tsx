import GridBackgroundDemo from "@/components/grid-background-demo";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuthUser } from "@/hooks/useAuthUser";

import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Shield,
  Sparkle,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Resume",
    description: "Simply drag and drop your PDF resume or paste the text.",
  },
  {
    icon: Sparkle,
    title: "AI Analysis",
    description: "Our AI analyzes your resume against the job description.",
  },
  {
    icon: TrendingUp,
    title: "Get Improvements",
    description: "Receive actionable suggestions to boost your chances.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get comprehensive feedback in seconds, not hours.",
  },
  {
    icon: Shield,
    title: "ATS Optimization",
    description: "Ensure your resume passes applicant tracking systems.",
  },
  {
    icon: BarChart3,
    title: "Score Tracking",
    description: "Monitor your improvement over time with detailed metrics.",
  },
];

const Landing = () => {
  const { data: user, isLoading } = useAuthUser();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user && !isLoading) {
  //     navigate("/login");
  //   }
  // }, [navigate, user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950 p-4">
        <Button variant="outline" disabled className="border-blue-600 text-white">
          <Spinner className="mr-2 h-4 w-4 animate-spin" />
          Welcome to AI-Powered Job Tracker
        </Button>
      </div>
    );
  }

 

  return (
    <GridBackgroundDemo>
      <Navbar />

      <section className="relative overflow-hidden px-4 sm:px-8 md:px-16 lg:px-28 py-12 sm:py-20 md:py-28 border-b border-stone-800 mx-auto">
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-10">
          
          <div className="border border-blue-600/60 bg-blue-950/30 text-blue-400 w-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium">
            <Sparkle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span>AI-Powered Resume Optimization</span>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 items-center text-center max-w-4xl px-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-extrabold tracking-tight leading-tight sm:leading-none">
              Optimize Your Resume <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                with AI Precision
              </span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-stone-400 max-w-2xl leading-relaxed">
              Get instant feedback on how well your resume matches job descriptions.
              Boost your ATS score and land more interviews.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <Button
              asChild
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-6 py-6 text-base sm:text-lg shadow-lg shadow-blue-600/25 transition-all"
            >
              <Link to={user ? "/dashboard" : "/register"} className="flex items-center justify-center gap-2">
                <span>{user ? "Go to Dashboard" : "Get Started Free"}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            {!user && (
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto px-6 py-6 text-base sm:text-lg text-white border-stone-700 hover:bg-stone-800"
              >
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 items-center text-center mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500 h-5 w-5 shrink-0" />
              <span className="text-stone-400 text-xs sm:text-sm">10,000+ Resumes Analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500 h-5 w-5 shrink-0" />
              <span className="text-stone-400 text-xs sm:text-sm">95% User Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500 h-5 w-5 shrink-0" />
              <span className="text-stone-400 text-xs sm:text-sm">Free to Start</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 sm:px-8 md:px-16 lg:px-28 py-16 sm:py-20 border-b border-stone-800">
        <div className="text-center px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-400 text-sm sm:text-base">
            Three simple steps to transform your job application success rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 rounded-xl border border-stone-800 bg-stone-900/40 backdrop-blur-sm shadow-md hover:border-blue-500/50 transform transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-start"
            >
              <div className="mb-4">
                <step.icon className="w-10 h-10 bg-blue-950/80 p-2 rounded-lg text-blue-400 border border-blue-800/50 transition duration-300 group-hover:text-blue-300 group-hover:scale-110" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-xl sm:text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-4 sm:px-8 md:px-16 lg:px-28 py-16 sm:py-20 border-b border-stone-800">
        <div className="text-center px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Powerful Features
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-400 text-sm sm:text-base">
            Everything you need to create a winning resume.
          </p>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 rounded-xl border border-stone-800 bg-stone-900/40 backdrop-blur-sm transition duration-300 hover:border-blue-500/50 flex flex-col justify-start"
            >
              <div className="mb-4">
                <feature.icon className="w-10 h-10 bg-blue-950/80 p-2 rounded-lg text-blue-400 border border-blue-800/50" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-xl sm:text-2xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    
      <section className="relative overflow-hidden px-4 sm:px-8 md:px-16 lg:px-28 py-16 sm:py-20 border-b border-stone-800">
        <div className="flex flex-col text-center items-center max-w-3xl mx-auto px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Ready to Land Your Dream Job?
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            Join thousands of job seekers who have improved their resumes with ResumeAI.
          </p>
          <div className="mt-8 sm:mt-10 w-full sm:w-auto">
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base sm:text-lg w-full sm:w-auto shadow-lg shadow-blue-600/25 transition-all"
            >
              <Link to="/dashboard" className="flex items-center justify-center gap-2">
                <span>Start Free Analysis</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 px-4 sm:px-8 md:px-16 lg:px-28 text-center sm:text-left border-t border-stone-800/50">
        <span className="text-lg font-bold text-white tracking-wide">ResumeAI</span>
        <p className="text-xs sm:text-sm text-stone-400">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </p>
      </footer>
    </GridBackgroundDemo>
  );
};

export default Landing;