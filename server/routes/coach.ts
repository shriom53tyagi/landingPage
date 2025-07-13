import { RequestHandler } from "express";
import { GetCoachResponse, CoachData } from "@shared/coach";

// Sample coach data - in a real app, this would come from a database
const sampleCoachData: CoachData = {
  profile: {
    id: "sarah-chen",
    name: "Dr. Sarah Chen",
    title: "Certified Health Coach",
    email: "sarah@healthcoachpro.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    tagline: "Your Health Transformation Starts Here",
    description: "Your Personal Health Partner",
    yearsExperience: 10,
    livesChanged: 500,
    successRate: 95,
    credentials: ["MD", "Certified Health Coach", "Functional Medicine"],
    certifications: ["Board Certified", "10+ Years Experience"],
  },
  personalQuotes: [
    {
      text: "Every client's journey is unique, and I'm here to walk alongside you every step of the way.",
      context: "My Personal Commitment",
    },
    {
      text: "Having overcome my own health challenges, I understand the struggles and the triumphs.",
      context: "My Personal Journey",
    },
    {
      text: "Your success is my success. When you thrive, my purpose is fulfilled.",
      context: "My Personal Mission",
    },
  ],
  storyChapters: [
    {
      id: 1,
      year: "2012",
      phase: "",
      title: "When Everything Fell Apart",
      icon: "Mountain",
      color: "from-red-500/30 to-orange-500/30",
      borderColor: "border-red-500/40",
      bgGradient: "from-red-50 to-orange-50",
      story:
        "At 32, I was a successful physician working 80-hour weeks. I had everything I thought I wanted – career, recognition, financial security. But my body was screaming for help.",
      details: [
        {
          icon: "Zap",
          title: "The Wake-Up Call",
          description:
            "Chronic fatigue, anxiety attacks, and a health scare that changed everything. I was treating patients while neglecting my own wellbeing.",
        },
        {
          icon: "Brain",
          title: "The Realization",
          description:
            "I realized I was living a contradiction – helping others heal while slowly destroying myself with stress and poor lifestyle choices.",
        },
        {
          icon: "Heart",
          title: "The Decision",
          description:
            "That night in the ER as a patient, not a doctor, I made a promise to myself: I would find a better way to live and help others do the same.",
        },
      ],
      quote: "Sometimes you have to lose yourself to find your true purpose.",
      emotion: "vulnerable",
    },
    {
      id: 2,
      year: "2013-2018",
      phase: "The Transformation",
      title: "Finding the Path to Healing",
      icon: "Sunrise",
      color: "from-blue-500/30 to-indigo-500/30",
      borderColor: "border-blue-500/40",
      bgGradient: "from-blue-50 to-indigo-50",
      story:
        "Five years of deep learning, healing, and discovering what truly creates lasting health transformation. This wasn't just about me anymore.",
      details: [
        {
          icon: "BookOpenCheck",
          title: "Immersive Learning",
          description:
            "Dove deep into functional medicine, nutrition science, and holistic healing practices. I became my own first patient.",
        },
        {
          icon: "TreePine",
          title: "Personal Healing",
          description:
            "Slowly rebuilt my health from the ground up. Lost 40 pounds, regained energy, and discovered the joy of feeling truly alive again.",
        },
        {
          icon: "Lightbulb",
          title: "The Method",
          description:
            "Developed my unique approach combining medical expertise with personal experience – treating the whole person, not just symptoms.",
        },
      ],
      quote:
        "Healing isn't just about the body; it's about rediscovering who you truly are.",
      emotion: "hopeful",
    },
    {
      id: 3,
      year: "2019-Present",
      phase: "The Mission",
      title: "Helping Others Transform",
      icon: "UserCheck",
      color: "from-green-500/30 to-emerald-500/30",
      borderColor: "border-green-500/40",
      bgGradient: "from-green-50 to-emerald-50",
      story:
        "Now I use my journey and expertise to guide others through their own transformation. Every client's success validates that there is always hope.",
      details: [
        {
          icon: "Users",
          title: "500+ Lives Changed",
          description:
            "Each client teaches me something new. Every transformation reminds me why I chose this path of service and healing.",
        },
        {
          icon: "Stethoscope",
          title: "Integrated Approach",
          description:
            "Combining medical knowledge with personal experience creates deeper, more lasting change than either approach alone.",
        },
        {
          icon: "Heart",
          title: "Authentic Connection",
          description:
            "When I share my story, clients know I truly understand their struggles. This connection is where real healing begins.",
        },
      ],
      quote:
        "Your greatest struggle often becomes your greatest strength – and your gift to others.",
      emotion: "empowered",
    },
  ],
  approach: [
    {
      icon: "Heart",
      title: "Empathy-First Approach",
      description:
        "I've been where you are. My struggles inform my compassion.",
      color: "text-red-500",
    },
    {
      icon: "Target",
      title: "Personalized Strategy",
      description:
        "Your plan is crafted specifically for your life, goals, and challenges.",
      color: "text-primary",
    },
    {
      icon: "MessageCircle",
      title: "Always Available",
      description:
        "Real support means being there when you need guidance most.",
      color: "text-secondary",
    },
    {
      icon: "TrendingUp",
      title: "Proven Results",
      description:
        "My methods work because they're tested by my own transformation.",
      color: "text-orange-500",
    },
  ],
  contact: {
    phone: "(555) 123-4567",
    email: "sarah@healthcoachpro.com",
    location: "San Francisco, CA",
    availability: "Available Mon-Fri, 9AM-6PM PST",
    responseTime: "I respond within 24 hours",
    meetingTypes: "Virtual sessions available worldwide",
  },
  promise:
    "I will never ask you to do something I haven't done myself. Your success is built on my authentic experience.",
  footerDescription:
    "Transforming lives through personalized health coaching, authentic care, and proven strategies based on real experience.",
};

export const getCoach: RequestHandler = (req, res) => {
  try {
    // In a real application, you might get coach ID from params
    // const coachId = req.params.id;

    const response: GetCoachResponse = {
      success: true,
      data: sampleCoachData,
      message: "Coach data retrieved successfully",
    };

    res.json(response);
  } catch (error) {
    const response: GetCoachResponse = {
      success: false,
      data: {} as CoachData,
      message: "Failed to retrieve coach data",
    };

    res.status(500).json(response);
  }
};

// Export for multiple coaches - you could modify this to fetch different coach data
export const getCoachById: RequestHandler = (req, res) => {
  try {
    const coachId = req.params.id;

    // Here you would fetch specific coach data based on ID
    // For now, returning the same sample data
    const response: GetCoachResponse = {
      success: true,
      data: sampleCoachData,
      message: `Coach data for ${coachId} retrieved successfully`,
    };

    res.json(response);
  } catch (error) {
    const response: GetCoachResponse = {
      success: false,
      data: {} as CoachData,
      message: "Failed to retrieve coach data",
    };

    res.status(500).json(response);
  }
};
