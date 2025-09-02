"use client";

import React, { useState, useEffect } from 'react';
import { 
  Compass,
  Map,
  Rocket,
  Star,
  Lightbulb,
  Target,
  Trophy,
  Flame,
  Brain,
  Eye,
  Heart,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Play,
  ChevronLeft,
  ChevronRight,
  Code,
  Palette,
  Calculator,
  Coffee,
  Layers,
  Database,
  Smartphone,
  Shield,
  CloudLightning,
  Activity,
  BarChart3,
} from 'lucide-react';

// Learning Paths Data
const learningPaths = [
  {
    id: 1,
    title: "Full-Stack Developer Journey",
    description: "Master web development from frontend to backend",
    duration: "6 months",
    difficulty: "Intermediate",
    students: 15420,
    rating: 4.9,
    progress: 0,
    color: "from-blue-500 to-purple-600",
    bgColor: "from-blue-50 to-purple-50",
    icon: Code,
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    modules: 12,
    projects: 5
  },
  {
    id: 2,
    title: "AI & Machine Learning Explorer",
    description: "Dive deep into artificial intelligence and ML algorithms",
    duration: "8 months",
    difficulty: "Advanced",
    students: 8900,
    rating: 4.8,
    progress: 0,
    color: "from-green-500 to-teal-600",
    bgColor: "from-green-50 to-teal-50",
    icon: Brain,
    skills: ["Python", "TensorFlow", "Deep Learning", "Neural Networks"],
    modules: 15,
    projects: 8
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "Become a marketing expert in the digital age",
    duration: "4 months",
    difficulty: "Beginner",
    students: 22100,
    rating: 4.7,
    progress: 0,
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-50 to-rose-50",
    icon: TrendingUp,
    skills: ["SEO", "Social Media", "Analytics", "Content Strategy"],
    modules: 10,
    projects: 6
  },
  {
    id: 4,
    title: "Data Science Expedition",
    description: "Extract insights from data and make informed decisions",
    duration: "7 months",
    difficulty: "Intermediate",
    students: 11800,
    rating: 4.9,
    progress: 0,
    color: "from-indigo-500 to-blue-600",
    bgColor: "from-indigo-50 to-blue-50",
    icon: BarChart3,
    skills: ["Python", "R", "Statistics", "Data Visualization"],
    modules: 13,
    projects: 7
  }
];

// Trending Topics
const trendingTopics = [
  { name: "ChatGPT & AI Tools", growth: "+250%", icon: Brain, color: "text-purple-600" },
  { name: "Web3 Development", growth: "+180%", icon: CloudLightning, color: "text-blue-600" },
  { name: "No-Code Development", growth: "+165%", icon: Layers, color: "text-green-600" },
  { name: "Cybersecurity", growth: "+140%", icon: Shield, color: "text-red-600" },
  { name: "Cloud Computing", growth: "+120%", icon: Database, color: "text-indigo-600" },
  { name: "Mobile Development", growth: "+110%", icon: Smartphone, color: "text-pink-600" }
];

// Interactive Challenges
const challenges = [
  {
    id: 1,
    title: "30-Day Coding Challenge",
    description: "Build 30 projects in 30 days",
    participants: 5420,
    timeLeft: "5 days left",
    difficulty: "All Levels",
    prize: "$500 Amazon Gift Card",
    color: "from-orange-400 to-red-500",
    icon: Code
  },
  {
    id: 2,
    title: "Design Sprint Week",
    description: "Create stunning UI/UX designs",
    participants: 2890,
    timeLeft: "12 days left",
    difficulty: "Intermediate",
    prize: "Adobe Creative Suite License",
    color: "from-purple-400 to-pink-500",
    icon: Palette
  },
  {
    id: 3,
    title: "Math Olympiad 2024",
    description: "Solve complex mathematical problems",
    participants: 1650,
    timeLeft: "20 days left",
    difficulty: "Advanced",
    prize: "Scholarship Opportunity",
    color: "from-blue-400 to-indigo-500",
    icon: Calculator
  }
];

// Success Stories
const successStories = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    story: "Started as a complete beginner, now working at my dream company!",
    course: "Full-Stack Development",
    image: "👩‍💻",
    achievement: "Career Switch Success",
    timeframe: "8 months"
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    role: "Data Scientist at Netflix",
    story: "The AI course gave me the skills to land my dream job in data science.",
    course: "AI & Machine Learning",
    image: "👨‍🔬",
    achievement: "Salary Increase 180%",
    timeframe: "6 months"
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Freelance Designer",
    story: "Built a successful freelance business earning $80k/year.",
    course: "Digital Design Mastery",
    image: "👩‍🎨",
    achievement: "Business Success",
    timeframe: "4 months"
  }
];

