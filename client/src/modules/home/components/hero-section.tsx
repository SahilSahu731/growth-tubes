"use client"

import React from 'react'
import Image from 'next/image'
import { Sparkles, ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Badge = ({ children, className = "" } : { children : React.ReactNode, className: string}) => {
  return (
    <div className={`inline-flex items-center px-4 py-2 text-sm font-medium ${className}`}>
      {children}
    </div>
  )
}


export default function WisdomHeroSection() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-700"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-16">
          
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Badge */}
            <Badge className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
              Transform Your Mind, Elevate Your Thinking
            </Badge>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                <span className="text-gray-900 block">Unlock Your</span>
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent block">
                  Intellectual
                </span>
                <span className="text-gray-900 block">Potential</span>
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl">
                Embark on a transformative journey of discovery. Master critical thinking, expand your knowledge, and cultivate wisdom that lasts a lifetime.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                Join thousands of learners who have elevated their minds and transformed their perspectives through our proven methodology.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group">
                Begin Your Journey
                <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-8 border-t border-gray-100">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-indigo-400 border-2 border-white"></div>
                  </div>
                  <span className="font-medium text-gray-700">50K+ active learners</span>
                </div>
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="font-medium text-gray-700">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[700px] flex items-center justify-center">
            <div className="relative group">
              {/* Main image container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:scale-[1.02] group-hover:rotate-1">
                <Image
                  src="/hero.jpeg"
                  alt="Intellectual growth and learning journey"
                  width={600}
                  height={700}
                  className="object-cover w-full h-full"
                  priority
                />
                {/* Image overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5"></div>
              </div>
              
              {/* Floating elements for visual interest */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg animate-bounce delay-300"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg animate-bounce delay-700"></div>
              <div className="absolute top-1/4 -left-8 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg animate-pulse"></div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl transform rotate-6 scale-105 -z-10 opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  )
}