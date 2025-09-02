import React from 'react';
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  Dna, 
  Landmark, 
  Globe, 
  Languages, 
  Palette, 
  TrendingUp, 
  Code, 
  Briefcase, 
  Brain,
  ChevronRight,
  BookOpen,
  Star,
  Users,
  Clock
} from 'lucide-react';

const subjects = [
  {
    name: "Mathematics",
    icon: Calculator,
    description: "Algebra, Calculus, Statistics",
    fullDescription: "Master the language of numbers and logic. From basic arithmetic to advanced calculus, build the foundation for analytical thinking.",
    courses: 45,
    students: 12500,
    duration: "3-6 months",
    level: "Beginner to Advanced",
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200"
  },
  {
    name: "Physics",
    icon: Atom,
    description: "Mechanics, Thermodynamics, Quantum",
    fullDescription: "Explore the fundamental laws that govern our universe. From classical mechanics to quantum physics.",
    courses: 38,
    students: 9800,
    duration: "4-8 months",
    level: "Intermediate to Advanced",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200"
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    description: "Organic, Inorganic, Physical",
    fullDescription: "Discover the science of matter and its interactions. From molecular structures to chemical reactions.",
    courses: 42,
    students: 11200,
    duration: "3-7 months",
    level: "Beginner to Advanced",
    color: "from-green-500 to-teal-600",
    bgColor: "from-green-50 to-teal-50",
    borderColor: "border-green-200"
  },
  {
    name: "Biology",
    icon: Dna,
    description: "Genetics, Ecology, Human Biology",
    fullDescription: "Study life in all its forms. From cellular processes to ecosystem dynamics and human anatomy.",
    courses: 52,
    students: 15600,
    duration: "2-6 months",
    level: "Beginner to Advanced",
    color: "from-emerald-500 to-green-600",
    bgColor: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200"
  },
  {
    name: "History",
    icon: Landmark,
    description: "World History, Ancient Civilizations",
    fullDescription: "Journey through time and explore human civilization. From ancient empires to modern societies.",
    courses: 35,
    students: 8900,
    duration: "2-5 months",
    level: "All Levels",
    color: "from-amber-500 to-orange-600",
    bgColor: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200"
  },
  {
    name: "Geography",
    icon: Globe,
    description: "Physical & Human Geography",
    fullDescription: "Understand our planet and its diverse landscapes. From physical features to human settlements.",
    courses: 28,
    students: 7200,
    duration: "2-4 months",
    level: "All Levels",
    color: "from-cyan-500 to-blue-600",
    bgColor: "from-cyan-50 to-blue-50",
    borderColor: "border-cyan-200"
  },
  {
    name: "Languages",
    icon: Languages,
    description: "English, Spanish, French",
    fullDescription: "Master communication across cultures. From grammar fundamentals to fluent conversation.",
    courses: 67,
    students: 18900,
    duration: "6-12 months",
    level: "Beginner to Fluent",
    color: "from-rose-500 to-pink-600",
    bgColor: "from-rose-50 to-pink-50",
    borderColor: "border-rose-200"
  },
  {
    name: "Arts",
    icon: Palette,
    description: "Visual Arts, Music, Drama",
    fullDescription: "Express creativity through various artistic mediums. From painting to music composition and theater.",
    courses: 44,
    students: 10300,
    duration: "1-8 months",
    level: "All Levels",
    color: "from-violet-500 to-purple-600",
    bgColor: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200"
  },
  {
    name: "Economics",
    icon: TrendingUp,
    description: "Micro & Macro Economics",
    fullDescription: "Understand how economies work. From individual decision-making to global market dynamics.",
    courses: 31,
    students: 8600,
    duration: "3-6 months",
    level: "Intermediate to Advanced",
    color: "from-red-500 to-rose-600",
    bgColor: "from-red-50 to-rose-50",
    borderColor: "border-red-200"
  },
  {
    name: "Computer Science",
    icon: Code,
    description: "Programming, Algorithms, Data",
    fullDescription: "Build the future with code. From basic programming to advanced algorithms and data structures.",
    courses: 78,
    students: 25400,
    duration: "3-12 months",
    level: "Beginner to Expert",
    color: "from-slate-500 to-gray-600",
    bgColor: "from-slate-50 to-gray-50",
    borderColor: "border-slate-200"
  },
  {
    name: "Business",
    icon: Briefcase,
    description: "Management, Marketing, Finance",
    fullDescription: "Learn the art of business. From entrepreneurship to corporate strategy and financial management.",
    courses: 56,
    students: 16800,
    duration: "2-8 months",
    level: "All Levels",
    color: "from-indigo-500 to-blue-600",
    bgColor: "from-indigo-50 to-blue-50",
    borderColor: "border-indigo-200"
  },
  {
    name: "Psychology",
    icon: Brain,
    description: "Cognitive, Social Psychology",
    fullDescription: "Explore the human mind and behavior. From cognitive processes to social interactions and mental health.",
    courses: 39,
    students: 11700,
    duration: "3-7 months",
    level: "All Levels",
    color: "from-teal-500 to-cyan-600",
    bgColor: "from-teal-50 to-cyan-50",
    borderColor: "border-teal-200"
  }
];

const stats = [
  { label: "Total Subjects", value: "12+" },
  { label: "Courses Available", value: "500+" },
  { label: "Active Students", value: "150K+" },
  { label: "Expert Instructors", value: "800+" }
];

export default function AllSubjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-8 gap-8 transform rotate-12 scale-150">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="w-16 h-16 rounded-lg bg-white/20 animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-5 h-5 text-white" />
              <span className="text-white font-medium">All Subjects</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Explore Every
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Subject
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unlock your potential with our comprehensive collection of subjects. 
              From STEM to humanities, find your passion and excel in every field of knowledge.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                <Star className="w-5 h-5" />
                Start Learning Today
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Browse Catalog
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover comprehensive courses designed by experts to help you master any subject
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <div
                key={subject.name}
                className={`group relative bg-gradient-to-br ${subject.bgColor} border ${subject.borderColor} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <Icon className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  {/* Icon and Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {subject.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {subject.fullDescription}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <BookOpen className="w-4 h-4" />
                      <span>{subject.courses} courses</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{subject.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{subject.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="w-4 h-4" />
                      <span>{subject.level}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full bg-gradient-to-r ${subject.color} text-white font-medium py-3 rounded-xl hover:shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                    Explore {subject.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already advancing their careers with Growth Tubes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}