// Live Events
const liveEvents = [
  {
    id: 1,
    title: "AI in Healthcare: Future Perspectives",
    speaker: "Dr. Emily Watson",
    time: "2:00 PM EST",
    date: "Today",
    attendees: 1240,
    type: "Webinar",
    isLive: true
  },
  {
    id: 2,
    title: "Building Scalable React Applications",
    speaker: "John Smith",
    time: "4:00 PM EST",
    date: "Tomorrow",
    attendees: 890,
    type: "Workshop",
    isLive: false
  },
  {
    id: 3,
    title: "Cryptocurrency & Blockchain Basics",
    speaker: "Alex Johnson",
    time: "6:00 PM EST",
    date: "Mar 15",
    attendees: 2100,
    type: "Masterclass",
    isLive: false
  }
];

export default function ExplorePage() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [selectedPath, setSelectedPath] = useState(null); //eslint-disable-line

  // Auto-rotate success stories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Interactive Learning Universe */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full opacity-20"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <Compass className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Explore Learning Universe</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Discover
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  Your Path
                </span>
              </h1>
              
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                Embark on personalized learning journeys, join live challenges, 
                and connect with a global community of learners. Your adventure starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 flex items-center gap-2">
                  <Rocket className="w-6 h-6" />
                  Start Your Journey
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                  <Play className="w-6 h-6" />
                  Take the Tour
                </button>
              </div>

              {/* Real-time Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">150K+</div>
                  <div className="text-indigo-200 text-sm">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-indigo-200 text-sm">Learning Paths</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">95%</div>
                  <div className="text-indigo-200 text-sm">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Element */}
            <div className="relative">
              <div className="relative w-full h-96 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                <div className="p-8 h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-4">🎯 Your Learning DNA</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white">Analyzing your interests...</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <span className="text-white">Finding perfect matches...</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      <span className="text-white">Creating your path...</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
                    Discover My Path
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Topics Ticker */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 overflow-x-auto">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-gray-900">Trending:</span>
            </div>
            <div className="flex gap-8">
              {trendingTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <div key={index} className="flex items-center gap-3 whitespace-nowrap">
                    <Icon className={`w-4 h-4 ${topic.color}`} />
                    <span className="text-gray-900 font-medium">{topic.name}</span>
                    <span className="text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
                      {topic.growth}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Learning Paths */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
              <Map className="w-4 h-4" />
              <span className="font-medium">Personalized Paths</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Journey, Your Way
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI-powered learning paths tailored to your goals, learning style, and schedule
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {learningPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className={`group relative bg-gradient-to-br ${path.bgColor} border-2 border-transparent hover:border-blue-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer ${selectedPath === path.id ? 'ring-4 ring-blue-300' : ''}`}
                  onClick={() => {}}
                >
                  {/* Progress Ring */}
                  <div className="absolute top-6 right-6">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-200" />
                        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-blue-500" strokeDasharray={`${path.progress * 1.76} 176`} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-900">{path.progress}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${path.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{path.title}</h3>
                    <p className="text-gray-600 text-lg">{path.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{path.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{path.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{path.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-700">{path.rating} rating</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Skills you&apos;ll learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-white/70 text-gray-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Info (Expandable) */}
                  {selectedPath === path.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 animate-in slide-in-from-top duration-300">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-4 bg-white/50 rounded-xl">
                          <div className="text-2xl font-bold text-gray-900">{path.modules}</div>
                          <div className="text-sm text-gray-600">Modules</div>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-xl">
                          <div className="text-2xl font-bold text-gray-900">{path.projects}</div>
                          <div className="text-sm text-gray-600">Projects</div>
                        </div>
                      </div>
                      <button className={`w-full bg-gradient-to-r ${path.color} text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300`}>
                        Start This Journey
                      </button>
                    </div>
                  )}

                  {!selectedPath && (
                    <button className={`w-full bg-gradient-to-r ${path.color} text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300`}>
                      Explore Path
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Challenges */}
      <div className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-2 mb-4">
              <Trophy className="w-4 h-4" />
              <span className="font-medium">Live Challenges</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Compete & Win
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join exciting challenges, compete with peers worldwide, and win amazing prizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              return (
                <div
                  key={challenge.id}
                  className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${challenge.color} rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:scale-150 transition-transform duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${challenge.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{challenge.title}</h3>
                    <p className="text-gray-600 mb-6">{challenge.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Participants</span>
                        <span className="font-semibold text-gray-900">{challenge.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Time Left</span>
                        <span className="font-semibold text-orange-600">{challenge.timeLeft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Level</span>
                        <span className="font-semibold text-gray-900">{challenge.difficulty}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Prize</span>
                      </div>
                      <span className="text-yellow-700">{challenge.prize}</span>
                    </div>
                    
                    <button className={`w-full bg-gradient-to-r ${challenge.color} text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300`}>
                      Join Challenge
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Success Stories Carousel */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4" />
              <span className="font-medium">Success Stories</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Dreams Come True
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real stories from real people who transformed their lives through learning
            </p>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="text-center">
                <div className="text-6xl mb-4">{successStories[currentStoryIndex].image}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{successStories[currentStoryIndex].name}</h3>
                <p className="text-blue-300 mb-4">{successStories[currentStoryIndex].role}</p>
                <blockquote className="text-xl text-gray-200 mb-6 italic max-w-2xl mx-auto">
                  &qout;{successStories[currentStoryIndex].story}&quot;
                </blockquote>
                <div className="flex justify-center gap-8 text-sm text-gray-300">
                  <div>
                    <div className="font-semibold text-white">{successStories[currentStoryIndex].course}</div>
                    <div>Course Completed</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{successStories[currentStoryIndex].achievement}</div>
                    <div>Achievement</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{successStories[currentStoryIndex].timeframe}</div>
                    <div>Timeline</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevStory}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextStory}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStoryIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStoryIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Events */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 rounded-full px-4 py-2 mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Live Events</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Join Live Sessions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Connect with experts and peers in real-time learning experiences
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300">
              View All Events
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.isLive 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {event.isLive ? '🔴 LIVE' : event.type}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{event.date}</div>
                    <div className="text-sm text-gray-600">{event.time}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">with {event.speaker}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{event.attendees} attending</span>
                </div>
                
                <button className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
                  event.isLive
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  {event.isLive ? 'Join Now' : 'Register'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Analytics Dashboard Preview */}
      <div className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 rounded-full px-4 py-2 mb-4">
              <Activity className="w-4 h-4" />
              <span className="font-medium">Smart Analytics</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Track Your Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI-powered insights help you understand your learning patterns and optimize your progress
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Learning Streak */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">47 Days</div>
                <div className="text-gray-600">Learning Streak</div>
                <div className="mt-4 bg-gray-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full h-2 w-4/5"></div>
                </div>
              </div>

              {/* Skills Mastered */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">23 Skills</div>
                <div className="text-gray-600">Mastered</div>
                <div className="mt-4 flex gap-2 justify-center">
                  {['React', 'Python', 'Design'].map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Time */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">156 Hours</div>
                <div className="text-gray-600">Total Learning</div>
                <div className="mt-4 text-sm text-purple-600 font-semibold">
                  +2.5 hours this week
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Weekly Progress</h3>
                  <p className="text-gray-600">You7&apos;re 20% ahead of your goal!</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
                  View Full Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Spotlight */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 rounded-full px-4 py-2 mb-4">
              <Users className="w-4 h-4" />
              <span className="font-medium">Community</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Learn Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join study groups, find mentors, and collaborate on projects with learners worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Study Groups */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Study Groups</h3>
              <p className="text-gray-600 mb-4">Join 500+ active study groups</p>
              <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Join Group
              </button>
            </div>

            {/* Mentorship */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mentorship</h3>
              <p className="text-gray-600 mb-4">Connect with 200+ mentors</p>
              <button className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
                Find Mentor
              </button>
            </div>

            {/* Project Collaboration */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Projects</h3>
              <p className="text-gray-600 mb-4">Collaborate on 1000+ projects</p>
              <button className="w-full bg-purple-500 text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300">
                Start Project
              </button>
            </div>

            {/* Discussion Forums */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Discussions</h3>
              <p className="text-gray-600 mb-4">Join daily conversations</p>
              <button className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                Join Discussion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action - Start Exploring */}
      <div className="py-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 3}s`
              }}
            >
              <div className="w-1 h-1 bg-white rounded-full opacity-20"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Ready to Explore?</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Your Adventure
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Starts Now
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join 150,000+ learners who are already transforming their lives. 
            Discover your passion, master new skills, and achieve your dreams with Growth Tubes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 flex items-center gap-3 text-lg">
              <Rocket className="w-6 h-6" />
              Start Free Today
            </button>
            <button className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center gap-3 text-lg">
              <Eye className="w-6 h-6" />
              Take the Tour
            </button>
          </div>

          <div className="text-gray-400 text-sm">
            No credit card required • 7-day free trial • Cancel anytime
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}