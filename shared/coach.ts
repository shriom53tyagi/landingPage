export interface CoachProfile {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  tagline: string;
  description: string;
  yearsExperience: number;
  livesChanged: number;
  successRate: number;
  credentials: string[];
  certifications: string[];
}

export interface PersonalQuote {
  text: string;
  context: string;
}

export interface StoryDetail {
  icon: string; // Icon name
  title: string;
  description: string;
}

export interface StoryChapter {
  id: number;
  year: string;
  phase: string;
  title: string;
  icon: string; // Icon name
  color: string;
  borderColor: string;
  bgGradient: string;
  story: string;
  details: StoryDetail[];
  quote: string;
  emotion: string;
}

export interface ApproachPoint {
  icon: string; // Icon name
  title: string;
  description: string;
  color: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  availability: string;
  responseTime: string;
  meetingTypes: string;
}

export interface CoachData {
  profile: CoachProfile;
  personalQuotes: PersonalQuote[];
  storyChapters: StoryChapter[];
  approach: ApproachPoint[];
  contact: ContactInfo;
  promise: string;
  footerDescription: string;
}

export interface GetCoachResponse {
  success: boolean;
  data: CoachData;
  message?: string;
}
