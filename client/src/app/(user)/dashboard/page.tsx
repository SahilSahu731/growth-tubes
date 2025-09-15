import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal growth dashboard - track progress, view insights, and manage your development journey.',
  keywords: ['dashboard', 'progress tracking', 'personal growth', 'analytics'],
};

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Growth Tube</h1>
        <p className="text-muted-foreground">Your personal development journey starts here</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Learning Progress</h3>
          <p className="text-3xl font-bold text-blue-600">0%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Completed Courses</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Learning Streak</h3>
          <p className="text-3xl font-bold text-purple-600">0 days</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
