"use client"

import React, { useState } from 'react';
import { 
  GraduationCap,
  Monitor,
  Newspaper,
  Clipboard,
  Video,
  Headphones,
  BookOpen,
  FileText,
  Trophy,
  Download,
  ChevronRight,
  Filter,
  Search,
  Clock,
  Users,
  Star,
  TrendingUp,
  Eye,
  Play,
  BookmarkPlus,
  Calendar,
  Award,
  Target,
  Zap,
  Lightbulb
} from 'lucide-react';

const browseItems = [
  {
    name: "Courses",
    icon: GraduationCap,
    description: "Full structured courses",
    count: "200+",
    fullDescription: "Comprehensive learning paths with structured modules, assignments, and certificates. Perfect for systematic skill development.",
    features: ["Certificate of completion", "Progress tracking", "Interactive assignments", "Expert instructors"],
    duration: "4-16 weeks",
    difficulty: "All levels",
    popular: ["Web Development", "Data Science", "Digital Marketing", "Business Analytics"],
    totalHours: "2,400+",
    avgRating: 4.8,
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    students: 45000
  },
  {
    name: "Tutorials",
    icon: Monitor,
    description: "Step-by-step guides",
    count: "500+",
    fullDescription: "Quick, focused tutorials covering specific topics and skills. Learn at your own pace with hands-on examples.",
    features: ["Step-by-step guidance", "Code examples", "Practice exercises", "Quick learning"],
    duration: "15-60 minutes",
    difficulty: "Beginner to Advanced",
    popular: ["React Basics", "Python Functions", "CSS Grid", "Database Design"],
    totalHours: "800+",
    avgRating: 4.6,
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    students: 32000
  },
  {
    name: "Articles",
    icon: Newspaper,
    description: "In-depth articles",
    count: "1000+",
    fullDescription: "Comprehensive articles covering theory, best practices, and industry insights from leading experts.",
    features: ["Expert insights", "Industry trends", "Best practices", "Research-backed"],
    duration: "5-20 minutes",
    difficulty: "All levels",
    popular: ["AI Trends", "Career Growth", "Tech Innovation", "Industry Analysis"],
    totalHours: "300+",
    avgRating: 4.5,
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-50 to-violet-50",
    borderColor: "border-purple-200",
    students: 28000
  },
  {
    name: "Quizzes",
    icon: Clipboard,
    description: "Practice tests & quizzes",
    count: "300+",
    fullDescription: "Interactive assessments to test your knowledge and track your learning progress across all subjects.",
    features: ["Instant feedback", "Performance analytics", "Adaptive difficulty", "Progress tracking"],
    duration: "10-45 minutes",
    difficulty: "Beginner to Expert",
    popular: ["JavaScript Quiz", "Math Assessment", "Science Test", "Language Proficiency"],
    totalHours: "150+",
    avgRating: 4.7,
    color: "from-orange-500 to-red-600",
    bgColor: "from-orange-50 to-red-50",
    borderColor: "border-orange-200",
    students: 38000
  },
  {
    name: "Videos",
    icon: Video,
    description: "Educational videos",
    count: "800+",
    fullDescription: "High-quality video content featuring expert instructors, animations, and real-world examples.",
    features: ["HD quality", "Subtitles", "Downloadable", "Mobile optimized"],
    duration: "5-120 minutes",
    difficulty: "All levels",
    popular: ["Coding Bootcamp", "Science Explained", "History Documentaries", "Language Learning"],
    totalHours: "1,200+",
    avgRating: 4.9,
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-50 to-rose-50",
    borderColor: "border-pink-200",
    students: 52000
  },
  {
    name: "Podcasts",
    icon: Headphones,
    description: "Audio learning content",
    count: "150+",
    fullDescription: "Expert interviews, discussions, and audio lessons perfect for learning on-the-go.",
    features: ["Expert interviews", "Industry discussions", "Offline listening", "Series format"],
    duration: "20-90 minutes",
    difficulty: "Intermediate to Advanced",
    popular: ["Tech Talk", "Business Insights", "Science Stories", "Career Advice"],
    totalHours: "400+",
    avgRating: 4.6,
    color: "from-teal-500 to-cyan-600",
    bgColor: "from-teal-50 to-cyan-50",
    borderColor: "border-teal-200",
    students: 18000
  },
  {
    name: "Study Guides",
    icon: BookOpen,
    description: "Comprehensive study materials",
    count: "400+",
    fullDescription: "Structured study materials with summaries, key points, and exam preparation resources.",
    features: ["Exam preparation", "Key summaries", "Practice questions", "Reference materials"],
    duration: "1-8 hours",
    difficulty: "All levels",
    popular: ["SAT Prep", "Certification Guide", "Subject Review", "Exam Strategy"],
    totalHours: "600+",
    avgRating: 4.8,
    color: "from-indigo-500 to-blue-600",
    bgColor: "from-indigo-50 to-blue-50",
    borderColor: "border-indigo-200",
    students: 25000
  },
  {
    name: "Worksheets",
    icon: FileText,
    description: "Printable worksheets",
    count: "600+",
    fullDescription: "Printable practice worksheets covering various subjects and skill levels for hands-on learning.",
    features: ["Printable format", "Answer keys", "Various difficulty levels", "Subject-specific"],
    duration: "15-60 minutes",
    difficulty: "Beginner to Advanced",
    popular: ["Math Practice", "Language Exercises", "Science Labs", "Creative Writing"],
    totalHours: "200+",
    avgRating: 4.4,
    color: "from-yellow-500 to-amber-600",
    bgColor: "from-yellow-50 to-amber-50",
    borderColor: "border-yellow-200",
    students: 22000
  },
  {
    name: "Competitions",
    icon: Trophy,
    description: "Academic competitions",
    count: "50+",
    fullDescription: "Participate in academic competitions and challenges to test your skills against peers worldwide.",
    features: ["Global leaderboards", "Prizes & rewards", "Team competitions", "Skill badges"],
    duration: "1-7 days",
    difficulty: "Intermediate to Expert",
    popular: ["Coding Challenge", "Math Olympiad", "Science Fair", "Business Case Study"],
    totalHours: "100+",
    avgRating: 4.9,
    color: "from-emerald-500 to-green-600",
    bgColor: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
    students: 15000
  },
  {
    name: "Resources",
    icon: Download,
    description: "Downloadable resources",
    count: "1200+",
    fullDescription: "Extensive collection of downloadable templates, tools, cheat sheets, and reference materials.",
    features: ["Instant download", "Various formats", "Regular updates", "Professional quality"],
    duration: "Varies",
    difficulty: "All levels",
    popular: ["Code Templates", "Design Assets", "Cheat Sheets", "Reference Guides"],
    totalHours: "N/A",
    avgRating: 4.7,
    color: "from-slate-500 to-gray-600",
    bgColor: "from-slate-50 to-gray-50",
    borderColor: "border-slate-200",
    students: 35000
  }
];

