"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useCategoryStore } from "@/store/categoryStore";
import Link from "next/link";

export default function CategoryGrid() {
  const { categories, isLoading, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link key={category._id} href={`/categories/${category._id}`}>
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon || category.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-xs text-blue-600 font-medium">
                    <span>Explore →</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}