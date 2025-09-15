import { Metadata } from 'next';
import UserList from '@/components/admin/UserList';

export const metadata: Metadata = {
  title: 'Admin - Users',
  description: 'Manage platform users.',
  keywords: ['admin', 'users', 'management'],
};

export default function AdminUsersPage() {
  return <UserList />;
}