const categories = ["All", "Popular", "New", "Free", "Premium", "Beginner", "Advanced"];
const sortOptions = ["Most Popular", "Newest", "Highest Rated", "Most Students"];

const overallStats = [
  { label: "Total Content", value: "3.5K+", icon: BookOpen },
  { label: "Active Learners", value: "150K+", icon: Users },
  { label: "Learning Hours", value: "6.2K+", icon: Clock },
  { label: "Avg Rating", value: "4.7★", icon: Star }
];

export default function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Most Popular");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 via-teal-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                {React.createElement([BookOpen, Video, Headphones, Trophy, Download][Math.floor(Math.random() * 5)], {
                  className: "w-8 h-8 text-white/20"
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Search className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Browse Learning Materials</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
                Perfect Content
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-green-100 mb-10 max-w-4xl mx-auto leading-relaxed">
              Explore our vast library of educational content. From structured courses to quick tutorials, 
              find exactly what you need to accelerate your learning journey.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for courses, tutorials, articles..."
                  className="w-full pl-14 pr-6 py-4 text-lg rounded-2xl border-0 focus:outline-none focus:ring-4 focus:ring-white/20 shadow-2xl"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-xl font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-300">
                  Search
                </button>
              </div>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {overallStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                    <Icon className="w-8 h-8 text-white mx-auto mb-3" />
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-green-100 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort and Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {browseItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={`group relative bg-gradient-to-br ${item.bgColor} border ${item.borderColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-40 h-40 opacity-5">
                  <Icon className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold text-green-600">{item.count}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{item.avgRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-2 transition-all duration-300" />
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    {item.fullDescription}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/50 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Duration</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.duration}</span>
                    </div>
                    <div className="bg-white/50 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Students</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.students.toLocaleString()}</span>
                    </div>
                    <div className="bg-white/50 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Level</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.difficulty}</span>
                    </div>
                    <div className="bg-white/50 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Content</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.totalHours}</span>
                    </div>
                  </div>

                  {/* Popular Content */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Popular Content
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.popular.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-white/70 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className={`flex-1 bg-gradient-to-r ${item.color} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-xl transition-all duration-300 group-hover:shadow-2xl flex items-center justify-center gap-2`}>
                      <Eye className="w-5 h-5" />
                      Browse {item.name}
                    </button>
                    <button className="p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 group-hover:border-green-300">
                      <BookmarkPlus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Learning Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes our educational content stand out from the rest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Learning</h3>
              <p className="text-gray-600">Engage with hands-on exercises, quizzes, and real-world projects that make learning stick.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals and academic experts with years of teaching experience.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Schedule</h3>
              <p className="text-gray-600">Learn at your own pace with 24/7 access to all content across all your devices.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-gray-900 to-green-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Start Exploring Today
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join over 150,000 learners who trust Growth Tubes for their educational journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Start Learning Free
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" />
              View All Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}