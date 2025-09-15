import { Metadata } from 'next';
import CourseList from '@/components/admin/CourseList';

export const metadata: Metadata = {
  title: 'Admin - Courses',
  description: 'Manage courses for the Growth Tube platform.',
  keywords: ['admin', 'courses', 'management', 'content'],
};

export default function AdminCoursesPage() {
  return <CourseList />;
}