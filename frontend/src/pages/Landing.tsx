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
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [navigate, user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center ">
        <div className="flex items-center gap-4">
          <Button variant="outline" disabled size="sm">
            <Spinner
              data-icon="inline-start"
              className="mr-2 h-5 w-5 animate-spin"
            />
            Welcome to AI-Powered Job Tracker
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  return (
    <div className="md:min-h-screen w-auto">
      <Navbar />
      <section className="md:relative overflow-hidden md:p-32 py-16 border-b border-b-stone-400 mx-auto">
        <div className="flex flex-col items-center gap-8 md:gap-10 mt-16">
          <div className="border border-blue-800 text-blue-800 w-auto md:w-fit flex flex-row  gap-4 px-4 py-1 rounded-2xl">
            <Sparkle height={24} width={24} />
            <span>AI-Powered Resume Optimization</span>
          </div>
          <div className="flex flex-col gap-5 items-center text-center p-6">
            <h1 className="text-7xl text-white font-extrabold">
              Optimize Your Resume <br /> with AI Precision
            </h1>
            <p className="text-2xl text-gray-400">
              Get instant feedback on how well your resume matches job <br />
              descriptions. Boost your ATS score and land more interviews.
            </p>
          </div>
          <div className="flex flex-row gap-5 items-center text-center">
            <Button variant="destructive" className="bg-blue-800 flex flex-row">
              <Link to="/analysis">
                Get Started Free 
              </Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {!user ? (
              <>
                <Button variant="outline">
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex md:flex-row flex-col gap-5 items-center text-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600" />
              <span className="text-stone-400">10,000+ Resumes Analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600" />
              <span className="text-stone-400">95% User Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600" />
              <span className="text-stone-400">Free to Start</span>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden md:px-32 py-16 border-b border-b-stone-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl text-white">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Three simple steps to transform your job application success rate.
          </p>
        </div>
        <div className="flex md:flex-row flex-col gap-8 items-center mt-28 justify-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group w-6xl h-60 p-6  rounded-xl shadow-lg tranform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 cursor-pointer border border-stone-100"
            >
              <div className="mb-4">
                <step.icon className="w-10 h-10 bg-blue-200 p-1 rounded-lg text-blue-400 transition duration-300 group-hover:text-blue-500 group-hover:text-bg-blue-300 group-hover:drop-shadow-lg" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-3xl">{step.title}</h2>
                <p className="text-stone-400 text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="relative overflow-hidden px-32 py-16 border-b border-b-stone-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl text-white">
            Powerful Features
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Everything you need to create a winning resume.
          </p>
        </div>
        <div className="flex flex-row gap-8 items-center mt-28 justify-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group w-6xl h-60 p-6  rounded-xl border border-stone-100 hover:border-blue-500 flex flex-col justify-start"
            >
              <div className="mb-4">
                <feature.icon className="w-10 h-10 bg-blue-200 p-1 rounded-lg text-blue-400 " />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-3xl">{feature.title}</h2>
                <p className="text-stone-400 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="relative overflow-hidden px-32 py-16 border-b border-b-stone-400">
        <div className="flex flex-col text-center items-center">
          <h2 className="text-3xl font-bold md:text-4xl text-white">
            Ready to Land Your Dream Job?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join thousands of job seekers who have improved their resumes with
            ResumeAI.
          </p>
          <div className="flex flex-row gap-5 items-center text-center mt-16">
            <Button
              variant="destructive"
              className="bg-blue-800 px-8 py-6 text-xl hover:bg-transparent hover:border"
            >
              Start Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      <footer className="flex flex-row justify-between py-6 px-24">
        <span className="font-xl text-xl text-white">ResumeAI</span>
        <p className="text-stone-400">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
