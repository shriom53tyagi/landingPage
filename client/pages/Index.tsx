import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCoachData } from "@/hooks/use-coach-data";
import { getIcon } from "@/lib/icon-mapper";
import {
  Heart,
  Users,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Target,
  Activity,
  Award,
  BookOpen,
  Sparkles,
  Quote,
  Star,
  Clock,
  TrendingUp,
  MessageCircle,
  Camera,
  Play,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Zap,
  Brain,
  Mountain,
  Sunrise,
  TreePine,
  Lightbulb,
  UserCheck,
  Stethoscope,
  GraduationCap,
  BookOpenCheck,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const personalFloat = {
  y: [-8, 8, -8],
  rotate: [-1, 1, -1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const glowPulse = {
  boxShadow: [
    "0 0 20px rgba(59, 130, 246, 0.3)",
    "0 0 40px rgba(59, 130, 246, 0.6)",
    "0 0 20px rgba(59, 130, 246, 0.3)",
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
};

export default function Index() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [activeQuote, setActiveQuote] = useState(0);
  const [currentStory, setCurrentStory] = useState(0);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [showStoryDialog, setShowStoryDialog] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Fetch coach data
  const { coachData, loading, error } = useCoachData();

  const personalQuotes = [
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
  ];

  const storyChapters = [
    {
      id: 1,
      year: "2012",
      phase: "",
      title: "When Everything Fell Apart",
      icon: Mountain,
      color: "from-red-500/30 to-orange-500/30",
      borderColor: "border-red-500/40",
      bgGradient: "from-red-50 to-orange-50",
      story:
        "At 32, I was a successful physician working 80-hour weeks. I had everything I thought I wanted – career, recognition, financial security. But my body was screaming for help.",
      details: [
        {
          icon: Zap,
          title: "The Wake-Up Call",
          description:
            "Chronic fatigue, anxiety attacks, and a health scare that changed everything. I was treating patients while neglecting my own wellbeing.",
        },
        {
          icon: Brain,
          title: "The Realization",
          description:
            "I realized I was living a contradiction – helping others heal while slowly destroying myself with stress and poor lifestyle choices.",
        },
        {
          icon: Heart,
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
      icon: Sunrise,
      color: "from-blue-500/30 to-indigo-500/30",
      borderColor: "border-blue-500/40",
      bgGradient: "from-blue-50 to-indigo-50",
      story:
        "Five years of deep learning, healing, and discovering what truly creates lasting health transformation. This wasn't just about me anymore.",
      details: [
        {
          icon: BookOpenCheck,
          title: "Immersive Learning",
          description:
            "Dove deep into functional medicine, nutrition science, and holistic healing practices. I became my own first patient.",
        },
        {
          icon: TreePine,
          title: "Personal Healing",
          description:
            "Slowly rebuilt my health from the ground up. Lost 40 pounds, regained energy, and discovered the joy of feeling truly alive again.",
        },
        {
          icon: Lightbulb,
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
      icon: UserCheck,
      color: "from-green-500/30 to-emerald-500/30",
      borderColor: "border-green-500/40",
      bgGradient: "from-green-50 to-emerald-50",
      story:
        "Now I use my journey and expertise to guide others through their own transformation. Every client's success validates that there is always hope.",
      details: [
        {
          icon: Users,
          title: "500+ Lives Changed",
          description:
            "Each client teaches me something new. Every transformation reminds me why I chose this path of service and healing.",
        },
        {
          icon: Stethoscope,
          title: "Integrated Approach",
          description:
            "Combining medical knowledge with personal experience creates deeper, more lasting change than either approach alone.",
        },
        {
          icon: Heart,
          title: "Authentic Connection",
          description:
            "When I share my story, clients know I truly understand their struggles. This connection is where real healing begins.",
        },
      ],
      quote:
        "Your greatest struggle often becomes your greatest strength – and your gift to others.",
      emotion: "empowered",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { email, message });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const paginate = (newDirection: number) => {
    const newPage =
      (page + newDirection + storyChapters.length) % storyChapters.length;
    setPage([newPage, newDirection]);
  };

  const goToStory = (index: number) => {
    const newDirection = index > page ? 1 : -1;
    setPage([index, newDirection]);
  };

  // Show loading or error states
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Loading coach profile...</p>
        </div>
      </div>
    );
  }

  if (error || !coachData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load coach profile</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const currentChapter = coachData.storyChapters[page];
  const progressPercentage =
    ((page + 1) / coachData.storyChapters.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={personalFloat}
                whileHover={glowPulse}
                className="relative w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center overflow-hidden border-2 border-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full"></div>
                <Heart className="w-5 h-5 text-primary-foreground relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <span className="text-xl font-semibold text-foreground">
                  {coachData.profile.name}
                </span>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-muted-foreground"
                >
                  {coachData.profile.title}
                </motion.p>
              </div>
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              <motion.a
                whileHover={{ scale: 1.05, color: "hsl(var(--foreground))" }}
                href="#story"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                My Story
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, color: "hsl(var(--foreground))" }}
                href="#approach"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                My Approach
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, color: "hsl(var(--foreground))" }}
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Connect
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">Book Your Call</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-trust-blue/5 via-background to-healing-green/5 py-20 lg:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-4 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              variants={fadeInLeft}
              className="max-w-2xl lg:order-1 order-2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3 mb-6"
              >
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Your Personal Health Partner
                </Badge>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                >
                  <Heart className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              >
                Hi, I'm
                <motion.span
                  initial={{ color: "hsl(var(--foreground))" }}
                  animate={{
                    color: [
                      "hsl(var(--primary))",
                      "hsl(var(--secondary))",
                      "hsl(var(--primary))",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-primary block"
                >
                  {coachData.profile.name}
                </motion.span>
                <span className="text-2xl lg:text-3xl text-muted-foreground block mt-2">
                  {coachData.profile.tagline}
                </span>
              </motion.h1>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-trust-blue/10 to-healing-green/10 rounded-2xl p-6 mb-8 border border-primary/20"
              >
                <motion.div
                  key={activeQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start space-x-3"
                >
                  <Quote className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-lg italic text-foreground mb-2">
                      {coachData.personalQuotes[activeQuote].text}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      — {coachData.personalQuotes[activeQuote].context}
                    </p>
                  </div>
                </motion.div>
                <div className="flex space-x-2 mt-4">
                  {coachData.personalQuotes.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveQuote(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeQuote ? "bg-primary" : "bg-muted"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8"
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center">
                      Start My Transformation
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-50"
                >
                  <Dialog
                    open={showStoryDialog}
                    onOpenChange={setShowStoryDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 relative z-50"
                      >
                        <Play className="mr-2 w-5 h-5" />
                        Watch My Story (2 min)
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-[95vw] max-h-[85vh] p-0 overflow-hidden">
                      <DialogHeader className="p-6 pb-4 border-b border-border/50">
                        <DialogTitle className="flex items-center text-2xl">
                          <Play className="mr-3 w-6 h-6 text-primary" />
                          My Health Transformation Story
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground mt-2">
                          A personal message from {coachData?.profile.name} - 2
                          minutes that could change your life
                        </DialogDescription>
                      </DialogHeader>
                      <div className="p-6 flex-1 min-h-0">
                        <div className="relative w-full h-[60vh] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl overflow-hidden border border-border/20">
                          {/* Video Placeholder */}
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8"
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 2, -2, 0],
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl mb-6"
                            >
                              <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white ml-1" />
                            </motion.div>
                            <div className="space-y-4 max-w-lg">
                              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                                Video Coming Soon
                              </h3>
                              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                I'm currently preparing a personal video message
                                to share my transformation story with you. In
                                the meantime, you can read my journey in the
                                sections below.
                              </p>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="pt-2"
                              >
                                <Button
                                  onClick={() => {
                                    setShowStoryDialog(false);
                                    setTimeout(() => {
                                      document
                                        .getElementById("story")
                                        ?.scrollIntoView({
                                          behavior: "smooth",
                                        });
                                    }, 100);
                                  }}
                                  size="lg"
                                  className="w-full sm:w-auto"
                                >
                                  <BookOpen className="mr-2 w-4 h-4" />
                                  Read My Story Instead
                                </Button>
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-3 gap-4 text-center"
              >
                {[
                  {
                    number: `${coachData.profile.yearsExperience}+`,
                    label: "Years Experience",
                    icon: Clock,
                  },
                  {
                    number: `${coachData.profile.livesChanged}+`,
                    label: "Lives Changed",
                    icon: Users,
                  },
                  {
                    number: `${coachData.profile.successRate}%`,
                    label: "Success Rate",
                    icon: TrendingUp,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="bg-gradient-to-br from-background/80 to-warm-neutral/50 rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{
                        duration: 2,
                        delay: index * 0.5,
                        repeat: Infinity,
                      }}
                    >
                      <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    </motion.div>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.number}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              className="relative lg:order-2 order-1"
            >
              <motion.div
                onMouseMove={handleMouseMove}
                style={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                }}
                className="relative perspective-1000"
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 relative overflow-hidden border-2 border-primary/20"
                >
                  {/* Dr Sarah Chen Photo */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute inset-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl overflow-hidden"
                  >
                    <motion.div
                      animate={glowPulse}
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                    >
                      {/* Photo Container */}
                      <div className="relative w-full h-full">
                        {/* Professional placeholder photo */}
                        <motion.img
                          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
                          alt={`${coachData.profile.name} - Health Coach`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const fallback =
                              target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.8 }}
                        />

                        {/* Fallback placeholder if image doesn't load */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/85 backdrop-blur-sm flex items-center justify-center text-center"
                          style={{ display: "none" }}
                        >
                          <div className="space-y-4">
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto border-4 border-white/50 shadow-2xl"
                            >
                              <Camera className="w-10 h-10 text-white" />
                            </motion.div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-1">
                                {coachData.profile.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {coachData.profile.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Overlay with name and rating */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1, duration: 0.6 }}
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent p-4 text-center"
                        >
                          <motion.h3 className="text-lg font-semibold text-foreground mb-2">
                            {coachData.profile.name}
                          </motion.h3>
                          <motion.div
                            className="flex justify-center space-x-1 mb-2"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                          >
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                variants={fadeInUp}
                                animate={{
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                  duration: 0.5,
                                  delay: i * 0.1,
                                  repeat: Infinity,
                                  repeatDelay: 3,
                                }}
                              >
                                <Star className="w-3 h-3 fill-primary text-primary" />
                              </motion.div>
                            ))}
                          </motion.div>
                          <motion.p className="text-xs text-muted-foreground">
                            {coachData.profile.description}
                          </motion.p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Floating credentials */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-background/90 backdrop-blur rounded-lg p-1.5 sm:p-2 border border-primary/20 shadow-lg"
                  >
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Shield className="w-3 sm:w-4 h-3 sm:h-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">
                        {coachData.profile.certifications[0]}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      x: [0, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-background/90 backdrop-blur rounded-lg p-1.5 sm:p-2 border border-secondary/20 shadow-lg"
                  >
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Award className="w-3 sm:w-4 h-3 sm:h-4 text-secondary" />
                      <span className="text-xs font-medium text-foreground">
                        {coachData.profile.certifications[1]}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Personal Story Section */}
      <section
        id="story"
        className="py-20 lg:py-32 bg-warm-neutral/50 overflow-hidden"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto px-4 lg:px-8"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20">
              <BookOpen className="w-4 h-4 mr-2" />
              My Personal Journey
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              The Story That Changed Everything
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Click through my journey - from crisis to calling. Every step
              shaped who I am as your coach today.
            </p>

            {/* Progress Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="w-full max-w-md mx-auto mb-8"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Chapter {page + 1} of {coachData.storyChapters.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </motion.div>
          </motion.div>

          {/* Story Navigation */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center items-center gap-3 sm:gap-4 mb-12 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <div className="flex space-x-1.5 sm:space-x-2 flex-1 justify-center max-w-24">
              {coachData.storyChapters.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToStory(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
                    index === page
                      ? "bg-primary scale-125"
                      : "bg-muted hover:bg-primary/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow flex-shrink-0"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </motion.div>

          {/* Story Content */}
          <div className="relative min-h-[400px] lg:min-h-[600px] z-10">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute inset-0 z-20"
              >
                <Card
                  className={`border-2 ${currentChapter.borderColor} bg-gradient-to-br ${currentChapter.color} shadow-2xl overflow-hidden`}
                >
                  <CardContent className="p-0">
                    {/* Chapter Header */}
                    <motion.div
                      className={`bg-gradient-to-r ${currentChapter.bgGradient} dark:from-background/90 dark:to-background/70 p-8 border-b border-border/50`}
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <Badge variant="outline" className="text-lg px-4 py-2">
                          {currentChapter.year}
                        </Badge>
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className={`w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg`}
                        >
                          {(() => {
                            const IconComponent = getIcon(currentChapter.icon);
                            return (
                              <IconComponent className="w-8 h-8 text-white" />
                            );
                          })()}
                        </motion.div>
                      </div>

                      <motion.h3
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-foreground mb-2"
                      >
                        {currentChapter.title}
                      </motion.h3>

                      <motion.p
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-muted-foreground mb-6"
                      >
                        {currentChapter.story}
                      </motion.p>

                      {/* Quote */}
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20"
                      >
                        <div className="flex items-start space-x-3">
                          <Quote className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                          <p className="text-xl italic text-foreground font-medium">
                            {currentChapter.quote}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Chapter Details */}
                    <motion.div
                      className="p-8"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {currentChapter.details.map((detail, index) => (
                          <motion.div
                            key={detail.title}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            whileHover={{
                              scale: 1.05,
                              y: -5,
                              transition: { duration: 0.2 },
                            }}
                            className="bg-background/80 backdrop-blur rounded-xl p-4 md:p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                          >
                            <motion.div
                              whileHover={{
                                scale: 1.2,
                                rotate: 10,
                                transition: { duration: 0.2 },
                              }}
                              className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300"
                            >
                              {(() => {
                                const IconComponent = getIcon(detail.icon);
                                return (
                                  <IconComponent className="w-6 h-6 text-primary" />
                                );
                              })()}
                            </motion.div>

                            <h4 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                              {detail.title}
                            </h4>

                            <p className="text-muted-foreground leading-relaxed">
                              {detail.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Story Navigation Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center items-center gap-3 sm:gap-4 mt-12 relative z-30 px-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => paginate(-1)}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>
            </motion.div>

            <motion.div className="text-center px-1 sm:px-6 flex-1 max-w-32">
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block truncate">
                {currentChapter.phase}
              </p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <ArrowDown className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
              </motion.div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => paginate(1)}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* My Approach Section */}
      <section id="approach" className="py-20 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto px-4 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  My Personal Approach
                </Badge>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl lg:text-5xl font-bold text-foreground mb-6"
              >
                Why I'm Different
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground mb-8 leading-relaxed"
              >
                I don't believe in one-size-fits-all solutions. Having walked
                this path myself, I understand that every person's health
                journey is unique. That's why I combine my medical expertise
                with genuine empathy and personal experience.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-6">
                {coachData.approach.map((approach, index) => (
                  <motion.div
                    key={approach.title}
                    variants={fadeInUp}
                    whileHover={{
                      scale: 1.03,
                      x: 10,
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-background/80 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: 10,
                        transition: { duration: 0.2 },
                      }}
                      className={`w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      {(() => {
                        const IconComponent = getIcon(approach.icon);
                        return (
                          <IconComponent
                            className={`w-6 h-6 ${approach.color}`}
                          />
                        );
                      })()}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {approach.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {approach.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInRight} className="relative">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border-2 border-primary/20"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-background/90 backdrop-blur rounded-2xl p-8 text-center"
                >
                  <motion.div
                    animate={personalFloat}
                    className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/50 shadow-xl"
                  >
                    <Activity className="w-10 h-10 text-white" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-2xl font-semibold text-foreground mb-4"
                  >
                    My Promise to You
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-muted-foreground mb-6 italic"
                  >
                    "{coachData.promise}"
                  </motion.p>

                  <motion.div
                    className="flex justify-center space-x-1 mb-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        variants={fadeInUp}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 4,
                        }}
                      >
                        <Star className="w-5 h-5 fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="text-sm text-muted-foreground"
                  >
                    — {coachData.profile.name}, Your Health Partner
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-warm-neutral/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto px-4 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div variants={fadeInLeft}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                  <Heart className="w-4 h-4 mr-2" />
                  Let's Connect
                </Badge>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl lg:text-5xl font-bold text-foreground mb-6"
              >
                Ready to Begin Your Journey?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-muted-foreground mb-8"
              >
                I'm here to listen, understand your unique situation, and create
                a personalized path forward. Your transformation starts with a
                simple conversation.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="space-y-6 mb-8"
              >
                {[
                  {
                    icon: Phone,
                    label: "Call Me Directly",
                    value: coachData.contact.phone,
                    subtext: coachData.contact.availability,
                  },
                  {
                    icon: Mail,
                    label: "Email Me",
                    value: coachData.contact.email,
                    subtext: coachData.contact.responseTime,
                  },
                  {
                    icon: MapPin,
                    label: "Meet In-Person or Online",
                    value: coachData.contact.location,
                    subtext: coachData.contact.meetingTypes,
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    variants={fadeInUp}
                    whileHover={{
                      scale: 1.03,
                      x: 15,
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-start space-x-4 p-6 rounded-xl hover:bg-background/80 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/30 hover:shadow-lg"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: 10,
                        transition: { duration: 0.2 },
                      }}
                      className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <contact.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        {contact.label}
                      </p>
                      <p className="text-foreground">{contact.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.subtext}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Calendar className="mr-2 w-5 h-5" />
                    Book Your Free Discovery Call
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-warm-neutral/30">
                  <CardContent className="p-8">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-xl font-semibold text-foreground mb-6 flex items-center"
                    >
                      <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                      Send Me a Personal Message
                    </motion.h3>
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.div variants={fadeInUp}>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Your Email Address
                        </label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          className="relative"
                        >
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="pl-10"
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </motion.div>
                      <motion.div variants={fadeInUp}>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Tell Me About Your Health Goals
                        </label>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Share what you're hoping to achieve with your health... I read every message personally."
                            rows={5}
                            required
                          />
                        </motion.div>
                      </motion.div>
                      <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full relative overflow-hidden group"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10 flex items-center justify-center">
                            Send My Message to Sarah
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </span>
                        </Button>
                      </motion.div>
                    </motion.form>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20"
                    >
                      <p className="text-sm text-muted-foreground text-center italic">
                        "I personally read and respond to every message within
                        24 hours. Your story matters to me." -{" "}
                        {coachData.profile.name.split(" ")[1] ||
                          coachData.profile.name}
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-border bg-gradient-to-br from-background to-warm-neutral/30"
      >
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeInUp} className="md:col-span-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 mb-4"
              >
                <motion.div
                  animate={personalFloat}
                  className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center border-2 border-primary/20"
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <span className="text-xl font-semibold text-foreground">
                    {coachData.profile.name}
                  </span>
                  <p className="text-sm text-muted-foreground">
                    {coachData.profile.description}
                  </p>
                </div>
              </motion.div>
              <motion.p
                variants={fadeInUp}
                className="text-muted-foreground mb-4 max-w-md"
              >
                {coachData.footerDescription}
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-sm text-muted-foreground"
              >
                © 2024 {coachData.profile.name} Health Coaching. All rights
                reserved.
              </motion.p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["My Story", "My Approach", "Book a Call", "Send Message"].map(
                  (link) => (
                    <motion.li
                      key={link}
                      whileHover={{ x: 5, color: "hsl(var(--foreground))" }}
                    >
                      <a
                        href="#"
                        className="hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </motion.li>
                  ),
                )}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["FAQ", "Resources", "Success Stories", "Privacy"].map(
                  (link) => (
                    <motion.li
                      key={link}
                      whileHover={{ x: 5, color: "hsl(var(--foreground))" }}
                    >
                      <a
                        href="#"
                        className="hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </motion.li>
                  ),
                )}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
