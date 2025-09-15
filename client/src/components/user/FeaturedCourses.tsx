"use client";

import { useEffect, useState } from "react";
import { useCourseStore } from "@/store/courseStore";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function FeaturedCourses() {
  const { courses, isLoading, fetchCourses } = useCourseStore();
  
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Get published courses, prioritize featured ones
  const featuredCourses = courses
    .filter(course => course.status === 'published')
    .sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.enrollmentCount - a.enrollmentCount;
    })
    .slice(0, 6);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (featuredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No courses available yet</h3>
        <p className="text-muted-foreground">Check back soon for new learning content!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <p className="text-muted-foreground">Start your learning journey with these popular courses</p>
        </div>
        <Link href="/courses">
          <Button variant="outline" className="group">
            View All Courses
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}